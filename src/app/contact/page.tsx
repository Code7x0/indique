import Link from "next/link";
import { location } from "@/components/sites/indique/content";
import { ContactForm } from "@/components/sites/indique/contact-form";
import { InteriorPage } from "@/components/sites/indique/interior-page";

function isConfirmed(value: string | undefined | null): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/\[ADD\b/i.test(trimmed)) return false;
  if (/\.example\b/i.test(trimmed)) return false;
  return true;
}

export default function Page() {
  const email = isConfirmed(location.email) ? location.email : null;
  const emailHref = isConfirmed(location.emailHref)
    ? location.emailHref
    : null;
  const hours = location.hours.filter(isConfirmed);

  return (
    <InteriorPage
      title={
        <>
          We&apos;d love
          <br />
          to see you.
        </>
      }
      eyebrow="Get in Touch"
      lead="Questions, plans or simply looking for directions? We're just a message away."
    >
      <section className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 pb-24 lg:grid-cols-2 md:px-7">
        <div className="space-y-6">
          <article className="rounded-[3px] border border-[var(--ap-ink)]/15 p-6">
            <h2 className="text-[11px] uppercase tracking-[0.16em] opacity-60">
              Visit Us
            </h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed">
              {location.address}
            </p>
          </article>
          <article className="rounded-[3px] border border-[var(--ap-ink)]/15 p-6">
            <h2 className="text-[11px] uppercase tracking-[0.16em] opacity-60">
              Call Us
            </h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              {location.phones.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    className="underline-offset-4 transition-opacity hover:underline hover:opacity-70"
                  >
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </article>
          {email && emailHref ? (
            <article className="rounded-[3px] border border-[var(--ap-ink)]/15 p-6">
              <h2 className="text-[11px] uppercase tracking-[0.16em] opacity-60">
                Email
              </h2>
              <a
                href={emailHref}
                className="mt-3 inline-block text-[15px] underline underline-offset-4"
              >
                {email}
              </a>
            </article>
          ) : null}
          {hours.length > 0 ? (
            <article className="rounded-[3px] border border-[var(--ap-ink)]/15 p-6">
              <h2 className="text-[11px] uppercase tracking-[0.16em] opacity-60">
                Opening Hours
              </h2>
              <ul className="mt-3 space-y-1 text-[15px]">
                {hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ) : null}
          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="ap-button ap-button--dark"
          >
            Get Directions
          </a>

          <article className="rounded-[3px] border border-[var(--ap-ink)]/15 bg-[var(--ap-ink)] p-6 text-[var(--ap-cream)]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ap-gold)]">
              Planning an event?
            </p>
            <p className="mt-3 text-[14px] leading-relaxed opacity-90">
              Planning an event or catering experience?
            </p>
            <Link
              href="/events-catering#event-enquiry"
              className="ap-button ap-button--light mt-5"
            >
              Make an Event Enquiry
            </Link>
          </article>
        </div>

        <div>
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.16em] opacity-60">
            General Enquiry
          </h2>
          <ContactForm />
          <div className="relative mt-8 min-h-[320px] overflow-hidden rounded-[3px] bg-[var(--ap-taupe)]">
            <iframe
              title="INDIQUE location map"
              src={location.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}
