"use client";

import { useId } from "react";

export function Logo({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3364ff" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill={`url(#g-${id})`} />
      <rect x="2" y="2" width="44" height="44" rx="12" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <g fill="white">
        <rect x="13" y="14" width="5.2" height="22" rx="2.6" />
        <rect x="13" y="14" width="21" height="5.2" rx="2.6" />
      </g>
    </svg>
  );
}
