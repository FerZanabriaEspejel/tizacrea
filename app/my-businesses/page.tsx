"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { toast } from "sonner"

import { supabase } from "@/lib/supabase"

type Business = {
  id: number
  name: string
  category: string
  address: string
  phone: string
  description: string
  image_url: string

  socials: {
    type: string
    url: string
  }[]

  business_hours: any
}

export default function MyBusinessesPage() {

  const router = useRouter()

  const [businesses, setBusinesses] =
    useState<Business[]>([])

  const [loading, setLoading] =
    useState(true)

  // 🗑️ DELETE
  async function handleDelete(
    id: number
  ) {

    const confirmed = window.confirm(
      "¿Eliminar este negocio?"
    )

    if (!confirmed) return

    const { error } = await supabase
      .from("businesses")
      .delete()
      .eq("id", id)

    if (error) {

      console.error(error.message)

      toast.error(
        "No se pudo eliminar el negocio"
      )

    } else {

      toast.success(
        "Negocio eliminado 🗑️"
      )

      setBusinesses(
        businesses.filter(
          (business) =>
            business.id !== id
        )
      )
    }
  }

  // 📦 FETCH
  useEffect(() => {

    async function fetchBusinesses() {

      // 🔐 USER
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {

        router.push("/login")

        return
      }

      // 📦 BUSINESSES
      const { data, error } =
        await supabase
          .from("businesses")
          .select("*")
          .eq("owner_id", user.id)

      if (error) {

        console.error(error.message)

        toast.error(
          "Error cargando negocios"
        )

      } else {

        setBusinesses(data || [])
      }

      setLoading(false)
    }

    fetchBusinesses()

  }, [router])

  // ⏳ LOADING
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-muted-foreground">
          Cargando negocios...
        </p>

      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-20 bg-gradient-to-b from-background via-sky-50 to-orange-50">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Mis negocios
            </h1>

            <p className="text-muted-foreground mt-2">
              Administra tus negocios registrados
            </p>

          </div>

          <Link
            href="/register-business"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition text-center"
          >
            + Agregar negocio
          </Link>

        </div>

        {/* EMPTY */}
        {businesses.length === 0 ? (

          <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">

            <h2 className="text-2xl font-semibold mb-3">
              Aún no tienes negocios
            </h2>

            <p className="text-muted-foreground mb-6">
              Registra tu primer negocio para aparecer en TizaCrea
            </p>

            <Link
              href="/register-business"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition"
            >
              Registrar negocio
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {businesses.map((business) => (

              <div
                key={business.id}
                className="bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
              >

                {/* IMAGE */}
                <div className="h-56 bg-gray-100 overflow-hidden">

                  {business.image_url ? (

                    <img
                      src={business.image_url}
                      alt={business.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Sin imagen
                    </div>

                  )}

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  {/* TITLE */}
                  <div className="mb-5">

                    <h2 className="text-2xl font-bold line-clamp-1">
                      {business.name}
                    </h2>

                    <p className="text-orange-600 font-medium mt-1">
                      {business.category}
                    </p>

                  </div>

                  {/* INFO */}
                  <div className="space-y-2 text-sm text-muted-foreground">

                    <p className="line-clamp-1">
                      📍 {business.address}
                    </p>

                    <p>
                      📞 {business.phone || "Sin teléfono"}
                    </p>

                    <p className="line-clamp-2">
                      📝 {business.description || "Sin descripción"}
                    </p>

                  </div>

                  {/* HORARIOS */}
                  {business.business_hours && (

                    <div className="pt-5">

                      <p className="font-medium text-foreground mb-2">
                        Horarios
                      </p>

                      <div className="space-y-1 text-xs">

                        {Object.entries(
                          business.business_hours
                        )
                          .slice(0, 3)
                          .map(
                            (
                              [day, schedule]: any
                            ) => (

                              <div
                                key={day}
                                className="flex justify-between border-b border-dashed pb-1"
                              >

                                <span className="capitalize">
                                  {day}
                                </span>

                                <span>

                                  {schedule.closed
                                    ? "Cerrado"
                                    : `${schedule.open} - ${schedule.close}`}

                                </span>

                              </div>

                            )
                          )}

                      </div>

                    </div>

                  )}

                  {/* SOCIALS */}
                  {business.socials &&
                    business.socials.length > 0 && (

                      <div className="flex flex-wrap gap-2 mt-5">

                        {business.socials.map(
                          (
                            social,
                            index
                          ) => (

                            <a
                              key={index}
                              href={social.url}
                              target="_blank"
                              className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition"
                            >
                              {social.type}
                            </a>

                          )
                        )}

                      </div>

                    )}

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-3 mt-6">

                    <Link
                      href={`/businesses/${business.id}`}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition text-sm"
                    >
                      Ver negocio
                    </Link>

                    <Link
                      href={`/businesses/edit/${business.id}`}
                      className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 transition text-sm"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          business.id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition text-sm"
                    >
                      Eliminar
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  )
}