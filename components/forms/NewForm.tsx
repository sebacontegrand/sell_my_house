"use client";

import React, { useEffect, useState } from "react";
import { createForm } from "../../helpers/forms";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
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

const NewForm = () => {
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
      ambientes: undefined,
      orientacion: "N",
      impuestos: undefined,
      expensas: undefined,
      servicios: "",
      valoralquiler: undefined,
      valorventa: undefined,
      antiguedad: undefined,
      estado: "bueno",
      heattype: "losaradiante",
      plantas: undefined,
      cocheras: undefined,
      banos: undefined,
      toilette: undefined,
      dormitorio: undefined,
      dormitorioserv: false,
      amenities: false,
      baulera: false,
      cantascensores: 0,
      categoria: "Altonivel",
      mlivinga: undefined,
      mlivingl: undefined,
      mcomedora: undefined,
      mcomedorl: undefined,
      mcocinaa: undefined,
      mcocinal: undefined,
      mdorm1a: undefined,
      mdorm1l: undefined,
      mdorm2a: undefined,
      mdorm2l: undefined,
      mdorm3a: undefined,
      mdorm3l: undefined,
      mdorm4a: undefined,
      mdorm4l: undefined,
      mlava: undefined,
      mlavl: undefined,
      mhalla: undefined,
      mhalll: undefined,
      mbanos1a: undefined,
      mbanos1l: undefined,
      mbanos2a: undefined,
      mbanos2l: undefined,
      mbanos3a: undefined,
      mbanos3l: undefined,
      mbanos4a: undefined,
      mbanos4l: undefined,
      mtoilette1a: undefined,
      mtoilette1l: undefined,
      mtoilette2a: undefined,
      mtoilette2l: undefined,
      mtoilette3a: undefined,
      mtoilette3l: undefined,
      mtoilette4a: undefined,
      mtoilette4l: undefined,
      mcocha: undefined,
      mcochl: undefined,
      mpiletaa: undefined,
      mpiletal: undefined,
      mquinchoa: undefined,
      mquinchol: undefined,
      msemicubiertoa: undefined,
      msemicubiertol: undefined,
      motrosespaciosa: undefined,
      motrosespaciosl: undefined,
      escritura: false,
      plano: false,
      finalobra: false,
      comentarios: "",
    },
  });
  const id = localStorage.getItem("prelistingId");
  const [dormCount, setDormCount] = useState<number>(0);
  const [banosCount, setBanosCount] = useState<number>(0);
  const [toiletteCount, setToiletteCount] = useState<number>(0);

  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertAction = () => {
    setShowAlert(false);
  };
  const watchDormitorio = form.watch("dormitorio", 0);
  const watchBanos = form.watch("banos", 0);
  const watchToilette = form.watch("toilette", 0);

  useEffect(() => {
    setDormCount(watchDormitorio || 0);
    setBanosCount(watchBanos || 0);
    setToiletteCount(watchToilette || 0);
  }, [watchDormitorio, watchBanos, watchToilette]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const prelistingId = id?.toString()!;

    console.log("Submitted Values:", values);
    const transformedValues = {
      ...values,
      date: new Date(values.date).toISOString().split("T")[0],
      fechadenacimiento: new Date(values.fechadenacimiento)
        .toISOString()
        .split("T")[0],
      whenneedtomove: values.whenneedtomove
        ? new Date(values.whenneedtomove).toISOString().split("T")[0]
        : "",
    };
    console.log(
      "%c Line:121 🍤 transformedValues",
      "color:#4fff4B",
      transformedValues
    );
    try {
      await createForm(prelistingId, transformedValues);
      setShowAlert(true);
      form.reset();
      router.push("/dashboard/form");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error occurred:", error.message);
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  };

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

  return (
    <>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Heads up!</AlertDialogTitle>
              <AlertDialogDescription>
                Prelisting! Creado.
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
          <span className="mb-4 font-mono text-gray-500">Form Id: {id}</span>
          <span className="mb-4 font-mono text-gray-600">Prelisting Form</span>
        </div>
        <form
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
          <div className="flex flex-row justify-between text-base items-center">
            <span>Celular:</span>
            <FormField
              control={form.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="celular"
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
          </div>

          <div className="flex flex-row justify-between text-base items-center">
            <span>Fecha de nacimiento</span>
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
          </div>
          <span>Preguntas al Vendedor:</span>
          <hr />
          <FormField
            control={form.control}
            name="whysell"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Porque Vende la propiedad?
                </FormLabel>
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
                      <SelectItem value="bueno">Bueno</SelectItem>
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
                        placeholder="Pisos?"
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
                        placeholder="cuantos Autos?"
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
              <Controller
                control={form.control}
                name="banos"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-1 border rounded text-xs"
                        placeholder="Cantidad?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0"
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
              <Controller
                control={form.control}
                name="dormitorio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-1 border rounded text-xs"
                        placeholder="Cantidad?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0"
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
              <Controller
                control={form.control}
                name="toilette"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-2 p-1 border rounded text-xs"
                        placeholder="Cantidad?"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        type="number"
                        min="0"
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

            {Array.from({ length: dormCount }, (_, index) => (
              <span
                className="flex flex-col text-xs items-center"
                key={`dorm-${index + 1}`}
              >
                <label>{`Dormitorio ${index + 1}`}</label>
                <div className="flex flex-row items-center">
                  <Controller
                    name={`mdorm${index + 1}a` as string}
                    defaultValue={0}
                    render={({ field }) => (
                      <input
                        className="mt-2 p-2 border rounded w-1/2"
                        {...field}
                        type="number"
                        step="0.5"
                        placeholder="A=?"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                  <Controller
                    name={`mdorm${index + 1}l` as string}
                    defaultValue={0}
                    render={({ field }) => (
                      <input
                        className="mt-2 p-2 border rounded w-1/2"
                        {...field}
                        type="number"
                        step="0.5"
                        placeholder="L=?"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                </div>
              </span>
            ))}
            {Array.from({ length: banosCount }, (_, index) => (
              <span
                className="flex flex-col text-xs items-center"
                key={`banos-${index + 1}`}
              >
                <label>{`Baños ${index + 1}`}</label>
                <div className="flex flex-row items-center">
                  <Controller
                    name={`mbanos${index + 1}a` as string}
                    defaultValue={0}
                    render={({ field }) => (
                      <input
                        className="mt-2 p-2 border rounded w-1/2"
                        {...field}
                        type="number"
                        step="0.5"
                        placeholder="A=?"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                  <Controller
                    name={`mbanos${index + 1}l` as string}
                    defaultValue={0}
                    render={({ field }) => (
                      <input
                        className="mt-2 p-2 border rounded w-1/2"
                        {...field}
                        type="number"
                        step="0.5"
                        placeholder="L=?"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                </div>
              </span>
            ))}
            {Array.from({ length: toiletteCount }, (_, index) => (
              <span
                className="flex flex-col text-xs items-center"
                key={`toilette-${index + 1}`}
              >
                <label>{`Toilette ${index + 1}`}</label>
                <div className="flex flex-row items-center">
                  <Controller
                    name={`mtoilette${index + 1}a` as string}
                    defaultValue={0}
                    render={({ field }) => (
                      <input
                        className="mt-2 p-2 border rounded w-1/2"
                        {...field}
                        type="number"
                        step="0.5"
                        placeholder="A=?"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                  <Controller
                    name={`mtoilette${index + 1}l` as string}
                    defaultValue={0}
                    render={({ field }) => (
                      <input
                        className="mt-2 p-2 border rounded w-1/2"
                        {...field}
                        type="number"
                        step="0.5"
                        placeholder="L=?"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                </div>
              </span>
            ))}
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
          </div>
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
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Crear Prelisting</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default NewForm;
