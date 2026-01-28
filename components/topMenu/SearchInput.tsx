"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { CiSearch } from "react-icons/ci";

export const SearchInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }

        // Only redirect/filter if we are on the properties page (or logic to decide)
        // For now, if we assume this search is GLOBAL or specifically for properties, 
        // maybe we should ensure we are on /dashboard/propriedad?
        // The user said "in search bar i need to search for propriedades", implies this bar controls that list.
        // If we are NOT on /dashboard/propriedad, maybe we should redirect there?
        // Let's assume simpler: Just update params. PropertyTabs will listen if present.
        // IF user wants to search from other pages, we might need:
        // if (pathname !== '/dashboard/propriedad') replace(`/dashboard/propriedad?${params.toString()}`);

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <CiSearch />
            </span>
            <input
                type="text"
                placeholder="Buscar por nombre u operación..."
                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
};
