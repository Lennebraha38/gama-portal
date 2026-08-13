"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const TurkeyMap = dynamic(() =>
  import("@/components/TurkeyMap").then((mod) => mod.TurkeyMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-white/10 bg-[#060b18]/60 backdrop-blur">
        <span className="text-sm text-zinc-400">Harita yükleniyor...</span>
      </div>
    ),
  }
);

export function HaritaBolumu() {
  const ref = useRef<HTMLDivElement>(null);
  const [gorunur, setGorunur] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([g]) => {
        if (g.isIntersecting) {
          setGorunur(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden={!gorunur ? true : undefined}>
      {gorunur ? <TurkeyMap /> : (
        <div className="flex h-64 items-center justify-center rounded-3xl border border-white/10 bg-[#060b18]/60 backdrop-blur">
          <span className="text-sm text-zinc-400">Harita yükleniyor...</span>
        </div>
      )}
    </div>
  );
}
