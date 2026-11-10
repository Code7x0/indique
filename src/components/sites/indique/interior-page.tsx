import Link from "next/link";
import type { ReactNode } from "react";
import { PageShell } from "./page-shell";

export function InteriorPage({
  title,
  eyebrow,
  lead,
  children,
  cta,
}: {
  title: ReactNode;
  eyebrow?: string;
  lead?: string;
  children?: ReactNode;
  cta?: { href: string; label: string; external?: boolean };
}) {
  return (
    <PageShell headerTone="dark">
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-28 md:px-7 md:pt-32">
        {eyebrow ? (
          <p className="mb-3 text-[11px] tracking-[0.2em] uppercase opacity-60">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="ap-display max-w-[900px] text-[clamp(48px,8vw,96px)]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed opacity-85">
            {lead}
          </p>
        ) : null}
        {cta ? (
          cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ap-button ap-button--dark mt-8"
            >
              {cta.label}
            </a>
          ) : (
            <Link href={cta.href} className="ap-button ap-button--dark mt-8">
              {cta.label}
            </Link>
          )
        ) : null}
      </section>
      {children}
    </PageShell>
  );
}
