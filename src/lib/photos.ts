export type PlacePhoto = {
  /** Thai name of the place, used in the credits list */
  label: string;
  /** 500px thumbnail served by Wikimedia Commons */
  src: string;
  credit: string;
  license: string;
  /** Commons file page (author, license and full-size original) */
  sourceUrl: string;
};

// Photos from Wikimedia Commons, each under a free license (CC0, public domain or CC BY / BY-SA).
// The CC BY / BY-SA licenses require crediting the author, which <PhotoCredits /> does.
export const placePhotos: Record<string, PlacePhoto> = {
  narita: {
    label: "สนามบินนาริตะ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Narita_Nemzetk%C3%B6zi_Rep%C3%BCl%C5%91t%C3%A9r.jpg/500px-Narita_Nemzetk%C3%B6zi_Rep%C3%BCl%C5%91t%C3%A9r.jpg",
    credit: "Petra.G09",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Narita_Nemzetk%C3%B6zi_Rep%C3%BCl%C5%91t%C3%A9r.jpg",
  },
  sensoji: {
    label: "วัดเซ็นโซจิ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sensoji_2023.jpg/500px-Sensoji_2023.jpg",
    credit: "Akonnchiroll",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sensoji_2023.jpg",
  },
  nakamise: {
    label: "ถนนนากามิเสะ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nakamise-D%C5%8Dri%2C_Asakusa_%289409495501%29.jpg/500px-Nakamise-D%C5%8Dri%2C_Asakusa_%289409495501%29.jpg",
    credit: "Maarten Heerlien from Voorschoten, The Netherlands",
    license: "CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nakamise-D%C5%8Dri,_Asakusa_(9409495501).jpg",
  },
  ameyoko: {
    label: "ตลาดอาเมะโยโกะ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ueno_20241210_133139.jpg/500px-Ueno_20241210_133139.jpg",
    credit: "Ka23 13",
    license: "CC BY 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ueno_20241210_133139.jpg",
  },
  meiji: {
    label: "ศาลเจ้าเมจิ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Meiji_Jingu_2023-3.jpg/500px-Meiji_Jingu_2023-3.jpg",
    credit: "Akonnchiroll",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Meiji_Jingu_2023-3.jpg",
  },
  gyoen: {
    label: "สวนชินจูกุเกียวเอ็น",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Shinjuku_Gyoen_National_Garden_-_sakura_3.JPG/500px-Shinjuku_Gyoen_National_Garden_-_sakura_3.JPG",
    credit: "Kakidai",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shinjuku_Gyoen_National_Garden_-_sakura_3.JPG",
  },
  shibuya: {
    label: "ห้าแยกชิบูย่า",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Shibuya_Crossing%2C_Aerial.jpg/500px-Shibuya_Crossing%2C_Aerial.jpg",
    credit: "David Kernan",
    license: "CC BY 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shibuya_Crossing,_Aerial.jpg",
  },
  nakameguro: {
    label: "นากาเมกุโระ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Walk_along_Meguro_river_near_Nakameguro_6.jpg/500px-Walk_along_Meguro_river_near_Nakameguro_6.jpg",
    credit: "Syced",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Walk_along_Meguro_river_near_Nakameguro_6.jpg",
  },
  gokurakuji: {
    label: "วัดโงคุราคุจิ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Gokuraku-Temple_01.jpg/500px-Gokuraku-Temple_01.jpg",
    credit: "Σ64",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gokuraku-Temple_01.jpg",
  },
  daibutsu: {
    label: "พระใหญ่คามาคุระ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Templo_K%C5%8Dtoku-in%2C_Kamakura_-_2026_-_05.jpg/500px-Templo_K%C5%8Dtoku-in%2C_Kamakura_-_2026_-_05.jpg",
    credit: "ProtoplasmaKid",
    license: "CC BY 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Templo_K%C5%8Dtoku-in,_Kamakura_-_2026_-_05.jpg",
  },
  hachimangu: {
    label: "ศาลเจ้าทสึรุงะโอกะ ฮาจิมังงู",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TsurugaokaHachiman-M8867.jpg/500px-TsurugaokaHachiman-M8867.jpg",
    credit: "Fg2",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:TsurugaokaHachiman-M8867.jpg",
  },
  skytree: {
    label: "โตเกียวสกายทรี",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Tokyo_Skytree_2014_%E2%85%A2.jpg/500px-Tokyo_Skytree_2014_%E2%85%A2.jpg",
    credit: "Kakidai",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tokyo_Skytree_2014_%E2%85%A2.jpg",
  },
  akihabara: {
    label: "อากิฮาบาระ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sotokanda%2C_Akihabara_Electric_Town_at_night_20231114.png/500px-Sotokanda%2C_Akihabara_Electric_Town_at_night_20231114.png",
    credit: "Phineyes",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sotokanda,_Akihabara_Electric_Town_at_night_20231114.png",
  },
  gundam: {
    label: "กันดั้มยูนิคอร์น โอไดบะ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Life-Sized_Unicorn_Gundam_Statue.jpg/500px-Life-Sized_Unicorn_Gundam_Statue.jpg",
    credit: "Pelpinosas R. Justin James",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Life-Sized_Unicorn_Gundam_Statue.jpg",
  },
  uenozoo: {
    label: "สวนสัตว์อุเอโนะ",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ueno_Zoo_2012.JPG/500px-Ueno_Zoo_2012.JPG",
    credit: "Kakidai",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ueno_Zoo_2012.JPG",
  },
};
