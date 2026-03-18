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
import { IoSparklesOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface Asset {
    id: string;
    title: string;
    type: 'property' | 'prelisting';
}

const feedbackSchema = z.object({
    assetId: z.string().min(1, "Debe seleccionar una propiedad"),
    assetType: z.enum(['property', 'prelisting']),
    visitorName: z.string().optional(),
    visitorContact: z.string().optional(),
    impression: z.string().min(1, "La impresión es requerida"),
    rating: z.coerce.number().min(1).max(5).optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const FeedbackForm = () => {
    const router = useRouter();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(false);

    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            assetId: "",
            assetType: 'prelisting',
            visitorName: "",
            visitorContact: "",
            impression: "",
            rating: undefined,
        },
    });

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await fetch("/api/prelistings");
                const data = await res.json();
                
                const combined: Asset[] = [
                    ...(data.properties || []).map((p: any) => ({ id: p.id, title: p.title, type: 'property' })),
                    ...(data.prelistings || []).map((p: any) => ({ id: p.id, title: p.title || p.description?.substring(0, 30), type: 'prelisting' }))
                ];
                setAssets(combined);
            } catch (error) {
                console.error("Failed to fetch assets", error);
            }
        };
        fetchAssets();
    }, []);

    const onSubmit = async (values: FeedbackFormValues) => {
        setLoading(true);
        try {
            const body = {
                impression: values.impression,
                rating: values.rating,
                visitorName: values.visitorName,
                visitorContact: values.visitorContact,
                propertyId: values.assetType === 'property' ? values.assetId : undefined,
                prelistingId: values.assetType === 'prelisting' ? values.assetId : undefined,
            };

            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error("Failed to submit feedback");
            }

            form.reset();
            router.refresh();
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="assetId"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Propiedad / Ficha</FormLabel>
                            <Select 
                                onValueChange={(val) => {
                                    field.onChange(val);
                                    const asset = assets.find(a => a.id === val);
                                    if (asset) form.setValue('assetType', asset.type);
                                }} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-12 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 focus:ring-2 focus:ring-slate-200">
                                        <SelectValue placeholder="Busca en tus listados..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-2xl shadow-premium border-slate-100">
                                    {assets.map((item) => (
                                        <SelectItem key={item.id} value={item.id} className="rounded-xl font-bold py-3">
                                            <span className="flex items-center gap-2">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[8px] uppercase",
                                                    item.type === 'property' ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600"
                                                )}>
                                                    {item.type === 'property' ? 'Publicada' : 'Borrador'}
                                                </span>
                                                {item.title}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-[10px] font-bold text-red-500 ml-4" />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                      control={form.control}
                      name="visitorName"
                      render={({ field }) => (
                          <FormItem className="space-y-1">
                              <FormLabel className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Visitante</FormLabel>
                              <FormControl>
                                  <Input placeholder="Ej: Juan Perez" {...field} className="bg-slate-50 border-none h-12 font-bold px-6" />
                              </FormControl>
                              <FormMessage className="text-[10px] font-bold text-red-500 ml-4" />
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="visitorContact"
                      render={({ field }) => (
                          <FormItem className="space-y-1">
                              <FormLabel className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Contacto</FormLabel>
                              <FormControl>
                                  <Input placeholder="WhatsApp o Email" {...field} className="bg-slate-50 border-none h-12 font-bold px-6" />
                              </FormControl>
                              <FormMessage className="text-[10px] font-bold text-red-500 ml-4" />
                          </FormItem>
                      )}
                  />
                </div>

                <FormField
                    control={form.control}
                    name="impression"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Comentario</FormLabel>
                            <FormControl>
                                <textarea
                                    className="w-full h-32 bg-slate-50 border-none rounded-[1.5rem] p-6 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-slate-200 resize-none outline-none placeholder:text-slate-300"
                                    placeholder="¿Qué opinó de la propiedad?"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-[10px] font-bold text-red-500 ml-4" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Calificación</FormLabel>
                            <Select
                                onValueChange={(val) => field.onChange(Number(val))}
                                defaultValue={field.value?.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-12 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 focus:ring-2 focus:ring-slate-200">
                                        <SelectValue placeholder="Puntaje (1-5)" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-2xl shadow-premium border-slate-100">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <SelectItem key={num} value={num.toString()} className="font-bold py-3">
                                            ⭐ {num} Estrellas
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-[10px] font-bold text-red-500 ml-4" />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 bg-slate-900 hover:bg-black rounded-2xl font-black text-lg gap-2 shadow-premium active:scale-95 transition-all"
                >
                    {loading ? (
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <IoSparklesOutline size={20} className="text-sky-400" />
                        Guardar Feedback
                      </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default FeedbackForm;
