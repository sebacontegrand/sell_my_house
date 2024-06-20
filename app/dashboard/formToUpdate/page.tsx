import UpdateForm from "@/components/forms/UpdateForm";
import prisma from "@/lib/prisma";
import React from "react";

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
      asesor: true,
      date: true,
      fechadenacimiento: true,
      whysell: true,
      ocupacion: true,
      selltobuy: true,
      solvebeforesell: true,
      includedinsell: true,
      whenneedtomove: true,
      whyneedtomove: true,
      neighbors: true,
      neighborhood: true,
      typeoperation: true,
      otrotypeoperation: true,
      direccion: true,
      propertytype: true,
      otropropertytype: true,
      ambientes: true,
      orientacion: true,
      impuestos: true,
      expensas: true,
      servicios: true,
      valoralquiler: true,
      valorventa: true,
      antiguedad: true,
      estado: true,
      heattype: true,
      plantas: true,
      cocheras: true,
      banos: true,
      toilette: true,
      dormitorio: true,
      dormitorioserv: true,
      amenities: true,
      baulera: true,
      cantascensores: true,
      categoria: true,
      mlivinga: true,
      mlivingl: true,
      mcomedora: true,
      mcomedorl: true,
      mcocinaa: true,
      mcocinal: true,
      mdorm1a: true,
      mdorm1l: true,
      mdorm2a: true,
      mdorm2l: true,
      mdorm3a: true,
      mdorm3l: true,
      mdorm4a: true,
      mdorm4l: true,
      mlava: true,
      mlavl: true,
      mhalla: true,
      mhalll: true,
      mbanosa: true,
      mbanosl: true,
      mcocha: true,
      mcochl: true,
      mpiletaa: true,
      mpiletal: true,
      mquinchol: true,
      mquinchoa: true,
      msemicubiertoa: true,
      msemicubiertol: true,
      escritura: true,
      plano: true,
      finalobra: true,
      comentarios: true,
    },
  });

  return (
    <div>
      <UpdateForm id={formData?.prelistingId as string} />
    </div>
  );
};

export default FormToUpdate;
