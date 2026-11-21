import Link from "next/link";
import { eventServiceBlocks } from "./content";
import { EventsEnquiryForm } from "./events-enquiry-form";
import { PageShell } from "./page-shell";

export function EventsCateringPage() {
  return (
    <PageShell headerTone="dark">
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-28 md:px-7 md:pt-32">
        <p className="mb-3 text-[11px] tracking-[0.2em] uppercase opacity-60">
          Events & Catering
        </p>
        <h1
          data-text-split
          data-letters-fade-in
          className="ap-display max-w-[920px] text-[clamp(48px,8vw,96px)]"
        >
          Something
          <br />
          worth gathering for.
        </h1>
        <p
          data-fade-up
          className="mt-6 max-w-[560px] text-[15px] leading-relaxed opacity-85"
        >
          From intimate celebrations to larger gatherings, let INDIQUE be part
          of your occasion.
        </p>
        <p
          data-fade-up
          className="mt-3 max-w-[560px] text-[15px] leading-relaxed opacity-85"
        >
          Whether you&apos;re planning a private event, a group dinner or a
          catered experience, tell us what you have in mind.
        </p>
        <a href="#event-enquiry" className="ap-button ap-button--dark mt-8">
          Make an Enquiry
        </a>
      </section>

      <section className="bg-[var(--ap-taupe)] px-4 py-16 md:px-7 md:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
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

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {eventServiceBlocks.map((block) => (
              <article
                key={block.title}
                data-fade-up
                className="border-t border-[var(--ap-ink)]/20 pt-5"
              >
                <h3 className="text-[12px] uppercase tracking-[0.16em]">
                  {block.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed opacity-80">
                  {block.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-7 md:py-20">
        <div className="mb-10 max-w-[720px]">
          <h2
            data-text-split
            data-letters-fade-in
            className="ap-display text-[clamp(36px,5vw,64px)]"
          >
            Tell us about
            <br />
            your occasion.
          </h2>
          <p data-fade-up className="mt-5 text-[15px] leading-relaxed opacity-85">
            Share a few details and our team will get in touch to discuss your
            plans.
          </p>
        </div>
        <div className="mx-auto max-w-[860px]">
          <EventsEnquiryForm />
        </div>
        <p className="mt-8 text-center text-[13px] opacity-70">
          Looking for a regular table instead?{" "}
          <Link href="/reservations" className="underline underline-offset-4">
            Reserve a table
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
