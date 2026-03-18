"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property, propertySchema } from "@/lib/types/property";
import { useState } from "react";
import { 
  IoSaveOutline, 
  IoTrashOutline, 
  IoAddOutline, 
  IoCameraOutline, 
  IoLayersOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoTextOutline,
  IoSparklesOutline
} from "react-icons/io5";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  initialData: Partial<Property>;
  onSubmit: (data: Property) => Promise<void>;
}

export default function PropertyForm({ initialData, onSubmit }: Props) {
  const [photos, setPhotos] = useState<string[]>(initialData.photos || []);
  const [features, setFeatures] = useState<string[]>(initialData.features || []);
  const [newFeature, setNewFeature] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<Property>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      ...initialData,
      currency: initialData.currency || "USD",
      features: initialData.features || [],
      photos: initialData.photos || [],
    },
  });

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const updated = [...features, newFeature.trim()];
      setFeatures(updated);
      setValue("features", updated);
      setNewFeature("");
    }
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    setValue("photos", updated);
  };

  const SectionHeader = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 shadow-sm flex-shrink-0">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm font-medium">{description}</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 pb-24">
      {/* General Info */}
      <section className="animate-in fade-in duration-500">
        <SectionHeader 
          icon={IoSparklesOutline} 
          title="Información General" 
          description="Define el título, tipo de operación y precio de mercado." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Título de la Publicación</label>
            <Input
              {...register("title")}
              placeholder="Ej: Espectacular Depto 3 amb con Cochera"
              className="bg-slate-50 border-none h-14 font-bold text-lg"
            />
            {errors.title && <span className="text-red-500 text-xs ml-4">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Moneda</label>
              <select
                {...register("currency")}
                className="w-full h-14 bg-slate-50 border-none rounded-xl px-4 font-bold text-lg focus:ring-2 focus:ring-slate-200"
              >
                <option value="USD">USD</option>
                <option value="ARS">ARS</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Precio</label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="bg-slate-50 border-none h-14 font-bold text-lg"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location & Spaces */}
      <section className="animate-in fade-in duration-700">
        <SectionHeader 
          icon={IoLocationOutline} 
          title="Ubicación y Espacios" 
          description="Detalla dónde se encuentra y las dimensiones del inmueble." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Dirección</label>
            <Input
              {...register("address")}
              placeholder="Ej: Av. del Libertador 1200"
              className="bg-slate-50 border-none h-14 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Barrio / Ciudad</label>
            <Input
              {...register("neighborhood")}
              placeholder="Ej: Palermo Nuevo"
              className="bg-slate-50 border-none h-14 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Total m²</label>
            <Input type="number" step="0.1" {...register("totalArea", { valueAsNumber: true })} className="bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Cubiertos m²</label>
            <Input type="number" step="0.1" {...register("coveredArea", { valueAsNumber: true })} className="bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Ambientes</label>
            <Input type="number" {...register("rooms", { valueAsNumber: true })} className="bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Dormit.</label>
            <Input type="number" {...register("bedrooms", { valueAsNumber: true })} className="bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Baños</label>
            <Input type="number" {...register("bathrooms", { valueAsNumber: true })} className="bg-slate-50 border-none font-bold" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section>
        <SectionHeader 
          icon={IoCameraOutline} 
          title="Galería de Fotos" 
          description="Las imágenes de portada que verán tus clientes." 
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border-4 border-white shadow-premium">
              <Image src={photo} alt={`Foto ${index}`} fill className="object-cover transition-transform group-hover:scale-110" unoptimized={true} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
              >
                <IoTrashOutline size={14} />
              </button>
            </div>
          ))}
          <div className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 text-center hover:border-slate-900 hover:bg-slate-50 transition-all group">
            <input
              type="text"
              placeholder="URL de foto"
              className="w-full text-[10px] outline-none border-none bg-transparent text-center font-bold"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const url = (e.target as HTMLInputElement).value.trim();
                  if (url) {
                    const updated = [...photos, url];
                    setPhotos(updated);
                    setValue("photos", updated);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
            <IoAddOutline size={24} className="text-slate-300 group-hover:text-slate-900 mt-2" />
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <SectionHeader 
          icon={IoTextOutline} 
          title="Descripción Detallada" 
          description="Escribe un texto persuasivo para enamorar al comprador." 
        />
        <div className="space-y-4">
          <textarea
            {...register("description")}
            rows={8}
            className="w-full bg-slate-50 border-none rounded-[2rem] p-8 font-medium text-slate-900 focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-300"
            placeholder="Describe los puntos fuertes de la propiedad..."
          />
          {errors.description && <span className="text-red-500 text-xs ml-4">{errors.description.message}</span>}
        </div>
      </section>

      {/* Features */}
      <section>
        <SectionHeader 
          icon={IoLayersOutline} 
          title="Características" 
          description="Etiquetas rápidas para amenities y servicios." 
        />
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span key={index} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 group">
                {feature}
                <button type="button" onClick={() => {
                  const updated = features.filter((_, i) => i !== index);
                  setFeatures(updated);
                  setValue("features", updated);
                }} className="hover:text-red-400">
                  <IoTrashOutline size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-3 max-w-md">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Ej: Parrilla, Seguridad 24hs..."
              className="bg-slate-50 border-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddFeature}
              variant="outline"
              className="rounded-xl px-4"
            >
              <IoAddOutline size={24} />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section>
        <SectionHeader 
          icon={IoPersonOutline} 
          title="Tus Datos de Contacto" 
          description="Asegúrate de que los interesados puedan encontrarte." 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Nombre</label>
            <Input {...register("agentName")} className="bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">WhatsApp</label>
            <Input {...register("agentWhatsapp")} className="bg-slate-50 border-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Email</label>
            <Input {...register("agentEmail")} className="bg-slate-50 border-none font-bold" />
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar for Submit */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50 flex justify-center">
        <div className="max-w-4xl w-full flex justify-between items-center gap-4">
          <p className="hidden md:block text-slate-400 text-sm font-medium">
            ¡Ya casi está! Revisa todo antes de publicar.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto h-14 md:px-12 rounded-2xl bg-slate-900 hover:bg-black font-black text-xl gap-3 shadow-premium active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <IoSaveOutline size={22} />
                Publicar Ficha
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
