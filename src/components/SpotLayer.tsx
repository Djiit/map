"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";

import Spot from "@/components/Spot";

type SpotData = {
  id: number;
  position: [number, number];
  content?: string;
};

const DEBOUNCE_MS = 400;
const FETCH_TIMEOUT_MS = 15_000;
const MIN_ZOOM = 5;
const BBOX_PRECISION = 2;

const SpotLayer = () => {
  const map = useMap();
  const [spots, setSpots] = useState<SpotData[]>([]);
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);
  const lastBboxRef = useRef("");
  const debouncedFetchRef = useRef<ReturnType<typeof setTimeout>>();

  const fetchSpots = useCallback(async () => {
    if (map.getZoom() < MIN_ZOOM) {
      setSpots([]);
      return;
    }
    const bounds = map.getBounds();
    const bbox = [
      bounds.getSouth().toFixed(BBOX_PRECISION),
      bounds.getWest().toFixed(BBOX_PRECISION),
      bounds.getNorth().toFixed(BBOX_PRECISION),
      bounds.getEast().toFixed(BBOX_PRECISION),
    ].join(",");
    if (bbox === lastBboxRef.current) {
      return;
    }
    lastBboxRef.current = bbox;
    const requestId = ++requestIdRef.current;
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(`/api/spots?bbox=${bbox}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch spots (${response.status}).`);
      }
      const data = (await response.json()) as SpotData[];
      if (requestIdRef.current === requestId) {
        setSpots(data);
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error(error);
      }
    } finally {
      clearTimeout(timeoutId);
      if (requestIdRef.current === requestId) {
        setLoading(false);
      }
    }
  }, [map]);

  const scheduleFetch = useCallback(() => {
    clearTimeout(debouncedFetchRef.current);
    debouncedFetchRef.current = setTimeout(fetchSpots, DEBOUNCE_MS);
  }, [fetchSpots]);

  useEffect(() => {
    const handleMoveEnd = () => scheduleFetch();
    map.on("moveend", handleMoveEnd);
    map.on("zoomend", handleMoveEnd);
    return () => {
      clearTimeout(debouncedFetchRef.current);
      map.off("moveend", handleMoveEnd);
      map.off("zoomend", handleMoveEnd);
    };
  }, [map, scheduleFetch]);

  useEffect(() => {
    fetchSpots();
    return () => clearTimeout(debouncedFetchRef.current);
  }, [fetchSpots]);

  return (
    <>
      {spots.map((spot) => (
        <Spot position={spot.position} content={spot.content} key={spot.id} />
      ))}
      {loading && (
        <div className="leaflet-bottom leaflet-right">
          <div className="leaflet-control leaflet-bar bg-white p-2 text-xs">
            Loading spots...
          </div>
        </div>
      )}
    </>
  );
};

export default SpotLayer;
