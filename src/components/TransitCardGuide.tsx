import { transitCards, type TransitCard } from "@/lib/itinerary";

function ContactlessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white/85">
      <path d="M8 10a4 4 0 0 1 5.66 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 7.5a7.5 7.5 0 0 1 10.6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10.8" cy="13.2" r="1.4" fill="currentColor" />
    </svg>
  );
}

function TrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white/85">
      <path
        d="M4 15V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M4 11h16M9 21l-2-2m10 2l2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CardMock({ card }: { card: TransitCard }) {
  const gradient = `linear-gradient(135deg, ${card.colorFrom}, ${card.colorTo})`;

  if (card.kind === "ic") {
    return (
      <div
        className="relative flex h-[132px] w-full flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-md"
        style={{ backgroundImage: gradient }}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"
          aria-hidden
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-[0.15em] text-white/70">{card.brand}</span>
          <ContactlessIcon />
        </div>
        <div>
          <p className="font-mono text-2xl font-bold italic text-white">{card.name}</p>
          <div className="mt-2 h-1.5 w-10 rounded-full bg-white/40" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[132px] w-full overflow-hidden rounded-2xl shadow-md" style={{ backgroundImage: gradient }}>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-[0.15em] text-white/70">{card.brand}</span>
          <TrainIcon />
        </div>
        <p className="text-lg font-bold leading-tight text-white">{card.name}</p>
        <div
          className="h-3 w-full rounded-sm"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.85) 0 2px, transparent 2px 5px)",
          }}
          aria-hidden
        />
      </div>
      <div className="flex w-9 flex-col items-center justify-center gap-2 border-l-2 border-dashed border-white/40">
        <span
          className="rotate-180 text-[9px] font-semibold tracking-[0.2em] text-white/70"
          style={{ writingMode: "vertical-rl" }}
        >
          TICKET
        </span>
      </div>
    </div>
  );
}

export default function TransitCardGuide() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {transitCards.map((card) => (
        <div
          key={card.id}
          className="flex flex-col gap-3 rounded-2xl border border-sky-100 bg-white shadow-sm shadow-sky-100 p-4"
        >
          <CardMock card={card} />
          <div className="space-y-1.5 text-xs">
            <p className="text-slate-600">
              <span className="font-semibold text-slate-800">ใช้ทำอะไร: </span>
              {card.usedFor}
            </p>
            <p className="text-slate-600">
              <span className="font-semibold text-slate-800">ซื้อที่ไหน: </span>
              {card.whereToBuy}
            </p>
            <p className="text-slate-600">
              <span className="font-semibold text-slate-800">ราคา: </span>
              {card.price}
            </p>
            {card.topUp && (
              <p className="rounded-md bg-amber-50 px-2 py-1 text-amber-800">
                <span className="font-semibold">เติมขั้นต่ำ: </span>
                {card.topUp}
              </p>
            )}
            {card.note && <p className="text-[11px] text-slate-400">{card.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
