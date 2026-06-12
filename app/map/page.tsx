"use client"

import { useEffect, useState, useMemo } from "react"
import { supabase } from "@/lib/supabase"
import MapComponent from "./mapcomponent"
import Fuse from "fuse.js"

type Business = {
  id: string | number
  name: string
  lat: number
  lng: number
  category?: string
  rating?: number
}

const categories = [
  "Todos",
  "Alimentos y bebidas",
  "Comercio al por menor (Retail)",
  "Salud y bienestar",
  "Belleza y cuidado personal",
  "Servicios profesionales y consultoría",
  "Educación y capacitación",
  "Tecnología y software",
  "Construcción y mantenimiento de inmuebles",
  "Automotriz (Venta y servicios)",
  "Logística y transporte",
  "Servicios financieros",
  "Entretenimiento y recreación",
  "Turismo y hospitalidad",
  "Servicios para mascotas",
  "Inmobiliaria y bienes raíces",
  "Manufactura y producción",
  "Energía y servicios sustentables",
  "Moda y textiles",
  "Servicios de limpieza y desinfección",
  "Marketing y publicidad",
  "Otro",
]

export default function MapPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  // 🔥 FETCH SEGURO
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
  .from("businesses")
  .select("*")

console.log("DATA:", data)
console.log("ERROR:", error)

      if (error) {
        console.error("Supabase error:", error)
        return
      }

      setBusinesses(data || [])
    }

    fetchData()
  }, [])

  // 🧠 FUSE SAFE
  const fuse = useMemo(() => {
    if (!businesses?.length) return null

    return new Fuse(businesses, {
      keys: ["name", "category"],
      threshold: 0.5,
      ignoreLocation: true,
    })
  }, [businesses])

  // 🔍 BUSCADOR SEGURO
  const searchResults = useMemo(() => {
    try {
      if (!search || search.trim() === "") return businesses ?? []
      if (!fuse) return businesses ?? []

      const results = fuse.search(search.trim())

      return results.map((r) => r.item).filter(Boolean)
    } catch (error) {
      console.error("Search error:", error)
      return businesses ?? []
    }
  }, [search, fuse, businesses])

  // 🎯 FILTRO POR CATEGORÍA SEGURO
  const filteredBusinesses = useMemo(() => {
    const base = searchResults ?? []

    return base.filter((b) => {
      if (!b) return false

      const category = b.category ?? "Otro"

      if (selectedCategory === "Todos") return true

      return category === selectedCategory
    })
  }, [searchResults, selectedCategory])

  // 🗺️ VALIDACIÓN FINAL PARA MAPA (CLAVE)
  const safeBusinesses = useMemo(() => {
    return filteredBusinesses.filter((b) => {
      return (
        b &&
        typeof b.lat === "number" &&
        typeof b.lng === "number" &&
        !isNaN(b.lat) &&
        !isNaN(b.lng)
      )
    })
  }, [filteredBusinesses])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-10">

        <h1 className="text-4xl font-bold text-foreground">
          Mapa de negocios
        </h1>

        <p className="text-muted-foreground mt-2">
          Explora negocios cerca de ti en Tizayuca.
        </p>

      </section>

      {/* SEARCH */}
      <section className="max-w-6xl mx-auto px-6 pb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar negocios..."
          className="border px-3 py-2 rounded-lg w-full md:w-80"
        />
      </section>

      {/* CATEGORÍAS */}
      <section className="max-w-6xl mx-auto px-6 pb-6">

        <details className="bg-white border rounded-xl p-3 shadow-sm">

          <summary className="cursor-pointer font-medium">
            Filtrar por categoría
          </summary>

          <div className="flex gap-2 flex-wrap mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </details>

      </section>

      {/* MAPA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="flex justify-center">

          <div className="w-full md:w-[90%] lg:w-[85%]">

            <MapComponent businesses={safeBusinesses} />

          </div>

        </div>

      </section>

    </main>
  )
}