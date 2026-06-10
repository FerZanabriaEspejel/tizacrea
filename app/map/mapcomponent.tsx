"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

import L from "leaflet"
import { useEffect } from "react"

type Business = {
  id: string | number
  name: string
  lat: number
  lng: number
  category?: string
  rating?: number
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
    const L = require("leaflet")
    require("leaflet.markercluster")

    const map = L.map("map", {
      center: [19.4326, -99.1332],
      zoom: 12,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

    const clusterGroup = L.markerClusterGroup()

    businesses.forEach((b) => {
      if (b.lat && b.lng) {
        const marker = L.marker([b.lat, b.lng], {
          icon: blueIcon,
        }).bindPopup(`
          <div>
            <b>${b.name}</b><br/>
            ${b.category ?? ""}
          </div>
        `)

        clusterGroup.addLayer(marker)
      }
    })

    map.addLayer(clusterGroup)

    return () => {
      map.remove()
    }
  }, [businesses])

  return (
    <div className="h-[75vh] w-full rounded-xl overflow-hidden shadow-md border">
      <div id="map" className="h-full w-full" />
    </div>
  )
}