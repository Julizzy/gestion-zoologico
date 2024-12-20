"use client";

import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Background from "@/components/ui/Background";
import Navbar from "@/components/ui/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
  } from "@/components/ui/breadcrumb";
import { EspecieRegistrationForm } from "@/components/ui/EspecieRegistrationForm";
import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

interface Especie {
  id: number;
  nombre: string;
}

export default function RegistroEspeciePage() {
  const [species, setSpecies] = useState<Especie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);
  useEffect(() => {
    const fetchSpecies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fast-tensor-435818-j0.rj.r.appspot.com/especies'); // Cambia la URL por tu endpoint real
        if (!response.ok) {
          throw new Error('Failed to fetch species');
        }
        const data = await response.json();
        setSpecies(data);
      } catch (err) {
        setError('Error fetching species. Please try again later.');
        console.error('Error fetching species:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  return (
    <Background>
      <div className="relative w-full h-100">
        <Header />
        <Navbar />
        <div className="max-w-3xl mx-auto py-10">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb className="ml-[-15rem]">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/"className="text-[#638495] hover:text-[#638495]">
                Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#5894bc]">
                Registro de especies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <main className="flex flex-col items-center justify-center min-h-screen">
           <div className="w-full max-w-4xl mt-8">
              <EspecieRegistrationForm />
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
                    <DialogTitle>Información de especies</DialogTitle>
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
                          <TableHead>Nombre Especie</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {species.map((especie) => (
                          <TableRow key={especie.id}>
                            <TableCell>{especie.id}</TableCell>
                            <TableCell>{especie.nombre}</TableCell>
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
      </div>
    </Background>
  );
}
