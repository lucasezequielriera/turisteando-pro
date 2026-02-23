import { CITIES } from "@/data/cities";

export default function sitemap() {
  const base = "https://www.turisteandociudades.com";
  const staticRoutes = ["", "/pricing", "/faq"].map((p) => ({
    url: `${base}${p || "/"}`, lastModified: new Date().toISOString(),
  }));
  const cityRoutes = CITIES.map((c) => ({
    url: `${base}/city/${c.slug}`, lastModified: c.lastUpdated,
  }));
  return [...staticRoutes, ...cityRoutes];
}