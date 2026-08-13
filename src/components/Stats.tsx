"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";

function Sayac({ hedef }: { hedef: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [goruldu, setGoruldu] = useState(false);
  const [deger, setDeger] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gozlemci = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          setGoruldu(true);
          gozlemci.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    gozlemci.observe(el);
    return () => gozlemci.disconnect();
  }, []);

  useEffect(() => {
    if (!goruldu) return;
    let raf = 0;
    const sure = 1400;
    const bas = performance.now();
    function adim(now: number) {
      const gecen = Math.min((now - bas) / sure, 1);
      const ease = 1 - Math.pow(1 - gecen, 3);
      setDeger(Math.round(hedef * ease));
      if (gecen < 1) raf = requestAnimationFrame(adim);
    }
    raf = requestAnimationFrame(adim);
    return () => cancelAnimationFrame(raf);
  }, [goruldu, hedef]);

  return (
    <p ref={ref} className="text-xl font-extrabold text-white md:text-2xl">
      {deger.toLocaleString("tr-TR")}
    </p>
  );
}

export function Stats() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {siteConfig.stats.map((s) => (
        <div
          key={s.etiket}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4"
        >
          {"hedef" in s && s.hedef ? (
            <Sayac hedef={s.hedef} />
          ) : (
            <p className="text-xl font-extrabold text-white md:text-2xl">{s.deger}</p>
          )}
          <p className="mt-1 text-xs font-medium text-zinc-400 md:text-sm">{s.etiket}</p>
        </div>
      ))}
    </div>
  );
}
