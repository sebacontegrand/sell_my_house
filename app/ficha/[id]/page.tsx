import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { 
  IoLogoWhatsapp, 
  IoMailOutline, 
  IoLocationOutline, 
  IoExpandOutline, 
  IoHomeOutline, 
  IoBedOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoShareSocialOutline
} from "react-icons/io5";
import { Button } from "@/components/ui/button";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const property = await prisma.property.findUnique({ where: { id: params.id } });
  if (!property) return { title: "Propiedad no encontrada" };

  return {
    title: `${property.title} | Mi Lugar`,
    description: property.description.substring(0, 160),
    openGraph: {
      images: property.photos.length > 0 ? [property.photos[0]] : [],
    },
  };
}

export default async function FichaPublicPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) notFound();

  const whatsappLink = `https://wa.me/${property.agentWhatsapp?.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola! Estoy interesado en la propiedad: ${property.title}`)}`;

  return (
    <div className="bg-white min-h-screen pb-32 font-sans selection:bg-slate-900 selection:text-white">
      {/* Immersive Gallery Section */}
      <section className="relative h-[70vh] w-full bg-slate-900 overflow-hidden">
        {property.photos.length > 0 ? (
          <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {property.photos.map((photo: string, i: number) => (
              <div key={i} className="relative flex-none w-full h-full snap-center group">
                <Image 
                  src={photo} 
                  alt={property.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  priority={i === 0} 
                  unoptimized={true} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pt-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 bg-slate-100">Sin fotos</div>
        )}

        {/* Floating Controls */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
             <div className="px-4 py-2 text-white font-black text-sm tracking-widest uppercase">Mi Lugar</div>
          </div>
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all">
            <IoShareSocialOutline size={22} />
          </button>
        </div>

        {/* Gallery Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {property.photos.slice(0, 5).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-8 bg-white" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* Content Container */}
      <main className="max-w-6xl mx-auto px-6 -mt-32 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Main Info Card */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-50 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-full tracking-widest uppercase">
                    {property.operationType || "Venta"}
                  </span>
                  <span className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full tracking-widest uppercase border border-slate-200">
                    Exclusivo
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-slate-400 font-bold">
                  <IoLocationOutline size={20} className="text-slate-900" />
                  <span className="text-lg">{property.address}, {property.neighborhood}</span>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              {/* Grid Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: IoExpandOutline, label: "Total", value: property.totalArea ? `${property.totalArea}m²` : "--" },
                  { icon: IoHomeOutline, label: "Ambientes", value: property.rooms || "--" },
                  { icon: IoBedOutline, label: "Dormitorios", value: property.bedrooms || "--" },
                  { icon: IoLocationOutline, label: "Baños", value: property.bathrooms || "--" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1 p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50 group hover:bg-white hover:border-slate-200 transition-all">
                    <stat.icon size={24} className="text-slate-900 mb-2 transition-transform group-hover:scale-110" />
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                Sobre esta propiedad
                <div className="h-px bg-slate-100 flex-1" />
              </h2>
              <div className="text-slate-600 leading-[1.6] text-xl font-medium whitespace-pre-wrap selection:bg-slate-900 selection:text-white">
                {property.description}
              </div>
            </div>

            {/* Features Cloud */}
            {property.features.length > 0 && (
              <div className="space-y-6 px-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                  Comodidades
                  <div className="h-px bg-slate-100 flex-1" />
                </h2>
                <div className="flex flex-wrap gap-3">
                  {property.features.map((f: string, i: number) => (
                    <div key={i} className="px-6 py-3 bg-white rounded-2xl text-sm font-black text-slate-900 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Floating Contact (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-12 space-y-6">
              
              {/* Price Card */}
              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl space-y-2 transform lg:rotate-1">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Valor de Inversión</p>
                <div className="text-5xl font-black tracking-tighter">
                  <span className="text-3xl mr-1">{property.currency}</span>
                  {property.price?.toLocaleString()}
                </div>
                {property.expenses && (
                  <p className="text-slate-400 font-bold text-sm">+ ${property.expenses} expensas</p>
                )}
              </div>

              {/* Agent Card */}
              <div className="bg-white p-8 rounded-[3rem] shadow-premium border border-slate-50 space-y-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-slate-200">
                    {property.agentName?.[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{property.agentName}</h3>
                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Consultor inmobiliario</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full h-16 bg-[#25D366] text-white rounded-[1.5rem] font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-green-200"
                  >
                    <IoLogoWhatsapp size={24} />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${property.agentEmail}`}
                    className="flex items-center justify-center gap-3 w-full h-16 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg hover:bg-black hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <IoMailOutline size={24} />
                    Enviar Email
                  </a>
                </div>
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">Respuesta inmediata</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto flex gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            className="flex-1 h-16 bg-[#25D366] text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-green-400/30"
          >
            <IoLogoWhatsapp size={24} />
            Contactar
          </a>
          <button className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/30">
            <IoShareSocialOutline size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
