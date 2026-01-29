"use client";

import { useUi } from "@/context/ui/UiProvider";
import { CiMenuBurger } from "react-icons/ci";

export const MobileMenuButton = () => {
    const { toggleSideMenu } = useUi();

    return (
        <button
            onClick={toggleSideMenu}
            className="w-12 h-16 -mr-2 border-r lg:hidden flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
            <CiMenuBurger size={30} />
        </button>
    )
}
