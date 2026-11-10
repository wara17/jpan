export type TripMeta = {
  title: string;
  destination: string;
  dateRange: string;
  nights: number;
  travelersCount: number;
};

export type Flight = {
  direction: "inbound" | "outbound";
  airline: string;
  flightNo: string;
  route: string;
  date: string;
  depart: string;
  arrive: string;
  duration: string;
};

export type Accommodation = {
  name: string;
  stars: number;
  address: string;
  tel: string;
  checkIn: string;
  checkOut: string;
  transportNote: string;
  lat: number;
  lng: number;
};

export type Traveler = { name: string };

export type EmergencyContact = { label: string; value: string };

export type Activity = {
  time: string;
  title: string;
  address?: string;
  transportation?: string;
  duration?: string;
  lat?: number;
  lng?: number;
  note?: string;
  mapsQuery?: string;
  /** Key into `placePhotos` (src/lib/photos.ts) */
  photo?: string;
};

export type DayBudget = {
  transport: string;
  entrance: string;
  meals: string;
  total: string;
};

export type TransportLeg = {
  mode: string;
  ticket: string;
  price: string;
  time: string;
  reservation: "ต้องจอง" | "แนะนำจอง" | "ไม่ต้องจอง";
  note?: string;
};

export type Day = {
  day: number;
  date: string;
  weekday: string;
  title: string;
  color: string;
  activities: Activity[];
  transportLegs: TransportLeg[];
  budget: DayBudget;
};

export type TrainGuideEntry = {
  name: string;
  usedOn: string;
  type: string;
  reservation: string;
  seating: string;
  cards: string;
  note?: string;
};

export type TransitCard = {
  id: string;
  name: string;
  brand: string;
  kind: "ic" | "ticket" | "pass";
  colorFrom: string;
  colorTo: string;
  usedFor: string;
  whereToBuy: string;
  price: string;
  topUp?: string;
  note?: string;
};

export type PackingCategory = {
  id: string;
  title: string;
  icon: string;
  items: string[];
};

export type ClimateInfo = {
  avgHigh: string;
  avgLow: string;
  rainfall: string;
  sunset: string;
  summary: string;
};

export const tripMeta: TripMeta = {
  title: "โตเกียว & คามาคุระ ญี่ปุ่น",
  destination: "โตเกียว & คามาคุระ ญี่ปุ่น",
  dateRange: "5 – 9 ธันวาคม 2569 (2026)",
  nights: 4,
  travelersCount: 3,
};

export const flights: Flight[] = [
  {
    direction: "inbound",
    airline: "ZIPAIR",
    flightNo: "ZG052",
    route: "กรุงเทพฯ (BKK) → นาริตะ (NRT)",
    date: "4 ธันวาคม 2569",
    depart: "23:45 น. (เวลาไทย)",
    arrive: "07:30 น. (เวลาญี่ปุ่น) วันที่ 5 ธ.ค.",
    duration: "6 ชม. 45 นาที",
  },
  {
    direction: "outbound",
    airline: "ZIPAIR",
    flightNo: "ZG051",
    route: "นาริตะ (NRT) → กรุงเทพฯ (BKK)",
    date: "9 ธันวาคม 2569",
    depart: "17:00 น. (เวลาญี่ปุ่น)",
    arrive: "22:30 น. (เวลาไทย)",
    duration: "6 ชม. 30 นาที",
  },
];

export const accommodation: Accommodation = {
  name: "Hotel MYSTAYS Ueno East",
  stars: 3,
  address: "5-5-6 Higashiueno, Taito-ku, Tokyo 110-0015, Japan",
  tel: "+81-3-5826-3871",
  checkIn: "15:00 น.",
  checkOut: "11:00 น.",
  transportNote:
    "นั่ง Keisei Skyliner จากสนามบินนาริตะ มาลงสถานี Keisei Ueno (ประมาณ 41 นาที) แล้วเดินอีก 4 นาทีถึงโรงแรม",
  lat: 35.7128,
  lng: 139.7825,
};

export const travelers: Traveler[] = [
  { name: "CHATCHON YODKHEW" },
  { name: "WARAYUT SANGGSUK" },
  { name: "KARN PUNPERM" },
];

export const emergencyContacts: EmergencyContact[] = [
  { label: "เหตุฉุกเฉินในญี่ปุ่น", value: "110 (ตำรวจ) / 119 (รถพยาบาล)" },
  { label: "สถานทูตไทยในญี่ปุ่น", value: "+81-3-3221-9481" },
  { label: "ที่อยู่สถานทูต", value: "8-1-14 Akasaka, Minato-ku, Tokyo 107-0052" },
];

