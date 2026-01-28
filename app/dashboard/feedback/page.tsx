import React from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import prisma from "@/lib/prisma";
import FeedbackFilter from "@/components/feedback/FeedbackFilter";
// ... imports

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const FeedBackPage = async ({ searchParams }: PageProps) => {
  const prelistingId = typeof searchParams.prelistingId === 'string' ? searchParams.prelistingId : undefined;

  const whereClause = prelistingId ? { prelistingId } : {};

  const feedbacks = await prisma.feedback.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      prelisting: true
    }
  });

  const totalFeedbacks = feedbacks.length;
  const averageRating = totalFeedbacks > 0
    ? (feedbacks.reduce((acc: number, curr: typeof feedbacks[0]) => acc + (curr.rating || 0), 0) / feedbacks.filter((f: typeof feedbacks[0]) => f.rating).length || 1).toFixed(1)
    : "0.0";

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Feedback de Visitantes</h1>
        <FeedbackFilter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <span className="text-2xl font-bold">💬</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Feedbacks</p>
            <h3 className="text-3xl font-bold text-gray-800">{totalFeedbacks}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <span className="text-2xl font-bold">⭐</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Promedio General</p>
            <h3 className="text-3xl font-bold text-gray-800">{averageRating} <span className="text-sm text-gray-400 font-normal">/ 5.0</span></h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Nuevo Feedback</h2>
            <FeedbackForm />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Historial</h2>
          {feedbacks.length === 0 ? (
            <p className="text-gray-500 italic">No hay feedback registrado aún.</p>
          ) : (
            feedbacks.map((item: typeof feedbacks[0]) => (
              <div key={item.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-blue-600">{item.prelisting.description}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.prelisting.title}</span>
                  </div>
                  <span className="text-sm text-gray-400">{item.createdAt.toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.impression}</p>

                <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-4 text-sm text-gray-500">
                  {item.visitorName && (
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="user">👤</span>
                      <span>{item.visitorName}</span>
                    </div>
                  )}
                  {item.visitorContact && (
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="contact">📞</span>
                      <span>{item.visitorContact}</span>
                    </div>
                  )}
                  {item.rating && (
                    <div className="flex items-center gap-1 font-medium text-yellow-500">
                      <span>⭐ {item.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedBackPage;
