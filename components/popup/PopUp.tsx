import Link from "next/link";
import React, { useState } from "react";
interface PopUpProps {
  href: string;
  description: string;
  position?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
const PopUpLink: React.FC<PopUpProps> = ({
  position,
  href,
  description,
  children,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link
        href={href}
        className="text-blue-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {children}
      </Link>
      {isHovered && (
        <div
          className={`${position} z-10 bg-gray-400 p-2 rounded-lg shadow-lg`}
        >
          {description}
        </div>
      )}
    </>
  );
};

export default PopUpLink;
