import React from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import prisma from "@/lib/prisma";
import FeedbackFilter from "@/components/feedback/FeedbackFilter";
import { IoChatbubblesOutline, IoStarOutline, IoTimeOutline, IoPersonOutline, IoCallOutline } from "react-icons/io5";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const FeedBackPage = async ({ searchParams }: PageProps) => {
  const prelistingId = typeof searchParams.prelistingId === 'string' ? searchParams.prelistingId : undefined;
  const propertyId = typeof searchParams.propertyId === 'string' ? searchParams.propertyId : undefined;
  
  const whereClause: { prelistingId?: string; propertyId?: string } = {};
  if (prelistingId) whereClause.prelistingId = prelistingId;
  if (propertyId) whereClause.propertyId = propertyId;

  const feedbacks = await prisma.feedback.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      prelisting: true,
      property: true
    }
  });

  const totalFeedbacks = feedbacks.length;
  const averageRating = totalFeedbacks > 0
    ? (feedbacks.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0) / feedbacks.filter((f: any) => f.rating).length || 1).toFixed(1)
    : "0.0";

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Feedback & Análisis</h1>
          <p className="text-slate-400 font-bold text-lg text-left">Lo que tús clientes están diciendo.</p>
        </div>
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          <FeedbackFilter />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-50 flex items-center justify-between group hover:shadow-xl transition-all">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Experiencia Total</p>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{totalFeedbacks}</h3>
            <p className="text-slate-400 font-bold text-sm">Comentarios recibidos</p>
          </div>
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
            <IoChatbubblesOutline size={32} />
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl text-white flex items-center justify-between group hover:-translate-y-1 transition-all">
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Rating Promedio</p>
            <h3 className="text-5xl font-black text-white tracking-tighter">
              {averageRating} <span className="text-xl text-slate-500 font-bold tracking-normal">/ 5.0</span>
            </h3>
            <p className="text-slate-400 font-bold text-sm">Satisfacción del cliente</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
            <IoStarOutline size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Feedback Form Side */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-50 sticky top-28 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Nuevo Registro</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Añade feedback manual</p>
            </div>
            <FeedbackForm />
          </div>
        </div>

        {/* History Side */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight border-b border-slate-100 pb-4">Historial de Visitas</h2>
          
          {feedbacks.length === 0 ? (
            <div className="bg-slate-50 rounded-[2rem] p-12 text-center space-y-4">
              <IoTimeOutline size={48} className="mx-auto text-slate-200" />
              <p className="text-slate-400 font-bold italic">No hay feedback registrado aún.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {feedbacks.map((item: any) => (
                <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-50 hover:shadow-xl transition-all group">
                  <div className="flex flex-col md:row justify-between items-start mb-6 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Propiedad</span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                        {item.property?.title || item.prelisting?.title || item.prelisting?.description || 'Sin título'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 font-black text-xs uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full">
                      <IoTimeOutline size={14} />
                      {item.createdAt.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50 mb-6">
                    <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
                      &quot;{item.impression}&quot;
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-50">
                    {item.visitorName && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 text-xs font-black text-slate-900 shadow-sm">
                        <IoPersonOutline size={16} className="text-slate-400" />
                        {item.visitorName}
                      </div>
                    )}
                    {item.visitorContact && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 text-xs font-black text-slate-900 shadow-sm">
                        <IoCallOutline size={16} className="text-slate-400" />
                        {item.visitorContact}
                      </div>
                    )}
                    {item.rating && (
                      <div className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black shadow-lg shadow-slate-200">
                        <IoStarOutline size={14} className="text-sky-400" />
                        {item.rating} / 5
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedBackPage;
