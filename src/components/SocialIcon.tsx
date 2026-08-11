export function SocialIcon({ id, className = "" }: { id: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "instagram":
      return (
        <svg {...common}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "discord":
      return (
        <svg {...common}>
          <path d="M8 9l-2 3 4.5 2.5L16 12l-2-3" />
          <path d="M6 18c1.8 1 4.2 1 6 1s4.2 0 6-1" />
          <path d="M6 18a18 18 0 0 1-1-6c0-3 1.5-5.5 3-6.5A14 14 0 0 1 12 5c2.8 0 4.7.6 6 1.5 1.5 1 3 3.5 3 6.5a18 18 0 0 1-1 6" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...common}>
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      );
    default:
      return null;
  }
}
