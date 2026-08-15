-- Gama Portal — Supabase şeması
-- Çalıştırma: Supabase Dashboard → SQL Editor → yapıştır → Run

-- ============ FORM BAŞVURULARI ============
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
