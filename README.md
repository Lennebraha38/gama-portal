# Gama Portal

Gama topluluğunun web portalı. Türkiye'nin teknolojik ve bilimsel bağımsızlığına katkı sağlamak amacıyla yola çıkan topluluğun üyelerini, projelerini ve il temsilcilerini bir araya getirir.

## Teknoloji Yığını

- [Next.js](https://nextjs.org) (App Router) — React framework
- [Tailwind CSS](https://tailwindcss.com) — stil
- [Supabase](https://supabase.com) — veritabanı ve kimlik doğrulama (MVP sonrası entegre edilecek)
- [TypeScript](https://www.typescriptlang.org)

## Geliştirme

Gereksinimler: Node.js 20+

```bash
npm install
npm run dev
```

http://localhost:3000 adresinde çalışır.

## Proje Yapısı

```
src/
├── app/          # Sayfalar (App Router)
│   ├── page.tsx          # Anasayfa
│   ├── projeler/         # Proje vitrini
│   ├── iller/            # İl temsilcileri
│   ├── hakkimizda/       # Vizyon & misyon
│   └── katil/            # Katılım formu
├── components/   # Header, Footer ve paylaşılan bileşenler
└── lib/
    └── site.ts   # Site yapılandırması ve veriler
```

## Yol Haritası

- [x] MVP v1 — statik sayfalar ve katılım formu
- [ ] Supabase bağlantısı — başvuruların veritabanına kaydı
- [ ] Yönetim paneli — koordinatör/proje yönetimi
- [ ] Canlıya alma + alan adı

## Katkı

Yeni başlayanlardan ileri seviyeye görev katmanları: içerik ve dokümantasyon, basit bileşenler, sayfalar, formlar, API ve mimari. Sorun bildirmek veya fikir paylaşmak için GitHub issue açın.
