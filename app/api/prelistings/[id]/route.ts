import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; 

interface Segments{
    params:{
        id:string;
    }
}


export async function GET(request:Request, {params}:Segments):Promise<Response> {
    const session=await auth()
    if(!session?.user){
        return new Response('Unauthorized', { status: 401 });
    }
    const {id}=params
    const prelistingbyId = await prisma.prelisting.findFirst({where:{id}})
    if (!prelistingbyId || prelistingbyId.userId !== session.user.id) {
        return new Response('Not found or not authorized', { status: 404 });
    }
    return NextResponse.json(
        prelistingbyId    
    )
    
  
}

export async function PUT(request: Request, { params }: Segments): Promise<Response> {
    const session = await auth();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
  
    const { id } = params;
    const prelistingbyId = await prisma.prelisting.findFirst({ where: { id } });
    if (!prelistingbyId || prelistingbyId.userId !== session.user.id) {
      return new Response('Not found or not authorized', { status: 404 });
    }
  
    const body = await request.json();
    const updatedPrelistingbyId = await prisma.prelisting.update({
      where: { id },
      data: { ...body },
    });
  
    return NextResponse.json(updatedPrelistingbyId);
  }
