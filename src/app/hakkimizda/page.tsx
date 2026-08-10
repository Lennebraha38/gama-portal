import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function HakkimizdaPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Hakkımızda
      </h1>
      <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        {siteConfig.mission}
      </p>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Kaynak, takım ve mentorluk imkanlarıyla gençlerimizi buluşturuyor, onları
        en etkin gençlik araştırma-geliştirme birliği olma yolunda bir araya
        getiriyoruz. Coğrafi sınırları ortadan kaldırarak her gencimizin
        yenilikçi fikirlerini hayata geçirmesine destek olmayı hedefliyoruz.
      </p>
    </div>
  );
}
