import { luggageShops, luggageTips, type LuggageShop } from "@/lib/itinerary";

const tierClass: Record<LuggageShop["tier"], string> = {
  ประหยัด: "bg-emerald-100 text-emerald-700",
  ปานกลาง: "bg-sky-100 text-sky-700",
  "ปานกลาง–สูง": "bg-indigo-100 text-indigo-700",
  สูง: "bg-rose-100 text-rose-700",
};

export default function LuggageGuide() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {luggageShops.map((shop) => (
          <div
            key={shop.name}
            className="flex flex-col rounded-2xl border border-sky-100 bg-white p-4 shadow-sm shadow-sky-100"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-800">🧳 {shop.name}</h3>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${tierClass[shop.tier]}`}>
                {shop.tier}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              📍 {shop.area} · {shop.nearDay}
            </p>
            <p className="mt-2 flex-1 text-sm text-slate-600">{shop.description}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-xs font-medium text-sky-700 hover:underline"
            >
              ค้นหาสาขาใกล้ที่สุดใน Maps ↗
            </a>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-sky-800">✈️ เรื่องน้ำหนักกระเป๋า & เคล็ดลับ</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {luggageTips.map((tip, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-slate-400">
        สต๊อกและราคาแต่ละสาขาไม่เท่ากัน ลิงก์จะค้นหาสาขาใกล้ที่สุดใน Google Maps — กฎกระเป๋าของ ZIPAIR ขึ้นกับประเภทตั๋ว
        ควรเช็กในหน้าการจองอีกครั้ง
      </p>
    </div>
  );
}
