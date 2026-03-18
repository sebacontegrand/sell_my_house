"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveProperty } from "../crear-ficha/actions";

function ImportHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const rawData = searchParams.get("data");
    if (!rawData) {
      router.push("/dashboard/crear-ficha");
      return;
    }

    const processData = async () => {
      try {
        const data = JSON.parse(decodeURIComponent(rawData));
        
        // Ensure minimal data integrity
        if (!data.title) {
          throw new Error("Missing property title");
        }

        const saved = await saveProperty({
          ...data,
          isPublished: true,
        });

        if (saved?.id) {
          router.push(`/dashboard/crear-ficha/success?id=${saved.id}`);
        } else {
          router.push("/dashboard/propriedad");
        }
      } catch (error) {
        console.error("Error processing bookmarklet data:", error);
        alert("Hubo un error al procesar los datos. Por favor, intente nuevamente.");
        router.push("/dashboard/crear-ficha");
      }
    };

    processData();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-sky-600"></div>
      <h2 className="text-xl font-semibold text-gray-700">Procesando Propiedad...</h2>
      <p className="text-gray-500">Estamos guardando la información extraída de Argenprop.</p>
    </div>
  );
}

export default function ImportPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Suspense fallback={
        <div className="flex justify-center py-20">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      }>
        <ImportHandler />
      </Suspense>
    </div>
  );
}
