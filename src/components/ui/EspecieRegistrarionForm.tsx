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

// Define el tipo de datos del formulario
type EspecieFormValues = {
  nombre: string;
};

const EspecieRegistrationForm = () => {
  const methods = useForm<EspecieFormValues>({
    defaultValues: {
      nombre: "",
    },
  });

  // Método que se ejecuta cuando el formulario es enviado
  const onSubmit = async (data: EspecieFormValues) => {
    try {
      // Hacemos la solicitud POST directamente desde el componente
      const response = await fetch("http://localhost:8080/especie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Enviar el cuerpo como un string JSON
      });

      // Verificar si la respuesta es correcta
      if (response.ok) {
        alert("Especie registrada exitosamente");
      } else {
        // Manejar errores de respuesta
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Hubo un problema al registrar la especie"}`);
      }
    } catch (error) {
      console.error("Error al registrar la especie", error);
      alert("Hubo un error al registrar la especie");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Cabecera de la Card */}
      <div className="bg-[#0a2324] text-white text-center py-4">
        <h2 className="text-2xl font-bold">Registrar Especie</h2>
      </div>

      {/* Contenido de la Card */}
      <div className="p-6">
        {/* Llamamos al `handleSubmit` del hook de formulario para manejar el envío */}
        <Form {...methods}>
          <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="nombre" className="text-[#153a3c]">
                Nombre de la Especie
              </FormLabel>
              <FormControl>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese el nombre de la especie"
                  {...methods.register("nombre", {
                    required: "El nombre es requerido",
                  })}
                  className="border border-[#153a3c] p-2 rounded w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <button
              type="submit"
              className="bg-[#0a2324] text-white p-2 rounded w-full"
            >
              Registrar Especie
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { EspecieRegistrationForm };
