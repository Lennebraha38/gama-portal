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
  const [goruldu, setGoruldu] = useState(
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
        transform: goruldu
          ? "perspective(1200px) rotateX(0deg) translateY(0) scale(1)"
          : "perspective(1200px) rotateX(14deg) translateY(40px) scale(0.97)",
        filter: goruldu ? "blur(0px)" : "blur(5px)",
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, filter 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
