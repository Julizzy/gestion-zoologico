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

type AnimalFormValues = {
  id: string;
  especie: string;
  nombre: string;
  edad: number;
};

const AnimalRegistrationForm = () => {
  const [action, setAction] = React.useState<"crear" | "actualizar">("crear");
  const [species, setSpecies] = React.useState<{ id: string; nombre: string }[]>([]);

  const methods = useForm<AnimalFormValues>({
    defaultValues: {
      id: "",
      especie: "",
      nombre: "",
      edad: 0,
    },
  });

  const { register, handleSubmit, setValue, watch } = methods;

  React.useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch("https://fast-tensor-435818-j0.rj.r.appspot.com/");
        const data = await response.json();
        setSpecies(data);
      } catch (error) {
        console.error("Error al obtener las especies", error);
      }
    };

    fetchSpecies();
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'id' && action === 'actualizar') {
        const id = value.id;
        if (id) {
          fetchAnimal(id);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, action]);

  const fetchAnimal = async (id: string) => {
    try {
      const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/animal/${id}`);
      if (response.ok) {
        const data = await response.json();
        setValue('especie', data.especie);
        setValue('nombre', data.nombre);
        setValue('edad', data.edad);
      } else {
        console.error('Animal not found');
      }
    } catch (error) {
      console.error('Error fetching animal', error);
    }
  };

  const onSubmit = async (data: AnimalFormValues) => {
    const url = action === "crear"
      ? "https://fast-tensor-435818-j0.rj.r.appspot.com/animal"
      : `https://fast-tensor-435818-j0.rj.r.appspot.com/animal/${data.id}`;
    const method = action === "crear" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(`Animal ${action === "crear" ? "registrado" : "actualizado"} exitosamente`);
      } else {
        alert(`Hubo un error al ${action === "crear" ? "registrar" : "actualizar"} el animal`);
      }
    } catch (error) {
      console.error(`Error al ${action === "crear" ? "registrar" : "actualizar"} el animal`, error);
      alert(`Hubo un error al ${action === "crear" ? "registrar" : "actualizar"} el animal`);
    }
  };

  const handleDelete = async () => {
    const id = watch('id');
    if (!id) {
      alert('Por favor, ingrese un ID para eliminar');
      return;
    }

    try {
      const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/animal/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Animal eliminado exitosamente');
        methods.reset();
      } else {
        alert('Hubo un error al eliminar el animal');
      }
    } catch (error) {
      console.error('Error al eliminar el animal', error);
      alert('Hubo un error al eliminar el animal');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#0a2324] text-white text-center py-4">
        <h2 className="text-2xl font-bold">Registro de Animales</h2>
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
                  placeholder="Ingrese el ID del animal"
                  {...register("id", { required: "El id es requerido" })}
                  disabled={action === "crear"}
                  className="border border-[#153a3c] p-2 rounded w-full text-[#0a2324]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="especie" className="text-[#0a2324] font-semibold">Especie</FormLabel>
              <FormControl>
                <select
                  id="especie"
                  {...register("especie", { required: "La especie es requerida" })}
                  className="border border-[#153a3c] p-2 rounded w-full text-[#0a2324]"
                >
                  <option value="">Seleccione una especie</option>
                  {species.map((especie) => (
                    <option key={especie.id} value={especie.id}>
                      {especie.nombre}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="nombre" className="text-[#0a2324] font-semibold">Nombre del Animal</FormLabel>
              <FormControl>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese el nombre del animal"
                  {...register("nombre", { required: "El nombre es requerido" })}
                  className="border border-[#153a3c] p-2 rounded w-full text-[#0a2324]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="edad" className="text-[#0a2324] font-semibold">Edad</FormLabel>
              <FormControl>
                <input
                  id="edad"
                  type="number"
                  placeholder="Ingrese la edad del animal"
                  {...register("edad", {
                    required: "La edad es requerida",
                    valueAsNumber: true,
                  })}
                  className="border border-[#153a3c] p-2 rounded w-full text-[#0a2324]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <RadioGroup 
              defaultValue="crear" 
              onValueChange={(value) => setAction(value as "crear" | "actualizar")} 
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
              Guardar Animal
            </Button>

            {action === "actualizar" && (
              <Button type="button" onClick={handleDelete} className="bg-red-600 text-white p-2 rounded w-full mt-4">
                Eliminar Animal
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export { AnimalRegistrationForm };