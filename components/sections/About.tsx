"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    label: "CYBERSECURITY",
    skills: ["PENTESTING", "WEB SECURITY", "OWASP", "NETWORKING"],
  },
  {
    label: "SYSTEMS",
    skills: ["LINUX", "AOSP", "ANDROID", "C++", "BASH"],
  },
  {
    label: "SOFTWARE",
    skills: [
      "PYTHON",
      "TYPESCRIPT",
      "JAVASCRIPT",
      "NEXT.JS",
      "REACT",
      "NODE.JS",
    ],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.from(".about-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative about overflow-hidden bg-[#0a0a0a] px-6 py-32 text-[#f1f1ed] md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-350">
        {/* Header */}
        <div className="about-reveal flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#b7ff3c]">
          <span>01</span>
          <span className="h-px w-12 bg-[#b7ff3c]/50" />
          <span>About</span>
        </div>

        {/* Main */}
        <div className="mt-20 grid gap-16 md:grid-cols-[1fr_1.6fr] md:gap-24">
          <div className="about-reveal">
            <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-white/40">
              A cybersecurity-focused developer interested in understanding how
              software, systems and people break — and how to build them better.
            </p>
          </div>

          <div>
            <h2 className="about-reveal max-w-5xl text-[9vw] font-medium leading-[0.9] tracking-[-0.06em] md:text-[6.5vw]">
              I like finding
              <br />
              <span className="text-white/35">the edge cases.</span>
            </h2>

            <div className="about-reveal mt-12 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
              <p>
                My work sits somewhere between cybersecurity, software
                engineering and systems. I enjoy taking things apart,
                understanding how they work underneath, and then building
                something of my own.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="about-line mt-28 h-px w-full bg-white/10" />

        {/* Skills */}
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_3fr]">
          <div className="about-reveal font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Current toolkit
          </div>

          <div className="space-y-8">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="about-reveal grid gap-4 md:grid-cols-[140px_1fr]"
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#b7ff3c]/60">
                  {group.label}
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:border-[#b7ff3c]/50 hover:text-[#b7ff3c]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statement */}
        <div className="about-reveal mt-40 border-l border-[#b7ff3c]/40 pl-6 md:ml-[25%] md:pl-10">
          <p className="max-w-4xl text-3xl font-light leading-tight tracking-[-0.03em] text-white/75 md:text-5xl">
            &quot;The interesting part isn&apos;t knowing that something works.
            <span className="text-white/30"> It&apos;s understanding why.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
