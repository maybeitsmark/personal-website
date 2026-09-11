// Animates morphing assets based on navigation direction between home and projects sections
// https://github.com/maybeitsmark 
// 2026

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface MorphAnimationProps {
  morphsRef: any;
  layout: string;
  isMobile: boolean;
};

export const useMorphAnimation = ({ morphsRef, layout, isMobile }: MorphAnimationProps) => {
  const prevLayout = useRef<string | null>(null);

  useGSAP(() => {
    const m = morphsRef.current;
    if (!m) return;
    if (isMobile) {
      const targets = [m.hairLeft, m.headLeft, ...m.jewelryLeft, m.hairRight, m.headRight, ...m.jewelryRight];
      gsap.killTweensOf(targets);
      targets.forEach((target) => { target.value = 0; });
      prevLayout.current = layout;
      return;
    }

    if (prevLayout.current === null) {
      prevLayout.current = layout;
      return;
    };

    const prev = prevLayout.current;
    const shouldAnimate = (prev === "home" && layout === "projects") || (prev === "projects" && layout === "home");

    if (!shouldAnimate) {
      prevLayout.current = layout;
      return;
    };

    const isRight = layout === "projects";

    const rightTargets = [m.hairLeft, m.headLeft, ...m.jewelryLeft];
    const leftTargets = [m.hairRight, m.headRight, ...m.jewelryRight];
    const active = isRight ? rightTargets : leftTargets;

    gsap.killTweensOf([...leftTargets, ...rightTargets]);

    const timeline = gsap.timeline().to(active, { value: 1, duration: 0.4, ease: "power2.out" }).to(active, { value: 0, duration: 0.4, ease: "power2.in" });
    prevLayout.current = layout;
    return () => {
      timeline.kill();
      active.forEach((target) => { target.value = 0; });
    };
  }, { dependencies: [layout, isMobile] });
};
