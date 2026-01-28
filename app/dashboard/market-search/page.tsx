import React from "react";
import PromptBuilder from "@/components/market-search/PromptBuilder";

const MarketSearchPage = () => {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Búsqueda de Mercado con IA</h1>
                <p className="text-gray-600">
                    Genere un prompt detallado de su propiedad para buscar comparables (comps) usando herramientas de Inteligencia Artificial.
                </p>
            </div>

            <PromptBuilder />
        </div>
    );
};

export default MarketSearchPage;
