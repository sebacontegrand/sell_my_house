import { FeedBackGrid } from "@/components/feedback/FeedBackGrid";
import prisma from "@/lib/prisma";
import React from "react";

const FeedBackPage = async () => {
  const feedbacks = await prisma.feedBack.findMany({
    orderBy: {
      date: "desc",
    },
  });
  return (
    <div>
      <h1 className="pb-4 text-2xl text-yellow-800 font-bold">
        FeedBack a Clientes
      </h1>
      <FeedBackGrid feedBacks={feedbacks} />
    </div>
  );
};

export default FeedBackPage;
