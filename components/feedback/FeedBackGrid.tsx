import { FeedBack, Prelisting } from "@prisma/client";
import React from "react";
import FeedBackItem from "./FeedBackItem";
import prisma from "@/lib/prisma";

interface Props {
  feedBacks: FeedBack[];
}
export const FeedBackGrid = ({ feedBacks }: Props) => {
  console.log("%c Line:11 🌶 form", "color:#2eafb0", feedBacks);
  const getPrelistingDataByID = async (prelistingId: string) => {
    try {
      const prelisting = await prisma.prelisting.findUnique({
        where: {
          id: prelistingId,
        },
        select: {
          title: true,
          description: true,
        },
      });
      return prelisting;
    } catch (error) {
      console.error("Error fetching prelisting by ID:", error);
      return null;
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 cursor-pointer">
      {feedBacks.map(async (f) => {
        const prelisting = await getPrelistingDataByID(f.prelistingId);
        return (
          <FeedBackItem
            key={f.id}
            id={f.id}
            prelistingId={f.prelistingId}
            oferta={f.oferta}
            asesorCaptador={f.asesorCaptador}
            asesorVendedor={f.asesorVendedor}
            title={prelisting?.title || ""}
            description={prelisting?.description || ""}
          />
        );
      })}
    </div>
  );
};
