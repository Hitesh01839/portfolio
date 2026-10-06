"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;
    const scan = scanRef.current;
    const status = statusRef.current;

    if (!loader || !counter || !progress || !scan || !status) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      loader.remove();
      return;
    }

    document.body.style.overflow = "hidden";

    const counterValue = { value: 0 };

    const statuses = [
      "INITIALIZING SYSTEM",
      "LOADING ENVIRONMENT",
      "CHECKING MODULES",
      "MOUNTING INTERFACE",
      "ESTABLISHING CONNECTION",
      "READY",
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    // Initial state
    gsap.set(loader, {
      yPercent: 0,
    });

    gsap.set(progress, {
      scaleX: 0,
    });

    gsap.set(scan, {
      xPercent: -100,
    });

    // Status changes
    statuses.forEach((text, index) => {
      tl.to(
        status,
        {
          opacity: 0,
          duration: 0.06,
        },
        index === 0 ? 0.05 : index * 0.24,
      );

      tl.set(
        status,
        {
          textContent: text,
        },
        index === 0 ? 0.11 : index * 0.24 + 0.06,
      );

      tl.to(
        status,
        {
          opacity: 1,
          duration: 0.06,
        },
        index === 0 ? 0.11 : index * 0.24 + 0.07,
      );
    });

    // Counter
    tl.to(
      counterValue,
      {
        value: 100,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          counter.textContent = `${Math.round(counterValue.value)
            .toString()
            .padStart(3, "0")}%`;
        },
      },
      0,
    );

    // Progress line
    tl.to(
      progress,
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
      },
      0,
    );

    // Scanning beam
    tl.to(
      scan,
      {
        xPercent: 100,
        duration: 1.45,
        ease: "none",
      },
      0,
    );

    // Subtle number movement
    tl.to(
      counter,
      {
        x: 12,
        duration: 1.5,
        ease: "power2.inOut",
      },
      0,
    );

    // Final flash
    tl.to(
      loader,
      {
        backgroundColor: "#b7ff3c",
        duration: 0.08,
      },
      1.5,
    );

    // Start the Hero reveal as the loader begins leaving
    tl.call(
      () => {
        window.dispatchEvent(new Event("preloader-complete"));
      },
      [],
      1.58,
    );

    // Reveal
    tl.to(
      loader,
      {
        yPercent: -100,
        duration: 0.42,
        ease: "expo.inOut",
      },
      1.58,
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] overflow-hidden bg-[#080808] text-[#f1f1ed]"
    >
      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient lime glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7ff3c]/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Scan beam */}
      <div
        ref={scanRef}
        className="pointer-events-none absolute inset-y-0 left-0 w-[30vw] bg-gradient-to-r from-transparent via-[#b7ff3c]/10 to-transparent blur-2xl"
      />

      {/* Top metadata */}
      <div className="absolute left-6 right-6 top-6 flex items-start justify-between md:left-10 md:right-10 md:top-8">
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
          GH
          <br />
          SYSTEM / 01
        </div>

        <div className="text-right font-mono text-[9px] uppercase tracking-[0.22em]">
          <div className="text-[#b7ff3c]">Loading...</div>
          <div className="mt-1 text-white/25">HYDERABAD / IN</div>
        </div>
      </div>

      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Crosshair */}
          <div className="absolute -left-10 top-1/2 h-px w-6 bg-white/20" />
          <div className="absolute -right-10 top-1/2 h-px w-6 bg-white/20" />

          <div className="absolute -top-10 left-1/2 h-6 w-px bg-white/20" />
          <div className="absolute -bottom-10 left-1/2 h-6 w-px bg-white/20" />

          <span
            ref={counterRef}
            className="block text-[27vw] font-semibold leading-[0.72] tracking-[-0.1em] md:text-[21vw]"
          >
            000%
          </span>
        </div>
      </div>

      {/* Bottom information */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10">
        <div className="mb-4 flex items-end justify-between">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
            <span ref={statusRef}>INITIALIZING SYSTEM</span>
          </div>

          <div className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 sm:block">
            CYBERSECURITY / SOFTWARE / SYSTEMS
          </div>
        </div>

        {/* Progress */}
        <div className="relative h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-[#b7ff3c]"
          />
        </div>

        <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
          <span>BOOT SEQUENCE</span>
          <span>HITESH GANGA</span>
        </div>
      </div>
    </div>
  );
}
