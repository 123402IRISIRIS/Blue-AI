export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.ai-blue.org/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
