"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuCategories } from "@/content/menuCategories";
import { MenuCategoryCard } from "./menu-category-card";

gsap.registerPlugin(ScrollTrigger);

type FilterId = "all" | "food" | "bar" | "desserts";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "bar", label: "Bar" },
  { id: "desserts", label: "Desserts" },
];

const FOOD_SLUGS = new Set([
  "small-plates",
  "tandoor-appetizers",
  "entrees",
  "sides",
  "breads",
]);

export function MenuCategorySection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(
    () =>
      menuCategories
        .slice()
        .sort((a, b) => a.order - b.order)
        .filter((c) => {
          if (filter === "all") return true;
          if (filter === "desserts") return c.slug === "desserts";
          if (filter === "bar") return c.slug === "chakna" || c.slug === "drinks";
          return FOOD_SLUGS.has(c.slug);
        }),
    [filter],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cards = root.querySelectorAll(".ap-cat-card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [visible.length]);

  return (
    <section
      ref={rootRef}
      id="categories"
      className="ap-cats"
      aria-label="Menu categories"
    >
      <div className="ap-cats__inner">
        <header className="ap-cats__intro">
          <div className="ap-cats__intro-main">
            <p className="ap-cats__eyebrow">Explore the Menu</p>
            <h2 className="ap-cats__title">
              A world of
              <br />
              Indian flavours.
            </h2>
          </div>

          <div className="ap-cats__intro-aside">
            <p className="ap-cats__lead">
              From the first bite to the final pour, discover something worth
              coming back for.
            </p>
            <Link href="/menu" className="ap-cats__menu-link">
              View Full Menu
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </header>

        <div
          className="ap-cats__filters"
          role="tablist"
          aria-label="Filter categories"
        >
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className="ap-cats__filter"
              data-active={filter === item.id ? "true" : "false"}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="ap-cats__grid">
          {visible.map((category, index) => (
            <MenuCategoryCard
              key={category.id}
              category={category}
              index={category.order - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
