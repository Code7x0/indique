import { location } from "@/components/sites/indique/content";
import { ContactForm } from "@/components/sites/indique/contact-form";
import { InteriorPage } from "@/components/sites/indique/interior-page";

export default function Page() {
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
            <p className="mt-3 text-[15px]">{location.phone}</p>
          </article>
          <article className="rounded-[3px] border border-[var(--ap-ink)]/15 p-6">
            <h2 className="text-[11px] uppercase tracking-[0.16em] opacity-60">
              Email
            </h2>
            <a
              href={location.emailHref}
              className="mt-3 inline-block text-[15px] underline underline-offset-4"
            >
              {location.email}
            </a>
          </article>
          <article className="rounded-[3px] border border-[var(--ap-ink)]/15 p-6">
            <h2 className="text-[11px] uppercase tracking-[0.16em] opacity-60">
              Opening Hours
            </h2>
            <ul className="mt-3 space-y-1 text-[15px]">
              {location.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </article>
          <a href={location.directionsUrl} className="ap-button ap-button--dark">
            Get Directions
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.16em] opacity-60">
            General Enquiry
          </h2>
          <ContactForm />
          <div className="relative mt-8 min-h-[280px] overflow-hidden rounded-[3px] bg-[var(--ap-taupe)] p-6">
            <h3 className="text-[11px] uppercase tracking-[0.16em] opacity-60">
              Find Us
            </h3>
            <p className="mt-3 max-w-[320px] text-[14px] leading-relaxed opacity-80">
              Map and directions placeholder — add confirmed location details
              when ready.
            </p>
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}
