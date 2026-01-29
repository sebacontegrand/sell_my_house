"use client";

import { useUi } from "@/context/ui/UiProvider";
import clsx from "clsx";

interface Props {
    children: React.ReactNode;
}

export const SidebarWrapper = ({ children }: Props) => {
    const { isSideMenuOpen, closeSideMenu } = useUi();

    return (
        <>
            {/* Background Overlay (Blakc backdrop) */}
            {isSideMenuOpen && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 transition-opacity lg:hidden"
                    onClick={closeSideMenu}
                />
            )}

            {/* Blur Overlay (Optional, matching 'aside' z-index logic if needed) 
          Actually, the aside is z-20 (on top of backdrop)
      */}

            <aside
                className={clsx(
                    "fixed z-20 top-0 pb-3 px-6 w-1/2 flex flex-col justify-between h-screen border-r bg-white transition-all duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]",
                    {
                        "ml-[-100%]": !isSideMenuOpen,
                        "ml-0": isSideMenuOpen
                    }
                )}
            >
                {children}
            </aside>
        </>
    );
};
