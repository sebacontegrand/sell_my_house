"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import {
  IoAccessibility,
  IoAccessibilityOutline,
  IoArrowBack,
  IoShieldOutline,
} from "react-icons/io5";

const LogOutButton = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">loading...</span>
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <button
        onClick={() => signOut()}
        className=" flex px-4 py-3 items-center space-x-4 rounded-md text-gray-600 group"
      >
        <IoAccessibility />
        <span className="group-hover:text-gray-700">Logout</span>
      </button>
    );
  }
  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <IoArrowBack />
        <span className="group-hover:text-gray-700">Login</span>
      </button>
    );
  }
};

export default LogOutButton;
