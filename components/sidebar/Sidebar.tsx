import Link from "next/link";
import Image from "next/image";
import React from "react";
import c21 from "../../public/images/c21.png";
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
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Propriedades",
    path: "/dashboard/propriedad",
  },
  {
    icon: <IoHomeOutline />,
    title: "Prelistings",
    path: "/dashboard/form",
  },
  {
    icon: <IoCloudCircleOutline />,
    title: "feedback",
    path: "/dashboard/feedback",
  },
  {
    icon: <IoPersonOutline />,
    title: "Profile",
    path: "/dashboard/profile",
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
          <Link href="#" title="home">
            <Image
              src={c21}
              className="w-32"
              alt="tailus logo"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={`${session ? session?.user?.image : ""}`}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={150}
            height={150}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session.user?.name}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {session.user?.roles?.join(",")}
          </span>
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
