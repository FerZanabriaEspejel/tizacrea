"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

async function handleRegister(e: React.FormEvent) {

  e.preventDefault()

  if (!email.trim()) {

    toast.error(
      "Ingresa un correo electrónico."
    )

    return

  }

  if (password.length < 6) {

    toast.error(
      "La contraseña debe tener al menos 6 caracteres."
    )

    return

  }

  setLoading(true)

  const { error } = await supabase.auth.signUp({

    email,
    password,

  })

  setLoading(false)

  if (error) {

    if (
      error.message.includes("already registered")
    ) {

      toast.error(
        "Este correo ya tiene una cuenta."
      )

    } else {

      toast.error(
        "No se pudo crear la cuenta."
      )

    }

    return

  }

  toast.success(
    "Cuenta creada correctamente 🎉"
  )

  setEmail("")
  setPassword("")

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

          <div>

  <input
    type="password"
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-4 rounded-xl border"
  />

<p className="text-xs text-gray-500 mt-2 ml-1">
  Mínimo 6 caracteres. Se recomienda combinar letras y números para mayor seguridad.
</p>

</div>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white p-4 rounded-xl transition flex items-center justify-center gap-2"
>

  {loading ? (
    <>
      <Loader2 className="h-5 w-5 animate-spin" />
      Creando cuenta...
    </>
  ) : (
    "Crear cuenta"
  )}

</button>

        </form>

      </div>

    </main>
  )
}