"use client";

import { useState } from "react";
import { SubmitForm } from "@/components/SubmitForm";
import { KatilimSayaci } from "@/components/KatilimSayaci";
import { ROZET_ANAHTARLARI, rozetIsaretle } from "@/lib/rozetler";

export function EtkinlikKayit({ slug, ad }: { slug: string; ad: string }) {
  const [katildi, setKatildi] = useState(0);

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
            Katılım
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">Ben katılıyorum</h2>
        </div>
        <KatilimSayaci key={katildi} slug={slug} />
      </div>
      <SubmitForm
        subject={`Katılım: ${ad}`}
        tablo="etkinlik_katilimlari"
        sabit={{ etkinlik_slug: slug }}
        buttonText="Katılımı Bildir"
        successTitle="Görüşürüz!"
        successText="Katılımın kaydedildi. Etkinlik günü bilgileri duyurulardan paylaşılacak."
        fields={[
          {
            name: "ad",
            label: "Ad Soyad",
            type: "text",
            required: true,
            placeholder: "Adın soyadın",
          },
          {
            name: "eposta",
            label: "E-posta",
            type: "email",
            required: true,
            placeholder: "ornek@eposta.com",
          },
        ]}
        onSuccess={() => {
          try {
            rozetIsaretle(window.localStorage, ROZET_ANAHTARLARI.katilim);
          } catch {
            // depolama kapalıysa rozet kaydedilmez
          }
          setKatildi((k) => k + 1);
        }}
      />
    </div>
  );
}