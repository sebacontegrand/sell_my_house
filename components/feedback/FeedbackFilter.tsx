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

interface Asset {
    id: string;
    title: string;
    type: 'property' | 'prelisting';
}

const FeedbackFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [assets, setAssets] = useState<Asset[]>([]);

    // Get current filter from URL
    const currentFilter = searchParams.get("prelistingId") || searchParams.get("propertyId") || "all";

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

    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "all") {
            const asset = assets.find(a => a.id === value);
            if (asset?.type === 'property') {
                params.set("propertyId", value);
                params.delete("prelistingId");
            } else {
                params.set("prelistingId", value);
                params.delete("propertyId");
            }
        } else {
            params.delete("prelistingId");
            params.delete("propertyId");
        }
        router.push(`/dashboard/feedback?${params.toString()}`);
    };

    return (
        <div className="w-full md:w-[300px]">
            <Select value={currentFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="h-10 bg-transparent border-none font-bold text-slate-600 focus:ring-0">
                    <SelectValue placeholder="Filtrar por propiedad..." />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-premium border-slate-100">
                    <SelectItem value="all" className="font-bold py-3 text-slate-400">Ver Todas</SelectItem>
                    {assets.map((item) => (
                        <SelectItem key={item.id} value={item.id} className="font-bold py-3">
                            <span className="flex items-center gap-2">
                                <span className={item.type === 'property' ? "text-sky-500" : "text-slate-400"}>
                                    {item.type === 'property' ? '●' : '○'}
                                </span>
                                {item.title}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default FeedbackFilter;
