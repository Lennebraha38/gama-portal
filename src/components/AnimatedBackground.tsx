const particles = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 2 + (i % 3),
  duration: `${14 + ((i * 7) % 18)}s`,
  delay: `${(i * 13) % 22}s`,
  opacity: 0.25 + ((i * 11) % 40) / 100,
}));

export function AnimatedBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,100,255,0.16),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.12),transparent_60%)]" />
      <div className="absolute -left-32 top-[-10%] h-[500px] w-[500px] animate-drift-1 rounded-full bg-gama-600/30 blur-[120px]" />
      <div className="absolute right-[-10%] top-[25%] h-[420px] w-[420px] animate-drift-2 rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[28%] h-[460px] w-[460px] animate-drift-3 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="bg-grid absolute inset-0" />
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
