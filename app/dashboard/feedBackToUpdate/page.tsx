import React from "react";
import prisma from "../../../lib/prisma";
import UpdateFeedBackForm from "../../../components/feedback/UpdateFeedBackForm";
interface FedBackToUpdateProps {
  searchParams: { id: string };
}

const FeedBackToUpdate: React.FC<FedBackToUpdateProps> = async ({
  searchParams,
}) => {
  const { id } = searchParams;
  if (!id) {
    console.error("No id provided in searchParams");
    return <div>Error: No ID provided</div>;
  }
  console.log("%c Line:9 🍋 prelistingId", "color:#7f2b82", id);

  const feedBackData = await prisma.feedBack.findUnique({
    where: { id: id },
    select: {
      id: true,
      date: true,
      asesorCaptador: true,
      asesorVendedor: true,
      masgusto: true,
      menosgusto: true,
      oferta: true,
      valoracion: true,
      feedEstado: true,
      feedInmueble: true,
      feedUbicacion: true,
      prelistingId: true,
    },
  });

  return (
    <div>
      <UpdateFeedBackForm id={feedBackData?.prelistingId as string} />
    </div>
  );
};

export default FeedBackToUpdate;
