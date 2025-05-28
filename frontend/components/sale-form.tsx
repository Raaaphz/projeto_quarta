"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface Sale {
  id: number
  clienteId: number
  clienteNome: string
  carroId: number
  carroModelo: string
  preco: number
  dataVenda: string
}

interface Car {
  id: number
  modelo: string
  ano: number
  preco: number
}

interface Client {
  id: number
  nome: string
  cpf: string
  contato: string
}

interface SaleFormProps {
  onSave: (sale: Omit<Sale, "id">) => void
  onClose: () => void
}

export default function SaleForm({ onSave, onClose }: SaleFormProps) {
  const [formData, setFormData] = useState({
    clienteId: 0,
    carroId: 0,
    dataVenda: new Date().toISOString().split("T")[0],
  })

  const [cars, setCars] = useState<Car[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Simular dados de carros e clientes
  useEffect(() => {
    const mockCars: Car[] = [
      { id: 1, modelo: "Honda Civic", ano: 2023, preco: 85000 },
      { id: 2, modelo: "Toyota Corolla", ano: 2022, preco: 78000 },
      { id: 3, modelo: "Volkswagen Jetta", ano: 2023, preco: 92000 },
    ]

    const mockClients: Client[] = [
      { id: 1, nome: "João Silva", cpf: "123.456.789-00", contato: "(11) 99999-9999" },
      { id: 2, nome: "Maria Santos", cpf: "987.654.321-00", contato: "(11) 88888-8888" },
      { id: 3, nome: "Pedro Oliveira", cpf: "456.789.123-00", contato: "(11) 77777-7777" },
    ]

    setCars(mockCars)
    setClients(mockClients)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCar || !selectedClient) {
      alert("Selecione um cliente e um carro")
      return
    }

    const saleData = {
      clienteId: selectedClient.id,
      clienteNome: selectedClient.nome,
      carroId: selectedCar.id,
      carroModelo: selectedCar.modelo,
      preco: selectedCar.preco,
      dataVenda: formData.dataVenda,
    }

    try {
      // Criar nova venda
      // await fetch('/api/sales', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(saleData)
      // })

      onSave(saleData)
    } catch (error) {
      console.error("Erro ao salvar venda:", error)
    }
  }

  const handleCarSelect = (carId: string) => {
    const car = cars.find((c) => c.id === Number.parseInt(carId))
    setSelectedCar(car || null)
    setFormData({ ...formData, carroId: Number.parseInt(carId) })
  }

  const handleClientSelect = (clientId: string) => {
    const client = clients.find((c) => c.id === Number.parseInt(clientId))
    setSelectedClient(client || null)
    setFormData({ ...formData, clienteId: Number.parseInt(clientId) })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card-elevated border-border shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">Nova Venda</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-primary hover:bg-button-muted hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-foreground">Cliente</Label>
              <Select onValueChange={handleClientSelect}>
                <SelectTrigger className="bg-card-deep border-border text-foreground">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent className="bg-card-elevated border-border">
                  {clients.map((client) => (
                    <SelectItem
                      key={client.id}
                      value={client.id.toString()}
                      className="text-foreground hover:bg-card-deep"
                    >
                      {client.nome} - {client.cpf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-foreground">Carro</Label>
              <Select onValueChange={handleCarSelect}>
                <SelectTrigger className="bg-card-deep border-border text-foreground">
                  <SelectValue placeholder="Selecione um carro" />
                </SelectTrigger>
                <SelectContent className="bg-card-elevated border-border">
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.id.toString()} className="text-foreground hover:bg-card-deep">
                      {car.modelo} {car.ano} - R$ {car.preco.toLocaleString("pt-BR")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCar && (
              <div className="p-3 bg-card-deep rounded-lg border border-border">
                <p className="text-primary font-medium">Preço: R$ {selectedCar.preco.toLocaleString("pt-BR")}</p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!selectedCar || !selectedClient}
              >
                Registrar Venda
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-button-secondary text-foreground hover:bg-button-muted transition-colors"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
