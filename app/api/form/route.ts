import { auth } from "../../../auth";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server"; 
import * as yup from 'yup'

const postSchema= yup.object({
    prelistingId:yup.string().required(),
    date:yup.date().required(),
    email:yup.string().required(),
    asesor:yup.string().required(),
    proprietario:yup.string().required(),
    celular:yup.number().required(),
    })
    function serializeWithBigInt(obj: any): any {
        if (typeof obj === 'bigint') {
            return obj.toString();
        } else if (Array.isArray(obj)) {
            return obj.map(serializeWithBigInt);
        } else if (obj !== null && typeof obj === 'object') {
            return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, serializeWithBigInt(value)]));
        } else {
            return obj;
        }
    }
    
export async function POST(request:Request){
   const session=await auth()
    if(!session?.user){
        return NextResponse.json('No autorizado',{status:401})
    }
   
try {
    
    const {prelistingId,date,email,asesor,proprietario,celular}= await postSchema.validate(await request.json())
   
    console.log("%c Line:26 🥛 celular", "color:#ed9ec7", celular);
  
    const existingForm = await prisma.form.findUnique({
        where: { prelistingId },
    });

    if (existingForm) {
        return NextResponse.json({ error: 'A form with this prelistingId already exists.' }, { status: 400 });
    }
    
    const form= await prisma.form.create({data:{prelistingId,date,email,asesor,proprietario,celular,}})
    
    const formResponse = serializeWithBigInt(form);
    return NextResponse.json(formResponse)
} catch (error) {
    console.error('Error occurred:', error);
        if (error instanceof yup.ValidationError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}




