import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { photos, site } from "@/content/site";

export const alt = `${site.name} — Créations personnalisées pour tous vos événements spéciaux`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public", photos.numberCake50.src));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "#1b1613" }}>
        <div
          style={{
            width: 640,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            color: "#f8f4ee",
          }}
        >
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 7, textTransform: "uppercase", color: "#dcc4a2" }}>
            Pâtisserie faite maison · {site.region}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 112, lineHeight: 1 }}>Sesia</div>
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 14, textTransform: "uppercase", color: "#94877b", marginTop: 14 }}>
              Pâtisserie
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.3, color: "#d9cfc3", borderTop: "1px solid #3a302a", paddingTop: 26 }}>
            Créations personnalisées pour tous vos événements spéciaux.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} alt="" width={560} height={630} style={{ objectFit: "cover", width: 560, height: 630 }} />
      </div>
    ),
    size,
  );
}
