import UpdateForm from "@/components/forms/UpdateForm";
import prisma from "@/lib/prisma";
import React from "react";
import { Prelisting } from "@prisma/client";
interface FormToUpdateProps {
  searchParams: { id: string };
}

const FormToUpdate: React.FC<FormToUpdateProps> = async ({ searchParams }) => {
  const { id } = searchParams;
  if (!id) {
    console.error("No id provided in searchParams");
    return <div>Error: No ID provided</div>;
  }
  console.log("%c Line:9 🍋 prelistingId", "color:#7f2b82", id);

  const formData = await prisma.form.findUnique({
    where: { id: id },
    select: {
      id: true,
      prelistingId: true,
      proprietario: true,
      typeoperation: true,
      asesor: true,
      date: true,
      fechadenacimiento: true,
      whysell: true,
      ocupacion: true,
      selltobuy: true,
      solvebeforesell: true,
      includedinsell: true,
    },
  });

  return (
    <div>
      <UpdateForm id={formData?.prelistingId as string} />
    </div>
  );
};

export default FormToUpdate;
