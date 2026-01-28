import { auth } from "../../../auth";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import * as yup from 'yup'

export const dynamic = 'force-dynamic';

const postSchema = yup.object({
    prelistingId: yup.string().required(),
    date: yup.date().required(),
    email: yup.string().nullable().optional(),
    asesor: yup.string().nullable().optional(),
    proprietario: yup.string().nullable().optional(),
    celular: yup.string().nullable().optional(),
    direccion: yup.string().optional(),
    propertytype: yup.string().optional(),
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

export async function POST(request: Request) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json('No autorizado', { status: 401 })
    }

    try {

        const { prelistingId, date, email, asesor, proprietario, celular, direccion, propertytype } = await postSchema.validate(await request.json())

        console.log("%c Line:26 🥛 celular", "color:#ed9ec7", celular);

        const existingForm = await prisma.form.findUnique({
            where: { prelistingId },
        });

        if (existingForm) {
            return NextResponse.json({ error: 'A form with this prelistingId already exists.' }, { status: 400 });
        }

        const form = await prisma.form.create({
            data: {
                prelistingId,
                date,
                email: email || null,
                asesor: asesor || null,
                proprietario: proprietario || null,
                celular: celular || null,
                direccion: direccion || null,
                propertytype: propertytype as any
            }
        })

        const formResponse = serializeWithBigInt(form);
        return NextResponse.json(formResponse)
    } catch (error) {
        console.error('Error occurred in POST /api/form:', error);
        if (error instanceof yup.ValidationError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        // Log the full error object for debugging
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}




