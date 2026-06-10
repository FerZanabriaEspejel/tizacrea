"use client"

import { useEffect } from "react"
import "leaflet/dist/leaflet.css"

import L from "leaflet"

type Business = {
  id: string | number
  name: string
  lat: number
  lng: number
  category?: string
}

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function MapComponent({
  businesses,
}: {
  businesses: Business[]
}) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const L = require("leaflet")
    require("leaflet.markercluster")

    const container = L.DomUtil.get("map")

    if (container != null) {
      container._leaflet_id = null
    }

    const map = L.map("map").setView([19.4326, -99.1332], 12)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

    const clusterGroup = L.markerClusterGroup()

    businesses.forEach((b) => {
      if (b.lat && b.lng) {
        const marker = L.marker([b.lat, b.lng], {
          icon: blueIcon,
        }).bindPopup(`<b>${b.name}</b>`)

        clusterGroup.addLayer(marker)
      }
    })

    map.addLayer(clusterGroup)

    return () => {
      map.remove()
    }
  }, [businesses])

  return (
    <div className="h-[75vh] w-full rounded-xl overflow-hidden border shadow">
      <div id="map" className="h-full w-full" />
    </div>
  )
}