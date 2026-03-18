import prisma from "@/lib/prisma";
import { NewPrelisting } from "@/components/prelistingGrid/NewPrelisting";
import { PropertyTabs } from "@/components/prelistingGrid/PropertyTabs";
import PrelistingGrid from "@/components/prelistingGrid/PrelistingGrid";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Propriedades",
  description: "Gestión de propiedades",
};

const PropriedadPage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  
  // Ensure we have the DB user ID
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!dbUser) redirect("/api/auth/signin");

  const [dbPrelistings, dbProperties] = await Promise.all([
    prisma.prelisting.findMany({
      where: { userId: dbUser.id },
      orderBy: { description: "asc" },
    }),
    prisma.property.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  console.log(`[PROPRIEDAD DEBUG] User: ${session.user.id}, Prelistings: ${dbPrelistings.length}, Properties: ${dbProperties.length}`);

  const prelistings = dbPrelistings.map((item: typeof dbPrelistings[0]) => ({
    ...item,
    createdAt: item.createdAt.toString(),
    updatedAt: item.updatedAt.toString(),
  }));

  const properties = dbProperties.map((item: typeof dbProperties[0]) => ({
    ...item,
    createdAt: item.createdAt.toString(),
    updatedAt: item.updatedAt.toString(),
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Mis Propiedades</h1>
      <p className="text-slate-500 mb-8">Administra tus captaciones y Fichas compartibles para clientes.</p>
      <Suspense fallback={<div className="text-gray-500 animate-pulse">Cargando tus propiedades...</div>}>
        <PropertyTabs prelistings={prelistings} properties={properties} />
      </Suspense>
    </div>
  );
};

export default PropriedadPage;
