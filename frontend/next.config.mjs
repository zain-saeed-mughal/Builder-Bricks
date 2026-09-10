/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Repo root — parent lockfile + the path Vercel injects as `outputFileTracingRoot`. */
const monorepoRoot = path.join(__dirname, "..");

/**
 * Origin of the Express API that serves /api/contact.
 * Set API_ORIGIN in every deployed environment; the localhost fallback only
 * applies to local development, where `npm run dev` also boots the backend.
 */
const apiOrigin =
  process.env.API_ORIGIN?.trim().replace(/\/+$/, "") ||
  (process.env.NODE_ENV === "production" ? null : "http://localhost:4000");

if (!apiOrigin) {
  console.warn(
    "[next.config] API_ORIGIN is not set — /api/* will not be proxied and the contact form will return 404."
  );
}

const nextConfig = {
  // Keep these identical. Vercel also sets `outputFileTracingRoot` to the clone
  // root; pointing both here prevents the mismatch that fails the deploy.
  outputFileTracingRoot: monorepoRoot,
  turbopack: {
    root: monorepoRoot,
  },
  // Hide the Next.js "N" floating badge in development
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [50, 55, 60, 65, 70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    if (!apiOrigin) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
