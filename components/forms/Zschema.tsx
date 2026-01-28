import * as z from "zod";
export const formSchema = z
  .object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    roomDimensions: z.array(z.object({
      name: z.string().optional(),
      width: z.coerce.number().optional(),
      length: z.coerce.number().optional(),
    })).optional(),
    totalArea: z.coerce.number().optional(),
    // Contact Fields (Required)
    asesor: z.string().min(1, "Asesor es requerido"),
    proprietario: z.string().min(1, "Propietario es requerido"),
    email: z.string().email("Email inválido"),
    celular: z.string().min(1, "Celular es requerido"),
    direccion: z.string().min(1, "Dirección es requerida"),
    propertytype: z.string().min(1, "Tipo de propiedad es requerido"),

    // Questions to Seller (Required)
    fechadenacimiento: z.string().optional(), // Kept optional as not specified as mandatory, check if needed
    whysell: z.string().min(1, "¿Por qué vende? es requerido"),
    ocupacion: z.boolean().default(false),
    selltobuy: z.boolean().default(false),
    solvebeforesell: z.enum([
      "hipoteca",
      "inhibiciones",
      "matrimonio",
      "otros",
    ], { required_error: "Seleccione una opción" }),
    includedinsell: z.enum(["muebles", "cortinas", "aires", "luces", "otros"], { required_error: "Seleccione una opción" }),

    // Optional Fields
    neighbors: z.string().optional(),
    neighborhood: z.string().optional(),

    // New Fields
    typeoperation: z.enum(['alquiler', 'venta', 'alquilertemporario', 'ventayalquiler', 'ventayalqtemp', 'otros']).optional().or(z.literal('')),
    whyneedtomove: z.enum(['divorcio', 'economico', 'mudanza', 'otros']).optional().or(z.literal('')),
    whenneedtomove: z.string().optional(), // Date string

    ambientes: z.coerce.number().optional(),
    dormitorio: z.coerce.number().optional(),
    banos: z.coerce.number().optional(),
    toilette: z.coerce.number().optional(),
    cocheras: z.coerce.number().optional(),
    antiguedad: z.coerce.number().optional(),
    plantas: z.coerce.number().optional(),

    orientacion: z.enum(['N', 'NO', 'O', 'SO', 'S', 'SE', 'E', 'NE']).optional().or(z.literal('')),
    estado: z.enum(['bueno', 'construccion', 'estrenar', 'excelente', 'muybueno', 'reciclado', 'refaccionar', 'regular', 'pozo', 'otro']).optional().or(z.literal('')),
    heattype: z.enum(['losaradiante', 'radiadores', 'splitfc', 'central', 'sin']).optional().or(z.literal('')),
    categoria: z.enum(['Altonivel', 'excelente', 'muybueno', 'regular']).optional().or(z.literal('')),

    impuestos: z.coerce.number().optional(),
    expensas: z.coerce.number().optional(),
    valoralquiler: z.coerce.number().optional(),
    valorventa: z.coerce.number().optional(),
    cantascensores: z.coerce.number().optional(),

    servicios: z.string().optional(),
    comentarios: z.string().optional(),

    dormitorioserv: z.coerce.boolean().optional(),
    amenities: z.coerce.boolean().optional(),
    baulera: z.coerce.boolean().optional(),
    escritura: z.coerce.boolean().optional(),
    plano: z.coerce.boolean().optional(),
    finalobra: z.coerce.boolean().optional(),

    // Dimensions
    mlivinga: z.coerce.number().optional(),
    mlivingl: z.coerce.number().optional(),
    mcomedora: z.coerce.number().optional(),
    mcomedorl: z.coerce.number().optional(),
    mcocinaa: z.coerce.number().optional(),
    mcocinal: z.coerce.number().optional(),
    mdorm1a: z.coerce.number().optional(),
    mdorm1l: z.coerce.number().optional(),
    mdorm2a: z.coerce.number().optional(),
    mdorm2l: z.coerce.number().optional(),
    mbanosa: z.coerce.number().optional(),
    mbanosl: z.coerce.number().optional(),
    mlava: z.coerce.number().optional(),
    mlavl: z.coerce.number().optional(),
    // Values
    test: z.string().optional(),
  })
  .refine((data) => {
    return true;
  });
