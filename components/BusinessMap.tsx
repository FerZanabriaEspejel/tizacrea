"use client"

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"

import L from "leaflet"
import Link from "next/link"

// ✅ Fix iconos Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})

type Business = {
  id: number
  name: string
  category: string
  address: string
  lat?: number
  lng?: number
}

interface Props {
  businesses: Business[]
}

export default function BusinessMap({
  businesses,
}: Props) {

  // 📍 Centro Tizayuca
  const defaultCenter: [number, number] = [
    19.837,
    -98.977,
  ]

  return (

    <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-lg border">

      <MapContainer
  key={businesses[0]?.id || "map"}
  center={defaultCenter}
  zoom={13}
  scrollWheelZoom={true}
  className="w-full h-full z-0"
>

        {/* 🌎 MAPA */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📌 MARKERS */}
        {businesses.map((business) => {

          // ❌ sin coordenadas
          if (
            business.lat === null ||
            business.lng === null ||
            business.lat === undefined ||
            business.lng === undefined
          ) {
            return null
          }

          return (

            <Marker
              key={business.id}
              position={[
                business.lat,
                business.lng,
              ]}
            >

              <Popup>

                <div className="space-y-2 min-w-[180px]">

                  <div>

                    <h3 className="font-bold text-base">
                      {business.name}
                    </h3>

                    <p className="text-sm text-orange-600">
                      {business.category}
                    </p>

                  </div>

                  <p className="text-sm text-zinc-600">
                    {business.address}
                  </p>

                  <Link
                    href={`/businesses/${business.id}`}
                    className="inline-block text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg transition"
                  >
                    Ver negocio
                  </Link>

                </div>

              </Popup>

            </Marker>

          )
        })}

      </MapContainer>

    </div>

  )
}