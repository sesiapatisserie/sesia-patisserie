import type { NextConfig } from "next";

/**
 * Site 100 % statique (export) : chaque page est pré-générée au build puis
 * servie par le CDN. Les redirections et les en-têtes HTTP sont déclarés dans
 * netlify.toml, car ils ne sont pas pris en charge par l'export statique.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
