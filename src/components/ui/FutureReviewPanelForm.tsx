'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Animal {
  animalID: string
  Especie: string
  Nombre: string
}

export default function FutureReviewPanelForm() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        
        const idsResponse = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/registros-medicos/animales/revision-pendiente-mes`)
        if (!idsResponse.ok) throw new Error('Failed to fetch animal IDs')
        const ids: string[] = await idsResponse.json()

        
        const animalDetails = await Promise.all(
          ids.map(async (id) => {
            const detailResponse = await fetch(`https://fast-tensor-435818-j0.rj.r.appspot.com/animales/${id}`)
            if (!detailResponse.ok) throw new Error(`Failed to fetch details for animal ${id}`)
            const detail = await detailResponse.json()
            return {
              animalID: id,
              Especie: detail.especie.nombre,
              Nombre: detail.nombre
            }
          })
        )

        setAnimals(animalDetails)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setLoading(false)
      }
    }

    fetchAnimals()
  }, [])

  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>

  return (
    <Card className="border-0 w-full">
      <CardHeader  className="bg-[#0a2324] text-white text-center py-4">
        <CardTitle className= "text-2xl font-bold">Animales Pendientes de Revisión</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Animal ID</TableHead>
              <TableHead>Especie</TableHead>
              <TableHead>Nombre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animals.map((animal) => (
              <TableRow key={animal.animalID}>
                <TableCell>{animal.animalID}</TableCell>
                <TableCell>{animal.Especie}</TableCell>
                <TableCell>{animal.Nombre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}