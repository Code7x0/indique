import Link from "next/link";
import { InteriorPage } from "@/components/sites/indique/interior-page";
import { ReservationForm } from "@/components/sites/indique/reservation-form";

export default function Page() {
  return (
    <InteriorPage
      title={
        <>
          A table
          <br />
          with your name on it.
        </>
      }
      eyebrow="Reservations"
      lead="Planning a dinner, a celebration or simply a good evening out? We'd love to have you."
    >
      <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-24 lg:grid-cols-[1.1fr_0.9fr] md:px-7">
        <ReservationForm />

        <div className="rounded-[3px] bg-[var(--ap-ink)] p-6 text-[var(--ap-cream)] md:p-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ap-gold)]">
            Planning something special?
          </p>
          <h2 className="ap-display mt-3 text-[clamp(32px,4vw,48px)] text-[var(--ap-cream)]">
            Make it
            <br />
            an occasion.
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed opacity-85">
            Celebrations, corporate gatherings and catering enquiries deserve a
            little more attention. Tell us what you&apos;re planning and our
            team will help you with the next steps.
          </p>
          <Link
            href="/events-catering"
            className="ap-button ap-button--light mt-8"
          >
            Explore Events & Catering
          </Link>
        </div>
      </section>
    </InteriorPage>
  );
}
