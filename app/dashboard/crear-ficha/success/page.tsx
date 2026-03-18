"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoLogoWhatsapp, IoMailOutline, IoCopyOutline, IoCheckmarkCircleOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useState } from "react";

export default function FichaSuccessPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useState(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  });

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
    <div className="p-6 max-w-2xl mx-auto text-center space-y-8 py-12">
      <div className="flex flex-col items-center gap-4">
        <IoCheckmarkCircleOutline className="text-green-500" size={80} />
        <h1 className="text-3xl font-bold text-gray-800">¡Ficha Generada con Éxito!</h1>
        <p className="text-gray-600">Tu propiedad ya tiene su propia página profesional y está lista para compartir.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-left">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Link de la Ficha</label>
          <div className="flex gap-2">
            <input 
              readOnly 
              value={publicUrl} 
              className="flex-1 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono overflow-hidden text-ellipsis"
            />
            <button 
              onClick={copyToClipboard}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              {copied ? "¡Copiado!" : <IoCopyOutline size={20} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <a
            href={whatsappLink}
            target="_blank"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-colors"
          >
            <IoLogoWhatsapp size={22} />
            Enviar por WhatsApp
          </a>
          <a
            href={emailLink}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-colors"
          >
            <IoMailOutline size={22} />
            Enviar por Email
          </a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <Link 
          href={`/dashboard/propriedad`}
          className="text-gray-600 hover:text-gray-900 font-semibold"
        >
          Ir a mis propriedades
        </Link>
        <Link 
          href={`/ficha/${id}`}
          target="_blank"
          className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-colors"
        >
          Ver Ficha Pública
          <IoArrowForwardOutline size={18} />
        </Link>
      </div>
    </div>
  );
}
