/**
 * Génère, avant chaque build, les versions WebP redimensionnées des photos de
 * public/photos vers public/img (non versionné). Le loader d'images du site
 * (src/lib/image-loader.ts) pointe vers ces fichiers : l'hébergement n'a donc
 * besoin d'aucun service d'optimisation d'images.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "photos");
const target = path.join(root, "public", "img");
const { imageSizes, deviceSizes } = (await import("../src/lib/image-sizes.json", { with: { type: "json" } })).default;
const widths = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

await mkdir(target, { recursive: true });
const files = (await readdir(source)).filter((file) => /\.(jpe?g|png)$/i.test(file));

await Promise.all(
  files.flatMap((file) => {
    const name = path.parse(file).name;
    return widths.map((width) =>
      sharp(path.join(source, file))
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(path.join(target, `${name}-${width}.webp`)),
    );
  }),
);

console.log(`Photos optimisées : ${files.length} images × ${widths.length} tailles → public/img`);