export const feasibilityAssessment = {
  verdict: "เป็นไปได้จริง แต่ตารางค่อนข้างแน่น (fast-paced)",
  points: [
    "Day 3 (คามาคุระ): เดินทางไป-กลับด้วย JR Yokosuka รวมประมาณ 2 ชม. จากเวลาที่มี 08:00-19:00 น. (11 ชม.) เหลือเวลาเที่ยวจริง ~7-8 ชม. เพียงพอสำหรับ 4 จุดหมาย แต่ควรออกจากโรงแรมให้ตรงเวลา",
    "Day 2 และ Day 4: จุดหมายอยู่ห่างกันพอสมควร (ชินจุกุ-ชิบูย่า-นากาเมกุโระ / สกายทรี-อากิฮาบาระ-โอไดบะ) ควรเผื่อเวลาเดินทางเพิ่มจุดละ 15-30 นาที เพราะเวลาต่อรถจริงมักช้ากว่าที่แผนที่ประเมิน",
    "แนะนำซื้อ Tokyo Subway 72-hour Ticket ตั้งแต่วันแรกที่สนามบิน จะสะดวกและประหยัดกว่าซื้อตั๋วเที่ยวเดียวทุกวัน",
    "ควรเผื่อเวลา Buffer วันละ 30-60 นาที สำหรับรถไฟล่าช้าหรือคิวร้านอาหาร/สถานที่ท่องเที่ยว",
    "ตารางนี้เหมาะกับกลุ่มที่ชอบเที่ยวเยอะและเดินไหว มากกว่ากลุ่มที่ต้องการพักผ่อนสบายๆ",
  ],
};

