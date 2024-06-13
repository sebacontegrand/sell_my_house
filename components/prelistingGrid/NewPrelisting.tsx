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
      <div className="sm:flex flex-row">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="flex-1 min-w-[200px] sm:min-w-[300px] md:min-w-[300px] lg:min-w-[350px] pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
          placeholder="Nombre de propriedad?"
        />

        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="flex-1 min-w-[200px] sm:min-w-[250px]  md:min-w-[300px] lg:min-w-[350px] pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
          placeholder="¿Qué necesita ser hecho?"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center rounded bg-sky-500 px-2 py-2 text-white hover:bg-sky-700 transition-all text-xs sm:text-base"
      >
        Crear
      </button>
      <span className="flex-grow"></span>
      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded bg-red-400  py-0 px-2 text-white hover:bg-red-700 transition-all text-xs sm:text-base"
      >
        <span className="hidden sm:inline-block mr-2">
          <IoTrashOutline />
        </span>
        Delete Completed
      </button>
    </form>
  );
};
