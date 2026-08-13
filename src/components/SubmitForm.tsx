"use client";

import { useState, type FormEvent } from "react";
import { formConfig } from "@/lib/forms";

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
  subject,
  fields,
  buttonText = "Gönder",
  successTitle = "Başvurun alındı!",
  successText = "Ekibimiz en kısa sürede seninle iletişime geçecek.",
  initialValues = {},
}: {
  subject: string;
  fields: Field[];
  buttonText?: string;
  successTitle?: string;
  successText?: string;
  initialValues?: Record<string, string>;
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
      const endpoint = formConfig.web3formsKey
        ? "https://api.web3forms.com/submit"
        : `https://formsubmit.co/ajax/${formConfig.email}`;
      const body = formConfig.web3formsKey
        ? { access_key: formConfig.web3formsKey, subject, ...veri }
        : { _subject: subject, _captcha: "false", ...veri };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      const basarili = json?.success === true || json?.success === "true";
      if (!res.ok || !basarili) {
        throw new Error(json?.message || "Form gönderilemedi.");
      }
      setDurum("basarili");
      form.reset();
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
          {hata} Bir sorun varsa doğrudan {formConfig.email} adresine yazabilirsin.
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
