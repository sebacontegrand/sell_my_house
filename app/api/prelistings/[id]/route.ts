import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; 

interface Segments{
    params:{
        id:string;
    }
}


export async function GET(request:Request, {params}:Segments){
    const session=await auth()
    if(!session?.user){
        return null
    }
    const {id}=params
    const prelistingbyId = await prisma.prelisting.findFirst({where:{id}})
    if(prelistingbyId?.userId !==session.user.id){
        return null
    }
    
    return NextResponse.json(
        prelistingbyId    
    )
    
  
}

export async function PUT(request:Request, {params}:Segments){
    const session=await auth()
    if(!session?.user){
        return NextResponse.json('No autorizado',{status:401})
    }
    const {id}=params
    const prelistingbyId = await prisma.prelisting.findFirst({where:{id}})

 const body= await request.json()
   const updatedPrelistingbyId = await prisma.prelisting.update({
    where:{id},
    data:{...body}
   })
    return NextResponse.json(
        prelistingbyId
    )
}
