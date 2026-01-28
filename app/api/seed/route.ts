import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  await prisma.prelisting.deleteMany()
  await prisma.form.deleteMany()
  // Ensure a user exists
  const user = await prisma.user.upsert({
    where: { email: 'seed@example.com' },
    update: {},
    create: {
      email: 'seed@example.com',
      name: 'Seed User',
    },
  });

  const prelisting = await prisma.prelisting.create({
    data: {
      id: uuidv4(),
      title: 'Messi',
      description: 'Argento',
      userId: user.id
    }
  });
  console.log("%c Line:10 🥪 prelisting", "color:#6ec1c2", prelisting);

  const createdForms = await prisma.form.create({
    data: {
      asesor: 'Janet', email: 'janet@gmail.com', celular: "2234", fechadenacimiento: new Date('1990-03-12'), whysell: "porque se le canta", proprietario: "lana",
      prelisting: {
        connect: { id: prelisting.id } // Connect to an existing prelisting
      }
      // },{
      //     asesor: 'Sebas', email: 'sebas@gmail.com', celular: 2234, fechadenacimiento: '12-03-1990', porquevende: "porque se le canta", proprietario: "lana",
      //     prelistingId:''
      // },{
      //     asesor: 'Ana', email: 'ana@gmail.com', celular: 2234, fechadenacimiento: '12-03-1990', porquevende: "porque se le canta", proprietario: "lana",
      //     prelistingId:''
      // },{
      //     asesor: 'Jose', email: 'jose@gmail.com', celular: 2234, fechadenacimiento: '12-03-1990', porquevende: "porque se le canta", proprietario: "lana",
      //     prelistingId:''
      // }]
    }
  });

  console.log("Created forms:", createdForms);

  return NextResponse.json({
    message: 'seed'
  })

}


