import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useHomeNavigation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !contentRef.current) return;
    const container = contentRef.current!.querySelector(".horizontal-container") as HTMLElement;
    const totalScroll = container.scrollWidth - window.innerWidth;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2,
      effects: true,
    });

    const sections = gsap.utils.toArray<HTMLElement>(
      contentRef.current.querySelectorAll(".panel")
    );
    console.log("Sections:", sections);
    gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => "+=" + (container.scrollWidth - window.innerWidth),
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });
    return () => {
      smoother.kill();
    };
  }, []);

  return { wrapperRef, contentRef };
};