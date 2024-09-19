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

type AnimalFormValues = {
  nombre: string;
  especieId: string; // Cambiamos especie a especieId para el ID
  edad: number;
};

const AnimalRegistrationForm = () => {
  const [species, setSpecies] = React.useState<{ id: string; nombre: string }[]>([]); // Guarda la lista de especies

  const methods = useForm<AnimalFormValues>({
    defaultValues: {
      nombre: "",
      especieId: "", // Especie será el ID
      edad: 0,
    },
  });

  // Obtener los IDs de las especies al cargar el componente
  React.useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch("http://localhost:8080/especies"); // URL donde obtienes la lista de especies
        const data = await response.json();
        setSpecies(data); // Guarda las especies en el estado
      } catch (error) {
        console.error("Error al obtener las especies", error);
      }
    };

    fetchSpecies();
  }, []);

  const onSubmit = async (data: AnimalFormValues) => {
    try {
      const response = await fetch("http://localhost:8080/animal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Animal registrado exitosamente");
      } else {
        alert("Hubo un error al registrar el animal");
      }
    } catch (error) {
      console.error("Error al registrar el animal", error);
      alert("Hubo un error al registrar el animal");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Cabecera */}
      <div className="bg-[#0a2324] text-white text-center py-4">
        <h2 className="text-2xl font-bold">Registro de Animales</h2>
      </div>

      {/* Contenido */}
      <div className="p-6">
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
              <FormLabel htmlFor="especieId" className="text-[#153a3c]">
                Especie
              </FormLabel>
              <FormControl>
                <select
                  id="especieId"
                  {...methods.register("especieId", {
                    required: "La especie es requerida",
                  })}
                  className="border border-[#153a3c] p-2 rounded w-full"
                >
                  <option value="">Seleccione una especie</option>
                  {species.map((especie) => (
                    <option key={especie.id} value={especie.id}>
                      {especie.nombre} (ID: {especie.id})
                    </option>
                  ))}
                </select>
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
