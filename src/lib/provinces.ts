const koordinatorler: Record<string, string> = {
  "Tekirdağ": "Melek Işıker",
  "Ankara": "Emre Pehlivan",
  "Mersin": "Bade Biçer",
  "Konya": "Mehmet Ali Alkan",
  "Adana": "Sena Özkan",
};

const bolgeler = [
  {
    bolge: "Marmara",
    iller: [
      "İstanbul",
      "Bursa",
      "Edirne",
      "Kırklareli",
      "Tekirdağ",
      "Kocaeli",
      "Sakarya",
      "Yalova",
      "Balıkesir",
      "Çanakkale",
      "Bilecik",
    ],
  },
  {
    bolge: "Ege",
    iller: [
      "İzmir",
      "Manisa",
      "Aydın",
      "Denizli",
      "Muğla",
      "Uşak",
      "Kütahya",
      "Afyonkarahisar",
    ],
  },
  {
    bolge: "Akdeniz",
    iller: [
      "Antalya",
      "Isparta",
      "Burdur",
      "Mersin",
      "Adana",
      "Hatay",
      "Kahramanmaraş",
      "Osmaniye",
    ],
  },
  {
    bolge: "İç Anadolu",
    iller: [
      "Ankara",
      "Konya",
      "Eskişehir",
      "Kayseri",
      "Sivas",
      "Çankırı",
      "Kırıkkale",
      "Kırşehir",
      "Nevşehir",
      "Niğde",
      "Aksaray",
      "Yozgat",
      "Karaman",
    ],
  },
  {
    bolge: "Karadeniz",
    iller: [
      "Zonguldak",
      "Bartın",
      "Karabük",
      "Bolu",
      "Düzce",
      "Kastamonu",
      "Sinop",
      "Samsun",
      "Ordu",
      "Giresun",
      "Trabzon",
      "Rize",
      "Artvin",
      "Çorum",
      "Amasya",
      "Tokat",
      "Gümüşhane",
      "Bayburt",
    ],
  },
  {
    bolge: "Doğu Anadolu",
    iller: [
      "Erzurum",
      "Erzincan",
      "Ağrı",
      "Kars",
      "Iğdır",
      "Ardahan",
      "Malatya",
      "Elazığ",
      "Bingöl",
      "Tunceli",
      "Van",
      "Muş",
      "Bitlis",
      "Hakkari",
    ],
  },
  {
    bolge: "Güneydoğu Anadolu",
    iller: [
      "Gaziantep",
      "Kilis",
      "Şanlıurfa",
      "Adıyaman",
      "Diyarbakır",
      "Batman",
      "Şırnak",
      "Siirt",
      "Mardin",
    ],
  },
];

export const regions = bolgeler.map((bolge) => ({
  bolge: bolge.bolge,
  iller: bolge.iller.map((il) => ({
    il,
    temsilci: koordinatorler[il] ?? "Belirleniyor",
  })),
}));

export const toplamIl = 81;

export const tumIller = regions.flatMap((bolge) => bolge.iller.map((il) => il.il));
