"use client";

import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  IoTrashOutline,
  IoShareSocialOutline,
  IoOpenOutline,
  IoLogoWhatsapp
} from "react-icons/io5";

interface Props {
  properties: (Omit<Property, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  })[];
}

export default function PropertyGrid({ properties }: Props) {
  const router = useRouter();

  const handleShare = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/ficha/${id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `🏡 ¡Mirá esta propiedad: ${title}!`,
          url: url,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Enlace copiado al portapapeles: " + url);
    }
  };

  const handleWhatsApp = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/ficha/${id}`;
    const message = `🏡 ¡Mirá esta propiedad: ${title}!\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("¿Estás seguro de que deseas eliminar esta ficha?")) {
      try {
        const res = await fetch(`/api/properties/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          router.refresh();
        } else {
          alert("Error al eliminar la ficha");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!properties || properties.length === 0) {
    return <div className="text-gray-500 italic p-4">Aún no has creado ninguna Ficha (Propiedad Compartible).</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div 
          key={property.id} 
          onClick={() => window.open(`/ficha/${property.id}`, '_blank')}
          className="bg-white border hover:border-sky-300 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full tracking-wider uppercase">
                {property.operationType || "Venta"}
              </span>
              <button
                onClick={(e) => handleDelete(e, property.id)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                title="Eliminar Propiedad"
              >
                <IoTrashOutline size={20} />
              </button>
            </div>
            
            <h3 className="font-bold text-lg text-slate-800 leading-tight mb-2 line-clamp-2">
              {property.title}
            </h3>
            
            <div className="text-2xl font-black text-slate-900 mb-4">
              {property.currency} {property.price?.toLocaleString()}
            </div>

            <div className="text-sm text-slate-500 mb-4 line-clamp-1">
              📍 {property.address}, {property.neighborhood}
            </div>

            {property.photos && property.photos.length > 0 && (
              <div className="h-40 w-full rounded-xl overflow-hidden mb-4 relative">
                <img 
                  src={property.photos[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md text-white text-xs">
                  {property.photos.length} fotos
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-auto border-t pt-4">
            <button
              onClick={(e) => handleWhatsApp(e, property.id, property.title)}
              className="flex flex-col items-center justify-center gap-1 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Compartir por WhatsApp"
            >
              <IoLogoWhatsapp size={22} />
              <span className="text-[10px] font-bold">Enviar WA</span>
            </button>
            
            <button
              onClick={(e) => handleShare(e, property.id, property.title)}
              className="flex flex-col items-center justify-center gap-1 p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
              title="Copiar Link"
            >
              <IoShareSocialOutline size={22} />
              <span className="text-[10px] font-bold">Copiar Link</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(`/ficha/${property.id}`, '_blank');
              }}
              className="flex flex-col items-center justify-center gap-1 p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              title="Ver Ficha"
            >
              <IoOpenOutline size={22} />
              <span className="text-[10px] font-bold">Ver Ficha</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
