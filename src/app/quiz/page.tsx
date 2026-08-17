import type { Metadata } from "next";
import { quizSorulari } from "@/lib/quiz";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { QuizOyunu } from "@/components/QuizOyunu";

export const metadata: Metadata = {
  title: "Teknoloji Quiz",
  description:
    "Uzay, yapay zekâ, yazılım ve robotikten 16 soruluk teknoloji bilgi yarışması. %80 ve üzeri skor rozet kazandırır.",
};

const alanlar = [...new Set(quizSorulari.map((s) => s.alan))];

export default function QuizPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 07 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Teknoloji Quiz
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            {quizSorulari.length} soruluk bilgi yarışması: her soru için tek
            doğru cevap, anında geri bildirim. %80 ve üzeri skor{" "}
            <span className="font-semibold text-white">Teknoloji Zekâsı</span>{" "}
            rozetini kazandırır.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {alanlar.map((alan) => (
              <span
                key={alan}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300"
              >
                {alan}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            <QuizOyunu sorular={quizSorulari} />
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}