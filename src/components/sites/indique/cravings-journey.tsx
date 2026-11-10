"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orbitCategories } from "@/components/sites/indique/content";

gsap.registerPlugin(ScrollTrigger);

type Craving = (typeof orbitCategories)[number];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Brewns-style sticky journey: floating 3D cutout on the left,
 * scrolling copy on the right. Scroll drives which plate is active.
 */
export function CravingsJourney() {
  const items = orbitCategories as readonly Craving[];
  const rootRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pickClosest = () => {
      const mid = window.innerHeight * 0.48;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.45;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      if (best !== activeRef.current) setActive(best);
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: pickClosest,
      onRefresh: pickClosest,
    });

    pickClosest();

    if (!reduced) {
      gsap.fromTo(
        root.querySelector(".ap-cravings-ring"),
        { rotate: 0 },
        {
          rotate: 360,
          duration: 80,
          ease: "none",
          repeat: -1,
        },
      );
    }

    return () => {
      trigger.kill();
      gsap.killTweensOf(root.querySelector(".ap-cravings-ring"));
    };
  }, [items.length]);

  return (
    <section
      ref={rootRef}
      id="categories"
      className="ap-cravings"
      data-pillar={active}
      aria-label="Menu categories"
    >
      <div className="ap-cravings-in">
        {/* Left: sticky floating cutouts */}
        <div className="ap-cravings-stage" aria-hidden={false}>
          <div className="ap-cravings-sticky">
            <span className="ap-cravings-ring" aria-hidden />

            {items.map((item, i) => (
              <figure
                key={item.href}
                className="ap-cravings-fig"
                data-i={i}
                data-active={active === i ? "true" : "false"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.alt} draggable={false} />
                <figcaption>
                  <span>{pad(i + 1)}</span>
                  <em>{item.kitchen}</em>
                </figcaption>
              </figure>
            ))}

            <ol className="ap-cravings-dots" aria-label="Category steps">
              {items.map((item, i) => (
                <li key={item.href} data-i={i} data-active={active === i ? "true" : "false"}>
                  <button
                    type="button"
                    aria-label={`Show ${item.label}`}
                    aria-current={active === i ? "true" : undefined}
                    onClick={() => {
                      stepRefs.current[i]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: scrolling copy */}
        <div className="ap-cravings-steps">
          <p className="ap-cravings-eyebrow">
            Explore the Menu <span className="ap-cravings-eyebrow-slash">/</span> From plate to
            table
          </p>

          {items.map((item, i) => (
            <article
              key={item.href}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="ap-cravings-step"
              data-i={i}
              data-active={active === i ? "true" : "false"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="ap-cravings-mob"
                src={item.image}
                alt=""
                aria-hidden
                draggable={false}
              />

              <p className="ap-cravings-n">
                {pad(i + 1)} <span>/ {pad(items.length)}</span>
              </p>

              <h3 className="ap-cravings-h">
                <span className="ap-cravings-h1">{item.title}</span>
                <span className="ap-cravings-h2">{item.subtitle}</span>
              </h3>

              <p className="ap-cravings-body">{item.description}</p>

              <Link href={item.href} className="ap-cravings-link">
                Explore {item.label}
                <svg viewBox="0 0 12 12" aria-hidden>
                  <path
                    d="M2 6h8M7 3l3 3-3 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </article>
          ))}

          <div className="ap-cravings-cta">
            <Link href="/menu" className="ap-button ap-button--filled">
              <span className="ap-button-box">Open Full Menu</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
