"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface Car {
  id: number
  modelo: string
  ano: number
  preco: number
}

interface CarFormProps {
  car?: Car | null
  onSave: (car: Omit<Car, "id">) => void
  onClose: () => void
}

export default function CarForm({ car, onSave, onClose }: CarFormProps) {
  const [formData, setFormData] = useState({
    modelo: "",
    ano: new Date().getFullYear(),
    preco: 0,
  })

  useEffect(() => {
    if (car) {
      setFormData({
        modelo: car.modelo,
        ano: car.ano,
        preco: car.preco,
      })
    }
  }, [car])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (car) {
        // Editar carro existente
        // await fetch(`/api/cars/${car.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
      } else {
        // Criar novo carro
        // await fetch('/api/cars', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
      }

      onSave(formData)
    } catch (error) {
      console.error("Erro ao salvar carro:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card-elevated border-border shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">{car ? "Editar Carro" : "Novo Carro"}</CardTitle>
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
              <Label htmlFor="modelo" className="text-foreground">
                Modelo
              </Label>
              <Input
                id="modelo"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                className="bg-card-deep border-border text-foreground"
                required
              />
            </div>

            <div>
              <Label htmlFor="ano" className="text-foreground">
                Ano
              </Label>
              <Input
                id="ano"
                type="number"
                min="1900"
                max="2030"
                value={formData.ano}
                onChange={(e) => setFormData({ ...formData, ano: Number.parseInt(e.target.value) })}
                className="bg-card-deep border-border text-foreground"
                required
              />
            </div>

            <div>
              <Label htmlFor="preco" className="text-foreground">
                Preço (R$)
              </Label>
              <Input
                id="preco"
                type="number"
                min="0"
                step="0.01"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: Number.parseFloat(e.target.value) })}
                className="bg-card-deep border-border text-foreground"
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                {car ? "Atualizar" : "Cadastrar"}
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
