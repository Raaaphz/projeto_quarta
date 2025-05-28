"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Eye, EyeOff, AlertCircle, Sun, Moon } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useTheme } from "@/components/theme-context"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(formData.usuario, formData.senha)

    if (!success) {
      setError("Credenciais inválidas. Tente novamente.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Botão de tema no canto superior direito */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-50 bg-button-secondary border-border hover:bg-button-muted transition-colors"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>

      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projeto Quarta</h1>
          <p className="text-muted-foreground">Sistema de Gerenciamento</p>
        </div>

        {/* Card de Login */}
        <Card className="bg-card-elevated border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Fazer Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="usuario" className="text-foreground">
                  Usuário
                </Label>
                <Input
                  id="usuario"
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                  className="bg-input border-border text-foreground placeholder-muted-foreground"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    className="bg-input border-border text-foreground placeholder-muted-foreground pr-10"
                    placeholder="Digite sua senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Credenciais de teste */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-foreground text-sm font-medium mb-2">Credenciais de teste:</p>
              <p className="text-muted-foreground text-sm">
                Usuário: <span className="text-primary font-mono">adm</span>
              </p>
              <p className="text-muted-foreground text-sm">
                Senha: <span className="text-primary font-mono">adm</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
