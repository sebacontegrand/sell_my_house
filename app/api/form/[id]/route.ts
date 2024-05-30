import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  
  try {
    console.log(`Fetching form with prelistingId: ${id}`);
    
    const formById = await prisma.form.findUnique({
      where: { prelistingId:id },
    });

    if (!formById) {
      console.log(`Form with prelistingId: ${id} not found`);
      return NextResponse.json(
        { error: 'Form not found' },
        
      );
    }

    return NextResponse.json(formById);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
