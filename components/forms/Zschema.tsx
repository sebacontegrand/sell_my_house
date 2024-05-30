import * as z from "zod";
export const formSchema = z
  .object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    asesor: z.string(),
    proprietario: z.string(),
    email: z.string().email().min(5),
    celular: z.number().nonnegative(),
    fechadenacimiento: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    whysell: z.string(),
    ocupacion: z.boolean(),
    selltobuy: z.boolean(),
    solvebeforesell: z.enum([
      "hipoteca",
      "inhibiciones",
      "matrimonio",
      "otros",
    ]),
    includedinsell: z.enum(["muebles", "cortinas", "aires", "luces", "otros"]),
  })
  .refine((data) => {
    return true;
  });
