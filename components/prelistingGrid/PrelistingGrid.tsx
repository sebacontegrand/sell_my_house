"use client";
import { Prelisting } from "@prisma/client";
import * as api from "@/helpers/prelistings";
import { useRouter } from "next/navigation";
import PrelistingItem from "./PrelistingItem";
interface Props {
  prelistings?: (Omit<Prelisting, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  })[];
}
const PrelistingGrid = ({ prelistings }: Props) => {
  console.log("%c Line:10 🍒 prelistings", "color:#b03734", prelistings);
  const router = useRouter();
  const deletePrelisting = async (id: string) => {
    await api.deletePrelisting(id);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 cursor-pointer">
      {prelistings?.map((prelisting) => (
        <PrelistingItem
          key={prelisting.id}
          prelisting={prelisting}
          onDelete={deletePrelisting}
        />
      ))}
    </div>
  );
};

export default PrelistingGrid;
