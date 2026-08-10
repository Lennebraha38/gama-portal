export const siteConfig = {
  name: "Gama",
  tagline: "Türkiye'nin geleceğine imza at.",
  mission:
    "Türkiye'nin teknolojik ve bilimsel bağımsızlığına katkı sağlamak için yola çıktık. Vizyonumuz, coğrafi sınırları ortadan kaldırarak her gencimizin yenilikçi fikirlerini hayata geçirmesine destek olmak.",
  pillars: [
    {
      title: "Kaynak",
      description:
        "Fon, araç ve altyapı imkanlarını gençlerimizin projelerine aktarıyoruz.",
    },
    {
      title: "Takım",
      description:
        "Farklı disiplinlerden gençleri bir araya getirerek güçlü ekipler kuruyoruz.",
    },
    {
      title: "Mentorluk",
      description:
        "Alanında uzman mentorlarla gençlerimizi birebir buluşturuyoruz.",
    },
  ],
  nav: [
    { href: "/", label: "Anasayfa" },
    { href: "/projeler", label: "Projeler" },
    { href: "/iller", label: "İl Temsilcileri" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/sss", label: "SSS" },
    { href: "/iletisim", label: "İletişim" },
  ],
  marquee: [
    "Yapay Zekâ",
    "Milli Yazılım",
    "Siber Güvenlik",
    "Otonom Sistemler",
    "Uzay Teknolojileri",
    "Biyoteknoloji",
    "Veri Bilimi",
    "Savunma Teknolojileri",
  ],
} as const;
