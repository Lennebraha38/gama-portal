"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function hareket(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(
      px * max
    ).toFixed(2)}deg)`;
  }

  function cik() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={hareket}
      onMouseLeave={cik}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
