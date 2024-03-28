"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting

import { MapContainer, TileLayer } from "react-leaflet";
import Spot from "./Spot";

export default function Map({ spots }: { spots: any[] }) {
  return (
    <MapContainer
      preferCanvas={true}
      center={[51.505, -0.09]}
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Spot {...spot} key={spot.position.join(";")} />
      ))}
    </MapContainer>
  );
}
