import prisma from "@/lib/prisma"
import { Form, Prisma } from "@prisma/client";

import { revalidatePath } from "next/cache";


export const getFormByPrelistingId = async (prelistingId: string): Promise<Form | null> => {
    try {
        const form = await prisma.form.findFirst({ where: { prelistingId } });
        if (!form) {
            throw new Error(`Form with id ${prelistingId} not found`);
        }
        return form;
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const addForm = async(prelistingId: string,date: Date,email:string,asesor:string,proprietario:string,celular:number)=>{
    try {
        const form=await prisma.form.create({data:{prelistingId,date,email,asesor,proprietario,celular}})
        revalidatePath('/dashboard/form')
        return form
    } catch(error) {
        return{
            message:'Error creando todo'
        }
    }
}

export const updateForm = async (prelistingId: string, updatedData: Partial<Form>): Promise<Form> => {
 
    const form = await prisma.form.findFirst({ where: { prelistingId } });
    
    if (!form) {
        throw new Error(`Todo with id ${prelistingId} not found`);
    }

    
    const dataToUpdate: Prisma.FormUpdateInput = {};
    for (const key in updatedData) {
        if (updatedData[key as keyof Form] !== form[key as keyof Form]) {
            dataToUpdate[key as keyof Prisma.FormUpdateInput] = updatedData[key as keyof Form]!;
        }
    }
//const rawFromData=Object.fromEntries(formData.entries())
    if (Object.keys(dataToUpdate).length === 0) {
        throw new Error('No changes detected in the form data');
    }

   
    const updatedForm = await prisma.form.update({
        where: { prelistingId },
        data: dataToUpdate,
    });

   
    revalidatePath('/dashboard/form');
    
    return updatedForm;
};