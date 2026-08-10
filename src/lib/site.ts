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
  ],
} as const;

export const provilist = [
  {
    il: "İstanbul",
    temsilci: "İçerik belirleniyor",
    durum: "Koordinatör atandı",
  },
  {
    il: "Ankara",
    temsilci: "İçerik belirleniyor",
    durum: "Koordinatör atandı",
  },
  {
    il: "İzmir",
    temsilci: "İçerik belirleniyor",
    durum: "Koordinatör atandı",
  },
];

export const projectList = [
  {
    ad: "Gama Portal",
    alan: "Yazılım",
    durum: "Aktif",
    aciklama:
      "Topluluğun web portalı: üye, il ve proje yönetimi. İlk ürünümüz.",
  },
  {
    ad: "İlk Projen",
    alan: "AR-GE",
    durum: "Yakında",
    aciklama: "Yeni üyelerin soğumadan projeye ısınacağı mentorluk programı.",
  },
];
