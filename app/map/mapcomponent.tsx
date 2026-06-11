"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

type Business = {
  id: string | number
  name: string
  lat: number
  lng: number
  category?: string
}

const TIZAYUCA = {
  lat: 19.8333,
  lng: -98.9833,
}

export default function MapComponent({
  businesses,
}: {
  businesses: Business[]
}) {
  const mapRef = useRef<any>(null)
  const leafletMapRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const loadMap = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet.markercluster")

      // 🔥 evitar doble mapa
      if (mapRef.current) {
        mapRef.current.remove()
      }

      const map = L.map("map").setView(
        [TIZAYUCA.lat, TIZAYUCA.lng],
        13
      )

      mapRef.current = map
      leafletMapRef.current = map

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ).addTo(map)

      const clusterGroup = (L as any).markerClusterGroup()

      const icon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })

      businesses.forEach((b) => {
        if (b.lat && b.lng) {
          const marker = L.marker([b.lat, b.lng], { icon }).bindPopup(
            `<b>${b.name}</b>`
          )

          clusterGroup.addLayer(marker)
        }
      })

      map.addLayer(clusterGroup)

      // 📡 listener para botón externo
      window.addEventListener("go-tizayuca", () => {
        map.setView([TIZAYUCA.lat, TIZAYUCA.lng], 13)
      })
    }

    loadMap()

    return () => {
      mapRef.current?.remove()
    }
  }, [businesses])

  return (
    <div className="space-y-3">

      {/* 🔘 BOTÓN UI */}
      <button
        onClick={() =>
          window.dispatchEvent(new Event("go-tizayuca"))
        }
        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        📍 Ir a Tizayuca
      </button>

      {/* 🗺️ MAPA */}
      <div className="h-[75vh] w-full rounded-xl overflow-hidden border shadow">
        <div id="map" className="h-full w-full" />
      </div>

    </div>
  )
}