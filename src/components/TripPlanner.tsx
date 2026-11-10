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
  trainGuide,
  transportationSummary,
  travelers,
  tripMeta,
} from "@/lib/itinerary";
import TransitCardGuide from "./TransitCardGuide";
import PackingChecklist from "./PackingChecklist";

const TripMap = dynamic(() => import("./TripMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
      กำลังโหลดแผนที่...
    </div>
  ),
});

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</div>
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{value}</div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-800 dark:text-blue-400">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function reservationBadgeClass(reservation: string) {
  return reservation === "ไม่ต้องจอง"
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
    : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
}

export default function TripPlanner() {
  const [activeDay, setActiveDay] = useState<number | "all">(1);
  const selectedDay = itinerary.find((d) => d.day === activeDay);
  const inbound = flights.find((f) => f.direction === "inbound");
  const outbound = flights.find((f) => f.direction === "outbound");

  return (
    <div className="min-h-dvh w-full bg-zinc-50 dark:bg-zinc-950">
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-10 text-center text-white">
        <p className="text-xs font-semibold tracking-[0.3em] text-blue-200">แผนการท่องเที่ยว</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{tripMeta.title}</h1>
        <p className="mt-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
          {tripMeta.dateRange} · {tripMeta.nights} คืน
        </p>
      </header>

      <div className="mx-auto -mt-6 grid max-w-5xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
        <InfoCard icon="✈️" label="ปลายทาง" value={tripMeta.destination} />
        <InfoCard icon="📅" label="วันเดินทาง" value={tripMeta.dateRange} />
        <InfoCard icon="👥" label="ผู้เดินทาง" value={`${tripMeta.travelersCount} ท่าน`} />
        <InfoCard icon="🏨" label="ที่พัก" value={accommodation.name} />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-800 dark:text-amber-400">
            🧭 ความเป็นไปได้ของทริป: {feasibilityAssessment.verdict}
          </h3>
          <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
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
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {f.direction === "inbound" ? "ขาไป" : "ขากลับ"} · {f.airline} {f.flightNo}
                    </div>
                    <div className="text-zinc-500">{f.route}</div>
                    <div className="text-zinc-500">
                      {f.date} · {f.depart} → {f.arrive} ({f.duration})
                    </div>
                  </div>
                ),
            )}
          </div>
        </SectionCard>

        <SectionCard title="ที่พัก" icon="🛏️">
          <div className="text-sm">
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              {accommodation.name} {"⭐".repeat(accommodation.stars)}
            </div>
            <div className="mt-1 text-zinc-500">{accommodation.address}</div>
            <div className="mt-1 text-zinc-500">โทร: {accommodation.tel}</div>
            <div className="mt-2 flex gap-4 text-zinc-500">
              <span>เช็กอิน: {accommodation.checkIn}</span>
              <span>เช็กเอาต์: {accommodation.checkOut}</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">{accommodation.transportNote}</p>
          </div>
        </SectionCard>

        <SectionCard title="ผู้เดินทาง" icon="👤">
          <ul className="space-y-1.5 text-sm">
            {travelers.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-zinc-400">{i + 1}.</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{t.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800">
            <div className="mb-1 font-semibold text-red-600">เบอร์ติดต่อฉุกเฉิน</div>
            {emergencyContacts.map((c, i) => (
              <div key={i} className="text-zinc-500">
                {c.label}: <span className="text-zinc-700 dark:text-zinc-300">{c.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h2 className="mr-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">แผนการเดินทางรายวัน</h2>
          <button
            onClick={() => setActiveDay("all")}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeDay === "all"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
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
                  ? "text-white dark:text-black"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
              style={activeDay === d.day ? { backgroundColor: d.color } : undefined}
            >
              วันที่ {d.day}
            </button>
          ))}
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 md:h-[560px] md:flex-row">
          <div className="order-2 max-h-96 w-full overflow-y-auto bg-white p-4 dark:bg-zinc-900 md:order-1 md:max-h-none md:w-96">
            {(selectedDay ? [selectedDay] : itinerary).map((day) => (
              <div key={day.day} className="mb-6 last:mb-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: day.color }} />
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    วันที่ {day.day} · {day.date} ({day.weekday}) — {day.title}
                  </h3>
                </div>

                <div className="mb-3 space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">การเดินทางวันนี้</div>
                  {day.transportLegs.map((leg, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-zinc-200 bg-white p-2.5 text-xs dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">🚆 {leg.mode}</span>
                        <span
                          className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${reservationBadgeClass(
                            leg.reservation,
                          )}`}
                        >
                          {leg.reservation}
                        </span>
                      </div>
                      <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1 text-zinc-500">
                        <span>🎫 {leg.ticket}</span>
                        <span>💴 {leg.price}</span>
                        <span className="col-span-2">🕐 {leg.time}</span>
                      </div>
                      {leg.note && <div className="mt-1.5 text-[11px] text-zinc-400">{leg.note}</div>}
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 rounded-lg bg-zinc-50 p-2 text-xs text-zinc-500 dark:bg-zinc-800/60">
                    <span>ค่าเดินทาง: {day.budget.transport}</span>
                    <span>ค่าเข้าชม: {day.budget.entrance}</span>
                    <span>ค่าอาหาร: {day.budget.meals}</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">รวม: {day.budget.total}</span>
                  </div>
                </div>

                <ol className="ml-1 space-y-3 border-l-2 border-zinc-200 pl-4 dark:border-zinc-800">
                  {day.activities.map((a, i) => (
                    <li key={i} className="text-sm">
                      <div className="text-xs font-semibold text-zinc-400">{a.time}</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">{a.title}</span>
                        {a.lat != null && a.lng != null && (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-[11px] font-medium text-blue-600 hover:underline dark:text-blue-400"
                          >
                            เปิดใน Maps ↗
                          </a>
                        )}
                      </div>
                      {a.transportation && (
                        <div className="text-xs text-zinc-500">
                          🚉 {a.transportation}
                          {a.duration ? ` · ${a.duration}` : ""}
                        </div>
                      )}
                      {a.note && (
                        <div className="mt-1 rounded-md bg-orange-50 px-2 py-1 text-xs text-orange-800 dark:bg-orange-950/30 dark:text-orange-300">
                          🍜 {a.note}
                          {a.mapsQuery && (
                            <>
                              {" "}
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.mapsQuery)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                              >
                                หาร้านแถวนี้ ↗
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
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
        <h2 className="mb-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">🎫 บัตรและตั๋วที่ต้องใช้ในทริปนี้</h2>
        <p className="mb-4 text-sm text-zinc-500">
          รวมทุกใบที่ต้องเตรียม ตั้งแต่บัตรแตะรถไฟรายวัน ไปจนถึงตั๋วเฉพาะทริปเดย์ทริป
        </p>
        <TransitCardGuide />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <SectionCard title="รถไฟที่ต้องนั่งในทริปนี้" icon="🚃">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs uppercase text-zinc-400 dark:border-zinc-800">
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
                  <tr key={i} className="border-b border-zinc-100 align-top last:border-0 dark:border-zinc-800">
                    <td className="py-2.5 pr-3 font-medium text-zinc-800 dark:text-zinc-200">{t.name}</td>
                    <td className="py-2.5 pr-3 text-zinc-500">{t.usedOn}</td>
                    <td className="py-2.5 pr-3 text-zinc-500">{t.type}</td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${reservationBadgeClass(
                          t.reservation,
                        )}`}
                      >
                        {t.reservation}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-zinc-500">{t.seating}</td>
                    <td className="py-2.5 text-zinc-500">
                      {t.cards}
                      {t.note && <div className="mt-1 text-[11px] text-zinc-400">{t.note}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <h2 className="mb-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">🧳 สภาพอากาศ & เช็กลิสต์แพ็กกระเป๋า</h2>
        <p className="mb-4 text-sm text-zinc-500">
          ธันวาคมคือฤดูหนาวของโตเกียว อากาศแห้งและหนาวเย็น เตรียมของให้ครบก่อนเดินทาง
        </p>
        <PackingChecklist />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <SectionCard title="สรุปงบประมาณโดยประมาณ (ต่อคน)" icon="💰">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs uppercase text-zinc-400 dark:border-zinc-800">
                  <th className="py-2 pr-2">วัน</th>
                  <th className="py-2 pr-2">ค่าเดินทาง</th>
                  <th className="py-2 pr-2">ค่าเข้าชม</th>
                  <th className="py-2 pr-2">ค่าอาหาร</th>
                  <th className="py-2 text-right">รวม/วัน</th>
                </tr>
              </thead>
              <tbody>
                {itinerary.map((d) => (
                  <tr key={d.day} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                    <td className="py-2 pr-2 font-medium text-zinc-800 dark:text-zinc-200">วันที่ {d.day}</td>
                    <td className="py-2 pr-2 text-zinc-500">{d.budget.transport}</td>
                    <td className="py-2 pr-2 text-zinc-500">{d.budget.entrance}</td>
                    <td className="py-2 pr-2 text-zinc-500">{d.budget.meals}</td>
                    <td className="py-2 text-right font-semibold text-zinc-700 dark:text-zinc-300">
                      {d.budget.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-1 border-t border-zinc-100 pt-3 text-sm dark:border-zinc-800">
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              รวมทั้งทริป: {budgetGrandTotal.perPersonExcludingFlightHotel}
            </div>
            <div className="text-zinc-500">งบช้อปปิ้งส่วนตัวแนะนำ: {budgetGrandTotal.shoppingBudgetSuggestion}</div>
            <div className="text-xs text-zinc-400">{budgetGrandTotal.note}</div>
          </div>
        </SectionCard>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 px-4 pb-12 lg:grid-cols-2">
        <SectionCard title="สรุปการเดินทาง" icon="🚆">
          <ul className="space-y-1.5 text-sm">
            {transportationSummary.map((t, i) => (
              <li key={i} className="text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{t.label}:</span> {t.value}
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="ข้อควรทราบ" icon="✅">
          <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            {importantNotes.map((n, i) => (
              <li key={i}>✔ {n}</li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <footer className="bg-blue-900 py-4 text-center text-sm font-medium tracking-wide text-white">
        ขอให้เดินทางปลอดภัยและมีความสุข!
      </footer>
    </div>
  );
}
