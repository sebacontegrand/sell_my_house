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
import { IoCopyOutline, IoCheckmarkOutline, IoSparklesOutline, IoTerminalOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

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
        setPrompt("");
        try {
            const res = await fetch(`/api/form/${id}`);
            const data = await res.json();

            if (data && !data.error) {
                const features = [];
                if (data.ambientes) features.push(`${data.ambientes} ambientes`);
                if (data.dormitorio) features.push(`${data.dormitorio} dormitorios`);
                if (data.banos) features.push(`${data.banos} baños`);
                if (data.cocheras) features.push(`${data.cocheras} cocheras`);
                if (data.totalArea) features.push(`${data.totalArea} m² totales`);
                if (data.antiguedad) features.push(`${data.antiguedad} años de antigüedad`);
                
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
                setPrompt("Error: Detalles no encontrados.");
            }
        } catch (error) {
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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Control Area */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-50 flex flex-col md:flex-row items-end gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <IoSparklesOutline size={120} />
                </div>
                
                <div className="flex-1 space-y-2 w-full">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Seleccionar Propiedad</label>
                    <Select value={selectedId} onValueChange={handleSelect}>
                        <SelectTrigger className="h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 focus:ring-2 focus:ring-slate-200">
                            <SelectValue placeholder="Busca en tus listados..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-premium">
                            {prelistings.map((item) => (
                                <SelectItem key={item.id} value={item.id} className="rounded-xl font-bold py-3">
                                    {item.title || item.description?.substring(0, 30)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button 
                    onClick={() => generatePrompt(selectedId)}
                    disabled={!selectedId || loading}
                    className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-black font-black text-lg gap-3 shadow-xl shadow-slate-200 min-w-[200px] active:scale-95 transition-all"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <IoSparklesOutline size={20} className="text-sky-400" />
                            Generar Prompt
                        </>
                    )}
                </Button>
            </div>

            {/* Prompt Output */}
            {prompt && (
                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
                                <IoTerminalOutline size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Prompt Generado</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Copia y pega este texto</p>
                            </div>
                        </div>
                        <Button
                            onClick={copyToClipboard}
                            className={cn(
                                "h-12 px-6 rounded-2xl font-black transition-all gap-2",
                                copied 
                                    ? "bg-green-500 text-white shadow-green-200" 
                                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                            )}
                        >
                            {copied ? (
                                <>
                                    <IoCheckmarkOutline size={18} /> Copiado
                                </>
                            ) : (
                                <>
                                    <IoCopyOutline size={18} /> Copiar
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition-opacity" />
                        <div className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
                            <textarea
                                className="w-full h-[50vh] p-10 text-slate-700 font-mono text-sm leading-relaxed resize-none focus:outline-none bg-transparent"
                                value={prompt}
                                readOnly
                            />
                            <div className="absolute bottom-6 left-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                                Output Engine: Expert Real Estate
                            </div>
                        </div>
                    </div>

                    {/* External AI Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {[
                          { name: 'Opciones de Mercado', url: 'https://perplexity.ai' },
                          { name: 'Búsqueda Profunda', url: 'https://google.com' }
                        ].map((ai) => (
                           <a 
                             key={ai.name}
                             href={ai.url} 
                             target="_blank" 
                             className="flex items-center justify-center h-14 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-white transition-all"
                           >
                             {ai.name}
                           </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptBuilder;
