"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type EspecieFormValues = {
    id: string;
    nombre: string;
};

const EspecieRegistrationForm = () => {
    const [action, setAction] = React.useState<"crear" | "actualizar">("crear");

    const methods = useForm<EspecieFormValues>({
        defaultValues: {
            id: "",
            nombre: "",
        },
    });

    const { register, handleSubmit, setValue, watch, clearErrors } = methods;

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "id" && action === "actualizar") {
                const id = value.id;
                if (id) {
                    fetchEspecie(id);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, action]);

    const fetchEspecie = async (id: string) => {
        try {
            const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/especies/${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("nombre", data.nombre);
            } else {
                console.error("Especie no encontrada");
                setValue("nombre", "");
            }
        } catch (error) {
            console.error("Error al obtener la especie", error);
        }
    };

    const onSubmit = async (data: EspecieFormValues) => {
        const url = action === "crear"
            ? "https://fast-tensor-435818-j0.rj.r.appspot.com/especies"
            : `https://fast-tensor-435818-j0.rj.r.appspot.com/especies/${data.id}`;
        const method = action === "crear" ? "POST" : "PUT";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert(`Especie ${action === "crear" ? "registrada" : "actualizada"} exitosamente`);
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                alert(`Hubo un error al ${action === "crear" ? "registrar" : "actualizar"} la especie: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error) {
            console.error(`Error al ${action === "crear" ? "registrar" : "actualizar"} la especie`, error);
            alert(`Hubo un error al ${action === "crear" ? "registrar" : "actualizar"} la especie`);
        }
    };

    const handleDelete = async () => {
        const id = watch("id");
        if (!id) {
            alert("Por favor, ingrese un ID para eliminar");
            return;
        }

        try {
            const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/especies/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Especie eliminada exitosamente");
                methods.reset();
            } else {
                alert("Hubo un error al eliminar la especie");
            }
        } catch (error) {
            console.error("Error al eliminar la especie", error);
            alert("Hubo un error al eliminar la especie");
        }
    };

    const handleActionChange = (value: "crear" | "actualizar") => {
        setAction(value);
        if (value === "crear") {
            setValue("id", "");
            clearErrors("id");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-[#0a2324] text-white text-center py-4">
                <h2 className="text-2xl font-bold">Registro de Especies</h2>
            </div>

            <div className="p-6">
                <Form {...methods}>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <FormItem>
                            <FormLabel htmlFor="id" className="text-[#0a2324] font-semibold">ID</FormLabel>
                            <FormControl>
                                <input
                                    id="id"
                                    type="text"
                                    placeholder="Ingrese el ID de la especie"
                                    {...register("id", {
                                        required: action === "actualizar" ? "El id es requerido" : false,
                                    })}
                                    disabled={action === "crear"}
                                    className="border border-[#153a3c] p-2 rounded w-full text-[#0a2324]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        <FormItem>
                            <FormLabel htmlFor="nombre" className="text-[#0a2324] font-semibold">Nombre de la Especie</FormLabel>
                            <FormControl>
                                <input
                                    id="nombre"
                                    type="text"
                                    placeholder="Ingrese el nombre de la especie"
                                    {...register("nombre", { required: "El nombre es requerido" })}
                                    className="border border-[#153a3c] p-2 rounded w-full text-[#0a2324]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        <RadioGroup
                            defaultValue="crear"
                            onValueChange={handleActionChange}
                            className="flex space-x-4 mb-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="crear" id="crear" />
                                <Label htmlFor="crear" className="text-[#0a2324] font-semibold">Crear</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="actualizar" id="actualizar" />
                                <Label htmlFor="actualizar" className="text-[#0a2324] font-semibold">Actualizar</Label>
                            </div>
                        </RadioGroup>

                        <Button type="submit" className="bg-[#0a2324] text-white p-2 rounded w-full mt-4">
                            Guardar Especie
                        </Button>

                        {action === "actualizar" && (
                            <Button type="button" onClick={handleDelete} className="bg-red-600 text-white p-2 rounded w-full mt-4">
                                Eliminar Especie
                            </Button>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export { EspecieRegistrationForm };
