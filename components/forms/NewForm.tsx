"use client";

import React from "react";
import { createForm } from "../../helpers/forms";
import { useRouter, redirect } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
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
      includedinsell: "muebles",
    },
  });
  const id = localStorage.getItem("prelistingId");

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const prelistingId = id?.toString()!;

    console.log("Submitted Values:", values);
    const transformedValues = {
      ...values,
      date: new Date(values.date),
      fechadenacimiento: new Date(values.fechadenacimiento),
    };
    await createForm(
      prelistingId,
      transformedValues.date,
      transformedValues.email,
      transformedValues.asesor,
      transformedValues.proprietario,
      transformedValues.celular
    );

    form.reset();
    router.push("/dashboard/form");
  };

  return (
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
                  onChange={(e) => field.onChange(Number(e.target.value))}
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
                <Input {...field} placeholder="fechadenacimiento" type="date" />
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
        <span>La Propriedad esta ocupada actualmente</span>
        <FormField
          control={form.control}
          name="ocupacion"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
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
        <span>Necesita vender para comprar?</span>
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
        <FormField
          control={form.control}
          name="solvebeforesell"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">
                Temas a resolver antes de vender la propriedad:
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <FormField
          control={form.control}
          name="includedinsell"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">
                Que incluimos en el valor de venta sugerido:
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default NewForm;
