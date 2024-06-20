"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiBookmarkCheck } from "react-icons/ci";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
  onClick?: () => void;
}
const SidebarItem = ({ icon, path, title, onClick }: Props) => {
  const pathName = usePathname();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <li>
        <Link
          onClick={handleClick}
          href={path}
          className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
          hover:bg-gradient-to-r hover:bg-yellow-600 hover:text-white
          ${
            path === pathName
              ? "text-white bg-gradient-to-r from-yellow-600 to-yellow-800"
              : ""
          }
          `}
        >
          {icon}

          <span className="group-hover:text-white-700">{title}</span>
        </Link>
      </li>
    </>
  );
};

export default SidebarItem;
