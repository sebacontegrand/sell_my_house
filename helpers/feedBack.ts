import { FeedBack } from "@prisma/client";
import { feedBackSchema } from "../components/feedback/Fschema";
import { z } from "zod";

export const updateFeedBackPUT=async(prelistingId: string,transformedValues:z.infer<typeof feedBackSchema>):Promise<FeedBack>=>{
    const body={prelistingId,...transformedValues}
    if (body.date) {
        body.date = new Date(body.date).toISOString();
      }
    try {
        const response = await fetch(`/api/feedback/${prelistingId}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        
        const feedbackDb = await response.json();
        
        return feedbackDb;
      } catch (error) {
        console.error('Error in updateFormPUT:', error);
        throw error;
      }
    };
    
export const fetchFeedBack = async (id: string) => {
        const response = await fetch(`/api/feedback/${id}`);
        console.log("%c Line:52 🍊 id", "color:#7f2b82", id);
        if (!response.ok) {
          throw new Error("Failed to fetch form data");
        }
        const data= await response.json();
        return data.form;
      };

export const updateFeedBack=async(prelistingId: string, date:Date,asesorCaptador:string,asesorVendedor:string,masgusto:string,menosgusto:string,oferta:boolean,valoracion:string,feedEstado:string,feedInmueble:string,feedUbicacion:string):Promise<FeedBack>=>{
        const body={prelistingId,date,asesorCaptador,asesorVendedor,masgusto,menosgusto,oferta,valoracion,feedEstado,feedInmueble,feedUbicacion}
    
        const feedBackDb= await fetch(`/api/feedback/${prelistingId}`,{
            method:'PUT',
            body:JSON.stringify(body),
            headers:{
                'content-Type':'application/json'
            }
        }).then(res=>res.json())
        
        
        return feedBackDb;
    }