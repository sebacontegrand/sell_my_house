import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from 'yup';
import { sendFeedbackNotification } from "@/lib/email";

export const dynamic = 'force-dynamic';

const feedbackSchema = yup.object({
    prelistingId: yup.string().required(),
    visitorName: yup.string().nullable().optional(),
    visitorContact: yup.string().nullable().optional(),
    impression: yup.string().required(),
    rating: yup.number().nullable().optional(),
});

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
                prelistingId: validatedData.prelistingId,
                visitorName: validatedData.visitorName || null,
                visitorContact: validatedData.visitorContact || null,
                impression: validatedData.impression,
                rating: validatedData.rating || null,
            },
            include: {
                prelisting: {
                    select: {
                        title: true,
                        form: {
                            select: {
                                email: true,
                            }
                        }
                    }
                }
            }
        });

        // Send email notifications
        if (feedback.prelisting.form?.email || session.user.email) {
            await sendFeedbackNotification({
                propertyTitle: feedback.prelisting.title,
                visitorName: feedback.visitorName,
                visitorContact: feedback.visitorContact,
                impression: feedback.impression,
                rating: feedback.rating,
                propertyOwnerEmail: feedback.prelisting.form?.email || '',
                asesorEmail: session.user.email || '',
            });
        }

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

    try {
        const whereClause = prelistingId ? { prelistingId } : {};
        const feedbackList = await prisma.feedback.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: {
                prelisting: {
                    select: { title: true }
                }
            }
        });
        return NextResponse.json(feedbackList);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
