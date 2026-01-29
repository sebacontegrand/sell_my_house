"use client";

import React, { createContext, useContext, useState } from "react";

interface UiContextProps {
    isSideMenuOpen: boolean;
    toggleSideMenu: () => void;
    closeSideMenu: () => void;
    openSideMenu: () => void;
}

const UiContext = createContext({} as UiContextProps);

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => setIsSideMenuOpen((prev) => !prev);
    const closeSideMenu = () => setIsSideMenuOpen(false);
    const openSideMenu = () => setIsSideMenuOpen(true);

    return (
        <UiContext.Provider
            value={{
                isSideMenuOpen,
                toggleSideMenu,
                closeSideMenu,
                openSideMenu,
            }}
        >
            {children}
        </UiContext.Provider>
    );
};

export const useUi = () => useContext(UiContext);
