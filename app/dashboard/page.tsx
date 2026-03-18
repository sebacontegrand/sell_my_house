import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  IoSparklesOutline, 
  IoAddCircleOutline, 
  IoLayersOutline, 
  IoArrowForwardOutline,
  IoStatsChartOutline
} from "react-icons/io5";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function DashBoardPage() {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Hola, {session?.user?.name?.split(' ')[0] || 'Agente'}! 👋
          </h1>
          <p className="text-slate-400 font-bold text-lg">¿Qué vamos a publicar hoy?</p>
        </div>
        <Link href="/dashboard/crear-ficha">
          <Button className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-black font-black text-lg gap-3 shadow-premium active:scale-95 transition-all">
            <IoSparklesOutline size={22} className="text-sky-400" />
            Nueva Ficha
          </Button>
        </Link>
      </div>

      {/* Pulse / Quick Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-50 space-y-4 group hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
             <IoLayersOutline size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Publicadas</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">Activas</h3>
          </div>
          <Link href="/dashboard/propriedad" className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-slate-900 transition-colors">
            Gestionar listado
            <IoArrowForwardOutline size={16} />
          </Link>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-50 space-y-4 group hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
             <IoStatsChartOutline size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Visitas</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">Estadísticas</h3>
          </div>
          <Link href="/dashboard/feedback" className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-slate-900 transition-colors">
             Ver rendimiento
            <IoArrowForwardOutline size={16} />
          </Link>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white space-y-4 group hover:-translate-y-1 transition-all flex flex-col justify-center">
           <IoSparklesOutline size={32} className="text-sky-400 mb-2" />
           <h3 className="text-2xl font-black tracking-tight leading-none">Market Search</h3>
           <p className="text-slate-400 text-sm font-bold">Investigación profunda con IA sobre precios y zona.</p>
           <Link href="/dashboard/market-search">
             <Button variant="outline" className="mt-4 w-full h-12 rounded-xl bg-white/10 border-white/10 hover:bg-white text-white hover:text-slate-900 font-black border-none">
                Iniciar Búsqueda
             </Button>
           </Link>
        </div>
      </div>

      {/* Quick Tips or Smart Optimization section */}
      <div className="bg-sky-50 rounded-[3rem] p-10 border border-sky-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-sky-200 opacity-20 transform translate-x-1/2 -translate-y-1/2">
           <IoSparklesOutline size={300} />
        </div>
        <div className="flex-1 space-y-4 relative">
           <h3 className="text-2xl font-black text-sky-900 tracking-tight">Potencia tus ventas</h3>
           <p className="text-sky-700 font-medium max-w-lg">
             ¿Sabías que nuestras fichas optimizadas tienen un 40% más de tasa de contacto? 
             Usa el bookmarklet para importar directamente desde los portales.
           </p>
           <Link href="/dashboard/crear-ficha" className="inline-flex h-12 items-center px-6 bg-white text-sky-600 rounded-xl font-black text-sm shadow-sm hover:shadow-md transition-all active:scale-95">
             Descargar Bookmarklet
           </Link>
        </div>
        <div className="w-full md:w-64 aspect-video bg-white/50 backdrop-blur rounded-2xl border border-sky-200 flex items-center justify-center relative shadow-sm">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-400 shadow-sm animate-pulse">
              <IoAddCircleOutline size={32} />
           </div>
        </div>
      </div>
    </div>
  );
}
