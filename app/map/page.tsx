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

  // 🔍 FUSE (búsqueda inteligente)
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

  // 🎯 filtro por categoría
  const filteredBusinesses = useMemo(() => {
    return searchResults.filter((b) => {
      if (selectedCategory === "Todos") return true
      return b.category === selectedCategory
    })
  }, [searchResults, selectedCategory])

  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="p-4">
        <h1 className="text-xl font-semibold">Mapa de Negocios</h1>
        <p className="text-sm text-gray-500">
          Explora negocios cerca de ti
        </p>
      </div>

      {/* SEARCH */}
      <div className="px-4 pb-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar negocios..."
          className="border px-3 py-2 rounded-lg w-full max-w-md"
        />
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-2 flex-wrap px-4 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MAP */}
      <div className="flex-1 px-4 pb-4">
        <MapComponent businesses={filteredBusinesses} />
      </div>

    </div>
  )
}