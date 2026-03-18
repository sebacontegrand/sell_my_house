import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from 'yup';
import { sendFeedbackNotification } from "@/lib/email";

export const dynamic = 'force-dynamic';

const feedbackSchema = yup.object({
    prelistingId: yup.string().nullable().optional(),
    propertyId: yup.string().nullable().optional(),
    visitorName: yup.string().nullable().optional(),
    visitorContact: yup.string().nullable().optional(),
    impression: yup.string().required(),
    rating: yup.number().nullable().optional(),
}).test('at-least-one', 'Debe seleccionar una propiedad o prelisting', (value) => !!value.prelistingId || !!value.propertyId);

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json('No autorizado', { status: 401 });
    }

    try {
        const body = await request.json();
        const validatedData = await feedbackSchema.validate(body);

        const feedback = await prisma.feedback.create({
            data: {
                prelisting: validatedData.prelistingId ? { connect: { id: validatedData.prelistingId } } : undefined,
                property: validatedData.propertyId ? { connect: { id: validatedData.propertyId } } : undefined,
                visitorName: validatedData.visitorName || null,
                visitorContact: validatedData.visitorContact || null,
                impression: validatedData.impression,
                rating: validatedData.rating || null,
            },
            include: {
                prelisting: {
                    select: {
                        title: true,
                        form: { select: { email: true } }
                    }
                },
                property: {
                    select: {
                        title: true,
                        agentEmail: true
                    }
                }
            }
        });

        // Send email notifications
        const propertyTitle = (feedback as any).property?.title || (feedback as any).prelisting?.title || 'Propiedad sin título';
        const ownerEmail = (feedback as any).property?.agentEmail || (feedback as any).prelisting?.form?.email || '';

        await sendFeedbackNotification({
            propertyTitle,
            visitorName: feedback.visitorName,
            visitorContact: feedback.visitorContact,
            impression: feedback.impression,
            rating: feedback.rating,
            propertyOwnerEmail: ownerEmail,
            asesorEmail: session.user.email || '',
        });

        return NextResponse.json(feedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        if (error instanceof yup.ValidationError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json('No autorizado', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const prelistingId = searchParams.get('prelistingId');
    const propertyId = searchParams.get('propertyId');

    try {
        const whereClause: { prelistingId?: string; propertyId?: string } = {};
        if (prelistingId) whereClause.prelistingId = prelistingId;
        if (propertyId) whereClause.propertyId = propertyId;

        const feedbackList = await prisma.feedback.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: {
                prelisting: { select: { title: true } },
                property: { select: { title: true } }
            }
        });
        return NextResponse.json(feedbackList);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
