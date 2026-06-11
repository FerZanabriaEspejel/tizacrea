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

export default function MapComponent({
  businesses,
}: {
  businesses: Business[]
}) {
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const loadMap = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet.markercluster")

      if (mapRef.current) {
        mapRef.current.remove()
      }

      const map = L.map("map").setView([19.4326, -99.1332], 12)
      mapRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

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
    }

    loadMap()
  }, [businesses])

  return (
    <div className="h-[75vh] w-full rounded-xl overflow-hidden border shadow">
      <div id="map" className="h-full w-full" />
    </div>
  )
}