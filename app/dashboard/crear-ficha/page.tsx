import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CrearFichaClient from "@/components/ficha/CrearFichaClient";
import { getUserProfile } from "./actions";

export const metadata = {
  title: "Crear ficha - Mi Lugar",
  description: "Importar propiedad desde cualquier URL",
};

export default async function CrearFichaPage() {
  const session = await auth();

  const userProfile = await getUserProfile();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Nueva Ficha</h1>
        <p className="text-gray-600">
          Pegue la URL de una publicación (Argenprop u otros) para importar los datos.
        </p>
      </div>

      <CrearFichaClient 
        userId={session.user.id} 
        userProfile={userProfile}
      />
    </div>
  );
}
