"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, useFieldArray, useWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formSchema } from "./Zschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoTrashOutline, IoAddCircleOutline } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch";

interface EditFormProps {
    prelistingId: string;
}

const EditForm = ({ prelistingId }: EditFormProps) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [showMore, setShowMore] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date().toISOString().split("T")[0],
            asesor: "",
            proprietario: "",
            email: "",
            celular: "",
            direccion: "",
            propertytype: undefined,
            fechadenacimiento: new Date().toISOString().split("T")[0],
            whysell: "",
            ocupacion: false,
            selltobuy: false,
            solvebeforesell: undefined,
            includedinsell: undefined,
            ambientes: 0,
            roomDimensions: [], // Dynamic array
            totalArea: 0,
            // New Fields Defaults
            neighbors: "",
            neighborhood: "",
            typeoperation: "",
            whyneedtomove: "",
            whenneedtomove: "",
            orientacion: "",
            estado: "",
            heattype: "",
            categoria: "",
            servicios: "",
            comentarios: "",
            impuestos: 0,
            expensas: 0,
            valoralquiler: 0,
            valorventa: 0,
            cantascensores: 0,
            dormitorio: 0,
            banos: 0,
            toilette: 0,
            cocheras: 0,
            antiguedad: 0,
            plantas: 0,
            dormitorioserv: false,
            amenities: false,
            baulera: false,
            escritura: false,
            plano: false,
            finalobra: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "roomDimensions",
    });

    // Watch for changes to calculate totals
    const watchedDimensions = useWatch({
        control: form.control,
        name: "roomDimensions",
    });

    useEffect(() => {
        // Calculate total area whenever dimensions change
        if (watchedDimensions) {
            const total = watchedDimensions.reduce((acc, room) => {
                const w = Number(room.width) || 0;
                const l = Number(room.length) || 0;
                const area = w * l;
                const isSemi = room.name?.toLowerCase().includes("semicubierto");
                return acc + (isSemi ? area / 2 : area);
            }, 0);
            form.setValue("totalArea", parseFloat(total.toFixed(2)));
        }
    }, [watchedDimensions, form]);


    useEffect(() => {
        const fetchForm = async () => {
            try {
                const res = await fetch(`/api/form/${prelistingId}`);
                const data = await res.json();

                if (data && !data.error) {
                    const formData = {
                        ...data,
                        date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
                        fechadenacimiento: data.fechadenacimiento ? new Date(data.fechadenacimiento).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
                        // Ensure roomDimensions is an array if it exists, or empty
                        roomDimensions: Array.isArray(data.roomDimensions) ? data.roomDimensions : [],
                        totalArea: data.totalArea || 0
                    };

                    // Replace nulls with empty strings or appropriate defaults to prevent controlled component warning
                    Object.keys(formData).forEach(key => {
                        if (formData[key] === null) {
                            formData[key] = "";
                        }
                    });

                    form.reset(formData);
                }
            } catch (error) {
                console.error("Error fetching form:", error);
            } finally {
                setLoading(false);
            }
        };

        if (prelistingId) {
            fetchForm();
        }
    }, [prelistingId, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Submitting values:", values);
        try {
            const res = await fetch(`/api/form/${prelistingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to update form');
            }

            const updatedForm = await res.json();
            console.log("Form updated:", updatedForm);

            alert(`Form Saved Successfully! Total Area: ${updatedForm.totalArea} m²`);
            router.refresh();
        } catch (e) {
            console.error(e);
            alert("Error saving form. Check console for details.");
        }
    };

    if (loading) return <div>Loading form details...</div>;

    return (
        <FormProvider {...form}>
            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Detalles y Dimensiones</h2>
                <span className="text-gray-500 text-sm">Prelisting ID: {prelistingId}</span>
            </div>
            <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
                className="flex flex-col w-full gap-6 max-w-4xl text-gray-700"
            >
                <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-blue-600">Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="proprietario" render={({ field }) => (
                            <FormItem> <FormLabel>Propietario</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                        )} />
                        <FormField control={form.control} name="asesor" render={({ field }) => (
                            <FormItem> <FormLabel>Asesor</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem> <FormLabel>Email</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                        )} />
                        <FormField control={form.control} name="celular" render={({ field }) => (
                            <FormItem> <FormLabel>Celular</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                        )} />
                        <FormField control={form.control} name="direccion" render={({ field }) => (
                            <FormItem> <FormLabel>Dirección</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                        )} />
                        <FormField control={form.control} name="propertytype" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de Propiedad</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="casa">Casa</SelectItem>
                                        <SelectItem value="dpto">Departamento</SelectItem>
                                        <SelectItem value="ph">PH</SelectItem>
                                        <SelectItem value="local">Local</SelectItem>
                                        <SelectItem value="oficina">Oficina</SelectItem>
                                        <SelectItem value="lote">Lote</SelectItem>
                                        <SelectItem value="otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                    </div>
                </div>

                {/* QUESTIONS */}
                <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-blue-600">Preguntas al Vendedor</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <FormField control={form.control} name="whysell" render={({ field }) => (
                            <FormItem> <FormLabel>¿Por qué vende?</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                        )} />

                        <FormField control={form.control} name="ocupacion" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                <div className="space-y-0.5"><FormLabel>¿Ocupada actualmente?</FormLabel></div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="selltobuy" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                <div className="space-y-0.5"><FormLabel>¿Vende para comprar?</FormLabel></div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="solvebeforesell" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Temas a resolver antes de venta</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione opción" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="hipoteca">Hipoteca</SelectItem>
                                        <SelectItem value="inhibiciones">Inhibiciones</SelectItem>
                                        <SelectItem value="matrimonio">Matrimonio</SelectItem>
                                        <SelectItem value="otros">Otros</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="includedinsell" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Incluido en la venta</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione opción" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="muebles">Muebles</SelectItem>
                                        <SelectItem value="cortinas">Cortinas</SelectItem>
                                        <SelectItem value="aires">Aires</SelectItem>
                                        <SelectItem value="luces">Luces</SelectItem>
                                        <SelectItem value="otros">Otros</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                    </div>
                </div>

                <div className="flex justify-center my-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowMore(!showMore)}
                        className="w-full md:w-auto"
                    >
                        {showMore ? "Ver Menos Info" : "Ampliar Info"}
                    </Button>
                </div>

                {showMore && (
                    <div className="space-y-6">


                        {/* LOCATION */}
                        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-blue-600">Ubicación y Entorno</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="neighborhood" render={({ field }) => (
                                    <FormItem> <FormLabel>Barrio</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="neighbors" render={({ field }) => (
                                    <FormItem> <FormLabel>Vecinos</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* DETAILS & STATUS */}
                        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-blue-600">Detalles de la Propiedad</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FormField control={form.control} name="ambientes" render={({ field }) => (
                                    <FormItem> <FormLabel>Ambientes</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="dormitorio" render={({ field }) => (
                                    <FormItem> <FormLabel>Dormitorios</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="banos" render={({ field }) => (
                                    <FormItem> <FormLabel>Baños</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="toilette" render={({ field }) => (
                                    <FormItem> <FormLabel>Toilettes</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="cocheras" render={({ field }) => (
                                    <FormItem> <FormLabel>Cocheras</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="plantas" render={({ field }) => (
                                    <FormItem> <FormLabel>Plantas</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="antiguedad" render={({ field }) => (
                                    <FormItem> <FormLabel>Antigüedad (años)</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="cantascensores" render={({ field }) => (
                                    <FormItem> <FormLabel>Ascensores</FormLabel> <FormControl><Input type="number" min="0" {...field} /></FormControl> </FormItem>
                                )} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                <FormField control={form.control} name="orientacion" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Orientación</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Seleccione" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {['N', 'NO', 'O', 'SO', 'S', 'SE', 'E', 'NE'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="estado" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Seleccione" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {['bueno', 'construccion', 'estrenar', 'excelente', 'muybueno', 'reciclado', 'refaccionar', 'regular', 'pozo', 'otro'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="heattype" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Calefacción</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Seleccione" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {['losaradiante', 'radiadores', 'splitfc', 'central', 'sin'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                                <FormField control={form.control} name="dormitorioserv" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                        <div className="space-y-0.5"><FormLabel className="text-xs">Dependencia</FormLabel></div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="amenities" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                        <div className="space-y-0.5"><FormLabel className="text-xs">Amenities</FormLabel></div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="baulera" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                        <div className="space-y-0.5"><FormLabel className="text-xs">Baulera</FormLabel></div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* VALUES & DOCS */}
                        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-blue-600">Valores y Documentación</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormField control={form.control} name="valorventa" render={({ field }) => (
                                    <FormItem> <FormLabel>Valor Venta (USD)</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="valoralquiler" render={({ field }) => (
                                    <FormItem> <FormLabel>Valor Alquiler</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="expensas" render={({ field }) => (
                                    <FormItem> <FormLabel>Expensas</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> </FormItem>
                                )} />
                                <FormField control={form.control} name="impuestos" render={({ field }) => (
                                    <FormItem> <FormLabel>Impuestos</FormLabel> <FormControl><Input type="number" {...field} /></FormControl> </FormItem>
                                )} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <FormField control={form.control} name="escritura" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                        <div className="space-y-0.5"><FormLabel>Escritura</FormLabel></div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="plano" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                        <div className="space-y-0.5"><FormLabel>Planos</FormLabel></div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="finalobra" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                        <div className="space-y-0.5"><FormLabel>Final Obra</FormLabel></div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                            </div>
                            <div className="pt-4">
                                <FormField control={form.control} name="comentarios" render={({ field }) => (
                                    <FormItem> <FormLabel>Comentarios Adicionales</FormLabel> <FormControl><Input {...field} /></FormControl> </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* DYNAMIC DIMENSIONS */}
                        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-blue-600">Dimensiones de Ambientes</h3>
                                <Button type="button" onClick={() => append({ name: "", width: 0, length: 0 })} variant="ghost" className="text-blue-600 gap-2">
                                    <IoAddCircleOutline size={24} /> Agregar Ambiente
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => {
                                    // Calculate area for this specific row for display
                                    const w = watchedDimensions?.[index]?.width || 0;
                                    const l = watchedDimensions?.[index]?.length || 0;
                                    const area = (w * l).toFixed(2);

                                    return (
                                        <div key={field.id} className="flex flex-col md:flex-row gap-4 items-end bg-white p-3 rounded shadow-sm">
                                            <FormField
                                                control={form.control}
                                                name={`roomDimensions.${index}.name`}
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel className={index !== 0 ? "sr-only" : ""}>Ambiente (Nombre)</FormLabel>
                                                        <FormControl>
                                                            <div className="flex gap-2">
                                                                <Select
                                                                    onValueChange={(val) => {
                                                                        if (val !== "otro") {
                                                                            field.onChange(val);
                                                                        } else {
                                                                            field.onChange(""); // Clear for custom input
                                                                        }
                                                                    }}
                                                                    value={["Living", "Comedor", "Cocina", "Dormitorio", "Baño", "Toilette", "Lavadero", "Semicubiertos", "Balcon", "Cochera"].includes(field.value || "") ? field.value : "otro"}
                                                                >
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Tipo..." />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Living">Living</SelectItem>
                                                                        <SelectItem value="Comedor">Comedor</SelectItem>
                                                                        <SelectItem value="Cocina">Cocina</SelectItem>
                                                                        <SelectItem value="Dormitorio">Dormitorio</SelectItem>
                                                                        <SelectItem value="Baño">Baño</SelectItem>
                                                                        <SelectItem value="Toilette">Toilette</SelectItem>
                                                                        <SelectItem value="Lavadero">Lavadero</SelectItem>
                                                                        <SelectItem value="Semicubiertos">Semicubiertos</SelectItem>
                                                                        <SelectItem value="Balcon">Balcon</SelectItem>
                                                                        <SelectItem value="Cochera">Cochera</SelectItem>
                                                                        <SelectItem value="otro">Otro / Custom</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                {(!["Living", "Comedor", "Cocina", "Dormitorio", "Baño", "Toilette", "Lavadero", "Semicubiertos", "Balcon", "Cochera"].includes(field.value || "") || field.value === "") && (
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Nombre del ambiente"
                                                                        className="flex-1"
                                                                    />
                                                                )}
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`roomDimensions.${index}.width`}
                                                render={({ field }) => (
                                                    <FormItem className="w-24">
                                                        <FormLabel className={index !== 0 ? "sr-only" : ""}>Ancho (m)</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" step="0.01" {...field} value={field.value ?? ""} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`roomDimensions.${index}.length`}
                                                render={({ field }) => (
                                                    <FormItem className="w-24">
                                                        <FormLabel className={index !== 0 ? "sr-only" : ""}>Largo (m)</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" step="0.01" {...field} value={field.value ?? ""} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="w-24 pb-2 text-center text-gray-500 font-mono text-sm">
                                                {index === 0 && <span className="block mb-2 text-xs font-bold text-gray-400">Area</span>}
                                                {area} m²
                                            </div>

                                            <Button type="button" variant="ghost" size="icon" className="text-red-500 mb-0.5" onClick={() => remove(index)}>
                                                <IoTrashOutline size={20} />
                                            </Button>
                                        </div>
                                    )
                                })}
                                {fields.length === 0 && <p className="text-gray-400 italic text-center py-4">No hay ambientes cargados.</p>}
                            </div>

                            <div className="mt-4 flex justify-end items-center gap-4 text-xl font-bold text-gray-700 border-t pt-4">
                                <span>Superficie Total Estimada:</span>
                                <span className="text-blue-600">{form.watch("totalArea")} m²</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 mt-6">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Volver</Button>
                    <Button type="submit">Guardar Todo</Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default EditForm;