export const itinerary: Day[] = [
  {
    day: 1,
    date: "5 ธ.ค.",
    weekday: "ศุกร์",
    title: "ถึงโตเกียว - อาซากุสะ & อุเอโนะ",
    color: "#e11d48",
    transportLegs: [
      {
        mode: "Keisei Skyliner (สนามบินนาริตะ → Keisei Ueno)",
        ticket: "ตั๋ว Skyliner (ที่นั่งกำหนด)",
        price: "2,570 เยน (~590 บาท) เที่ยวเดียว",
        time: "08:30 น. (รถออกทุก 20–40 นาที)",
        reservation: "แนะนำจอง",
        note: "ซื้อออนไลน์ล่วงหน้าหรือที่เคาน์เตอร์ Keisei ในสนามบินได้ทันที ไม่บังคับจองแต่ช่วงเร่งด่วนอาจเต็ม",
      },
      {
        mode: "Tokyo Metro สาย Ginza (Ueno → Asakusa)",
        ticket: "บัตร IC (Suica/Pasmo) หรือตั๋วเที่ยวเดียว",
        price: "180 เยน (~42 บาท)",
        time: "11:00 น. (รถทุก 3–5 นาที)",
        reservation: "ไม่ต้องจอง",
      },
      {
        mode: "Tokyo Metro สาย Ginza (Asakusa → Ueno, ขากลับที่พัก)",
        ticket: "บัตร IC (Suica/Pasmo) หรือตั๋วเที่ยวเดียว",
        price: "180 เยน (~42 บาท)",
        time: "16:00 น.",
        reservation: "ไม่ต้องจอง",
      },
    ],
    budget: {
      transport: "~670 บาท (Keisei Skyliner 590 + รถไฟใต้ดินไป-กลับ Asakusa 80)",
      entrance: "ฟรี (วัดเซ็นโซจิไม่เก็บค่าเข้า)",
      meals: "~1,500 บาท",
      total: "~2,170 บาท/คน",
    },
    activities: [
      { time: "07:30 น.", title: "ถึงสนามบินนาริตะ (NRT)", photo: "narita", lat: 35.772, lng: 140.3929 },
      {
        time: "08:30 น.",
        title: "นั่ง Keisei Skyliner ไปสถานี Keisei Ueno",
        transportation: "Keisei Skyliner",
        duration: "41 นาที",
      },
      {
        time: "09:20 น.",
        title: "เดินไปฝากกระเป๋าที่ Hotel MYSTAYS Ueno East",
        address: "5-5-6 Higashiueno, Taito-ku, Tokyo",
        transportation: "เดิน",
        duration: "4 นาที",
        lat: 35.7128,
        lng: 139.7825,
      },
      {
        time: "11:00 น.",
        title: "วัดเซ็นโซจิ (อาซากุสะ)", photo: "sensoji",
        address: "2-3-1 Asakusa, Taito-ku, Tokyo",
        transportation: "Tokyo Metro (สาย Ginza)",
        duration: "15 นาที",
        lat: 35.7148,
        lng: 139.7967,
      },
      {
        time: "13:00 น.",
        title: "ถนนนากามิเสะ", photo: "nakamise",
        transportation: "เดิน",
        lat: 35.7139,
        lng: 139.7966,
        note: "แถวนี้มีของกินเล่นขึ้นชื่อเรียงราย เช่น Asakusa Menchi (โครเก็ตเนื้อทอด) และร้านเทมปุระเก่าแก่ Daikokuya",
        mapsQuery: "restaurants near Nakamise-dori Asakusa Tokyo",
      },
      {
        time: "14:00 น.",
        title: "ตลาดอาเมะโยโกะ", photo: "ameyoko",
        address: "4 Chome-10-11 Ueno, Taito-ku, Tokyo",
        transportation: "เดิน",
        lat: 35.7099,
        lng: 139.7746,
      },
      {
        time: "16:00 น.",
        title: "กลับโรงแรม เช็กอิน / พักผ่อน",
        transportation: "รถไฟฟ้าใต้ดิน",
        duration: "20 นาที",
        lat: 35.7128,
        lng: 139.7825,
      },
      {
        time: "19:00 น.",
        title: "อาหารเย็นย่านอุเอโนะ",
        transportation: "เดิน",
        note: "ย่านนี้มีร้านให้เลือกเยอะ เช่น Ueno Yokocho (ตรอกอิซากายะใต้ทางรถไฟ) หรือ Torikizoku (ยากิโทริราคาประหยัด)",
        mapsQuery: "restaurants near Ueno Station Tokyo",
      },
    ],
  },
  {
    day: 2,
    date: "6 ธ.ค.",
    weekday: "เสาร์",
    title: "ศาลเจ้าเมจิ - ชินจูกุ - ชิบูย่า - นากาเมกุโระ",
    color: "#2563eb",
    transportLegs: [
      {
        mode: "JR Yamanote Line (Ueno → Harajuku, Shinjuku → Shibuya)",
        ticket: "บัตร IC (Suica/Pasmo) — เป็นรถไฟ JR ตั๋วรถไฟใต้ดิน 72 ชม. ใช้ไม่ได้",
        price: "150–200 เยน (~35–46 บาท) ต่อเที่ยว รวม 2 เที่ยว ~83 บาท",
        time: "08:30 น. และ 14:30 น.",
        reservation: "ไม่ต้องจอง",
      },
      {
        mode: "Tokyo Metro สาย Hibiya (Shibuya → Nakameguro)",
        ticket: "บัตร IC หรือ Tokyo Subway 72-hr Ticket",
        price: "180 เยน (~42 บาท)",
        time: "15:30 น.",
        reservation: "ไม่ต้องจอง",
      },
      {
        mode: "Tokyo Metro สาย Hibiya (Nakameguro → Ueno, ขากลับที่พัก)",
        ticket: "บัตร IC หรือ Tokyo Subway 72-hr Ticket",
        price: "250 เยน (~58 บาท)",
        time: "18:00 น.",
        reservation: "ไม่ต้องจอง",
        note: "เส้นทางนี้อยู่บนสาย Hibiya เส้นเดียวกัน ไม่ต้องเปลี่ยนสาย",
      },
    ],
    budget: {
      transport: "~180 บาท (จ่ายเป็นเที่ยว) หรือถูกกว่านี้ถ้าใช้ Tokyo Subway 72-hr Ticket ครอบคลุมขา Metro",
      entrance: "500 เยน (~115 บาท) สวนชินจูกุเกียวเอ็น",
      meals: "~1,500 บาท",
      total: "~1,800 บาท/คน",
    },
    activities: [
      {
        time: "08:30 น.",
        title: "ศาลเจ้าเมจิ", photo: "meiji",
        address: "1-1 Yoyogikamizonocho, Shibuya-ku, Tokyo",
        transportation: "JR Yamanote Line",
        duration: "20 นาที",
        lat: 35.6764,
        lng: 139.6993,
      },
      {
        time: "10:30 น.",
        title: "สวนชินจูกุเกียวเอ็น", photo: "gyoen",
        address: "11 Naitomachi, Shinjuku City, Tokyo",
        transportation: "เดิน",
        duration: "15 นาที",
        lat: 35.6852,
        lng: 139.71,
      },
      {
        time: "13:00 น.",
        title: "มื้อเที่ยงย่านชินจูกุ",
        transportation: "เดิน",
        note: "ลองร้านดังอย่าง Fuunji (สึเกเมงชื่อดัง) หรือย่าน Omoide Yokocho (ตรอกยากิโทริบรรยากาศย้อนยุค)",
        mapsQuery: "restaurants near Shinjuku Station Tokyo",
      },
      {
        time: "14:30 น.",
        title: "ห้าแยกชิบูย่า", photo: "shibuya",
        address: "2 Chome-24-12 Shibuya, Shibuya-ku, Tokyo",
        transportation: "JR Yamanote Line",
        duration: "15 นาที",
        lat: 35.6595,
        lng: 139.7004,
      },
      {
        time: "15:30 น.",
        title: "ย่านนากาเมกุโระ (ช้อปปิ้ง & คาเฟ่)", photo: "nakameguro",
        address: "1 Chome-23-3 Kamimeguro, Meguro-ku, Tokyo",
        transportation: "Tokyo Metro สาย Hibiya",
        duration: "15 นาที",
        lat: 35.6446,
        lng: 139.6989,
      },
      {
        time: "18:00 น.",
        title: "กลับโรงแรม",
        transportation: "รถไฟฟ้าใต้ดิน",
        duration: "25 นาที",
        lat: 35.7128,
        lng: 139.7825,
      },
      {
        time: "19:30 น.",
        title: "อาหารเย็น",
        transportation: "เดิน",
        note: "กลับมาแถวอุเอโนะแล้วลองร้านราเมง Ichiran หรือร้านโซบะเก่าแก่กว่า 100 ปี Ueno Yabu Soba",
        mapsQuery: "restaurants near Ueno Station Tokyo",
      },
    ],
  },
  {
    day: 3,
    date: "7 ธ.ค.",
    weekday: "อาทิตย์",
    title: "เดย์ทริปคามาคุระ",
    color: "#16a34a",
    transportLegs: [
      {
        mode: "JR Yokosuka Line (Tokyo → Kamakura)",
        ticket: "บัตร IC หรือตั๋วเที่ยวเดียว",
        price: "950 เยน (~220 บาท) เที่ยวเดียว",
        time: "08:00 น.",
        reservation: "ไม่ต้องจอง",
        note: "เป็นรถไฟธรรมดา ไม่มีที่นั่งกำหนด ยกเว้นอยากซื้อ Green Car เสริม",
      },
      {
        mode: "รถไฟสาย Enoden (เที่ยวในคามาคุระ)",
        ticket: "บัตร IC หรือ Enoden 1-Day Pass",
        price: "200–260 เยน/เที่ยว หรือเหมา 800 เยน/วัน",
        time: "09:30 น.",
        reservation: "ไม่ต้องจอง",
      },
      {
        mode: "JR Yokosuka Line (Kamakura → Shinjuku)",
        ticket: "บัตร IC หรือตั๋วเที่ยวเดียว",
        price: "950 เยน (~220 บาท) เที่ยวเดียว",
        time: "17:00 น.",
        reservation: "ไม่ต้องจอง",
      },
    ],
    budget: {
      transport: "~500 บาท (JR Yokosuka ไป-กลับ 440 + Enoden 60)",
      entrance: "600 เยน (~140 บาท) วัดโงคุราคุจิ + พระใหญ่",
      meals: "~1,500 บาท",
      total: "~2,140 บาท/คน",
    },
    activities: [
      {
        time: "08:00 น.",
        title: "ออกเดินทางไปคามาคุระ",
        transportation: "JR Yokosuka Line",
        duration: "60 นาที",
      },
      {
        time: "09:30 น.",
        title: "วัดโงคุราคุจิ", photo: "gokurakuji",
        address: "4-2-7 Gokurakuji, Kamakura",
        transportation: "รถไฟสาย Enoden",
        duration: "10 นาที",
        lat: 35.3117,
        lng: 139.5334,
      },
      {
        time: "10:30 น.",
        title: "พระใหญ่คามาคุระ (วัดโคโตคุอิน)", photo: "daibutsu",
        address: "4-2-28 Hase, Kamakura",
        transportation: "เดิน / รถบัส",
        duration: "10 นาที",
        lat: 35.3167,
        lng: 139.5359,
      },
      {
        time: "12:00 น.",
        title: "มื้อเที่ยงย่านคามาคุระ",
        transportation: "เดิน",
        note: "เมนูขึ้นชื่อของคามาคุระคือ Shirasu-don (ข้าวหน้าปลาไซสด) แนะนำร้าน Tobiccho ใกล้ Komachi-dori",
        mapsQuery: "restaurants near Komachi-dori Kamakura",
      },
      {
        time: "13:30 น.",
        title: "ถนนโคมะจิ",
        address: "1 Chome Komachi, Kamakura",
        transportation: "เดิน",
        lat: 35.3213,
        lng: 139.5563,
      },
      {
        time: "15:00 น.",
        title: "ศาลเจ้าทสึรุงะโอกะ ฮาจิมังงู", photo: "hachimangu",
        address: "2 Chome-1-31 Yukinoshita, Kamakura",
        transportation: "เดิน / รถบัส",
        duration: "10 นาที",
        lat: 35.3258,
        lng: 139.5564,
      },
      {
        time: "17:00 น.",
        title: "เดินทางกลับชินจูกุ",
        transportation: "JR Yokosuka Line",
        duration: "60 นาที",
      },
      {
        time: "19:00 น.",
        title: "อาหารเย็นย่านชินจูกุ",
        transportation: "เดิน",
        note: "ย่านนี้มีร้านให้เลือกเยอะ ทั้ง Omoide Yokocho หรือร้านราเมง/อิซากายะทั่วไปรอบสถานี",
        mapsQuery: "restaurants near Shinjuku Station Tokyo",
      },
    ],
  },
  {
    day: 4,
    date: "8 ธ.ค.",
    weekday: "จันทร์",
    title: "สกายทรี - อากิฮาบาระ - โอไดบะ",
    color: "#d97706",
    transportLegs: [
      {
        mode: "Tokyo Metro / Toei Asakusa Line (Ueno → Skytree)",
        ticket: "บัตร IC หรือ Tokyo Subway 72-hr Ticket",
        price: "180–210 เยน (~42–48 บาท)",
        time: "08:30 น.",
        reservation: "ไม่ต้องจอง",
      },
      {
        mode: "JR Yamanote Line (Skytree → Akihabara)",
        ticket: "บัตร IC",
        price: "150 เยน (~35 บาท)",
        time: "11:00 น.",
        reservation: "ไม่ต้องจอง",
      },
      {
        mode: "Yurikamome Line (Akihabara → Odaiba)",
        ticket: "บัตร IC หรือ Yurikamome 1-Day Pass",
        price: "330–400 เยน/เที่ยว หรือเหมา 820 เยน/วัน",
        time: "14:30 น.",
        reservation: "ไม่ต้องจอง",
        note: "เป็นรถไฟไร้คนขับ วิ่งอัตโนมัติ ไม่มีการจองที่นั่ง",
      },
      {
        mode: "Yurikamome + รถไฟใต้ดิน (Odaiba → Ueno, ขากลับที่พัก)",
        ticket: "บัตร IC หรือ Yurikamome 1-Day Pass ต่อด้วยบัตร IC",
        price: "~400 เยน (Yurikamome) + ~250 เยน (ต่อรถใต้ดิน) รวม ~650 เยน (~150 บาท)",
        time: "17:00 น.",
        reservation: "ไม่ต้องจอง",
      },
    ],
    budget: {
      transport: "~320 บาท (Toei/Metro 45 + JR Yamanote 35 + Yurikamome ไป-กลับ 235)",
      entrance: "2,100 เยน (~480 บาท) ขึ้นชมวิวสกายทรี (ไม่บังคับ)",
      meals: "~1,500 บาท",
      total: "~2,300 บาท/คน (ถ้าขึ้นสกายทรี) / ~1,820 บาท (ถ้าไม่ขึ้น)",
    },
    activities: [
      {
        time: "08:30 น.",
        title: "โตเกียวสกายทรี", photo: "skytree",
        address: "1 Chome-1-2 Oshiage, Sumida-ku, Tokyo",
        transportation: "รถไฟใต้ดิน / Toei Asakusa Line",
        duration: "25 นาที",
        lat: 35.7101,
        lng: 139.8107,
      },
      {
        time: "11:00 น.",
        title: "ย่านอากิฮาบาระ", photo: "akihabara",
        address: "1 Chome Sotokanda, Chiyoda-ku, Tokyo",
        transportation: "JR Yamanote Line",
        duration: "20 นาที",
        lat: 35.6984,
        lng: 139.7731,
      },
      {
        time: "13:00 น.",
        title: "มื้อเที่ยงย่านอากิฮาบาระ",
        transportation: "เดิน",
        note: "มีฟู้ดคอร์ทที่ตึก Radio Kaikan หรือร้านข้าวหน้าเนื้อเร็วๆ อย่าง Sukiya/Yoshinoya ใกล้สถานี",
        mapsQuery: "restaurants near Akihabara Station Tokyo",
      },
      {
        time: "14:30 น.",
        title: "โอไดบะ - Gundam Base Tokyo", photo: "gundam",
        address: "1 Chome-1-10 Aomi, Koto-ku, Tokyo",
        transportation: "Yurikamome Line",
        duration: "30 นาที",
        lat: 35.6255,
        lng: 139.7758,
      },
      {
        time: "17:00 น.",
        title: "กลับโรงแรม",
        transportation: "Yurikamome + รถไฟใต้ดิน",
        duration: "45 นาที",
        lat: 35.7128,
        lng: 139.7825,
      },
      {
        time: "19:00 น.",
        title: "อาหารเย็นย่านอุเอโนะ",
        transportation: "เดิน",
        note: "ลองร้านยากินิกุอย่าง Gyukaku หรือกลับไปเดินเล่น Ueno Yokocho อีกรอบ",
        mapsQuery: "restaurants near Ueno Station Tokyo",
      },
    ],
  },
  {
    day: 5,
    date: "9 ธ.ค.",
    weekday: "อังคาร",
    title: "อุเอโนะ - เดินทางกลับ",
    color: "#7c3aed",
    transportLegs: [
      {
        mode: "Keisei Skyliner (Keisei Ueno → สนามบินนาริตะ)",
        ticket: "ตั๋ว Skyliner (ที่นั่งกำหนด)",
        price: "2,570 เยน (~590 บาท) เที่ยวเดียว",
        time: "13:30 น. (รถออกทุก 20–40 นาที)",
        reservation: "แนะนำจอง",
        note: "ถ้าซื้อคู่กับขาไปเป็นตั๋วไป-กลับตั้งแต่วันแรก จะถูกกว่าซื้อแยก (~4,480 เยน ไป-กลับ)",
      },
    ],
    budget: {
      transport: "~590 บาท (Keisei Skyliner เที่ยวเดียว)",
      entrance: "600 เยน (~140 บาท) สวนสัตว์อุเอโนะ",
      meals: "~750 บาท (ครึ่งวัน)",
      total: "~1,480 บาท/คน",
    },
    activities: [
      {
        time: "08:30 น.",
        title: "สวนสัตว์อุเอโนะ", photo: "uenozoo",
        address: "9-83 Uenokoen, Taito-ku, Tokyo",
        transportation: "เดิน",
        duration: "10 นาที",
        lat: 35.7166,
        lng: 139.7713,
      },
      {
        time: "10:30 น.",
        title: "ช้อปปิ้งตลาดอาเมะโยโกะ (รอบสุดท้าย)", photo: "ameyoko",
        address: "4 Chome-10-11 Ueno, Taito-ku, Tokyo",
        transportation: "เดิน",
        lat: 35.7099,
        lng: 139.7746,
      },
      {
        time: "12:00 น.",
        title: "มื้อเที่ยง",
        transportation: "เดิน",
        note: "ทานง่ายๆ ที่ตลาดอาเมะโยโกะก่อนออกเดินทาง มีทั้งของกินเล่นและร้านอาหารเล็กๆ",
        mapsQuery: "restaurants near Ameyoko Ueno Tokyo",
      },
      {
        time: "13:30 น.",
        title: "ออกจากโรงแรมไปสนามบินนาริตะ",
        transportation: "Keisei Skyliner",
        duration: "60 นาที",
        lat: 35.7128,
        lng: 139.7825,
      },
      { time: "14:30 น.", title: "ถึงสนามบินนาริตะ (NRT)", photo: "narita", lat: 35.772, lng: 140.3929 },
      {
        time: "14:30 น.",
        title: "เช็กอิน & ผ่านตรวจคนเข้าเมือง (ควรถึงก่อนเครื่องออกอย่างน้อย 3 ชม.)",
      },
      {
        time: "17:00 น.",
        title: "ออกเดินทางจากนาริตะ - เที่ยวบิน ZIPAIR ZG051 กลับกรุงเทพฯ",
      },
      { time: "22:30 น.", title: "ถึงกรุงเทพฯ (BKK)" },
    ],
  },
];

