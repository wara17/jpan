"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  accommodation,
  budgetGrandTotal,
  emergencyContacts,
  feasibilityAssessment,
  flights,
  importantNotes,
  itinerary,
  mapStops,
  trainGuide,
  transportationSummary,
  travelers,
  tripMeta,
  type LocatedActivity,
} from "@/lib/itinerary";
import TransitCardGuide from "./TransitCardGuide";
import PackingChecklist from "./PackingChecklist";
import DayPhotos, { PhotoCredits } from "./DayPhotos";
import TaxRefundGuide from "./TaxRefundGuide";

const TripMap = dynamic(() => import("./TripMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
      กำลังโหลดแผนที่...
    </div>
  ),
});

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-white shadow-sm shadow-sky-100 p-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
        <div className="text-sm font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white shadow-sm shadow-sky-100 p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-800">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function reservationBadgeClass(reservation: string) {
  return reservation === "ไม่ต้องจอง"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";
}

export default function TripPlanner() {
  const [activeDay, setActiveDay] = useState<number | "all">(1);
  const selectedDay = itinerary.find((d) => d.day === activeDay);
  const inbound = flights.find((f) => f.direction === "inbound");
  const outbound = flights.find((f) => f.direction === "outbound");

  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-sky-50 via-white to-sky-50">
      <header className="winter-header relative overflow-hidden bg-gradient-to-br from-sky-700 via-sky-500 to-cyan-300 px-6 pb-14 pt-10 text-center text-white">
        <div className="snowfall" aria-hidden />
        <p className="relative text-xs font-semibold tracking-[0.3em] text-sky-100">❄ แผนการท่องเที่ยวฤดูหนาว ❄</p>
        <h1 className="relative mt-2 text-3xl font-bold tracking-tight drop-shadow-sm sm:text-4xl">{tripMeta.title}</h1>
        <p className="relative mt-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium ring-1 ring-white/40 backdrop-blur">
          {tripMeta.dateRange} · {tripMeta.nights} คืน
        </p>
      </header>

      <div className="relative mx-auto -mt-8 grid max-w-5xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
        <InfoCard icon="✈️" label="ปลายทาง" value={tripMeta.destination} />
        <InfoCard icon="📅" label="วันเดินทาง" value={tripMeta.dateRange} />
        <InfoCard icon="👥" label="ผู้เดินทาง" value={`${tripMeta.travelersCount} ท่าน`} />
        <InfoCard icon="🏨" label="ที่พัก" value={accommodation.name} />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-800">
            🧭 ความเป็นไปได้ของทริป: {feasibilityAssessment.verdict}
          </h3>
          <ul className="space-y-1.5 text-sm text-slate-700">
            {feasibilityAssessment.points.map((point, i) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 px-4 lg:grid-cols-3">
        <SectionCard title="รายละเอียดเที่ยวบิน" icon="✈️">
          <div className="space-y-3 text-sm">
            {[inbound, outbound].map(
              (f) =>
                f && (
                  <div key={f.direction}>
                    <div className="font-semibold text-slate-800">
                      {f.direction === "inbound" ? "ขาไป" : "ขากลับ"} · {f.airline} {f.flightNo}
                    </div>
                    <div className="text-slate-500">{f.route}</div>
                    <div className="text-slate-500">
                      {f.date} · {f.depart} → {f.arrive} ({f.duration})
                    </div>
                  </div>
                ),
            )}
          </div>
        </SectionCard>

        <SectionCard title="ที่พัก" icon="🛏️">
          <div className="text-sm">
            <div className="font-semibold text-slate-800">
              {accommodation.name} {"⭐".repeat(accommodation.stars)}
            </div>
            <div className="mt-1 text-slate-500">{accommodation.address}</div>
            <div className="mt-1 text-slate-500">โทร: {accommodation.tel}</div>
            <div className="mt-2 flex gap-4 text-slate-500">
              <span>เช็กอิน: {accommodation.checkIn}</span>
              <span>เช็กเอาต์: {accommodation.checkOut}</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{accommodation.transportNote}</p>
          </div>
        </SectionCard>

        <SectionCard title="ผู้เดินทาง" icon="👤">
          <ul className="space-y-1.5 text-sm">
            {travelers.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-slate-400">{i + 1}.</span>
                <span className="font-medium text-slate-800">{t.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-sky-50 pt-3 text-xs">
            <div className="mb-1 font-semibold text-red-600">เบอร์ติดต่อฉุกเฉิน</div>
            {emergencyContacts.map((c, i) => (
              <div key={i} className="text-slate-500">
                {c.label}: <span className="text-slate-700">{c.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h2 className="mr-2 text-lg font-bold text-slate-900">แผนการเดินทางรายวัน</h2>
          <button
            onClick={() => setActiveDay("all")}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeDay === "all"
                ? "bg-sky-700 text-white"
                : "bg-sky-50 text-slate-700 hover:bg-sky-100"
            }`}
          >
            ทุกวัน
          </button>
          {itinerary.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                activeDay === d.day
                  ? "text-white"
                  : "bg-sky-50 text-slate-700 hover:bg-sky-100"
              }`}
              style={activeDay === d.day ? { backgroundColor: d.color } : undefined}
            >
              วันที่ {d.day}
            </button>
          ))}
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm shadow-sky-100 md:h-[560px] md:flex-row">
          <div className="order-2 max-h-96 w-full overflow-y-auto bg-white p-4 md:order-1 md:max-h-none md:w-96">
            {(selectedDay ? [selectedDay] : itinerary).map((day) => (
              <div key={day.day} className="mb-6 last:mb-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: day.color }} />
                  <h3 className="text-sm font-bold text-slate-900">
                    วันที่ {day.day} · {day.date} ({day.weekday}) — {day.title}
                  </h3>
                </div>

                <DayPhotos day={day} />

                <div className="mb-3 space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">การเดินทางวันนี้</div>
                  {day.transportLegs.map((leg, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-sky-100 bg-white p-2.5 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-800">🚆 {leg.mode}</span>
                        <span
                          className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${reservationBadgeClass(
                            leg.reservation,
                          )}`}
                        >
                          {leg.reservation}
                        </span>
                      </div>
                      <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1 text-slate-500">
                        <span>🎫 {leg.ticket}</span>
                        <span>💴 {leg.price}</span>
                        <span className="col-span-2">🕐 {leg.time}</span>
                      </div>
                      {leg.note && <div className="mt-1.5 text-[11px] text-slate-400">{leg.note}</div>}
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 rounded-lg bg-sky-50/70 p-2 text-xs text-slate-500">
                    <span>ค่าเดินทาง: {day.budget.transport}</span>
                    <span>ค่าเข้าชม: {day.budget.entrance}</span>
                    <span>ค่าอาหาร: {day.budget.meals}</span>
                    <span className="font-semibold text-slate-700">รวม: {day.budget.total}</span>
                  </div>
                </div>

                <ol className="ml-1 space-y-3 border-l-2 border-sky-100 pl-4">
                  {day.activities.map((a, i) => {
                    const stopNo = mapStops(day).indexOf(a as LocatedActivity) + 1;
                    return (
                    <li key={i} className="text-sm">
                      <div className="text-xs font-semibold text-slate-400">{a.time}</div>
                      <div className="flex items-baseline gap-1.5">
                        {stopNo > 0 && (
                          <span
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center self-center rounded-full text-[10px] font-bold text-white"
                            style={{ backgroundColor: day.color }}
                          >
                            {stopNo}
                          </span>
                        )}
                        <span className="font-medium text-slate-800">{a.title}</span>
                        {a.lat != null && a.lng != null && (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-[11px] font-medium text-sky-700 hover:underline"
                          >
                            เปิดใน Maps ↗
                          </a>
                        )}
                      </div>
                      {a.transportation && (
                        <div className="text-xs text-slate-500">
                          🚉 {a.transportation}
                          {a.duration ? ` · ${a.duration}` : ""}
                        </div>
                      )}
                      {a.note && (
                        <div className="mt-1 rounded-md bg-orange-50 px-2 py-1 text-xs text-orange-800">
                          {a.mapsQuery ? "🍜" : "💡"} {a.note}
                          {a.mapsQuery && (
                            <>
                              {" "}
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.mapsQuery)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-sky-700 hover:underline"
                              >
                                หาร้านแถวนี้ ↗
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
          <div className="order-1 h-72 flex-1 md:order-2 md:h-auto">
            <TripMap days={itinerary} activeDay={activeDay} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <h2 className="mb-1 text-lg font-bold text-slate-900">🎫 บัตรและตั๋วที่ต้องใช้ในทริปนี้</h2>
        <p className="mb-4 text-sm text-slate-500">
          รวมทุกใบที่ต้องเตรียม ตั้งแต่บัตรแตะรถไฟรายวัน ไปจนถึงตั๋วเฉพาะทริปเดย์ทริป
        </p>
        <TransitCardGuide />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <SectionCard title="รถไฟที่ต้องนั่งในทริปนี้" icon="🚃">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-sky-100 text-left text-xs uppercase text-slate-400">
                  <th className="py-2 pr-3">สายรถไฟ</th>
                  <th className="py-2 pr-3">ใช้วันไหน</th>
                  <th className="py-2 pr-3">ประเภทรถ</th>
                  <th className="py-2 pr-3">ต้องจองไหม</th>
                  <th className="py-2 pr-3">นั่ง/ยืน</th>
                  <th className="py-2">บัตร/ตั๋วที่ใช้ได้</th>
                </tr>
              </thead>
              <tbody>
                {trainGuide.map((t, i) => (
                  <tr key={i} className="border-b border-sky-50 align-top last:border-0">
                    <td className="py-2.5 pr-3 font-medium text-slate-800">{t.name}</td>
                    <td className="py-2.5 pr-3 text-slate-500">{t.usedOn}</td>
                    <td className="py-2.5 pr-3 text-slate-500">{t.type}</td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${reservationBadgeClass(
                          t.reservation,
                        )}`}
                      >
                        {t.reservation}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-slate-500">{t.seating}</td>
                    <td className="py-2.5 text-slate-500">
                      {t.cards}
                      {t.note && <div className="mt-1 text-[11px] text-slate-400">{t.note}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <h2 className="mb-1 text-lg font-bold text-slate-900">🧳 สภาพอากาศ & เช็กลิสต์แพ็กกระเป๋า</h2>
        <p className="mb-4 text-sm text-slate-500">
          ธันวาคมคือฤดูหนาวของโตเกียว อากาศแห้งและหนาวเย็น เตรียมของให้ครบก่อนเดินทาง
        </p>
        <PackingChecklist />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <h2 className="mb-1 text-lg font-bold text-slate-900">💴 คืนภาษี (Tax Refund) ที่ควรรู้</h2>
        <p className="mb-4 text-sm text-slate-500">
          ช้อปแบบ Tax-Free ในญี่ปุ่น และของที่นำกลับเข้าไทย — ทริปนี้ใช้ระบบคืนภาษีแบบใหม่ของญี่ปุ่น
        </p>
        <TaxRefundGuide />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <SectionCard title="สรุปงบประมาณโดยประมาณ (ต่อคน)" icon="💰">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sky-100 text-left text-xs uppercase text-slate-400">
                  <th className="py-2 pr-2">วัน</th>
                  <th className="py-2 pr-2">ค่าเดินทาง</th>
                  <th className="py-2 pr-2">ค่าเข้าชม</th>
                  <th className="py-2 pr-2">ค่าอาหาร</th>
                  <th className="py-2 text-right">รวม/วัน</th>
                </tr>
              </thead>
              <tbody>
                {itinerary.map((d) => (
                  <tr key={d.day} className="border-b border-sky-50 last:border-0">
                    <td className="py-2 pr-2 font-medium text-slate-800">วันที่ {d.day}</td>
                    <td className="py-2 pr-2 text-slate-500">{d.budget.transport}</td>
                    <td className="py-2 pr-2 text-slate-500">{d.budget.entrance}</td>
                    <td className="py-2 pr-2 text-slate-500">{d.budget.meals}</td>
                    <td className="py-2 text-right font-semibold text-slate-700">
                      {d.budget.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-1 border-t border-sky-50 pt-3 text-sm">
            <div className="font-semibold text-slate-800">
              รวมทั้งทริป: {budgetGrandTotal.perPersonExcludingFlightHotel}
            </div>
            <div className="text-slate-500">งบช้อปปิ้งส่วนตัวแนะนำ: {budgetGrandTotal.shoppingBudgetSuggestion}</div>
            <div className="text-xs text-slate-400">{budgetGrandTotal.note}</div>
          </div>
        </SectionCard>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 px-4 pb-12 lg:grid-cols-2">
        <SectionCard title="สรุปการเดินทาง" icon="🚆">
          <ul className="space-y-1.5 text-sm">
            {transportationSummary.map((t, i) => (
              <li key={i} className="text-slate-600">
                <span className="font-medium text-slate-800">{t.label}:</span> {t.value}
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="ข้อควรทราบ" icon="✅">
          <ul className="space-y-1.5 text-sm text-slate-600">
            {importantNotes.map((n, i) => (
              <li key={i}>✔ {n}</li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-8">
        <PhotoCredits />
      </div>

      <footer className="bg-gradient-to-r from-sky-700 to-sky-500 py-5 text-center text-sm font-medium tracking-wide text-white">
        ❄ ขอให้เดินทางปลอดภัยและมีความสุข! ❄
      </footer>
    </div>
  );
}
