"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { NewPrelisting } from "./NewPrelisting";
import PrelistingGrid from "./PrelistingGrid";
import PropertyGrid from "./PropertyGrid";
import { Prelisting, Property } from "@prisma/client";

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
    const [activeTab, setActiveTab] = useState<"fichas" | "legacy" | "new">("fichas");
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("q") || "";

    const filteredPrelistings = prelistings.filter(item =>
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredProperties = properties.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full relative">
            <div className="flex space-x-4 border-b mb-6 overflow-x-auto scrollbar-hide">
                <button
                    className={`py-3 px-4 font-bold transition-all whitespace-nowrap ${activeTab === "fichas"
                        ? "border-b-4 border-sky-600 text-sky-700"
                        : "text-gray-500 hover:text-sky-600 border-b-4 border-transparent"
                        }`}
                    onClick={() => setActiveTab("fichas")}
                >
                    Fichas Compartibles ({filteredProperties.length})
                </button>
                <button
                    className={`py-3 px-4 font-bold transition-all whitespace-nowrap ${activeTab === "legacy"
                        ? "border-b-4 border-blue-600 text-blue-700"
                        : "text-gray-500 hover:text-blue-600 border-b-4 border-transparent"
                        }`}
                    onClick={() => setActiveTab("legacy")}
                >
                    Captaciones Anteriores ({filteredPrelistings.length})
                </button>
                <button
                    className={`py-3 px-4 font-bold transition-all whitespace-nowrap ${activeTab === "new"
                        ? "border-b-4 border-emerald-600 text-emerald-700"
                        : "text-gray-500 hover:text-emerald-600 border-b-4 border-transparent"
                        }`}
                    onClick={() => setActiveTab("new")}
                >
                    + Nueva Captación
                </button>
            </div>

            <div className="min-h-[400px]">
                {activeTab === "new" ? (
                    <div className="w-full max-w-2xl mx-auto">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Crear Nueva Captación</h2>
                        <NewPrelisting />
                    </div>
                ) : activeTab === "legacy" ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Captaciones Anteriores</h2>
                        <PrelistingGrid prelistings={filteredPrelistings} />
                    </div>
                ) : (
                    <div>
                        <PropertyGrid properties={filteredProperties} />
                    </div>
                )}
            </div>
        </div>
    );
};
