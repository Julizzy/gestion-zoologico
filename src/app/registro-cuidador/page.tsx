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
import { KeeperRegistrationForm } from "@/components/ui/KeeperRegistrationForm";
import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

interface Cuidador {
  id: number;
  nombre: string;
  correo: string;
}

export default function RegistroCuidadorPage() {
  const [keepers, setKeepers] = useState<Cuidador[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  useEffect(() => {
    const fetchKeepers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://fast-tensor-435818-j0.rj.r.appspot.com/cuidador"); // Cambia la URL por tu endpoint real
        if (!response.ok) {
          throw new Error("Failed to fetch keepers");
        }
        const data = await response.json();
        setKeepers(data);
      } catch (err) {
        setError("Error fetching keepers. Please try again later.");
        console.error("Error fetching keepers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeepers();
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
                  <BreadcrumbLink
                    href="/"
                    className="text-[#638495] hover:text-[#638495]"
                  >
                    Inicio
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#5894bc]">
                    Registro de cuidador
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <main className="flex flex-col items-center justify-center min-h-screen">
              <div className="w-full max-w-4xl mt-8">
                <KeeperRegistrationForm />
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
                      <DialogTitle>Información de cuidador</DialogTitle>
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
                            <TableHead>Nombre Cuidador</TableHead>
                            <TableHead>Correo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {keepers.map((cuidador) => (
                            <TableRow key={cuidador.id}>
                              <TableCell>{cuidador.id}</TableCell>
                              <TableCell>{cuidador.nombre}</TableCell>
                              <TableCell>{cuidador.correo}</TableCell>
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