export const trainGuide: TrainGuideEntry[] = [
  {
    name: "Keisei Skyliner",
    usedOn: "วันที่ 1, วันที่ 5",
    type: "รถไฟด่วนพิเศษ (Limited Express)",
    reservation: "ต้องจอง",
    seating: "นั่งอย่างเดียว ที่นั่งกำหนดทุกที่ ไม่มียืน",
    cards: "ตั๋ว Skyliner เฉพาะเท่านั้น (แตะบัตร IC ขึ้นไม่ได้)",
    note: "ซื้อออนไลน์ล่วงหน้าหรือที่เคาน์เตอร์ Keisei ในสนามบิน",
  },
  {
    name: "Tokyo Metro (สาย Ginza / Hibiya)",
    usedOn: "วันที่ 1, วันที่ 2",
    type: "รถไฟใต้ดินธรรมดา",
    reservation: "ไม่ต้องจอง",
    seating: "ยืนปกติ ที่นั่งแบบใครมาก่อนได้ก่อน",
    cards: "บัตร IC (Suica/Pasmo), Tokyo Subway 72-hr Ticket, ตั๋วเที่ยวเดียว",
  },
  {
    name: "Toei Asakusa Line",
    usedOn: "วันที่ 4",
    type: "รถไฟใต้ดินธรรมดา",
    reservation: "ไม่ต้องจอง",
    seating: "ยืนปกติ ที่นั่งแบบใครมาก่อนได้ก่อน",
    cards: "บัตร IC (Suica/Pasmo), Tokyo Subway 72-hr Ticket, ตั๋วเที่ยวเดียว",
  },
  {
    name: "JR Yamanote Line",
    usedOn: "วันที่ 2, วันที่ 4",
    type: "รถไฟธรรมดา (สายวงกลม)",
    reservation: "ไม่ต้องจอง",
    seating: "ยืนปกติ ช่วงเร่งด่วนแน่นมาก",
    cards: "บัตร IC (Suica/Pasmo), ตั๋ว JR เที่ยวเดียว — Tokyo Subway Ticket ใช้ไม่ได้ (เป็นสาย JR ไม่ใช่ Metro)",
  },
  {
    name: "JR Yokosuka Line",
    usedOn: "วันที่ 3",
    type: "รถไฟธรรมดา (Rapid)",
    reservation: "ไม่ต้องจอง (มีอัพเกรดจ่ายเพิ่ม)",
    seating: "ยืนปกติในตู้ธรรมดา หรืออัพเกรดตู้ Green Car จ่ายเพิ่มเพื่อรับรองที่นั่ง",
    cards: "บัตร IC (Suica/Pasmo), ตั๋ว JR เที่ยวเดียว",
    note: "Green Car ไม่ใช่การจองล่วงหน้า แต่ซื้อตั๋วเสริมหน้างานหรือแตะบัตร IC ที่เครื่องอ่าน Green Car",
  },
  {
    name: "Enoden (Enoshima Electric Railway)",
    usedOn: "วันที่ 3",
    type: "รถไฟท้องถิ่นคล้ายรถราง",
    reservation: "ไม่ต้องจอง",
    seating: "ยืนปกติ มักแน่นช่วงท่องเที่ยว/วันหยุด",
    cards: "บัตร IC (Suica/Pasmo), Enoden 1-Day Pass",
  },
  {
    name: "Yurikamome",
    usedOn: "วันที่ 4",
    type: "รถไฟไร้คนขับ (วิ่งอัตโนมัติ)",
    reservation: "ไม่ต้องจอง",
    seating: "ยืนปกติ",
    cards: "บัตร IC (Suica/Pasmo), Yurikamome 1-Day Pass — Tokyo Subway Ticket ใช้ไม่ได้",
  },
];

