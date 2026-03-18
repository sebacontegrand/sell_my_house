"use client";

import { useState } from "react";
import { IoLinkOutline, IoTextOutline, IoSparklesOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onImportSuccess: (data: any) => void;
}

export default function ImportForm({ onImportSuccess }: Props) {
  const [url, setUrl] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [pastedImages, setPastedImages] = useState<string[]>([]);
  const [mode, setMode] = useState<"url" | "ai">("url");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.startsWith("http")) {
      setError("Por favor, ingrese una URL válida.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/import-property", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error al importar");
      const data = await response.json();
      
      if (data.isBlocked) {
        onImportSuccess({ source: "manual", externalUrl: url, title: "", description: "", photos: [] });
        return;
      }

      onImportSuccess(data);
    } catch (err) {
      onImportSuccess({ source: "manual", externalUrl: url, title: "", description: "", photos: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiPaste = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-parse", {
        method: "POST",
        body: JSON.stringify({ text: pasteText, images: pastedImages }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error al procesar");
      const data = await response.json();
      onImportSuccess(data);
    } catch (err) {
      setError("No se pudo procesar el texto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center text-center space-y-3">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Importación Mágica</h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pega un link o texto y nosotros hacemos el resto</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex p-1 bg-slate-100 rounded-2xl w-full max-w-[300px]">
          <button 
            onClick={() => setMode('url')}
            className={cn(
              "flex-1 py-2 px-4 rounded-xl text-xs font-black tracking-widest transition-all",
              mode === 'url' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
            )}
          >
            DESDE URL
          </button>
          <button 
            onClick={() => setMode('ai')}
            className={cn(
              "flex-1 py-2 px-4 rounded-xl text-xs font-black tracking-widest transition-all",
              mode === 'ai' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
            )}
          >
            TEXTO LIBRE
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <form onSubmit={handleImport} className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex flex-col md:flex-row gap-3">
               <Input
                 type="url"
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 placeholder="Link de Argenprop, Zonaprop..."
                 className="flex-1 h-14 bg-white border-slate-100 rounded-2xl text-lg font-bold px-6 focus-visible:ring-slate-200"
                 required
               />
               <Button
                 type="submit"
                 disabled={isLoading || !url}
                 className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-black font-black text-lg gap-3 min-w-[200px]"
               >
                 {isLoading ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <>
                     <IoSparklesOutline size={22} className="text-sky-400" />
                     Crear Ficha AI
                   </>
                 )}
               </Button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleAiPaste} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-[2.5rem] blur opacity-10" />
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Pega la descripción de la propiedad aquí..."
              className="relative w-full h-48 bg-white border-slate-100 rounded-[2rem] p-6 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-300 resize-none"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !pasteText.trim()}
            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-black font-black text-xl gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <IoSparklesOutline size={22} className="text-sky-400" />
                Extraer con AI
              </>
            )}
          </Button>
        </form>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in duration-300">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-center pt-4">
        <button 
          onClick={() => onImportSuccess({ source: "manual" })}
          className="text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors border-b-2 border-transparent hover:border-slate-900 pb-0.5"
        >
          O empezar manualmente
        </button>
      </div>
    </div>
  );
}
