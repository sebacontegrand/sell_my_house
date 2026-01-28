"use client";

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Prelisting } from "@prisma/client";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";

const PromptBuilder = () => {
    const [prelistings, setPrelistings] = useState<Prelisting[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

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

    const generatePrompt = async (id: string) => {
        setLoading(true);
        setPrompt("Generando prompt...");
        try {
            const res = await fetch(`/api/form/${id}`);
            const data = await res.json();

            if (data && !data.error) {
                // CONSTRUCT PROMPT
                // Mapping English/Spanish terms if needed, but keeping it professional for AI

                const features = [];
                if (data.ambientes) features.push(`${data.ambientes} ambientes`);
                if (data.dormitorio) features.push(`${data.dormitorio} dormitorios`);
                if (data.banos) features.push(`${data.banos} baños`);
                if (data.cocheras) features.push(`${data.cocheras} cocheras`);
                if (data.totalArea) features.push(`${data.totalArea} m² totales`);
                if (data.antiguedad) features.push(`${data.antiguedad} años de antigüedad`);
                if (data.amenities) features.push("amenities");

                const locationParts = [data.direccion, data.neighborhood, data.neighbors].filter(Boolean).join(", ");

                const promptText = `Actúa como un Experto en Mercado Inmobiliario. Necesito encontrar propiedades comparables que estén actualmente en el mercado para realizar una tasación.

Aquí están los detalles de la propiedad sujeto:

- **Tipo de Propiedad**: ${data.propertytype || 'N/A'}
- **Operación**: ${data.typeoperation || 'Venta/Alquiler'}
- **Ubicación**: ${locationParts || 'Ubicación no especificada'}
- **Características Clave**: ${features.join(", ") || 'N/A'}
${data.heattype ? `- **Calefacción**: ${data.heattype}` : ''}
${data.estado ? `- **Estado**: ${data.estado}` : ''}
${data.orientacion ? `- **Orientación**: ${data.orientacion}` : ''}

**Tarea**:
1. Busca al menos 3-5 propiedades similares listadas actualmente en esta zona específica.
2. Proporciona el precio de lista, m² (totales/cubiertos) y un enlace a la publicación si es posible.
3. Calcula el precio promedio por m² de estos comparables.
4. Basado en estos datos, sugiere un rango de precio de lista competitivo para la propiedad sujeto.

Por favor, verifica que las publicaciones sean recientes (últimos 3-6 meses).`;

                setPrompt(promptText);
            } else {
                setPrompt("Error: No se encontraron detalles para esta propiedad. Asegúrese de haber completado el formulario de carga.");
            }
        } catch (error) {
            console.error("Error generating prompt:", error);
            setPrompt("Error al generar el prompt.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (id: string) => {
        setSelectedId(id);
        if (id && id !== "all") {
            generatePrompt(id);
        } else {
            setPrompt("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="w-full max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Propiedad</label>
                <Select value={selectedId} onValueChange={handleSelect}>
                    <SelectTrigger>
                        <SelectValue placeholder="Buscar propiedad..." />
                    </SelectTrigger>
                    <SelectContent>
                        {prelistings.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.description} ({item.title})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {prompt && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700">Prompt Generado para AI</h3>
                        <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            size="sm"
                            className={copied ? "text-green-600 border-green-600 bg-green-50" : "text-blue-600 border-blue-200 hover:bg-blue-50"}
                        >
                            {copied ? (
                                <>
                                    <IoCheckmarkOutline className="mr-2" /> Copiado
                                </>
                            ) : (
                                <>
                                    <IoCopyOutline className="mr-2" /> Copiar Prompt
                                </>
                            )}
                        </Button>
                    </div>
                    <div className="p-0">
                        <textarea
                            className="w-full h-96 p-4 text-gray-700 font-mono text-sm resize-none focus:outline-none"
                            value={prompt}
                            readOnly
                        />
                    </div>
                    <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 border-t">
                        Copie este texto y péguelo en ChatGPT, Perplexity o Claude.
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptBuilder;
