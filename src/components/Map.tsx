"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { useState } from "react";
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import Spot from "./Spot";

export default function Map({ spots }: { spots: any[] }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return (
    <MapContainer
      preferCanvas={true}
      center={[47.2144851, -1.5291969]}
      zoom={11}
      scrollWheelZoom={true}
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
