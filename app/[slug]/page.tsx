"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // Hook to get slug
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Linkedin, 
  Twitter, 
  Share,
  Loader2,
  ChevronRight
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
}

// --- UTILITIES ---

const decodeHtml = (html: string) => {
  if (typeof window === 'undefined') return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const getReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>?/gm, '');
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// --- COMPONENTS ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

export default function BlogPostPage() {
  const params = useParams(); // Get dynamic slug
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`https://cms.elevenxsolutions.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`);
        const data = await res.json();

        if (!data || data.length === 0) {
          setError(true);
          return;
        }

        const wpPost = data[0];
        const imageUrl = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80';
        const categoryName = wpPost._embedded?.['wp:term']?.[0]?.[0]?.name || "Insights";
        const authorName = wpPost._embedded?.['author']?.[0]?.name || "11x Editor";

        setPost({
          id: wpPost.id,
          title: decodeHtml(wpPost.title.rendered),
          content: wpPost.content.rendered,
          date: formatDate(wpPost.date),
          author: authorName,
          category: categoryName,
          image: imageUrl,
          readTime: getReadTime(wpPost.content.rendered),
        });

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-500 font-mono text-sm tracking-widest">DECRYPTING CONTENT...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404: Signal Lost</h1>
          <p className="text-gray-400 mb-8">This frequency does not exist.</p>
          <Link href="/blogs" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-colors">
            Return to Base
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-blue-500/50 selection:text-white">
     
      <NoiseOverlay />

      {/* --- AMBIENT GLOWS --- */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
         <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      {/* --- NAVIGATION --- */}
      {/* Removed 'fixed' positioning. Now it's part of the standard flow.
         Uses max-w-[1400px] and mx-auto to align perfectly with the main content below.
         pt-32 pushes it down to sit comfortably below your site's main navbar.
      */}
      <nav className="relative z-40 pt-32 px-6 sm:px-20 max-w-[1400px] mx-auto">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft size={16} /> Back to Blogs
          </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      {/* Reduced pt-40 to pt-10 since the nav block above now takes up space */}
      <header className="relative w-full pt-10 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            {post.category}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400 font-mono border-t border-b border-white/10 py-6"
          >
            <div className="flex items-center gap-2">
               <User size={16} className="text-blue-500" /> 
               <span className="text-gray-300">{post.author}</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden md:block"></div>
            <div className="flex items-center gap-2">
               <Calendar size={16} className="text-blue-500" /> 
               <span>{post.date}</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden md:block"></div>
            <div className="flex items-center gap-2">
               <Clock size={16} className="text-blue-500" /> 
               <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Image Background (Blurred) */}
        <div className="absolute top-0 left-0 w-full h-[600px] z-0 opacity-20">
           <Image src={post.image} alt={post.title} fill className="object-cover" priority />
           <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent"></div>
        </div>
      </header>

      {/* --- CONTENT CONTAINER --- */}
      <main className="max-w-[1400px] mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* SIDEBAR (Share & Nav) */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-8 pt-10 sticky top-32 h-fit">
           <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Share Intel</p>
           <div className="flex flex-col gap-4">
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 hover:bg-blue-400/10 transition-all">
                <Linkedin size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 hover:bg-blue-400/10 transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 hover:bg-blue-400/10 transition-all">
                <Share size={18} />
              </button>
           </div>
        </aside>

        {/* MAIN ARTICLE CONTENT */}
        <article className="lg:col-span-8">
           
           {/* Featured Image (Clear) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="relative aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl shadow-blue-900/20 group"
           >
              <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
           </motion.div>

           {/* WP CONTENT RENDERER 
              This class block styles the raw HTML from WordPress 
           */}
           <div 
              className="
                text-gray-300 text-lg leading-relaxed md:text-xl md:leading-loose
                [&>p]:mb-8 [&>p]:font-light
                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:leading-tight
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-4
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:space-y-3 [&>ul>li]:marker:text-blue-500
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol]:space-y-3 [&>ol>li]:marker:text-blue-500
                [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-2xl [&>blockquote]:text-white [&>blockquote]:my-12 [&>blockquote]:font-serif
                [&>figure]:my-12 [&>figure]:w-full
                [&>figure>img]:rounded-xl [&>figure>img]:w-full [&>figure>img]:border [&>figure>img]:border-white/10
                [&>figure>figcaption]:text-center [&>figure>figcaption]:text-sm [&>figure>figcaption]:text-gray-500 [&>figure>figcaption]:mt-3
                [&>a]:text-blue-400 [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-blue-400/30 hover:[&>a]:decoration-blue-400 transition-all
                [&>pre]:bg-[#111] [&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-white/10 [&>pre]:text-sm [&>pre]:font-mono [&>pre]:mb-8
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
           />
           
           {/* ARTICLE FOOTER */}
           <div className="mt-20 pt-10 border-t border-white/10">
              <h3 className="text-white font-bold mb-6">Tags</h3>
              <div className="flex gap-2">
                 <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
                   #{post.category}
                 </span>
                 <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
                   #DigitalMarketing
                 </span>
                 <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
                   #Growth
                 </span>
              </div>
           </div>

        </article>

        {/* RIGHT COLUMN (CTA) */}
        <aside className="lg:col-span-2 hidden lg:block h-full">
           {/* Space for Ad or related content */}
        </aside>

      </main>

      {/* --- BOTTOM CTA --- */}
      <section className="relative py-24 border-t border-white/10 bg-[#050505] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Turn these insights into <span className="text-blue-500">revenue.</span></h2>
           <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
             You've read the theory. Now let our engineers build the engine. 
             Book a strategy call with 11xSolutions today.
           </p>
           <button className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
             <span className="relative z-10 flex items-center gap-2">
               Start Your Project <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
        </div>
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>

    </div>
  );
}