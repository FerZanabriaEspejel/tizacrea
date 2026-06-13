"use client";

import { useRef, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  lat: number;
  lng: number;

  onChange: (
    lat: number,
    lng: number
  ) => void;
};

function MapClickHandler({
  onChange,
}: {
  onChange: (
    lat: number,
    lng: number
  ) => void;
}) {

  useMapEvents({

    click(e) {

      onChange(
        e.latlng.lat,
        e.latlng.lng
      );

    },

  });

  return null;
}

function RecenterMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {

  const map = useMap();

  useEffect(() => {

    map.setView(
      [lat, lng],
      map.getZoom()
    );

  }, [lat, lng, map]);

  return null;
}

export default function LocationPicker({
  lat,
  lng,
  onChange,
}: Props) {

  const markerRef =
    useRef<L.Marker>(null);

  return (

    <div className="h-[400px] rounded-2xl overflow-hidden border">

      <MapContainer
        center={[lat, lng]}
        zoom={17}
        scrollWheelZoom={true}
        className="w-full h-full"
      >

        <MapClickHandler
          onChange={onChange}
        />

        <RecenterMap
          lat={lat}
          lng={lng}
        />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[lat, lng]}
          draggable={true}
          ref={markerRef}
          eventHandlers={{

            dragend() {

              const marker =
                markerRef.current;

              if (!marker) return;

              const pos =
                marker.getLatLng();

              onChange(
                pos.lat,
                pos.lng
              );

            },

          }}
        />

      </MapContainer>

    </div>

  );
}