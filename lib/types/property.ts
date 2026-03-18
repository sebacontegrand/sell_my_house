import { z } from "zod";

export const propertySchema = z.object({
  id: z.string().uuid().optional(),
  externalUrl: z.string().url().optional().or(z.literal("")),
  title: z.string().min(3, "El título es requerido"),
  operationType: z.string().optional(),
  propertyType: z.string().optional(),
  price: z.number().nullable().optional(),
  currency: z.string().default("USD"),
  expenses: z.number().nullable().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  totalArea: z.number().nullable().optional(),
  coveredArea: z.number().nullable().optional(),
  rooms: z.number().int().nullable().optional(),
  bedrooms: z.number().int().nullable().optional(),
  bathrooms: z.number().int().nullable().optional(),
  garage: z.number().int().nullable().optional(),
  description: z.string().min(10, "La descripción es requerida"),
  features: z.array(z.string()).default([]),
  photos: z.array(z.string()).default([]),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  
  // Contact Info
  agentName: z.string().optional(),
  agentPhone: z.string().optional(),
  agentWhatsapp: z.string().optional(),
  agentEmail: z.string().email().optional().or(z.literal("")),
  officeName: z.string().optional(),

  isPublished: z.boolean().default(false),
  userId: z.string(),
});

export type Property = z.infer<typeof propertySchema>;

export interface ScrapedPropertyData extends Partial<Omit<Property, "userId" | "isPublished">> {
  source: "argenprop" | "manual" | "jina-ai";
}
