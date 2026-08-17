"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

const inputClass =
  "rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white placeholder-zinc-400 backdrop-blur transition-all focus:border-gama-400 focus:outline-none focus:ring-2 focus:ring-gama-400/40 focus:shadow-[0_0_20px_rgba(96,165,250,0.25)]";

export function SubmitForm({
  fields,
  tur = "form",
  tablo = "form_basvurulari",
  sabit = {},
  buttonText = "Gönder",
  successTitle = "Başvurun alındı!",
  successText = "Ekibimiz en kısa sürede seninle iletişime geçecek.",
  initialValues = {},
  onSuccess,
}: {
  subject: string;
  fields: Field[];
  tur?: string;
  tablo?: string;
  sabit?: Record<string, string>;
  buttonText?: string;
  successTitle?: string;
  successText?: string;
  initialValues?: Record<string, string>;
  onSuccess?: () => void;
}) {
  const [durum, setDurum] = useState<"bekle" | "gonderen" | "basarili" | "hata">("bekle");
  const [hata, setHata] = useState("");

  async function gonder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const veri = Object.fromEntries(new FormData(form).entries());
    if (veri.honeypot) {
      setDurum("basarili");
      form.reset();
      return;
    }
    setDurum("gonderen");
    setHata("");
    try {
      if (!supabase) {
        throw new Error("Form sistemi şu an kapalı.");
      }
      const temizVeri = Object.fromEntries(
        Object.entries(veri).map(([k, v]) => [
          k,
          typeof v === "string" ? v.slice(0, 500) : null,
        ])
      );
      if (tablo === "form_basvurulari") {
        const { error } = await supabase.from("form_basvurulari").insert({
          tur,
          ad: veri.ad ?? veri.adsoyad ?? null,
          eposta: veri.eposta ?? null,
          veri: temizVeri,
        });
        if (error) {
          throw new Error("Form gönderilemedi.");
        }
      } else {
        const { error } = await supabase
          .from(tablo)
          .insert({ ...temizVeri, ...sabit } as never);
        if (error) {
          throw new Error("Form gönderilemedi.");
        }
      }
      setDurum("basarili");
      form.reset();
      onSuccess?.();
    } catch (err) {
      setDurum("hata");
      setHata(err instanceof Error ? err.message : "Bir şeyler ters gitti.");
    }
  }

  if (durum === "basarili") {
    return (
      <div className="mt-10 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 backdrop-blur">
        <p className="font-semibold text-amber-300">{successTitle}</p>
        <p className="mt-1 text-sm text-amber-400">{successText}</p>
      </div>
    );
  }

  return (
    <form className="mt-10 grid gap-5" onSubmit={gonder}>
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
      {fields.map((f) => (
        <label key={f.name} className="grid gap-2 text-sm font-medium text-zinc-200">
          {f.label}
          {f.type === "select" ? (
            <select
              required={f.required}
              className={inputClass}
              name={f.name}
              defaultValue={initialValues[f.name] ?? ""}
            >              <option value="" disabled>
                Seç
              </option>
              {f.options?.map((o) => (
                <option key={o} value={o} className="text-zinc-900">
                  {o}
                </option>
              ))}
            </select>
          ) : f.type === "textarea" ? (
            <textarea
              required={f.required}
              className={inputClass}
              name={f.name}
              rows={4}
              placeholder={f.placeholder}
              defaultValue={initialValues[f.name] ?? ""}
            />
          ) : (
            <input
              required={f.required}
              className={inputClass}
              type={f.type ?? "text"}
              name={f.name}
              placeholder={f.placeholder}
              defaultValue={initialValues[f.name] ?? ""}
            />
          )}
        </label>
      ))}
      {durum === "hata" && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {hata}
        </p>
      )}
      <button
        type="submit"
        disabled={durum === "gonderen"}
        className="rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-7 py-3 font-semibold text-white shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all hover:shadow-[0_0_36px_rgba(96,165,250,0.65)] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
      >
        {durum === "gonderen" ? "Gönderiliyor..." : buttonText}
      </button>
      <p className="text-xs leading-5 text-zinc-400">
        Formu göndererek Gama Topluluğu&apos;nun seninle iletişim kurmasına izin vermiş olursun.
        Bilgilerin yalnızca topluluk çalışmaları için kullanılır, üçüncü kişilerle paylaşılmaz.
      </p>
    </form>
  );
}
