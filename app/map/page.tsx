"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import MapComponent from "./mapcomponent"

type Business = {
  id: string | number
  name: string
  lat: number
  lng: number
  category?: string
  rating?: number
}

export default function MapPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, lat, lng, category, rating")

      if (!error) setBusinesses(data || [])
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* HEADER / TITLE AREA */}
      <div className="p-4">
        <h1 className="text-xl font-semibold">Mapa de Negocios</h1>
        <p className="text-sm text-gray-500">
          Explora negocios cerca de ti
        </p>
      </div>

      {/* MAPA CONTAINER */}
      <div className="flex-1 px-4 pb-4">
        <MapComponent businesses={businesses} />
      </div>

    </div>
  )
}