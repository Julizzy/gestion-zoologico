"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {  FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

type WellbeingControlFormValues = {
  animalId: string;
  estadoSalud: string;
  alimentacion: string;
  observaciones: string;
  fechaControl: string; 
};


const WellbeingControlForm: React.FC = () => {
  const methods = useForm<WellbeingControlFormValues>({
    defaultValues: {
      animalId: "",
      estadoSalud: "",
      alimentacion: "",
      observaciones: "",
      fechaControl: "",
    },
  });

  const onSubmit = async (data: WellbeingControlFormValues) => {
    try {
      const response = await fetch("https://fast-tensor-435818-j0.rj.r.appspot.com/registro-medico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Registro guardado exitosamente");
      } else {
        alert("Hubo un error al guardar el registro");
      }
    } catch (error) {
      console.error("Error al guardar el registro", error);
      alert("Hubo un error al guardar el registro");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#0a2324] text-white text-center py-4">
        <h2 className="text-2xl font-bold">Control Médico de Animal</h2>
      </div>

    
      <div className="p-6">
        <FormProvider {...methods}>
          <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="animalId" className="text-[#153a3c]">ID del Animal</FormLabel>
              <FormControl>
                <input
                  id="animalId"
                  type="text"
                  placeholder="Ingrese el ID del animal"
                  {...methods.register("animalId", { required: "El ID del animal es requerido" })}
                  className="border border-[#153a3c] p-2 rounded w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="estadoSalud" className="text-[#153a3c]">Estado de Salud</FormLabel>
              <FormControl>
                <select
                  id="estadoSalud"
                  {...methods.register("estadoSalud", { required: "El estado de salud es requerido" })}
                  className="border border-[#153a3c] p-2 rounded w-full"
                >
                  <option value="">Seleccione el estado de salud</option>
                  <option value="Excelente">Excelente</option>
                  <option value="Bueno">Bueno</option>
                  <option value="Regular">Regular</option>
                  <option value="Malo">Malo</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="alimentacion" className="text-[#153a3c]">Alimentación</FormLabel>
              <FormControl>
                <textarea
                  id="alimentacion"
                  placeholder="Detalles sobre la alimentación del animal"
                  {...methods.register("alimentacion", { required: "La alimentación es requerida" })}
                  className="border border-[#153a3c] p-2 rounded w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="observaciones" className="text-[#153a3c]">Observaciones de comportamiento</FormLabel>
              <FormControl>
                <textarea
                  id="observaciones"
                  placeholder="Describa el comportamiento del animal"
                  {...methods.register("observaciones")}
                  className="border border-[#153a3c] p-2 rounded w-full"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="fechaControl" className="text-[#153a3c]">Fecha del Control</FormLabel>
              <FormControl>
                <input
                  id="fechaControl"
                  type="date"
                  {...methods.register("fechaControl", { required: "La fecha del control es requerida" })}
                  className="border border-[#153a3c] p-2 rounded w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <button type="submit" className="bg-[#0a2324] text-white p-2 rounded w-full">
              Registrar Control Médico 
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export { WellbeingControlForm };
