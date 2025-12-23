"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Linkedin, 
  Twitter, 
  Share,
  Loader2,
  ChevronRight,
  CheckCircle2,
  Terminal,
  
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
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
};

// --- COMPONENTS ---

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    {/* Radial Fade to Black */}
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

export default function BlogPostPage() {
  const params = useParams();
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
        
        const terms = wpPost._embedded?.['wp:term'] || [];
        const categories = terms[0] || [];
        const categoryName = categories.length > 0 ? categories[0].name : "Insights";

        const tagsData = terms[1] || []; 
        const tagNames = (tagsData || []).map((t: unknown) => {
          const rec = t as Record<string, unknown>;
          return typeof rec?.name === 'string' ? rec.name : String(rec?.name ?? '');
        });

        const authorName = wpPost._embedded?.['author']?.[0]?.name || "11x Editor";

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
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Initialising Data Stream...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      
      <TechGridBackground />

      {/* --- AMBIENT GLOWS --- */}
      {/* Reduced intensity to prevent washing out the text */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[150px]" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="relative z-40 pt-32 px-6 sm:px-12 max-w-7xl mx-auto">
          <Link 
            href="/blogs" 
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={14} />
            </div>
            <span>Return to Intelligence</span>
          </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative w-full pt-12 pb-20 px-6 overflow-hidden">
        
        {/* --- FIXED BACKGROUND IMAGE LOGIC --- */}
        <div className="absolute top-0 left-0 w-full h-[100vh] z-0 pointer-events-none select-none">
           {/* FIX: We use 'mask-image' instead of just blur/opacity. 
              This creates a smooth gradient fade from visible (top) to transparent (bottom).
              No hard edges. No boxy blur.
           */}
           <div className="absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black_0%,transparent_90%)]">
              <Image 
                src={post.image} 
                alt="Background Ambience" 
                fill 
                className="object-cover" 
                priority 
              />
           </div>
           
           {/* Secondary Overlay to darken the top slightly for text readability */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            {post.category}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-almarena tracking-tight leading-[1.1] mb-10 text-white"
          >
             {post.title}
          </motion.h1>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-zinc-500 font-mono border-y border-white/10 py-6 bg-black/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
               <User size={14} className="text-blue-500" /> 
               <span className="text-zinc-300 uppercase tracking-wide">{post.author}</span>
            </div>
            <div className="hidden md:block w-px h-3 bg-white/10"></div>
            <div className="flex items-center gap-2">
               <Calendar size={14} className="text-blue-500" /> 
               <span>{post.date}</span>
            </div>
            <div className="hidden md:block w-px h-3 bg-white/10"></div>
            <div className="flex items-center gap-2">
               <Clock size={14} className="text-blue-500" /> 
               <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT CONTAINER --- */}
      <main className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LEFT SIDEBAR (Socials) */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-8 pt-2 sticky top-32 h-fit">
           <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2">Transmit Data</p>
           <div className="flex flex-col gap-4">
              <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                <Linkedin size={18} />
              </button>
              <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                <Share size={18} />
              </button>
           </div>
        </aside>

        {/* MAIN ARTICLE CONTENT */}
        <article className="lg:col-span-8">
           
           {/* WP CONTENT RENDERER */}
           <div 
              className="
                text-zinc-300 text-lg leading-relaxed md:text-xl md:leading-loose
                [&>p]:mb-8 [&>p]:font-light [&>p]:tracking-wide
                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:leading-tight [&>h2]:font-almarena
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-4
                [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-8 [&>ul]:space-y-4 
                [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-2.5 [&>ul>li]:before:w-1.5 [&>ul>li]:before:h-1.5 [&>ul>li]:before:bg-blue-500 [&>ul>li]:before:rounded-full
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol]:space-y-3 [&>ol>li]:marker:text-blue-500
                [&>blockquote]:border-l-2 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:text-white [&>blockquote]:my-12 [&>blockquote]:bg-zinc-900/30 [&>blockquote]:p-6 [&>blockquote]:rounded-r-xl
                [&>figure]:my-12 [&>figure]:w-full
                [&>figure>img]:rounded-2xl [&>figure>img]:w-full [&>figure>img]:border [&>figure>img]:border-white/10
                [&>figure>figcaption]:text-center [&>figure>figcaption]:text-xs [&>figure>figcaption]:font-mono [&>figure>figcaption]:text-zinc-500 [&>figure>figcaption]:mt-4 [&>figure>figcaption]:uppercase [&>figure>figcaption]:tracking-widest
                [&>a]:text-blue-400 [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-blue-400/30 hover:[&>a]:decoration-blue-400 transition-all
                [&>pre]:bg-[#050505] [&>pre]:p-6 [&>pre]:rounded-2xl [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-white/10 [&>pre]:text-sm [&>pre]:font-mono [&>pre]:mb-8 [&>pre]:shadow-inner
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
           />
           
           {/* TAGS */}
           {post.tags && post.tags.length > 0 && (
             <div className="mt-16 pt-8 border-t border-white/10">
               <h3 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">Related Keywords</h3>
               <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors cursor-pointer"
                    >
                      #{decodeHtml(tag)}
                    </span>
                  ))}
               </div>
             </div>
           )}

           {/* --- AUTHOR BIO CARD (Verified Personnel) --- */}
           <div className="mt-20 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-md relative overflow-hidden group">
              {/* Subtle Scanline Animation */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(59,130,246,0.03)_50%,transparent_100%)] bg-[size:100%_4px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                 {/* Avatar Placeholder / Icon */}
                 <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-white/10 shadow-lg">
                    {/* You can replace this with <Image src={authorImage} /> if you fetch it */}
                    <User size={32} className="text-zinc-500" />
                 </div>

                 <div className="flex-1">
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">{post.author}</h3>
                       <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-wide font-bold">
                          <CheckCircle2 size={12} />
                          Verified Personnel
                       </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                       Lead Digital Architect & Systems Engineer at ElevenX. Specializing in high-performance rendering, scalable backend infrastructure, and computational design.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                       <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={16} /></a>
                       <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={16} /></a>
                       <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Terminal size={16} /></a>
                    </div>
                 </div>
              </div>
           </div>

        </article>

        {/* RIGHT COLUMN (Empty for balance) */}
        <aside className="lg:col-span-2 hidden lg:block h-full"></aside>

      </main>

      {/* --- BOTTOM CTA --- */}
      <section className="relative py-32 border-t border-white/10 bg-black overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Systems Online
           </div>
           <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-almarena">Turn these insights into <span className="text-blue-600">revenue.</span></h2>
           <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
             You&apos;ve read the theory. Now let our engineers build the engine. 
             Book a strategy call with 11xSolutions today.
           </p>
           <button className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
             <Link className="relative z-10 flex items-center gap-2" href={"/book"}>
               Start Your Project <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </button>
        </div>
        
        {/* Tech Grid Background Fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>

    </div>
  );
}
