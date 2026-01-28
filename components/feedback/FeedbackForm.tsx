"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Prelisting } from "@prisma/client";

// Inline schema for feedback
const feedbackSchema = z.object({
    prelistingId: z.string().min(1, "Debe seleccionar una propiedad"),
    visitorName: z.string().optional(),
    visitorContact: z.string().optional(),
    impression: z.string().min(1, "La impresión es requerida"),
    rating: z.coerce.number().min(1).max(5).optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const FeedbackForm = () => {
    const router = useRouter();
    const [prelistings, setPrelistings] = useState<Prelisting[]>([]);
    const [loading, setLoading] = useState(false);

    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            prelistingId: "",
            visitorName: "",
            visitorContact: "",
            impression: "",
            rating: undefined,
        },
    });

    useEffect(() => {
        const fetchPrelistings = async () => {
            try {
                const res = await fetch("/api/prelistings");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setPrelistings(data);
                }
            } catch (error) {
                console.error("Failed to fetch prelistings", error);
            }
        };
        fetchPrelistings();
    }, []);

    const onSubmit = async (values: FeedbackFormValues) => {
        setLoading(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Failed to submit feedback");
            }

            form.reset();
            router.refresh(); // Refresh server components
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <FormField
                    control={form.control}
                    name="prelistingId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Propiedad</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione una propiedad" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {prelistings.map((item) => (
                                        <SelectItem key={item.id} value={item.id}>
                                            {item.description} ({item.title})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="visitorName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Visitante</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Juan Perez" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="visitorContact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contacto</FormLabel>
                            <FormControl>
                                <Input placeholder="Email o Teléfono" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="impression"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Impresión / Comentario</FormLabel>
                            <FormControl>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="¿Qué opinó de la propiedad?"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating (1-5)</FormLabel>
                            <Select
                                onValueChange={(val) => field.onChange(Number(val))}
                                defaultValue={field.value?.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Puntaje" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <SelectItem key={num} value={num.toString()}>
                                            {num}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Feedback"}
                </Button>
            </form>
        </Form>
    );
};

export default FeedbackForm;
