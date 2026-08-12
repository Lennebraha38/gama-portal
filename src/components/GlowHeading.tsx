"use client";

export function GlowHeading({
  onceki,
  vurgu,
  sonra,
  className = "",
}: {
  onceki: string;
  vurgu: string;
  sonra: string;
  className?: string;
}) {
  const harfler = (metin: string, bas: number) =>
    metin.split("").map((harf, i) => (
      <span
        key={i}
        aria-hidden
        className="animate-yazili inline-block"
        style={{ animationDelay: `${(bas + i) * 26}ms` }}
      >
        {harf === " " ? "\u00A0" : harf}
      </span>
    ));

  const vurguBas = onceki.length + 1;

  return (
    <h1 className={className}>
      <span aria-label={`${onceki} ${vurgu} ${sonra}`}>
        <span aria-hidden>{harfler(onceki, 0)}</span>
        <span aria-hidden>{"\u00A0"}</span>
        <span aria-hidden className="text-gradient">
          {harfler(vurgu, vurguBas)}
        </span>
        <span aria-hidden>{"\u00A0"}</span>
        <span aria-hidden>{harfler(sonra, vurguBas + vurgu.length)}</span>
      </span>
    </h1>
  );
}
