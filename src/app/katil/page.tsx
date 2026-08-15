"use client";

import { SubmitForm } from "@/components/SubmitForm";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { tumIller } from "@/lib/provinces";

const roller = [
  "Üye",
  "Proje Geliştirici (Yazılım)",
  "Proje Geliştirici (Donanım)",
  "İl Temsilcisi Adayı",
  "Mentor",
];

export default function KatilPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Bize Katıl
          </h1>
          <p className="mt-3 text-zinc-300">
            Formu doldur; yazılım, donanım veya mentorluk yolculuğuna ilk adımı
            atalım.
          </p>
        </Reveal>

      <Reveal delay={120}>
        <SubmitForm
        subject="Yeni üyelik başvurusu"
      tur="katil"
        buttonText="Başvuruyu Gönder"
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
          {
            name: "il",
            label: "İl",
            type: "select",
            required: true,
            options: tumIller,
          },
          {
            name: "rol",
            label: "İlgilendiğin rol",
            type: "select",
            required: true,
            options: roller,
          },
          {
            name: "tanitim",
            label: "Kendini kısaca tanıt",
            type: "textarea",
            placeholder: "Deneyimlerin, hedeflerin, ilgi alanların...",
          },
        ]}
      />
      </Reveal>
      </div>
    </PageTransition>
  );
}
