"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, ShoppingCart, DollarSign } from "lucide-react"

// Base URL da sua API (ponha em .env.local como NEXT_PUBLIC_API_URL)
const API = "http://localhost:8081"

type Carro = { /* campos do carro, ex: placa: string */ }
type Cliente = { /* campos do cliente, ex: cpf: string */ }
type Venda = { 
  idvenda: number
  placa: string
  vendedor: string
  valor: number
  data: string
}

export default function DashboardPage() {
  const [totalCars, setTotalCars] = useState<number>(0)
  const [totalClients, setTotalClients] = useState<number>(0)
  const [sales, setSales] = useState<Venda[]>([])
  const [loading, setLoading] = useState(true)

  // Carrega carros, clientes e vendas
  useEffect(() => {
    async function loadAll() {
      try {
        // 1) total de carros
        const resCars = await fetch(`${API}/carros/visualizarcarro`)
        if (!resCars.ok) throw new Error('Erro ao buscar carros')
        const cars: Carro[] = await resCars.json()

        // 2) total de clientes
        const resClients = await fetch(`${API}/clientes/visualizarcliente`)
        const clients: Cliente[] = await resClients.json()
        setTotalClients(clients.length)

        // 3) vendas
        const resSales = await fetch(`${API}/vendas/visualizarvenda`)
        const vendas: Venda[] = await resSales.json()
        setSales(vendas)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  // total de vendas e receita total
  const totalSales   = sales.length
  const totalRevenue = sales.reduce((sum, v) => sum + (v.valor || 0), 0)

  // três últimas vendas (para “Vendas Recentes”)
  const recent = sales.slice(-3).reverse()

  // carros mais vendidos (agregação simples)
  const countByCar = sales.reduce<Record<string,number>>((acc, v) => {
    acc[v.placa] = (acc[v.placa] || 0) + 1
    return acc
  }, {})
  // transforme em array, ordene e pegue top 3
  const topCars = Object.entries(countByCar)
    .map(([placa, qtd]) => ({ placa, qtd }))
    .sort((a,b) => b.qtd - a.qtd)
    .slice(0, 3)

  if (loading) return <p>Carregando dados do dashboard…</p>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>

      {/* cards principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-card-elevated border-border shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Carros</CardTitle>
            <Car className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalCars}</div>
            <p className="text-xs text-muted-foreground">Veículos em estoque</p>
          </CardContent>
        </Card>

        <Card className="bg-card-elevated border-border shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalClients}</div>
            <p className="text-xs text-muted-foreground">Clientes cadastrados</p>
          </CardContent>
        </Card>

        <Card className="bg-card-elevated border-border shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vendas Realizadas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalSales}</div>
            <p className="text-xs text-muted-foreground">Total de vendas</p>
          </CardContent>
        </Card>

        <Card className="bg-card-elevated border-border shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {totalRevenue.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">Somatório das vendas</p>
          </CardContent>
        </Card>
      </div>

      {/* cards de detalhe */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Vendas Recentes */}
        <Card className="bg-card-elevated border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recent.map((v) => (
                <div key={v.idvenda} className="flex items-center justify-between p-3 bg-card-deep rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium text-foreground">{v.placa}</p>
                    <p className="text-sm text-muted-foreground">Vendedor: {v.vendedor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">R$ {v.valor.toLocaleString("pt-BR")}</p>
                    <p className="text-xs text-muted-foreground">{new Date(v.data).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carros Mais Vendidos */}
        <Card className="bg-card-elevated border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Carros Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCars.map(({ placa, qtd }) => (
                <div key={placa} className="flex items-center justify-between p-3 bg-card-deep rounded-lg shadow-sm">
                  <p className="font-medium text-foreground">{placa}</p>
                  <p className="font-bold text-primary">{qtd} vendas</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}