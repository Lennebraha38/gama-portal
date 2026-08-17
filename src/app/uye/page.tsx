import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { UyeSayfasi } from "@/components/UyeSayfasi";

export const metadata: Metadata = {
  title: "Üye Girişi",
  description:
    "Gama üyeliği: e-posta ile giriş yap, profilini oluştur, rozetlerini topla ve temsilci panona eriş.",
};

export default function UyePage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 05 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Üyelik</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Tek e-posta ile üye ol, profilini oluştur, günlük görevlerini
            işaretle ve rozet kazanmaya başla.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10">
            <UyeSayfasi />
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}