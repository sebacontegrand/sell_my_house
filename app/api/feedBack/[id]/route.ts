// import { auth } from '@/auth';
import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

interface Segments {
  params: {
    id: string;
  }
}

export async function GET(request: Request, { params }: Segments) {
  const { id:feedId } = params;
  if (!feedId) {
    console.error("formId is undefined");
    return new Response(
      JSON.stringify({ error: 'formId is undefined' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    console.log(`Checking existence for formId: ${feedId}`);
    
    const feedById = await prisma.feedBack.findFirst({
      where: { prelistingId: feedId }
    });

    console.log(`Form found: ${feedById ? true : false}`);
    console.log(feedById); 

    if (feedById) {
      const serializedForm = JSON.parse(JSON.stringify(feedById, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));

      return new Response(
        JSON.stringify({ exists: true, form: serializedForm }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ exists: false }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error("Error checking form existence:", error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
