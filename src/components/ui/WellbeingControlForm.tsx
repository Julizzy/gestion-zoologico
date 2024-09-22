"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type WellbeingControlFormValues = {
  animalId: string;
  estadoSalud: string;
  alimentacion: string;
  observaciones: string;
  fechaControl: string; 
};

type AnimalRecord = {
  id: number;
  fecha: string;
  estado: string;
  dieta: string;
  comportamiento: string;
};

export default function Component() {
  const [animalExists, setAnimalExists] = React.useState(false);
  const [animalRecords, setAnimalRecords] = React.useState<AnimalRecord[]>([]);
  const [showRecords, setShowRecords] = React.useState(false);

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
        body: JSON.stringify({ 
          animal_id: data.animalId, 
          estado: data.estadoSalud, 
          dieta: data.alimentacion, 
          comportamiento: data.observaciones,
          fecha: data.fechaControl 
        }),
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

  const checkAnimalExists = async (id: string) => {
    try {
      const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/animales/${id}`);
      setAnimalExists(response.ok);
    } catch (error) {
      console.error("Error al verificar el animal", error);
      setAnimalExists(false);
    }
  };

  const fetchAnimalRecords = async () => {
    try {
      const animalId = methods.getValues("animalId");
      const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/registros-medicos/animales/${animalId}`);
      if (response.ok) {
        const data = await response.json();
        setAnimalRecords(data);
        setShowRecords(true);
      } else {
        console.error("Error al obtener los registros del animal");
      }
    } catch (error) {
      console.error("Error al obtener los registros del animal", error);
    }
  };

  React.useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === "animalId") {
        checkAnimalExists(value.animalId || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#0a2324] text-white text-center py-4">
        <h2 className="text-2xl font-bold">Control Médico de Animal</h2>
      </div>

      <div className="p-6">
        <FormProvider {...methods}>
          <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="animalId" className="text-black">ID del Animal</FormLabel>
              <FormControl>
                <input
                  id="animalId"
                  type="text"
                  placeholder="Ingrese el ID del animal"
                  {...methods.register("animalId", { required: "El ID del animal es requerido" })}
                  className="border border-[#153a3c] p-2 rounded w-full text-black placeholder-gray-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="estadoSalud" className="text-black">Estado de Salud</FormLabel>
              <FormControl>
                <select
                  id="estadoSalud"
                  {...methods.register("estadoSalud", { required: "El estado de salud es requerido" })}
                  className="border border-[#153a3c] p-2 rounded w-full text-black"
                >
                  <option value="" className="text-gray-500">Seleccione el estado de salud</option>
                  <option value="Excelente">Excelente</option>
                  <option value="Bueno">Bueno</option>
                  <option value="Regular">Regular</option>
                  <option value="Malo">Malo</option>
                </select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="alimentacion" className="text-black">Alimentación</FormLabel>
              <FormControl>
                <textarea
                  id="alimentacion"
                  placeholder="Detalles sobre la alimentación del animal"
                  {...methods.register("alimentacion", { required: "La alimentación es requerida" })}
                  className="border border-[#153a3c] p-2 rounded w-full text-black placeholder-gray-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="observaciones" className="text-black">Observaciones de comportamiento</FormLabel>
              <FormControl>
                <textarea
                  id="observaciones"
                  placeholder="Describa el comportamiento del animal"
                  {...methods.register("observaciones")}
                  className="border border-[#153a3c] p-2 rounded w-full text-black placeholder-gray-500"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="fechaControl" className="text-black">Fecha del Control</FormLabel>
              <FormControl>
                <input
                  id="fechaControl"
                  type="date"
                  {...methods.register("fechaControl", { required: "La fecha del control es requerida" })}
                  className="border border-[#153a3c] p-2 rounded w-full text-black"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>

            <div className="flex justify-between">
              <Button type="submit" className="bg-[#0a2324] text-white p-2 rounded hover:bg-[#153a3c] transition-colors">
                Registrar Control Médico 
              </Button>
              <Button 
                type="button" 
                onClick={fetchAnimalRecords}
                disabled={!animalExists}
                className="bg-[#0a2324] text-white p-2 rounded hover:bg-[#153a3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ver registro de animal
              </Button>
            </div>
          </form>
        </FormProvider>

        {showRecords && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-black">Registros Médicos del Animal</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Fecha</TableHead>
                  <TableHead className="text-black">Estado</TableHead>
                  <TableHead className="text-black">Dieta</TableHead>
                  <TableHead className="text-black">Comportamiento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {animalRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="text-black">{record.fecha}</TableCell>
                    <TableCell className="text-black">{record.estado}</TableCell>
                    <TableCell className="text-black">{record.dieta}</TableCell>
                    <TableCell className="text-black">{record.comportamiento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}