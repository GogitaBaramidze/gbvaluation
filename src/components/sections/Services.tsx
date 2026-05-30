import {
  Home,
  Building2,
  Warehouse,
  Briefcase,
  Scale,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Accent = "orange" | "green" | "blue" | "teal" | "violet" | "rose";

const palette: Record<Accent, { gradient: string; glow: string; icon: string; title: string; shine: string }> = {
  orange: {
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
    glow: "rgba(249,115,22,0.35)",
    icon: "#f97316",
    title: "#fb923c",
    shine: "rgba(249,115,22,0.15)",
  },
  green: {
    gradient: "linear-gradient(135deg, #dcfce7 0%, #86efac 100%)",
    glow: "rgba(22,163,74,0.3)",
    icon: "#16a34a",
    title: "#4ade80",
    shine: "rgba(22,163,74,0.12)",
  },
  blue: {
    gradient: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)",
    glow: "rgba(26,111,168,0.35)",
    icon: "#1a6fa8",
    title: "#60a5fa",
    shine: "rgba(26,111,168,0.15)",
  },
  teal: {
    gradient: "linear-gradient(135deg, #cffafe 0%, #67e8f9 100%)",
    glow: "rgba(8,145,178,0.35)",
    icon: "#0891b2",
    title: "#22d3ee",
    shine: "rgba(8,145,178,0.15)",
  },
  violet: {
    gradient: "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)",
    glow: "rgba(124,58,237,0.3)",
    icon: "#7c3aed",
    title: "#a78bfa",
    shine: "rgba(124,58,237,0.12)",
  },
  rose: {
    gradient: "linear-gradient(135deg, #ffe4e6 0%, #fda4af 100%)",
    glow: "rgba(225,29,72,0.3)",
    icon: "#e11d48",
    title: "#fb7185",
    shine: "rgba(225,29,72,0.12)",
  },
};

const services: { icon: LucideIcon; title: string; desc: string; accent: Accent }[] = [
  {
    icon: Home,
    accent: "orange",
    title: "საცხოვრებელი ქონება",
    desc: "ბინების, სახლების, კოტეჯებისა და სხვა საცხოვრებელი ობიექტების პროფესიონალური შეფასება.",
  },
  {
    icon: Building2,
    accent: "green",
    title: "კომერციული ქონება",
    desc: "საოფისე, სავაჭრო და მომსახურების ობიექტების ღირებულების სრულყოფილი განსაზღვრა.",
  },
  {
    icon: Warehouse,
    accent: "blue",
    title: "სამრეწველო ქონება",
    desc: "საწყობების, საწარმოო ფართებისა და სამრეწველო კომპლექსების ობიექტური შეფასება.",
  },
  {
    icon: MapPin,
    accent: "teal",
    title: "მიწის ნაკვეთი",
    desc: "სასოფლო, სამრეწველო და კომერციული მიწის ნაკვეთების ბაზრის ღირებულების განსაზღვრა.",
  },
  {
    icon: Briefcase,
    accent: "violet",
    title: "ბიზნეს აქტივები",
    desc: "კომპანიის აქტივების, დანადგარების, მოწყობილობებისა და არამატ. აქტივების შეფასება.",
  },
  {
    icon: Scale,
    accent: "rose",
    title: "სამართლებრივი შეფასება",
    desc: "სასამართლო საქმეებისთვის, მემკვიდრეობისა და განქორწინების შეფასება საერთ. სტანდარტით.",
  },
];

function DiamondIcon({ icon: Icon, accent }: { icon: LucideIcon; accent: Accent }) {
  const p = palette[accent];
  return (
    <div className="relative flex items-center justify-center mb-7" style={{ height: "80px" }}>
      {/* Glow shadow */}
      <div
        className="absolute rounded-xl"
        style={{
          width: "58px",
          height: "58px",
          transform: "rotate(45deg) translateY(12px) translateX(2px)",
          background: p.gradient,
          filter: "blur(16px)",
          opacity: 0.8,
        }}
      />
      {/* Main diamond */}
      <div
        className="relative flex items-center justify-center rounded-xl"
        style={{
          width: "62px",
          height: "62px",
          transform: "rotate(45deg)",
          background: p.gradient,
          boxShadow: `0 8px 24px ${p.glow}, 0 2px 6px rgba(0,0,0,0.2)`,
        }}
      >
        <Icon
          size={20}
          style={{ transform: "rotate(-45deg)", color: p.icon }}
          strokeWidth={1.6}
        />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-white">

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1a6fa8" }}>
              ჩვენი სერვისები
            </p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: "#071e3d" }}>
            შეფასების{" "}
            <span style={{ color: "#1a6fa8" }}>სახეები</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {services.map(({ icon, title, desc, accent }) => {
            const p = palette[accent];
            return (
              <div
                key={title}
                className="group flex flex-col items-center text-center transition-all duration-300"
              >
                <DiamondIcon icon={icon} accent={accent} />

                <h3 className="text-base font-bold mb-3" style={{ color: p.title }}>
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
