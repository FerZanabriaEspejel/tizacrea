"use client"
const businessIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"

import L from "leaflet"
import Link from "next/link"

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
  image_url?: string
  lat?: number
  lng?: number
}

interface Props {
  businesses: Business[]
}

export default function BusinessMap({
  businesses,
}: Props) {

  const defaultCenter: [number, number] = [
    19.837,
    -98.977,
  ]

  const validBusinesses = businesses.filter(
    (business) =>
      business.lat !== null &&
      business.lng !== null &&
      business.lat !== undefined &&
      business.lng !== undefined
  )

  const center: [number, number] =
    validBusinesses.length === 1
      ? [
          validBusinesses[0].lat!,
          validBusinesses[0].lng!,
        ]
      : defaultCenter

  const zoom =
    validBusinesses.length === 1
      ? 17
      : 13

  return (

<div className="relative z-0 w-full h-[500px] rounded-3xl overflow-hidden shadow-xl border border-zinc-200">

      <MapContainer
        key={validBusinesses[0]?.id || "map"}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validBusinesses.map((business) => (

          <Marker
  key={business.id}
  position={[
    business.lat!,
    business.lng!,
  ]}
  icon={businessIcon}
>

            <Popup>

              <div className="w-[220px]">

                {business.image_url && (

                  <img
                    src={business.image_url}
                    alt={business.name}
                    className="w-full h-28 object-cover rounded-lg mb-3"
                  />

                )}

                <h3 className="font-bold text-lg leading-tight">
                  {business.name}
                </h3>

                <p className="text-orange-600 text-sm font-medium mb-2">
                  {business.category}
                </p>

                <p className="text-sm text-zinc-600 mb-3">
                  {business.address}
                </p>

                <Link
                  href={`/businesses/${business.id}`}
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-lg transition"
                >
                  Ver negocio
                </Link>

              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>

  )
}