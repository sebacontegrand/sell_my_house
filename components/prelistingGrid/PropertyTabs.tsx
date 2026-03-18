"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NewPrelisting } from "./NewPrelisting";
import PrelistingGrid from "./PrelistingGrid";
import PropertyGrid from "./PropertyGrid";
import { Prelisting, Property } from "@prisma/client";
import { cn } from "@/lib/utils";
import { IoSearchOutline, IoAddOutline } from "react-icons/io5";

interface Props {
    prelistings: (Omit<Prelisting, "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    })[];
    properties: (Omit<Property, "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    })[];
}

export const PropertyTabs = ({ prelistings, properties }: Props) => {
    const [activeTab, setActiveTab] = useState<"manual" | "fichas" | "legacy" | "new">("fichas");
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("q") || "";

    // manual = no externalUrl, fichas = has externalUrl
    // NOTE: Based on user feedback, currently items in DB with no externalUrl are still called "fichas"
    // We will keep "Fichas" as the primary bucket for now, and "Mis Propiedades" for future manual items
    const manualProperties = properties.filter(item => !item.externalUrl && item.title === "Mis Propiedades Placeholder"); // Placeholder logic
    const fichasProperties = properties.filter(item => !manualProperties.includes(item));

    const filteredManual = manualProperties.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredFichas = fichasProperties.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPrelistings = prelistings.filter(item =>
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) params.set("q", term);
        else params.delete("q");
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className="w-full space-y-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar propiedades..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-200 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                    />
                </div>
                
                <button
                    onClick={() => setActiveTab("new")}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-premium active:scale-[0.98]"
                >
                    <IoAddOutline size={20} />
                    Nueva Propiedad
                </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-[1.25rem] w-fit overflow-x-auto max-w-full no-scrollbar">
                <button
                    onClick={() => setActiveTab("fichas")}
                    className={cn(
                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                        activeTab === "fichas" 
                            ? "bg-white text-slate-900 shadow-premium" 
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    Fichas ({filteredFichas.length})
                </button>
                <button
                    onClick={() => setActiveTab("manual")}
                    className={cn(
                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                        activeTab === "manual" 
                            ? "bg-white text-slate-900 shadow-premium" 
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    Mis Propiedades ({filteredManual.length})
                </button>
                <button
                    onClick={() => setActiveTab("legacy")}
                    className={cn(
                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                        activeTab === "legacy" 
                            ? "bg-white text-slate-900 shadow-premium" 
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    Borradores ({filteredPrelistings.length})
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-2 duration-500">
                {activeTab === "new" ? (
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-black text-slate-900 mb-6">Crear Nueva Propiedad</h2>
                        <NewPrelisting />
                    </div>
                ) : activeTab === "legacy" ? (
                    <PrelistingGrid prelistings={filteredPrelistings} />
                ) : activeTab === "manual" ? (
                    <PropertyGrid properties={filteredManual} />
                ) : (
                    <PropertyGrid properties={filteredFichas} />
                )}
            </div>
        </div>
    );
};
