"use client";
import * as api from "@/helpers/prelistings";
import { createPrelisting } from "@/helpers/prelistings";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { PhotoUpload } from "../uploads/PhotoUpload";

export const NewPrelisting = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return;
    await createPrelisting(title, description, photos);
    setDescription("");
    setTitle("");
    setPhotos([]);
    // Redirect to "propriedades existentes" tab
    router.push("/dashboard/propriedad");
    router.refresh();
  };

  const deleteCompleted = async () => {
    const deleteAllCompleted = await api.deletedPrelisting();
    router.refresh();
    console.log("delete", deleteAllCompleted);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="flex-1 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
            placeholder="Nombre de propriedad?"
          />

          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            className="flex-1 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
            placeholder="¿Qué necesita ser hecho?"
          />

          <button
            type="submit"
            className="flex items-center justify-center rounded bg-sky-500 px-4 py-2 text-white hover:bg-sky-700 transition-all"
          >
            Crear
          </button>
        </div>

        <PhotoUpload photos={photos} onPhotosChange={setPhotos} />
      </form>
    </div>
  );
};
