import { RefObject, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { beginHorizontalTransition, finishHorizontalTransition, joinHorizontalTransition, TRANSITION_DURATION } from "@/utils/transition_lock.util";

interface PanelsAnimationProps {
  panelsRef: RefObject<HTMLDivElement | null>;
  layout: string;
  isMobile: boolean;
}

export const usePanelsAnimation = ({ panelsRef, layout, isMobile }: PanelsAnimationProps) => {
  const previous = useRef<{ index: number; mobile: boolean } | null>(null);

  useLayoutEffect(() => {
    const panels = panelsRef.current;
    const index = layout === "projects" ? 1 : 0;
    const last = previous.current;
    previous.current = { index, mobile: isMobile };
    if (!panels || isMobile) return;

    // The track is 150% wide, so one panel is a third of its own width.
    if (!last || last.mobile || last.index === index) {
      gsap.set(panels, { xPercent: -100 / 3 * index });
      return;
    }

    window.scrollTo(0, 0);
    beginHorizontalTransition(index === 1 ? "projects" : "home");
    const complete = joinHorizontalTransition();
    const tween = gsap.to(panels, {
      xPercent: -100 / 3 * index,
      duration: TRANSITION_DURATION,
      ease: "power2.inOut",
      onComplete: complete,
    });
    return () => {
      tween.kill();
      finishHorizontalTransition(index === 1);
    };
  }, [layout, isMobile, panelsRef]);
};
