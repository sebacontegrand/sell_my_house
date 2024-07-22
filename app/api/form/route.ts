import { auth } from "../../../auth";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server"; 
import * as yup from 'yup'

const postSchema= yup.object({
    prelistingId:yup.string().required(),
    date:yup.date().required(),
    email:yup.string().required(),
    asesor:yup.string().required(),
    proprietario:yup.string().required(),
    celular:yup.number().required(),
    fechadenacimiento: yup.date().required(),
    whysell: yup.string(),
    ocupacion: yup.boolean(),
    selltobuy: yup.boolean(),
    solvebeforesell: yup.string().oneOf(['hipoteca', 'inhibiciones', 'matrimonio', 'otros']).required(),
      otrosolvebeforesell: yup.string(),
      includedinsell: yup.string().oneOf(["muebles", "cortinas", "aires", "luces", "otros"]).required(),
      otrosincludedinsell: yup.string(),
      whenneedtomove: yup.date(),
      whyneedtomove: yup.string().oneOf(["divorcio", "economico", "mudanza", "otros"]).required(),
      otrosneedtomove: yup.string(),
      neighbors: yup.string(),
      neighborhood: yup.string(),
      typeoperation: yup.string().oneOf([
        "alquiler",
        "venta",
        "alquilertemporario",
        "ventayalquiler",
        "ventayalqtemp",
        "otros"
      ]).required(),
      otrotypeoperation: yup.string(),
      direccion: yup.string(),
      propertytype: yup.string().oneOf(["dpto",
      "casa",
      "galpon",
      "local",
      "negocio",
      "ph",
      "cochera",
      "oficina",
      "lote",
      "edificio",
      "quinta",
      "campo",
      "otro"]).required(),
      otropropertytype: yup.string(),
      ambientes: yup.number(),
      orientacion: yup.string().oneOf(["N", "NO", "O", "SO", "S", "SE", "E", "NE"]).required(),
      impuestos: yup.number(),
      expensas: yup.number(),
      servicios: yup.string(),
      valoralquiler: yup.number(),
      valorventa: yup.number(),
      antiguedad: yup.number(),
      estado: yup.string().oneOf(["bueno", "construccion", "estrenar", "excelente", "muybueno", "reciclado", "refaccionar", "regular", "pozo", "otro"]).required(),
      heattype: yup.string().oneOf(["losaradiante", "radiadores", "splitfc", "central","calefactores", "sin"]).required(),
      plantas: yup.number(),
      cocheras: yup.number(),
      banos: yup.number(),
      toilette: yup.number(),
      dormitorio: yup.number(),
      dormitorioserv: yup.boolean(),
      amenities: yup.boolean(),
      baulera: yup.boolean(),
      cantascensores: yup.number(),
      categoria: yup.string().oneOf(["Altonivel", "excelente", "muybueno","bueno", "regular"]).required(),
      mlivinga: yup.number(),
      mlivingl: yup.number(),
      mcomedora: yup.number(),
      mcomedorl: yup.number(),
      mcocinaa: yup.number(),
      mcocinal: yup.number(),
      mdorm1a: yup.number(),
      mdorm1l: yup.number(),
      mdorm2a: yup.number(),
      mdorm2l: yup.number(),
      mdorm3a: yup.number(),
      mdorm3l: yup.number(),
      mdorm4a: yup.number(),
      mdorm4l: yup.number(),
      mdorm5a: yup.number(),
      mdorm5l: yup.number(),
      mlava: yup.number(),
      mlavl: yup.number(),
      mhalla: yup.number(),
      mhalll: yup.number(),
      mbanos1a: yup.number(),
      mbanos1l: yup.number(),
      mbanos2a: yup.number(),
      mbanos2l: yup.number(),
      mbanos3a: yup.number(),
      mbanos3l: yup.number(),
      mbanos4a: yup.number(),
      mbanos4l: yup.number(),
      mbanos5a: yup.number(),
      mbanos5l: yup.number(),
      mtoilette1a: yup.number(),
      mtoilette1l: yup.number(),
      mtoilette2a: yup.number(),
      mtoilette2l: yup.number(),
      mtoilette3a: yup.number(),
      mtoilette3l: yup.number(),
      mtoilette4a: yup.number(),
      mtoilette4l: yup.number(),
      mcocha: yup.number(),
      mcochl: yup.number(),
      mpiletaa: yup.number(),
      mpiletal: yup.number(),
      mquinchol: yup.number(),
      mquinchoa: yup.number(),
      msemicubiertoa: yup.number(),
      msemicubiertol: yup.number(),
      motrosespaciosa: yup.number(),
      motrosespaciosl: yup.number(),
      escritura: yup.boolean(),
      plano: yup.boolean(),
      finalobra: yup.boolean(),
      
      comentarios: yup.string(),
    
    })
    function serializeWithBigInt(obj: any): any {
        if (typeof obj === 'bigint') {
            return obj.toString();
        } else if (Array.isArray(obj)) {
            return obj.map(serializeWithBigInt);
        } else if (obj !== null && typeof obj === 'object') {
            return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, serializeWithBigInt(value)]));
        } else {
            return obj;
        }
    }
    
export async function POST(request:Request){
   const session=await auth()
    if(!session?.user){
        return NextResponse.json('No autorizado',{status:401})
    }
   
    try {
        const validatedData = await postSchema.validate(await request.json());
    
        const { prelistingId, ...formData } = validatedData;
    
        const existingForm = await prisma.form.findUnique({
          where: { prelistingId },
        });
    
        if (existingForm) {
          return NextResponse.json({ error: 'A form with this prelistingId already exists.' }, { status: 400 });
        }
    
        const form = await prisma.form.create({ data: validatedData });
    
        const formResponse = serializeWithBigInt(form);
        return NextResponse.json(formResponse);
      } catch (error) {
        console.error('Error occurred:', error);
        if (error instanceof yup.ValidationError) {
          return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }




