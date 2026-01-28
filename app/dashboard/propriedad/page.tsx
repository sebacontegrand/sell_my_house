import prisma from "@/lib/prisma";
import { NewPrelisting } from "@/components/prelistingGrid/NewPrelisting";
import { PropertyTabs } from "@/components/prelistingGrid/PropertyTabs";
import PrelistingGrid from "@/components/prelistingGrid/PrelistingGrid";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Propriedades",
  description: "Gestión de propiedades",
};

const PropriedadPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");
  const dbPrelistings = await prisma.prelisting.findMany({
    where: { userId: session.user.id },
    orderBy: { description: "asc" },
  });

  const prelistings = dbPrelistings.map((item: typeof dbPrelistings[0]) => ({
    ...item,
    createdAt: item.createdAt.toString(),
    updatedAt: item.updatedAt.toString(),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Propriedades</h1>
      <PropertyTabs prelistings={prelistings} />
    </div>
  );
};

export default PropriedadPage;
