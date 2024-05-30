"use client";
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>PageProfile</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
