"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

export default function DashboardPage() {

  const router = useRouter()

  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)

  // 🔐 VERIFICAR SESIÓN
  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {

        router.push("/login")

      } else {

        setUserEmail(user.email || "")
        setLoading(false)
      }
    }

    getUser()

  }, [router])

  // 🚪 LOGOUT
  async function handleLogout() {

    await supabase.auth.signOut()

    router.push("/")

  }

  // ⏳ LOADING
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          Cargando dashboard...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-20 bg-gradient-to-b from-background via-sky-50 to-orange-50">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-card border rounded-3xl p-8 shadow-lg">

          <h1 className="text-4xl font-bold mb-2">
            Dashboard del negocio
          </h1>

          <p className="text-muted-foreground mb-6">
            Bienvenido a tu panel de administración
          </p>

          {/* USER */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8">

            <p className="font-medium">
              Usuario conectado:
            </p>

            <p className="text-orange-700">
              {userEmail}
            </p>

          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* REGISTRAR NEGOCIO */}
            <Link
              href="/register-business"
              className="border rounded-2xl p-6 bg-white hover:shadow-lg transition"
            >

              <h2 className="font-bold text-lg mb-2">
                Registrar negocio
              </h2>

              <p className="text-sm text-muted-foreground">
                Agrega un nuevo negocio a la plataforma
              </p>

            </Link>

            {/* MIS NEGOCIOS */}
            <Link
              href="/my-businesses"
              className="border rounded-2xl p-6 bg-white hover:shadow-lg transition"
            >

              <h2 className="font-bold text-lg mb-2">
                Mis negocios
              </h2>

              <p className="text-sm text-muted-foreground">
                Administra y edita tus negocios registrados
              </p>

            </Link>

            {/* EXPLORAR NEGOCIOS */}
            <Link
              href="/businesses"
              className="border rounded-2xl p-6 bg-white hover:shadow-lg transition"
            >

              <h2 className="font-bold text-lg mb-2">
                Explorar negocios
              </h2>

              <p className="text-sm text-muted-foreground">
                Descubre negocios de la comunidad
              </p>

            </Link>

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-8 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            Cerrar sesión
          </button>

        </div>

      </div>

    </main>
  )
}