"use client";

import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Background from "@/components/ui/Background";
import Navbar from "@/components/ui/Navbar";
import { AnimalRegistrationForm } from "@/components/ui/AnimalRegistrationForm";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Animal {
  id: number;
  especie: {
    nombre: string;
  };
  nombre: string;
  edad: number;
}

export default function RegistroAnimalPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  useEffect(() => {
    const fetchAnimals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fast-tensor-435818-j0.rj.r.appspot.com/animales'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        setAnimals(data);
      } catch (err) {
        setError('Error fetching animals. Please try again later.');
        console.error('Error fetching animals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <Background>
      <div className="relative w-full h-100">
        <Header />
        <Navbar />
        <div className="max-w-3xl mx-auto py-10">
          <Breadcrumb className="ml-[-15rem]">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#638495] hover:text-[#638495]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#5894bc]">
                 Registro de animales
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl mt-8">
              <AnimalRegistrationForm />
            </div>
            <div className="mt-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full py-3 bg-[#638495] text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                    onClick={toggleDialog}
                  >
                    Mostrar información
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Información del Animal</DialogTitle>
                  </DialogHeader>
                  {isLoading ? (
                    <p>Cargando...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Especie</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Edad</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {animals.map((animal) => (
                          <TableRow key={animal.id}>
                            <TableCell>{animal.id}</TableCell>
                            <TableCell>{animal.especie.nombre}</TableCell>
                            <TableCell>{animal.nombre}</TableCell>
                            <TableCell>{animal.edad}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </main>
        </div>
      </div>
    </Background>
  );
}