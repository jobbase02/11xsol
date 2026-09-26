import { NextRequest, NextResponse } from "next/server";
import { getCachedData, invalidateCache } from "@/lib/redis";

const WP_API_URL = "https://cms.elevenxsolutions.com/wp-json/wp/v2";

export interface CachedBlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

export interface CachedCategory {
  id: number;
  name: string;
  count: number;
  slug: string;
}

// Decode basic HTML entities for clean client display
function decodeHtml(html: string) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&hellip;/g, "...");
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>?/gm, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

function normalizePost(wpPost: Record<string, unknown>): CachedBlogPost {
  const embedded = wpPost._embedded as Record<string, unknown> | undefined;
  const featured = embedded?.["wp:featuredmedia"] as Array<Record<string, unknown>> | undefined;
  const imageUrl = String(
    featured?.[0]?.source_url ??
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80"
  );

  const terms = embedded?.["wp:term"] as Array<Array<Record<string, unknown>>> | undefined;
  const categories = terms?.[0] || [];
  const categoryName = String(categories[0]?.name ?? "Insights");

  const tagsList = terms?.[1] || [];
  const tags = tagsList.map((t) => String(t.name ?? ""));

  const authors = embedded?.["author"] as Array<Record<string, unknown>> | undefined;
  const authorName = String(authors?.[0]?.name ?? "ElevenX Engineering");

  const titleObj = wpPost.title as Record<string, unknown> | undefined;
  const contentObj = wpPost.content as Record<string, unknown> | undefined;
  const excerptObj = wpPost.excerpt as Record<string, unknown> | undefined;

  const rawTitle = String(titleObj?.rendered ?? "");
  const rawContent = String(contentObj?.rendered ?? "");
  const rawExcerpt = String(excerptObj?.rendered ?? "");

  return {
    id: Number(wpPost.id ?? 0),
    slug: String(wpPost.slug ?? ""),
    title: decodeHtml(rawTitle),
    content: rawContent,
    excerpt: decodeHtml(rawExcerpt.replace(/<[^>]*>?/gm, "").trim()),
    date: String(wpPost.date ?? new Date().toISOString()),
    author: authorName,
    category: categoryName,
    image: imageUrl,
    readTime: calculateReadTime(rawContent),
    tags,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const purge = searchParams.get("purge") === "true";

  try {
    // -------------------------------------------------------------
    // Single Post lookup (Cached in Upstash Redis for 24h)
    // -------------------------------------------------------------
    if (slug) {
      const cacheKey = `cache:wp:post:${slug}`;

      if (purge) {
        await invalidateCache(cacheKey);
      }

      const post = await getCachedData<CachedBlogPost | null>(
        cacheKey,
        async () => {
          const res = await fetch(`${WP_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`, {
            next: { revalidate: 3600 },
          });
          if (!res.ok) return null;
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) return null;
          return normalizePost(data[0]);
        },
        86400 // 24 hours in Redis
      );

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      return NextResponse.json(
        { post, source: "redis-cached" },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    // -------------------------------------------------------------
    // Blogs Overview (Posts list + Categories cached in Redis for 1h)
    // -------------------------------------------------------------
    const overviewCacheKey = "cache:wp:blogs_overview";
    if (purge) {
      await invalidateCache(overviewCacheKey);
    }

    const overview = await getCachedData<{ posts: CachedBlogPost[]; categories: CachedCategory[] }>(
      overviewCacheKey,
      async () => {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=12`, { next: { revalidate: 3600 } }),
          fetch(`${WP_API_URL}/categories`, { next: { revalidate: 3600 } }),
        ]);

        const rawPosts = postsRes.ok ? await postsRes.json() : [];
        const rawCategories = categoriesRes.ok ? await categoriesRes.json() : [];

        const categories: CachedCategory[] = Array.isArray(rawCategories)
          ? rawCategories
              .filter((c: Record<string, unknown>) => typeof c.count === "number" && (c.count as number) > 0)
              .map((c: Record<string, unknown>) => ({
                id: Number(c.id ?? 0),
                name: String(c.name ?? ""),
                count: Number(c.count ?? 0),
                slug: String(c.slug ?? ""),
              }))
          : [];

        const posts: CachedBlogPost[] = Array.isArray(rawPosts)
          ? rawPosts.map((p: Record<string, unknown>) => normalizePost(p))
          : [];

        return { posts, categories };
      },
      3600 // 1 hour in Redis
    );

    return NextResponse.json(overview, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[API Blogs Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs data" },
      { status: 500 }
    );
  }
}
