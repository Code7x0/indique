"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import type { MenuCategory } from "@/content/menuCategories";

type MenuCategoryCardProps = {
  category: MenuCategory;
  index: number;
};

export function MenuCategoryCard({ category, index }: MenuCategoryCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCanTilt(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  const resetTilt = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -7,
      y: (px - 0.5) * 9,
    });
  };

  const onEnter = () => setActive(true);
  const onLeave = () => {
    setActive(false);
    resetTilt();
  };

  const onFocus = (_event: FocusEvent<HTMLAnchorElement>) => setActive(true);
  const onBlur = () => {
    setActive(false);
    resetTilt();
  };

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // allow default navigation
    void event;
  };

  const n = String(index + 1).padStart(2, "0");

  return (
    <Link
      ref={cardRef}
      href={`/menu?category=${category.slug}`}
      id={`category-card-${category.slug}`}
      className="ap-cat-card"
      data-active={active ? "true" : "false"}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      aria-label={`${category.name}. ${category.description}`}
    >
      <span className="ap-cat-card__index" aria-hidden>
        {n}
      </span>

      <div className="ap-cat-card__media">
        <div
          className="ap-cat-card__figure"
          style={{
            transform: canTilt
              ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${active ? -10 : 0}px) scale(${active ? 1.06 : 1})`
              : active
                ? "translateY(-8px) scale(1.05)"
                : "none",
          }}
        >
          <Image
            src={category.image}
            alt={category.alt}
            width={640}
            height={640}
            className="ap-cat-card__img"
            sizes="(max-width: 700px) 45vw, (max-width: 1100px) 30vw, 22vw"
          />
        </div>
      </div>

      <div className="ap-cat-card__meta">
        <h3 className="ap-cat-card__name">{category.name}</h3>
        <p className="ap-cat-card__desc">{category.description}</p>
        <span className="ap-cat-card__cta">
          View Category
          <span aria-hidden>↗</span>
        </span>
      </div>
    </Link>
  );
}
