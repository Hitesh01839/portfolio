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
      // Initial Hero state
      // --------------------------------

      gsap.set(".hero-nav", {
        y: -20,
        opacity: 0,
      });

      gsap.set(".hero-label", {
        y: 25,
        opacity: 0,
      });

      gsap.set(".hero-name", {
        y: 100,
        opacity: 0,
      });

      gsap.set(".hero-orbit", {
        scale: 0.5,
        opacity: 0,
        rotate: -25,
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
              duration: 1.1,
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
            "-=0.9",
          )
          .to(
            ".hero-meta",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.75",
          );
      };

      // --------------------------------
      // Wait for Preloader
      // --------------------------------

      window.addEventListener("preloader-complete", playHeroReveal);

      // --------------------------------
      // Safety fallback
      // --------------------------------
      // If the event somehow doesn't fire,
      // don't leave the Hero invisible.

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
        x: x * 18,
        y: y * 18,
        duration: 1.2,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(".hero-name", {
        x: x * 4,
        y: y * 2,
        duration: 1.4,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(".hero-label", {
        x: x * 6,
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
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-[#f1f1ed]"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-1 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-[55%] top-[30%] z-1 h-125 w-125 -translate-x-1/2 rounded-full bg-[#b7ff3c]/10 blur-[140px]" />

      {/* Navigation */}
      <nav className="hero-nav absolute left-0 top-0 z-20 flex w-full items-center justify-between px-6 py-6 md:px-10">
        <div className="font-mono text-xs tracking-[0.25em] text-white/60">
          GH / 01
        </div>

        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          <Magnetic strength={0.4}>
            <a href="#about">ABOUT</a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a href="#work">WORK</a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a href="#lab">LAB</a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a href="#contact">CONTACT</a>
          </Magnetic>
        </div>
      </nav>

      {/* Main composition */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-8 pt-32 md:px-10 md:pb-10">
        {/* Label */}
        <div className="hero-label font-mono text-[10px] uppercase tracking-[0.3em] text-[#b7ff3c]">
          Cybersecurity / Software / Experiments
        </div>

        <div className="relative">
          {/* Orbit */}
          <div className="hero-orbit pointer-events-none absolute right-[8%] top-[-35%] hidden aspect-square w-[30vw] max-w-107.5 min-w-65 md:block">
            <div className="absolute inset-0 rounded-full border border-white/15" />

            <div className="absolute inset-[12%] rounded-full border border-white/10" />

            <div className="absolute left-1/2 -top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-[#b7ff3c] shadow-[0_0_30px_#b7ff3c]" />

            <div className="absolute bottom-[18%] left-[10%] h-2 w-2 rounded-full bg-[#8b5cf6] shadow-[0_0_25px_#8b5cf6]" />
          </div>

          {/* HITESH */}
          <div className="overflow-hidden">
            <h1 className="hero-name text-[18vw] font-semibold leading-[0.72] tracking-[-0.075em] md:text-[15vw]">
              HITESH
            </h1>
          </div>

          {/* GANGA + description */}
          <div className="mt-5 flex items-end justify-between">
            <div className="overflow-hidden">
              <div className="hero-name text-[7vw] font-light leading-none tracking-[-0.06em] text-white/45 md:text-[5vw]">
                GANGA
              </div>
            </div>

            <div className="hero-meta hidden max-w-[260px] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-white/40 md:block">
              Building at the intersection of
              <br />
              security, systems &amp; the web.
            </div>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="hero-meta flex items-end justify-between border-t border-white/10 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
          <span>Hyderabad, India</span>

          <span>Scroll to explore ↓</span>

          <span>21° / 78°</span>
        </div>
      </div>
    </section>
  );
}
