"use client";
import React, { useEffect, useState } from "react";
import FutureReviewPanelForm from "@/components/ui/FutureReviewPanelForm";
import Header from "@/components/ui/Header";
import Background from "@/components/ui/Background";
import Navbar from "@/components/ui/Navbar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export type WellbeingControlFormValues = {
  animalId: string;
  estadoSalud: string;
  alimentacion: string;
  observaciones: string;
  fechaControl: string; 
};

const FutureReviewPanelPage = () => {
  const [forms, setForms] = useState<WellbeingControlFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const formattedYearMonth = `${year}-${month}`;

    const fetchAnimalsToCheck = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/registros-medicos/animales/revision-pendiente-mes`); 
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        setForms(data);
      } catch (err) {
        setError('Error fetching animals. Please try again later.');
        console.error('Error fetching animals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimalsToCheck();
  }, []);
  
  return (
    <Background>
      <div className="relative w-full h-100"></div>
      <Header />
      <Navbar />
      <div className="container mx-auto p-10">
        <div className="max-w-3xl mx-auto">
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
                  Panel de Revisiones
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="bg-gradient-to-r from-[#285255] to-[#1e3c3f] text-lg mb-5 text-center text-[#d5d897] p-3 rounded-lg shadow-lg border border-[#3a6f70]">
            Monitorea qué animales faltan por hacer control este mes.
          </p>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <FutureReviewPanelForm forms={forms} />
          )}
        </div>
      </div>
    </Background>
  );
};

export default FutureReviewPanelPage;