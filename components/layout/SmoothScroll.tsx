"use client";

import { useEffect, type PropsWithChildren } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link) return;

      const hash = link.getAttribute("href");

      if (!hash || hash === "#") return;

      const element = document.querySelector<HTMLElement>(hash);

      if (!element) return;

      event.preventDefault();

      lenis.scrollTo(element);
    };

    lenis.on("scroll", handleScroll);
    document.addEventListener("click", handleAnchorClick);

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);

      lenis.off("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);

      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
