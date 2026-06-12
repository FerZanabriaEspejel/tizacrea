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

  useEffect(() => {
    if (typeof window === "undefined") return

    let map: any

    const loadMap = async () => {
      const L = (await import("leaflet")).default

      // destruir mapa anterior
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }

      map = L.map("map").setView(
        [TIZAYUCA.lat, TIZAYUCA.lng],
        13
      )

      mapRef.current = map

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap",
        }
      ).addTo(map)

      const icon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })

      console.log("Negocios recibidos:", businesses)

      businesses.forEach((b) => {
        const lat = Number(b.lat)
        const lng = Number(b.lng)

        if (
          isNaN(lat) ||
          isNaN(lng)
        ) {
          return
        }

        L.marker([lat, lng], { icon })
          .addTo(map)
          .bindPopup(`<b>${b.name}</b>`)
      })
    }

    loadMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [businesses])

  const goToTizayuca = () => {
    if (!mapRef.current) return

    mapRef.current.setView(
      [TIZAYUCA.lat, TIZAYUCA.lng],
      13
    )
  }

  return (
    <div className="space-y-3">

      <button
        onClick={goToTizayuca}
        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        📍 Ir a Tizayuca
      </button>

      <div className="h-[75vh] w-full rounded-xl overflow-hidden border shadow">
        <div id="map" className="h-full w-full" />
      </div>

    </div>
  )
}