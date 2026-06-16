import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

// Language-neutral brand card — shared by every locale's routes.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteName} — Certified Property & Asset Valuations`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #040f1e 0%, #071e3d 45%, #0a2e55 100%)",
        }}
      >
        {/* Brand mark — rising building bars, same as the site logo */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            height: 84,
            marginBottom: 40,
          }}
        >
          <div style={{ width: 22, height: 34, borderRadius: 5, background: "rgba(255,255,255,0.4)" }} />
          <div style={{ width: 22, height: 58, borderRadius: 5, background: "rgba(255,255,255,0.72)" }} />
          <div style={{ width: 22, height: 84, borderRadius: 5, background: "#60c8f0" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 92,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          GB
          <span style={{ color: "#60c8f0" }}>/</span>
          valuation
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Certified Property &amp; Asset Valuations
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 18,
          }}
        >
          {["NBG", "RICS", "IVS", "ECO"].map((cert) => (
            <div
              key={cert}
              style={{
                display: "flex",
                padding: "10px 26px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#60c8f0",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {cert}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
