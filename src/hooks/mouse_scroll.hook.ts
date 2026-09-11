// Redirects top-of-page wheel/touch gestures between home and projects without leaking native scroll
// https://github.com/maybeitsmark
// 2026

import { useEffect, useRef } from "react";
// hooks
import { useNavigationLock } from "@/hooks/navigation_lock.hook";
import { transitionLock } from "@/utils/transition_lock.util";

interface MouseScrollProps {
  layout: string;
  isMobile: boolean;
};  

export const useMouseScroll = ( { layout, isMobile }: MouseScrollProps ) => {
  const navigate = useNavigationLock();
  const touchStartY = useRef<number | null>(null);
  const touchStartedAtTop = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const navigateFromDirection = (deltaY: number) => {
      if (window.scrollY > 0) return false;

      if (layout === "home" && deltaY > 0) {
        navigate("/projects", { lockScroll: true });
        return true;
      }

      if (layout === "projects" && deltaY < 0) {
        navigate("/", { lockScroll: true });
        return true;
      }

      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if ((event.target as HTMLElement).closest("input, textarea, select")) return;
      const deltaY = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? event.deltaY * 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? event.deltaY * window.innerHeight
          : event.deltaY;

      if (transitionLock.current) {
        event.preventDefault();
        return;
      }

      if (navigateFromDirection(deltaY)) {
        // Do not let the gesture that changed routes also scroll Projects.
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
      touchStartedAtTop.current = window.scrollY <= 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) return;

      if (transitionLock.current) {
        event.preventDefault();
        return;
      }

      if (touchStartY.current === null || !touchStartedAtTop.current) return;

      const deltaY = touchStartY.current - currentY;
      if (Math.abs(deltaY) < 12) return;

      if (navigateFromDirection(deltaY)) {
        touchStartedAtTop.current = false;
        event.preventDefault();
      }
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
      touchStartedAtTop.current = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [layout, isMobile, navigate]);
};
