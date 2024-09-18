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
import { createAnimal } from "@/services/apiService"; // Importamos el servicio de API para crear un animal

// Define el tipo de datos del formulario
type AnimalFormValues = {
  nombre: string;
  especie: string;
  edad: number;
  dieta: string;
  comportamiento: string;
  fechaRegistro: string;
};

const AnimalRegistrationForm = () => {
  const methods = useForm<AnimalFormValues>({
    defaultValues: {
      nombre: "",
      especie: "",
      edad: 0,
      dieta: "",
      comportamiento: "",
      fechaRegistro: "",
    },
  });

  // Método que se ejecuta cuando el formulario es enviado
  const onSubmit = async (data: AnimalFormValues) => {
    try {
      // Llamamos a la función `createAnimal` para enviar los datos al backend
      const response = await createAnimal(data);
      console.log("Animal registrado exitosamente", response);
      alert("Animal registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar el animal", error);
      alert("Hubo un error al registrar el animal");
    }
  };

  return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Cabecera de la Card */}
        <div className="bg-[#0a2324] text-white text-center py-4">
          <h2 className="text-2xl font-bold">Registro de Animales</h2>
        </div>

        {/* Contenido de la Card */}
        <div className="p-6">
          {/* Llamamos al `handleSubmit` del hook de formulario para manejar el envío */}
          <Form {...methods}>
            <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
              <FormItem>
                <FormLabel htmlFor="nombre" className="text-[#153a3c]">
                  Nombre del Animal
                </FormLabel>
                <FormControl>
                  <input
                      id="nombre"
                      type="text"
                      placeholder="Ingrese el nombre del animal"
                      {...methods.register("nombre", {
                        required: "El nombre es requerido",
                      })}
                      className="border border-[#153a3c] p-2 rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="especie" className="text-[#153a3c]">
                  Especie
                </FormLabel>
                <FormControl>
                  <input
                      id="especie"
                      type="text"
                      placeholder="Ingrese la especie del animal"
                      {...methods.register("especie", {
                        required: "La especie es requerida",
                      })}
                      className="border border-[#153a3c] p-2 rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="edad" className="text-[#153a3c]">
                  Edad
                </FormLabel>
                <FormControl>
                  <input
                      id="edad"
                      type="number"
                      placeholder="Ingrese la edad del animal"
                      {...methods.register("edad", {
                        required: "La edad es requerida",
                        valueAsNumber: true,
                      })}
                      className="border border-[#153a3c] p-2 rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Puedes agregar más campos según sea necesario */}

              <button
                  type="submit"
                  className="bg-[#0a2324] text-white p-2 rounded w-full"
              >
                Registrar Animal
              </button>
            </form>
          </Form>
        </div>
      </div>
  );
};

export { AnimalRegistrationForm };
