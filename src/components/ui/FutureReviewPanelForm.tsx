"use client";

import * as React from "react";
import { useEffect, useState } from "react";


type Animal = {
  id: number;
  nombre: string;
  ultimaRevision: string;
};


const animales: Animal[] = [
  { id: 1, nombre: "León", ultimaRevision: "2024-08-15" },
  { id: 2, nombre: "Elefante", ultimaRevision: "2024-09-05" },
  { id: 3, nombre: "Tigre", ultimaRevision: "2024-08-20" },
  { id: 4, nombre: "Jirafa", ultimaRevision: "2024-09-01" },
];


const esRevisionPendiente = (ultimaRevision: string) => {
  const fechaRevision = new Date(ultimaRevision);
  const fechaActual = new Date();

  
  return (
    fechaRevision.getFullYear() !== fechaActual.getFullYear() ||
    fechaRevision.getMonth() !== fechaActual.getMonth()
  );
};


const FutureReviewPanelForm: React.FC = () => {
  const [pendientes, setPendientes] = useState<Animal[]>([]);

  useEffect(() => {
    
    const animalesPendientes = animales.filter((animal) =>
      esRevisionPendiente(animal.ultimaRevision)
    );
    setPendientes(animalesPendientes);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#0a2324] text-white text-center py-4">
        <h2 className="text-2xl font-bold">Animales Pendientes de Revisión</h2>
      </div>

     
      <div className="p-6">
        {pendientes.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-[#153a3c]">ID</th>
                <th className="px-4 py-2 text-left text-[#153a3c]">Especie</th>
                <th className="px-4 py-2 text-left text-[#153a3c]">Nombre</th>
                <th className="px-4 py-2 text-left text-[#153a3c]">Última Revisión</th>
              </tr>
            </thead>
            <tbody>
              {pendientes.map((animal) => (
                <tr key={animal.id}>
                  <td className="border px-4 py-2">{animal.id}</td>
                  <td className="border px-4 py-2">{animal.nombre}</td>
                  <td className="border px-4 py-2">{animal.ultimaRevision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-[#153a3c]">
            Todos los animales han sido revisados este mes.
          </p>
        )}
      </div>
    </div>
  );
};

export { FutureReviewPanelForm };