export const transitCards: TransitCard[] = [
  {
    id: "suica",
    name: "Suica",
    brand: "IC CARD",
    kind: "ic",
    colorFrom: "#0a8f4a",
    colorTo: "#065f34",
    usedFor:
      "แตะเข้า-ออกรถไฟ/รถบัสได้เกือบทุกสายในโตเกียว-คามาคุระ และจ่ายเงินในร้านสะดวกซื้อ/ตู้กดน้ำได้ด้วย",
    whereToBuy: "ตู้จำหน่ายตั๋วในสถานี JR หรือแอป Suica (เพิ่มลงมือถือได้ถ้าเป็น iPhone)",
    price:
      "บัตรใหม่ 2,000 เยน (มัดจำ 500 + เงินใช้จริง 1,500) หรือ Welcome Suica ไม่มีมัดจำ ใช้ได้ 28 วัน",
    topUp: "แนะนำเติมเพิ่มอีก 2,000–3,000 เยน/คน เติมขั้นต่ำครั้งละ 1,000 เยนที่ตู้เติมเงิน",
    note: "คืนบัตร+รับมัดจำคืนได้ที่เคาน์เตอร์ JR ก่อนกลับ (Welcome Suica คืนเงินไม่ได้)",
  },
  {
    id: "pasmo",
    name: "PASMO",
    brand: "IC CARD",
    kind: "ic",
    colorFrom: "#e6007e",
    colorTo: "#8a1a63",
    usedFor: "ใช้แทน Suica ได้ทุกอย่าง แตะรถไฟ/รถบัส/ร้านสะดวกซื้อ เลือกใช้ใบใดใบหนึ่งก็พอ",
    whereToBuy: "ตู้จำหน่ายตั๋วในสถานี Toei/Metro หรือแอป PASMO",
    price:
      "บัตรใหม่ 2,000 เยน (มัดจำ 500 + เงินใช้จริง 1,500) หรือ PASMO PASSPORT สำหรับนักท่องเที่ยว",
    topUp: "แนะนำเติมเพิ่มอีก 2,000–3,000 เยน/คน เติมขั้นต่ำครั้งละ 1,000 เยนที่ตู้เติมเงิน",
  },
  {
    id: "skyliner",
    name: "Keisei Skyliner",
    brand: "ตั๋วรถไฟ (ที่นั่งกำหนด)",
    kind: "ticket",
    colorFrom: "#1c3157",
    colorTo: "#0d1a33",
    usedFor: "สนามบินนาริตะ ↔ Keisei Ueno (ใช้วันที่ 1 และวันที่ 5)",
    whereToBuy: "เคาน์เตอร์ Keisei ที่สนามบิน หรือจองที่นั่งออนไลน์ล่วงหน้า",
    price: "2,570 เยน/เที่ยว หรือตั๋วไป-กลับ 4,480 เยน (ถูกกว่าซื้อแยก)",
    note: "แนะนำจองล่วงหน้าช่วงเร่งด่วน ไม่บังคับแต่ที่นั่งมีจำนวนจำกัด",
  },
  {
    id: "subway72",
    name: "Tokyo Subway Ticket",
    brand: "ตั๋วเหมา 72 ชม.",
    kind: "pass",
    colorFrom: "#0f766e",
    colorTo: "#0b4f4a",
    usedFor:
      "ขึ้น Tokyo Metro + Toei Subway ไม่จำกัดเที่ยวใน 72 ชม. เหมาะกับวันที่ 2 และวันที่ 4",
    whereToBuy: "เคาน์เตอร์นักท่องเที่ยวที่สนามบิน หรือเครื่องจำหน่ายตั๋วในสถานีรถไฟใต้ดิน",
    price: "1,500 เยน/คน (ราคาเดียว ไม่ต้องเติม)",
  },
  {
    id: "enoden",
    name: "Enoden 1-Day Pass",
    brand: "のりおりくん",
    kind: "pass",
    colorFrom: "#b45309",
    colorTo: "#7c3a08",
    usedFor: "นั่งรถไฟสาย Enoden เที่ยวรอบคามาคุระได้ไม่จำกัดเที่ยว (วันที่ 3)",
    whereToBuy: "เครื่องจำหน่ายตั๋วที่สถานี Enoden (เช่น สถานี Kamakura หรือ Fujisawa)",
    price: "800 เยน/คน (ราคาเดียว ไม่ต้องเติม)",
  },
  {
    id: "yurikamome",
    name: "Yurikamome 1-Day Pass",
    brand: "ตั๋วเหมาวัน",
    kind: "pass",
    colorFrom: "#2563eb",
    colorTo: "#1e3a8a",
    usedFor: "นั่งรถไฟไร้คนขับสาย Yurikamome ไป-กลับโอไดบะ (วันที่ 4)",
    whereToBuy: "เครื่องจำหน่ายตั๋วที่สถานี Shimbashi หรือ Toyosu",
    price: "820 เยน/คน (ราคาเดียว ไม่ต้องเติม)",
  },
];

