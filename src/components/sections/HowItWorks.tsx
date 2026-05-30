import Link from "next/link";
import { ShieldCheck, MapPin, ArrowRight } from "lucide-react";

const stats = [
  { value: "15+",  label: "YEARS" },
  { value: "500+", label: "CLIENTS" },
  { value: "99%",  label: "ACCURACY" },
];

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #040f1e 0%, #071e3d 35%, #0a2e55 65%, #0d4a7a 100%)",
        minHeight: "620px",
      }}
    >
      {/* ── Dot grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(26,111,168,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── TOP white mountain terrain ── */}
      <div
        className="absolute top-0 left-0 right-0 bg-white pointer-events-none"
        style={{
          height: "130px",
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 20%)",
        }}
      />

      {/* ── BOTTOM white mountain terrain ── */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white pointer-events-none"
        style={{
          height: "130px",
          clipPath:
            "polygon(0% 100%, 0% 80%, 50% 0%, 100% 80%, 100% 100%)",
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex items-center"
        style={{ paddingTop: "160px", paddingBottom: "160px", minHeight: "620px" }}
      >
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">

          {/* Left — text */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={14} style={{ color: "#60c8f0" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#60c8f0" }}>
                GB Valuation
              </span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(96,200,240,0.4), transparent)" }} />
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              თქვენი სანდო{" "}
              <span
                className="italic font-extrabold"
                style={{ color: "#60c8f0" }}
              >
                პარტნიორი
              </span>
              <br />
              შეფასებაში
            </h2>

            {/* Description */}
            <p className="mt-6 text-white/60 leading-relaxed text-[15px] max-w-md">
              ათ წელზე მეტი სანდო გამოცდილება — სიზუსტე, სიცხადე და
              პროფესიონალიზმი საქართველოს მასშტაბით მოქმედი ბიზნესებისა
              და ფიზიკური პირებისთვის.
            </p>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-10 rounded-full text-white text-sm font-bold px-8 py-3.5 hover:opacity-90 transition-opacity group"
              style={{ backgroundColor: "#1a6fa8" }}
            >
              გაიგეთ მეტი ჩვენ შესახებ
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right — glassmorphism stats card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="w-full max-w-sm rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black"
                  style={{ background: "linear-gradient(135deg, #1a6fa8, #0ea5d4)" }}
                >
                  GB
                </div>
                <span className="text-white font-bold text-lg tracking-tight">
                  GB
                  <span style={{ color: "#60c8f0" }}>/</span>
                  valuation
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#60c8f0" }}
                />
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
              </div>
              <div className="flex items-center gap-2 mt-4 mb-8">
                <MapPin size={13} style={{ color: "#60c8f0" }} />
                <span className="text-white/70 text-sm">Tbilisi, Georgia</span>
              </div>

              {/* Divider */}
              <div
                className="h-px mb-8"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-0">
                {stats.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center text-center ${
                      i < 2 ? "border-r border-white/10" : ""
                    }`}
                  >
                    <p
                      className="text-3xl font-extrabold leading-none"
                      style={{ color: "#60c8f0" }}
                    >
                      {value}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mt-1.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
