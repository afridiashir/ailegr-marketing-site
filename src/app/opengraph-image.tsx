import { ImageResponse } from "next/og";

export const alt = "Ailegr — Your books, done by AI. Approved by you.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card (also used for Twitter/X via summary_large_image). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "linear-gradient(135deg, #064e3b 0%, #047857 55%, #10b981 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#d1fae5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
            <span style={{ color: "#6ee7b7" }}>Ai</span>legr
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Your books, done by AI.</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#6ee7b7" }}>Approved by you.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, color: "#d1fae5" }}>
          <span>AI accounting &amp; bookkeeping software</span>
          <span
            style={{
              display: "flex",
              background: "white",
              color: "#064e3b",
              padding: "12px 28px",
              borderRadius: 999,
              fontWeight: 700,
            }}
          >
            From $19.99/month
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
