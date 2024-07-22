import { auth } from '@/auth';
import { EmailTemplate } from '@/components/emails/FeedBackEmails';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export  async function POST(req:Request, res: Response) {
  
  try {
  
   const requestBody = await req.json();
   
   const form = await prisma.form.findUnique({
    where: {
      id: requestBody.id,
    },
    select: { email: true }
  });

  if (!form) {
    return res.json();
  }
  
    

    const emailContent =`Hola te enviamos el feedback del cliente interesado en comprar/alquilar tu casa. 
    Ante la pregunta que es lo que mas gusto de la propiedad, te respondio que ${requestBody?.masgusto}. 
    Ante la pregunta que es lo que menos gusto de la propiedad, te respondio que ${requestBody?.menosgusto}. 
    En caso que se ajuste a sus condiciones de compra (forma de pago, precio, exrituracion) realizaria una oferta para este inmueble? ${requestBody?.oferta ? 'Si' : 'No'}
    Que opinion tiene de la propiedad? ${requestBody?.feedEstado}
    Que opinion tiene de la ubicación de la propiedad? ${requestBody?.feedUbicacion}
    Comentarios adicionales: ${requestBody?.otrasOpiniones}
    `
   
    
    const fromEmail=process.env.EMAIL_FROM
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [form.email!],    
      subject: 'Buenas Noticias!',
      react: emailContent
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data || { message:"Email sent successfully"}, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
