import { useEffect, useLayoutEffect } from "react";
import { finishHorizontalTransition, setDocumentScrollLocked, transitionLock } from "@/utils/transition_lock.util";

export const useScrollLock = (layout: string, isMobile: boolean) => {
  useLayoutEffect(() => {
    if (isMobile || layout === "project-detail") {
      finishHorizontalTransition(true);
      return;
    }
    if (transitionLock.phase === "horizontal") return;
    finishHorizontalTransition(layout !== "home");
    window.scrollTo(0, 0);
    setDocumentScrollLocked(layout === "home");
  }, [layout, isMobile]);

  useEffect(() => {
    const blockGesture = (event: Event) => {
      if (transitionLock.current) event.preventDefault();
    };
    const blockKey = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) blockGesture(event);
    };
    window.addEventListener("wheel", blockGesture, { passive: false });
    window.addEventListener("touchmove", blockGesture, { passive: false });
    window.addEventListener("keydown", blockKey);
    return () => {
      window.removeEventListener("wheel", blockGesture);
      window.removeEventListener("touchmove", blockGesture);
      window.removeEventListener("keydown", blockKey);
    };
  }, []);
};
