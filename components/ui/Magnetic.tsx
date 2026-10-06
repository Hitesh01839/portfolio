"use client";

import { type PropsWithChildren, type MouseEvent, useRef } from "react";
import gsap from "gsap";

type MagneticProps = PropsWithChildren<{
  strength?: number;
  className?: string;
}>;

export default function Magnetic({
  children,
  strength = 0.25,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    const element = ref.current;

    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
