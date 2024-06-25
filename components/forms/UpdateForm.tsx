"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { fetchForm, updateFormPUT } from "../../helpers/forms";
import { useRouter } from "next/navigation";

import { useForm, FormProvider } from "react-hook-form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { SpinnerDotted } from "spinners-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formSchema } from "./Zschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface UpdateFormProps {
  id: string;
}
const UpdateForm: React.FC<UpdateFormProps> = ({ id }) => {
  const router = useRouter();
  const componentRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      asesor: "",
      proprietario: "",
      email: "",
      celular: 2213648563,
      fechadenacimiento: new Date().toISOString().split("T")[0],
      whysell: "",
      ocupacion: false,
      selltobuy: false,
      solvebeforesell: "hipoteca",
      otrosolvebeforesell: "",
      includedinsell: "muebles",
      otrosincludedinsell: "",
      whenneedtomove: new Date().toISOString().split("T")[0],
      whyneedtomove: "divorcio",
      otrosneedtomove: "",
      neighbors: "",
      neighborhood: "",
      typeoperation: "alquiler",
      otrotypeoperation: "",
      direccion: "",
      propertytype: "casa",
      otropropertytype: "",
      ambientes: 0,
      orientacion: "N",
      impuestos: 0,
      expensas: 0,
      servicios: "",
      valoralquiler: 0,
      valorventa: 0,
      antiguedad: 0,
      estado: "bueno",
      heattype: "losaradiante",
      plantas: 0,
      cocheras: 0,
      banos: 0,
      toilette: 0,
      dormitorio: 0,
      dormitorioserv: false,
      amenities: false,
      baulera: false,
      cantascensores: 0,
      categoria: "Altonivel",
      mlivinga: 0,
      mlivingl: 0,
      mcomedora: 0,
      mcomedorl: 0,
      mcocinaa: 0,
      mcocinal: 0,
      mdorm1a: 0,
      mdorm1l: 0,
      mdorm2a: 0,
      mdorm2l: 0,
      mdorm3a: 0,
      mdorm3l: 0,
      mdorm4a: 0,
      mdorm4l: 0,
      mdorm5a: 0,
      mdorm5l: 0,
      mlava: 0,
      mlavl: 0,
      mhalla: 0,
      mhalll: 0,
      mbanos1a: 0,
      mbanos1l: 0,
      mbanos2a: 0,
      mbanos2l: 0,
      mbanos3a: 0,
      mbanos3l: 0,
      mbanos4a: 0,
      mbanos4l: 0,
      mbanos5a: 0,
      mbanos5l: 0,
      mtoilette1a: 0,
      mtoilette1l: 0,
      mtoilette2a: 0,
      mtoilette2l: 0,
      mtoilette3a: 0,
      mtoilette3l: 0,
      mtoilette4a: 0,
      mtoilette4l: 0,
      mcocha: 0,
      mcochl: 0,
      mpiletaa: 0,
      mpiletal: 0,
      mquinchol: 0,
      mquinchoa: 0,
      msemicubiertoa: 0,
      msemicubiertol: 0,
      motrosespaciosa: 0,
      motrosespaciosl: 0,
      escritura: false,
      plano: false,
      finalobra: false,
      comentarios: "",
    },
  });
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertAction = () => {
    setShowAlert(false);
    router.push("/dashboard/form");
  };
  const [totalArea, setTotalArea] = useState<number>(0);
  useEffect(() => {
    const calculateTotalArea = () => {
      const fields = form.getValues([
        "mlivinga",
        "mlivingl",
        "mcomedora",
        "mcomedorl",
        "mcocinaa",
        "mcocinal",
        "mdorm1a",
        "mdorm1l",
        "mdorm2a",
        "mdorm2l",
        "mdorm3a",
        "mdorm3l",
        "mdorm4a",
        "mdorm4l",
        "mdorm5a",
        "mdorm5l",
        "mlava",
        "mlavl",
        "mhalla",
        "mhalll",
        "mbanos1a",
        "mbanos1l",
        "mbanos2a",
        "mbanos2l",
        "mbanos3a",
        "mbanos3l",
        "mbanos4a",
        "mbanos4l",
        "mbanos5a",
        "mbanos5l",
        "mtoilette1a",
        "mtoilette1l",
        "mtoilette2a",
        "mtoilette2l",
        "mtoilette3a",
        "mtoilette3l",
        "mtoilette4a",
        "mtoilette4l",
        "mcocha",
        "mcochl",
        "mpiletaa",
        "mpiletal",
        "mquinchoa",
        "mquinchol",
        "msemicubiertoa",
        "msemicubiertol",
        "motrosespaciosa",
        "motrosespaciosl",
      ]);

      let total = 0;
      if (fields[fields.length - 1] !== undefined) {
        for (let i = 0; i < fields.length; i += 2) {
          total += fields[i]! * fields[i + 1]!;
          console.log("%c Line:201 🥔 total", "color:#6ec1c2", total);
        }
      }

      setTotalArea(total);
    };

    const subscription = form.watch(() => calculateTotalArea());
    return () => subscription.unsubscribe();
  }, [form]);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchForm(id as string);
        const formatDateString = (dateString: string | undefined) => {
          if (!dateString) return new Date().toISOString().split("T")[0];
          const date = new Date(dateString);
          return isNaN(date.getTime())
            ? new Date().toISOString().split("T")[0]
            : date.toISOString().split("T")[0];
        };
        const getSafeValue = (field: { d: any[] }) => {
          return field?.d?.[0] ?? 0;
        };
        const formattedData = {
          ...data,
          date: formatDateString(data?.date),
          fechadenacimiento: formatDateString(data?.fechadenacimiento),
          whenneedtomove: formatDateString(data?.whenneedtomove),
          celular: Number(data?.celular),
          mlivinga: getSafeValue(data?.mlivinga),
          mlivingl: getSafeValue(data?.mlivingl),
          mcomedora: getSafeValue(data?.mcomedora),
          mcomedorl: getSafeValue(data?.mcomedorl),
          mcocinaa: getSafeValue(data?.mcocinaa),
          mcocinal: getSafeValue(data?.mcocinal),
          mdorm1a: getSafeValue(data?.mdorm1a),
          mdorm1l: getSafeValue(data?.mdorm1l),
          mdorm2a: getSafeValue(data?.mdorm2a),
          mdorm2l: getSafeValue(data?.mdorm2l),
          mdorm3a: getSafeValue(data?.mdorm3a),
          mdorm3l: getSafeValue(data?.mdorm3l),
          mdorm4a: getSafeValue(data?.mdorm4a),
          mdorm4l: getSafeValue(data?.mdorm4l),
          mdorm5a: getSafeValue(data?.mdorm5a),
          mdorm5l: getSafeValue(data?.mdorm5l),
          mlava: getSafeValue(data?.mlava),
          mlavl: getSafeValue(data?.mlavl),
          mhalla: getSafeValue(data?.mhalla),
          mhalll: getSafeValue(data?.mhalll),
          mbanos1a: getSafeValue(data?.mbanos1a),
          mbanos1l: getSafeValue(data?.mbanos1l),
          mbanos2a: getSafeValue(data?.mbanos2a),
          mbanos2l: getSafeValue(data?.mbanos2l),
          mbanos3a: getSafeValue(data?.mbanos3a),
          mbanos3l: getSafeValue(data?.mbanos3l),
          mbanos4a: getSafeValue(data?.mbanos4a),
          mbanos4l: getSafeValue(data?.mbanos4l),
          mbanos5a: getSafeValue(data?.mbanos5a),
          mbanos5l: getSafeValue(data?.mbanos5l),
          mtoilette1a: getSafeValue(data?.mtoilette1a),
          mtoilette1l: getSafeValue(data?.mtoilette1l),
          mtoilette2a: getSafeValue(data?.mtoilette2a),
          mtoilette2l: getSafeValue(data?.mtoilette2l),
          mtoilette3a: getSafeValue(data?.mtoilette3a),
          mtoilette3l: getSafeValue(data?.mtoilette3l),
          mtoilette4a: getSafeValue(data?.mtoilette4a),
          mtoilette4l: getSafeValue(data?.mtoilette4l),
          mcocha: getSafeValue(data?.mcocha),
          mcochl: getSafeValue(data?.mcochl),
          mpiletaa: getSafeValue(data?.mpiletaa),
          mpiletal: getSafeValue(data?.mpiletal),
          mquinchoa: getSafeValue(data?.mquinchoa),
          mquinchol: getSafeValue(data?.mquinchol),
          msemicubiertoa: getSafeValue(data?.msemicubiertoa),
          msemicubiertol: getSafeValue(data?.msemicubiertol),
          motrosespaciosa: getSafeValue(data?.motrosespaciosa),
          motrosespaciosl: getSafeValue(data?.motrosespaciosl),
        };
        console.log(
          "%c Line:202 🧀 formattedData",
          "color:#465975",
          formattedData
        );

        form.reset(formattedData);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, form]);
  const [solveBeforeSell, setSolveBeforeSell] = useState<string>(
    form.getValues("solvebeforesell")
  );
  const [includedInSell, setIncludedInSell] = useState<string>(
    form.getValues("includedinsell")
  );
  const [whyNeedToMove, setWhyNeedToMove] = useState<string>(
    form.getValues("whyneedtomove")
  );
  const [otroTypeOperation, setOtroTypeOperation] = useState<string>(
    form.getValues("typeoperation")
  );
  const [propertyType, setPropertyType] = useState<string>(
    form.getValues("propertytype")
  );
  const watchIncludedInSell = form.watch("includedinsell");
  const watchSolveBeforeSell = form.watch("solvebeforesell");
  const watchWhyNeedToMove = form.watch("whyneedtomove");
  const watchOtroTypeOperation = form.watch("typeoperation");
  const watchPropertyType = form.watch("propertytype");

  useEffect(() => {
    setIncludedInSell(watchIncludedInSell);
    setSolveBeforeSell(watchSolveBeforeSell);
    setWhyNeedToMove(watchWhyNeedToMove);
    setOtroTypeOperation(watchOtroTypeOperation);
    setPropertyType(watchPropertyType);
  }, [
    watchSolveBeforeSell,
    watchIncludedInSell,
    watchWhyNeedToMove,
    watchOtroTypeOperation,
    watchPropertyType,
  ]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted Values:", values);
    const formatDateString = (dateString: string | undefined): string => {
      if (!dateString) {
        return new Date().toISOString().split("T")[0];
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date().toISOString().split("T")[0];
      }
      return date.toISOString().split("T")[0];
    };
    const transformedValues = {
      ...values,
      date: formatDateString(values.date),
      fechadenacimiento: formatDateString(values.fechadenacimiento),
      whenneedtomove: formatDateString(values.whenneedtomove),
      celular: Number(values.celular),
    };
    console.log(
      "%c Line:290 🍤 transformedValues",
      "color:#6ec1c2",
      transformedValues
    );

    await updateFormPUT(id!, transformedValues);
    setShowAlert(true);
    form.reset();

    setLoading(false);
  };

  if (loading) {
    return (
      <SpinnerDotted
        size={50}
        thickness={100}
        speed={100}
        color="rgba(172, 125, 57, 1)"
      />
    );
  }
  const indices = [1, 2, 3, 4, 5];
  return (
    <>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Heads up!</AlertDialogTitle>
              <AlertDialogDescription>
                Prelisting! Actualizado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleAlertAction}>
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <FormProvider {...form}>
        <div className="flex flex-col">
          <span className="mb-4 font-mono text-gray-500">Form Id:{id}</span>
          <span className="mb-4 font-mono text-gray-600">Prelisting Form</span>
        </div>
        <form
          ref={componentRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col text-xl w-full gap-4 max-w-xl text-pretty text-gray-600"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="date" type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asesor"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="asesor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proprietario"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="proprietario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="celular"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value)); // Convert to number or undefined
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechadenacimiento"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="fechadenacimiento"
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span>Preguntas al Vendedor:</span>
          <hr />
          <FormField
            control={form.control}
            name="whysell"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Porque Vende la propriedad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between items-center">
            <span>La Propriedad esta ocupada actualmente</span>
            <FormField
              control={form.control}
              name="ocupacion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex  items-center space-x-2">
                      <Switch
                        id="ocupacion"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="ocupacion">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row justify-between intems-center">
            <span>Necesita vender su propiedad para comprar?</span>
            <FormField
              control={form.control}
              name="selltobuy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="selltobuy"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="selltobuy">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="solvebeforesell"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Temas a resolver antes de vender la propriedad:
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccione opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="hipoteca">Hipoteca</SelectItem>
                      <SelectItem value="inhibiciones">Inhibiciones</SelectItem>
                      <SelectItem value="matrimonio">Matrimonio</SelectItem>
                      <SelectItem value="otros">Otros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {solveBeforeSell === "otros" && (
            <FormField
              control={form.control}
              name="otrosolvebeforesell"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Especifique otros temas"
                      className="mt-2 p-2 border rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="includedinsell"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Que incluimos en el valor de venta sugerido:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccione opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="muebles">Muebles</SelectItem>
                      <SelectItem value="cortinas">Cortinas</SelectItem>
                      <SelectItem value="aires">Aires</SelectItem>
                      <SelectItem value="luces">Luces</SelectItem>
                      <SelectItem value="otros">Otros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {includedInSell === "otros" && (
            <FormField
              control={form.control}
              name="otrosincludedinsell"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Especifique otros items"
                      className="mt-2 p-2 border rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex flex-col">
            <span>Cuando necesita mudarse:</span>
            <FormField
              control={form.control}
              name="whenneedtomove"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Cuando necesita mudarse"
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="whyneedtomove"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Motivo de la Mudanza:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    id="whyneedtomove-select"
                    className="w-[180px]"
                  >
                    <SelectValue placeholder="whyneedtomove" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="divorcio">Divorcio</SelectItem>
                      <SelectItem value="economico">Economico</SelectItem>
                      <SelectItem value="mudanza">Mudanza</SelectItem>
                      <SelectItem value="otros">Otros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {whyNeedToMove === "otros" && (
            <FormField
              control={form.control}
              name="otrosneedtomove"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="otrosneedtomove-input"
                    className="text-xl"
                  >
                    Specify Other Cause
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Especifique otra causa"
                      className="mt-2 p-2 border rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="neighbors"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Como son los vecinos?"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Como es el barrio?"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeoperation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="typeoperation-select"
                  className="flex flex-row items-center justify-between text-xl"
                >
                  Tipo de operación?
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id="typeoperation-select"
                      className="w-[180px]"
                    >
                      <SelectValue placeholder="Seleccione opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="alquiler">Alquiler</SelectItem>
                        <SelectItem value="venta">Venta</SelectItem>
                        <SelectItem value="alquilertemporario">
                          Alquiler temporario
                        </SelectItem>
                        <SelectItem value="ventayalquiler">
                          Venta y Alquiler
                        </SelectItem>
                        <SelectItem value="ventayalqtemp">
                          Venta y alquiler temporario
                        </SelectItem>
                        <SelectItem value="otros">Otros</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormLabel>
              </FormItem>
            )}
          />
          {otroTypeOperation === "otros" && (
            <FormField
              control={form.control}
              name="otrotypeoperation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Especifique el tipo de operación"
                      className="mt-2 p-2 border rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Direccion: calle, numero, barrio"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertytype"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel className="flex felx-col text-xl items-center justify-between">
                  Tipo de propiedad?
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="dpto">Dpto</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="galpon">Galpon</SelectItem>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="negocio">Negocio</SelectItem>
                        <SelectItem value="ph">Ph</SelectItem>
                        <SelectItem value="cochera">Cochera</SelectItem>
                        <SelectItem value="oficina">Oficina</SelectItem>
                        <SelectItem value="lote">Lote</SelectItem>
                        <SelectItem value="edificio">Edificio</SelectItem>
                        <SelectItem value="quinta">Quinta</SelectItem>
                        <SelectItem value="campo">Campo</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormLabel>
              </FormItem>
            )}
          />
          {propertyType === "otro" && (
            <FormField
              control={form.control}
              name="otropropertytype"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Especifique el tipo de propiedad"
                      className="mt-2 p-2 border rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <span className="flex flex-row text-xl items-center justify-between">
            Cantidad de Ambientes?
            <FormField
              control={form.control}
              name="ambientes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mt-2 p-2 border rounded w-full"
                      placeholder="Cantidad de Ambientes"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <FormField
            control={form.control}
            name="orientacion"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-2 items-center w-full justify-between">
                <FormLabel className="text-xl">Orientacion?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Orientacion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="N">Norte</SelectItem>
                      <SelectItem value="NO">Norte Oeste</SelectItem>
                      <SelectItem value="O">Oeste</SelectItem>
                      <SelectItem value="SO">Sur</SelectItem>
                      <SelectItem value="S">Sur Este</SelectItem>
                      <SelectItem value="SE">Sur Oeste</SelectItem>
                      <SelectItem value="E">Este</SelectItem>
                      <SelectItem value="NE">Norte Este</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <hr />
          <div className="flex flex-row gap-2">
            <span className="flex flex-col text-xs items-center">
              Valor Impuestos?
              <FormField
                control={form.control}
                name="impuestos"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2  border rounded "
                        placeholder="$ Aprox."
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="0.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex flex-col text-xs items-center">
              Valor Expensas?
              <FormField
                control={form.control}
                name="expensas"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-2 border rounded "
                        placeholder="$ Aprox."
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="0.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
          </div>
          <span className="flex flex-row text-xs items-center justify-between">
            Con que servicios cuenta la propiedad?
            <FormField
              control={form.control}
              name="servicios"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Areas comunes?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <div className="flex flex-row gap-2">
            <span className="flex flex-col text-xs items-center">
              Valor Alquiler?
              <FormField
                control={form.control}
                name="valoralquiler"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2  border rounded "
                        placeholder="$ Estimado"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="0.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex flex-col text-xs items-center">
              Valor Venta?
              <FormField
                control={form.control}
                name="valorventa"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-2 border rounded "
                        placeholder=" $ Estimado"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="0.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
          </div>
          <hr />
          <span className="flex flex-row text-xl items-center justify-between">
            Antiguedad de la Propiedad?
            <FormField
              control={form.control}
              name="antiguedad"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mt-2 p-2 border rounded "
                      placeholder="Antiguedad de la Propiedad."
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-2 items-center w-full justify-between">
                <FormLabel className="text-xl">
                  Estado de la Propiedad?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="bueno">Bueno</SelectItem>
                      <SelectItem value="construccion">Construccion</SelectItem>
                      <SelectItem value="estrenar">Estrenar</SelectItem>
                      <SelectItem value="excelente">Excelente</SelectItem>
                      <SelectItem value="muybueno">Muy Bueno</SelectItem>
                      <SelectItem value="reciclado">Reciclado</SelectItem>
                      <SelectItem value="refaccionar">Refaccionar</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="pozo">Pozo</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heattype"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-2 items-center w-full">
                <FormLabel className="flex flex-row text-xl items-center justify-between w-full">
                  Tipo de calefaccion?
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Bueno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="losaradiante">
                          Loza radiante
                        </SelectItem>
                        <SelectItem value="radiadores">Radiadores</SelectItem>
                        <SelectItem value="splitfc">SplitFC</SelectItem>
                        <SelectItem value="calefactores">
                          Calefactores individuales
                        </SelectItem>
                        <SelectItem value="central">Central</SelectItem>
                        <SelectItem value="sin">Sin Calefaccion</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="flex flex-row items-center p-2 justify-between">
            <span>Dormitorio de servicio?</span>
            <FormField
              control={form.control}
              name="dormitorioserv"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex  items-center space-x-2">
                      <Switch
                        id="dormitorioserv"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="dormitorioserv">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row items-center p-2 justify-between">
            <span>Amenities?</span>
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex  items-center space-x-2">
                      <Switch
                        id="amenities"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="amenities">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row items-center p-2 justify-between">
            <span>Baulera?</span>
            <FormField
              control={form.control}
              name="baulera"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex  items-center space-x-2">
                      <Switch
                        id="baulera"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="baulera">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cantascensores"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row text-xl">
                  Cantidad de Ascensores?
                  <FormControl>
                    <Input
                      className="mt-2 p-2 border rounded "
                      placeholder="Cantidad de Ascensores?"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-2 items-center w-full">
                <FormLabel className="text-xl">
                  Categoría Edificación?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Excelente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Altonivel">Alto nivel</SelectItem>
                      <SelectItem value="excelente">Excelente</SelectItem>
                      <SelectItem value="muybueno">Muy Bueno</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center p-2 justify-between">
            <span>Escritura?</span>
            <FormField
              control={form.control}
              name="escritura"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex  items-center space-x-2">
                      <Switch
                        id="escritura"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="escritura">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row items-center p-2 justify-between">
            <span>Planos de construcción?</span>
            <FormField
              control={form.control}
              name="plano"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex  items-center space-x-2">
                      <Switch
                        id="plano"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="plano">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row items-center p-2 justify-between">
            <span>Final de obra?</span>
            <FormField
              control={form.control}
              name="finalobra"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex  items-center space-x-2">
                      <Switch
                        id="finalobra"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="finalobra">Si</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2">
            <span className="flex flex-col text-xs items-center">
              Plantas?
              <FormField
                control={form.control}
                name="plantas"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-2 border rounded "
                        placeholder="Plantas?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="0.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex flex-col text-xs items-center">
              Cocheras?
              <FormField
                control={form.control}
                name="cocheras"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-2 border rounded "
                        placeholder="Cocheras?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="0.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex flex-col text-xs items-center">
              Baños?
              <FormField
                control={form.control}
                name="banos"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-1 border rounded "
                        placeholder="Baños?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex flex-col text-xs items-center">
              Dormitorios?
              <FormField
                control={form.control}
                name="dormitorio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-1 border rounded text-xs"
                        placeholder="Dormitorios?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <span className="flex flex-col text-xs items-center">
              Toilettes?
              <FormField
                control={form.control}
                name="toilette"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-2 border rounded "
                        placeholder="Toilettes?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0.0"
                        step="1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
          </div>
          <span>Dimensiones: A=Ancho x L=Largo</span>
          <hr />
          <div className="grid grid-cols-4 gap-2">
            <span className="flex flex-col text-xs items-center">
              Living
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mlivinga"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mlivingl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            <span className="flex flex-col text-xs items-center">
              Comedor
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mcomedora"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mcomedorl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            <span className="flex flex-col text-xs items-center">
              Cocina
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mcocinaa"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mcocinal"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            {form.watch("mdorm1a") !== 0 && form.watch("mdorm1l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Dormitorio 1
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mdorm1a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mdorm1l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mdorm2a") !== 0 && form.watch("mdorm2l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Dormitorio 2
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mdorm2a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mdorm2l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mdorm3a") !== 0 && form.watch("mdorm3l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Dormitorio 3
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mdorm3a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mdorm3l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mdorm4a") !== 0 && form.watch("mdorm4l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Dormitorio 4
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mdorm4a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mdorm4l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mdorm5a") !== 0 && form.watch("mdorm5l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Dormitorio 5
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mdorm5a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mdorm5l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mbanos1a") !== 0 && form.watch("mbanos1l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Baño 1
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mbanos1a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mbanos1l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mbanos2a") !== 0 && form.watch("mbanos2l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Baño 2
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mbanos2a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mbanos2l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mbanos3a") !== 0 && form.watch("mbanos3l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Baño 3
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mbanos3a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mbanos3l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mbanos4a") !== 0 && form.watch("mbanos4l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Baño 4
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mbanos4a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mbanos4l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mbanos5a") !== 0 && form.watch("mbanos5l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Baño 5
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mbanos5a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mbanos5l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mtoilette1a") !== 0 &&
            form.watch("mtoilette1l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Toilette 1
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mtoilette1a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mtoilette1l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mtoilette2a") !== 0 &&
            form.watch("mtoilette2l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Toilette 2
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mtoilette2a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mtoilette2l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mtoilette3a") !== 0 &&
            form.watch("mtoilette3l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Toilette 3
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mtoilette3a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mtoilette3l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            {form.watch("mtoilette4a") !== 0 &&
            form.watch("mtoilette4l") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Toilette 4
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="mtoilette4a"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mtoilette4l"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
            <span className="flex flex-col text-xs items-center">
              Lavadero
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mlava"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mlavl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            <span className="flex flex-col text-xs items-center">
              Hall
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mhalla"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mhalll"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>

            <span className="flex flex-col text-xs items-center">
              Cochera
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mcocha"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mcochl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            <span className="flex flex-col text-xs items-center">
              Pileta
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mpiletaa"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mpiletal"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            <span className="flex flex-col text-xs items-center">
              Quincho
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="mquinchoa"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mquinchol"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            <span className="flex flex-col text-xs items-center">
              Semicubiertos
              <div className="flex flex-row items-center">
                <FormField
                  control={form.control}
                  name="msemicubiertoa"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="A=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="msemicubiertol"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 p-2 border rounded "
                          placeholder="L=?"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          type="number"
                          step="0.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </span>
            {form.watch("motrosespaciosa") !== 0 &&
            form.watch("motrosespaciosl") !== 0 ? (
              <span className="flex flex-col text-xs items-center">
                Otros Espacios
                <div className="flex flex-row items-center">
                  <FormField
                    control={form.control}
                    name="motrosespaciosa"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="A=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="motrosespaciosl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="mt-2 p-2 border rounded "
                            placeholder="L=?"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            type="number"
                            step="0.5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </span>
            ) : null}
          </div>
          {<span>Superficie total: {totalArea} m2</span>}
          <div>
            <span>Comentarios adicionales:</span>
            <FormField
              control={form.control}
              name="comentarios"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Otras Observaciones"
                      className="mt-2 p-2 border rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {<div className="flex flex-row justify-center  m-2">{}</div>}
          <div className="flex flex-row justify-center  m-2">
            <Button className="p-2 m-2" type="submit">
              Guardar Prelisting
            </Button>
            <Button className="p-2 m-2" onClick={handlePrint}>
              Imprimir
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default UpdateForm;
