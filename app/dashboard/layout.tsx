import Sidebar from "../../components/sidebar/Sidebar";
import TopMenu from "@/components/topMenu/TopMenu";
import MobileBottomNav from "@/components/topMenu/MobileBottomNav";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { UiProvider } from "@/context/ui/UiProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UiProvider>
      <div className="flex bg-transparent min-h-screen relative overflow-x-hidden">
        <AnimatedBackground />
        <Sidebar />
        
        <main className="flex-1 lg:ml-72 min-h-screen transition-all duration-500">
          <TopMenu />
          <div className="px-4 md:px-8 py-6 pb-32 lg:pb-8">
            {children}
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </UiProvider>
  );
}
