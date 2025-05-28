"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import CarForm from "@/components/car-form"

interface Car {
  id: number
  modelo: string
  ano: number
  preco: number
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)

  // Simular dados iniciais - será substituído por chamada à API
  useEffect(() => {
    const mockCars: Car[] = [
      { id: 1, modelo: "Honda Civic", ano: 2023, preco: 85000 },
      { id: 2, modelo: "Toyota Corolla", ano: 2022, preco: 78000 },
      { id: 3, modelo: "Volkswagen Jetta", ano: 2023, preco: 92000 },
    ]
    setCars(mockCars)
    setFilteredCars(mockCars)
  }, [])

  // Filtrar carros baseado na busca
  useEffect(() => {
    const filtered = cars.filter(
      (car) =>
        car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.ano.toString().includes(searchTerm) ||
        car.preco.toString().includes(searchTerm),
    )
    setFilteredCars(filtered)
  }, [cars, searchTerm])

  // Função para buscar carros da API
  const fetchCars = async () => {
    try {
      // const response = await fetch('/api/cars')
      // const data = await response.json()
      // setCars(data)
    } catch (error) {
      console.error("Erro ao buscar carros:", error)
    }
  }

  // Função para deletar carro
  const deleteCar = async (id: number) => {
    try {
      // await fetch(`/api/cars/${id}`, { method: 'DELETE' })
      setCars(cars.filter((car) => car.id !== id))
    } catch (error) {
      console.error("Erro ao deletar carro:", error)
    }
  }

  const handleEdit = (car: Car) => {
    setEditingCar(car)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCar(null)
  }

  const handleSaveCar = (carData: Omit<Car, "id">) => {
    if (editingCar) {
      // Editar carro existente
      setCars(cars.map((car) => (car.id === editingCar.id ? { ...carData, id: editingCar.id } : car)))
    } else {
      // Adicionar novo carro
      const newCar = {
        ...carData,
        id: Math.max(...cars.map((c) => c.id), 0) + 1,
      }
      setCars([...cars, newCar])
    }
    handleCloseForm()
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Gerenciar Carros</h2>
          <p className="text-muted-foreground">Cadastre e gerencie o estoque de veículos</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Carro
        </Button>
      </div>

      {/* Filtros */}
      <Card className="bg-card-elevated border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                placeholder="Buscar por modelo, ano ou preço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card-deep border-border text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Carros */}
      <Card className="bg-card-elevated border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Lista de Carros ({filteredCars.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Modelo</TableHead>
                <TableHead className="text-muted-foreground">Ano</TableHead>
                <TableHead className="text-muted-foreground">Preço</TableHead>
                <TableHead className="text-muted-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow key={car.id} className="border-border hover:bg-card-deep transition-colors">
                  <TableCell className="text-foreground">{car.id}</TableCell>
                  <TableCell className="text-foreground font-medium">{car.modelo}</TableCell>
                  <TableCell className="text-foreground">{car.ano}</TableCell>
                  <TableCell className="text-primary font-medium">R$ {car.preco.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-button-secondary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleEdit(car)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-button-secondary text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => deleteCar(car.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal do Formulário */}
      {showForm && <CarForm car={editingCar} onSave={handleSaveCar} onClose={handleCloseForm} />}
    </div>
  )
}
