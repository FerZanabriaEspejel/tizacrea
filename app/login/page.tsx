"use client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  // 🔐 detectar sesión automáticamente
  useEffect(() => {

    const checkSession = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {

        router.push("/dashboard")

      }

    }

    checkSession()

  }, [router])

  // 🔑 LOGIN
  async function handleLogin(e: React.FormEvent) {

    e.preventDefault()

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {

      console.error(error.message)

      // ❌ mensajes personalizados
      if (
        error.message.toLowerCase().includes("invalid login credentials")
      ) {

        toast.error("Correo o contraseña incorrectos")

      } else if (
        error.message.toLowerCase().includes("email not confirmed")
      ) {

        toast.error("Debes confirmar tu correo electrónico")

      } else {

        toast.error("Ocurrió un error al iniciar sesión")

      }

      setLoading(false)

      return
    }

    // ✅ éxito
    toast.success("Bienvenid@ 🎉")

    router.push("/dashboard")

  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background via-sky-50 to-orange-50">

      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border">

        <h1 className="text-3xl font-bold mb-2">
          Iniciar sesión
        </h1>

        <p className="text-muted-foreground mb-6">
          Accede a tu cuenta de negocio
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
<div className="flex justify-end">

  <Link
    href="/forgot-password"
    className="text-sm text-orange-500 hover:underline"
  >
    ¿Olvidaste tu contraseña?
  </Link>

</div>
          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {loading
              ? "Ingresando..."
              : "Iniciar sesión"}

          </button>

        </form>

        {/* REGISTER */}
        <div className="mt-6 text-center text-sm text-muted-foreground">

          ¿No tienes cuenta?{" "}

          <Link
            href="/register"
            className="text-orange-500 hover:underline font-medium"
          >
            Crear cuenta
          </Link>

        </div>

      </div>

    </main>
  )
}