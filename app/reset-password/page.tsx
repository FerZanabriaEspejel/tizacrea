"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {

  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [loading, setLoading] = useState(false)

  async function handleUpdatePassword(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (password !== confirmPassword) {

      toast.error(
        "Las contraseñas no coinciden"
      )

      return
    }

    if (password.length < 6) {

      toast.error(
        "La contraseña debe tener mínimo 6 caracteres"
      )

      return
    }

    setLoading(true)

    const { error } =
      await supabase.auth.updateUser({
        password,
      })

    if (error) {

      console.error(error.message)

      toast.error(
        "No se pudo actualizar la contraseña"
      )

    } else {

      toast.success(
        "Contraseña actualizada correctamente 🔐"
      )

      router.push("/login")

    }

    setLoading(false)

  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background via-sky-50 to-orange-50">

      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border">

        <h1 className="text-3xl font-bold mb-2">
          Nueva contraseña
        </h1>

        <p className="text-muted-foreground mb-6">
          Escribe tu nueva contraseña
        </p>

        <form
          onSubmit={handleUpdatePassword}
          className="space-y-4"
        >

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
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
              ? "Actualizando..."
              : "Actualizar contraseña"}

          </button>

        </form>

      </div>

    </main>
  )
}