export const climateInfo: ClimateInfo = {
  avgHigh: "~12°C",
  avgLow: "~5°C",
  rainfall: "น้อย (ธันวาคมเป็นฤดูแล้ง ท้องฟ้าโปร่งเกือบทุกวัน)",
  sunset: "~16:30 น. (มืดเร็ว)",
  summary:
    "อ้างอิงจากค่าเฉลี่ยภูมิอากาศย้อนหลัง ไม่ใช่พยากรณ์อากาศจริงของทริป (เดือนธันวาคมยังไม่มีพยากรณ์ล่วงหน้าไกลขนาดนี้) ควรเช็กพยากรณ์จริงอีกครั้งประมาณ 1 สัปดาห์ก่อนเดินทาง",
};

export const packingChecklist: PackingCategory[] = [
  {
    id: "clothing",
    title: "เสื้อผ้ากันหนาว",
    icon: "🧥",
    items: [
      "เสื้อโค้ทกันหนาว/กันลม (สำคัญที่สุด)",
      "เสื้อไหมพรมหรือฟลีซใส่ซ้อนข้างใน",
      "เสื้อกันหนาวชั้นใน (Heattech หรือเทียบเท่า)",
      "กางเกงขายาวเนื้อหนา",
      "ถุงเท้าหนา 5-6 คู่",
      "ผ้าพันคอ + หมวกไหมพรม + ถุงมือ",
      "รองเท้าใส่เดินสบาย กันน้ำได้เล็กน้อย",
    ],
  },
  {
    id: "docs",
    title: "เอกสารสำคัญ",
    icon: "📄",
    items: [
      "พาสปอร์ต (อายุเหลือ > 6 เดือน)",
      "ใบจองตั๋วเครื่องบิน + โรงแรม (ปริ้นท์หรือเซฟไฟล์ในมือถือ)",
      "Visit Japan Web QR Code",
      "ประกันการเดินทาง",
      "เงินสดเยน + บัตรเครดิต/เดบิต",
    ],
  },
  {
    id: "electronics",
    title: "อุปกรณ์อิเล็กทรอนิกส์",
    icon: "🔌",
    items: [
      "มือถือ + สายชาร์จ",
      "Power bank (พกขึ้นเครื่องเท่านั้น ห้ามโหลดใต้ท้องเครื่อง)",
      "eSIM หรือ Pocket WiFi",
      "ปลั๊กไฟ (ญี่ปุ่นใช้ปลั๊กแบบเดียวกับไทย แต่ไฟ 100V ตรวจสอบอุปกรณ์ก่อน)",
    ],
  },
  {
    id: "personal",
    title: "ของใช้ส่วนตัว",
    icon: "🧴",
    items: [
      "ยาประจำตัว + ยาสามัญ (แก้หวัด/แก้ปวด)",
      "ลิปมันและมอยส์เจอร์ไรเซอร์ (อากาศแห้งมาก)",
      "ครีมกันแดด",
      "อุปกรณ์อาบน้ำแบบพกพา",
    ],
  },
  {
    id: "misc",
    title: "อื่นๆ",
    icon: "🎒",
    items: [
      "กระเป๋าเป้ใบเล็กสำหรับเดินเที่ยวแต่ละวัน",
      "ร่มพับหรือเสื้อกันฝนบางเบา",
      "ถุงผ้าสำหรับใส่ของที่ซื้อ",
    ],
  },
];

