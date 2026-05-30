import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "15+", label: "წლის\nგამოცდილება" },
  { value: "500+", label: "შეფასება\nშესრულდა" },
  { value: "99%", label: "კლიენტის\nკმაყოფილება" },
];

const credentials = [
  { icon: ShieldCheck, text: "საქართველოს ეროვნული ბანკის მიერ სერტიფიცირებული" },
  { icon: Award,       text: "RICS & IVS საერთაშორისო სტანდარტები" },
  { icon: Users,       text: "500-ზე მეტი კმაყოფილი კლიენტი" },
];

export default function Expert() {
  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left — content ── */}
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1a6fa8" }}>
                ჩვენი გუნდი
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-extrabold leading-snug" style={{ color: "#071e3d" }}>
              პროფესიონალი შემფასებლები
              <br />
              <span
                className="relative inline-block"
                style={{ color: "#1a6fa8" }}
              >
                თქვენს სამსახურში
                {/* underline accent */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #1a6fa8, #0ea5d4)" }}
                />
              </span>
            </h2>

            {/* Separator */}
            <div className="flex items-center gap-3 mt-8 mb-8">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #e2e8f0, transparent)" }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1a6fa8" }} />
              <div className="h-px flex-1" style={{ background: "linear-gradient(to left, #e2e8f0, transparent)" }} />
            </div>

            {/* Description */}
            <p className="text-slate-500 leading-relaxed text-[15px]">
              GB Valuation არის საქართველოს ეროვნული ბანკის მიერ
              სერტიფიცირებული შეფასების კომპანია. ჩვენ ვასრულებთ ყველა
              სახის შეფასებას ECO, RICS და IVS საერთაშორისო სტანდარტების
              შესაბამისად.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-0 mt-10 rounded-2xl overflow-hidden border border-zinc-100">
              {stats.map(({ value, label }, i) => (
                <div
                  key={value}
                  className={`flex flex-col items-center justify-center py-6 ${
                    i < 2 ? "border-r border-zinc-100" : ""
                  }`}
                  style={{ background: i === 1 ? "linear-gradient(135deg, #f0f7ff 0%, #e8f3fc 100%)" : "white" }}
                >
                  <p className="text-3xl font-extrabold leading-none" style={{ color: "#071e3d" }}>
                    {value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5 text-center leading-snug whitespace-pre-line">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <ul className="mt-8 space-y-3">
              {credentials.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: "#1a6fa8" }} className="shrink-0" />
                  <span className="text-sm text-slate-600">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-10 rounded-full text-white text-sm font-semibold px-7 py-3 hover:opacity-90 transition-opacity group"
              style={{ backgroundColor: "#1a6fa8" }}
            >
              კონტაქტი
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* ── Right — image without dark panel ── */}
          <div className="relative flex items-end justify-center">

            {/* Decorative blob behind person */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] lg:w-[420px] lg:h-[420px] rounded-full"
              style={{
                background: "radial-gradient(circle at 50% 60%, #e8f3fc 0%, #f0f7ff 50%, transparent 80%)",
              }}
            />

            {/* Accent ring */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-full"
              style={{ border: "1.5px dashed rgba(26,111,168,0.2)" }}
            />

            {/* Person image — transparent bg, natural on white */}
            <div className="relative w-[300px] lg:w-[380px] h-[420px] lg:h-[520px]">
              <Image
                src="/valuer.png"
                alt="GB Valuation — სერტიფიცირებული შემფასებელი"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>

            {/* Floating name card */}
            <div
              className="absolute bottom-6 left-0 lg:-left-6 rounded-2xl px-5 py-4 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #071e3d 0%, #0a2744 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-white font-bold text-sm">გიორგი ბერიძე</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: "#60c8f0" }}>
                მთავარი შემფასებელი · RICS
              </p>
            </div>

            {/* Floating credential badge */}
            <div
              className="absolute top-10 right-0 lg:-right-4 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
              style={{
                background: "white",
                border: "1px solid #e8f3fc",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#e8f3fc" }}>
                <ShieldCheck size={16} style={{ color: "#1a6fa8" }} />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-medium">სტატუსი</p>
                <p className="text-xs font-bold" style={{ color: "#071e3d" }}>NBG სერტიფიცირებული</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
