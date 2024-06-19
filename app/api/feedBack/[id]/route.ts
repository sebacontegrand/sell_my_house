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
    console.error("feedId is undefined");
    return new Response(
      JSON.stringify({ error: 'feedId is undefined' }),
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
     

      return new Response(
        JSON.stringify({ exists: true, form: feedById }),
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
export async function PUT(request:Request, { params }: Segments) {
  const { id: feedId } = params;
  const body = await request.json();

  if (!feedId) {
    return new Response(JSON.stringify({ error: 'feedId is undefined' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  console.log("feedId:", feedId); // Log feedId
  console.log("Request body:", body); // Log request body

  if (body.date) {
    body.date = new Date(body.date).toISOString();
  }
  try {
    const existingFeedBack = await prisma.feedBack.findUnique({
      where: { prelistingId: feedId },
    });

    if (!existingFeedBack) {
      return new Response(JSON.stringify({ error: 'Record not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    
    const updatedFeedBack = await prisma.feedBack.update({
      where: { prelistingId: feedId },
      data: body,
    });

    return new Response(JSON.stringify(updatedFeedBack), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}