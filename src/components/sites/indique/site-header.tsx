"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ASSET, navLinks, primaryNavLinks } from "./content";

export function SiteHeader({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();
  const dark = tone === "dark";
  const linkCls = dark ? "ap-nav-link ap-nav-link--dark" : "ap-nav-link";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [colored, setColored] = useState(tone === "dark");

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) {
      setColored(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setColored(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        data-ap-header
        className={`pointer-events-none fixed inset-x-0 top-0 z-[99] will-change-transform transition-[background-color,border-color,backdrop-filter,opacity] duration-[450ms]${
          colored ? " is-colored backdrop-blur-[7px]" : " opacity-0"
        }`}
        aria-hidden={colored ? undefined : true}
      >
        <div
          className={`mx-auto w-full max-w-[1440px] ${colored ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{ padding: "12px var(--ap-pad-x)" }}
        >
          <div className="ap-header-bar">
            <nav className="ap-header-bar__left" aria-label="Primary">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${linkCls} ${
                    pathname === link.href
                      ? "opacity-100"
                      : "opacity-90 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/"
              className={`ap-header-bar__brand ${dark ? "ap-header-bar__brand--dark" : ""}`}
            >
              Indique
            </Link>

            <div className="ap-header-bar__right">
              <Link
                href="/menu"
                className={`${linkCls} inline-flex items-center gap-3`}
              >
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

              <div
                className={
                  dark
                    ? "ap-line-splitter ap-line-splitter--dark"
                    : "ap-line-splitter"
                }
              />

              <Link
                href="/reservations"
                className={`${linkCls} inline-flex items-center gap-3`}
              >
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

            <div className="ap-header-bar__mobile">
              <button
                type="button"
                className={`inline-flex items-center gap-2 ${linkCls}`}
                aria-label="Open menu"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span>{mobileOpen ? "Close" : "Menu"}</span>
                <span className="flex w-5 flex-col gap-[5px]">
                  <span
                    className={`h-px w-full bg-current transition ${
                      mobileOpen ? "translate-y-[3px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`h-px w-full bg-current transition ${
                      mobileOpen ? "-translate-y-[3px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {mobileOpen ? (
          <div className="pointer-events-auto border-t border-black/10 bg-[var(--ap-cream)] px-4 py-5 text-[var(--ap-ink)] lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-black md:hidden">
        <Link
          href="/menu"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-[12.5px] text-[var(--ap-cream)]"
        >
          <span className="ap-icon-box !h-8 !w-8 !p-1.5">
            <Image
              src={`${ASSET}/images/menu-icon.png`}
              alt=""
              width={18}
              height={18}
            />
          </span>
          Menu
        </Link>
        <div className="w-px self-stretch bg-white/20" />
        <Link
          href="/reservations"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-[12.5px] text-[var(--ap-cream)]"
        >
          <span className="ap-icon-box !h-8 !w-8 !p-1.5">
            <Image
              src={`${ASSET}/images/order-icon.png`}
              alt=""
              width={18}
              height={18}
            />
          </span>
          Reserve
        </Link>
      </div>
    </>
  );
}
