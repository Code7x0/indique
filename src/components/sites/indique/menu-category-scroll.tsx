"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { menuCategorySlugs } from "@/content/menuCategories";

/** Scrolls to / highlights a menu section when `?category=` is present. */
export function MenuCategoryScroll() {
  const params = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    if (!category || !menuCategorySlugs.includes(category)) return;

    let clearTimer = 0;
    let attempt = 0;

    const run = () => {
      const el = document.getElementById(category);
      if (!el) {
        if (attempt < 12) {
          attempt += 1;
          clearTimer = window.setTimeout(run, 50);
        }
        return;
      }
      el.setAttribute("data-menu-focus", "true");
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      clearTimer = window.setTimeout(
        () => el.removeAttribute("data-menu-focus"),
        2400,
      );
    };

    clearTimer = window.setTimeout(run, 60);
    return () => window.clearTimeout(clearTimer);
  }, [category]);

  return null;
}
