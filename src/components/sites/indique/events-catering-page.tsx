import Link from "next/link";
import { eventServiceBlocks } from "./content";
import { EventsEnquiryForm } from "./events-enquiry-form";
import { PageShell } from "./page-shell";

export function EventsCateringPage() {
  return (
    <PageShell headerTone="light">
      <section className="ap-events-hero text-[var(--ap-cream)]">
        <div
          className="mx-auto w-full max-w-[1440px]"
          style={{ padding: "128px var(--ap-pad-x) 88px" }}
        >
          <p
            data-text-split
            data-letters-fade-in
            className="ap-caption mb-4 !text-[var(--ap-gold)]"
          >
            Events & Catering
          </p>
          <h1
            data-text-split
            data-letters-fade-in
            className="ap-display max-w-[920px] text-[clamp(48px,8vw,96px)] !text-[var(--ap-cream)]"
          >
            Something
            <br />
            worth gathering for.
          </h1>
          <p
            data-fade-up
            className="mt-6 max-w-[540px] text-[15px] leading-relaxed text-[var(--ap-cream)]/85"
          >
            From intimate celebrations to larger gatherings, let INDIQUE be part
            of your occasion.
          </p>
          <p
            data-fade-up
            className="mt-3 max-w-[540px] text-[15px] leading-relaxed text-[var(--ap-cream)]/75"
          >
            Whether you&apos;re planning a private event, a group dinner or a
            catered experience, tell us what you have in mind.
          </p>
          <a
            href="#event-enquiry"
            className="ap-button ap-button--gold mt-8"
          >
            Make an Enquiry
          </a>
        </div>
      </section>

      <section className="ap-events-services">
        <div
          className="mx-auto w-full max-w-[1440px]"
          style={{ padding: "80px var(--ap-pad-x)" }}
        >
          <h2
            data-text-split
            data-letters-fade-in
            className="ap-display max-w-[720px] text-[clamp(36px,5vw,64px)]"
          >
            Good food.
            <br />
            Great occasions.
          </h2>
          <p
            data-fade-up
            className="mt-5 max-w-[480px] text-[14px] leading-relaxed opacity-85"
          >
            Every gathering deserves thoughtful hospitality, memorable food and
            a table worth coming back to.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {eventServiceBlocks.map((block, index) => (
              <article
                key={block.title}
                data-fade-up
                className={`ap-events-card ap-events-card--${index + 1}`}
              >
                <p className="ap-events-card__index">0{index + 1}</p>
                <h3 className="ap-events-card__title">{block.title}</h3>
                <p className="ap-events-card__copy">{block.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-events-form-section" id="event-enquiry-section">
        <div
          className="mx-auto w-full max-w-[1440px]"
          style={{ padding: "88px var(--ap-pad-x)" }}
        >
          <div className="mb-10 max-w-[720px] text-[var(--ap-cream)]">
            <p className="ap-caption mb-3 !text-[var(--ap-gold)]">
              Event Enquiry
            </p>
            <h2
              data-text-split
              data-letters-fade-in
              className="ap-display text-[clamp(36px,5vw,64px)] !text-[var(--ap-cream)]"
            >
              Tell us about
              <br />
              your occasion.
            </h2>
            <p
              data-fade-up
              className="mt-5 text-[15px] leading-relaxed text-[var(--ap-cream)]/80"
            >
              Share a few details and our team will get in touch to discuss your
              plans.
            </p>
          </div>
          <div className="mx-auto max-w-[880px]">
            <EventsEnquiryForm />
          </div>
          <p className="mt-8 text-center text-[13px] text-[var(--ap-cream)]/65">
            Looking for a regular table instead?{" "}
            <Link
              href="/reservations"
              className="text-[var(--ap-gold)] underline underline-offset-4"
            >
              Reserve a table
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
