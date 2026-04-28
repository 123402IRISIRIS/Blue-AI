export async function GET() {
  const baseUrl = "https://www.ai-blue.org";

  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/blog`, priority: 0.9 },
    { url: `${baseUrl}/account/profile`, priority: 0.8 },
    { url: `${baseUrl}/account/signin`, priority: 0.8 },
    { url: `${baseUrl}/account/signup`, priority: 0.8 },
    { url: `${baseUrl}/download-presentation-materials`, priority: 0.8 },
    { url: `${baseUrl}/architecture-slide`, priority: 0.8 },
    { url: `${baseUrl}/system-diagram`, priority: 0.8 },
  ];

  const blogPosts = [
    "/blog/classroom-influencers-showdown",
    "/blog/dear-parents",
    "/blog/destress-guide",
    "/blog/homework-hustle",
    "/blog/self-care-toolkit",
    "/blog/teen-ai-companions",
    "/blog/why-blue-safe-space",
    "/blog/why-called-blue",
    "/blog/recognizing-sos",
    "/blog/friend-support-memes",
    "/blog/pet-loss-healing",
    "/blog/clean-vibes",
    "/blog/ai-under-hood",
    "/blog/ai-expectations-reality",
    "/blog/handling-challenging-people",
    "/blog/shady-bff-guide",
    "/blog/roblox-legends",
    "/blog/luca-story-ai-safety",
    "/blog/90s-slang",
    "/blog/ye-olde-slang",
    "/blog/grunt-and-giggle",
    "/blog/manga-magic",
    "/blog/teen-secrets-manga",
    "/blog/web-of-shadows",
    "/blog/brain-rot",
    "/blog/top-kpop-fans",
    "/blog/teen-rock-legends",
    "/blog/escaped-cults",
    "/blog/celebrity-comebacks",
    "/blog/beauty-standards-history",
    "/blog/wild-celebrity-headlines",
    "/blog/teen-fiction-top-10",
    "/blog/gossip-guide",
    "/blog/drama-queens-101",
    "/blog/teachers-pet-guide",
    "/blog/celeb-board-games",
  ].map((post) => ({
    url: `${baseUrl}${post}`,
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...blogPosts];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
