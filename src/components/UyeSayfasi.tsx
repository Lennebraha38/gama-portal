"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { tumIller } from "@/lib/provinces";
import { GunlukGorev } from "@/components/GunlukGorev";
import Link from "next/link";

type Profil = {
  ad: string;
  il: string;
  okul: string;
  bolum: string;
  rol: string;
};

const bosProfil: Profil = { ad: "", il: "", okul: "", bolum: "", rol: "uye" };

const inputClass =
  "rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white placeholder-zinc-400 backdrop-blur transition-all focus:border-gama-400 focus:outline-none focus:ring-2 focus:ring-gama-400/40";

export function UyeSayfasi() {
  const [oturum, setOturum] = useState<boolean | null>(null);
  const [eposta, setEposta] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const [hata, setHata] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [profil, setProfil] = useState<Profil>(bosProfil);
  const [profilYuklendi, setProfilYuklendi] = useState(false);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [kayitDurum, setKayitDurum] = useState<"bekle" | "tamam">("bekle");

  const profilYukle = useCallback(async (kullaniciId: string) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("profiller")
      .select("ad, il, okul, bolum, rol")
      .eq("id", kullaniciId)
      .maybeSingle();
    if (error) return;
    if (data) {
      setProfil({
        ad: data.ad ?? "",
        il: data.il ?? "",
        okul: data.okul ?? "",
        bolum: data.bolum ?? "",
        rol: data.rol ?? "uye",
      });
    }
    setProfilYuklendi(true);
  }, []);

  useEffect(() => {
    let iptal = false;
    let abonelik: { subscription: { unsubscribe: () => void } } | undefined;
    async function baslat() {
      await Promise.resolve();
      if (!supabase) {
        if (!iptal) setOturum(false);
        return;
      }
      const istemci = supabase;
      const { data } = await istemci.auth.getSession();
      if (iptal) return;
      if (data.session) {
        setOturum(true);
        void profilYukle(data.session.user.id);
      } else {
        setOturum(false);
      }
      if (!iptal) {
        const { data: abonelikVerisi } = istemci.auth.onAuthStateChange(
          (_olay, oturum) => {
            setOturum(Boolean(oturum));
            if (oturum) void profilYukle(oturum.user.id);
          },
        );
        abonelik = abonelikVerisi;
      }
    }
    void baslat();
    return () => {
      iptal = true;
      abonelik?.subscription.unsubscribe();
    };
  }, [profilYukle]);

  async function girisGonder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHata("");
    setGonderiliyor(true);
    try {
      if (!supabase) throw new Error("Üyelik sistemi şu an hazırlanıyor.");
      const { error } = await supabase.auth.signInWithOtp({
        email: eposta,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/uye`,
        },
      });
      if (error) throw error;
      setGonderildi(true);
    } catch (err) {
      setHata(
        err instanceof Error && err.message.includes("redirect")
          ? "E-posta yönlendirme adresi Supabase'te tanımlı değil. Site URL ayarına GitHub Pages adresi eklenmeli."
          : err instanceof Error
            ? err.message
            : "Bağlantı hatası, kısa süre sonra tekrar dene."
      );
    } finally {
      setGonderiliyor(false);
    }
  }

  async function profilKaydet(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    setKaydediliyor(true);
    setKayitDurum("bekle");
    const { error } = await supabase.from("profiller").upsert({
      id: user.id,
      ad: profil.ad,
      il: profil.il,
      okul: profil.okul,
      bolum: profil.bolum,
    });
    setKaydediliyor(false);
    if (!error) setKayitDurum("tamam");
  }

  async function cikisYap() {
    if (supabase) await supabase.auth.signOut();
  }

  if (oturum === null) return null;

  if (!oturum) {
    return (
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
            Gama Üyeliği
          </p>
          <h1 className="mt-2 text-2xl font-bold text-white">Hesabına giriş yap</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            E-postana tek kullanımlık bir giriş bağlantısı gönderiyoruz. Üyelik
            rozetin, profil alanların ve temsilci panon burada toplanır.
          </p>

          {gonderildi ? (
            <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              E-postana giriş bağlantısını gönderdik. Gelen kutusunu kontrol et;
              bağlantıyla geri döndüğünde oturumun açılır.
            </div>
          ) : (
            <form className="mt-6 grid gap-4" onSubmit={girisGonder}>
              <label className="grid gap-2 text-sm font-medium text-zinc-200">
                E-posta
                <input
                  type="email"
                  required
                  className={inputClass}
                  value={eposta}
                  onChange={(e) => setEposta(e.target.value)}
                  placeholder="ornek@eposta.com"
                />
              </label>
              {hata && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {hata}
                </p>
              )}
              <button
                type="submit"
                disabled={gonderiliyor}
                className="rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {gonderiliyor ? "Gönderiliyor..." : "Giriş Bağlantısı Gönder"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Gama Üyesi
            </p>
            <p className="mt-1 text-xl font-bold text-white">
              {profil.ad || "Hoş geldin"}
              {profil.rol === "temsilci" && (
                <span className="ml-3 rounded-full bg-amber-400/20 px-3 py-1 align-middle text-xs font-semibold text-amber-200">
                  İl Temsilcisi
                </span>
              )}
            </p>
            <p className="mt-1 text-sm text-zinc-300">
              Profilini tamamla; rozetlerin{" "}
              <Link href="/kaynak" className="text-gama-300 underline-offset-4 hover:underline">
                Katkı Rozetleri
              </Link>{" "}
              sayfasında birikir.
            </p>
          </div>
          <button
            type="button"
            onClick={cikisYap}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/10"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {profilYuklendi && profil.rol === "temsilci" && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
            Temsilci Panosu
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            İlindeki üye, etkinlik, proje ve mentorluk verilerini dönem sonunda
            koordinasyon ekibiyle paylaş. Her göstergen ilinin liderlik
            skoruna katkı sağlar:
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-zinc-200 sm:grid-cols-2">
            <li className="rounded-xl bg-white/5 px-4 py-3">Üye başına 1 puan</li>
            <li className="rounded-xl bg-white/5 px-4 py-3">Etkinlik başına 5 puan</li>
            <li className="rounded-xl bg-white/5 px-4 py-3">Vitrin projesi başına 10 puan</li>
            <li className="rounded-xl bg-white/5 px-4 py-3">Mentor eşleşmesi başına 3 puan</li>
          </ul>
          <Link
            href="/liderlik"
            className="mt-5 inline-block rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Liderlik Tablosu →
          </Link>
        </div>
      )}

      <form className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur" onSubmit={profilKaydet}>
        <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
          Profilin
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            Ad Soyad
            <input
              className={inputClass}
              value={profil.ad}
              onChange={(e) => setProfil({ ...profil, ad: e.target.value })}
              placeholder="Adın soyadın"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            İl
            <select
              className={inputClass}
              value={profil.il}
              onChange={(e) => setProfil({ ...profil, il: e.target.value })}
            >
              <option value="">Seç</option>
              {tumIller.map((il) => (
                <option key={il} value={il} className="text-zinc-900">
                  {il}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            Okul / Kurum
            <input
              className={inputClass}
              value={profil.okul}
              onChange={(e) => setProfil({ ...profil, okul: e.target.value })}
              placeholder="Okulun ya da kurumun"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            Bölüm / Alan
            <input
              className={inputClass}
              value={profil.bolum}
              onChange={(e) => setProfil({ ...profil, bolum: e.target.value })}
              placeholder="Bölümün ya da ilgi alanın"
            />
          </label>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <button
            type="submit"
            disabled={kaydediliyor}
            className="rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] disabled:opacity-60"
          >
            {kaydediliyor ? "Kaydediliyor..." : "Kaydet"}
          </button>
          {kayitDurum === "tamam" && (
            <span className="text-sm font-semibold text-emerald-300">Profilin kaydedildi</span>
          )}
          {!profilYuklendi && (
            <span className="text-sm text-zinc-400">Profil alanları hazırlanıyor...</span>
          )}
        </div>
      </form>

      <div className="mt-6">
        <GunlukGorev />
      </div>
    </div>
  );
}