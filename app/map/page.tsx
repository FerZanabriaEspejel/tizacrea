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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, lat, lng, category, rating")

      if (!error) setBusinesses(data || [])
    }

    fetchData()
  }, [])

  // 🔍 BUSCADOR INTELIGENTE
  const fuse = useMemo(() => {
    return new Fuse(businesses, {
      keys: ["name", "category"],
      threshold: 0.4,
    })
  }, [businesses])

  const searchResults = useMemo(() => {
    if (!search) return businesses
    return fuse.search(search).map((r) => r.item)
  }, [search, fuse, businesses])

  // 🎯 FILTRO POR CATEGORÍA
  const filteredBusinesses = useMemo(() => {
    return searchResults.filter((b) => {
      if (selectedCategory === "Todos") return true
      return b.category === selectedCategory
    })
  }, [searchResults, selectedCategory])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50">

      {/* NAVBAR YA GLOBAL */}
      
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-10">

        <h1 className="text-4xl font-bold text-foreground">
          Mapa de negocios
        </h1>

        <p className="text-muted-foreground mt-2">
          Explora negocios cerca de ti en Tizayuca y encuentra lo que necesitas más rápido.
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

      {/* CATEGORIES (DESPLEGABLE) */}
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

            <MapComponent businesses={filteredBusinesses} />

          </div>

        </div>

      </section>

    </main>
  )
}