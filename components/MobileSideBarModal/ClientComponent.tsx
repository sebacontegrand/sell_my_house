import React from "react";
import SidebarItem from "../sidebarItem/SidebarItem";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCloseOutline,
  IoCloudCircleOutline,
  IoHomeOutline,
  IoPersonOutline,
} from "react-icons/io5";

const menuItem = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Propriedades en Gestión",
    path: "/dashboard/propriedad",
  },
  {
    icon: <IoHomeOutline />,
    title: "Formularios Prelistings",
    path: "/dashboard/form",
  },
  {
    icon: <IoCloudCircleOutline />,
    title: "feedback a Clientes",
    path: "/dashboard/feedback",
  },
  {
    icon: <IoPersonOutline />,
    title: "Profile",
    path: "/dashboard/profile",
  },
];

interface MobileSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const MobileSidebarModal = ({ isOpen, onClose }: MobileSidebarModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full">
        <ul className="space-y-2 tracking-wide">
          {menuItem.map((item) => (
            <SidebarItem key={item.path} {...item} onClick={onClose} />
          ))}
        </ul>
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          <IoCloseOutline size={24} />
        </button>
      </div>
    </div>
  );
};

export default MobileSidebarModal;
