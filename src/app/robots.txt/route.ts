export function GET() {
    const base = "https://www.turisteandociudades.com";
    const body = `User-agent: *
  Allow: /
  Sitemap: ${base}/sitemap.xml
  `;
    return new Response(body, { headers: { "Content-Type": "text/plain" } });
}