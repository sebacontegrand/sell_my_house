"use client";
import * as api from "@/helpers/prelistings";
import { createPrelisting } from "@/helpers/prelistings";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export const NewPrelisting = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return;
    await createPrelisting(title, description);
    setShowAlert(true);
    router.refresh();
    console.log("Creado", createPrelisting);
    setDescription("");
    setTitle("");
  };
  const handleAlertAction = () => {
    setShowAlert(false);
  };
  const deleteCompleted = async () => {
    const deleteAllCompleted = await api.deletedPrelisting();
    router.refresh();
    console.log("delete", deleteAllCompleted);
  };
  return (
    <>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Heads up!</AlertDialogTitle>
              <AlertDialogDescription>
                Propiedad Nueva! Creada.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleAlertAction}>
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <form onSubmit={onSubmit} className="flex w-full">
        <div className="sm:flex flex-row">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="flex-1 min-w-[227px] sm:min-w-[250px]  md:min-w-[300px] lg:min-w-[350px] pl-1 pr-1 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
            placeholder="Nombre de propriedad?"
          />

          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            className="flex-1 min-w-[227px] sm:min-w-[250px]  md:min-w-[300px] lg:min-w-[350px] pl-1 pr-1 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all text-gray-900"
            placeholder="¿Qué necesita ser hecho?"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center rounded bg-yellow-500 px-4 mx-1 py-2 text-white hover:bg-yellow-700 transition-all text-xs sm:text-base"
        >
          Crear
        </button>
        <span className="flex-grow"></span>
        <button
          onClick={() => deleteCompleted()}
          type="button"
          className="flex items-center justify-center rounded bg-yellow-400  py-0 px-2 text-white hover:bg-yellow-700 transition-all text-xs sm:text-base"
        >
          <span className="hidden sm:inline-block mr-2">
            <IoTrashOutline />
          </span>
          Delete Completed
        </button>
      </form>
    </>
  );
};
