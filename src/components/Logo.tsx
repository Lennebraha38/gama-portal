export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/gama-portal/gama-logo.png"
      alt="Gama"
      className={`${className} rounded-lg object-contain`}
    />
  );
}
