import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import {
  CiBellOn,
  CiChat1,
  CiMenuBurger,
  CiSearch,
  CiShoppingBasket,
} from "react-icons/ci";
import { SearchInput } from "./SearchInput";
import { auth } from "@/auth";

const TopMenu = async () => {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
  const session = await auth();

  const getTotalCount = () => {
    let items = 0;
    Object.values(cart).forEach((value) => {
      items += value as number;
    });
    return items;
  };
  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4 h-full">
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <SearchInput />
          </div>
        </div>

        {session && (
          <div className="flex items-center space-x-3">
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt={session.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
              width={40}
              height={40}
            />
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-700">
                {session.user?.name}
              </p>
              <p className="text-xs text-gray-500">
                {session.user?.roles?.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopMenu;
