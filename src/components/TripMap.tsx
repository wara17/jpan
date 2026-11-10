"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "@maplibre/maplibre-gl-leaflet";
import "maplibre-gl/dist/maplibre-gl.css";
import type { StyleSpecification } from "maplibre-gl";
import type { Day } from "@/lib/itinerary";
import { accommodation, hasCoords, mapStops } from "@/lib/itinerary";
import { placePhotos } from "@/lib/photos";

// Base map: OpenFreeMap vector tiles (free, no API key) built from OpenStreetMap.
// Place names are shown in Thai where OSM has a Thai name, then English, then the local name.
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const BASE_ATTRIBUTION =
  '<a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>';

// Fallback if the vector style can't load: plain OpenStreetMap raster tiles.
const FALLBACK_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const FALLBACK_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const THAI_LABEL = ["coalesce", ["get", "name:th"], ["get", "name:en"], ["get", "name_en"], ["get", "name"]];

function toThaiLabels(style: StyleSpecification): StyleSpecification {
  return {
    ...style,
    layers: style.layers.map((layer) => {
      if (layer.type !== "symbol" || !layer.layout?.["text-field"]) return layer;
      // Only rewrite place-name labels; leave road refs / house numbers alone.
      if (!JSON.stringify(layer.layout["text-field"]).includes('"name')) return layer;
      return { ...layer, layout: { ...layer.layout, "text-field": THAI_LABEL } } as typeof layer;
    }),
  };
}

function ThaiBaseMap() {
  const map = useMap();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let layer: L.MaplibreGL | undefined;
    let cancelled = false;
    fetch(STYLE_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`style ${r.status}`);
        return r.json() as Promise<StyleSpecification>;
      })
      .then((style) => {
        if (cancelled) return;
        layer = L.maplibreGL({ style: toThaiLabels(style) });
        layer.getAttribution = () => BASE_ATTRIBUTION;
        layer.addTo(map);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      layer?.remove();
    };
  }, [map]);

  return failed ? <TileLayer attribution={FALLBACK_ATTRIBUTION} url={FALLBACK_TILE_URL} maxZoom={19} /> : null;
}

// Markers are drawn with HTML/CSS (divIcon), so no external marker images are needed.
function numberIcon(n: number, color: string) {
  return L.divIcon({
    className: "trip-pin",
    html: `<span style="background:${color}">${n}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

const hotelIcon = L.divIcon({
  className: "trip-pin trip-pin-hotel",
  html: "<span>🏨</span>",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -17],
});

function mapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  const key = points.map((p) => p.join(",")).join("|");
  useEffect(() => {
    if (points.length === 0) return;
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 15, animate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key]);
  return null;
}

export default function TripMap({ days, activeDay }: { days: Day[]; activeDay: number | "all" }) {
  const visibleDays = activeDay === "all" ? days : days.filter((d) => d.day === activeDay);

  const points = useMemo<[number, number][]>(() => {
    const all = visibleDays.flatMap((d) => d.activities.filter(hasCoords).map((a) => [a.lat, a.lng] as [number, number]));
    return all.length ? all : [[accommodation.lat, accommodation.lng]];
  }, [visibleDays]);

  return (
    <MapContainer
      center={[accommodation.lat, accommodation.lng]}
      zoom={12}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full"
    >
      <ZoomControl position="topright" zoomInTitle="ซูมเข้า" zoomOutTitle="ซูมออก" />
      <ThaiBaseMap />

      {visibleDays.map((day) => {
        const route = day.activities.filter(hasCoords);
        const stops = mapStops(day);
        return (
          <div key={day.day}>
            <Polyline
              positions={route.map((a) => [a.lat, a.lng])}
              pathOptions={{ color: day.color, weight: 4, opacity: 0.75, dashArray: "6 8" }}
            />
            {stops.map((a, i) => (
              <Marker key={`${day.day}-${i}`} position={[a.lat, a.lng]} icon={numberIcon(i + 1, day.color)}>
                <Tooltip direction="top" offset={[0, -14]} className="trip-tooltip">
                  {a.title}
                </Tooltip>
                <Popup>
                  {a.photo && placePhotos[a.photo] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={placePhotos[a.photo].src}
                      alt={a.title}
                      className="mb-1.5 h-28 w-56 rounded-md object-cover"
                    />
                  )}
                  <strong>
                    วันที่ {day.day} · จุดที่ {i + 1} · {a.time}
                  </strong>
                  <br />
                  {a.title}
                  {a.address ? (
                    <>
                      <br />
                      <span className="text-slate-500">{a.address}</span>
                    </>
                  ) : null}
                  <br />
                  <a href={mapsLink(a.lat, a.lng)} target="_blank" rel="noopener noreferrer" className="text-sky-700">
                    เปิดใน Google Maps ↗
                  </a>
                </Popup>
              </Marker>
            ))}
          </div>
        );
      })}

      <Marker position={[accommodation.lat, accommodation.lng]} icon={hotelIcon} zIndexOffset={1000}>
        <Tooltip permanent direction="top" offset={[0, -18]} className="trip-tooltip trip-tooltip-hotel">
          {accommodation.name}
        </Tooltip>
        <Popup>
          <strong>{accommodation.name}</strong>
          <br />
          {accommodation.address}
          <br />
          <a
            href={mapsLink(accommodation.lat, accommodation.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700"
          >
            เปิดใน Google Maps ↗
          </a>
        </Popup>
      </Marker>

      <FitBounds points={points} />
    </MapContainer>
  );
}
