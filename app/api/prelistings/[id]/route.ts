import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface Segments {
    params: {
        id: string;
    }
}


export async function GET(request: Request, { params }: Segments) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json(null, { status: 401 })
    }
    const { id } = params
    const prelistingbyId = await prisma.prelisting.findFirst({ where: { id } })
    if (prelistingbyId?.userId !== session.user.id) {
        return NextResponse.json(null, { status: 403 })
    }

    return NextResponse.json(
        prelistingbyId
    )


}

export async function PUT(request: Request, { params }: Segments) {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json('No autorizado', { status: 401 })
    }
    const { id } = params
    const prelistingbyId = await prisma.prelisting.findFirst({ where: { id } })

    const body = await request.json()
    const updatedPrelistingbyId = await prisma.prelisting.update({
        where: { id },
        data: { ...body }
    })
    return NextResponse.json(
        prelistingbyId
    )
}

export async function DELETE(request: Request, { params }: Segments) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json('No autorizado', { status: 401 });
    }
    const { id } = params;

    // Verify ownership
    const prelisting = await prisma.prelisting.findFirst({ where: { id } });
    if (!prelisting || prelisting.userId !== session.user.id) {
        return NextResponse.json('No autorizado', { status: 403 });
    }

    const deleted = await prisma.prelisting.delete({
        where: { id }
    });

    return NextResponse.json(deleted);
}
