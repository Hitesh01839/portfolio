"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      window.dispatchEvent(new Event("preloader-complete"));
      loader.remove();
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(".preloader-core", {
        scale: 0,
        opacity: 0,
      });

      gsap.set(".preloader-ring", {
        scale: 0.4,
        opacity: 0,
        rotation: -20,
      });

      gsap.set(".preloader-particle", {
        scale: 0,
        opacity: 0,
      });

      gsap.set(".preloader-mark", {
        scale: 0.8,
        opacity: 0,
      });

      gsap.set(".preloader-caption", {
        opacity: 0,
        y: 8,
      });

      const tl = gsap.timeline();

      /*
       * SINGULARITY
       */

      tl.to(".preloader-core", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
      });

      /*
       * GRAVITATIONAL RINGS
       */

      tl.to(
        ".preloader-ring",
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
        },
        "-=0.55",
      );

      /*
       * PARTICLES
       */

      tl.to(
        ".preloader-particle",
        {
          scale: 1,
          opacity: 0.65,
          duration: 0.45,
          stagger: 0.035,
          ease: "power2.out",
        },
        "-=0.8",
      );

      /*
       * SMALL MARK
       */

      tl.to(
        ".preloader-mark",
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.55",
      );

      /*
       * CAPTION
       */

      tl.to(
        ".preloader-caption",
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.25",
      );

      /*
       * HOLD
       */

      tl.to(
        {},
        {
          duration: 0.35,
        },
      );

      /*
       * COLLAPSE
       */

      tl.to(".preloader-caption", {
        opacity: 0,
        y: -8,
        duration: 0.2,
      });

      tl.to(
        ".preloader-particle",
        {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          stagger: 0.015,
          ease: "power2.in",
        },
        "<",
      );

      tl.to(
        ".preloader-ring",
        {
          scale: 1.35,
          opacity: 0,
          rotation: 30,
          duration: 0.65,
          stagger: 0.04,
          ease: "expo.in",
        },
        "-=0.1",
      );

      tl.to(
        ".preloader-core",
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.45,
          ease: "expo.in",
        },
        "-=0.45",
      );

      /*
       * HERO HANDOFF
       */

      tl.call(() => {
        window.dispatchEvent(new Event("preloader-complete"));
      });

      tl.to(loader, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      });

      tl.set(loader, {
        display: "none",
      });

      return () => {
        tl.kill();
      };
    }, loaderRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] overflow-hidden bg-[#050505] text-[#f1f1ed]"
    >
      {/* Central system */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square w-[70vw] max-w-[620px]">
          {/* Outer gravitational ring */}
          <div
            className="
              preloader-ring
              absolute inset-[8%]
              rounded-[50%]
              border
              border-white/[0.14]
            "
          />

          {/* Distorted middle ring */}
          <div
            className="
              preloader-ring
              absolute inset-[18%]
              rounded-[50%]
              border
              border-white/[0.09]
            "
          />

          {/* Inner ring */}
          <div
            className="
              preloader-ring
              absolute inset-[29%]
              rounded-[50%]
              border
              border-[#b9b2c9]/20
            "
          />

          {/* Event horizon */}
          <div
            className="
              preloader-core
              absolute left-1/2 top-1/2
              aspect-square
              w-[23%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#000000]
              shadow-[0_0_55px_18px_rgba(255,255,255,0.035)]
            "
          />

          {/* White orbital point */}
          <div className="preloader-particle absolute left-[16%] top-[24%] h-1.5 w-1.5 rounded-full bg-white/70" />

          <div className="preloader-particle absolute right-[19%] top-[31%] h-1 w-1 rounded-full bg-white/50" />

          <div className="preloader-particle absolute right-[26%] bottom-[21%] h-1.5 w-1.5 rounded-full bg-[#b9b2c9]/70" />

          <div className="preloader-particle absolute left-[25%] bottom-[18%] h-1 w-1 rounded-full bg-white/40" />

          <div className="preloader-particle absolute left-[10%] top-[51%] h-1 w-1 rounded-full bg-white/35" />

          <div className="preloader-particle absolute right-[10%] top-[52%] h-1 w-1 rounded-full bg-white/35" />

          {/* Tiny center mark */}
          <div
            className="
              preloader-mark
              absolute left-1/2 top-1/2
              -translate-x-1/2
              -translate-y-1/2
              font-mono
              text-[8px]
              uppercase
              tracking-[0.45em]
              text-white/30
            "
          >
            01
          </div>
        </div>
      </div>

      {/* Minimal caption */}
      <div
        className="
          preloader-caption
          absolute bottom-8
          left-1/2
          -translate-x-1/2
          font-mono
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-white/30
        "
      >
        Entering system
      </div>
    </div>
  );
}
