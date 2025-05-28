"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import ClientForm from "@/components/client-form"

interface Client {
  id: number
  nome: string
  cpf: string
  contato: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  // Simular dados iniciais
  useEffect(() => {
    const mockClients: Client[] = [
      { id: 1, nome: "João Silva", cpf: "123.456.789-00", contato: "(11) 99999-9999" },
      { id: 2, nome: "Maria Santos", cpf: "987.654.321-00", contato: "(11) 88888-8888" },
      { id: 3, nome: "Pedro Oliveira", cpf: "456.789.123-00", contato: "(11) 77777-7777" },
    ]
    setClients(mockClients)
    setFilteredClients(mockClients)
  }, [])

  // Filtrar clientes
  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.cpf.includes(searchTerm) ||
        client.contato.includes(searchTerm),
    )
    setFilteredClients(filtered)
  }, [clients, searchTerm])

  // Função para buscar clientes da API
  const fetchClients = async () => {
    try {
      // const response = await fetch('/api/clients')
      // const data = await response.json()
      // setClients(data)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
    }
  }

  // Função para deletar cliente
  const deleteClient = async (id: number) => {
    try {
      // await fetch(`/api/clients/${id}`, { method: 'DELETE' })
      setClients(clients.filter((client) => client.id !== id))
    } catch (error) {
      console.error("Erro ao deletar cliente:", error)
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingClient(null)
  }

  const handleSaveClient = (clientData: Omit<Client, "id">) => {
    if (editingClient) {
      setClients(
        clients.map((client) => (client.id === editingClient.id ? { ...clientData, id: editingClient.id } : client)),
      )
    } else {
      const newClient = {
        ...clientData,
        id: Math.max(...clients.map((c) => c.id), 0) + 1,
      }
      setClients([...clients, newClient])
    }
    handleCloseForm()
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Gerenciar Clientes</h2>
          <p className="text-muted-foreground">Cadastre e gerencie seus clientes</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
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
                placeholder="Buscar por nome, CPF ou contato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card-deep border-border text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Clientes */}
      <Card className="bg-card-elevated border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Lista de Clientes ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Nome</TableHead>
                <TableHead className="text-muted-foreground">CPF</TableHead>
                <TableHead className="text-muted-foreground">Contato</TableHead>
                <TableHead className="text-muted-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="border-border hover:bg-card-deep transition-colors">
                  <TableCell className="text-foreground">{client.id}</TableCell>
                  <TableCell className="text-foreground font-medium">{client.nome}</TableCell>
                  <TableCell className="text-foreground">{client.cpf}</TableCell>
                  <TableCell className="text-primary">{client.contato}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-button-secondary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleEdit(client)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-button-secondary text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => deleteClient(client.id)}
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
      {showForm && <ClientForm client={editingClient} onSave={handleSaveClient} onClose={handleCloseForm} />}
    </div>
  )
}
