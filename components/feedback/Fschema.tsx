import { feedInmuebleEnum } from "@prisma/client";
import * as z from "zod";
export const feedBackSchema = z
  .object({
    asesorCaptador: z.string(),
    asesorVendedor: z.string(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    masgusto: z.string(),
    menosgusto: z.string(),
    oferta: z.boolean(),
    valoracion: z.enum(["Muy_bueno", "Bueno", "Regular", "Malo", "Muy_malo"]),
    feedEstado: z.enum(["Muy_bueno", "Bueno", "Regular", "Malo", "Muy_malo"]),
    feedInmueble: z.enum(["Muy_bueno", "Bueno", "Regular", "Malo", "Muy_malo"]),
    feedUbicacion: z.enum([
      "Muy_bueno",
      "Bueno",
      "Regular",
      "Malo",
      "Muy_malo",
    ]),
  })
  .refine((data) => {
    return true;
  });
