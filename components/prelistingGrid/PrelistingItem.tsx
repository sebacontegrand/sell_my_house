"use client";

import { Prelisting } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  IoTrashOutline, 
  IoChevronForwardOutline, 
  IoTimeOutline,
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
  prelisting: Omit<Prelisting, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  };
  onDelete: (id: string) => Promise<void>;
}

const PrelistingItem = ({ prelisting, onDelete }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/checkFormExistance?prelistingId=${prelisting.id}`);
      const data = await res.json();
      localStorage.setItem("prelistingId", prelisting.id);

      if (data.exists) {
        router.push(`/dashboard/form/${prelisting.id}`);
      } else {
        router.push("/dashboard/newFormPage");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative bg-white border border-slate-100 hover:border-slate-200 rounded-3xl p-5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-premium flex items-center justify-between",
        loading && "opacity-60 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors",
          prelisting.complete ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
        )}>
          {prelisting.complete ? (
            <IoTimeOutline size={24} />
          ) : (
            <IoTimeOutline size={24} />
          )}
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 text-lg truncate leading-none mb-1.5">
            {prelisting.description || "Nueva Propiedad"}
          </h3>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className={cn(
              "px-2 py-0.5 rounded-md text-[10px]",
              prelisting.complete ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
            )}>
              {prelisting.complete ? "Completo" : "Borrador AI"}
            </span>
            <span>•</span>
            <span>{prelisting.title || "Venta"}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-slate-50">
              <IoEllipsisVertical size={20} className="text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 border-slate-100 shadow-premium">
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); handleClick(); }}
              className="rounded-xl px-4 py-3 font-bold text-slate-700 flex items-center gap-3"
            >
              <IoChevronForwardOutline size={18} />
              Continuar Editando
            </DropdownMenuItem>
            <div className="my-1 border-t border-slate-50" />
            <DropdownMenuItem 
              className="rounded-xl px-4 py-3 font-bold text-red-500 flex items-center gap-3 focus:bg-red-50 focus:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("¿Eliminar este borrador?")) {
                  onDelete(prelisting.id);
                }
              }}
            >
              <IoTrashOutline size={18} />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="p-2 text-slate-300 group-hover:text-slate-900 transition-colors group-hover:translate-x-1 duration-300">
          <IoChevronForwardOutline size={24} />
        </div>
      </div>
      
      {loading && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100 overflow-hidden rounded-b-3xl">
          <div className="h-full bg-slate-900 animate-progress w-2/3" />
        </div>
      )}
    </div>
  );
};

export default PrelistingItem;
