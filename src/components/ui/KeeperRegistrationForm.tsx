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

// Define la estructura de datos del formulario
type KeeperFormValues = {
    id: string;
    nombre: string;
    especialidad: string;
};

const KeeperRegistrationForm: React.FC = () => {
    const [action, setAction] = React.useState<"crear" | "actualizar">("crear");

    const methods = useForm<KeeperFormValues>({
        defaultValues: {
            id: "",
            nombre: "",
            especialidad: "",
        },
    });

    const { register, handleSubmit, setValue, watch, clearErrors } = methods;

    // Hook para cargar datos si se selecciona "actualizar"
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "id" && action === "actualizar") {
                const id = value.id;
                if (id) {
                    fetchKeeper(id);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, action]);

    // Función para obtener datos de un cuidador por ID
    const fetchKeeper = async (id: string) => {
        try {
            const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/keepers/${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("nombre", data.nombre);
                setValue("especialidad", data.especialidad);
            } else {
                console.error("Cuidador no encontrado");
                setValue("nombre", "");
                setValue("especialidad", "");
            }
        } catch (error) {
            console.error("Error al obtener el cuidador", error);
        }
    };

    // Función para manejar el envío del formulario
    const onSubmit = async (data: KeeperFormValues) => {
        const url = action === "crear"
            ? "https://fast-tensor-435818-j0.rj.r.appspot.com/keepers"
            : `https://fast-tensor-435818-j0.rj.r.appspot.com/keepers/${data.id}`;
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
                alert(`Cuidador ${action === "crear" ? "registrado" : "actualizado"} exitosamente`);
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                alert(`Hubo un error al ${action === "crear" ? "registrar" : "actualizar"} el cuidador: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error) {
            console.error(`Error al ${action === "crear" ? "registrar" : "actualizar"} el cuidador`, error);
            alert(`Hubo un error al ${action === "crear" ? "registrar" : "actualizar"} el cuidador`);
        }
    };

    // Función para manejar la eliminación de un cuidador
    const handleDelete = async () => {
        const id = watch("id");
        if (!id) {
            alert("Por favor, ingrese un ID para eliminar");
            return;
        }

        try {
            const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/keepers/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Cuidador eliminado exitosamente");
                methods.reset();
            } else {
                alert("Hubo un error al eliminar el cuidador");
            }
        } catch (error) {
            console.error("Error al eliminar el cuidador", error);
            alert("Hubo un error al eliminar el cuidador");
        }
    };

    // Cambiar entre las acciones "crear" y "actualizar"
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
                <h2 className="text-2xl font-bold">Registro de Cuidadores</h2>
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
                                    placeholder="Ingrese el ID del cuidador"
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
                            <FormLabel htmlFor="nombre" className="text-[#0a2324] font-semibold">Nombre del Cuidador</FormLabel>
                            <FormControl>
                                <input
                                    id="nombre"
                                    type="text"
                                    placeholder="Ingrese el nombre del cuidador"
                                    {...register("nombre", { required: "El nombre es requerido" })}
                                    className="border border-[#153a3c] p-2 rounded w-full text-[#0a2324]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        <FormItem>
                            <FormLabel htmlFor="especialidad" className="text-[#0a2324] font-semibold">Especialidad</FormLabel>
                            <FormControl>
                                <input
                                    id="especialidad"
                                    type="text"
                                    placeholder="Ingrese la especialidad del cuidador"
                                    {...register("especialidad", { required: "La especialidad es requerida" })}
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
                            Guardar Cuidador
                        </Button>

                        {action === "actualizar" && (
                            <Button type="button" onClick={handleDelete} className="bg-red-600 text-white p-2 rounded w-full mt-4">
                                Eliminar Cuidador
                            </Button>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export { KeeperRegistrationForm };
