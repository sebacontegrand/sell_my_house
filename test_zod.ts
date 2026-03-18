import { z } from "zod";
const propertySchema = z.object({
  price: z.number().nullable().optional()
});
const parsed = propertySchema.safeParse({ price: NaN });
console.log(parsed.success, parsed.success ? parsed.data : parsed.error.issues);
