"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { IoSearchOutline } from "react-icons/io5";

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
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative group max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
                <IoSearchOutline size={18} />
            </div>
            <input
                type="text"
                placeholder="Busca propiedades..."
                className="w-full h-11 bg-slate-50 border-none rounded-2xl pl-11 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-200 transition-all"
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
            </div>
        </div>
    );
};
