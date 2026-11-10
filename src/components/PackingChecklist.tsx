"use client";

import { useEffect, useState } from "react";
import { climateInfo, packingChecklist } from "@/lib/itinerary";

const STORAGE_KEY = "japan-way-packing-checked";

export default function PackingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {
      // ignore corrupt/unavailable storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked, loaded]);

  const totalItems = packingChecklist.reduce((sum, c) => sum + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs text-zinc-400">อุณหภูมิสูงสุด</p>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{climateInfo.avgHigh}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs text-zinc-400">อุณหภูมิต่ำสุด</p>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{climateInfo.avgLow}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs text-zinc-400">ปริมาณฝน</p>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">น้อย</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs text-zinc-400">พระอาทิตย์ตก</p>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{climateInfo.sunset}</p>
        </div>
      </div>
      <p className="text-xs text-zinc-400">{climateInfo.summary}</p>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">เช็กลิสต์แพ็กกระเป๋า</h3>
        <span className="text-xs font-medium text-zinc-500">
          เตรียมแล้ว {checkedCount}/{totalItems}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: totalItems ? `${(checkedCount / totalItems) * 100}%` : "0%" }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {packingChecklist.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              <span>{category.icon}</span>
              {category.title}
            </h4>
            <ul className="space-y-1.5">
              {category.items.map((item, i) => {
                const id = `${category.id}-${i}`;
                return (
                  <li key={id}>
                    <label className="flex cursor-pointer items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!checked[id]}
                        onChange={() => toggle(id)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 accent-emerald-600 dark:border-zinc-700"
                      />
                      <span
                        className={
                          checked[id] ? "text-zinc-400 line-through" : "text-zinc-600 dark:text-zinc-400"
                        }
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
