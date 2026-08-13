"use client";

import { useSearchParams } from "next/navigation";
import { SubmitForm } from "@/components/SubmitForm";
import { regions } from "@/lib/provinces";

const atanmisIller = new Set(
  regions.flatMap((b) => b.iller).filter((i) => i.temsilci !== "Belirleniyor").map((i) => i.il)
);

const acikIller = regions
  .flatMap((b) => b.iller)
  .map((i) => i.il)
  .filter((il) => !atanmisIller.has(il));

export function TemsilciForm() {
  const searchParams = useSearchParams();
  const secilenIl = searchParams.get("il");

  return (
    <SubmitForm
      subject="İl temsilcisi başvurusu"
      buttonText="Adaylığını Gönder"
      initialValues={secilenIl && acikIller.includes(secilenIl) ? { il: secilenIl } : {}}
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
          label: "Temsil etmek istediğin il",
          type: "select",
          required: true,
          options: acikIller,
        },
        {
          name: "meslek",
          label: "Mesleğin / öğrenim durumun",
          type: "text",
          required: true,
          placeholder: "Örn. Bilgisayar Mühendisliği öğrencisi",
        },
        {
          name: "motivasyon",
          label: "Neden il temsilcisi olmak istiyorsun?",
          type: "textarea",
          required: true,
          placeholder: "Topluluk deneyimlerin, hedeflerin...",
        },
      ]}
    />
  );
}
