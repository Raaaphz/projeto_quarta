"use client"

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
      // Verificar credenciais de teste
      if (username === "adm" && password === "adm") {
        const testUser = {
          id: 1,
          username: "adm",
          name: "Administrador",
        }

        setIsAuthenticated(true)
        setUser(testUser)
        localStorage.setItem("auth_token", "test_token")
        localStorage.setItem("user_data", JSON.stringify(testUser))
        return true
      }

      // Chamada real para API (descomentada quando backend estiver pronto)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // })

      // if (response.ok) {
      //   const data = await response.json()
      //   setIsAuthenticated(true)
      //   setUser(data.user)
      //   localStorage.setItem("auth_token", data.token)
      //   localStorage.setItem("user_data", JSON.stringify(data.user))
      //   return true
      // }

      return false
    } catch (error) {
      console.error("Erro no login:", error)
      return false
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
