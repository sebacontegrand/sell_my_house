import prisma from "@/lib/prisma";
import { NewPrelisting } from "@/components/prelistingGrid/NewPrelisting";
import PrelistingGrid from "@/components/prelistingGrid/PrelistingGrid";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listados de Prelistings",
  description: "SEO title",
};

const PropriedadPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");
  const prelistings = await prisma.prelisting.findMany({
    where: { userId: session.user.id },
    orderBy: { description: "asc" },
  });
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewPrelisting />
      </div>
      <PrelistingGrid prelistings={prelistings} />
    </div>
  );
};

export default PropriedadPage;
