"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp, Loader2, Search } from "lucide-react";

// --- INTERFACES ---
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  size: "hero" | "tall" | "wide" | "normal";
}

interface Category {
  id: number;
  name: string;
  count: number;
  slug: string;
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
  return `${minutes} min`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
};

// --- COMPONENTS ---

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent blur-[120px]"></div>
  </div>
);

const Marquee = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-zinc-900 border-y border-white/10 text-white py-4 font-mono text-sm font-bold uppercase tracking-widest select-none mb-20">
      <div className="absolute inset-0 bg-blue-600/5"></div>
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-4 text-zinc-400">
            <Sparkles size={14} className="text-blue-500" />
            <span className="ml-2">SYSTEM INTELLIGENCE</span>
            <span className="text-blue-500 mx-2">{'///'}</span>
            <span>MARKET DOMINANCE</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function UltraModernBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- FETCHING LOGIC (Unchanged) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch('https://cms.elevenxsolutions.com/wp-json/wp/v2/posts?_embed&per_page=12'),
          fetch('https://cms.elevenxsolutions.com/wp-json/wp/v2/categories')
        ]);

        const postsData = await postsRes.json();
        const categoriesData = await categoriesRes.json();

        const validCategories = (categoriesData as unknown[])
          .filter((cat) => {
            const c = cat as Record<string, unknown>;
            return typeof c.count === 'number' && (c.count as number) > 0;
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

        const mappedPosts: BlogPost[] = (postsData as unknown[]).map((post, index: number) => {
          const p = post as Record<string, unknown>;
          let size: "hero" | "tall" | "wide" | "normal" = "normal";
          if (index === 0) size = "hero";       
          else if (index === 1) size = "tall";  
          else if (index === 4) size = "wide";  

          const embedded = p._embedded as unknown as Record<string, unknown> | undefined;
          const featured = embedded?.['wp:featuredmedia'] as unknown as Array<Record<string, unknown>> | undefined;
          const imageUrl = String(featured?.[0]?.['source_url'] ?? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80');
          const terms = embedded?.['wp:term'] as unknown as Array<unknown> | undefined;
          const categoryName = String(((terms?.[0] as unknown as Array<Record<string, unknown>> | undefined)?.[0]?.['name']) ?? 'Uncategorized');

          return {
            id: Number(p.id as unknown ?? 0),
            title: decodeHtml(String(((p.title as unknown as Record<string, unknown>)?.rendered) ?? '')),
            slug: String(p.slug ?? ''),
            category: decodeHtml(String(categoryName)),
            date: formatDate(String(p.date ?? '')),
            readTime: getReadTime(String(((p.content as unknown as Record<string, unknown>)?.rendered) ?? '')),
            image: String(imageUrl),
            size: size,
          };
        });

        setPosts(mappedPosts);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => 
    selectedCategory === "All" || post.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      
      <TechGridBackground />

      {/* --- HERO SECTION --- */}
      <header className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6">
             <Search size={12} className="text-blue-500" />
             Knowledge Base
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8 font-almarena">
            INSIGHTS
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 gap-8">
            <p className="text-lg md:text-xl text-zinc-400 max-w-lg font-light leading-relaxed">
              Decoding the algorithms of digital growth. <br/>
              <span className="text-white font-medium">Read. Implement. Dominate.</span>
            </p>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`cursor-pointer px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === "All"
                    ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                    : "bg-zinc-900/50 text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(decodeHtml(cat.name))}
                  className={`cursor-pointer px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                    selectedCategory === decodeHtml(cat.name)
                      ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                      : "bg-zinc-900/50 text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {decodeHtml(cat.name)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* --- KINETIC MARQUEE --- */}
      <Marquee />

      {/* --- THE ULTRA GRID --- */}
      <section className="relative z-10 px-4 md:px-6 pb-32 max-w-7xl mx-auto min-h-[500px]">
        {loading ? (
           <div className="flex flex-col gap-4 justify-center items-center w-full h-64">
             <Loader2 className="animate-spin text-blue-500" size={40} />
             <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Fetching Intelligence...</p>
           </div>
        ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[350px]">
          
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              
              const isHero = post.size === "hero";
              const isTall = post.size === "tall";
              const isWide = post.size === "wide";
              
              const gridClass = isHero ? "md:col-span-2 md:row-span-2" 
                              : isTall ? "md:row-span-2" 
                              : isWide ? "md:col-span-2" 
                              : "col-span-1";

              return (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`group relative rounded-3xl overflow-hidden bg-zinc-900/20 border border-white/5 hover:border-blue-500/30 transition-colors cursor-pointer backdrop-blur-sm ${gridClass}`}
                >
                  {/* --- LINK TO DYNAMIC POST PAGE --- */}
                  <Link href={`/${post.slug}`} className="block w-full h-full relative z-20">
                    
                    {/* Image Layer */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-60 group-hover:opacity-40"
                      />
                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-between">
                      
                      <div className="flex justify-between items-start">
                        <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest border border-white/10 text-zinc-300 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-colors">
                           {post.category}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10">
                           <ArrowUpRight size={18} className="text-blue-400" />
                        </div>
                      </div>

                      <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                          <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-400 mb-3">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                            <span>{post.readTime}</span>
                          </div>
                          <h2 
                             className={`${isHero ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'} font-bold leading-[1.1] text-white group-hover:text-blue-100 transition-colors`}
                             dangerouslySetInnerHTML={{ __html: post.title }}
                          />
                      </div>
                    </div>

                  </Link>
                </motion.article>
              );
            })}

            {/* --- INTEGRATED CTA CARD (Styled to match theme) --- */}
            <motion.div 
               layout
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-blue-400/20 shadow-lg shadow-blue-900/20"
            >
               {/* Animated Grain */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
               
               {/* Glow Orb */}
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-white blur-[80px] rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>

               <div className="relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                    <TrendingUp className="text-white" size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white leading-tight font-almarena">
                   NEED TRAFFIC <br/> LIKE THIS?
                 </h3>
               </div>
               
               <div className="relative z-10">
                 <Link href={"/book?upm=blog_cta"}>
                   <button className="w-full py-3 bg-white text-blue-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-100 transition-colors duration-300 cursor-pointer shadow-lg">
                      Book Strategy Call
                   </button>
                 </Link>
               </div>
            </motion.div>

          </AnimatePresence>
        </motion.div>
        )}
      </section>

      {/* --- FOOTER TEASER --- */}
      <section className="border-t border-white/5 py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <h2 className="text-3xl md:text-5xl font-bold mb-6 font-almarena text-white">Ready to scale your agency?</h2>
           <p className="text-zinc-500 mb-8 max-w-lg mx-auto">Join the 1% of marketers dominating the landscape using our systems.</p>
           <Link className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-bold uppercase tracking-widest" href={"/book?upm=blog_footer"}>
              Hire Our Experts <ArrowUpRight size={18} />
           </Link>
        </div>
        
        {/* Background Grid Fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>

    </div>
  );
}