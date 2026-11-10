"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSET, navLinks } from "./content";
import {
  heroAnnotationPath,
  heroIngredientAnnotations,
} from "./hero-annotations";

gsap.registerPlugin(ScrollTrigger);

const DISH_SRC = "/sites/indique/images/hero/hero-dish-3d.jpg";
const BG_SRC = "/sites/indique/images/hero/hero-bg.jpg";

export function HeroScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dishRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const dish = dishRef.current;
      const content = contentRef.current;
      const notes = notesRef.current;
      const bg = bgRef.current;
      const veil = veilRef.current;

      if (dish) {
        gsap.set(dish, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: "16vh",
          scale: 0.38,
          opacity: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      }

      if (content) {
        gsap.set(content, { opacity: 1, y: 0 });
      }

      if (bg) {
        gsap.set(bg, { scale: 1.06, opacity: 1, yPercent: 0 });
      }
      if (veil) {
        gsap.set(veil, { opacity: 1 });
      }

      if (notes) {
        gsap.set(notes, { opacity: 0 });
        gsap.set(notes.querySelectorAll("[data-hero-ann-part='group']"), {
          opacity: 0,
        });
        gsap.set(notes.querySelectorAll("[data-hero-ann-part='leader']"), {
          strokeDashoffset: 1,
        });
        gsap.set(notes.querySelectorAll("[data-hero-ann-part='label']"), {
          opacity: 0,
        });
      }

      if (reduced) {
        if (dish) {
          gsap.set(dish, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          });
        }
        if (content) gsap.set(content, { opacity: 0 });
        if (bg) gsap.set(bg, { opacity: 0 });
        if (veil) gsap.set(veil, { opacity: 0 });
        if (notes) {
          gsap.set(notes, { opacity: 1 });
          gsap.set(notes.querySelectorAll("[data-hero-ann-part='group']"), {
            opacity: 1,
          });
          gsap.set(notes.querySelectorAll("[data-hero-ann-part='leader']"), {
            strokeDashoffset: 0,
          });
          gsap.set(notes.querySelectorAll("[data-hero-ann-part='label']"), {
            opacity: 1,
          });
        }
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      // Photo fully gone before the plate settles — clean emerald behind
      if (bg) {
        tl.to(
          bg,
          { scale: 1.1, yPercent: 2, autoAlpha: 0, duration: 0.35 },
          0,
        );
      }
      if (veil) {
        tl.to(veil, { autoAlpha: 0, duration: 0.32 }, 0);
      }

      if (content) {
        tl.to(
          content,
          {
            y: -72,
            opacity: 0,
            duration: 0.35,
          },
          0,
        );
      }

      if (dish) {
        tl.to(
          dish,
          {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
          },
          0.22,
        );

        tl.to(
          dish,
          {
            scale: 1.06,
            duration: 0.18,
          },
          0.62,
        );
      }

      if (notes) {
        tl.to(notes, { opacity: 1, duration: 0.12 }, 0.68);

        heroIngredientAnnotations.forEach((annotation) => {
          const group = notes.querySelectorAll(
            `[data-hero-ann="${annotation.id}"][data-hero-ann-part="group"]`,
          );
          const leader = notes.querySelectorAll(
            `[data-hero-ann="${annotation.id}"][data-hero-ann-part="leader"]`,
          );
          const label = notes.querySelectorAll(
            `[data-hero-ann="${annotation.id}"][data-hero-ann-part="label"]`,
          );
          const span = Math.max(0.04, annotation.end - annotation.start);

          tl.to(group, { opacity: 1, duration: span }, annotation.start);
          tl.to(
            leader,
            { strokeDashoffset: 0, duration: span },
            annotation.start,
          );
          tl.to(
            label,
            { opacity: 1, duration: span * 0.7 },
            annotation.start + span * 0.3,
          );
        });
      }
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="ap-hero"
      aria-label="Indique hero"
    >
      <div ref={stageRef} className="ap-hero__stage">
        <div ref={bgRef} className="ap-hero__bg" aria-hidden>
          <Image
            src={BG_SRC}
            alt=""
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div ref={veilRef} className="ap-hero__veil" aria-hidden />

        <nav className="ap-hero__nav" aria-label="Primary">
          <div className="ap-hero__nav-links">
            {navLinks
              .filter((link) => link.href !== "/menu")
              .map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
          </div>

          <Link href="/" className="ap-hero__nav-brand">
            Indique
          </Link>

          <div className="ap-hero__nav-actions">
            <Link href="/menu" className="ap-hero__nav-action">
              <span>Menu</span>
              <span className="ap-icon-box">
                <Image
                  src={`${ASSET}/images/menu-icon.png`}
                  alt=""
                  width={20}
                  height={20}
                />
              </span>
            </Link>
            <div className="ap-line-splitter" />
            <Link href="/reservations" className="ap-hero__nav-action">
              <span>Reserve</span>
              <span className="ap-icon-box">
                <Image
                  src={`${ASSET}/images/order-icon.png`}
                  alt=""
                  width={20}
                  height={20}
                />
              </span>
            </Link>
          </div>
        </nav>

        <div ref={dishRef} className="ap-hero__dish" aria-hidden>
          <div className="ap-hero__dish-glow" />
          <div className="ap-hero__dish-frame">
            <Image
              src={DISH_SRC}
              alt="Indian curry on a white plate"
              width={1024}
              height={1024}
              className="ap-hero__dish-img"
              sizes="(max-width: 900px) 78vw, 42vw"
              priority
            />
          </div>

          <div ref={notesRef} className="ap-hero__notes">
            <svg
              className="ap-hero__notes-svg"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="xMidYMid meet"
              shapeRendering="geometricPrecision"
            >
              {heroIngredientAnnotations.map((annotation) => {
                const path = heroAnnotationPath(annotation);
                return (
                  <g
                    key={annotation.id}
                    data-hero-ann={annotation.id}
                    data-hero-ann-part="group"
                    opacity={0}
                  >
                    <circle
                      cx={path.ax}
                      cy={path.ay}
                      r="7"
                      className="ap-hero__note-dot"
                    />
                    <circle
                      cx={path.ax}
                      cy={path.ay}
                      r="3.2"
                      className="ap-hero__note-dot-core"
                    />
                    <path
                      d={path.d}
                      className="ap-hero__note-leader"
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={1}
                      data-hero-ann={annotation.id}
                      data-hero-ann-part="leader"
                    />
                    <circle
                      cx={path.lx}
                      cy={path.ly}
                      r="2.4"
                      className="ap-hero__note-end"
                    />
                  </g>
                );
              })}
            </svg>

            {heroIngredientAnnotations.map((annotation) => (
              <p
                key={`${annotation.id}-label`}
                data-hero-ann={annotation.id}
                data-hero-ann-part="label"
                className={`ap-hero__note-label ap-hero__note-label--${annotation.side}`}
                style={{
                  left: `${annotation.labelPosition.x * 100}%`,
                  top: `${annotation.labelPosition.y * 100}%`,
                }}
              >
                {annotation.label}
              </p>
            ))}
          </div>
        </div>

        <div ref={contentRef} className="ap-hero__inner">
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
            <p className="ap-caption mb-5 text-[var(--ap-cream)]/80">
              A Contemporary Indian Restaurant & Bar
            </p>

            <h1 className="ap-h1">All of India.</h1>
            <h1 className="ap-h1 mt-1">One Plate.</h1>

            <p className="ap-body mt-8 max-w-[460px] text-[var(--ap-cream)]">
              From familiar favourites to unexpected discoveries, discover
              India&apos;s many flavours around one table.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/menu" className="ap-button ap-button--light">
                Explore the Menu
              </Link>
              <Link href="/reservations" className="ap-button ap-button--filled">
                <span className="ap-button-box">Reserve a Table</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
