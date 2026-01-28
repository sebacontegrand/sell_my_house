"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Prelisting } from "@prisma/client";

const FeedbackFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [prelistings, setPrelistings] = useState<Prelisting[]>([]);

    // Get current filter from URL
    const currentFilter = searchParams.get("prelistingId") || "all";

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

    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "all") {
            params.set("prelistingId", value);
        } else {
            params.delete("prelistingId");
        }
        router.push(`/dashboard/feedback?${params.toString()}`);
    };

    return (
        <div className="w-full md:w-[300px]">
            <Select value={currentFilter} onValueChange={handleFilterChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Filtrar por propiedad..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas las propiedades</SelectItem>
                    {prelistings.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.description} ({item.title})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default FeedbackFilter;
