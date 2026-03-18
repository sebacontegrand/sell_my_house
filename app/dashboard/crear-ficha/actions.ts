"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Property, propertySchema } from "@/lib/types/property";
import { UserProfile } from "@/lib/types/user";
import { revalidatePath } from "next/cache";

export async function saveProperty(data: any) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Fetch the latest user profile to ensure contact info is up to date
  const userProfile = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      whatsapp: true,
      officeName: true,
    }
  });

  // If it's a scraped property, it might not have all fields, so we merge with defaults
  // We prioritize the user's profile for contact information
  const propertyData = {
    ...data,
    userId: session.user.id,
    isPublished: data.isPublished ?? true,
    agentName: userProfile?.name || data.agentName || session.user.name,
    agentEmail: userProfile?.email || data.agentEmail || session.user.email,
    agentPhone: userProfile?.phone || data.agentPhone,
    agentWhatsapp: userProfile?.whatsapp || data.agentWhatsapp,
    officeName: userProfile?.officeName || data.officeName,
  };

  // Strict whitelist of fields allowed in the Prisma Property model
  const allowedFields = [
    "externalUrl", "title", "operationType", "propertyType", "price", "currency",
    "expenses", "address", "city", "neighborhood", "totalArea", "coveredArea",
    "rooms", "bedrooms", "bathrooms", "garage", "description", "features",
    "photos", "latitude", "longitude", "agentName", "agentPhone", "agentWhatsapp",
    "agentEmail", "officeName", "isPublished", "userId"
  ];

  const { id, ...inputData } = propertyData;
  const cleanData: any = {};
  
  allowedFields.forEach(field => {
    if (inputData[field] !== undefined) {
      cleanData[field] = inputData[field];
    }
  });

  // Mandatory fields check
  if (!cleanData.title) cleanData.title = "Sin Título";
  if (!cleanData.description) cleanData.description = "Sin descripción disponible.";

  if (id) {
    const property = await prisma.property.update({
      where: { id, userId: session.user.id },
      data: cleanData,
    });
    revalidatePath("/dashboard/propriedad");
    return property;
  } else {
    const property = await prisma.property.create({
      data: cleanData,
    });
    revalidatePath("/dashboard/propriedad");
    return property;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  return await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      whatsapp: true,
      officeName: true,
    },
  });
}

export async function updateUserProfile(data: { name?: string, phone?: string, whatsapp?: string, officeName?: string, email?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
  });

  return user;
}
