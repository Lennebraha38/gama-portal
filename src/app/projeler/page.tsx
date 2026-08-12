import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Gama çatısı altında yürütülen ve açık ilanları yayınlanan projeler. Fikrini hayata geçirmek için başvur.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Projeler
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-200">
            Gama çatısı altında yürütülecek projeler burada duyurulacak.
          </p>
        </Reveal>

      <Reveal delay={120} className="flex flex-1 flex-col">
        <div className="mt-12 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-16 text-center backdrop-blur">
        <Logo className="h-16 w-16 animate-pulse" />
        <h2 className="mt-6 text-xl font-bold text-white md:text-2xl">
          Projeler yakında duyurulacak
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-200">
          İlk projelerimizin heyecanı sürüyor. Açıkladığımız anda burada
          görebilirsin.
        </p>
        <Link
          href="/katil"
          transitionTypes={["nav-forward"]}
          className="mt-8 rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]"
        >
          İlk Projede Sen Ol
        </Link>
      </div>
      </Reveal>
      </div>
    </PageTransition>
  );
}
