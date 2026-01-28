"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { NewPrelisting } from "./NewPrelisting";
import PrelistingGrid from "./PrelistingGrid";
import { Prelisting } from "@prisma/client";

interface Props {
    prelistings: (Omit<Prelisting, "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    })[];
}

export const PropertyTabs = ({ prelistings }: Props) => {
    const [activeTab, setActiveTab] = useState<"new" | "existing">("existing");
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("q") || "";

    const filteredPrelistings = prelistings.filter(item =>
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full relative">
            <div className="flex space-x-4 border-b mb-6">
                <button
                    className={`py-2 px-4 font-medium transition-colors ${activeTab === "existing"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => setActiveTab("existing")}
                >
                    Ver Existentes ({filteredPrelistings.length})
                </button>
                <button
                    className={`py-2 px-4 font-medium transition-colors ${activeTab === "new"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => setActiveTab("new")}
                >
                    Nueva Propiedad
                </button>
            </div>

            <div className="min-h-[400px]">
                {activeTab === "new" ? (
                    <div className="w-full max-w-2xl mx-auto">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Crear Nueva Propiedad</h2>
                        <NewPrelisting />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Propiedades Existentes</h2>
                        <PrelistingGrid prelistings={filteredPrelistings} />
                    </div>
                )}
            </div>
        </div>
    );
};
