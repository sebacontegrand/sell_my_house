"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { IoSparklesOutline } from "react-icons/io5";

export function ProcessingStep() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
            <IoSparklesOutline size={40} className="text-sky-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-sky-500 rounded-full animate-ping" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Magia en proceso...</h2>
        <p className="text-slate-500 font-medium">Estamos analizando la información y estructurando tu ficha.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-premium space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-10 w-full rounded-2xl" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-32 rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <Skeleton className="h-20 w-20 rounded-2xl" />
          </div>
        </div>

        <div className="pt-6">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 animate-progress w-full" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 text-center">
            Extrayendo ambientes, fotos y descripción...
          </p>
        </div>
      </div>
    </div>
  );
}
