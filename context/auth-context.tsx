"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("metro-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check credentials (in a real app, this would be done server-side)
    if (email === "user@example.com" && password === "password") {
      const user = {
        id: "1",
        name: "Usuário Demo",
        email: "user@example.com",
      }

      setUser(user)
      localStorage.setItem("metro-user", JSON.stringify(user))
      return
    }

    // For demo purposes, allow any login
    const user = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
    }

    setUser(user)
    localStorage.setItem("metro-user", JSON.stringify(user))
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful registration

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real app, we would validate and create the user
    const user = {
      id: Date.now().toString(),
      name,
      email,
    }

    // We don't log in the user automatically after registration
    // They need to go to the login page
    return
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("metro-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}
