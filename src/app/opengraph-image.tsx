import { ImageResponse } from "next/og";

export const alt = "Yanis Harrat — Technicien support systèmes et réseaux";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070707",
          color: "#f7f3ec",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#ff8a1f",
              fontSize: "20px",
            }}
          >
            YH
          </div>
          <span style={{ fontSize: "24px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Yanis Harrat
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div style={{ width: "100px", height: "4px", background: "#ff8a1f" }} />
          <div style={{ maxWidth: "980px", fontSize: "70px", lineHeight: 1.02, letterSpacing: "-0.045em" }}>
            Technicien support systèmes &amp; réseaux.
          </div>
          <div style={{ fontSize: "25px", color: "rgba(247,243,236,0.66)" }}>
            BTS SIO SISR · Support N1/N2 · Windows Server · Réseaux · Île-de-France
          </div>
        </div>
      </div>
    ),
    size,
  );
}
