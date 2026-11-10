"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import type { Activity, Day } from "@/lib/itinerary";
import { accommodation } from "@/lib/itinerary";

// Leaflet's default marker icons reference image paths that don't resolve
// correctly through Next.js's bundler, so point them at the CDN instead.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const hotelIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  className: "hotel-marker",
});

type LocatedActivity = Activity & { lat: number; lng: number };

function hasCoords(a: Activity): a is LocatedActivity {
  return typeof a.lat === "number" && typeof a.lng === "number";
}

function FitBounds({ points }: { points: { lat: number; lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

export default function TripMap({ days, activeDay }: { days: Day[]; activeDay: number | "all" }) {
  const visibleDays = activeDay === "all" ? days : days.filter((d) => d.day === activeDay);
  const points = visibleDays.flatMap((d) => d.activities.filter(hasCoords));

  return (
    <MapContainer
      center={[accommodation.lat, accommodation.lng]}
      zoom={12}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full"
    >
      <ZoomControl position="topright" zoomInTitle="ซูมเข้า" zoomOutTitle="ซูมออก" />
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <Marker position={[accommodation.lat, accommodation.lng]} icon={hotelIcon}>
        <Tooltip permanent direction="top" offset={[0, -46]} className="trip-tooltip trip-tooltip-hotel">
          🏨 {accommodation.name}
        </Tooltip>
        <Popup>
          <strong>{accommodation.name}</strong>
          <br />
          {accommodation.address}
          <br />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${accommodation.lat},${accommodation.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            เปิดใน Google Maps ↗
          </a>
        </Popup>
      </Marker>

      {visibleDays.map((day) => {
        const located = day.activities.filter(hasCoords);
        return (
          <div key={day.day}>
            <Polyline
              positions={located.map((a) => [a.lat, a.lng])}
              pathOptions={{ color: day.color, weight: 4, opacity: 0.7 }}
            />
            {located.map((a, i) => (
              <Marker key={`${day.day}-${i}`} position={[a.lat, a.lng]}>
                <Tooltip permanent direction="top" offset={[0, -30]} className="trip-tooltip">
                  {a.title}
                </Tooltip>
                <Popup>
                  <strong>
                    วันที่ {day.day} · {a.time}
                  </strong>
                  <br />
                  {a.title}
                  {a.address ? (
                    <>
                      <br />
                      <span className="text-gray-500">{a.address}</span>
                    </>
                  ) : null}
                  <br />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    เปิดใน Google Maps ↗
                  </a>
                </Popup>
              </Marker>
            ))}
          </div>
        );
      })}

      <FitBounds points={points.length ? points : [accommodation]} />
    </MapContainer>
  );
}
