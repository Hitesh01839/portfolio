"use client";

import Magnetic from "@/components/ui/Magnetic";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { prefersReducedMotion } from "@/lib/motion";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      gsap.set(".hero-nav, .hero-label, .hero-name, .hero-orbit, .hero-meta", {
        clearProps: "all",
      });

      return;
    }

    const ctx = gsap.context(() => {
      // --------------------------------
      // Initial state
      // --------------------------------

      gsap.set(".hero-nav", {
        y: -20,
        opacity: 0,
      });

      gsap.set(".hero-label", {
        y: 20,
        opacity: 0,
      });

      gsap.set(".hero-name", {
        y: 100,
        opacity: 0,
      });

      gsap.set(".hero-orbit", {
        scale: 0.65,
        opacity: 0,
        rotate: -30,
      });

      gsap.set(".hero-meta", {
        y: 20,
        opacity: 0,
      });

      // --------------------------------
      // Hero reveal
      // --------------------------------

      const playHeroReveal = () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        tl.to(".hero-nav", {
          y: 0,
          opacity: 1,
          duration: 0.7,
        })
          .to(
            ".hero-label",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.4",
          )
          .to(
            ".hero-name",
            {
              y: 0,
              opacity: 1,
              duration: 1.15,
              stagger: 0.08,
              ease: "expo.out",
            },
            "-=0.35",
          )
          .to(
            ".hero-orbit",
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 1.4,
              ease: "power3.out",
            },
            "-=0.95",
          )
          .to(
            ".hero-meta",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.8",
          );
      };

      // --------------------------------
      // Preloader handoff
      // --------------------------------

      window.addEventListener("preloader-complete", playHeroReveal);

      // --------------------------------
      // Safety fallback
      // --------------------------------

      const fallback = window.setTimeout(() => {
        playHeroReveal();
      }, 2500);

      // --------------------------------
      // Cleanup
      // --------------------------------

      return () => {
        window.removeEventListener("preloader-complete", playHeroReveal);

        window.clearTimeout(fallback);
      };
    }, heroRef);

    // --------------------------------
    // Mouse parallax
    // --------------------------------

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(".hero-orbit", {
        x: x * 22,
        y: y * 18,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(".hero-name", {
        x: x * 3,
        y: y * 2,
        duration: 1.4,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(".hero-label", {
        x: x * 5,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const finePointer = window.matchMedia("(pointer: fine)");

    if (finePointer.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // --------------------------------
    // Cleanup
    // --------------------------------

    return () => {
      if (finePointer.matches) {
        window.removeEventListener("mousemove", handleMouseMove);
      }

      gsap.killTweensOf([
        ".hero-orbit",
        ".hero-name",
        ".hero-label",
        ".hero-nav",
        ".hero-meta",
      ]);

      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#0d0d0d] text-[#f1f1ed]"
    >
      <div
        className="pointer-events-none absolute left-[58%] top-[42%] z-0 h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(183,255,60,0.055) 0%, rgba(183,255,60,0.018) 28%, transparent 68%)",
        }}
      />
      {/* --------------------------------
          Navigation
      -------------------------------- */}

      <nav className="hero-nav absolute left-0 top-0 z-30 flex w-full items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <div className="font-mono text-xs tracking-[0.25em] text-white/60">
          GH / 01
        </div>

        <div className="flex gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 md:gap-7">
          <Magnetic strength={0.4}>
            <a href="#about">About</a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a href="#work">Work</a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a href="#lab">Lab</a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a href="#contact">Contact</a>
          </Magnetic>
        </div>
      </nav>

      {/* --------------------------------
          Main composition
      -------------------------------- */}

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-7 pt-32 md:px-10 md:pb-9 md:pt-36">
        {/* Discipline label */}

        <div className="hero-label max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-[#b7ff3c]">
          Cybersecurity
          <span className="mx-2 text-white/20">/</span>
          Software
          <span className="mx-2 text-white/20">/</span>
          Systems
        </div>

        {/* --------------------------------
            Name + orbit
        -------------------------------- */}

        <div className="relative mt-auto">
          <div className="hero-orbit pointer-events-none absolute right-[-8vw] top-[-42%] z-0 hidden aspect-square w-[48vw] max-w-170 min-w-[320px] md:block">
            {/* Main orbit */}
            <div className="absolute inset-0 rounded-full border border-white/40">
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7ff3c] shadow-[0_0_24px_#b7ff3c]" />
            </div>

            {/* Secondary orbit */}
            <div className="absolute inset-[13%] rounded-full border border-white/22">
              <div className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#8b5cf6] shadow-[0_0_20px_#8b5cf6]" />
            </div>

            {/* Inner orbit */}
            <div className="absolute inset-[29%] rounded-full border border-white/14">
              <div className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
            </div>
          </div>
          {/* Name */}

          <div className="relative z-10 overflow-hidden">
            <h1 className="hero-name whitespace-nowrap text-[20vw] font-semibold leading-[0.68] tracking-[-0.085em] md:text-[16vw]">
              HITESH
            </h1>
          </div>

          <div className="mt-4 flex items-end justify-between md:mt-5">
            <div className="relative z-10 overflow-hidden">
              <div className="hero-name whitespace-nowrap text-[8vw] font-light leading-none tracking-[-0.065em] text-white/40 md:text-[5.5vw]">
                GANGA
              </div>
            </div>

            <div className="hero-meta hidden max-w-70 text-right font-mono text-[10px] uppercase leading-[1.7] tracking-[0.15em] text-white/40 md:block">
              Security, software &amp;
              <br />
              systems — built from the
              <br />
              inside out.
            </div>
          </div>
        </div>

        {/* --------------------------------
            Bottom metadata
        -------------------------------- */}

        <div className="hero-meta mt-auto flex items-end justify-between border-t border-white/10 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
          <span>Hyderabad, India</span>

          <span>Scroll to explore ↓</span>

          <span>21° / 78°</span>
        </div>
      </div>
    </section>
  );
}
