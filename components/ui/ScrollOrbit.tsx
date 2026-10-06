"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "lab", label: "LAB" },
  { id: "thinking", label: "THINKING" },
  { id: "contact", label: "CONTACT" },
];

export default function ScrollOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const violetDotRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const orbit = orbitRef.current;
    const dot = dotRef.current;
    const violetDot = violetDotRef.current;
    const number = numberRef.current;
    const label = labelRef.current;
    const percent = percentRef.current;

    if (
      !container ||
      !orbit ||
      !dot ||
      !violetDot ||
      !number ||
      !label ||
      !percent
    ) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = 0;
    let isAnimating = false;

    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        isAnimating = false;
        rafId = 0;
        return;
      }

      targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      currentProgress += (targetProgress - currentProgress) * 0.08;

      const angle = currentProgress * Math.PI * 2 - Math.PI / 2;

      const radius = 27;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      gsap.set(dot, { x, y });

      const violetAngle = angle + Math.PI;

      gsap.set(violetDot, {
        x: Math.cos(violetAngle) * radius,
        y: Math.sin(violetAngle) * radius,
      });

      percent.textContent = `${Math.round(currentProgress * 100)
        .toString()
        .padStart(3, "0")}%`;

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        rafId = requestAnimationFrame(update);
      } else {
        currentProgress = targetProgress;
        isAnimating = false;
        rafId = 0;
      }
    };

    const startAnimation = () => {
      if (isAnimating) return;

      isAnimating = true;
      rafId = requestAnimationFrame(update);
    };

    // --------------------------------
    // Determine current section
    // --------------------------------

    const updateSection = () => {
      const viewportCenter = window.innerHeight * 0.45;

      let activeIndex = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportCenter) {
          activeIndex = index;
        }
      });

      number.textContent = `${String(activeIndex + 1).padStart(
        2,
        "0",
      )} / ${String(sections.length).padStart(2, "0")}`;

      label.textContent = sections[activeIndex].label;
    };

    const updateVisibility = () => {
      const contact = document.getElementById("contact");

      if (!contact) return;

      const rect = contact.getBoundingClientRect();

      const isContactVisible =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;

      gsap.to(container, {
        opacity: isContactVisible ? 0 : 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    };

    // --------------------------------
    // Subtle orbit rotation
    // --------------------------------

    const handleScroll = () => {
      const velocity = Math.min(
        Math.abs(window.scrollY - targetProgress * 1000),
        20,
      );

      gsap.to(orbit, {
        rotation: velocity * 0.15,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });

      updateSection();
      updateVisibility();

      startAnimation();
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateSection);

    updateSection();
    updateVisibility();

    return () => {
      cancelAnimationFrame(rafId);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSection);

      gsap.killTweensOf(orbit);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed bottom-10 right-6 z-40 hidden md:block w-28 select-none rounded-full border border-white/10 bg-[#080808]/80 px-3 py-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
      aria-hidden="true"
    >
      {/* Orbit */}
      <div ref={orbitRef} className="relative mx-auto h-14 w-14">
        <div className="absolute inset-0 rounded-full border border-white/25" />

        <div className="absolute inset-1.75 rounded-full border border-white/10" />

        <div
          ref={dotRef}
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7ff3c] shadow-[0_0_20px_#b7ff3c]"
        />

        <div
          ref={violetDotRef}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6] shadow-[0_0_10px_#8b5cf6] opacity-90"
        />
      </div>

      {/* Information */}
      <div className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.18em]">
        <div className="flex items-center justify-center gap-2 text-white/50">
          <span ref={numberRef}>01 / 05</span>
          <span className="h-px w-3 bg-white/20" />
          <span ref={percentRef} className="text-[#b7ff3c]">
            000%
          </span>
        </div>

        <span
          ref={labelRef}
          className="mt-1 text-[9px] tracking-[0.25em] text-white/70"
        >
          ABOUT
        </span>
      </div>
    </div>
  );
}
