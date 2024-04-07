"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { type LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import LocationControl from "@/components/LocationControl";
import Spot from "@/components/Spot";

const DEFAULT_ZOOM = "11";
const DEFAULT_CENTER: LatLngExpression = [47.2144851, -1.5291969]; // Nantes, France

export default function Map({ spots }: { spots: any[] }) {
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Spot {...spot} key={spot.position.join(";")} />
      ))}
      <LocationControl />
    </MapContainer>
  );
}
