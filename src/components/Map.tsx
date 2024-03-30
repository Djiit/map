"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import Spot from "./Spot";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const LocationControl = ({ position }: { position: string }) => {
  const map = useMap();
  const locate = () => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  useEffect(locate, [map]);

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
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
