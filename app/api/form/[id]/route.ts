import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
      where: { prelistingId: id },
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

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  try {
    const body = await request.json();
    console.log(`Updating form for prelistingId: ${id} with data:`, body);

    // Whitelist allow fields to prevent "Unknown argument" errors in Prisma
    const allowedFields = [
      'asesor', 'proprietario', 'email', 'celular', 'whysell', 'ocupacion', 'selltobuy',
      'solvebeforesell', 'includedinsell', 'whenneedtomove', 'whyneedtomove', 'neighbors',
      'neighborhood', 'typeoperation', 'direccion', 'propertytype', 'ambientes', 'orientacion',
      'impuestos', 'expensas', 'servicios', 'valoralquiler', 'valorventa', 'antiguedad',
      'estado', 'heattype', 'plantas', 'cocheras', 'banos', 'toilette', 'dormitorio',
      'dormitorioserv', 'amenities', 'baulera', 'cantascensores', 'categoria',
      'mlivinga', 'mlivingl', 'mcomedora', 'mcomedorl', 'mcocinaa', 'mcocinal',
      'mdorm1a', 'mdorm1l', 'mdorm2a', 'mdorm2l', 'mdorm3l', 'mdorm4a', 'mdorm4l',
      'mlava', 'mlavl', 'mhalla', 'mhalll', 'mbanosa', 'mbanosl', 'mcocha', 'mcochl',
      'mpiletaa', 'mpiletal', 'escritura', 'plano', 'finalobra', 'comentarios',
      'totalArea', 'roomDimensions', 'date', 'fechadenacimiento'
    ];

    const dataToUpdate: any = {};

    for (const key of Object.keys(body)) {
      if (allowedFields.includes(key) && body[key] !== undefined) {
        dataToUpdate[key] = body[key];
      }
    }

    // --- Type Sanitization ---

    // 1. Date Fields
    const dateFields = ['date', 'fechadenacimiento', 'whenneedtomove'];
    dateFields.forEach(field => {
      if (dataToUpdate[field] === "" || dataToUpdate[field] === null) {
        dataToUpdate[field] = null;
      } else if (dataToUpdate[field]) {
        dataToUpdate[field] = new Date(dataToUpdate[field]);
      }
    });

    // 2. Enum Fields (empty string -> null)
    const enumFields = ['propertytype', 'solvebeforesell', 'includedinsell', 'whyneedtomove', 'typeoperation', 'orientacion', 'estado', 'heattype', 'categoria'];
    enumFields.forEach(field => {
      if (dataToUpdate[field] === "") {
        dataToUpdate[field] = null;
      }
    });

    // 3. Int/Float Fields (empty string -> null, string -> number)
    const numericFields = [
      'ambientes', 'impuestos', 'expensas', 'valoralquiler', 'valorventa', 'antiguedad',
      'plantas', 'cocheras', 'banos', 'toilette', 'dormitorio', 'cantascensores',
      'mlivinga', 'mlivingl', 'mcomedora', 'mcomedorl', 'mcocinaa', 'mcocinal',
      'mdorm1a', 'mdorm1l', 'mdorm2a', 'mdorm2l', 'mdorm3l', 'mdorm4a', 'mdorm4l',
      'mlava', 'mlavl', 'mhalla', 'mhalll', 'mbanosa', 'mbanosl', 'mcocha', 'mcochl',
      'mpiletaa', 'mpiletal', 'totalArea'
    ];

    numericFields.forEach(field => {
      if (dataToUpdate[field] === "" || dataToUpdate[field] === null) {
        dataToUpdate[field] = null;
      } else if (typeof dataToUpdate[field] === 'string') {
        // Try to parse, if NaN set to null (or 0 if preferred, but schema says null is allowed)
        const parsed = parseFloat(dataToUpdate[field]);
        dataToUpdate[field] = isNaN(parsed) ? null : parsed;
      }
    });

    // 4. Boolean Fields
    const boolFields = ['ocupacion', 'selltobuy', 'dormitorioserv', 'amenities', 'baulera', 'escritura', 'plano', 'finalobra'];
    boolFields.forEach(field => {
      if (dataToUpdate[field] === "true") dataToUpdate[field] = true;
      if (dataToUpdate[field] === "false") dataToUpdate[field] = false;
      // If it's already boolean true/false, leave it. 
      // If it's "", it might be issue for boolean? Prisma Boolean? accepts null.
      if (dataToUpdate[field] === "") dataToUpdate[field] = null;
    });


    // Special handling for roomDimensions (ensure it's not null unless intended)
    if (body.roomDimensions) {
      dataToUpdate.roomDimensions = body.roomDimensions;
    }

    console.log("Sanitized data for update:", dataToUpdate);

    const updatedForm = await prisma.form.update({
      where: { prelistingId: id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    // Explicitly log checks
    return NextResponse.json(
      { error: 'Failed to update form', details: String(error) },
      { status: 500 }
    );
  }
}
