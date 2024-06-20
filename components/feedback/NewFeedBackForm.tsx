"use client";

import React, { useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { feedBackSchema } from "./Fschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FeedAction } from "@/components/actions/feed-action";
// import { FeedBack } from "@prisma/client";
import {
  feedEstadoEnum,
  feedInmuebleEnum,
  feedubicacionEnum,
  valoracionEnum,
} from "@prisma/client";

type NewFeedBackFormProps = {
  feedBackId: string;
};

const NewFeedBackForm: React.FC<NewFeedBackFormProps> = ({ feedBackId }) => {
  const feedback = useForm<z.infer<typeof feedBackSchema>>({
    resolver: zodResolver(feedBackSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      asesorCaptador: "",
      asesorVendedor: "",
      masgusto: "",
      menosgusto: "",
      oferta: false,
      valoracion: valoracionEnum.Malo,
      feedEstado: feedEstadoEnum.Malo,
      feedInmueble: feedInmuebleEnum.Malo,
      feedUbicacion: feedubicacionEnum.Malo,
    },
  });
  const id = localStorage.getItem("feedBackId");
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertAction = () => {
    setShowAlert(false);
  };
  const onSubmit = async (values: z.infer<typeof feedBackSchema>) => {
    const prelistingId = id?.toString()!;

    const transformedValues = {
      ...values,
      date: new Date(values.date).toISOString(),
    };

    try {
      const feed = await FeedAction(
        prelistingId!,
        values.asesorCaptador,
        values.asesorVendedor,
        transformedValues.date!,
        transformedValues.masgusto,
        transformedValues.menosgusto,
        transformedValues.oferta!,
        transformedValues.valoracion,
        transformedValues.feedEstado,
        transformedValues.feedInmueble,
        transformedValues.feedUbicacion
      );
      setShowAlert(true);
      feedback.reset();
    } catch (error) {
      console.error("Error creating feedback:", error);
    }
  };

  return (
    <>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Heads up!</AlertDialogTitle>
              <AlertDialogDescription>
                Nuevo FeedBack Creado.
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
      <FormProvider {...feedback}>
        <div className="flex flex-col">
          <span className="mb-4 font-mono text-gray-500">
            FeedBack Id: {id}
          </span>
        </div>
        <form
          onSubmit={feedback.handleSubmit(onSubmit)}
          className="flex flex-col text-xl w-full gap-4 max-w-xl text-pretty text-gray-600"
        >
          <FormField
            control={feedback.control}
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
            control={feedback.control}
            name="asesorCaptador"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="asesorCaptador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={feedback.control}
            name="asesorVendedor"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="asesorVendedor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span>Preguntas al Comprador:</span>
          <hr />
          <FormField
            control={feedback.control}
            name="masgusto"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Lo que mas gustó de la propiedad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={feedback.control}
            name="menosgusto"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Lo que menos le gustó de la propiedad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span>
            En caso que se ajuste a sus condiciones de compra (forma de pago,
            precio, exrituracion) realizaria una oferta para este inmueble?
          </span>
          <FormField
            control={feedback.control}
            name="oferta"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="oferta"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="oferta">Si</Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={feedback.control}
            name="feedEstado"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Estado de la propiedad
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
                      <SelectItem value="Muy_bueno">Muy Bueno</SelectItem>
                      <SelectItem value="Bueno">Bueno</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Malo">Malo</SelectItem>
                      <SelectItem value="Muy_malo">Muy Malo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={feedback.control}
            name="feedInmueble"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Que opinion tiene de la propiedad?
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
                      <SelectItem value="Muy_bueno">Muy Bueno</SelectItem>
                      <SelectItem value="Bueno">Bueno</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Malo">Malo</SelectItem>
                      <SelectItem value="Muy_malo">Muy Malo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={feedback.control}
            name="feedUbicacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Que opinion tiene de la ubicación de la propiedad?
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
                      <SelectItem value="Muy_bueno">Muy Bueno</SelectItem>
                      <SelectItem value="Bueno">Bueno</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Malo">Malo</SelectItem>
                      <SelectItem value="Muy_malo">Muy Malo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit">Crear FeedBack</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default NewFeedBackForm;
