import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { IoLogoWhatsapp, IoMailOutline, IoLocationOutline, IoExpandOutline, IoHomeOutline, IoBedOutline } from "react-icons/io5";

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
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Hero Image Gallery */}
      <div className="relative h-[65vh] w-full bg-slate-900 group">
        {property.photos.length > 0 ? (
          <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {property.photos.map((photo: string, i: number) => (
              <div key={i} className="relative flex-none w-full h-full snap-center group-hover:scale-[1.02] transition-transform duration-700">
                <Image src={photo} alt={property.title} fill className="object-cover opacity-90" priority={i === 0} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">Sin fotos</div>
        )}
        
        {/* Decorative Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm font-medium border border-white/10">
          1 / {property.photos.length || 0}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 p-8 md:p-12 space-y-12">
          {/* Header */}
          <section className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full tracking-wider uppercase">
                  {property.operationType || "Venta"}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <IoLocationOutline size={20} className="text-sky-500" />
                  <span>{property.address}, {property.neighborhood}, {property.city}</span>
                </div>
              </div>
              <div className="md:text-right bg-slate-900 text-white p-6 rounded-3xl shadow-xl md:-mr-16">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Precio</p>
                <span className="text-3xl md:text-4xl font-black">
                  {property.currency} {property.price?.toLocaleString()}
                </span>
                {property.expenses && (
                  <p className="text-sm text-slate-400 mt-1">+ ${property.expenses} expensas</p>
                )}
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: IoExpandOutline, label: "Total", value: property.totalArea ? `${property.totalArea} m²` : "--" },
              { icon: IoHomeOutline, label: "Ambientes", value: property.rooms || "--" },
              { icon: IoBedOutline, label: "Dormitorios", value: property.bedrooms || "--" },
              { icon: IoLocationOutline, label: "Baños", value: property.bathrooms || "--" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-1 py-8 px-4 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-sky-200 transition-all group">
                <stat.icon size={32} className="text-sky-500 mb-2 transition-transform group-hover:scale-110" />
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-1 bg-sky-500 rounded-full" />
                  Descripción
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                  {property.description}
                </p>
              </section>

              {/* Features */}
              {property.features.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sky-500 rounded-full" />
                    Características
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 border border-slate-100">
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                        {f}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-sky-50 p-8 rounded-[2rem] border border-sky-100 shadow-sm space-y-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-sky-200 transform rotate-3">
                    {property.agentName?.[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{property.agentName}</h3>
                    <p className="text-sm font-bold text-sky-600 uppercase tracking-widest">{property.officeName || "Asesor Inmobiliario"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-200"
                  >
                    <IoLogoWhatsapp size={22} />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${property.agentEmail}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-slate-200"
                  >
                    <IoMailOutline size={22} />
                    Enviar Email
                  </a>
                </div>
                
                <p className="text-[10px] text-sky-400 font-bold text-center uppercase tracking-[0.2em]">Contacto Directo e Inmediato</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
