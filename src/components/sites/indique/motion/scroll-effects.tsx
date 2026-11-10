"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Header hide on scroll down / show on scroll up (matches Webflow a-3 / a-4)
      const header = document.querySelector<HTMLElement>("[data-ap-header]");
      if (header) {
        let last = 0;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const y = self.scroll();
            const goingDown = y > last && y > 80;
            gsap.to(header, {
              yPercent: goingDown ? -100 : 0,
              duration: goingDown ? 0.6 : 0.7,
              ease: "power3.out",
              overwrite: true,
            });
            last = y;
          },
        });
      }

      // Hero image parallax (Only Hero: 50%→100% scroll → y 0% to 5%)
      document.querySelectorAll<HTMLElement>("[data-parallax-hero]").forEach((section) => {
        const img = section.querySelector<HTMLElement>("[data-parallax-img]");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: 0 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Video scale reveal (0.95 → 1 over first half in view)
      document.querySelectorAll<HTMLElement>("[data-video-reveal]").forEach((section) => {
        gsap.fromTo(
          section,
          { scale: 0.95 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          },
        );
      });

      // Base parallax images (−5% → 5%)
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((wrap) => {
        const img = wrap.querySelector<HTMLElement>("[data-parallax-img]");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Soft fade/rise for content blocks
      document.querySelectorAll<HTMLElement>("[data-fade-up]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
