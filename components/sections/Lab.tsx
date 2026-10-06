"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "PENTESTING",
  "LINUX",
  "PYTHON",
  "AOSP",
  "WEB SECURITY",
  "NETWORKING",
  "SYSTEMS",
  "REVERSE ENGINEERING",
];

export default function Lab() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;

      if (!track) return;

      gsap.to(track, {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".lab-content", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".lab-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] px-6 py-24 text-[#f1f1ed] md:px-10 md:py-32"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7ff3c]/5 blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="lab-content mb-20 flex items-end justify-between">
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              04 / Lab
            </p>

            <h2 className="max-w-4xl text-5xl font-medium uppercase leading-[0.9] tracking-tighter md:text-8xl lg:text-[9rem]">
              I BREAK
              <br />
              THINGS TO
              <br />
              <span className="text-[#b7ff3c]">UNDERSTAND.</span>
            </h2>
          </div>

          <p className="hidden max-w-xs pb-2 text-right text-sm leading-relaxed text-white/40 md:block">
            Curiosity becomes useful when you start pulling systems apart.
          </p>
        </div>

        {/* Divider */}
        <div className="lab-line mb-10 h-px w-full bg-white/15" />

        {/* Kinetic skills */}
        <div className="relative overflow-hidden py-8">
          <div
            ref={trackRef}
            className="flex w-max gap-8 whitespace-nowrap md:gap-12"
          >
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill}-${index}`}
                className="flex items-center gap-8 md:gap-12"
              >
                <span className="font-mono text-[10px] text-white/25">
                  {String((index % skills.length) + 1).padStart(2, "0")}
                </span>

                <span className="text-4xl font-medium uppercase tracking-[-0.04em] text-white/85 md:text-7xl">
                  {skill}
                </span>

                <span className="text-2xl text-[#b7ff3c]">✳</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-start md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Current playground
          </p>

          <p className="max-w-2xl text-xl leading-relaxed text-white/60 md:text-2xl">
            Linux. Android. Networks. Web applications. The goal is never simply
            to use a system — it is to understand what happens beneath the
            surface.
          </p>
        </div>
      </div>
    </section>
  );
}
