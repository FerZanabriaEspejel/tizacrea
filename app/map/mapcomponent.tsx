"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import L from "leaflet"
import { useEffect } from "react"

type Business = {
  id: string | number
  name: string
  lat: number
  lng: number
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

    const map = L.map("map").setView([19.4326, -99.1332], 12)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

    const markers = L.markerClusterGroup()

    businesses.forEach((b) => {
      if (b.lat && b.lng) {
        const marker = L.marker([b.lat, b.lng], {
          icon: blueIcon,
        }).bindPopup(`<b>${b.name}</b>`)

        markers.addLayer(marker)
      }
    })

    map.addLayer(markers)

    return () => {
      map.remove()
    }
  }, [businesses])

  return <div id="map" style={{ height: "100vh", width: "100%" }} />
}