import { useEffect, RefObject } from "react";
import { transitionLock } from "@/utils/transition_lock.util";

interface ProjectScrollMorphProps {
  morphsRef: RefObject<any>;
  isProjectsRoute: boolean;
}

// An underdamped spring gives the melt a short rebound in either direction.
const STIFFNESS = 220;
const DAMPING = 12;
const EDGE_REBOUND = 0.45;

export const useScrollMorph = ({ morphsRef, isProjectsRoute }: ProjectScrollMorphProps) => {
  useEffect(() => {
    let frame = 0;
    let position = 0;
    let target = 0;
    let velocity = 0;
    let lastTime = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setProgress = (progress: number) => {
      const morphs = morphsRef.current;
      if (!morphs) return;
      morphs.headDown.value = progress;
      morphs.hairDown.value = progress;
      morphs.jewelryDown.forEach((m: any) => { m.value = progress; });
    };

    const readTarget = () => {
      if (!isProjectsRoute || transitionLock.phase === "horizontal") return 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(Math.max(window.scrollY, 0) / max, 1) : 0;
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      velocity = 0;
      position = target = readTarget();
      setProgress(position);
    };

    const animate = (now: number) => {
      frame = 0;
      // Cancel residual vertical motion before the horizontal morph takes over.
      if (transitionLock.phase === "horizontal" || reducedMotion.matches) {
        sync();
        return;
      }

      // Small integration steps keep the spring stable across frame rates;
      // cap elapsed time so a background tab cannot produce a large jump.
      let remaining = Math.min((now - lastTime) / 1000, 1 / 15);
      lastTime = now;
      while (remaining > 0) {
        const dt = Math.min(remaining, 1 / 120);
        velocity += ((target - position) * STIFFNESS - velocity * DAMPING) * dt;
        position += velocity * dt;
        // Bounce inward at the Blender shape key endpoints, keeping geometry
        // inside its authored 0–1 range even at the top/bottom of the page.
        if (position < 0 || position > 1) {
          position = Math.max(0, Math.min(position, 1));
          velocity *= -EDGE_REBOUND;
        }
        remaining -= dt;
      }

      if (Math.abs(target - position) < 0.0001 && Math.abs(velocity) < 0.001) {
        position = target;
        velocity = 0;
        setProgress(position);
        return;
      }
      setProgress(position);
      frame = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      target = readTarget();
      if (reducedMotion.matches || transitionLock.phase === "horizontal") {
        sync();
        return;
      }
      // Retarget the existing spring without restarting it or losing momentum.
      // Only the portrait eases; the document keeps native, immediate scrolling.
      if (!frame && (position !== target || velocity !== 0)) {
        lastTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };

    // Loading content, resizing, and initial restoration should not add bounce.
    const observer = new ResizeObserver(sync);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    reducedMotion.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      reducedMotion.removeEventListener("change", sync);
      setProgress(0);
    };
  }, [morphsRef, isProjectsRoute]);
};
