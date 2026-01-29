import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from 'yup'

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const take = Number(searchParams.get('take'))
    const skip = Number(searchParams.get('skip'))

    const prelistings = await prisma.prelisting.findMany()
    console.log("%c Line:13 🥔 prelistings", "color:#f5ce50", prelistings);
    return NextResponse.json(prelistings)
}

const postSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    photos: yup.array().of(yup.string()).optional().default([]),
    complete: yup.boolean().optional().default(false)
})


export async function POST(request: Request) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json('No autorizado', { status: 401 })
    }
    try {
        const body = await request.json()
        console.log('📸 Received body:', body)
        const { complete, title, description, photos } = await postSchema.validate(body)

        const prelisting = await prisma.prelisting.create({
            data: {
                complete,
                title,
                description,
                photos: (photos || []) as string[],
                userId: session.user.id!
            }
        })
        return NextResponse.json(prelisting)
    } catch (error) {
        console.error('❌ Validation error:', error)
        return NextResponse.json(error, { status: 400 })
    }

}

export async function DELETE(request: Request) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json('No autorizado', { status: 401 })
    }
    try {
        const deletePrelistings = await prisma.prelisting.deleteMany({ where: { complete: true, userId: session.user.id } })
        return NextResponse.json(deletePrelistings)
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json(error, { status: 400 })
    }

}