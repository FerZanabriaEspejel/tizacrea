"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import Link from "next/link";

type Business = {
  id: number;
  name: string;
  category: string;
  colonia: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  hours: string;
  description: string;
  facebook: string;
};

type MapProps = {
  businesses: Business[];
};

export default function Map({ businesses }: MapProps) {
  return (
    <MapContainer
      center={[19.837, -98.977]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {businesses.map((business) => (
        <Marker
          key={business.id}
          position={[business.lat, business.lng]}
        >
          <Popup>
            <div className="space-y-2">

              <h2 className="font-bold text-lg">
                {business.name}
              </h2>

              <p className="text-sm text-zinc-600">
                {business.category}
              </p>

              <p className="text-sm text-zinc-500">
                {business.colonia}
              </p>

              <Link
                href={`/business/${business.id}`}
                className="text-orange-500 text-sm font-medium hover:underline"
              >
                Ver negocio →
              </Link>

            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}