"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !containerRef.current) return;

      // Video playback: starts playing ONLY when the user reaches the half card
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "center 75%", // Plays when the center (half) of the card enters view
        end: "bottom 10%",
        onEnter: () => {
          videoRef.current?.play().catch(() => {});
        },
        onEnterBack: () => {
          videoRef.current?.play().catch(() => {});
        },
        onLeave: () => {
          videoRef.current?.pause();
        },
        onLeaveBack: () => {
          videoRef.current?.pause(); // Pauses when scrolled back above the half card
        },
      });

      const mm = gsap.matchMedia();

      // Desktop version (>= 768px): Completely untouched original animation
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          cardRef.current,
          {
            width: "80%",
            borderRadius: "44px",
          },
          {
            width: "100%",
            borderRadius: "0px",
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "center 75%",
              end: "center center",
              scrub: 0.4,
            },
          }
        );
      });

      // Mobile version (< 768px): Zero-reflow layout for 60-120fps buttery-smooth touch scrolling
      mm.add("(max-width: 767px)", () => {
        gsap.set(cardRef.current, {
          width: "92%",
          borderRadius: "20px",
        });
      });
    },
    { scope: containerRef }
  );

  // Cloudinary video CDN & auto-generated poster optimization
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const customVideoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;
  const customPosterUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_POSTER;

  const videoUrl =
    customVideoUrl ||
    (cloudName
      ? `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/Video.mp4`
      : null);

  const posterUrl =
    customPosterUrl ||
    (cloudName
      ? `https://res.cloudinary.com/${cloudName}/video/upload/so_0,f_auto,q_auto/Video.webp`
      : undefined);

  return (
    <section
      ref={containerRef}
      className="w-full py-8 sm:py-12 md:py-24 flex justify-center bg-white overflow-hidden"
    >
      {/* Expanding Container: On desktop untouched (80% -> 100%, min-h-[640px], 44px radius). On mobile properly fitted (natural 16:9, no min-h zoom crop, 20px radius) */}
      <div
        ref={cardRef}
        className="relative overflow-hidden bg-zinc-950 aspect-[16/9] w-[92%] md:w-[80%] rounded-[20px] md:rounded-[44px] md:min-h-[640px] shadow-2xl transition-shadow md:will-change-[width,border-radius]"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterUrl}
          className="w-full h-full object-cover object-center pointer-events-none select-none block"
        >
          {videoUrl ? (
            <source src={videoUrl} type="video/mp4" />
          ) : (
            <>
              <source src="/video2.webm" type="video/webm" />
              <source src="/Video.mp4" type="video/mp4" />
            </>
          )}
        </video>
      </div>
    </section>
  );
}
