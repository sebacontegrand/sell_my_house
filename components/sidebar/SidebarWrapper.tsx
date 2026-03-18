"use client";

import { useUi } from "@/context/ui/UiProvider";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
}

export const SidebarWrapper = ({ children }: Props) => {
    const { isSideMenuOpen, closeSideMenu } = useUi();

    return (
        <>
            {/* Background Overlay */}
            <div
                className={cn(
                  "fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-sm transition-opacity duration-500 lg:hidden",
                  isSideMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={closeSideMenu}
            />

            <aside
                className={cn(
                    "fixed z-50 top-0 left-0 h-screen w-72 bg-white/50 backdrop-blur-xl transition-all duration-500 border-r border-slate-50 lg:translate-x-0",
                    isSideMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {children}
            </aside>
        </>
    );
};
