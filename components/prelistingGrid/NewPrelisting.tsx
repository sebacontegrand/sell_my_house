"use client";

import * as api from "@/helpers/prelistings";
import { createPrelisting } from "@/helpers/prelistings";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PhotoUpload } from "../uploads/PhotoUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSparklesOutline } from "react-icons/io5";

export const NewPrelisting = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return;
    setLoading(true);
    try {
      await createPrelisting(title, description, photos);
      setDescription("");
      setTitle("");
      setPhotos([]);
      router.push("/dashboard/propriedad");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-premium">
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Nombre de la Propiedad</label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Ej: Depto 3 ambientes en Palermo"
              className="bg-slate-50 border-none h-14 text-lg font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Breve Descripción</label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Ej: Piso 12, vista al río, reciclado a nuevo"
              className="bg-slate-50 border-none h-14 text-lg font-bold"
            />
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Fotos de la Propiedad</label>
           <PhotoUpload photos={photos} onPhotosChange={setPhotos} />
        </div>

        <Button
          type="submit"
          disabled={loading || !title.trim()}
          className="w-full h-14 rounded-2xl text-lg font-black gap-3 bg-slate-900 hover:bg-black transition-all"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <IoSparklesOutline size={22} className="text-sky-400" />
              Crear y Procesar con AI
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
