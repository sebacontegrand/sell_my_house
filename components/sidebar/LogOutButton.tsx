"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { 
  IoLogOutOutline, 
  IoLogInOutline,
  IoShieldCheckmarkOutline 
} from "react-icons/io5";

const LogOutButton = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 text-slate-300">
        <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
        <span className="text-xs font-bold uppercase tracking-widest">Cargando...</span>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <button
        onClick={() => signOut()}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-bold text-sm w-full group"
      >
        <IoLogOutOutline size={20} className="transition-transform group-hover:-translate-x-1" />
        <span className="tracking-tight">Cerrar Sesión</span>
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white hover:bg-black transition-all font-bold text-sm w-full shadow-premium"
      >
        <IoLogInOutline size={20} />
        <span className="tracking-tight">Iniciar Sesión</span>
      </button>
    );
  }

  return null;
};

export default LogOutButton;
