"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [goruldu, setGoruldu] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGoruldu(true);
      return;
    }
    const io = new IntersectionObserver(
      ([g]) => {
        if (g.isIntersecting) {
          setGoruldu(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: goruldu ? 1 : 0,
        transform: goruldu ? "none" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
