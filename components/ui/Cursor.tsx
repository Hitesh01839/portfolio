"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    // Only enable on devices with a real mouse.
    const finePointer = window.matchMedia("(pointer: fine)");

    if (!finePointer.matches) return;

    document.body.classList.add("custom-cursor");

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    let mouseX = 0;
    let mouseY = 0;
    let animationFrame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        moveX(mouseX);
        moveY(mouseY);
        animationFrame = 0;
      });
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("a, button, [data-cursor]")) {
        gsap.to(cursor, {
          width: 56,
          height: 56,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("a, button, [data-cursor]")) {
        gsap.to(cursor, {
          width: 14,
          height: 14,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);

      document.body.classList.remove("custom-cursor");

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-9999 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7ff3c] mix-blend-difference"
      aria-hidden="true"
    />
  );
}
