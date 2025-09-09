export function GET() {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const body = `User-agent: *
  Allow: /
  Sitemap: ${base}/sitemap.xml
  `;
    return new Response(body, { headers: { "Content-Type": "text/plain" } });
}