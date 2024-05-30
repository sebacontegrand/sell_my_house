"use client";
import { Prelisting } from "@prisma/client";
import * as api from "@/helpers/prelistings";
import { useRouter } from "next/navigation";
import PrelistingItem from "./PrelistingItem";
interface Props {
  prelistings?: Prelisting[];
}
const PrelistingGrid = ({ prelistings }: Props) => {
  console.log("%c Line:10 🍒 prelistings", "color:#b03734", prelistings);
  const router = useRouter();
  const togglePrelisting = async (id: string, complete: boolean) => {
    const updatedPrelisting = await api.updatePrelisting(id, complete);
    console.log(
      "%c Line:13 🍋 updatedPrelisting",
      "color:#2eafb0",
      updatedPrelisting
    );

    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 cursor-pointer">
      {prelistings?.map((prelisting) => (
        <PrelistingItem
          key={prelisting.id}
          prelisting={prelisting}
          togglePrelisting={togglePrelisting}
        />
      ))}
    </div>
  );
};

export default PrelistingGrid;
