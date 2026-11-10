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
          <h2 className="ap-display text-[clamp(32px,4vw,48px)] text-[var(--ap-cream)]">
            Bring everyone.
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed opacity-85">
            Planning something special? Get in touch for group dining and
            celebration enquiries.
          </p>
          <Link href="/contact" className="ap-button ap-button--light mt-8">
            Make an Enquiry
          </Link>
        </div>
      </section>
    </InteriorPage>
  );
}
