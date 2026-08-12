"use client";

import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

const sorular = [
  {
    soru: "Gama nedir?",
    cevap:
      "Gama, Türkiye'nin teknolojik ve bilimsel bağımsızlığına katkı sağlamak için kurulmuş bir gençlik araştırma-geliştirme birliğidir. Gençleri kaynak, takım ve mentorluk imkanlarıyla buluşturarak yenilikçi fikirlerini hayata geçirmelerine destek olur.",
  },
  {
    soru: "Kimler katılabilir? Yaş sınırı var mı?",
    cevap:
      "Türkiye'nin dört bir yanından, her il ve bölgeden tüm gençler katılabilir. Coğrafi sınırları ortadan kaldırmayı hedeflediğimiz için yalnızca büyük şehirlerde değil, tüm 81 ilde aktif bir topluluk olarak çalışıyoruz.",
  },
  {
    soru: "Katılım ücretli mi?",
    cevap:
      "Hayır, Gama'ya katılım tamamen ücretsizdir. Amacımız her gencin yenilikçi fikrini hayata geçirmesine destek olmak; üyelik veya etkinliklerimiz için herhangi bir ücret talep etmiyoruz.",
  },
  {
    soru: "Deneyimim yok, yine de katılabilir miyim?",
    cevap:
      "Kesinlikle evet. Gama tam da bu yüzden var: farklı seviyedeki gençleri bir araya getiriyoruz. Deneyimsiz üyelerimiz mentorların rehberliğinde ve ekip çalışmalarıyla hızla öğreniyor; herkes kendi seviyesinde katkı sağlayacak bir görev bulabiliyor.",
  },
  {
    soru: "Katılmak için ne yapmalıyım?",
    cevap:
      "Sitedeki 'Katıl' formunu doldurman yeterli. Formu gönderdikten sonra ekibimiz seninle iletişime geçer ve bulunduğun ilin temsilcisi ya da ilgilendiğin alandaki ekip seni karşılar.",
  },
  {
    soru: "Hangi alanlarda çalışıyoruz?",
    cevap:
      "Yazılım, donanım, yapay zeka, siber güvenlik, otonom sistemler, veri bilimi, biyoteknoloji ve uzay teknolojileri başta olmak üzere geniş bir teknoloji ve AR-GE yelpazesinde çalışıyoruz. Her bölüm kendi ekibiyle projeler yürütüyor.",
  },
  {
    soru: "Projelere nasıl katılırım?",
    cevap:
      "Projelerimiz 'Projeler' sayfasından duyurulur. İlgilendiğin projeye katılmak için proje ekibiyle iletişime geçebilir veya katılım formunda ilgilendiğin alanı belirtebilirsin. Yeni projeler açıklandıkça ilk duyanlar arasında olmak için topluluğa üye olman yeterli.",
  },
  {
    soru: "İl temsilcisi nasıl olunur?",
    cevap:
      "Bulunduğun ilde Gama'yı temsil etmek istersen katılım formunda 'İl Temsilcisi Adayı' seçeneğini işaretle. Yönetim ekibimiz adaylarla görüşme yapar ve uygun görülen adaylar koordinatör olarak atanır. Tüm 81 ilde koordinatörlüklerimiz bulunur.",
  },
  {
    soru: "Mentor desteği nasıl alınır?",
    cevap:
      "Her üye, ilgilendiği alana göre bir mentora yönlendirilir. Mentorlarımız proje geliştirme, kariyer planlama ve teknik konularda birebir rehberlik eder. Kendi alanında deneyim kazanmış üyelerimiz de zamanla mentor olarak ekibe katılabilir.",
  },
  {
    soru: "Şirket veya kurumumla nasıl iş birliği yaparım?",
    cevap:
      "Kaynak, sponsorluk, proje ortaklığı veya mentor desteği gibi konularda bize gamaturkiye@gmail.com adresinden ulaşabilirsin. Sivil toplum kuruluşları, üniversiteler, teknoparklar ve teknoloji şirketleriyle iş birliğine açığız.",
  },
  {
    soru: "Topluluk nerede ve nasıl buluşuyor?",
    cevap:
      "Etkinliklerimiz hem fiziksel hem çevrimiçi düzenlenir. İl temsilcilerimiz bulundukları illerde etkinlikler organize ederken, çevrimiçi atölye ve toplantılarla Türkiye'nin her yerinden üyelerimizi bir araya getiriyoruz.",
  },
  {
    soru: "Üyelerden ne beklenir?",
    cevap:
      "Beklentimiz basit: ilgi duyduğun bir alanda aktif olmak ve topluluğun ortak vizyonuna katkı sağlamak. Bir projede yer alabilir, etkinliklere katılabilir veya içerik üretebilirsin; önemli olan topluluğun bir parçası olarak üretmektir.",
  },
];

export default function SssPage() {
  const [acik, setAcik] = useState<number | null>(0);

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Sıkça Sorulan Sorular
          </h1>
          <p className="mt-3 text-zinc-200">
            Aklına takılan soru burada yoksa bize yazmaktan çekinme.
          </p>
        </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 grid gap-3">
        {sorular.map((item, i) => {
          const aktif = acik === i;
          return (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border backdrop-blur transition-colors ${
                aktif
                  ? "border-gama-400/40 bg-white/[0.07]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <button
                type="button"
                onClick={() => setAcik(aktif ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-semibold text-white">{item.soru}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform ${
                    aktif ? "rotate-45 border-gama-400/50 text-gama-300" : "border-white/20 text-zinc-300"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  aktif ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/10 px-6 py-4 text-sm leading-7 text-zinc-200">
                    {item.cevap}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-gama-950 via-indigo-950 to-violet-950 p-8 text-center">
          <h2 className="text-lg font-bold text-white">Aradığını bulamadın mı?</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Sorunu bize ilet, en kısa sürede cevaplayalım.
          </p>
          <a
            href="mailto:gamaturkiye@gmail.com"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]"
          >
            Bize Yaz
          </a>
        </div>
      </Reveal>
      </div>
    </PageTransition>
  );
}
