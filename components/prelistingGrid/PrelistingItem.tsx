"use client";
import { Prelisting } from "@prisma/client";

import styles from "./PrelistingItem.module.css";
import {
  IoAddCircleOutline,
  IoCheckboxOutline,
  IoSquareOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      const res = await fetch(
        `/api/checkFormExistance?prelistingId=${prelisting.id}`
      );
      const data = await res.json();
      localStorage.setItem("prelistingId", prelisting.id);

      if (data.exists) {
        // Navigate to the specific form detail page
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
      className={`${prelisting.complete ? "bg-green-100 border-green-300" : "bg-white border-gray-200"
        } border rounded-lg p-4 shadow-sm transition-all hover:shadow-md`}
    >
      <div
        className="flex flex-col sm:flex-row justify-start items-center gap-4 cursor-pointer"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this property?")) {
              onDelete(prelisting.id);
            }
          }}
          className="flex p-2 rounded-md hover:bg-red-200 text-red-500 transition-colors"
          title="Delete Property"
        >
          <IoTrashOutline size={24} />
        </div>


        <div onClick={handleClick} className="flex-1 text-center sm:text-left text-blue-900">
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
