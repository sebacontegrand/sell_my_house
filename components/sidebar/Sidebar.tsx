import Link from "next/link";
import Image from "next/image";
import React from "react";
import milugar1 from "../../public/images/milugar1.png";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCloudCircleOutline,
  IoHomeOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SidebarItem from "../sidebarItem/SidebarItem";
import LogOutButton from "./LogOutButton";

const menuItem = [
  {
    icon: <IoCheckboxOutline />,
    title: "Propriedades",
    path: "/dashboard/propriedad",
  },

  {
    icon: <IoCloudCircleOutline />,
    title: "feedback",
    path: "/dashboard/feedback",
  },
  {
    icon: <IoCloudCircleOutline />, // Reuse icon or change if preferred
    title: "Market Search (AI)",
    path: "/dashboard/market-search",
  },
];
const Sidebar = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="#" title="home" className="flex justify-center">
            <Image
              src={milugar1}
              className="w-full"
              alt="tailus logo"
              width={150}
              height={150}
            />
          </Link>
        </div>
        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogOutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
