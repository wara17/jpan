import { taxRefundGuide, type TaxGuideSection } from "@/lib/itinerary";

const toneClasses: Record<TaxGuideSection["tone"], { card: string; title: string; bullet: string }> = {
  sky: { card: "border-sky-200 bg-sky-50/60", title: "text-sky-800", bullet: "bg-sky-500" },
  emerald: { card: "border-emerald-200 bg-emerald-50/60", title: "text-emerald-800", bullet: "bg-emerald-500" },
  amber: { card: "border-amber-200 bg-amber-50/70", title: "text-amber-800", bullet: "bg-amber-500" },
  rose: { card: "border-rose-200 bg-rose-50/60", title: "text-rose-800", bullet: "bg-rose-500" },
};

export default function TaxRefundGuide() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <span className="text-xl">⚠️</span>
        <p>
          <span className="font-bold">สำคัญที่สุด:</span> วันกลับ (9 ธ.ค.) ต้องไปยืนยันของ Tax-Free กับศุลกากรที่นาริตะ{" "}
          <span className="font-bold underline decoration-amber-400 underline-offset-2">ก่อนโหลดกระเป๋า</span>{" "}
          ไม่งั้นจะไม่ได้เงินภาษีคืน — ระบบใหม่ร้านจะเก็บภาษีเต็มตอนซื้อ แล้วค่อยคืนให้ทีหลัง
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {taxRefundGuide.map((section) => {
          const tone = toneClasses[section.tone];
          return (
            <div key={section.id} className={`rounded-2xl border p-5 ${tone.card}`}>
              <h3 className={`mb-3 flex items-center gap-2 text-sm font-bold ${tone.title}`}>
                <span className="text-lg">{section.icon}</span>
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.bullet}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400">
        ข้อมูล ณ พฤศจิกายน 2569 (หลังญี่ปุ่นเริ่มใช้ระบบคืนภาษีแบบใหม่) รายละเอียดเช่นช่องทางคืนเงินและค่าธรรมเนียมขึ้นกับแต่ละร้าน
        ควรเช็กกับร้านตอนซื้อ และดูประกาศของสนามบินนาริตะ / กรมศุลกากรไทยอีกครั้งก่อนเดินทาง
      </p>
    </div>
  );
}
