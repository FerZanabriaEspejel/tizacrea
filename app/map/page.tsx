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
}

// 🔵 icono azul
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function MapPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])

  // 📦 cargar datos
  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, lat, lng")

      if (error) {
        console.error(error)
        return
      }

      setBusinesses(data || [])
    }

    fetchBusinesses()
  }, [])

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[19.4326, -99.1332]} // CDMX
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {businesses.map((b) =>
          b.lat && b.lng ? (
            <Marker
              key={b.id}
              position={[b.lat, b.lng]}
              icon={blueIcon}
            >
              <Popup>
                <b>{b.name}</b>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  )
}