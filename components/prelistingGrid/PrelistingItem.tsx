"use client";
import { Prelisting } from "@prisma/client";
import { getFormExistance } from "@/app/api/checkFormExistance/route";
import styles from "./PrelistingItem.module.css";
import {
  IoAddCircleOutline,
  IoCheckboxOutline,
  IoSquareOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  prelisting: Prelisting;
  togglePrelisting: (
    id: string,
    complete: boolean
  ) => Promise<Prelisting | void>;
}

const PrelistingItem = ({ prelisting, togglePrelisting }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    localStorage.setItem("prelistingId", prelisting.id);
    router.push("/dashboard/newFormPage");
  };

  return (
    <div
      className={
        prelisting.complete ? styles.prelistingDone : styles.prelistingPending
      }
    >
      <div
        onClick={handleClick}
        className="flex flex-col sm:flex-row justify-start items-center gap-4 cursor-pointer"
      >
        <div
          onClick={() => togglePrelisting(prelisting.id, !prelisting.complete)}
          className={`flex p-2 rounded-md hover:bg-opacity-60 ${
            prelisting.complete ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {prelisting.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left text-blue-900">
          <strong>Nombre de la Propriedad:</strong> {prelisting.description}
          <hr />
          <strong>Operación:</strong> {prelisting.title}
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PrelistingItem;
