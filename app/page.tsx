"use server";

import { auth } from "@/auth";
import WidgetItem from "@/components/widgetItem/WidgetItem";
import { redirect } from "next/navigation";

const DashBoardPage = async () => {
  const session = await auth();
  if (!session) {
    console.log("No session found in DashBoardPage, redirecting...");
    redirect("/api/auth/signin");
  } else {
    redirect("/dashboard/propriedad");
  }

  return null;
};

export default DashBoardPage;
