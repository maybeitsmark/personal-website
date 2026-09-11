import { useLayoutEffect, RefObject } from "react";
import gsap from "gsap";

export const useFadeUp = (ref: RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Observe the untransformed row, including rows at the document's end.
    // A scroll threshold below the maximum scroll can strand them at opacity 0.
    gsap.set(element, { opacity: 0 });
    let tween: gsap.core.Tween | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      tween = gsap.fromTo(element, { opacity: 0 }, {
        opacity: 1, duration: 0.3, ease: "power2.out", clearProps: "opacity",
      });
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      tween?.kill();
      gsap.set(element, { clearProps: "opacity" });
    };
  }, [ref]);
};
