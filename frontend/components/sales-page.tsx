"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import SaleForm from "@/components/sale-form"

interface Sale {
  id: number
  clienteId: number
  clienteNome: string
  carroId: number
  carroModelo: string
  preco: number
  dataVenda: string
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [filteredSales, setFilteredSales] = useState<Sale[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  // Simular dados iniciais
  useEffect(() => {
    const mockSales: Sale[] = [
      {
        id: 1,
        clienteId: 1,
        clienteNome: "João Silva",
        carroId: 1,
        carroModelo: "Honda Civic",
        preco: 85000,
        dataVenda: "2024-01-15",
      },
      {
        id: 2,
        clienteId: 2,
        clienteNome: "Maria Santos",
        carroId: 2,
        carroModelo: "Toyota Corolla",
        preco: 78000,
        dataVenda: "2024-01-20",
      },
    ]
    setSales(mockSales)
    setFilteredSales(mockSales)
  }, [])

  // Filtrar vendas
  useEffect(() => {
    const filtered = sales.filter(
      (sale) =>
        sale.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.carroModelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.preco.toString().includes(searchTerm) ||
        sale.dataVenda.includes(searchTerm),
    )
    setFilteredSales(filtered)
  }, [sales, searchTerm])

  // Função para buscar vendas da API
  const fetchSales = async () => {
    try {
      // const response = await fetch('/api/sales')
      // const data = await response.json()
      // setSales(data)
    } catch (error) {
      console.error("Erro ao buscar vendas:", error)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleSaveSale = (saleData: Omit<Sale, "id">) => {
    const newSale = {
      ...saleData,
      id: Math.max(...sales.map((s) => s.id), 0) + 1,
    }
    setSales([...sales, newSale])
    handleCloseForm()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Gerenciar Vendas</h2>
          <p className="text-muted-foreground">Registre e acompanhe as vendas realizadas</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Venda
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-card-elevated border-border shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-primary">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{sales.length}</div>
            <p className="text-sm text-muted-foreground">Vendas realizadas</p>
          </CardContent>
        </Card>

        <Card className="bg-card-elevated border-border shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-primary">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {sales.reduce((total, sale) => total + sale.preco, 0).toLocaleString("pt-BR")}
            </div>
            <p className="text-sm text-muted-foreground">Valor total vendido</p>
          </CardContent>
        </Card>

        <Card className="bg-card-elevated border-border shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-primary">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R${" "}
              {sales.length > 0
                ? Math.round(sales.reduce((total, sale) => total + sale.preco, 0) / sales.length).toLocaleString(
                    "pt-BR",
                  )
                : "0"}
            </div>
            <p className="text-sm text-muted-foreground">Valor médio por venda</p>
          </CardContent>
        </Card>
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
                placeholder="Buscar por cliente, carro, preço ou data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card-deep border-border text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Vendas */}
      <Card className="bg-card-elevated border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Lista de Vendas ({filteredSales.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-muted-foreground">Carro</TableHead>
                <TableHead className="text-muted-foreground">Preço</TableHead>
                <TableHead className="text-muted-foreground">Data</TableHead>
                <TableHead className="text-muted-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id} className="border-border hover:bg-card-deep transition-colors">
                  <TableCell className="text-foreground">{sale.id}</TableCell>
                  <TableCell className="text-foreground font-medium">{sale.clienteNome}</TableCell>
                  <TableCell className="text-foreground">{sale.carroModelo}</TableCell>
                  <TableCell className="text-primary font-medium">R$ {sale.preco.toLocaleString("pt-BR")}</TableCell>
                  <TableCell className="text-foreground">{formatDate(sale.dataVenda)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-button-secondary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-button-secondary text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
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
      {showForm && <SaleForm onSave={handleSaveSale} onClose={handleCloseForm} />}
    </div>
  )
}
