"use client";

import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  IoTrashOutline, 
  IoShareSocialOutline, 
  IoLogoWhatsapp, 
  IoEllipsisVertical 
} from "react-icons/io5";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  properties: (Omit<Property, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  })[];
}

export default function PropertyGrid({ properties }: Props) {
  console.log('PropertyGrid received properties:', properties);
  const router = useRouter();

  const handleShare = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/ficha/${id}`;
    navigator.clipboard.writeText(url);
    // Simple toast would be better, but keeping it minimalist
  };

  const handleWhatsApp = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/ficha/${id}`;
    const message = `🏡 ¡Mirá esta propiedad: ${title}!\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
          <IoShareSocialOutline size={32} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No tienes fichas creadas</h3>
        <p className="text-slate-500 max-w-xs mx-auto mb-8">
          Importa una propiedad o créala manualmente para empezar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {properties.map((property) => (
        <div 
          key={property.id} 
          onClick={() => window.open(`/ficha/${property.id}`, '_blank')}
          className="group relative bg-white border border-slate-100 hover:border-slate-200 rounded-3xl p-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-premium flex items-center gap-4"
        >
          {/* Thumbnail */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
            {property.photos?.[0] ? (
              <Image 
                src={property.photos[0]} 
                alt={property.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized={true}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-300">
                <IoShareSocialOutline size={24} />
              </div>
            )}
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-tighter text-slate-900">
              {property.operationType || "Venta"}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pr-12">
            <h3 className="font-bold text-slate-900 text-lg md:text-xl truncate mb-1">
              {property.title}
            </h3>
            <p className="text-slate-400 text-sm font-medium mb-3 truncate">
              {property.address}, {property.neighborhood}
            </p>
            
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-0.5">Precio</span>
                <span className="text-xl md:text-2xl font-black text-slate-900 leading-none">
                  {property.currency} {property.price?.toLocaleString()}
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                  Publicado
                </span>
              </div>
            </div>
          </div>

          {/* Side Bio/Actions on Desktop, Context Menu everywhere */}
          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-slate-50">
                  <IoEllipsisVertical size={20} className="text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-slate-100 shadow-premium">
                <DropdownMenuItem 
                  onClick={(e) => { e.stopPropagation(); window.open(`/ficha/${property.id}`, '_blank'); }}
                  className="rounded-xl px-4 py-3 font-bold text-slate-700 flex items-center gap-3"
                >
                  <IoShareSocialOutline size={18} />
                  Ver Ficha Pública
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => handleWhatsApp(e, property.id, property.title)}
                  className="rounded-xl px-4 py-3 font-bold text-emerald-600 flex items-center gap-3"
                >
                  <IoLogoWhatsapp size={18} />
                  Enviar por WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => handleShare(e, property.id, property.title)}
                  className="rounded-xl px-4 py-3 font-bold text-sky-600 flex items-center gap-3"
                >
                  <IoShareSocialOutline size={18} />
                  Copiar Enlace
                </DropdownMenuItem>
                <div className="my-1 border-t border-slate-50" />
                <DropdownMenuItem 
                  className="rounded-xl px-4 py-3 font-bold text-red-500 flex items-center gap-3 focus:bg-red-50 focus:text-red-600"
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (confirm("¿Eliminar esta ficha?")) {
                      await fetch(`/api/properties/${property.id}`, { method: "DELETE" });
                      router.refresh();
                    }
                  }}
                >
                  <IoTrashOutline size={18} />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
      
    </div>
  );
}
