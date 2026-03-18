import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserProfile } from "../crear-ficha/actions";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata = {
  title: "Mi Perfil - Mi Lugar",
  description: "Configura tu información de contacto profesional",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");

  const userProfile = await getUserProfile();

  if (!userProfile) return <div>No se pudo cargar el perfil.</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil Profesional</h1>
        <p className="text-gray-600">
          Esta información se completará automáticamente en cada ficha que crees. 
          De esta manera, el contacto en tus propiedades siempre será el tuyo.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <ProfileForm user={{
          ...userProfile,
          email: session.user.email || ""
        }} />
      </div>
    </div>
  );
}
