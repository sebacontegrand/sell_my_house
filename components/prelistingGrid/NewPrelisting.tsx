"use client";
import * as api from "@/helpers/prelistings";
import { createPrelisting } from "@/helpers/prelistings";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

export const NewPrelisting = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return;
    await createPrelisting(title, description);
    router.refresh();
    console.log("Creado", createPrelisting);
    setDescription("");
    setTitle("");
  };
  const deleteCompleted = async () => {
    const deleteAllCompleted = await api.deletedPrelisting();
    router.refresh();
    console.log("delete", deleteAllCompleted);
  };
  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="w-50% -ml-10 mr-10 pl-3 pr-3 py-2  rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
        placeholder="Nombre de propriedad?"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
        placeholder="¿Qué necesita ser hecho?"
      />
      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>
      <span className="flex flex-1"></span>
    </form>
  );
};
