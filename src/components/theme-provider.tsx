"use client"

import type React from "react"
import { createContext, useContext } from "react"

const ThemeContext = createContext<{
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
} | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={{ theme: "dark", setTheme: () => {} }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
