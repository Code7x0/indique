"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ASSET,
  drinks,
  location,
  signaturePlates,
} from "./content";
import { HeroScrollStory } from "./hero-scroll-story";
import { MenuCategorySection } from "./menu-category-section";
import { PageShell } from "./page-shell";

function Hero() {
  return <HeroScrollStory />;
}

function Introduction() {
  return (
    <section className="bg-[var(--ap-cream)] px-4 py-6 md:px-6 md:py-8 lg:px-8">
      <div className="grid overflow-hidden bg-[var(--ap-ink)] lg:grid-cols-2">
        <div
          className="flex flex-col justify-center text-[var(--ap-cream)]"
          style={{ padding: "96px var(--ap-pad-x) 64px" }}
        >
          <p data-text-split data-letters-fade-in className="ap-caption mb-4">
            The Spirit of Indique
          </p>
          <h2
            data-text-split
            data-letters-fade-in
            className="ap-h2 ap-h2--lg text-[var(--ap-cream)]"
          >
            India was never
            <br />
            just one flavour.
          </h2>
          <p
            data-fade-up
            className="ap-body mt-5 max-w-[400px] text-[var(--ap-cream)] opacity-90"
          >
            A country of countless traditions, ingredients and culinary stories.
            At INDIQUE, India&apos;s many kitchens come together through vibrant
            food, thoughtful drinks and the joy of sharing a table.
          </p>
          <Link
            href="/about"
            data-text-split
            data-letters-fade-in-hover
            className="ap-button ap-button--light mt-6 w-fit"
          >
            Our Story
          </Link>
        </div>

        <div className="relative min-h-[420px] lg:min-h-full">
          <Image
            src={`${ASSET}/images/intro-food.jpg`}
            alt="Karahi curry with saffron rice on a copper tray"
            fill
            quality={100}
            unoptimized
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

function SignatureDishes() {
  return (
    <section className="bg-[var(--ap-ink)]">
      <div className="grid w-full lg:grid-cols-2">
        <div className="bg-[var(--ap-ink)] p-5 md:p-6 lg:p-7">
          <div
            data-fade-up
            className="flex h-full min-h-full flex-col justify-between rounded-none border border-[var(--ap-ink)] bg-[var(--ap-gold)] pb-6 text-[var(--ap-ink)]"
          >
            <div>
              <div className="flex items-start justify-between px-5 pb-7 pt-6 md:px-6">
                <h3
                  data-text-split
                  data-letters-fade-in
                  className="ap-h3 max-w-[340px]"
                >
                  a taste of indique
                </h3>
              </div>
              <ul>
                {signaturePlates.map((item) => (
                  <li
                    key={item.name}
                    className="border-t-[0.8px] border-[var(--ap-ink)] px-5 py-3 md:px-6"
                  >
                    <p className="mb-1.5 text-[12.96px] font-medium leading-none">
                      {item.name}
                    </p>
                    <p className="text-[12.24px] leading-[1.4] opacity-85">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-5 pt-4 md:px-6">
              <Link
                href="/menu"
                data-text-split
                data-letters-fade-in-hover
                className="ap-button ap-button--dark ap-button--block"
              >
                View the Menu
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[var(--ap-ink)] p-5 md:p-6 lg:p-7">
          <div
            data-fade-up
            className="flex h-full min-h-full flex-col justify-between overflow-hidden rounded-none border border-[var(--ap-ink)] bg-[var(--ap-cream)] text-[var(--ap-ink)]"
          >
            <div className="px-6 pb-8 pt-8 md:px-8 md:pt-10">
              <p className="ap-caption mb-3 opacity-70">A Taste of Indique</p>
              <h3
                data-text-split
                data-letters-fade-in
                className="ap-h3"
              >
                Made to be
                <br />
                remembered.
              </h3>
              <p className="ap-body mt-4 max-w-[28rem]">
                A little familiar. A little unexpected. Always worth another
                bite.
              </p>
              <div className="mt-7">
                <Link
                  href="/menu"
                  data-text-split
                  data-letters-fade-in-hover
                  className="ap-button ap-button--filled"
                >
                  <span className="ap-button-box">View the Menu</span>
                </Link>
              </div>
            </div>

            <div
              data-parallax
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16 / 11", minHeight: 280 }}
            >
              <div
                data-parallax-img
                className="absolute inset-[-6%] will-change-transform"
              >
                <Image
                  src={`${ASSET}/images/featured-menu.jpg`}
                  alt="South Indian thali with rice and banana leaf"
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesOrbit() {
  return <MenuCategorySection />;
}

function TandoorSection() {
  return (
    <section
      data-parallax
      className="relative min-h-[48vh] overflow-hidden bg-[var(--ap-ink)] text-[var(--ap-cream)] md:min-h-[520px]"
    >
      <div
        data-parallax-img
        className="absolute inset-[-10%] will-change-transform"
      >
        <Image
          src={`${ASSET}/images/sections/tandoor-smoke.jpg`}
          alt="Smoke rising from the grill at Indique"
          fill
          quality={100}
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(6, 5, 4, 0.38)" }}
      />
      <div
        className="relative z-10 mx-auto flex min-h-[48vh] w-full max-w-[900px] flex-col items-center justify-center text-center md:min-h-[520px]"
        style={{ padding: "56px var(--ap-pad-x)" }}
      >
        <p data-text-split data-letters-fade-in className="ap-caption mb-4">
          From the Fire
        </p>
        <h2
          data-text-split
          data-letters-fade-in
          className="ap-h2 text-[var(--ap-cream)]"
        >
          A little smoke.
          <br />
          A lot of flavour.
        </h2>
        <p
          data-fade-up
          className="ap-body mx-auto mt-4 max-w-[38ch] text-[var(--ap-cream)] opacity-90"
        >
          An Indian classic, brought to the table with warmth, character and a
          touch of fire.
        </p>
        <Link
          href="/menu#tandoor-appetizers"
          data-text-split
          data-letters-fade-in-hover
          className="ap-button ap-button--light mt-6"
        >
          Explore Tandoor
        </Link>
      </div>
    </section>
  );
}

function BarSection() {
  return (
    <section className="bg-[var(--ap-ink)]">
      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-[648px_1fr]">
        <div
          className="sticky top-0 flex min-h-[100svh] flex-col justify-center bg-[var(--ap-cream)] text-[var(--ap-ink)] lg:max-h-screen"
          style={{ padding: "32px 28px" }}
        >
          <div>
            <p className="ap-caption mb-3 opacity-70">The Indique Bar</p>
            <h3 data-text-split data-letters-fade-in className="ap-h3">
              Good spirits.
              <br />
              Better stories.
            </h3>
            <p data-fade-up className="ap-body mt-4 max-w-[360px] opacity-85">
              From refreshing pours to playful Indian-inspired creations,
              there&apos;s always something worth raising a glass to.
            </p>
            <Link
              href="/menu#drinks"
              data-text-split
              data-letters-fade-in-hover
              className="ap-button ap-button--dark mt-5"
            >
              Explore Drinks
            </Link>
          </div>
          <ul data-fade-up className="mt-8 space-y-0">
            {drinks.map((drink) => (
              <li
                key={drink.name}
                className="border-t-[0.8px] border-[var(--ap-ink)]/25 py-3"
              >
                <p className="mb-1 text-[12.96px] font-medium leading-none">
                  {drink.name}
                </p>
                <p className="text-[12.24px] leading-[1.4] opacity-75">
                  {drink.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1.5 p-1.5">
          {[
            {
              src: `${ASSET}/images/cocktails-1.jpg`,
              alt: "Iced tea cocktail with lime and mint",
            },
            {
              src: `${ASSET}/images/cocktails-2.jpg`,
              alt: "Sparkling drink poured into a wine glass",
            },
          ].map((item) => (
            <div
              key={item.src}
              data-parallax
              className="relative min-h-[70vh] overflow-hidden md:min-h-[778px]"
            >
              <div
                data-parallax-img
                className="absolute inset-[-10%] will-change-transform"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width:1024px) 100vw, 55vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="ap-experience relative overflow-hidden text-[var(--ap-cream)]">
      <div
        className="relative z-10 mx-auto flex min-h-[68vh] w-full max-w-[900px] flex-col items-center justify-center text-center md:min-h-[700px]"
        style={{ padding: "72px var(--ap-pad-x)" }}
      >
        <p
          data-text-split
          data-letters-fade-in
          className="ap-caption mb-3 !text-[var(--ap-cream)] opacity-60"
        >
          More Than a Meal
        </p>
        <h2
          data-text-split
          data-letters-fade-in
          className="ap-h2 !text-[var(--ap-cream)]"
        >
          Come for the food.
          <br />
          Stay for the moment.
        </h2>

        <div className="mx-auto mt-7 flex max-w-[44ch] flex-col items-center gap-2.5">
          <p data-fade-up className="ap-body !text-[var(--ap-cream)] opacity-82">
            Long conversations. Full tables. One more order for the middle. Some
            evenings are simply better spent together.
          </p>
          <p data-fade-up className="ap-body !text-[var(--ap-cream)] opacity-82">
            Whether it&apos;s a casual dinner, a celebration or an evening at the
            bar, there&apos;s a place for you at INDIQUE.
          </p>
        </div>

        <Link
          href="/reservations"
          data-text-split
          data-letters-fade-in-hover
          className="ap-button ap-button--glass mt-7 backdrop-blur-[12px]"
        >
          Reserve Your Table
        </Link>

        <p
          data-text-split
          data-letters-fade-in
          className="ap-h3 mt-10 !text-[var(--ap-cream)]"
        >
          Good food is better shared.
        </p>
      </div>
    </section>
  );
}

function StoryPreview() {
  return (
    <section
      data-parallax
      className="relative min-h-[70vh] overflow-hidden text-[var(--ap-cream)] md:min-h-[760px]"
    >
      <div
        data-parallax-img
        className="absolute inset-[-10%] will-change-transform"
      >
        <Image
          src={`${ASSET}/images/sections/story-spices.jpg`}
          alt="Indian spices — turmeric, cardamom, cloves and cumin"
          fill
          quality={100}
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 6, 5, 0.78)" }}
      />
      <div
        className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-[820px] flex-col items-center justify-center text-center md:min-h-[760px]"
        style={{ padding: "72px var(--ap-pad-x)" }}
      >
        <p data-text-split data-letters-fade-in className="ap-caption mb-4">
          Our Story
        </p>
        <h2
          data-text-split
          data-letters-fade-in
          className="ap-h2 text-[var(--ap-cream)]"
        >
          Rooted in India.
          <br />
          Made for today.
        </h2>
        <p
          data-fade-up
          className="ap-body mx-auto mt-6 max-w-[40ch] text-[var(--ap-cream)] opacity-90"
        >
          India&apos;s culinary story is too vast for a single flavour. We bring
          together its many influences in one contemporary dining experience.
        </p>
        <Link
          href="/about"
          data-text-split
          data-letters-fade-in-hover
          className="ap-button ap-button--light mt-7"
        >
          Discover Indique
        </Link>
      </div>
    </section>
  );
}

function ReservationCta() {
  return (
    <section className="bg-[var(--ap-ink)] text-[var(--ap-cream)]">
      <div
        className="mx-auto flex w-full max-w-[720px] flex-col items-center text-center"
        style={{ padding: "96px var(--ap-pad-x)" }}
      >
        <h2
          data-text-split
          data-letters-fade-in
          className="ap-h2 text-[var(--ap-cream)]"
        >
          Your table
          <br />
          is waiting.
        </h2>
        <p
          data-fade-up
          className="ap-body mx-auto mt-4 max-w-[40ch] text-[var(--ap-cream)] opacity-90"
        >
          Good food is better shared. Make a reservation and join us at
          INDIQUE.
        </p>
        <Link
          href="/reservations"
          data-text-split
          data-letters-fade-in-hover
          className="ap-button ap-button--gold mt-8"
        >
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="bg-[var(--ap-cream)] text-[var(--ap-ink)]">
      <div
        className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-2"
        style={{ padding: "80px var(--ap-pad-x)" }}
      >
        <div>
          <p
            data-text-split
            data-letters-fade-in
            className="ap-caption mb-3 opacity-70"
          >
            Find Us
          </p>
          <h2 data-text-split data-letters-fade-in className="ap-h2">
            Come on in.
          </h2>
          <p data-fade-up className="ap-body mt-4 max-w-[420px] opacity-85">
            Good food, good company and a table waiting to be discovered.
          </p>
          <div className="mt-8 space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] opacity-60">
                Address
              </p>
              <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed">
                {location.address}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] opacity-60">
                Hours
              </p>
              <ul className="mt-2 space-y-1 text-[14px]">
                {location.hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] opacity-60">
                Contact
              </p>
              <p className="mt-2 text-[14px]">{location.phone}</p>
            </div>
          </div>
          <a
            href={location.directionsUrl}
            data-text-split
            data-letters-fade-in-hover
            className="ap-button ap-button--dark mt-8"
          >
            Get Directions
          </a>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[3px] bg-[var(--ap-taupe)] lg:min-h-full">
          <Image
            src={`${ASSET}/images/story-i.avif`}
            alt="Visit Indique"
            fill
            className="object-cover opacity-90"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-6">
            <p className="text-[13px] text-[var(--ap-cream)] opacity-90">
              Map placeholder — add confirmed location embed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <PageShell headerTone="light">
      <Hero />
      <Introduction />
      <CategoriesOrbit />
      <SignatureDishes />
      <TandoorSection />
      <BarSection />
      <ExperienceSection />
      <StoryPreview />
      <ReservationCta />
      <LocationSection />
    </PageShell>
  );
}
