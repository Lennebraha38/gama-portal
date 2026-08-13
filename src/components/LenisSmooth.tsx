"use client";

import { useEffect } from "react";

export function LenisSmooth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: import("lenis").default | null = null;
    let iptal = false;

    import("lenis").then(({ default: Lenis }) => {
      if (iptal) return;
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function loop(time: number) {
        lenis?.raf(time);
        if (!iptal) raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);

      const linkler = document.querySelectorAll('a[href^="/"]');
      const tiklayici = (e: Event) => {
        e.preventDefault();
        lenis?.scrollTo(0, { immediate: true });
      };
      linkler.forEach((link) => link.addEventListener("click", tiklayici));
    });

    return () => {
      iptal = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}