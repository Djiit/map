"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { type LatLngExpression } from "leaflet";
import { useTranslations } from "next-intl";
import { MapContainer, TileLayer } from "react-leaflet";

import LocationControl from "@/components/LocationControl";
import SpotLayer from "@/components/SpotLayer";

const DEFAULT_ZOOM = "11";
const DEFAULT_CENTER: LatLngExpression = [48.8566, 2.3522]; // Paris, France

export default function Map() {
  const t = useTranslations();
  const zoom = Number.parseInt(localStorage.getItem("zoom") || DEFAULT_ZOOM);
  const location =
    (localStorage
      .getItem("location")
      ?.split(",")
      ?.map(Number.parseFloat) as LatLngExpression) || DEFAULT_CENTER;

  return (
    <MapContainer
      preferCanvas={true}
      center={location}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution={t.raw("map.attribution")}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SpotLayer />
      <LocationControl />
    </MapContainer>
  );
}
