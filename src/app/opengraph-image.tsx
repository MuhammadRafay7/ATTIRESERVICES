import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — International Import & Export`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #081521 0%, #0d2233 100%)",
          color: "#e9edf1",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: "3px solid #b8863b",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 30,
              letterSpacing: 8,
              color: "#e9edf1",
            }}
          >
            {site.wordmark}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#caa14e",
              fontFamily: "sans-serif",
            }}
          >
            Manufacturing · Sourcing · Global Trade
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 72,
              lineHeight: 1.05,
              maxWidth: 900,
              color: "#ffffff",
            }}
          >
            We make it, source it, and move it — worldwide.
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            fontSize: 24,
            color: "#9fb2c0",
            fontFamily: "sans-serif",
          }}
        >
          Manufacture · Fulfill · Source · Import · Export · 120+ countries
        </div>
      </div>
    ),
    { ...size },
  );
}
