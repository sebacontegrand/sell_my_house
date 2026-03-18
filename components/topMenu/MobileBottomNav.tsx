"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  IoHomeOutline, 
  IoHome, 
  IoAddCircleOutline, 
  IoAddCircle,
  IoLayersOutline,
  IoLayers,
  IoStatsChartOutline,
  IoStatsChart
} from "react-icons/io5";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: IoHomeOutline,
      activeIcon: IoHome,
    },
    {
      label: "Mis Fichas",
      href: "/dashboard/propriedad",
      icon: IoLayersOutline,
      activeIcon: IoLayers,
    },
    {
      label: "Nueva",
      href: "/dashboard/crear-ficha",
      icon: IoAddCircleOutline,
      activeIcon: IoAddCircle,
      isSpecial: true,
    },
    {
      label: "Mundo",
      href: "/dashboard/market-search",
      icon: IoStatsChartOutline,
      activeIcon: IoStatsChart,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] h-16 shadow-2xl flex items-center justify-around px-4 border border-white/10 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative",
                isActive ? "text-sky-400 scale-110" : "text-slate-400 hover:text-white"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                item.isSpecial && !isActive ? "bg-white/10" : ""
              )}>
                <Icon size={item.isSpecial ? 26 : 22} />
              </div>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-sky-400 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
