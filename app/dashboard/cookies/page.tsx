import { TabBar } from "@/components/TabBar/TabBar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies Page",
  description: "SEO Title",
};

export const Cookiespage = () => {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-grid-cols-2 gap-3">
      <span className="text-3xl">Tabs</span>
      <TabBar currentTab={+cookieTab} />
    </div>
  );
};

export default Cookiespage;
