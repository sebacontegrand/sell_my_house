"use client";

import { useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

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

      if (!response.ok) throw new Error("Error al importar la propiedad");
      
      const data = await response.json();
      
      if (data.isBlocked) {
        setError("El sitio de origen está bloqueando el acceso automático. Por favor, complete la información manualmente.");
        onImportSuccess({ source: "manual", externalUrl: url, title: "", description: "", photos: [] });
        return;
      }

      onImportSuccess(data);
      
    } catch (err) {
      setError("No se pudo extraer la información automatically. Puede continuar manualmente.");
      onImportSuccess({ source: "manual", externalUrl: url, title: "", description: "", photos: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasteEvent = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Attempt to read rich HTML from clipboard to extract images when user Ctrl+C the whole page
    const html = e.clipboardData.getData("text/html");
    if (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const imgs = Array.from(doc.querySelectorAll("img"));
      const imageUrls = imgs
        .map((img) => img.src)
        .filter((src) => src && src.startsWith("http") && !src.includes("data:image"));
      
      // Deduplicate
      const uniqueUrls = Array.from(new Set(imageUrls));
      if (uniqueUrls.length > 0) {
        setPastedImages(uniqueUrls);
      }
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

      if (!response.ok) throw new Error("Error al procesar el texto");
      
      const data = await response.json();
      onImportSuccess(data);
    } catch (err) {
      setError("No se pudo procesar el texto con IA. Por favor, intente con otra descripción o complete manualmente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          onClick={() => setMode("url")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === "url" ? "bg-white text-sky-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        >
          Importar URL
        </button>
        <button
          onClick={() => setMode("ai")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === "ai" ? "bg-white text-sky-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        >
          Pegar Texto (IA)
        </button>
      </div>

      {mode === "url" ? (
        <form onSubmit={handleImport} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-sm font-medium text-gray-700">
              URL de la publicación (Argenprop, Zonaprop, etc.)
            </label>
            <div className="flex flex-col sm:row gap-4">
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.argenprop.com/casa-en-venta..."
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:bg-sky-300 min-w-[200px]"
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  <>
                    <span>🤖</span>
                    Importar con IA
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Usamos Inteligencia Artificial para leer el sitio y extraer los datos.</p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleAiPaste} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Copia y pega toda la descripción de la propiedad aquí
            </label>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              onPaste={handlePasteEvent}
              placeholder="Ej: 'Hermosa casa de 3 ambientes en Palermo, 120m2 totales, 2 baños...'"
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all resize-none"
              required
            />
            <button
              type="submit"
              disabled={isLoading || !pasteText.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                <>
                  <span>🤖</span>
                  Procesar con Inteligencia Artificial
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}
      
      <div className="mt-8 border-t pt-8">
        <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
          <h4 className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
            <span>ℹ️</span> ¿Cómo funciona?
          </h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc ml-5">
            <li>Extraemos fotos, precio, descripción y características.</li>
            <li>Podrás editar toda la información antes de guardar.</li>
            <li>Tu información de contacto reemplazará a la original.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
