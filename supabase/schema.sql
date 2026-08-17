-- Gama Portal — Supabase şeması
-- Çalıştırma: Supabase Dashboard → SQL Editor → yapıştır → Run

-- ============ FORM BAŞVURULARI ============
-- tur: iletisim | katil | temsilci | bulten | proje | mentor | takim | form
-- Önceden manuel eklenen form_tur_whitelist kısıtını genişlet (proje, mentor, takim):
alter table public.form_basvurulari drop constraint if exists form_tur_whitelist;
alter table public.form_basvurulari add constraint form_tur_whitelist
  check (tur in ('iletisim','katil','temsilci','bulten','proje','mentor','takim','form'));
create table if not exists public.form_basvurulari (
  id uuid primary key default gen_random_uuid(),
  tur text not null, -- iletisim | katil | temsilci
  ad text,
  eposta text,
  veri jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists form_basvurulari_tur_idx on public.form_basvurulari (tur);
create index if not exists form_basvurulari_tarih_idx on public.form_basvurulari (created_at desc);

alter table public.form_basvurulari enable row level security;

-- Herkes başvuru gönderebilir (anon key sadece insert)
create policy "basvuru_gonder" on public.form_basvurulari
  for insert with check (true);

-- Okuma/yönetim: dashboard'dan (service_role otomatik bypass eder)

-- ============ İÇERİK VERİTABANI ============
create table if not exists public.icerik_duyurular (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  baslik text not null,
  tarih date not null,
  tur text not null default 'Topluluk',
  ozet text not null default '',
  icerik text not null default '', -- markdown
  yayinda boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.icerik_gunluk (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  baslik text not null,
  tarih date not null,
  ozet text not null default '',
  icerik text not null default '', -- markdown
  yayinda boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.icerik_projeler (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  baslik text not null,
  durum text not null default 'aktif',
  ozet text not null default '',
  icerik text not null default '', -- markdown
  yayinda boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.icerik_etkinlikler (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  baslik text not null,
  tarih date not null,
  sehir text not null default '',
  baslangic_iso timestamptz,
  ozet text not null default '',
  icerik text not null default '',
  yayinda boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Yayındaki içerik herkese okunabilir (site statik export'ta build sırasında çeker)
alter table public.icerik_duyurular enable row level security;
alter table public.icerik_gunluk enable row level security;
alter table public.icerik_projeler enable row level security;
alter table public.icerik_etkinlikler enable row level security;

create policy "duyuru_oku" on public.icerik_duyurular for select using (yayinda = true);
create policy "gunluk_oku" on public.icerik_gunluk for select using (yayinda = true);
create policy "proje_oku" on public.icerik_projeler for select using (yayinda = true);
create policy "etkinlik_oku" on public.icerik_etkinlikler for select using (yayinda = true);

-- Build script'in md dosyalarını birebir üretebilmesi için eksik alanlar:
alter table public.icerik_gunluk add column if not exists yazar text not null default '';
alter table public.icerik_gunluk add column if not exists etiketler text not null default '';
alter table public.icerik_projeler add column if not exists kapsam text not null default '';
alter table public.icerik_projeler add column if not exists takim text not null default '';
alter table public.icerik_projeler add column if not exists sehir text not null default '';
alter table public.icerik_projeler add column if not exists site text not null default '';
alter table public.icerik_etkinlikler add column if not exists saat text not null default '10:00';
alter table public.icerik_etkinlikler add column if not exists bitis text not null default '17:00';
alter table public.icerik_etkinlikler add column if not exists yer text not null default '';
alter table public.icerik_etkinlikler add column if not exists kayit text not null default '';
alter table public.icerik_etkinlikler add column if not exists katilim_sayisi int not null default 0;

-- ============ ETKİNLİK KATILIMLARI ============
create table if not exists public.etkinlik_katilimlari (
  id uuid primary key default gen_random_uuid(),
  etkinlik_slug text not null,
  ad text not null default '',
  eposta text not null default '',
  created_at timestamptz not null default now(),
  unique (etkinlik_slug, eposta)
);

create index if not exists etkinlik_katilimlari_slug_idx on public.etkinlik_katilimlari (etkinlik_slug);

alter table public.etkinlik_katilimlari enable row level security;

-- Herkes katılım bildirebilir (anon key sadece insert)
create policy "etkinlik_katilim_ekle" on public.etkinlik_katilimlari
  for insert with check (true);

-- Katılım bildirimi etkinlikteki sayacı bir artırır
create or replace function public.etkinlik_katilim_artir()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.icerik_etkinlikler
  set katilim_sayisi = katilim_sayisi + 1
  where slug = new.etkinlik_slug;
  return new;
end; $$;

create trigger etkinlik_katilim_artir_trg
  after insert on public.etkinlik_katilimlari
  for each row execute function public.etkinlik_katilim_artir();

-- ============ CHALLENGE KATILIMLARI ============
create table if not exists public.challenge_katilimlari (
  id uuid primary key default gen_random_uuid(),
  challenge_slug text not null,
  ad text not null default '',
  eposta text not null default '',
  cozum_url text not null default '',
  aciklama text not null default '',
  created_at timestamptz not null default now(),
  unique (challenge_slug, eposta)
);

create index if not exists challenge_katilimlari_slug_idx on public.challenge_katilimlari (challenge_slug);

alter table public.challenge_katilimlari enable row level security;

-- Herkes çözüm gönderebilir (anon key sadece insert)
create policy "challenge_katilim_ekle" on public.challenge_katilimlari
  for insert with check (true);

-- ============ İÇERİK: BÜLTENLER ============
create table if not exists public.icerik_bultenler (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  baslik text not null,
  tarih date not null,
  ozet text not null default '',
  icerik text not null default '', -- markdown
  yayinda boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.icerik_bultenler enable row level security;
create policy "bulten_oku" on public.icerik_bultenler for select using (yayinda = true);

-- ============ İÇERİK: CHALLENGE ============
create table if not exists public.icerik_challenges (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  baslik text not null,
  hafta int not null default 1,
  zorluk text not null default 'Orta', -- Kolay | Orta | Zor
  alan text not null default '',
  son_tarih date,
  ozet text not null default '',
  icerik text not null default '', -- markdown
  yayinda boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.icerik_challenges enable row level security;
create policy "challenge_oku" on public.icerik_challenges for select using (yayinda = true);

-- ============ İÇERİK: AMA ============
create table if not exists public.icerik_amalar (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  konuk text not null,
  alan text not null default '',
  tarih date not null,
  ozet text not null default '',
  icerik text not null default '', -- markdown
  yayinda boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.icerik_amalar enable row level security;
create policy "ama_oku" on public.icerik_amalar for select using (yayinda = true);

-- ============ SEED: MEVCUT İÇERİK ============
-- Şu an md dosyalarında duran içerikler; tablolar kurulunca site aynı içerikle devam eder.
insert into public.icerik_duyurular (slug, baslik, tarih, tur, ozet, icerik, yayinda) values
('hos-geldin', 'Gama Topluluğu duyuru sistemine hoş geldin', '2026-08-13', 'Topluluk',
 'Duyurular artık sitede yayınlanıyor. Etkinlik ve proje duyurularını bu sayfadan takip edebilirsin.',
 E'Bu sayfada Gama''nın etkinlik ve proje duyuruları yayınlanacak.\n\n## Nasıl takip ederim?\n\n- Duyuru sayfasını düzenli olarak ziyaret edebilirsin.\n- Instagram hesabımızı takip ederek duyurulardan haberdar olabilirsin.\n- Bülten formumuza abone olarak gelişmeleri e-posta ile alabilirsin.\n\n## İlk duyurular\n\nYakında ilk etkinlik duyurumuz burada olacak. İçerik önerilerin için [bize yaz](mailto:gamaturkiye@gmail.com).',
 true),
('il-temsilcilikleri-basvurulari', 'İl temsilcilikleri başvuruları açıldı', '2026-08-18', 'Topluluk',
 'Atanmamış iller için temsilci adaylığı başvuruları açık. Şehrinde Gama''yı kurmak isteyenler başvurabilir.',
 E'81 ilde büyüyen ağımıza yeni temsilciler arıyoruz!\n\n## Nasıl çalışıyor?\n\nHer ilde Gama''yı temsil eden bir koordinatör bulunuyor. Temsilcilerimiz:\n\n- Şehirlerindeki gençleri toplulukla buluşturuyor\n- Etkinlik organizasyonlarında yer alıyor\n- Proje ekiplerinin yerel ayağını kuruyor\n\n## Başvuru\n\nAtanmamış bir il için aday olmak istersen [temsilci başvuru formuna](/temsilci) gidebilirsin. [İl sayfamızdan](/iller) hangi illerin temsilcisi olduğunu görebilirsin.\n\nBaşvurular koordinasyon ekibi tarafından değerlendirilir ve sonuçlar duyuru sayfamızdan paylaşılır.',
 true)
on conflict (slug) do nothing;

insert into public.icerik_gunluk (slug, baslik, tarih, yazar, etiketler, ozet, icerik, yayinda) values
('gama-nedir', 'Gama Nedir? Türkiye''nün Gençlik Ar-Ge Birliği', '2026-08-01', 'Gama Medya Ekibi', 'Gama, Topluluk, Vizyon',
 'Gama, Türkiye''nin teknolojik ve bilimsel bağımsızlığına katkı sağlamak için kuruldu. Üç temel sütunla gençleri fikirlerini hayata geçirmeye davet ediyor: Kaynak, Takım, Mentorluk.',
 E'Gama, Türkiye''nin teknolojik ve bilimsel bağımsızlığına katkı sağlamak için yola çıkan bir gençlik Ar-Ge birliğidir. Vizyonumuz basit: coğrafi sınırları ortadan kaldırarak her gencin yenilikçi fikrini hayata geçirmesine destek olmak.\n\n## Neden Gama?\n\nTürkiye''nin geleceği, bugün üniversite sıralarında ve yerel okullarda okuyan gençlerin ellerinde şekillenecek. Ancak fikirlerin hayata geçmesi için yalnızca heves yetmez; kaynak, ekip ve rehberlik gerekir. Gama, bu üç eksik halkayı tamamlamak için kuruldu.\n\n## Üç temel sütun\n\n- **Kaynak:** Fon, araç ve altyapı imkânlarını gençlerin projelerine aktarıyoruz.\n- **Takım:** Farklı disiplinlerden gençleri bir araya getirerek güçlü ekipler kuruyoruz.\n- **Mentorluk:** Alanında uzman mentorlarla gençleri birebir buluşturuyoruz.\n\n## Nasıl dahil olursun?\n\n81 ildeki temsilcilik ağımız sayesinde bulunduğun şehirden bağımsız olarak topluluğa katılabilirsin. Etkinliklerimize kayıt olabilir, projelerimize başvurabilir veya ilinin temsilcisi olmak için [başvurabilirsin](/temsilci). Kapılarımız herkese açık; tek koşul merak ve üretme isteği.',
 true),
('ilk-hackathon-rehberi', 'İlk Hackathonuna Katılmadan Önce Bilmen Gereken 7 Şey', '2026-08-06', 'Gama Medya Ekibi', 'Hackathon, Rehber, Öğrenme',
 'Hackathon deneyimi olmayanlar için pratik rehber: takım kurma, soru sorma, MVP odaklı kalma ve sunum ipuçları. Derece kazanmak değil, öğrenmek önemli.',
 E'Hackathonlar kulağa korkutucu gelebilir ama doğru zihniyetle yaklaşıldığında bir hafta sonunun en değerli deneyimlerinden birine dönüşür. İlk hackathonuna hazırlananlar için notlarımız:\n\n## 1. Takım kur, yalnız kalma\n\nTek başına başlamak cazip olsa da takımlar daha hızlı ilerler. Farklı yeteneklere sahip 3-4 kişilik ekipler en sağlıklı ritmi yakalar: biri kodlar, biri tasarlar, biri sunumu kurgular.\n\n## 2. Soru sormaktan çekinme\n\nMentorlar tam da bunun için oradalar. "Soru yok" demek en büyük kayıptır. Takıldığın her noktada sor; on beş dakika beklemen gereken soru, saatlerce sürebilecek bir takılmanın önüne geçer.\n\n## 3. MVP''ye odaklan\n\nSüre kısıtlı; hayalindeki bütün özellikleri yapamayacaksın. Tek bir çekirdek işlevi kusursuza yakın çalıştırmak, yarım kalan beş özellikten her zaman iyidir. Önce yürüyen bir şey, sonra süsleme.\n\n## 4. Uyku ve molalar işini hızlandırır\n\n24 saat uykusuz kalmanın "marifet" olmadığını göreceksin. Kısa molalar, temiz kafa ve doğru kararlar; geç saatlerdeki kafein yüklemesinden çok daha üretken.\n\n## 5. Sunumu son dakikaya bırakma\n\nJüri, ürünü demo üzerinden değerlendirir. Çekirdek demoyu önceden kurgula: ne anlatacaksın, hangi sırayla, nerede duracaksın? Kuru bir kod yerine bir hikâye anlat.\n\n## 6. Derece önemli değil, öğrenme kalıcı\n\nİlk hackathonunda kazanmak şans meselesi olabilir; ancak yeni araçlar öğrenmek, ekip çalışması pratiği ve mentorlarla kurduğun bağlar sürekli kazanımdır.\n\n## 7. Bitince bırakma\n\nHackathon sonrası projeni geliştirmeye devam et. Jüriden gelen geri bildirimler ve kendi notların, sonraki projen için en değerli başlangıç noktasıdır.\n\nGama Hackathon Serisi başvuruları [projeler sayfamızda](/projeler/gama-hackathon-serisi). Görüşmek üzere.',
 true)
on conflict (slug) do nothing;

insert into public.icerik_projeler (slug, baslik, durum, kapsam, takim, sehir, site, ozet, icerik, yayinda) values
('81-il-temsilcilik-agi', '81 İl Temsilcilik Ağı', 'Aktif', 'Yerel Organizasyon', '5 Bölge Koordinatörü', '81 İl', '',
 'Her ilde en az bir temsilci ile Türkiye''nin dört bir yanındaki gençlere ulaşan yerel topluluk ağı. Bulunduğun ilde Gama''yı temsil eden isim ol.',
 E'Türkiye''nin 81 ilinde gencin, nerede doğduğu fark etmeksizin aynı fırsatlara erişmesi gerektiğine inanıyoruz. İl Temsilcilik Ağı, bu vizyonun taşra organizasyonudur.\n\n## Temsilci ne yapar?\n\n- Bulunduğu ilde Gama''yı temsil eder ve topluluğu duyurur\n- Yerel okullar ve kulüplerle iletişim kurar\n- Çevrimiçi etkinliklere katılımı organize eder\n- Yerel yüz yüze buluşmalarda ekip kurulmasına öncülük eder\n\n## Kimler başvurabilir?\n\nHerkes. Yaş veya deneyim şartı aranmaz; gönüllülük ve sorumluluk duygusu yeterlidir. Temsilcilerimize rehberlik, eğitim ve tanıtım materyali desteği sağlanır.\n\n## Sonraki adım\n\n[İl temsilcisi başvuru formu](/temsilci) üzerinden ilini seçip başvurun. Aday olduğun ilin sayfasını [buradan](/iller) inceleyebilirsin.',
 true),
('gama-hackathon-serisi', 'Gama Hackathon Serisi', 'Başvuruya Açık', 'Yarışma', 'Gama Etkinlik Ekibi', 'Çevrimiçi + Yüz yüze', '',
 'Milli yazılım, yapay zekâ ve otonom sistemler temalı hackathon serisi. Takım kur, kendi fikrini geliştir, mentorlarla tanış; dereceye giren projelere geliştirme desteği sağlanır.',
 E'Hackathon serisi, gençlerin fikirlerini kodla buluşturduğu yarışma programıdır. Her yaştan katılımcıya açıktır; ön koşul deneyim değil, meraktır.\n\n## Dönem temaları\n\n- **Milli yazılım ve veri** — yerli çözümler ve veri bilimi\n- **Yapay zekâ uygulamaları** — fikirden çalışan demo''ya\n- **Otonom sistemler** — simülasyon ve robotik görevler\n\n## Katılımcıya neler sağlanır?\n\n- Takım kurma ve fikir geliştirme atölyeleri\n- Alanında uzman mentor desteği\n- Dereceye giren projelere geliştirme ve tanıtım desteği\n\n## Nasıl katılırım?\n\n[Kayıt sayfası](/katil) üzerinden iletişim bilgini bırak; yeni duyuru açıldığında sana ulaşalım. Takımın varsa birlikte başvurabilirsin.',
 true),
('gama-portal', 'Gama Portal', 'Geliştiriliyor', 'Web Platformu', 'Gama Yazılım Ekibi', 'Çevrimiçi', 'https://lennebraha38.github.io/gama-portal',
 'Topluluğun dijital evi: etkinlik takvimi, il temsilcilik ağı, kayıt altyapısı ve topluluk içeriğini tek platformda buluşturan açık kaynak web platformu.',
 E'Gama Portal, topluluğumuzun dijital omurgasıdır. 81 ildeki temsilcilerimiz, etkinlik takvimi, duyurular ve kayıt altyapısı tek çatı altında birleşir; yenilikçi fikirler coğrafyadan bağımsız olarak hayata geçer.\n\n## Neler sunuyor\n\n- **Canlı gösterge** — topluluğun anlık durumu ve sonraki etkinlik bilgisi\n- **81 il bağımsız sayfası** — her ilin temsilcisi ve iletişim bilgisi\n- **Etkinlik altyapısı** — kayıt formları ve tek tıkla takvime ekleme (ICS)\n- **Topluluk içeriği** — duyurular ve Bilim Günlüğü yazıları tek akışta\n- **Hızlı arama** — tüm içerikte anında filtreleme\n\n## Teknik altyapı\n\nProje açık kaynak yaklaşımıyla geliştirilir: Next.js ile statik üretim, sıfır sunucu maliyeti ve GitHub Pages üzerinde yayın. Arayüz; derin gece mavisi ve altın aksanlarla "Sistem / Gama" kimliğini taşır.\n\n## Nasıl katkı verilir\n\nYazılım, tasarım veya içerik alanlarında destek olmak isteyen gençler [katılım formu](/katil) üzerinden başvurabilir. Deneyim seviyesi fark etmez; istek ve öğrenme motivasyonu yeterlidir.',
 true)
on conflict (slug) do nothing;

-- ============ İL SKORLARI (LİDERLİK TABLOSU) ============
-- Her ay temsilciler günceller; yayinda=true olan satırlar siteye yansır.
create table if not exists public.il_skorlari (
  il text primary key,
  uye_sayisi int not null default 0,
  etkinlik_sayisi int not null default 0,
  proje_sayisi int not null default 0,
  mentor_sayisi int not null default 0,
  puan int not null default 0,
  ay text not null default to_char(now(), 'YYYY-MM'),
  yayinda boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists il_skorlari_ay_idx on public.il_skorlari (ay);
create index if not exists il_skorlari_puan_idx on public.il_skorlari (puan desc);

alter table public.il_skorlari enable row level security;

-- Yayındaki skorlar herkese okunabilir; yazma/güncelleme dashboard'dan (service_role)
create policy "skor_oku" on public.il_skorlari
  for select using (yayinda = true);

-- ============ ÜYELİK / PROFİLLER ============
create table if not exists public.profiller (
  id uuid primary key references auth.users(id) on delete cascade,
  ad text not null default '',
  il text default '',
  okul text default '',
  bolum text default '',
  yas int,
  rol text not null default 'uye', -- uye | temsilci | koordinator | admin
  durum text not null default 'aktif',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiller enable row level security;

-- Üye kendi profiline erişir; yönetim dashboard'dan
create policy "profil_kendi" on public.profiller
  for all using (auth.uid() = id) with check (auth.uid() = id);
