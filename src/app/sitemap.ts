import { CITIES } from "@/data/cities";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const staticRoutes = ["", "/pricing", "/faq"].map((p) => ({
    url: `${base}${p || "/"}`, lastModified: new Date().toISOString(),
  }));
  const cityRoutes = CITIES.map((c) => ({
    url: `${base}/city/${c.slug}`, lastModified: c.lastUpdated,
  }));
  return [...staticRoutes, ...cityRoutes];
}