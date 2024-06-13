import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface Segments {
  params: {
    id: string;
  };
}
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
    const formResponse = serializeWithBigInt(formById);
    return NextResponse.json(formResponse)
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
