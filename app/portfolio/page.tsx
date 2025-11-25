// app/portfolio/page.tsx
"use client";

import React, { JSX, useState } from "react";
import { Navbar } from "../component/Navbar";
import { AnimatedBackgroundWrapper } from "../component/AnimatedBackground";
import ProjectCard from "../component/ProjectCard";
import { Code2, Github, Linkedin, Mail, MapPin, PenTool, Phone, Twitter } from "lucide-react";

/**
 * Safe portfolio page.
 * - restaurantSrcDoc contains a React-ready template that uses React/ReactDOM/Babel from CDN.
 * - IMPORTANT: when pasting your component into the template do NOT include `import` lines.
 *   Also avoid `${...}` sequences inside that pasted JSX (they will be part of iframe code, not the outer file).
 */

export default function PortfolioPage(): JSX.Element {
  const [active, setActive] = useState<"web" | "writing">("web");

  // === React-ready srcDoc template (no imports). Paste a self-contained JSX component into the placeholder.
  const restaurantSrcDoc = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Haldwani Foods — Demo</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root{
      --orange:#fb923c;
      --dark:#0b1220;
      --muted:#9aa7b2;
      --white:#fff;
      --card:#ffffff;
    }
    html,body{height:100%;margin:0;font-family:Inter,system-ui,Arial,Helvetica,sans-serif;background:var(--white);color:var(--dark);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    a{color:inherit}
    .container{max-width:1200px;margin:0 auto;padding:0 20px}
    /* NAV */
    nav.header{position:fixed;inset:0 0 auto 0;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;padding:22px 20px;transition:all .28s ease;background:transparent}
    nav.header.solid{background:#fff;box-shadow:0 8px 30px rgba(2,6,23,0.06);padding:12px 20px}
    .logo{display:flex;align-items:center;gap:12px}
    .logo .mark{background:var(--orange);color:#fff;padding:8px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(251,146,60,0.12)}
    .logo .title{font-weight:800;font-size:18px}
    .nav-links{display:flex;gap:22px;align-items:center}
    .nav-links a{font-weight:600;text-decoration:none;color:inherit}
    .btn-primary{background:var(--orange);color:#031024;padding:10px 14px;border-radius:999px;font-weight:700;text-decoration:none}
    .mobile-toggle{display:none;border:0;background:transparent;font-size:20px}
    /* hero */
    .hero{height:72vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
    .hero .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.45)}
    .hero .overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,6,23,0.3),rgba(2,6,23,0.6))}
    .hero .content{position:relative;z-index:3;text-align:center;color:#fff;padding:22px;max-width:1100px}
    .badge{display:inline-flex;align-items:center;gap:.6rem;padding:.45rem .9rem;border-radius:999px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);font-weight:700;color:var(--orange)}
    h1{font-size:clamp(36px,6vw,64px);line-height:1.02;margin:.7rem 0;text-shadow:0 8px 30px rgba(2,6,23,0.6)}
    p.lead{color:rgba(255,255,255,0.9);max-width:780px;margin:0 auto 1.25rem;font-weight:300}
    .cta-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:12px}
    .cta{padding:12px 20px;border-radius:999px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:10px}
    .cta.primary{background:var(--orange);color:#031024;box-shadow:0 20px 40px rgba(251,146,60,0.12)}
    .cta.secondary{background:rgba(255,255,255,0.06);color:#fff;border:1px solid rgba(255,255,255,0.06)}
    /* offers */
    .offers{max-width:1200px;margin:-80px auto 0;padding:0 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;z-index:3;position:relative}
    .offer{background:var(--card);border-radius:14px;padding:18px;display:flex;gap:14px;align-items:center;box-shadow:0 10px 40px rgba(2,6,23,0.06);border:1px solid #f0f3f5}
    .offer .ico{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;flex-shrink:0}
    .offer h3{margin:6px 0 2px;font-size:18px}
    .offer p{margin:0;color:#475569}
    /* menu */
    .section{padding:48px 0}
    .section .title{font-size:28px;margin-bottom:6px;font-weight:800}
    .section .desc{color:#6b7280;margin-bottom:18px}
    .menu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
    .menu-card{background:#fff;border-radius:16px;overflow:hidden;border:1px solid #f0f3f5;box-shadow:0 6px 30px rgba(2,6,23,0.04)}
    .menu-card img{width:100%;height:200px;object-fit:cover;display:block}
    .menu-card .body{padding:16px}
    .badge-label{display:inline-block;background:#fffbeb;color:#7c2d12;padding:6px 8px;border-radius:8px;font-weight:700;font-size:12px}
    .price-badge{font-weight:800}
    /* features */
    .features{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .feature{background:#fff;padding:20px;border-radius:12px;text-align:center;box-shadow:0 6px 20px rgba(2,6,23,0.04)}
    .feature .icon{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;background:#fff}
    /* about */
    .about-wrap{display:flex;gap:24px;align-items:center;flex-wrap:wrap}
    .about-img{flex:1 1 320px;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px rgba(2,6,23,0.2)}
    .about-body{flex:1 1 320px}
    /* testimonials */
    .test-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}
    .test-card{background:#fafafa;padding:20px;border-radius:14px;border:1px solid #eee}
    /* footer */
    footer.footer{background:var(--dark);color:#cbd5e1;padding:36px 20px;margin-top:32px}
    .footer .col{min-width:180px}
    /* small helpers */
    .muted{color:var(--muted)}
    .chip{display:inline-block;background:#f1f5f9;padding:6px 10px;border-radius:999px;font-weight:700}
    /* responsive */
    @media (max-width:980px){
      nav.header{padding:14px 12px}
      .nav-links{display:none}
      .mobile-toggle{display:inline-flex}
      .features{grid-template-columns:repeat(1,1fr)}
      .hero{height:56vh}
      .offers{margin-top:-48px}
    }
    /* small entrance animations */
    .fade-up{opacity:0;transform:translateY(14px);transition:all .6s cubic-bezier(.2,.9,.2,1) .06s}
    .inview{opacity:1;transform:none}
    .scale-in{opacity:0;transform:scale(.98);transition:all .5s ease}
    .scale-in.inview{opacity:1;transform:none}
  </style>
</head>
<body>
  <!-- NAV -->
  <nav class="header" id="mainNav" role="navigation">
    <div class="logo">
      <div class="mark" aria-hidden="true">
        <!-- utensils svg -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2v7" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 2v7" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 21c1.5-1 3-1 4 0 1 1 2.5 1 4 0" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="title">Haldwani <span style="color:var(--orange)">Foods</span></div>
    </div>

    <div class="nav-links" id="navLinks">
      <a href="#home">Home</a>
      <a href="#offers">Offers</a>
      <a href="#menu">Menu</a>
      <a href="#about">About</a>
      <a class="btn-primary" href="#contact"><span style="display:inline-flex;align-items:center;gap:8px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.13 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.73 3.03a2 2 0 0 1-.45 2.11L9.7 10.7a14 14 0 0 0 6 6l1.84-1.84a2 2 0 0 1 2.11-.45c.96.36 1.98.61 3.03.73A2 2 0 0 1 22 16.92z" fill="#031024"/></svg>Call Us</span></a>
    </div>

    <button class="mobile-toggle" id="mobileToggle" aria-expanded="false" aria-label="Toggle menu">
      <svg id="menuIcon" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#fb923c" stroke-width="1.8" stroke-linecap="round"/></svg>
      <svg id="closeIcon" width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:none"><path d="M6 18L18 6M6 6l12 12" stroke="#fb923c" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
  </nav>

  <!-- mobile menu -->
  <div id="mobileMenu" style="display:none;position:fixed;top:72px;left:0;right:0;background:#fff;z-index:55;padding:16px;border-top:1px solid #eee">
    <a href="#home" style="display:block;padding:10px 0;border-bottom:1px solid #f3f4f6">Home</a>
    <a href="#offers" style="display:block;padding:10px 0;border-bottom:1px solid #f3f4f6">Offers</a>
    <a href="#menu" style="display:block;padding:10px 0;border-bottom:1px solid #f3f4f6">Menu</a>
    <a href="#about" style="display:block;padding:10px 0;border-bottom:1px solid #f3f4f6">About</a>
    <a href="#contact" style="display:block;padding:10px 0">Contact</a>
  </div>

  <!-- HERO -->
  <header id="home" class="hero" role="banner">
    <img class="bg" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" alt="hero background">
    <div class="overlay"></div>
    <div class="content container">
      <div class="badge fade-up">Welcome to Haldwani's Finest Kitchen</div>
      <h1 class="fade-up" style="margin-top:16px">Taste the <span style="color:var(--orange)">Tradition</span>, <br> Feel the <span style="background:linear-gradient(90deg,var(--orange),#facc15);-webkit-background-clip:text;background-clip:text;color:transparent">Vibe</span></h1>
      <p class="lead fade-up">From authentic Pahadi recipes to modern culinary delights — handcrafted with love and served with pride.</p>
      <div class="cta-row fade-up">
        <a href="#menu" class="cta primary"><svg width="18" height="18" viewBox="0 0 24 24" style="margin-right:6px"><path d="M7 2v7M11 2v7M4 21c1.5-1 3-1 4 0 1 1 2.5 1 4 0" stroke="#031024" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg> Explore Menu</a>
        <a href="#contact" class="cta secondary"><svg width="16" height="16" viewBox="0 0 24 24" style="margin-right:6px"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke="#fff" stroke-width="1" fill="#fb923c"/></svg> Visit Us</a>
      </div>
    </div>
  </header>

  <!-- OFFERS -->
  <section class="offers" id="offers" aria-label="Offers">
    <div class="offer fade-up scale-in">
      <div class="ico" style="background:linear-gradient(90deg,var(--orange),#f97316)">🔥</div>
      <div>
        <div style="font-size:12px;color:#6b7280">Hot Offer</div>
        <h3>Weekend Family Feast — Flat 20% OFF</h3>
        <div style="font-weight:700;color:#374151">Code: FAMILY20</div>
      </div>
    </div>

    <div class="offer fade-up scale-in">
      <div class="ico" style="background:linear-gradient(90deg,#f97316,#f59e0b)">⏰</div>
      <div>
        <div style="font-size:12px;color:#6b7280">Special</div>
        <h3>Happy Hours Special — Free Mocktail</h3>
        <div style="font-weight:700;color:#374151">Code: HAPPYHR</div>
      </div>
    </div>
  </section>

  <!-- MENU -->
  <section class="section container" id="menu">
    <div style="text-align:center;margin-bottom:22px">
      <div class="title">Our Delicious Menu</div>
      <div class="desc">Discover the dishes that make us famous. Handcrafted with love and served with pride.</div>
    </div>

    <div class="menu-grid">
      <div class="menu-card fade-up">
        <img src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80" alt="butter chicken">
        <div class="body">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div>
              <div class="badge-label">Bestseller</div>
            </div>
            <div class="price-badge">₹340</div>
          </div>
          <h4 style="margin:0 0 8px">Special Butter Chicken</h4>
          <p style="margin:0;color:#6b7280">Tender chicken cooked in a rich tomato and butter gravy. A classic favourite.</p>
        </div>
      </div>

      <div class="menu-card fade-up">
        <img src="https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80" alt="momos">
        <div class="body">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div><div class="badge-label">Must Try</div></div>
            <div class="price-badge">₹180</div>
          </div>
          <h4 style="margin:0 0 8px">Pahadi Momos Platter</h4>
          <p style="margin:0;color:#6b7280">Steamed dumplings served with spicy sesame chutney and soup.</p>
        </div>
      </div>

      <div class="menu-card fade-up">
        <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80" alt="paneer">
        <div class="body">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div></div>
            <div class="price-badge">₹290</div>
          </div>
          <h4 style="margin:0 0 8px">Paneer Tikka Masala</h4>
          <p style="margin:0;color:#6b7280">Grilled paneer cubes in a spicy, creamy curry with bell peppers.</p>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:28px">
      <button style="background:#0b1220;color:#fff;padding:12px 24px;border-radius:999px;border:0;font-weight:700;cursor:pointer">View Complete Menu PDF</button>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="section" aria-label="Features">
    <div class="container">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
        <div class="feature fade-up">
          <div class="icon" aria-hidden="true" style="background:#fff;border-radius:12px;padding:10px;display:inline-flex;align-items:center;justify-content:center">
            <!-- chef hat -->
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2a4 4 0 0 0-4 4c0 .6.17 1.15.45 1.64A3 3 0 0 0 6 12v6h12v-6a3 3 0 0 0-2.45-4.36c.28-.5.45-1.04.45-1.64a4 4 0 0 0-4-4z" fill="#fb923c"/></svg>
          </div>
          <h4 style="margin-top:12px;margin-bottom:6px">Master Chefs</h4>
          <p class="muted">Expert chefs crafting magic with local spices.</p>
        </div>

        <div class="feature fade-up">
          <div class="icon" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 .587l3.668 7.431L23.5 9.75l-5.5 5.36L19.332 24 12 19.897 4.668 24 6 15.11 0.5 9.75l7.832-1.732L12 .587z" fill="#f59e0b"/></svg></div>
          <h4 style="margin-top:12px;margin-bottom:6px">Premium Quality</h4>
          <p class="muted">We use only the freshest farm-picked ingredients.</p>
        </div>

        <div class="feature fade-up">
          <div class="icon" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#fb923c" stroke-width="1.2" fill="none"/><path d="M12 7v6l4 2" stroke="#fb923c" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
          <h4 style="margin-top:12px;margin-bottom:6px">Freshly Made</h4>
          <p class="muted">Every dish is prepared fresh upon your order.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about" class="section" style="background:#0b1220;color:#fff">
    <div class="container about-wrap">
      <div class="about-img">
        <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" alt="interior" style="width:100%;display:block"/>
      </div>
      <div class="about-body">
        <div style="max-width:560px">
          <div style="color:var(--orange);font-weight:800;letter-spacing:1px;font-size:12px">About Us</div>
          <h2 style="font-size:32px;margin:8px 0 12px">Serving Happiness Since 2010</h2>
          <p style="color:#aab4be;line-height:1.6">Located in the heart of Haldwani, we bring you the fusion of traditional Kumaoni hospitality and modern culinary arts. Whether it's a family dinner, a quick bite with friends, or a cozy date, Haldwani Foods is your destination.</p>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px">
            <div style="text-align:center">
              <div style="font-size:22px;font-weight:800">15+</div>
              <div class="muted">Years Experience</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:22px;font-weight:800">50k+</div>
              <div class="muted">Happy Customers</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:22px;font-weight:800">40+</div>
              <div class="muted">Food Varieties</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section" style="background:#fff">
    <div class="container">
      <div style="text-align:center;margin-bottom:18px">
        <h3 style="font-size:26px;margin:0">Customer Love</h3>
      </div>

      <div class="test-grid">
        <div class="test-card fade-up">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
            <div style="width:40px;height:40px;border-radius:8px;background:#ffedd5;display:flex;align-items:center;justify-content:center;font-weight:700;color:#c2410c">R</div>
            <div>
              <div style="font-weight:700">Rahul Verma</div>
              <div style="font-size:12px;color:var(--muted)">Verified Customer</div>
            </div>
          </div>
          <p style="font-style:italic;color:#374151">"Best food in Haldwani! The butter chicken reminds me of home."</p>
        </div>

        <div class="test-card fade-up">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
            <div style="width:40px;height:40px;border-radius:8px;background:#ffedd5;display:flex;align-items:center;justify-content:center;font-weight:700;color:#c2410c">P</div>
            <div>
              <div style="font-weight:700">Priya Joshi</div>
              <div style="font-size:12px;color:var(--muted)">Verified Customer</div>
            </div>
          </div>
          <p style="font-style:italic;color:#374151">"Lovely ambience and the staff is very polite. Highly recommended."</p>
        </div>

        <div class="test-card fade-up">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
            <div style="width:40px;height:40px;border-radius:8px;background:#ffedd5;display:flex;align-items:center;justify-content:center;font-weight:700;color:#c2410c">A</div>
            <div>
              <div style="font-weight:700">Amit Singh</div>
              <div style="font-size:12px;color:var(--muted)">Verified Customer</div>
            </div>
          </div>
          <p style="font-style:italic;color:#374151">"Fast service and the packaging was excellent. Food was hot."</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer" id="contact">
    <div class="container" style="display:flex;flex-wrap:wrap;gap:24px;justify-content:space-between;align-items:flex-start">
      <div class="col" style="min-width:240px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="background:var(--orange);padding:8px;border-radius:8px;color:#fff"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 2v7M11 2v7M4 21c1.5-1 3-1 4 0 1 1 2.5 1 4 0" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div style="font-weight:800;font-size:18px">Haldwani <span style="color:var(--orange)">Foods</span></div>
        </div>
        <p class="muted" style="max-width:360px">Experience the authentic taste of the hills. We promise quality, hygiene, and a taste that brings you back.</p>
      </div>

      <div class="col" style="min-width:160px">
        <div style="font-weight:700;margin-bottom:8px">Quick Links</div>
        <ul style="list-style:none;padding:0;margin:0;color:#cbd5e1">
          <li style="margin-bottom:8px"><a href="#home" style="color:inherit;text-decoration:none">Home</a></li>
          <li style="margin-bottom:8px"><a href="#offers" style="color:inherit;text-decoration:none">Today's Offers</a></li>
          <li style="margin-bottom:8px"><a href="#menu" style="color:inherit;text-decoration:none">Our Menu</a></li>
          <li style="margin-bottom:8px"><a href="#about" style="color:inherit;text-decoration:none">About Us</a></li>
        </ul>
      </div>

      <div class="col" style="min-width:220px">
        <div style="font-weight:700;margin-bottom:8px">Visit Us</div>
        <div style="display:flex;flex-direction:column;gap:8px;color:#cbd5e1">
          <div style="display:flex;gap:8px;align-items:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke="#fb923c" stroke-width="1.2" fill="none"/><circle cx="12" cy="9" r="2" fill="#fb923c"/></svg> Nainital Road, Haldwani, Uttarakhand</div>
          <div style="display:flex;gap:8px;align-items:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.13 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.73 3.03a2 2 0 0 1-.45 2.11L9.7 10.7a14 14 0 0 0 6 6l1.84-1.84a2 2 0 0 1 2.11-.45c.96.36 1.98.61 3.03.73A2 2 0 0 1 22 16.92z" fill="#fb923c"/></svg> +91 98765 43210</div>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:20px;color:#9aa7b2">© <span id="yr"></span> Haldwani Foods. Made with ♥ in Uttarakhand.</div>
  </footer>

  <script>
    // set year
    document.getElementById('yr').textContent = new Date().getFullYear();

    // small inview reveal
    function handleInView() {
      document.querySelectorAll('.fade-up, .scale-in').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 80) el.classList.add('inview');
      });
    }
    window.addEventListener('scroll', handleInView);
    window.addEventListener('load', () => { handleInView(); });

    // navbar scroll solid
    const nav = document.getElementById('mainNav');
    function checkNav() {
      if (window.scrollY > 40) nav.classList.add('solid'); else nav.classList.remove('solid');
    }
    window.addEventListener('scroll', checkNav);
    checkNav();

    // mobile toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    mobileToggle.addEventListener('click', () => {
      const open = mobileMenu.style.display !== 'none';
      if (open) {
        mobileMenu.style.display = 'none';
        closeIcon.style.display = 'none';
        menuIcon.style.display = 'inline';
        mobileToggle.setAttribute('aria-expanded','false');
      } else {
        mobileMenu.style.display = 'block';
        closeIcon.style.display = 'inline';
        menuIcon.style.display = 'none';
        mobileToggle.setAttribute('aria-expanded','true');
      }
    });

    // Close mobile menu on link click
    Array.from(document.querySelectorAll('#mobileMenu a')).forEach(a=>{
      a.addEventListener('click', ()=> { mobileMenu.style.display='none'; closeIcon.style.display='none'; menuIcon.style.display='inline'; mobileToggle.setAttribute('aria-expanded','false'); });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>

`;

  const projects = [
    {
      id: "web-restaurant",
      title: "Haldwani Foods Sample",
      description:
        "Sample Preview",
      srcDoc: restaurantSrcDoc,
      tags: ["Demo"],
      category: "web",
    },
    {
      id: "web-jobbase",
      title: "Jobbase Live Site",
      description: "Jobbase.in Full-Stack developed and maintained.",
      src: "https://jobbase.in",
      tags: ["WordPress Headless CMS", "Next.js"],
      category: "web",
    },
  ];

  const contentProjects = [
    {
      id: "writing-asthaguru",
      title: "AsthaGuru — Author Page",
      description: "Content written for AsthaGuru.",
      externalLink: "https://asthaguru.com/author/lokesh-singh",
    },
    {
      id: "writing-jobbase",
      title: "JobBase — Author & Content",
      description: "Content & SEO managed for JobBase.",
      externalLink: "https://jobbase.in/author/lokesh-singh",
    },
  ];

  const PREVIEW_HEIGHT = 560;

  return (
    <div className="relative min-h-screen bg-slate-950 selection:bg-cyan-500/30 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackgroundWrapper />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-transparent to-slate-950/90" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 pt-28 pb-24">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Portfolio</h1>
            <p className="text-slate-400 max-w-3xl mx-auto">
              Web previews and content-writing references. For React demos paste a self-contained component into the iframe template.
            </p>
          </header>

          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setActive("web")}
              className={`px-4 py-2 rounded-full font-semibold ${active === "web" ? "bg-cyan-500 text-black" : "bg-white/3 text-slate-200"}`}
            >
              <span className="inline-flex items-center gap-2"><Code2 size={16} /> Web Development</span>
            </button>
            <button
              onClick={() => setActive("writing")}
              className={`px-4 py-2 rounded-full font-semibold ${active === "writing" ? "bg-cyan-500 text-black" : "bg-white/3 text-slate-200"}`}
            >
              <span className="inline-flex items-center gap-2"><PenTool size={16} /> Content Writing</span>
            </button>
          </div>

          <section>
            {active === "web" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    title={p.title}
                    description={p.description}
                    src={p.src}
                    srcDoc={p.srcDoc}
                    tags={p.tags}
                    height={PREVIEW_HEIGHT}
                  />
                ))}
              </div>
            )}

            {active === "writing" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentProjects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    title={p.title}
                    description={p.description}
                    src={p.externalLink}
                    externalLink={p.externalLink}
                    height={PREVIEW_HEIGHT}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
        <footer id="contact" className="bg-slate-950 pt-24 pb-12 border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-white mb-6">ElevenX<span className="text-cyan-400">solutions</span></h2>
                <p className="text-slate-400 mb-8 max-w-md leading-relaxed">Transforming businesses through innovation. We build the technology that powers your growth engine.</p>
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {["Home", "Services", "FAQ", "Contact"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Contact Us</h4>
                <ul className="space-y-4 text-slate-400">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-cyan-500 mt-1" size={18} />
                    <span>Tech City, TC 90210</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="text-cyan-500" size={18} />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="text-cyan-500" size={18} />
                    <span>hello@elevenx.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <p>© {new Date().getFullYear()} ElevenXsolutions. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
