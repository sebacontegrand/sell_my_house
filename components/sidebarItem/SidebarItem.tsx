"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useUi } from "@/context/ui/UiProvider";
import { cn } from "@/lib/utils";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

const SidebarItem = ({ icon, path, title }: Props) => {
  const pathName = usePathname();
  const { closeSideMenu } = useUi();
  const isActive = path === pathName;

  return (
    <li>
      <Link
        href={path}
        onClick={closeSideMenu}
        className={cn(
          "group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm",
          isActive 
            ? "bg-slate-900 text-white shadow-premium scale-[1.02]" 
            : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        <span className={cn(
          "transition-colors",
          isActive ? "text-white" : "text-slate-300 group-hover:text-slate-900"
        )}>
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </span>

        <span className="tracking-tight">{title}</span>
        
        {isActive && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
