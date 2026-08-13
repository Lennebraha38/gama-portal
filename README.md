# Gama Portal

Gama topluluğunun web portalı. Türkiye'nin teknolojik ve bilimsel bağımsızlığına katkı sağlamak amacıyla yola çıkan topluluğun üyelerini, projelerini, duyurularını ve il temsilcilerini bir araya getirir.

## Teknoloji Yığını

- [Next.js](https://nextjs.org) 16 (App Router, statik export) — React framework
- [Tailwind CSS](https://tailwindcss.com) v4 — stil
- [TypeScript](https://www.typescriptlang.org)
- [GoatCounter](https://www.goatcounter.com) — analitik
- [Web3Forms](https://web3forms.com) / [FormSubmit](https://formsubmit.co) — form teslimi
- GitHub Pages — barındırma

## Geliştirme

Gereksinimler: Node.js 20+

```bash
npm install
cp .env.example .env.local   # isteğe bağlı: form/doğrulama anahtarları
npm run dev
```

http://localhost:3000 adresinde çalışır.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Statik export (`out/`) + tip kontrolü |
| `npm run lint` | ESLint |
| `scripts/domain-gec.sh` | `gama.is-a.dev` alan adına geçiş (`--geri-al` ile geri dönüş) |
| `scripts/olustur-harita.py` | Harita verisi üretici |

## Proje Yapısı

```
src/
├── app/            # Sayfalar (App Router)
│   ├── page.tsx            # Anasayfa
│   ├── duyurular/          # Duyuru listesi + detay (markdown)
│   ├── projeler/           # Proje vitrini
│   ├── etkinlikler/        # Etkinlik listesi
│   ├── iller/              # İl temsilcileri (arama + harita)
│   ├── hakkimizda/         # Vizyon & misyon
│   ├── sss/                # Sıkça sorulan sorular
│   └── katil|temsilci|iletisim  # Form sayfaları
├── components/     # Header, Footer, harita, formlar, animasyonlar
├── content/duyurular/  # Markdown duyurular (frontmatter + içerik)
└── lib/            # site.ts (yapılandırma), provinces.ts, duyurular.ts
```

## Duyuru Ekleme

`src/content/duyurular/` klasörüne bir `.md` dosyası ekle:

```md
---
baslik: "Etkinlik duyurusu"
tarih: "2026-08-13"
tur: "Etkinlik"
ozet: "Kısa özet (liste ve arama sonuçlarında görünür)"
---

İçerik buraya. **Kalın**, [link](https://...) ve ## başlık desteklenir.
```

Build sonrası otomatik olarak `/duyurular`, ana sayfa ve RSS beslemesine eklenir.

## Deploy

`main` dalına push edince GitHub Actions iki iş çalıştırır:

1. **CI** — lint + build (her push'ta)
2. **Deploy to GitHub Pages** — `out/` klasörünü yayınlar

Alan adı: `gama.is-a.dev` başvurusu [is-a-dev/register#46913](https://github.com/is-a-dev/register/pull/46913). PR merge olduğunda `.github/workflows/domain-takip.yml` otomatik geçişi uygular (siteUrl + basePath), sonrasında yalnızca GitHub Pages ayarlarında HTTPS'in etkin olduğunu doğrulamak gerekir.

## Yol Haritası

- [x] MVP v1 — statik sayfalar, katılım formu, il haritası
- [x] Duyuru sistemi + RSS + SEO schema
- [x] İl arama + temsilci başvuru akışı
- [x] Performans: harita lazy-load (%70 HTML küçülmesi)
- [ ] `gama.is-a.dev` alan adına geçiş (PR #46913 bekleniyor)
- [ ] Veritabanı (MVP sonrası) — başvuruların kalıcı kaydı
- [ ] Yönetim paneli — koordinatör/proje yönetimi

## Katkı

Yeni başlayanlardan ileri seviyeye görev katmanları: içerik ve dokümantasyon, basit bileşenler, sayfalar, formlar, API ve mimari. Sorun bildirmek veya fikir paylaşmak için GitHub issue açın.
