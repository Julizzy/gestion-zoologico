
"use client";

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

export default function RegistroAnimalPage() {
  return (
    <Background>
      <div className="relative w-full h-100">
        <Header />
        <Navbar />
        <div className="max-w-3xl mx-auto py-10">
          <Breadcrumb className="ml-[-15rem]">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/"className="text-[#638495] hover:text-[#638495]">
                Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#5894bc]">
                Control de Bienestar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        <main className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-4xl mt-8">
            <AnimalRegistrationForm />
          </div>
        </main>
      </div>
      </div>
    </Background>
  );
}
