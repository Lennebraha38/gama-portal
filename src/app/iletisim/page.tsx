import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
};

export default function IletisimPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        İletişim
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-200">
        Soruların, fikirlerin veya iş birliği tekliflerin için bize ulaş.
      </p>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur md:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gama-500 to-cyan-400 text-white shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-lg font-semibold text-white">E-posta</h2>
        <a
          href="mailto:gamaturkiye@gmail.com"
          className="mt-2 inline-block text-xl font-bold text-gama-400 transition-colors hover:text-gama-300 md:text-2xl"
        >
          gamaturkiye@gmail.com
        </a>
        <p className="mt-4 text-sm text-zinc-300">
          En geç 48 saat içinde sana dönüş yapıyoruz.
        </p>
      </div>
    </div>
  );
}
