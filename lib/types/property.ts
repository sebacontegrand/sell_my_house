import { z } from "zod";

const numOrNull = z.preprocess(
  (val) => (val === "" || val === null || val === undefined || Number.isNaN(val) ? null : Number(val)),
  z.number().nullable().optional()
);

const intOrNull = z.preprocess(
  (val) => (val === "" || val === null || val === undefined || Number.isNaN(val) ? null : Number(val)),
  z.number().int().nullable().optional()
);

export const propertySchema = z.object({
  id: z.string().uuid().optional(),
  externalUrl: z.string().url().optional().or(z.literal("")),
  title: z.string().min(3, "El título es requerido"),
  operationType: z.string().optional(),
  propertyType: z.string().optional(),
  price: numOrNull,
  currency: z.string().default("USD"),
  expenses: numOrNull,
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  totalArea: numOrNull,
  coveredArea: numOrNull,
  rooms: intOrNull,
  bedrooms: intOrNull,
  bathrooms: intOrNull,
  garage: intOrNull,
  description: z.string().min(10, "La descripción es requerida"),
  features: z.array(z.string()).default([]),
  photos: z.array(z.string()).default([]),
  latitude: numOrNull,
  longitude: numOrNull,
  
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
