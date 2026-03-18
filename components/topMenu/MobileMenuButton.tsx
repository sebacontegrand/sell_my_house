"use client";

import { useUi } from "@/context/ui/UiProvider";
import { IoMenuOutline } from "react-icons/io5";

export const MobileMenuButton = () => {
    const { toggleSideMenu } = useUi();

    return (
        <button
            onClick={toggleSideMenu}
            className="w-10 h-10 lg:hidden flex items-center justify-center bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
        >
            <IoMenuOutline size={24} className="text-slate-900" />
        </button>
    )
}
