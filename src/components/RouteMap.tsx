"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

export type MapStop = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  order: number;
};

/**
 * City-level route map. All Leaflet work happens in an effect (dynamic import),
 * so nothing touches `window` during server rendering.
 */
export default function RouteMap({ stops }: { stops: MapStop[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    const el = containerRef.current;
    if (!el || stops.length === 0) return;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || mapRef.current) return;

      const ordered = [...stops].sort((a, b) => a.order - b.order);
      const points = ordered.map((s) => [s.lat, s.lng] as [number, number]);

      const map = L.map(el, {
        scrollWheelZoom: false,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(map);

      // Route line between stops in order.
      L.polyline(points, {
        color: "#b4530b",
        weight: 2.5,
        opacity: 0.7,
        dashArray: "1 6",
        lineCap: "round",
      }).addTo(map);

      // Numbered markers.
      ordered.forEach((s) => {
        const icon = L.divIcon({
          className: "route-pin",
          html: `<span style="
            display:flex;align-items:center;justify-content:center;
            width:26px;height:26px;border-radius:9999px;
            background:#b4530b;color:#fff;font:600 13px/1 var(--font-geist-sans),sans-serif;
            box-shadow:0 1px 4px rgba(0,0,0,.35);border:2px solid #fff;">${s.order}</span>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });
        L.marker([s.lat, s.lng], { icon })
          .addTo(map)
          .bindTooltip(`${s.city}, ${s.country}`, {
            direction: "top",
            offset: [0, -14],
          });
      });

      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 7 });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [stops]);

  return (
    <div
      ref={containerRef}
      role="figure"
      aria-label="Route map of the trip"
      className="h-[380px] w-full sm:h-[460px]"
    />
  );
}
