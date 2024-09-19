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

interface Especie {
  id: number;
  nombre: string;
}

export default function RegistroEspeciePage() {
  const [species, setSpecies] = useState<Especie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Registrar Especie</h1>
            {isLoading ? (
              <p>Cargando...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
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
          </main>
        </div>
      </div>
    </Background>
  );
}
