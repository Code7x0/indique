"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const SPLIT_SELECTOR =
  "[data-text-split], [data-letters-fade-in], [data-letters-fade-in-hover]";

export function TextSplitAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let splits: SplitType[] = [];
    const triggers: ScrollTrigger[] = [];
    const cleanups: Array<() => void> = [];
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const run = () => {
      const targets = document.querySelectorAll<HTMLElement>(SPLIT_SELECTOR);
      if (!targets.length) return;

      const split = new SplitType(targets, {
        types: "words, chars",
        tagName: "span",
      });
      splits.push(split);

      document
        .querySelectorAll<HTMLElement>("[data-letters-fade-in]")
        .forEach((el) => {
          const chars = el.querySelectorAll<HTMLElement>(".char");
          if (!chars.length) return;

          gsap.set(chars, { opacity: 0 });
          const tl = gsap.timeline({ paused: true });
          tl.to(chars, {
            opacity: 1,
            duration: 0.25,
            ease: "power1.out",
            stagger: { amount: 0.8 },
          });

          const st = ScrollTrigger.create({
            trigger: el,
            start: "top 70%",
            once: true,
            onEnter: () => tl.play(),
          });
          triggers.push(st);

          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            tl.play();
          }
        });

      document
        .querySelectorAll<HTMLElement>("[data-letters-fade-in-hover]")
        .forEach((el) => {
          const chars = el.querySelectorAll<HTMLElement>(".char");
          if (!chars.length) return;

          const onEnter = () => {
            gsap.fromTo(
              chars,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.2,
                ease: "power1.out",
                stagger: { amount: 0.3 },
              },
            );
          };
          const onLeave = () => {
            gsap.to(chars, {
              opacity: 1,
              duration: 0.2,
              ease: "power1.in",
              stagger: { amount: 0.3 },
            });
          };

          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
          });
        });

      gsap.set(SPLIT_SELECTOR, { opacity: 1 });
      ScrollTrigger.refresh();
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (ric) {
      idleId = ric(run, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(run, 1);
    }

    return () => {
      const cic = (
        window as Window & { cancelIdleCallback?: (id: number) => void }
      ).cancelIdleCallback;
      if (idleId !== undefined && cic) {
        cic(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      cleanups.forEach((fn) => fn());
      triggers.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      splits = [];
    };
  }, []);

  return null;
}
