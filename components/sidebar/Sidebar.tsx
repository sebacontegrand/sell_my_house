import Link from "next/link";
import Image from "next/image";
import React from "react";
import milugar1 from "../../public/images/milugar1.png";
import {
  IoCheckboxOutline,
  IoCloudCircleOutline,
  IoAddCircleOutline,
  IoStatsChartOutline,
  IoSettingsOutline,
  IoSparklesOutline
} from "react-icons/io5";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SidebarItem from "../sidebarItem/SidebarItem";
import LogOutButton from "./LogOutButton";
import { SidebarWrapper } from "./SidebarWrapper";

const menuItems = [
  {
    icon: <IoCheckboxOutline />,
    title: "Propiedades",
    path: "/dashboard/propriedad",
  },
  {
    icon: <IoAddCircleOutline />,
    title: "Crear Ficha",
    path: "/dashboard/crear-ficha",
  },
  {
    icon: <IoSparklesOutline />,
    title: "Market Search (AI)",
    path: "/dashboard/market-search",
  },
  {
    icon: <IoStatsChartOutline />,
    title: "Estadísticas",
    path: "/dashboard/feedback",
  },
];

const Sidebar = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <SidebarWrapper>
      <div className="flex flex-col h-full py-8">
        {/* Branding Area */}
        <div className="px-6 mb-12">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-premium active:scale-95 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 tracking-tighter leading-none text-lg">Mi Lugar</span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mt-1">Real Estate AI</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-8">
          <div>
            <p className="px-4 mb-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Management</p>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <SidebarItem key={item.path} {...item} />
              ))}
            </ul>
          </div>

          <div>
            <p className="px-4 mb-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Settings</p>
            <ul className="space-y-1">
               <SidebarItem 
                 icon={<IoSettingsOutline />} 
                 title="Configuración" 
                 path="/dashboard/profile" 
               />
            </ul>
          </div>
        </nav>

        {/* Bottom Area / User Info */}
        <div className="px-4 mt-auto">
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 mb-4 flex items-center gap-3">
             <Image
               src={session.user?.image || "/default-avatar.png"}
               alt="User"
               width={40}
               height={40}
               className="rounded-2xl border-2 border-white shadow-sm"
             />
             <div className="flex flex-col min-w-0">
               <span className="text-xs font-black text-slate-900 truncate tracking-tight">{session.user?.name}</span>
               <span className="text-[9px] font-bold text-slate-400 truncate uppercase tracking-wider">Premium Member</span>
             </div>
          </div>
          <div className="px-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <LogOutButton />
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
