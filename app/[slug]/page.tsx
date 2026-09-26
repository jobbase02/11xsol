"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Linkedin,
  Twitter,
  Share2,
  Check,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

// --- TYPES ---
interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
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

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!params.slug) return;

    const fetchPost = async () => {
      try {
        // 1. Try fetching from high-speed Redis-cached API endpoint
        const res = await fetch(`/api/blogs?slug=${params.slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json?.post) {
            setPost({
              ...json.post,
              date: formatDate(json.post.date),
            });
            setLoading(false);
            return;
          }
        }

        // 2. Fallback to direct WordPress API
        const wpRes = await fetch(
          `https://cms.elevenxsolutions.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`
        );
        const data = await wpRes.json();

        if (!data || data.length === 0) {
          setError(true);
          return;
        }

        const wpPost = data[0];
        const imageUrl =
          wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80";

        const terms = wpPost._embedded?.["wp:term"] || [];
        const categories = terms[0] || [];
        const categoryName = categories.length > 0 ? categories[0].name : "Insights";

        const tagsData = terms[1] || [];
        const tagNames = (tagsData || []).map((t: unknown) => {
          const rec = t as Record<string, unknown>;
          return typeof rec?.name === "string" ? rec.name : String(rec?.name ?? "");
        });

        const authorName = wpPost._embedded?.["author"]?.[0]?.name || "ElevenX Engineering";

        setPost({
          id: wpPost.id,
          title: decodeHtml(wpPost.title.rendered),
          content: wpPost.content.rendered,
          date: formatDate(wpPost.date),
          author: authorName,
          category: decodeHtml(categoryName),
          image: imageUrl,
          readTime: getReadTime(wpPost.content.rendered),
          tags: tagNames,
        });
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-zinc-900">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#1757EE]" size={36} />
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
            Loading Article...
          </p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-manrope selection:bg-blue-500/20 selection:text-blue-950 relative overflow-x-hidden pt-28 sm:pt-32">
      {/* Background Subtle Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#1757EE] transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-200 bg-zinc-50 group-hover:bg-[#1757EE] group-hover:border-[#1757EE] group-hover:text-white flex items-center justify-center transition-all duration-200">
              <ArrowLeft size={14} />
            </div>
            <span>Back to Insights</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 sm:mb-14">
          {/* Category Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FE] border border-[#D5E3FA] text-[#1757EE] text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider mb-5 sm:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-light tracking-tight text-zinc-950 leading-[1.15] mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Metadata Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-5 border-y border-zinc-200/80 text-xs sm:text-sm font-mono text-zinc-600"
          >
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <User size={15} className="text-[#1757EE]" />
                <span className="font-medium text-zinc-900">{post.author}</span>
              </div>
              <div className="w-px h-3.5 bg-zinc-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-[#1757EE]" />
                <span>{post.date}</span>
              </div>
              <div className="w-px h-3.5 bg-zinc-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#1757EE]" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 hidden md:inline">
                Share
              </span>
              <button
                onClick={handleCopyLink}
                title="Copy article URL"
                className="w-8 h-8 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-[#1757EE] flex items-center justify-center transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="w-8 h-8 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-[#1757EE] flex items-center justify-center transition-colors"
              >
                <Twitter size={14} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="w-8 h-8 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-[#1757EE] flex items-center justify-center transition-colors"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </motion.div>
        </header>

        {/* Hero Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-100 shadow-md border border-zinc-200/80 mb-12 sm:mb-16"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Article Body */}
        <article className="prose-container">
          <div
            className="
              text-zinc-800 text-base sm:text-lg leading-[1.8] font-normal
              [&>p]:mb-6 sm:[&>p]:mb-8 [&>p]:leading-relaxed
              [&>h2]:text-2xl sm:[&>h2]:text-3xl lg:[&>h2]:text-4xl [&>h2]:font-serif [&>h2]:font-normal [&>h2]:text-zinc-950 [&>h2]:mt-12 sm:[&>h2]:mt-16 [&>h2]:mb-5 [&>h2]:tracking-tight [&>h2]:leading-snug
              [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-serif [&>h3]:font-normal [&>h3]:text-zinc-950 [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:tracking-tight
              [&>ul]:my-6 [&>ul]:space-y-3 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:marker:text-[#1757EE]
              [&>ol]:my-6 [&>ol]:space-y-3 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol]:marker:text-[#1757EE]
              [&>li]:pl-1
              [&>blockquote]:my-8 sm:[&>blockquote]:my-10 [&>blockquote]:pl-6 [&>blockquote]:border-l-2 [&>blockquote]:border-[#1757EE] [&>blockquote]:italic [&>blockquote]:text-zinc-900 [&>blockquote]:text-lg sm:[&>blockquote]:text-xl [&>blockquote]:leading-relaxed [&>blockquote]:bg-[#F8FAFC] [&>blockquote]:py-4 [&>blockquote]:pr-6 [&>blockquote]:rounded-r-xl
              [&>figure]:my-8 sm:[&>figure]:my-12 [&>figure]:w-full
              [&>figure>img]:rounded-2xl [&>figure>img]:w-full [&>figure>img]:border [&>figure>img]:border-zinc-200/80 [&>figure>img]:shadow-sm
              [&>figure>figcaption]:text-center [&>figure>figcaption]:text-xs [&>figure>figcaption]:font-mono [&>figure>figcaption]:text-zinc-500 [&>figure>figcaption]:mt-3
              [&>a]:text-[#1757EE] [&>a]:font-medium [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-[#1757EE]/30 hover:[&>a]:decoration-[#1757EE] transition-colors
              [&>pre]:bg-zinc-950 [&>pre]:text-zinc-100 [&>pre]:p-5 sm:[&>pre]:p-6 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-zinc-800 [&>pre]:text-xs sm:[&>pre]:text-sm [&>pre]:font-mono [&>pre]:my-8 [&>pre]:shadow-sm
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 sm:mt-16 pt-8 border-t border-zinc-200/80">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
                Related Topics
              </h3>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-[#EEF4FE] hover:text-[#1757EE] border border-zinc-200/80 text-xs font-mono text-zinc-700 transition-colors cursor-pointer select-none"
                  >
                    #{decodeHtml(tag)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-200/90 shadow-2xs flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-[#1757EE] shrink-0 shadow-2xs">
              <User size={28} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h4 className="font-semibold text-zinc-950 text-base sm:text-lg">
                  {post.author}
                </h4>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-[#1757EE] text-[10px] font-mono uppercase tracking-wider font-semibold">
                  <CheckCircle2 size={11} />
                  <span>Author</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mb-4">
                Systems architect and technical contributor at ElevenX Solutions. Focused on
                sub-100ms full-stack web applications, automated workflow pipelines, and
                scalable cloud engineering.
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <Link href="/about" className="hover:text-[#1757EE] transition-colors">
                  About Our Team →
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Bottom CTA Banner */}
        <section className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#F0F5FE] to-[#E9F1FD] border border-[#D5E3FA] text-center relative overflow-hidden shadow-sm">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#1757EE] font-bold mb-3 block">
              ENGINEERING PARTNERSHIP
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-zinc-950 leading-tight mb-4 font-normal">
              Turn these technical strategies <br className="hidden sm:inline" />
              into production-ready software.
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-lg mx-auto mb-8 font-normal">
              Skip the agency bloat and fragile templates. Collaborate directly with senior
              engineers to ship your next feature sprint.
            </p>

            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[44px] rounded-full bg-zinc-950 hover:bg-[#1757EE] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md active:scale-95"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
