"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  IoLogoWhatsapp, 
  IoMailOutline, 
  IoCopyOutline, 
  IoCheckmarkCircleOutline, 
  IoArrowForwardOutline,
  IoShareOutline,
  IoEyeOutline,
  IoHomeOutline
} from "react-icons/io5";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FichaSuccessPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  if (!id) return null;

  const publicUrl = `${baseUrl}/ficha/${id}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`Mira esta propiedad: ${publicUrl}`)}`;
  const emailLink = `mailto:?subject=Propiedad consultada&body=${encodeURIComponent(`Hola, te comparto esta ficha: ${publicUrl}`)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="w-full max-w-xl space-y-12 text-center">
        
        {/* Success Icon & Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 text-green-500 animate-in zoom-in duration-500 delay-200 shadow-sm border-8 border-white">
            <IoCheckmarkCircleOutline size={56} />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">¡Ficha Publicada!</h1>
            <p className="text-slate-500 font-medium text-lg">Tu propiedad ya tiene su propia página profesional.</p>
          </div>
        </div>

        {/* Share Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-100 space-y-8 text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none">
            <IoShareOutline size={120} />
          </div>

          <div className="space-y-4 relative">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Link para compartir</label>
               <div className="flex gap-2">
                 <input 
                   readOnly 
                   value={publicUrl} 
                   className="flex-1 bg-slate-50 px-6 py-4 rounded-2xl border-none font-bold text-slate-600 text-sm overflow-hidden text-ellipsis outline-none"
                 />
                 <Button 
                   onClick={copyToClipboard}
                   variant="outline"
                   className={cn(
                     "h-auto px-6 rounded-2xl font-black transition-all",
                     copied ? "bg-green-500 text-white border-green-500" : "bg-slate-50 border-none text-slate-900"
                   )}
                 >
                   {copied ? "Copiado" : <IoCopyOutline size={20} />}
                 </Button>
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
               <a
                 href={whatsappLink}
                 target="_blank"
                 className="flex items-center justify-center gap-3 px-6 py-5 bg-[#25D366] text-white rounded-[1.5rem] font-black hover:scale-[1.02] transition-all shadow-lg shadow-green-200/50"
               >
                 <IoLogoWhatsapp size={24} />
                 Compartir WhatsApp
               </a>
               <a
                 href={emailLink}
                 className="flex items-center justify-center gap-3 px-6 py-5 bg-slate-100 text-slate-900 rounded-[1.5rem] font-black hover:scale-[1.02] transition-all"
               >
                 <IoMailOutline size={24} />
                 Enviar por Email
               </a>
             </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link 
            href={`/dashboard/propriedad`}
            className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-sm transition-all"
          >
            <IoHomeOutline size={18} className="transition-transform group-hover:-translate-y-0.5" />
            Mis Propiedades
          </Link>
          <Link 
            href={`/ficha/${id}`}
            target="_blank"
            className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95 group"
          >
            <IoEyeOutline size={22} />
            Ver Ficha Pública
            <IoArrowForwardOutline size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
