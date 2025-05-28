"use client"

import { useAuth } from "@/components/auth-context"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <Dashboard />
}
