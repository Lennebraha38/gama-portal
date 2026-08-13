"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
  max = 7,
  spotlight = false,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  spotlight?: boolean;
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
    if (spotlight) {
      el.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
    }
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
      className={spotlight ? `tilt-spotlight ${className}` : className}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
        willChange: "transform",
      }}
    >
      {children}
      {spotlight && (
        <div
          aria-hidden
          className="tilt-spotlight-overlay pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), rgba(255,255,255,0.14), transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
