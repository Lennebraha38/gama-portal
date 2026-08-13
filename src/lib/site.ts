export const siteConfig = {
  name: "Gama",
  tagline: "Türkiye'nin geleceğine imza at.",
  siteUrl: "https://lennebraha38.github.io/gama-portal",
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
    { href: "/etkinlikler", label: "Etkinlikler" },
    { href: "/duyurular", label: "Duyurular" },
    { href: "/iller", label: "İl Temsilcileri" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/sss", label: "SSS" },
    { href: "/iletisim", label: "İletişim" },
  ],
  stats: [
    { deger: "81", hedef: 81, etiket: "İl Temsilcisi" },
    { deger: "7", hedef: 7, etiket: "Bölge" },
    { deger: "5", hedef: 5, etiket: "Koordinatör" },
    { deger: "7/24", etiket: "Aktif" },
  ],
  manifesto: [
    {
      baslik: "Bağımsızlık",
      metin:
        "Teknolojide ve bilimde dışa bağımlı olmadan, kendi gücümüzle üretmeyi amaç ediniriz.",
    },
    {
      baslik: "Herkese Fırsat",
      metin:
        "Nerede doğduğun değil, ne hayal ettiğin önemli. Coğrafi sınırları kaldırırız.",
    },
    {
      baslik: "Birlikte Üretmek",
      metin:
        "Bilgi paylaştıkça çoğalır. Takım olmadan büyük hayaller gerçek olmaz.",
    },
    {
      baslik: "İz Bırakmak",
      metin:
        "Kısa vadeli kazançlar değil, Türkiye'nin geleceğine yıllar sonra konuşulacak işler bırakırız.",
    },
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
  socials: [
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/gama_turkiye" },
  ],
  analytics: {
    goatcounter: "lennebraha38",
  },
} as const;
