import type { Metadata } from "next";
import { Suspense } from "react";
import { TemsilciForm } from "@/components/TemsilciForm";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "İl Temsilcisi Başvurusu",
  description:
    "Bulunduğun ilde Gama'yı temsil et. İl koordinatörü başvuru formu ile adaylığını ilet.",
};

export default function TemsilciPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-500">/</span> Gama
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            İl Temsilcisi Adayı Ol
          </h1>
          <p className="mt-3 text-zinc-300">
            Bulunduğun ilde Gama&apos;yı temsil etmek ister misin? Koordinatörlük
            başvurunu ilet, ekibimiz seninle iletişime geçsin.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Suspense>
            <TemsilciForm />
          </Suspense>
        </Reveal>
      </div>
    </PageTransition>
  );
}
