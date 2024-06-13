import prisma from "@/lib/prisma";
import { NewPrelisting } from "@/components/prelistingGrid/NewPrelisting";
import PrelistingGrid from "@/components/prelistingGrid/PrelistingGrid";
import { SpinnerDotted } from "spinners-react";
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
      <h1 className="pb-4 text-2xl text-yellow-800 font-bold">
        Propriedades en Gestión
      </h1>

      {prelistings ? (
        <>
          <div className="w-full px-3 sm:px-1 md:px-1 lg:px-2 xl:px-2 mx-2 sm:mx-2 md:mx-1 lg:mx-2 xl:mx-2 mb-5">
            <NewPrelisting />
          </div>
          <PrelistingGrid prelistings={prelistings} />
        </>
      ) : (
        <SpinnerDotted
          size={50}
          thickness={100}
          speed={100}
          color="rgba(172, 125, 57, 1)"
        />
      )}
    </div>
  );
};

export default PropriedadPage;
