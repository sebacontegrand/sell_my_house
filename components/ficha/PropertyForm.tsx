"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property, propertySchema } from "@/lib/types/property";
import { useState } from "react";
import { IoSaveOutline, IoTrashOutline, IoAddOutline } from "react-icons/io5";
import Image from "next/image";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Título</label>
            <input
              {...register("title")}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1 col-span-1">
              <label className="text-sm font-medium text-gray-700">Moneda</label>
              <select
                {...register("currency")}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
              >
                <option value="USD">USD</option>
                <option value="ARS">ARS</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Sup. Total (m²)</label>
              <input
                type="number"
                step="0.1"
                {...register("totalArea", { valueAsNumber: true })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Sup. Cubierta (m²)</label>
              <input
                type="number"
                step="0.1"
                {...register("coveredArea", { valueAsNumber: true })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Ambientes</label>
              <input
                type="number"
                {...register("rooms", { valueAsNumber: true })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Dormitorios</label>
              <input
                type="number"
                {...register("bedrooms", { valueAsNumber: true })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Baños</label>
              <input
                type="number"
                {...register("bathrooms", { valueAsNumber: true })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            {...register("description")}
            rows={5}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none resize-none"
          />
          {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
        </div>
      </section>

      {/* Gallery */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Galería de Fotos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border">
              <Image src={photo} alt={`Foto ${index}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IoTrashOutline size={14} />
              </button>
            </div>
          ))}
          <div className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-2 text-center hover:border-sky-500 transition-colors">
            <input
              type="text"
              placeholder="Pegar URL de imagen"
              className="w-full text-[10px] outline-none border-none bg-transparent text-center"
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
            <IoAddOutline size={20} className="text-gray-400 mt-1" />
            <span className="text-[10px] text-gray-400">Enter para añadir</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Características y Comodidades</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <span key={index} className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {feature}
              <button type="button" onClick={() => {
                const updated = features.filter((_, i) => i !== index);
                setFeatures(updated);
                setValue("features", updated);
              }}>
                <IoTrashOutline size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Ej: Calefacción central, Piscina..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <IoAddOutline size={24} />
          </button>
        </div>
      </section>

      {/* Contact Info (Defaults to user info later) */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Tus Datos de Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nombre del Agente</label>
            <input
              {...register("agentName")}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">WhatsApp</label>
            <input
              {...register("agentWhatsapp")}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("agentEmail")}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            />
          </div>
        </div>
      </section>

      <div className="pt-8 border-t flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200"
        >
          {isSubmitting ? "Guardando..." : (
            <>
              <IoSaveOutline size={20} />
              Generar Ficha Profesional
            </>
          )}
        </button>
      </div>
    </form>
  );
}
