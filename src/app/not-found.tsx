import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <Logo className="h-20 w-20 opacity-80" />
      <p className="mt-8 text-7xl font-extrabold tracking-tight text-gradient md:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-xl font-bold text-white md:text-2xl">
        Bu sayfa bulunamadı
      </h1>
      <p className="mt-3 max-w-md text-zinc-200">
        Aradığın sayfa taşınmış veya hiç var olmamış olabilir. Yine de seni
        yolundan çevirmeyelim.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]"
        >
          Anasayfaya Dön
        </Link>
        <Link
          href="/iletisim"
          className="rounded-full border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
        >
          İletişime Geç
        </Link>
      </div>
    </div>
  );
}
