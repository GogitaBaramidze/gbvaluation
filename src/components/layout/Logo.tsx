// Brand logo — three rising "building" bars (property + growing value)
// on a navy tile, next to the GB/valuation wordmark.
// variant "light" = dark text for white backgrounds, "dark" = white text
// for navy backgrounds. The gradient id is namespaced per variant so the
// navbar and footer instances don't clash.

type LogoProps = {
  tagline: string;
  variant?: "light" | "dark";
};

export default function Logo({ tagline, variant = "light" }: LogoProps) {
  const dark = variant === "dark";
  const gradId = `logo-bg-${variant}`;

  return (
    <span className="flex items-center gap-2.5">
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0a2e55" />
            <stop offset="1" stopColor="#071e3d" />
          </linearGradient>
        </defs>
        <rect
          width="48"
          height="48"
          rx="12"
          fill={`url(#${gradId})`}
          stroke={dark ? "rgba(255,255,255,0.14)" : "none"}
        />
        <rect x="10" y="27" width="7" height="11" rx="1.5" fill="#ffffff" opacity="0.4" />
        <rect x="20.5" y="19" width="7" height="19" rx="1.5" fill="#ffffff" opacity="0.72" />
        <rect x="31" y="10" width="7" height="28" rx="1.5" fill="#60c8f0" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.45rem] font-black tracking-tight ${
            dark ? "text-white" : "text-brand-850"
          }`}
        >
          GB
          <span className={dark ? "text-brand-300" : "text-brand-600"}>/</span>
          valuation
        </span>
        <span
          className={`mt-0.5 text-[10px] font-medium uppercase tracking-widest ${
            dark ? "text-white/30" : "text-zinc-400"
          }`}
        >
          {tagline}
        </span>
      </span>
    </span>
  );
}
