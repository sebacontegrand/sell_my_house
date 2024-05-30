"use server";

import { auth } from "@/auth";
import WidgetItem from "@/components/widgetItem/WidgetItem";
import { redirect } from "next/navigation";

const DashBoardPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="bg-gray-700 text-blue-500 grid-cols-1 gap-6 sm:grid-cols-2 ">
      <WidgetItem title={"user connected"}>
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
        </div>
      </WidgetItem>
    </div>
  );
};

export default DashBoardPage;
