import type { Day } from "@/lib/itinerary";
import { mapStops } from "@/lib/itinerary";
import { placePhotos } from "@/lib/photos";

/** Horizontal strip of photos for the places visited on one day. */
export default function DayPhotos({ day }: { day: Day }) {
  const stops = mapStops(day);
  const seen = new Set<string>();
  const items = day.activities.flatMap((a) => {
    const photo = a.photo ? placePhotos[a.photo] : undefined;
    if (!photo || seen.has(a.photo!)) return [];
    seen.add(a.photo!);
    const stopNo = stops.findIndex((s) => s === a) + 1;
    return [{ a, photo, stopNo }];
  });
  if (items.length === 0) return null;

  return (
    <div className="-mx-1 mb-3 flex snap-x gap-2.5 overflow-x-auto px-1 pb-1">
      {items.map(({ a, photo, stopNo }) => (
        <figure
          key={a.photo}
          className="relative w-40 shrink-0 snap-start overflow-hidden rounded-xl bg-sky-100 shadow-sm ring-1 ring-sky-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={a.title}
            title={`ภาพ: ${photo.credit} (${photo.license})`}
            loading="lazy"
            className="h-24 w-full object-cover"
          />
          {stopNo > 0 && (
            <span
              className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white"
              style={{ backgroundColor: day.color }}
            >
              {stopNo}
            </span>
          )}
          <figcaption className="line-clamp-2 bg-white px-2 py-1.5 text-[11px] font-medium leading-snug text-slate-700">
            {a.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Attribution list required by the photos' Creative Commons licenses. */
export function PhotoCredits() {
  return (
    <details className="text-xs text-slate-500">
      <summary className="cursor-pointer select-none font-medium text-slate-600">📷 เครดิตภาพสถานที่</summary>
      <ul className="mt-2 grid gap-1 sm:grid-cols-2">
        {Object.entries(placePhotos).map(([key, p]) => (
          <li key={key}>
            {p.label}:{" "}
            <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline">
              {p.credit}
            </a>{" "}
            ({p.license}) — Wikimedia Commons
          </li>
        ))}
      </ul>
    </details>
  );
}
