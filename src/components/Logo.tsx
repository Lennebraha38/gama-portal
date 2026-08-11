export function Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/gama-portal/gama-logo-128.webp"
      alt="Gama"
      width={128}
      height={128}
      className={`${className} rounded-lg object-contain`}
    />
  );
}
