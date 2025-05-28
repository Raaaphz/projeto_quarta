"use client"

import { useState } from "react"
import { Car, Users, ShoppingCart, BarChart3, LogOut, Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import CarsPage from "@/components/cars-page"
import ClientsPage from "@/components/clients-page"
import SalesPage from "@/components/sales-page"
import DashboardPage from "@/components/dashboard-page"
import { useAuth } from "@/components/auth-context"
import { useTheme } from "@/components/theme-context"

type Page = "dashboard" | "cars" | "clients" | "sales"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "cars", label: "Carros", icon: Car },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "sales", label: "Vendas", icon: ShoppingCart },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case "cars":
        return <CarsPage />
      case "clients":
        return <ClientsPage />
      case "sales":
        return <SalesPage />
      default:
        return <DashboardPage />
    }
  }

  const handleNavigation = (page: Page) => {
    setCurrentPage(page)
    setSidebarOpen(false) // Fechar sidebar no mobile após navegação
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="px-4 md:px-6 py-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Botão do menu mobile */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-5 h-5" />
              </Button>

              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Projeto Quarta</h1>
                <p className="text-sm text-muted-foreground">Sistema de Gerenciamento</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Botão de tema */}
              <Button onClick={toggleTheme} variant="outline" size="sm" className="border-border hover:bg-accent">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <div className="hidden sm:block text-right">
                <p className="text-sm text-foreground">Bem-vindo,</p>
                <p className="text-sm text-primary font-medium">{user?.name}</p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-border text-muted-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
              >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Overlay para mobile */}
        <div
          className={`mobile-overlay fixed inset-0 bg-black/50 z-40 md:hidden ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`mobile-sidebar w-64 min-h-screen bg-sidebar-bg border-r border-border fixed md:relative z-50 md:z-auto flex flex-col ${sidebarOpen ? "open" : ""}`}
        >
          <div className="flex justify-between items-center p-4 md:hidden border-b border-border">
            <h2 className="font-semibold text-foreground">Menu</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <nav className="p-4 space-y-2 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as Page)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:bg-card-elevated hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
            
            <hr></hr>
            <a
              href="https://github.com/Raaaphz/projeto_quarta"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-card-elevated hover:text-foreground group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-medium">GitHub</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
         <main className="flex-1 w-full min-h-screen p-4 md:p-6 overflow-auto">{renderPage()}</main>
      </div>
    </div>
  )
}
