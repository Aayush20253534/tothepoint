import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "SmartJyotishi — Astrology in Prayagraj & Online Worldwide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: 84, backgroundColor: "#020d1b",
      color: "#f8f0e4", fontFamily: "serif", position: "relative",
    }}>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 740 }}>
        <div style={{ color: "#e8b664", fontSize: 25, letterSpacing: 7, marginBottom: 30 }}>
          PRAYAGRAJ · ONLINE WORLDWIDE
        </div>
        <div style={{ fontSize: 79, lineHeight: 1.06, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div style={{ color: "#f8d99d", fontSize: 33, marginTop: 30 }}>
          Personal guidance. Vedic perspectives.
        </div>
        <div style={{ fontFamily: "sans-serif", color: "#b5bdc9", fontSize: 23, marginTop: 26 }}>
          Hariom Shrivastava · Hindi & English
        </div>
      </div>
      <div style={{
        display: "flex", width: 230, height: 230, alignItems: "center", justifyContent: "center",
        border: "7px solid #e8b664", borderRadius: 125, color: "#f8d99d", fontSize: 87,
        fontWeight: 700, boxShadow: "0 0 0 20px rgba(232,182,100,.07)",
      }}>✦</div>
    </div>,
    { ...size },
  );
}
