"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import Spot from "@/components/Spot";

const LocationControl = ({ position }: { position: string }) => {
  const map = useMap();
  const locate = () => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  useEffect(locate, [map]);

  return (
    <div className="leaflet-top leaflet-right">
      <button onClick={locate} className="leaflet-control leaflet-bar btn">
        <ViewfinderCircleIcon className="h-6 w-6 text-black" />
      </button>
    </div>
  );
};

export default function Map({ spots }: { spots: any[] }) {
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
      <LocationControl position="topright" />
    </MapContainer>
  );
}
