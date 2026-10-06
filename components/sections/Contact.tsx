"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".contact-label", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".contact-title-line", {
        yPercent: 140,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".contact-details", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.to(".contact-orbit", {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#b7ff3c] px-6 py-10 text-[#0a0a0a] md:px-10 md:py-12"
    >
      {/* Decorative orbital ring */}
      <div className="contact-orbit pointer-events-none absolute -right-32 top-1/2 h-150 w-150 -translate-y-1/2 rounded-full border border-black/10 md:h-200 md:w-200">
        <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-black" />
      </div>

      {/* Header */}
      <div className="contact-label relative z-10 flex items-start justify-between border-b border-black/20 pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
          06 / Contact
        </p>

        <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] md:block">
          Open to interesting problems
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col pt-20 md:justify-between md:pt-28">
        <div className="overflow-hidden">
          <div className="contact-title-line">
            <h2 className="text-[12vw] font-medium uppercase leading-[0.82] tracking-[-0.07em] md:text-[11vw] lg:text-[10vw]">
              LET&apos;S
            </h2>
          </div>

          <div className="contact-title-line">
            <h2 className="text-[12vw] md:text-[11vw] lg:text-[10vw] font-medium uppercase leading-[0.78] tracking-[-0.075em]">
              BUILD
            </h2>
          </div>

          <div className="contact-title-line">
            <h2 className="text-[12vw] md:text-[11vw] lg:text-[10vw] font-medium uppercase leading-[0.78] tracking-[-0.075em]">
              SOMETHING.
            </h2>
          </div>
        </div>

        {/* Bottom */}
        <div className="contact-details mt-10 flex flex-col gap-12 border-t border-black/20 pt-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] opacity-50">
              Get in touch
            </p>

            <Magnetic strength={0.18}>
              <a
                href="mailto:gangahitesh04@gmail.com"
                className="group flex items-center gap-3 text-xl font-medium tracking-tight md:text-2xl"
              >
                gangahitesh04@gmail.com
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-[0.2em]">
            <Magnetic strength={0.4}>
              <a
                href="https://github.com/Hitesh01839"
                className="transition-opacity hover:opacity-50"
              >
                GitHub
              </a>
            </Magnetic>

            <Magnetic strength={0.4}>
              <a
                href="https://www.linkedin.com/in/ganga-hitesh-5062a4281/"
                className="transition-opacity hover:opacity-50"
              >
                LinkedIn
              </a>
            </Magnetic>

            <Magnetic strength={0.4}>
              <a
                href="https://www.instagram.com/hitesh__ganga/"
                className="transition-opacity hover:opacity-50"
              >
                Instagram
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-black/15 pt-5 md:mt-24">
        <div className="flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-black/45 md:flex-row md:items-center md:justify-between md:gap-5">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-black/70" />
            <span>Available for opportunities</span>
          </div>

          <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-8">
            <span>Cybersecurity / Software / Systems</span>
            <span>Hyderabad, India</span>
            <span>© 2026 Hitesh Ganga</span>
          </div>
        </div>
      </div>
    </section>
  );
}
