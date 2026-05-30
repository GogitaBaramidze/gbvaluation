import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "78vh",
        minHeight: "660px",
        background:
          "linear-gradient(140deg, #071e3d 0%, #0a2744 30%, #0d5080 60%, #0c7eb5 85%, #0ea5d4 100%)",
      }}
    >
      {/* White mountain terrain — covers bottom half */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white"
        style={{
          height: "58%",
          clipPath:
            "polygon(0% 100%, 0% 28%, 27% 0%, 52% 34%, 72% 4%, 100% 26%, 100% 100%)",
        }}
      />

      {/* Content — padded below fixed navbar */}
      <div
        className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col"
        style={{ paddingTop: "112px" }}
      >
        <div className="flex-1 grid lg:grid-cols-2 gap-6">
          {/* Left — label in dark area, heading+text at bottom in white terrain */}
          <div className="flex flex-col justify-between pb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm self-start mt-20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-widest text-white/90">
                სერტიფიცირებული შეფასების სერვისები
              </p>
            </div>
            <div>
              <h1
                className="text-3xl lg:text-[2.6rem] xl:text-5xl font-extrabold leading-[1.2] tracking-tight"
                style={{ color: "#071e3d" }}
              >
                ქონების შეფასება
                <br />
                <span style={{ color: "#1a6fa8" }}>საქართველოში</span>
              </h1>
              <p className="mt-4 text-slate-500 leading-relaxed max-w-md text-sm lg:text-[15px]">
                ვახორციელებთ ყველა სახის შეფასებას ეროვნული და საერთაშორისო
                სტანდარტების — ECO, RICS და IVS — შესაბამისად, ნებისმიერი
                მიზნისთვის.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full text-white text-sm font-semibold px-6 py-3 hover:opacity-90 transition-opacity group"
                  style={{ backgroundColor: "#1a6fa8" }}
                >
                  შეფასების შეკვეთა
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border-2 text-sm font-semibold px-6 py-3 transition-colors hover:bg-slate-100"
                  style={{ borderColor: "#0a2744", color: "#0a2744" }}
                >
                  ჩვენი სერვისები
                </Link>
              </div>
            </div>
          </div>

          {/* Right — oval centered across both dark and white zones */}
          <div className="flex items-center justify-center mt-10">
            <div
              className="relative w-80 h-80 lg:w-[520px] lg:h-[520px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 38%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 100%)",
                border: "1.5px solid rgba(255,255,255,0.18)",
              }}
            >
              <Image
                src="/banner-valuation.svg"
                alt="GB Valuation — უძრავი ქონების შეფასება"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
