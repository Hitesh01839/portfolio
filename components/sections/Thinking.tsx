"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const thoughts = [
  "SYSTEMS",
  "SECURITY",
  "PHILOSOPHY",
  "SPACE",
  "HUMAN BEHAVIOUR",
];

export default function Thinking() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      gsap.set(".thinking-statement", {
        clearProps: "all",
      });

      gsap.set(".thinking-transition", {
        opacity: 0.5,
        scale: 1.5,
      });

      return;
    }

    const ctx = gsap.context(() => {
      // Label reveal
      gsap.from(".thinking-label", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Main statement reveal
      gsap.from(".thinking-statement", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Thought tags reveal
      gsap.from(".thinking-thought", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });

      // Outer orbit
      gsap.to(".thinking-orbit", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      // Inner orbit
      gsap.to(".thinking-orbit-inner", {
        rotate: -360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      // Transition glow into Contact
      const transition = sectionRef.current?.querySelector<HTMLElement>(
        ".thinking-transition",
      );

      if (transition) {
        gsap.set(transition, {
          opacity: 0,
          scale: 0.5,
        });

        gsap.to(transition, {
          opacity: 0.5,
          scale: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom 100%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center bg-[#0a0a0a] px-6 py-32 text-[#f1f1ed] md:px-10"
    >
      {/* Transition glow */}
      <div
        className="thinking-transition pointer-events-none absolute bottom-0 left-1/2 z-0 h-[45vh] w-[140vw] -translate-x-1/2 translate-y-1/2 rounded-[50%] bg-[#b7ff3c] blur-[140px]"
        aria-hidden="true"
      />

      {/* Atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/5 blur-[140px]" />

      {/* Orbital system */}
      <div className="thinking-orbit pointer-events-none absolute left-1/2 top-1/2 h-155 w-155 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6">
        <div className="absolute left-1/2 -top-0.75 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#b7ff3c]" />
      </div>

      {/* Inner orbit */}
      <div className="thinking-orbit-inner pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/4">
        <div className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#8b5cf6]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-350">
        {/* Section label */}
        <div className="thinking-label mb-20 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            05 / Thinking
          </p>

          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 md:block">
            Curiosity / 01
          </p>
        </div>

        {/* Main statement */}
        <div className="thinking-statement">
          <p className="mb-8 max-w-2xl font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Things that keep me interested
          </p>

          {/* Text animation mask */}
          <div className="overflow-hidden">
            <h2 className="max-w-6xl text-5xl font-medium uppercase leading-[0.92] tracking-[-0.055em] md:text-7xl lg:text-[8.5rem]">
              I&apos;M INTERESTED
              <br />
              IN THE THINGS
              <br />
              <span className="text-white/35">BENEATH</span>
              <br />
              THE SURFACE.
            </h2>
          </div>
        </div>

        {/* Thought tags */}
        <div className="mt-20 flex flex-wrap gap-3 md:mt-28 md:gap-4">
          {thoughts.map((thought, index) => (
            <div
              key={thought}
              className="thinking-thought flex items-center gap-3 border border-white/10 px-4 py-3"
            >
              <span className="font-mono text-[9px] text-white/25">
                0{index + 1}
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                {thought}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-20 flex justify-end md:mt-24">
          <p className="max-w-xl text-lg leading-relaxed text-white/40 md:text-xl">
            Understanding a system is only the beginning. The interesting
            questions usually start after you know how it works.
          </p>
        </div>
      </div>
    </section>
  );
}
