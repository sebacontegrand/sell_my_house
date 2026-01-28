import { cookies } from "next/headers";
import Link from "next/link";
import {
  CiBellOn,
  CiChat1,
  CiMenuBurger,
  CiSearch,
  CiShoppingBasket,
} from "react-icons/ci";
import { SearchInput } from "./SearchInput";

const TopMenu = () => {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");

  const getTotalCount = () => {
    let items = 0;
    Object.values(cart).forEach((value) => {
      items += value as number;
    });
    return items;
  };
  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
          Dashboard
        </h5>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2">
          <div hidden className="md:block">
            <SearchInput />
          </div>



        </div>
      </div>
    </div>
  );
};

export default TopMenu;
