import { cookies } from "next/headers";
import Image from "next/image";
import { SearchInput } from "./SearchInput";
import { auth } from "@/auth";
import { MobileMenuButton } from "./MobileMenuButton";
import { IoNotificationsOutline } from "react-icons/io5";

const TopMenu = async () => {
  const session = await auth();

  return (
    <div className="sticky z-40 top-0 w-full h-20 bg-white/70 backdrop-blur-xl border-b border-slate-50 flex items-center">
      <div className="px-6 flex items-center justify-between w-full gap-8">
        
        {/* Left: Mobile Menu & Breadcrumbs/Context */}
        <div className="flex items-center gap-4">
          <MobileMenuButton />
          <div className="hidden sm:block">
             <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Dashboard</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center">
          <SearchInput />
        </div>

        {/* Right: User & Notifications */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:flex text-slate-400 hover:text-slate-900 transition-colors">
            <IoNotificationsOutline size={22} />
          </button>

          {session && (
            <div className="flex items-center gap-3 bg-slate-50/50 p-1 pr-4 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer group">
              <div className="relative">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt={session.user?.name || "User"}
                  className="w-8 h-8 rounded-xl object-cover border-2 border-white shadow-sm"
                  width={32}
                  height={32}
                />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="hidden md:flex flex-col min-w-0">
                <p className="text-[10px] font-black text-slate-900 truncate tracking-tight">
                  {session.user?.name}
                </p>
                <p className="text-[9px] font-bold text-sky-500 uppercase tracking-widest">
                  PRO
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
