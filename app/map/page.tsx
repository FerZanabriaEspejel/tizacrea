"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Business = {
  id: string | number
  name: string
  lat: number
  lng: number
  category?: string
}

// 🔵 Icono azul
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// 📌 Categorías
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
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  // 📦 cargar negocios
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, lat, lng, category")

      if (!error) {
        setBusinesses(data || [])
      }
    }

    fetchData()
  }, [])

  // 🎯 filtro por categoría
  const filteredBusinesses =
    selectedCategory === "Todos"
      ? businesses
      : businesses.filter((b) => b.category === selectedCategory)

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* 🎛️ FILTROS */}
      <div className="absolute z-[1000] top-3 left-3 bg-white p-2 rounded-lg shadow max-w-[90%] flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🗺️ MAPA */}
      <MapContainer
        center={[19.4326, -99.1332]} // CDMX
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {filteredBusinesses.map((b) =>
          b.lat && b.lng ? (
            <Marker
              key={b.id}
              position={[b.lat, b.lng]}
              icon={blueIcon}
            >
              <Popup>
                <div>
                  <b>{b.name}</b>
                  <br />
                  <small>{b.category}</small>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  )
}