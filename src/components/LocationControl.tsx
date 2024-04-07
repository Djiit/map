import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { type LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const LocationControl = () => {
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const map = useMap();
  const locate = () => {
    map.locate().on("locationfound", function (e) {
      setLocation(e.latlng);
      localStorage.setItem("location", `${e.latlng.lat},${e.latlng.lng}`);
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  useEffect(locate, [map]);

  return (
    <div className="leaflet-top leaflet-right">
      <button onClick={locate} className="leaflet-control leaflet-bar btn">
        <ViewfinderCircleIcon className="h-6 w-6 text-black" />
        {location && (
          <Marker position={location}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </button>
    </div>
  );
};

export default LocationControl;
