"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { fetchFeedBack, updateFeedBackPUT } from "../../helpers/feedBack";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { feedBackSchema } from "./Fschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
interface UpdateFeedBackFormProps {
  id: string;
}
import {
  feedEstadoEnum,
  feedInmuebleEnum,
  feedubicacionEnum,
  valoracionEnum,
} from "@prisma/client";

const UpdateFeedBackForm: React.FC<UpdateFeedBackFormProps> = ({ id }) => {
  const router = useRouter();
  const componentRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertAction = () => {
    setShowAlert(false);
    router.push("/dashboard/feedback");
  };
  const updateFeedBack = useForm<z.infer<typeof feedBackSchema>>({
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
      otrasOpiniones: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchFeedBack(id as string);
        const formatDateString = (dateString: string | undefined) => {
          if (!dateString) return new Date().toISOString().split("T")[0];
          const date = new Date(dateString);
          return isNaN(date.getTime())
            ? new Date().toISOString().split("T")[0]
            : date.toISOString().split("T")[0];
        };
        const formattedData = {
          ...data,
          date: formatDateString(data.date),
        };
        updateFeedBack.reset(formattedData);
        console.log("%c Line:128 🍣 data", "color:#42b983", data);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, updateFeedBack]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const onSubmit = async (values: z.infer<typeof feedBackSchema>) => {
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
    };
    console.log("Transformed Values:", transformedValues); // Log transformed values

    try {
      await updateFeedBackPUT(id!, transformedValues);
      setShowAlert(true);
    } catch (error) {
      console.error("Update failed", error);
    }
    setShowAlert(true);
    updateFeedBack.reset();
  };
  const handleSendEmail = async () => {
    const values = updateFeedBack.getValues();

    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...values }),
    });

    const data = await res.json();
  };
  if (loading)
    return (
      <SpinnerDotted
        size={50}
        thickness={100}
        speed={100}
        color="rgba(172, 125, 57, 1)"
      />
    );

  return (
    <>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Heads up!</AlertDialogTitle>
              <AlertDialogDescription>
                FeeedBack! Actualizado.
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
      <FormProvider {...updateFeedBack}>
        <div className="flex flex-col">
          <span className="mb-4 font-mono text-gray-500">
            FeedBack Id: {id}
          </span>
        </div>
        <form
          ref={componentRef}
          onSubmit={updateFeedBack.handleSubmit(onSubmit)}
          className="flex flex-col text-xl w-full gap-4 max-w-xl text-pretty text-gray-600"
        >
          <FormField
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
            control={updateFeedBack.control}
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
          <FormField
            control={updateFeedBack.control}
            name="otrasOpiniones"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Comentarios adicionales
                </FormLabel>
                <FormControl>
                  <textarea
                    className="align-top h-40 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Otras Opiniones"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-center  m-2">
            <Button className="p-2 m-2" type="submit">
              Guardar FeedBack
            </Button>
            <Button className="p-2 m-2" onClick={handlePrint}>
              Imprimir
            </Button>
            <Button className="p-2 m-2" onClick={handleSendEmail}>
              Email al Proprietario
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default UpdateFeedBackForm;
