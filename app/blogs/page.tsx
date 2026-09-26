"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Loader2,
  TrendingUp,
  BookOpen,
} from "lucide-react";

// --- INTERFACES ---
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt?: string;
}

interface Category {
  id: number;
  name: string;
  count: number;
  slug: string;
}

// --- UTILITIES ---
const decodeHtml = (html: string) => {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const getReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>?/gm, "");
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
};

// Subtle Background Grid
const TechGridBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
  </div>
);

// Marquee with Reduced-Motion Awareness & Pure White Theme
const Marquee = () => {
  return (
    <div
      className="relative flex overflow-x-hidden bg-zinc-50/80 border-y border-zinc-200/80 text-zinc-900 py-3.5 sm:py-4 font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest select-none mb-8 sm:mb-14"
      aria-hidden="true"
    >
      <motion.div
        className="flex whitespace-nowrap motion-reduce:transform-none"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="mx-6 sm:mx-8 flex items-center gap-3 sm:gap-4 text-zinc-700"
          >
            <Sparkles size={14} className="text-[#1757EE]" />
            <span>SYSTEM INTELLIGENCE</span>
            <span className="text-[#1757EE] mx-1 sm:mx-2 font-normal">{"///"}</span>
            <span>DIGITAL ARCHITECTURE</span>
            <span className="text-[#1757EE] mx-1 sm:mx-2 font-normal">{"///"}</span>
            <span>GROWTH ENGINEERING</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch blog data from existing WordPress API
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(
            "https://cms.elevenxsolutions.com/wp-json/wp/v2/posts?_embed&per_page=12"
          ),
          fetch("https://cms.elevenxsolutions.com/wp-json/wp/v2/categories"),
        ]);

        const postsData = await postsRes.json();
        const categoriesData = await categoriesRes.json();

        if (Array.isArray(categoriesData) && isMounted) {
          const validCategories = (categoriesData as unknown[])
            .filter((cat) => {
              const c = cat as Record<string, unknown>;
              return typeof c.count === "number" && (c.count as number) > 0;
            })
            .map((cat) => {
              const c = cat as Record<string, unknown>;
              return {
                id: Number(c.id as unknown ?? 0),
                name: String(c.name ?? ""),
                count: Number(c.count ?? 0),
                slug: String(c.slug ?? ""),
              } as Category;
            });
          setCategories(validCategories);
        }

        if (Array.isArray(postsData) && isMounted) {
          const mappedPosts: BlogPost[] = (postsData as unknown[]).map((post) => {
            const p = post as Record<string, unknown>;
            const embedded = p._embedded as unknown as
              | Record<string, unknown>
              | undefined;
            const featured = embedded?.["wp:featuredmedia"] as unknown as
              | Array<Record<string, unknown>>
              | undefined;
            const imageUrl = String(
              featured?.[0]?.["source_url"] ??
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80"
            );
            const terms = embedded?.["wp:term"] as unknown as
              | Array<unknown>
              | undefined;
            const categoryName = String(
              ((terms?.[0] as unknown as
                | Array<Record<string, unknown>>
                | undefined)?.[0]?.["name"]) ?? "Strategy"
            );

            const contentHtml = String(
              ((p.content as unknown as Record<string, unknown>)?.rendered) ?? ""
            );
            const excerptRaw = String(
              ((p.excerpt as unknown as Record<string, unknown>)?.rendered) ?? ""
            )
              .replace(/<[^>]*>?/gm, "")
              .trim();

            return {
              id: Number(p.id as unknown ?? 0),
              title: decodeHtml(
                String(
                  ((p.title as unknown as Record<string, unknown>)?.rendered) ?? ""
                )
              ),
              slug: String(p.slug ?? ""),
              category: decodeHtml(String(categoryName)),
              date: formatDate(String(p.date ?? "")),
              readTime: getReadTime(contentHtml),
              image: String(imageUrl),
              excerpt: excerptRaw,
            };
          });

          setPosts(mappedPosts);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered posts based on category
  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) => selectedCategory === "All" || post.category === selectedCategory
    );
  }, [posts, selectedCategory]);

  // Featured post (left side) and 3 side stories (right side) matching reference UI
  const featuredPost = filteredPosts[0];
  const sidePosts = filteredPosts.slice(1, 4);
  const remainingPosts = filteredPosts.slice(4);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-manrope selection:bg-blue-500/20 selection:text-blue-950 relative overflow-x-hidden">
      <TechGridBackground />

      {/* --- HERO SECTION --- */}
      <header className="relative z-10 pt-28 sm:pt-36 md:pt-40 pb-6 sm:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-6 sm:pb-10 border-b border-zinc-200/90"
        >
          {/* Left Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif tracking-tight text-zinc-950 leading-[1.14]">
              Discover insights <br className="hidden sm:inline" />
              <span className="text-[#1757EE] font-normal italic">
                & best practices
              </span>
            </h1>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-4">
            <Link
              href="#all-articles"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg border border-zinc-900 text-zinc-900 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold hover:bg-zinc-950 hover:text-white transition-all duration-200 active:scale-95 shadow-2xs focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
            >
              <span>VIEW ALL RESOURCES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Filter Pills with touch-safe tap targets */}
        <div
          className="flex items-center gap-2 overflow-x-auto py-4 sm:py-5 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          role="region"
          aria-label="Filter blog posts by category"
        >
          <button
            onClick={() => setSelectedCategory("All")}
            aria-pressed={selectedCategory === "All"}
            className={`cursor-pointer px-4 sm:px-5 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shrink-0 border focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none ${selectedCategory === "All"
              ? "bg-[#1757EE] text-white border-[#1757EE] shadow-sm"
              : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200/80 hover:text-zinc-950"
              }`}
          >
            All ({posts.length})
          </button>

          {categories.map((cat) => {
            const catName = decodeHtml(cat.name);
            const isSelected = selectedCategory === catName;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(catName)}
                aria-pressed={isSelected}
                className={`cursor-pointer px-4 sm:px-5 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shrink-0 border focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none ${isSelected
                  ? "bg-[#1757EE] text-white border-[#1757EE] shadow-sm"
                  : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200/80 hover:text-zinc-950"
                  }`}
              >
                {catName}
              </button>
            );
          })}
        </div>
      </header>

      {/* --- KINETIC MARQUEE --- */}
      <Marquee />

      {/* --- FEATURED BENTO SHOWCASE (Exact UI from Reference Image) --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        {loading ? (
          <div
            className="flex flex-col gap-4 justify-center items-center w-full min-h-[400px]"
            role="status"
            aria-live="polite"
          >
            <Loader2 className="animate-spin text-[#1757EE]" size={36} />
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
              Loading Insights...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 sm:py-24 bg-zinc-50 rounded-2xl border border-zinc-200 px-4">
            <p className="text-zinc-700 font-serif text-xl sm:text-2xl mb-4">
              No articles found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="px-6 py-2.5 min-h-[44px] text-xs font-mono uppercase bg-[#1757EE] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Boxed Grid Container matching reference image */}
            <div className="border border-zinc-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT COLUMN: Featured Big Story */}
              {featuredPost && (
                <article className="p-5 sm:p-7 lg:p-9 flex flex-col justify-between group">
                  <Link
                    href={`/${featuredPost.slug}`}
                    className="block focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none rounded-xl"
                  >
                    {/* Top 16:9 Image */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-100 shadow-2xs mb-5 sm:mb-7">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Metadata & Title */}
                    <div>
                      <div className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#1757EE] mb-2.5">
                        FEATURED STORY
                      </div>

                      <h2
                        className="text-xl sm:text-2xl lg:text-[26px] font-serif tracking-tight text-zinc-950 leading-snug group-hover:text-[#1757EE] transition-colors mb-3 sm:mb-4"
                        dangerouslySetInnerHTML={{ __html: featuredPost.title }}
                      />

                      {featuredPost.excerpt && (
                        <p className="text-zinc-700 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-normal">
                          {featuredPost.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-zinc-100">
                    <Link
                      href={`/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 py-1 text-xs sm:text-sm font-mono uppercase font-bold tracking-wider text-[#1757EE] hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200 focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
                    >
                      <span>READ MORE</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              )}

              {/* RIGHT COLUMN: 3 Stacked Horizontal Stories */}
              <div className="border-t lg:border-t-0 lg:border-l border-zinc-200/90 flex flex-col justify-between">
                {sidePosts.map((post) => (
                  <article
                    key={post.id}
                    className="p-5 sm:p-6 lg:p-7 border-b border-zinc-200/90 last:border-b-0 hover:bg-zinc-50/70 transition-colors group flex-1"
                  >
                    <Link
                      href={`/${post.slug}`}
                      className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 h-full focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none rounded-xl"
                    >
                      {/* Thumbnail Image */}
                      <div className="relative w-full sm:w-44 lg:w-48 aspect-[16/10] rounded-xl overflow-hidden shrink-0 bg-zinc-100 shadow-2xs">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 200px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-600 mb-1.5 flex items-center gap-2">
                            <span>STORY</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-400" />
                            <span className="text-[#1757EE]">{post.category}</span>
                          </div>

                          <h3
                            className="text-base sm:text-lg font-serif tracking-tight text-zinc-950 leading-snug group-hover:text-[#1757EE] transition-colors line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />
                        </div>

                        <div className="text-[11px] font-mono text-zinc-500 mt-3 pt-2">
                          {post.readTime}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* --- REMAINING ARTICLES GRID (Below Featured Showcase) --- */}
            {remainingPosts.length > 0 && (
              <section id="all-articles" className="mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-zinc-200/90">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-zinc-950">
                      More Articles & Analysis
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 font-normal mt-1">
                      Explore engineering workflows, technical teardowns, and design systems.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    Showing {remainingPosts.length} additional posts
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {remainingPosts.map((post) => (
                    <article
                      key={post.id}
                      className="border border-zinc-200/90 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <Link
                        href={`/${post.slug}`}
                        className="block focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-zinc-800 font-semibold shadow-2xs">
                            {post.category}
                          </span>
                        </div>

                        <div className="p-5 sm:p-6">
                          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-2.5">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h3
                            className="text-lg sm:text-xl font-serif tracking-tight text-zinc-950 leading-snug group-hover:text-[#1757EE] transition-colors line-clamp-2 mb-3"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />

                          {post.excerpt && (
                            <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed line-clamp-2 font-normal">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </Link>

                      <div className="px-5 sm:px-6 pb-5 pt-0">
                        <Link
                          href={`/${post.slug}`}
                          className="inline-flex items-center gap-1.5 py-1 text-xs font-mono uppercase font-bold tracking-wider text-[#1757EE] hover:text-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
                        >
                          <span>READ ARTICLE</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* --- BOTTOM CTA SECTION --- */}
      <section className="border-t border-zinc-200/90 py-16 sm:py-24 bg-zinc-50/70 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1757EE] font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Scale With Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-zinc-950 mb-4 sm:mb-6">
            Ready to scale your product?
          </h2>

          <p className="text-zinc-700 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8 font-normal">
            Join ambitious founders scaling high-converting, sub-100ms full-stack web architectures.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] rounded-full bg-[#1757EE] text-white hover:bg-blue-700 transition-all text-xs sm:text-sm font-medium shadow-md shadow-blue-500/10 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
          >
            <span>Book Strategy Call</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}