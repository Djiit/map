import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

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

export default LocationControl;
