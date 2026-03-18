"use client";

import { useState } from "react";
import { updateUserProfile } from "@/app/dashboard/crear-ficha/actions";
import { UserProfile } from "@/lib/types/user";
import { IoSaveOutline, IoPersonOutline, IoCallOutline, IoLogoWhatsapp, IoBusinessOutline } from "react-icons/io5";

interface Props {
  user: UserProfile;
}

export default function ProfileForm({ user }: Props) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    whatsapp: user.whatsapp || "",
    officeName: user.officeName || "",
    email: user.email || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await updateUserProfile(formData);
      setMessage({ type: "success", text: "Perfil actualizado correctamente. Tu información se usará en las nuevas fichas." });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Error al actualizar el perfil. Intenta de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {message && (
        <div className={`p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <IoPersonOutline /> Nombre Completo
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            placeholder="Juan Pérez"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <IoBusinessOutline /> Nombre de la Inmobiliaria
          </label>
          <input
            type="text"
            value={formData.officeName}
            onChange={(e) => setFormData({ ...formData, officeName: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            placeholder="Mi Lugar Propiedades"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <IoCallOutline /> Teléfono
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            placeholder="+54 9 11 ..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <IoLogoWhatsapp /> WhatsApp (Solo números)
          </label>
          <input
            type="text"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, "") })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            placeholder="5491133445566"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            📧 Email de Contacto
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-sky-500 outline-none"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-100 disabled:bg-sky-300"
        >
          {isSubmitting ? "Guardando..." : (
            <>
              <IoSaveOutline size={20} />
              Guardar Configuración
            </>
          )}
        </button>
      </div>
    </form>
  );
}
