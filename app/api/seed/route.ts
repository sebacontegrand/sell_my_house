import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server"; 
import { auth } from "@/auth";

export async function GET(request:Request){
  const session = await auth();
  if (!session?.user || !session.user.id){
    return new Response('Unauthorized', { status: 401 });
  }
    await prisma.prelisting.deleteMany()
    await prisma.form.deleteMany()
    const prelisting= await prisma.prelisting.create({
        data: { id:uuidv4(),userId: session.user.id ,title:'Messi', description:'Argento'}, 
         
   
    
})
console.log("%c Line:10 🥪 prelisting", "color:#6ec1c2", prelisting);
  
  const createdForms = await prisma.form.create({
    data: {
        asesor: 'Janet', email: 'janet@gmail.com', celular: 2234, fechadenacimiento: '12-03-1990', whysell: "porque se le canta", proprietario: "lana",
        prelisting: {
            connect: { id: prelisting.id } 
          }
   
  }});
  
  console.log("Created forms:", createdForms);

return NextResponse.json({
    message:'seed'
})

}


