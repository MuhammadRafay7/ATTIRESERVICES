import { ImageResponse } from "next/og";
import { site, stats } from "@/lib/site";
import { ogImage } from "@/lib/seo";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = ogImage.type;

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
          padding: "64px",
          background: "#0a1a2b",
          color: "#e8edf2",
          fontFamily: "sans-serif",
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(232,237,242,0.16)",
            paddingBottom: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: "2px solid #e8edf2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 10, height: 10, background: "#a9873f", display: "flex" }} />
            </div>
            <div style={{ fontSize: 26, letterSpacing: 7, fontWeight: 600 }}>
              {site.wordmark}
            </div>
          </div>
          <div
            style={{
              fontSize: 17,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#93a4b3",
            }}
          >
            {`Est. ${site.founded}`}
          </div>
        </div>

        {/* Statement */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a9873f",
            }}
          >
            {site.descriptor}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 62,
              lineHeight: 1.08,
              letterSpacing: -1.6,
              maxWidth: 940,
              color: "#ffffff",
              fontWeight: 500,
            }}
          >
            Leather goods, footwear, apparel and textiles — produced on owned
            floors.
          </div>
        </div>

        {/* Figures */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(232,237,242,0.16)",
            paddingTop: 26,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#93a4b3",
                }}
              >
                {s.label}
              </div>
              <div style={{ marginTop: 10, fontSize: 34, color: "#ffffff" }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
