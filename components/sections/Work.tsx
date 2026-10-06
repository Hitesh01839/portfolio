"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function ProjectVisual({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  if (index === 0) {
    return (
      <div className="absolute inset-0 p-8 md:p-12">
        <div className="absolute inset-8 border border-white/10 md:inset-12" />

        <div className="relative h-full overflow-hidden border border-white/10 bg-[#0c0c0c]">
          {/* App header */}
          <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#b7ff3c]" />
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/50">
                ORGANISEME
              </span>
            </div>

            <div className="font-mono text-[7px] text-white/25">
              SECURE SESSION
            </div>
          </div>

          <div className="flex h-[calc(100%-3rem)]">
            {/* Sidebar */}
            <div className="hidden w-28 border-r border-white/10 p-4 md:block">
              {["Dashboard", "Tasks", "Projects", "Settings"].map((item, i) => (
                <div
                  key={item}
                  className={`mb-4 font-mono text-[7px] uppercase tracking-widest ${
                    i === 0 ? "text-[#b7ff3c]" : "text-white/25"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Dashboard */}
            <div className="flex-1 p-5">
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
                Good morning, Hitesh
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  ["12", "ACTIVE"],
                  ["04", "COMPLETED"],
                ].map(([number, label]) => (
                  <div key={label} className="border border-white/10 p-3">
                    <div className="text-xl text-white/80">{number}</div>
                    <div className="mt-1 font-mono text-[6px] tracking-[0.15em] text-white/25">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 border border-white/10 p-3">
                <div className="mb-4 flex justify-between">
                  <span className="font-mono text-[7px] text-white/40">
                    TODAY
                  </span>
                  <span className="font-mono text-[7px] text-[#b7ff3c]">
                    72%
                  </span>
                </div>

                {[82, 64, 91, 45].map((width, i) => (
                  <div key={i} className="mb-3 h-1 bg-white/5">
                    <div
                      className="h-full bg-[#b7ff3c]/60"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 font-mono text-[7px] uppercase tracking-[0.2em] text-white/25">
          AUTH / JWT / MONGODB
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden p-8 md:p-12">
        <div className="relative h-full border border-white/10 bg-[#090909] p-6">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-[8px] text-[#8b5cf6]">
              KERNELX // AOSP
            </span>

            <span className="font-mono text-[7px] text-white/20">
              build@android
            </span>
          </div>

          <div className="font-mono text-[8px] leading-loose">
            <div className="text-white/25">~/android/kernel</div>

            <div>
              <span className="text-[#8b5cf6]">$</span>{" "}
              <span className="text-white/65">repo sync --current-branch</span>
            </div>

            <div className="mt-2 text-white/25">
              syncing platform/frameworks/base...
            </div>

            <div className="text-white/25">syncing system/core...</div>

            <div className="text-white/25">syncing hardware/interfaces...</div>

            <div className="mt-3">
              <span className="text-[#8b5cf6]">✓</span>{" "}
              <span className="text-white/45">
                100% system tree synchronized
              </span>
            </div>
          </div>

          {/* Architecture nodes */}
          <div className="absolute bottom-10 left-8 right-8 grid grid-cols-3 gap-2">
            {["APP", "FRAMEWORK", "HAL", "KERNEL", "DRIVERS", "HARDWARE"].map(
              (item, i) => (
                <div
                  key={item}
                  className="border border-[#8b5cf6]/20 p-3 text-center"
                >
                  <div className="font-mono text-[6px] text-[#8b5cf6]/80">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 font-mono text-[7px] text-white/35">
                    {item}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden p-8 md:p-12">
      <div className="relative h-full border border-white/10 bg-[#090909]">
        {/* Request */}
        <div className="border-b border-white/10 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[8px] text-[#22d3ee]">
              HTTP REQUEST
            </span>

            <span className="font-mono text-[7px] text-white/20">
              127.0.0.1
            </span>
          </div>

          <div className="font-mono text-[8px] leading-[1.8]">
            <span className="text-[#22d3ee]">POST</span>{" "}
            <span className="text-white/50">/api/auth/login</span>
          </div>

          <div className="mt-2 text-[7px] text-white/20">
            Content-Type: application/json
          </div>
        </div>

        {/* Analysis */}
        <div className="p-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
            Security analysis
          </div>

          <div className="mt-5 space-y-3">
            {[
              ["XSS", "LOW"],
              ["SQLi", "NONE"],
              ["AUTH", "PASS"],
              ["CSRF", "MEDIUM"],
            ].map(([name, status]) => (
              <div
                key={name}
                className="flex items-center justify-between border-b border-white/5 pb-2"
              >
                <span className="font-mono text-[8px] text-white/45">
                  {name}
                </span>

                <span
                  className={`font-mono text-[7px] ${
                    status === "PASS"
                      ? "text-[#22d3ee]"
                      : status === "NONE"
                        ? "text-white/25"
                        : "text-white/40"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex justify-between border-t border-white/10 pt-4">
          <span className="font-mono text-[7px] text-white/20">
            OWASP / PAYLOAD / ANALYSIS
          </span>

          <span className="font-mono text-[7px] text-[#22d3ee]">
            SCAN COMPLETE
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      gsap.set(".project-card", {
        clearProps: "all",
      });

      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      if (!cards.length) return;

      // Initial card states
      gsap.set(cards, {
        yPercent: 100,
        opacity: 0,
        scale: 0.94,
      });

      gsap.set(cards[0], {
        yPercent: 0,
        opacity: 1,
        scale: 1,
      });

      // Main project scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const previousCard = cards[index - 1];

        const previousVisual =
          previousCard.querySelector<HTMLElement>(".project-visual");

        const currentVisual =
          card.querySelector<HTMLElement>(".project-visual");

        // Previous project exits
        tl.to(
          previousCard,
          {
            yPercent: -35,
            scale: 0.9,
            opacity: 0.25,
            duration: 1,
            ease: "power2.inOut",
          },
          "+=0.1",
        );

        if (previousVisual) {
          tl.to(
            previousVisual,
            {
              scale: 0.94,
              xPercent: -2,
              duration: 1,
              ease: "power2.inOut",
            },
            "<",
          );
        }

        // New project enters
        tl.to(
          card,
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "<",
        );

        if (currentVisual) {
          tl.fromTo(
            currentVisual,
            {
              scale: 1.08,
              xPercent: 2,
            },
            {
              scale: 1,
              xPercent: 0,
              duration: 1,
              ease: "power3.out",
            },
            "<",
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-screen w-full max-w-full overflow-hidden bg-[#0a0a0a] px-6 text-[#f1f1ed] md:px-10"
    >
      <div className="mx-auto flex h-full max-w-350 flex-col py-8 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#b7ff3c]">
            <span>02</span>
            <span className="h-px w-12 bg-[#b7ff3c]/50" />
            <span>Selected Work</span>
          </div>

          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            Scroll / Explore
          </div>
        </div>

        {/* Project stage */}
        <div
          ref={cardsRef}
          className="relative flex min-h-0 flex-1 items-center justify-center"
        >
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-card absolute inset-x-0 mx-auto h-[68vh] max-w-310"
            >
              <div
                className="relative grid h-full overflow-hidden border border-white/10 bg-[#101010] md:grid-cols-[1.35fr_0.65fr]"
                style={{
                  boxShadow: `0 0 120px ${project.accent}08`,
                }}
              >
                {/* Visual */}
                <div className="project-visual relative min-h-70 overflow-hidden border-b border-white/10 md:border-b-0 md:border-r">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
        radial-gradient(
          circle at 50% 50%,
          ${project.accent}12,
          transparent 45%
        ),
        #090909
      `,
                    }}
                  />

                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `
                    linear-gradient(to right, #fff 1px, transparent 1px),
                    linear-gradient(to bottom, #fff 1px, transparent 1px)
      `,
                      backgroundSize: "70px 70px",
                    }}
                  />

                  <ProjectVisual project={project} index={index} />

                  <div className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {project.type}
                  </div>

                  <div className="absolute right-6 top-6 font-mono text-[9px] text-white/30">
                    {project.number} / 03
                  </div>
                </div>
                {/* Information */}
                <div className="flex flex-col justify-between p-7 md:p-10">
                  <div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: project.accent }}
                    >
                      {project.number} — {project.subtitle}
                    </div>

                    <h3 className="mt-6 text-[13vw] font-medium leading-[0.8] tracking-[-0.07em] md:text-[5.5vw]">
                      {project.title}
                    </h3>

                    <p className="mt-10 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="border border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
                      >
                        Explore project
                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
          <span>Selected experiments / 2024—2026</span>
          <span>03 projects</span>
        </div>
      </div>
    </section>
  );
}
