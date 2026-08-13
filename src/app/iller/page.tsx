import type { Metadata } from "next";
import Link from "next/link";
import { toplamIl } from "@/lib/provinces";
import { HaritaBolumu } from "@/components/HaritaBolumu";
import { IlListesi } from "@/components/IlListesi";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "İl Temsilcileri",
  description:
    "Türkiye'nin 81 ilinde ve 7 bölgesinde Gama'yı temsil eden koordinatörler. İl temsilciliği başvuruları açık.",
};

export default function IllerPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="sys-label">
                Sistem 01 <span className="text-zinc-400">/</span> Gama
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                İl Temsilcileri
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Türkiye&apos;nin <span className="font-semibold text-white">{toplamIl} ili</span>{" "}
                ve 7 bölgesinde Gama&apos;yı temsil eden koordinatörlerimiz seni
                bekliyor. Atanmamış illere tıklayarak başvur!
              </p>
            </div>
            <Link
              href="/temsilci"
              transitionTypes={["nav-forward"]}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10 md:self-end"
            >
              Temsilci Adayı Ol
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            <HaritaBolumu />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <IlListesi />
        </Reveal>
      </div>
    </PageTransition>
  );
}
