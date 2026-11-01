import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Anciennes adresses du site Wix : redirections permanentes (301/308) pour
   * conserver le référencement acquis. Les pages /number-cake, /nos-gateaux,
   * /nos-migniardises, /a-propos, /commander et /portfolio gardent leur URL.
   */
  async redirects() {
    return [
      { source: "/services-4", destination: "/creations", permanent: true },
      { source: "/portfolio-collections/:path*", destination: "/portfolio", permanent: true },
      { source: "/mentions-l%C3%A9gales", destination: "/mentions-legales", permanent: true },
      { source: "/politique-de-confidentialit%C3%A9", destination: "/mentions-legales#donnees-personnelles", permanent: true },
      { source: "/politique-en-mati%C3%A8re-de-cookies", destination: "/mentions-legales#cookies", permanent: true },
      { source: "/conditions-d-utilisation", destination: "/mentions-legales", permanent: true },
      { source: "/blank", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/galerie", destination: "/portfolio", permanent: true },
      { source: "/contact", destination: "/commander", permanent: true },
      { source: "/maison", destination: "/a-propos", permanent: true },
      { source: "/sur-mesure", destination: "/creations", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