export const budgetGrandTotal = {
  perPersonExcludingFlightHotel:
    "~9,400–9,900 บาท/คน (แล้วแต่ขึ้นสกายทรีวันที่ 4 หรือไม่ ไม่รวมค่าช้อปปิ้งส่วนตัว)",
  shoppingBudgetSuggestion: "~5,000–10,000 บาท/คน (ตามความต้องการส่วนตัว)",
  note: "ผลรวมนี้คำนวณจากยอด 'รวม/วัน' ของแต่ละวันด้านล่างโดยตรง (ค่าโดยสารรถไฟไป-กลับครบทุกขา + ค่าเข้าชมสถานที่ + ค่าอาหารวันละ ~1,500 บาท) ไม่รวมตั๋วเครื่องบินและค่าโรงแรม อัตราแลกเปลี่ยนโดยประมาณ 1 เยน ≈ 0.23 บาท",
};

export const transportationSummary = [
  { label: "สนามบิน ↔ อุเอโนะ", value: "Keisei Skyliner (41 นาที)" },
  { label: "เดินทางในเมือง", value: "JR Yamanote Line, Tokyo Metro, Toei Subway" },
  { label: "เดินทางไปคามาคุระ", value: "JR Yokosuka Line + Enoden Line" },
  { label: "เดินทางไปโอไดบะ", value: "Yurikamome Line" },
];

export const importantNotes = [
  "ควรถึงสนามบินอย่างน้อย 3 ชั่วโมงก่อนเที่ยวบินระหว่างประเทศ",
  "พกพาสปอร์ต ใบจองโรงแรม และตั๋วเครื่องบินขากลับติดตัวตลอดทริป",
  "กำหนดการนี้จัดทำเพื่อการท่องเที่ยวเท่านั้น อาจเปลี่ยนแปลงได้",
  "ทุกกิจกรรมขึ้นอยู่กับสภาพอากาศและเวลาทำการจริง ณ วันเดินทาง",
];

export type LocatedActivity = Activity & { lat: number; lng: number };

export function hasCoords(a: Activity): a is LocatedActivity {
  return typeof a.lat === "number" && typeof a.lng === "number";
}

/** Stops shown as numbered pins on the map (the hotel has its own pin). */
export function mapStops(day: Day): LocatedActivity[] {
  return day.activities
    .filter(hasCoords)
    .filter((a) => !(a.lat === accommodation.lat && a.lng === accommodation.lng));
}
