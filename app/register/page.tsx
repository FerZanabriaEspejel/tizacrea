"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Cuenta creada correctamente 🎉")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-card border rounded-2xl p-8 shadow-lg">

        <h1 className="text-3xl font-bold mb-2">
          Crear cuenta
        </h1>

        <p className="text-muted-foreground mb-6">
          Registra tu negocio en TizaCrea
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition"
          >
            Crear cuenta
          </button>

        </form>

      </div>

    </main>
  )
}