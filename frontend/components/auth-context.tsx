"use client"

import api from "@/lib/api"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  username: string
  name: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
    const response = await api.post('/usuarios/logar', 
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Axios não tem response.ok, mas se chegou aqui, status está OK (2xx)
    // A resposta já está em response.data
    const data = response.data;

    setIsAuthenticated(true);
    setUser(data);
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user_data", JSON.stringify(data));

    return true;
    } catch (error) {
      // Trata erro, exibe mensagem, etc.
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
