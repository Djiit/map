"use client";

import { Marker, Popup } from "react-leaflet";

export default function Spot({
  position,
  content,
}: {
  position: [number, number];
  content: string;
}) {
  return (
    <Marker position={position}>
      <Popup>{content}</Popup>
    </Marker>
  );
}
