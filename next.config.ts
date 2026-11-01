import type { NextConfig } from "next";
import sizes from "./src/lib/image-sizes.json";

/**
 * Site 100 % statique (export) : chaque page est pré-générée au build puis
 * servie par le CDN. Les redirections et les en-têtes HTTP sont déclarés dans
 * public/_redirects et public/_headers, car ils ne sont pas pris en charge par
 * l'export statique.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    imageSizes: sizes.imageSizes,
    deviceSizes: sizes.deviceSizes,
  },
};

export default nextConfig;
