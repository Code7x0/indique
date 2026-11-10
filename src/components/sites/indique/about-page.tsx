import Image from "next/image";
import Link from "next/link";
import { ASSET, philosophy } from "./content";
import { PageShell } from "./page-shell";

export function AboutPage() {
  return (
    <PageShell headerTone="dark">
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-28 md:px-7 md:pt-32">
        <div className="mx-auto max-w-[920px]">
          <p className="mb-3 text-[11px] tracking-[0.2em] uppercase opacity-60">
            Our Story
          </p>
          <h1
            data-text-split
            data-letters-fade-in
            className="ap-display text-[clamp(48px,8vw,96px)]"
          >
            India was never
            <br />
            just one flavour.
          </h1>
          <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed opacity-85">
            A country of countless traditions, ingredients and culinary stories.
            At INDIQUE, India&apos;s many kitchens share one contemporary table —
            familiar comforts and little discoveries alike.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-20 md:grid-cols-[1fr_1.1fr] md:px-7">
        <div>
          <h2
            data-text-split
            data-letters-fade-in
            className="ap-display text-[clamp(36px,4vw,56px)]"
          >
            Many roots.
            <br />
            One table.
          </h2>
          <p className="mt-6 max-w-[480px] text-[14px] leading-relaxed opacity-85">
            India&apos;s food is as diverse as the places it comes from. We
            celebrate that diversity through a menu inspired by regional
            favourites, bold flavours and contemporary interpretations.
          </p>
        </div>
        <div
          data-parallax
          className="relative min-h-[420px] overflow-hidden rounded-[3px]"
        >
          <div
            data-parallax-img
            className="absolute inset-[-10%] will-change-transform"
          >
            <Image
              src={`${ASSET}/images/story-image.avif`}
              alt="The Indique approach"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--ap-taupe)] px-4 py-20 md:px-7">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 md:grid-cols-2 md:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[3px]">
            <Image
              src={`${ASSET}/images/story-i.avif`}
              alt="Food made for the middle"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2
              data-text-split
              data-letters-fade-in
              className="ap-display text-[clamp(36px,4vw,56px)]"
            >
              Made for the middle.
            </h2>
            <p className="mt-6 max-w-[480px] text-[14px] leading-relaxed opacity-85">
              Plates worth passing around, flavours worth discovering and meals
              that bring everyone a little closer.
            </p>
            <h3
              data-text-split
              data-letters-fade-in
              className="ap-display mt-12 text-[clamp(28px,3vw,40px)]"
            >
              Let the evening unfold.
            </h3>
            <p className="mt-4 max-w-[480px] text-[14px] leading-relaxed opacity-85">
              A thoughtful drinks experience made for slow evenings, lively
              conversations and everything in between.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-20 md:px-7">
        <h2
          data-text-split
          data-letters-fade-in
          className="ap-display text-[clamp(36px,4vw,56px)]"
        >
          Our Philosophy
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {philosophy.map((item) => (
            <article
              key={item.title}
              className="rounded-[3px] border border-[var(--ap-ink)]/15 p-6"
            >
              <h3 className="text-[18px] uppercase tracking-[0.04em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed opacity-80">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden text-[var(--ap-cream)]">
        <Image
          src={`${ASSET}/images/story-q.avif`}
          alt="Come hungry to Indique"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-[1440px] flex-col justify-end px-4 py-16 md:px-7">
          <h2
            data-text-split
            data-letters-fade-in
            className="ap-display max-w-[700px] text-[clamp(36px,5vw,64px)]"
          >
            Come hungry.
            <br />
            Leave with a story.
          </h2>
          <p className="mt-5 max-w-[420px] text-[14px] leading-relaxed opacity-90">
            Discover INDIQUE.
          </p>
          <Link
            href="/reservations"
            className="ap-button ap-button--light mt-6 w-fit"
          >
            Reserve a Table
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
