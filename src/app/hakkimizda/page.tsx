import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function HakkimizdaPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
      <div className="flex items-center gap-4">
        <Logo className="h-12 w-12 drop-shadow-[0_0_16px_rgba(51,100,255,0.6)]" />
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Hakkımızda
        </h1>
      </div>
      <p className="mt-8 text-lg leading-8 text-zinc-200">{siteConfig.mission}</p>
      <p className="mt-4 text-lg leading-8 text-zinc-200">
        Kaynak, takım ve mentorluk imkanlarıyla gençlerimizi buluşturuyor, onları
        en etkin gençlik araştırma-geliştirme birliği olma yolunda bir araya
        getiriyoruz. Coğrafi sınırları ortadan kaldırarak her gencimizin
        yenilikçi fikirlerini hayata geçirmesine destek olmayı hedefliyoruz.
      </p>
      <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-zinc-300 backdrop-blur">
        Detaylı vizyon, misyon ve kurumsal bilgiler yakında eklenecek.
      </p>
    </div>
  );
}
