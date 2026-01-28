import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure correct path to prisma

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prelistingId = searchParams.get('prelistingId');

  if (!prelistingId) {
    return NextResponse.json({ error: 'Prelisting ID required' }, { status: 400 });
  }

  try {
    const form = await prisma.form.findUnique({
      where: { prelistingId },
    });

    if (form) {
      return NextResponse.json({ exists: true, form });
    } else {
      return NextResponse.json({ exists: false, form: null });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
