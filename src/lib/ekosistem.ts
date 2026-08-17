export type EkosistemTema = {
  ad: string;
  ozet: string;
};

export const mtkbTemalari: EkosistemTema[] = [
  {
    ad: "Yapay Zekâ ve Veri Bilimi",
    ozet: "Makine öğrenmesi, doğal dil işleme ve veri analitiği projeleri.",
  },
  {
    ad: "Siber Güvenlik ve Kriptografi",
    ozet: "Güvenlik açığı analizi, şifreleme ve ağ güvenliği çalışmaları.",
  },
  {
    ad: "Robotik ve Otomasyon",
    ozet: "Otonom sistemler, robot kollar ve endüstriyel otomasyon projeleri.",
  },
  {
    ad: "Elektrik, Elektronik ve Gömülü Sistemler",
    ozet: "Devre tasarımı, gömülü yazılım ve donanım projeleri.",
  },
  {
    ad: "Bilgisayar Bilimleri ve Yazılım Teknolojileri",
    ozet: "Milli yazılım, açık kaynak ve uygulama geliştirme çalışmaları.",
  },
  {
    ad: "Havacılık ve Savunma Teknolojileri",
    ozet: "İnsansız hava araçları, model roket ve savunma sistemleri projeleri.",
  },
  {
    ad: "Biyoteknoloji ve Sağlık Teknolojileri",
    ozet: "Medikal cihazlar, biyomalzeme ve sağlık verisi projeleri.",
  },
  {
    ad: "Uzay ve Keşif Teknolojileri",
    ozet: "Uydu, uzay araçları ve keşif sistemleri çalışmaları.",
  },
  {
    ad: "Otonom Sistemler, Akıllı Şehirler ve IoT",
    ozet: "Akıllı şehir uygulamaları, sensör ağları ve nesnelerin interneti.",
  },
  {
    ad: "Oyun Geliştirme ve Dijital Medya",
    ozet: "Oyun motorları, dijital içerik ve simülasyon projeleri.",
  },
  {
    ad: "Yenilenebilir Enerji ve Çevre Teknolojileri",
    ozet: "Enerji verimliliği, yenilenebilir kaynaklar ve çevre dostu teknolojiler.",
  },
];

export const ekosistemProgramlar = [
  {
    ad: "TEKNOFEST Girişim Programı",
    kurum: "T3 Girişim Merkezi",
    aciklama:
      "Teknoloji odaklı iş fikirlerini girişime dönüştürmek isteyen gençlere eğitim, mentorluk, ofis ve yatırımcı görüşmesi sunar. Ön kuluçkada 100.000 TL'ye kadar malzeme, hızlandırmada 1 milyon TL'ye kadar yatırım desteği sağlanır.",
    baglanti: "https://t3gm.t3vakfi.org",
  },
  {
    ad: "DENEYAP Teknoloji Atölyeleri",
    kurum: "T3 Vakfı · 86 şehir · 137 atölye",
    aciklama:
      "Proje tabanlı eğitim modeliyle gençleri 5 ana başlıkta (robotik, elektronik, yazılım, siber güvenlik, havacılık) yetiştirir. Gama, atölye mezunlarının projelerini sergileyebileceği ortak vitrin olarak konumlanır.",
    baglanti: "https://deneyap.org",
  },
  {
    ad: "Milli Teknoloji Kulüpler Birliği (MTKB)",
    kurum: "TÜBİTAK Bilim ve Toplum Başkanlığı",
    aciklama:
      "Üniversite kulüplerini ortak bir çatı altında toplar; etkinlik, Ar-Ge ve tanıtım giderlerine destek sağlar. Gama'nın il temsilcilikleri, MTKB tematik alanlarıyla birebir eşleşen proje etiketlerini kullanır.",
    baglanti: "https://tubitak.gov.tr",
  },
];

export function temaBul(ad: string): EkosistemTema | undefined {
  return mtkbTemalari.find((t) => t.ad.toLowerCase() === ad.toLowerCase());
}

export function temaVarMi(ad: string): boolean {
  return temaBul(ad) !== undefined;
}