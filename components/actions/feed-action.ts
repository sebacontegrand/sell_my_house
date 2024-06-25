'use server'
import prisma from "@/lib/prisma";
import { feedEstadoEnum, feedInmuebleEnum, feedubicacionEnum, valoracionEnum } from '@prisma/client';
import { revalidatePath } from "next/cache";

export const FeedAction=async(prelistingId:string,asesorCaptador:string,asesorVendedor:string,date:string,masgusto:string,menosgusto:string,oferta:boolean,feedEstado:feedEstadoEnum,feedInmueble:feedInmuebleEnum,feedUbicacion:feedubicacionEnum,valoracion:valoracionEnum,otrasOpiniones:string)=>{
    console.log("FeedAction called with:", {
        prelistingId,
        asesorCaptador,
        asesorVendedor,
        date,
        masgusto,
        menosgusto,
        oferta,
        feedEstado,
        feedInmueble,
        feedUbicacion,
        valoracion,
        otrasOpiniones
      });
    try {
        const feed=await prisma.feedBack.create({data:{prelistingId,asesorCaptador,asesorVendedor,date,masgusto,menosgusto,oferta,valoracion,feedEstado,feedInmueble,feedUbicacion,otrasOpiniones}})
        console.log("%c Line:10 🥑 prelistingId", "color:#f5ce50", prelistingId);
        console.log("%c Line:12 🍅 feed", "color:#b03734", feed);
        revalidatePath("/dashboard/feedBack");
        return feed
    } catch (error) {
        console.error("Error creating feed:", error);
        return {
            message:"Error al crear el feed",
            
            
        }
        
    }
}


export const getAllFeedbacks = async () => {
  try {
    const feedbacks = await prisma.feedBack.findMany({
      include: {
        prelisting: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });
    return feedbacks;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return [];
  }
};
