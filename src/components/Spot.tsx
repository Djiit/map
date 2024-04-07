"use client";

import { type LatLngExpression } from "leaflet";
import { useTranslations } from "next-intl";
import { Marker, Popup } from "react-leaflet";

export default function Spot({
  position,
  content,
}: {
  position: LatLngExpression;
  content: string;
}) {
  const t = useTranslations("spot");
  return (
    <Marker position={position}>
      <Popup>
        <p>{content}</p>
        <a
          href={`http://maps.apple.com/?q=${position.toString()[0]},${position.toString()[1]}`}
          target="_blank"
        >
          {t("directions")}
        </a>
      </Popup>
    </Marker>
  );
}
