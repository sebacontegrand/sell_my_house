"use client";

import { useState, useEffect } from "react";
import ImportForm from "./ImportForm";
import PropertyForm from "./PropertyForm";
import { ProcessingStep } from "./ProcessingStep";
import { Stepper } from "@/components/ui/Stepper";
import { Property } from "@/lib/types/property";
import { saveProperty } from "@/app/dashboard/crear-ficha/actions";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline, IoFlashOutline, IoSparklesOutline } from "react-icons/io5";
import { UserProfile } from "@/lib/types/user";
import { Button } from "@/components/ui/button";

interface Props {
  userId: string;
  userProfile: UserProfile | null;
}

export default function CrearFichaClient({ userId, userProfile }: Props) {
  const [step, setStep] = useState(0);
  const [importedData, setImportedData] = useState<Partial<Property> | null>(null);
  const [origin, setOrigin] = useState<string>("");
  const router = useRouter();

  const steps = ["Origen", "AI", "Refinar", "Listo"];

  useEffect(() => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    setOrigin(appUrl);
  }, []);

  const handleImportSuccess = async (data: Partial<Property>) => {
    setStep(1); // Show AI Processing
    
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

    // Simulate magic feel for a bit even if fast
    setTimeout(async () => {
      try {
        if (!data.title || data.title.length < 3) {
          setImportedData(fullData);
          setStep(2);
          return;
        }

        const saved = await saveProperty(fullData);
        if (saved?.id) {
          setStep(3);
          router.push(`/dashboard/crear-ficha/success?id=${saved.id}`);
        } else {
          setImportedData(fullData);
          setStep(2);
        }
      } catch (error) {
        console.error("Error saving property after import:", error);
        setImportedData(fullData);
        setStep(2);
      }
    }, 1500);
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
      alert("Error al guardar la propiedad.");
    }
  };

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

    const appOrigin = "${origin || "https://milugar.vercel.app"}";
    const url = appOrigin + "/dashboard/import?data=" + encodeURIComponent(JSON.stringify(data));
    window.location.href = url;

  })();`.replace(/\s+/g, ' ');

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header & Stepper */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-between mb-2">
          {step > 0 && step < 3 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 font-bold text-sm"
            >
              <IoArrowBackOutline size={20} />
              Atrás
            </button>
          )}
          <div className="flex-1" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Crear Nueva Ficha</h1>
        <Stepper steps={steps} currentStep={step} />
      </div>

      <div className="min-h-[500px]">
        {step === 0 && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-slate-50">
              <ImportForm onImportSuccess={handleImportSuccess} />
            </div>

            {/* Bookmarklet Section */}
            <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-sky-500/20 transition-colors duration-700" />
               
               <div className="relative flex flex-col md:flex-row gap-10 items-center">
                 <div className="flex-1 space-y-6">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 font-black text-[10px] uppercase tracking-widest">
                     <IoFlashOutline size={14} />
                     Feature Exclusivo
                   </div>
                   <h3 className="text-3xl font-black text-white leading-tight">
                     Importación con <span className="text-sky-400">1-Click</span> 🚀
                   </h3>
                   <p className="text-slate-400 leading-relaxed font-medium">
                     ¿Cansado de copiar y pegar? Arrastra este botón a tu barra de marcadores. 
                     Luego, cuando estés en <span className="text-white">Argenprop</span> o <span className="text-white">Zonaprop</span>, ¡haz clic y Mi Lugar hará el resto!
                   </p>
                   <div className="pt-2">
                     <a
                       href={bookmarkletCode}
                       onClick={(e) => e.preventDefault()}
                       className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all cursor-move"
                     >
                       <IoSparklesOutline size={22} className="text-sky-500 animate-pulse" />
                       Guardar en Mi Lugar
                     </a>
                   </div>
                 </div>
                 
                 <div className="w-full md:w-72 bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 text-sm">
                   <p className="font-bold text-white mb-4 flex items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-sky-500 text-[10px] flex items-center justify-center">?</span>
                     ¿Cómo instalar?
                   </p>
                   <ul className="space-y-4 text-slate-400 font-medium">
                     <li className="flex gap-3">
                       <span className="text-sky-400 font-black">1.</span>
                       Manten presionado el botón blanco.
                     </li>
                     <li className="flex gap-3">
                       <span className="text-sky-400 font-black">2.</span>
                       Arrastralo a tu barra de favoritos.
                     </li>
                     <li className="flex gap-3">
                       <span className="text-sky-400 font-black">3.</span>
                       ¡Listo! Úsalo en cualquier propiedad.
                     </li>
                   </ul>
                 </div>
               </div>
            </div>
          </div>
        )}

        {step === 1 && <ProcessingStep />}

        {step === 2 && importedData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-premium border border-slate-50">
                <PropertyForm initialData={importedData} onSubmit={handleSave} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
