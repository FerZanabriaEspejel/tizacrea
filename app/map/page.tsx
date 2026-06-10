"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const MapComponent = dynamic(() => import("./mapcomponent"), {
  ssr: false,
})

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

  return <MapComponent businesses={businesses} />
}