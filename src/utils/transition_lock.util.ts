import gsap from "gsap";

export const TRANSITION_DURATION = 1;
export const transitionLock = {
  current: false,
  destination: null as "home" | "projects" | null,
  phase: null as "top" | "horizontal" | null,
};

let scrollTween: gsap.core.Tween | null = null;
const pendingAnimations = new Set<symbol>();

export const setDocumentScrollLocked = (locked: boolean) => {
  // Keep one document scroller so native input and animation measurements agree.
  document.documentElement.style.overflowY = locked ? "hidden" : "auto";
  document.body.style.overflow = "visible";
};

export const beginHorizontalTransition = (destination: "home" | "projects") => {
  transitionLock.current = true;
  transitionLock.destination = destination;
  transitionLock.phase = "horizontal";
  document.documentElement.dataset.transitioning = "true";
  setDocumentScrollLocked(true);
};

export const finishHorizontalTransition = (enableVerticalScroll: boolean) => {
  pendingAnimations.clear();
  scrollTween?.kill();
  scrollTween = null;
  transitionLock.current = false;
  transitionLock.destination = null;
  transitionLock.phase = null;
  delete document.documentElement.dataset.transitioning;
  setDocumentScrollLocked(!enableVerticalScroll);
};

// Panels and the WebGL renderer can start on different frames. Release input
// only when both have completed, rather than guessing with an unlock timeout.
export const joinHorizontalTransition = () => {
  if (transitionLock.phase !== "horizontal") return () => {};
  const token = Symbol();
  pendingAnimations.add(token);
  return () => {
    if (!pendingAnimations.delete(token)) return;
    if (pendingAnimations.size === 0) {
      finishHorizontalTransition(transitionLock.destination === "projects");
    }
  };
};

export const navigateFromTop = (destination: "home" | "projects", navigate: () => void) => {
  if (transitionLock.current) return;
  const startHorizontal = () => {
    window.scrollTo(0, 0);
    beginHorizontalTransition(destination);
    navigate();
  };
  if (window.scrollY <= 1) {
    startHorizontal();
    return;
  }

  transitionLock.current = true;
  transitionLock.destination = destination;
  transitionLock.phase = "top";
  document.documentElement.dataset.transitioning = "true";
  const position = { y: window.scrollY };
  scrollTween = gsap.to(position, {
    y: 0,
    duration: Math.min(1, Math.max(0.35, window.scrollY / 2500)),
    ease: "power2.inOut",
    onUpdate: () => window.scrollTo(0, position.y),
    onComplete: startHorizontal,
  });
};
