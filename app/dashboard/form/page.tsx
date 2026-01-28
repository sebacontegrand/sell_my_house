import React from "react";
import { FormGrid } from "../../../components/forms/FormGrid";

import prisma from "../../../lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Listados de forms",
  description: "SEO title",
};
enum typeEnum {
  alquiler = "alquiler",
  venta = "venta",
  alquilertemporario = "alquilertemporario",
  ventayalquiler = "ventayalquiler",
  ventayalqtemp = "ventayalqtemp",
  otros = "otros",
}
const Form = async () => {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");
  const prelistings = await prisma.prelisting.findMany({
    where: { userId: session.user?.id },
    select: {
      id: true,
    },
  });
  const prelistingIds = prelistings.map((prelisting: typeof prelistings[0]) => prelisting.id);
  const forms = await prisma.form?.findMany({
    where: { prelistingId: { in: prelistingIds } },
    orderBy: { date: "asc" },
    select: {
      id: true,
      proprietario: true,
      typeoperation: true,
      asesor: true,
    },
  });
  const typedForms = forms.map((form: typeof forms[0]) => ({
    ...form,
    typeoperation: form.typeoperation as typeEnum, // Ensure typeoperation is cast to typeEnum
  }));
  return (
    <div>
      <FormGrid forms={typedForms} />
    </div>
  );
};
export default Form;
