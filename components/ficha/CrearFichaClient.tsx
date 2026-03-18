"use client";

import { useState } from "react";
import ImportForm from "./ImportForm";
import PropertyForm from "./PropertyForm";
import { Property } from "@/lib/types/property";
import { saveProperty } from "@/app/dashboard/crear-ficha/actions";
import { useRouter } from "next/navigation";

import { UserProfile } from "@/lib/types/user";

interface Props {
  userId: string;
  userProfile: UserProfile | null;
}

export default function CrearFichaClient({ userId, userProfile }: Props) {
  const [importedData, setImportedData] = useState<Partial<Property> | null>(null);
  const router = useRouter();

  const handleImportSuccess = async (data: Partial<Property>) => {
    const fullData = {
      ...data,
      userId,
      agentName: userProfile?.name || "",
      agentEmail: userProfile?.email || "",
      agentWhatsapp: userProfile?.whatsapp || "",
      agentPhone: userProfile?.phone || "",
      officeName: userProfile?.officeName || "",
      isPublished: true,
    };

    try {
      // Safeguard: Do not auto-save if scraping failed to find a title
      // This prevents "ghost" properties from being created
      if (!data.title || data.title.length < 3) {
        console.warn("Scraping returned low quality data, showing form instead of auto-saving.");
        setImportedData(fullData);
        return;
      }

      const saved = await saveProperty(fullData);
      if (saved?.id) {
        // Zero-input: redirect immediately on success
        router.push(`/dashboard/crear-ficha/success?id=${saved.id}`);
      } else {
        router.push(`/dashboard/propriedad`);
      }
    } catch (error) {
      console.error("Error saving property after import:", error);
      // Fallback: show form if auto-save fails so the user doesn't lose the scraped data
      setImportedData(fullData);
    }
  };

  const handleSave = async (data: Property) => {
    try {
      const saved = await saveProperty(data);
      if (saved?.id) {
        router.push(`/dashboard/crear-ficha/success?id=${saved.id}`);
      } else {
        router.push(`/dashboard/propriedad`);
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Error al guardar la propiedad. Por favor intente nuevamente.");
    }
  };

  if (!importedData) {
    const bookmarkletCode = `javascript:(function(){
      const d=document;
      const get=(s)=>d.querySelector(s)?.innerText?.trim()||"";
      const q=(s)=>Array.from(d.querySelectorAll(s));
      
      const features = q(".property-main-features li").map(li=>li.innerText.trim());
      const findVal = (regex) => {
        const f = features.find(t => regex.test(t.toLowerCase()));
        return f ? parseFloat(f.replace(/[^0-9.,]/g, "").replace(",", ".")) : null;
      };

      const photos=[];
      q(".hero-image-bg, .property-gallery img, .main-carousel img, .slider img, .flickity-slider img").forEach(el=>{
        let s=el.src||el.getAttribute("data-src")||el.getAttribute("data-lazy")||"";
        const st=el.getAttribute("style");
        if(!s && st && st.includes("background-image")){
          const m=st.match(/url\\(['"]?([^'"]+)['"]?\\)/);
          if(m) s=m[1];
        }
        if(s){
          if(s.startsWith("//")) s="https:"+s;
          else if(s.startsWith("/")) s=window.location.origin+s;
          if(!photos.includes(s) && !s.includes("data:image")) photos.push(s);
        }
      });

      const data={
        title: get(".section-description--title") || get(".breadcrumb-item.active h1") || get(".title-container h1") || d.title,
        description: get(".section-description--content"),
        price: parseFloat(get(".titlebar__price")?.replace(/[^\\d]/g,"")||"0"),
        currency: get(".titlebar__price")?.includes("$") ? "ARS" : "USD",
        address: get(".titlebar__address"),
        totalArea: findVal(/total|t\. total/),
        coveredArea: findVal(/cubierta|sup\. cub/),
        rooms: findVal(/ambiente/),
        bedrooms: findVal(/dormitorio/),
        bathrooms: findVal(/baño/),
        photos: photos.slice(0,15),
        features: features.slice(0,15),
        externalUrl: window.location.href,
        agentName: "${userProfile?.name || ""}",
        agentEmail: "${userProfile?.email || ""}",
        agentWhatsapp: "${userProfile?.whatsapp || ""}",
        agentPhone: "${userProfile?.phone || ""}",
        officeName: "${userProfile?.officeName || ""}"
      };

      const url = "${window.location.origin}/dashboard/import?data=" + encodeURIComponent(JSON.stringify(data));
      window.location.href = url;
    })();`.replace(/\s+/g, ' ');

    return (
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <ImportForm onImportSuccess={handleImportSuccess} />
        </div>

        <div className="bg-gradient-to-br from-sky-600 to-blue-700 p-8 rounded-2xl shadow-lg text-white">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold italic">¡Prueba el Botón Mágico! 🚀</h3>
              <p className="text-sky-100 leading-relaxed">
                ¿Cansado de que fallen las importaciones? Arrastra este botón a tu barra de marcadores. 
                Luego, cuando estés en Argenprop, ¡haz clic y listo!
              </p>
              <div className="pt-2">
                <a
                  href={bookmarkletCode}
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-700 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform cursor-move"
                >
                  ✨ Guardar Propiedad
                </a>
              </div>
            </div>
            <div className="w-full md:w-64 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-sm">
              <p className="font-semibold mb-2">Instrucciones:</p>
              <ol className="list-decimal ml-4 space-y-2 text-sky-50">
                <li>Arrastra el botón blanco arriba a tu barra de marcadores.</li>
                <li>Ve a cualquier ficha en <strong>Argenprop</strong>.</li>
                <li>Haz clic en el marcador <strong>✨ Guardar Propiedad</strong>.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-sky-50 p-4 rounded-lg border border-sky-100">
        <p className="text-sky-800 text-sm">
          <strong>¡Datos importados!</strong> Revise la información y complete los campos faltantes.
        </p>
        <button 
          onClick={() => setImportedData(null)}
          className="text-sky-600 text-sm font-semibold hover:underline"
        >
          Cambiar URL
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <PropertyForm initialData={importedData} onSubmit={handleSave} />
      </div>
    </div>
  );
}
