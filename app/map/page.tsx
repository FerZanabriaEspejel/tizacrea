"use client"

import { useEffect, useState, useMemo } from "react"
import { supabase } from "@/lib/supabase"
import MapComponent from "./mapcomponent"

type Business = {
  id: string | number
  name: string
  lat: number | string
  lng: number | string
  category?: string
  rating?: number
}

export default function MapPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])

  // 🔥 SOLO TRAER DATOS
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, lat, lng, category, rating")

      if (error) {
        console.error("Supabase error:", error)
        return
      }

      setBusinesses(data || [])
    }

    fetchData()
  }, [])

  // 🧠 NORMALIZAR DATOS (CLAVE PARA PINES)
  const normalizedBusinesses = useMemo(() => {
    return (businesses || []).map((b) => ({
      ...b,
      lat: Number(b.lat),
      lng: Number(b.lng),
    }))
  }, [businesses])

  // 🗺️ SOLO DATOS VALIDOS PARA MAPA
  const mapBusinesses = useMemo(() => {
    return normalizedBusinesses.filter((b) => {
      return (
        b &&
        !isNaN(b.lat) &&
        !isNaN(b.lng) &&
        b.lat !== 0 &&
        b.lng !== 0
      )
    })
  }, [normalizedBusinesses])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50">

      {/* HEADER SIMPLE */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-6">
        <h1 className="text-3xl font-bold">
          Mapa de negocios
        </h1>
        <p className="text-gray-500">
          Visualiza negocios registrados en el mapa
        </p>
      </section>

      {/* MAPA (FOCO PRINCIPAL) */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="w-full md:w-[95%] lg:w-[90%] mx-auto">

          <MapComponent businesses={mapBusinesses} />

        </div>

      </section>

    </main>
  )
}