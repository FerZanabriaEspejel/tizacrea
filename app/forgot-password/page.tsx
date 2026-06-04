"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleResetPassword(
    e: React.FormEvent
  ) {

    e.preventDefault()

    setLoading(true)

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "http://localhost:3000/reset-password",
        }
      )

    if (error) {

      console.error(error.message)

      toast.error(
        "No se pudo enviar el correo"
      )

    } else {

      toast.success(
        "Te enviamos un correo para recuperar tu contraseña 📩"
      )

    }

    setLoading(false)

  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background via-sky-50 to-orange-50">

      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border">

        <h1 className="text-3xl font-bold mb-2">
          Recuperar contraseña
        </h1>

        <p className="text-muted-foreground mb-6">
          Ingresa tu correo y te enviaremos instrucciones
        </p>

        <form
          onSubmit={handleResetPassword}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition disabled:opacity-50"
          >

            {loading
              ? "Enviando..."
              : "Enviar correo"}

          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            href="/login"
            className="text-sm text-orange-500 hover:underline"
          >
            Volver al login
          </Link>

        </div>

      </div>

    </main>
  )
}