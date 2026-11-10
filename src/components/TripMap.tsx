"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import type { Day } from "@/lib/itinerary";
import { accommodation, hasCoords, mapStops } from "@/lib/itinerary";

// OpenStreetMap tiles: free, no API key required.
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 15 });
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
      <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} maxZoom={19} />

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
