"use client";

import { useEffect, useRef } from "react";

const particles = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 2 + (i % 3),
  duration: `${14 + ((i * 7) % 18)}s`,
  delay: `${(i * 13) % 22}s`,
  opacity: 0.25 + ((i * 11) % 40) / 100,
}));

export function AnimatedBackground() {
  const ust = useRef<HTMLDivElement>(null);
  const alt = useRef<HTMLDivElement>(null);
  const izgara = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    function hareket(e: MouseEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        if (ust.current) {
          ust.current.style.transform = `translate3d(${(-x * 22).toFixed(2)}px, ${(-y * 16).toFixed(
            2
          )}px, 0)`;
        }
        if (alt.current) {
          alt.current.style.transform = `translate3d(${(x * 16).toFixed(2)}px, ${(y * 12).toFixed(
            2
          )}px, 0)`;
        }
        if (izgara.current) {
          izgara.current.style.transform = `translate3d(${(-x * 10).toFixed(2)}px, ${(-y * 8).toFixed(
            2
          )}px, 0)`;
        }
      });
    }
    window.addEventListener("mousemove", hareket);
    return () => {
      window.removeEventListener("mousemove", hareket);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#060b18]">
      <div
        ref={ust}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_60%)]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={alt}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.07),transparent_60%)]"
        style={{ willChange: "transform" }}
      />
      <div className="absolute -left-32 top-[-10%] h-[500px] w-[500px] animate-drift-1 rounded-full bg-gama-600/25 blur-[120px]" />
      <div className="absolute right-[-10%] top-[25%] h-[420px] w-[420px] animate-drift-2 rounded-full bg-gama-500/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[28%] h-[460px] w-[460px] animate-drift-3 rounded-full bg-gama-900/40 blur-[120px]" />
      <div
        ref={izgara}
        className="bg-grid absolute inset-0"
        style={{ willChange: "transform" }}
      />
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-twinkle absolute bottom-[-10px] rounded-full bg-white"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}, 4s`,
            animationName: "float-up, twinkle",
          }}
        />
      ))}
    </div>
  );
}
