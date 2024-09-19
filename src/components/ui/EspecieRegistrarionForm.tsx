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

type EspecieFormValues = {
  nombre: string;
};

const EspecieRegistrationForm = () => {
  const methods = useForm<EspecieFormValues>({
    defaultValues: {
      nombre: "",
    },
  });

 
  const onSubmit = async (data: EspecieFormValues) => {
    try {
     
      const response = await fetch("https://fast-tensor-435818-j0.rj.r.appspot.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      
      if (response.ok) {
        alert("Especie registrada exitosamente");
      } else {
       
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
     
      <div className="bg-[#0a2324] text-white text-center py-4">
        <h2 className="text-2xl font-bold">Registrar Especie</h2>
      </div>

     
      <div className="p-6">
        
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
