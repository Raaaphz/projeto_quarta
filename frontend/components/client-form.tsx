"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface Client {
  id: number
  nome: string
  cpf: string
  contato: string
}

interface ClientFormProps {
  client?: Client | null
  onSave: (client: Omit<Client, "id">) => void
  onClose: () => void
}

export default function ClientForm({ client, onSave, onClose }: ClientFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    contato: "",
  })

  useEffect(() => {
    if (client) {
      setFormData({
        nome: client.nome,
        cpf: client.cpf,
        contato: client.contato,
      })
    }
  }, [client])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (client) {
        // Editar cliente existente
        // await fetch(`/api/clients/${client.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
      } else {
        // Criar novo cliente
        // await fetch('/api/clients', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
      }

      onSave(formData)
    } catch (error) {
      console.error("Erro ao salvar cliente:", error)
    }
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card-elevated border-border shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">{client ? "Editar Cliente" : "Novo Cliente"}</CardTitle>
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
              <Label htmlFor="nome" className="text-foreground">
                Nome Completo
              </Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="bg-card-deep border-border text-foreground"
                required
              />
            </div>

            <div>
              <Label htmlFor="cpf" className="text-foreground">
                CPF
              </Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                className="bg-card-deep border-border text-foreground"
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>

            <div>
              <Label htmlFor="contato" className="text-foreground">
                Contato
              </Label>
              <Input
                id="contato"
                value={formData.contato}
                onChange={(e) => setFormData({ ...formData, contato: formatPhone(e.target.value) })}
                className="bg-card-deep border-border text-foreground"
                placeholder="(00) 00000-0000"
                maxLength={15}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                {client ? "Atualizar" : "Cadastrar"}
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
