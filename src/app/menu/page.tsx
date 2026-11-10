import { Suspense } from "react";
import Link from "next/link";
import { menuSections } from "@/components/sites/indique/content";
import { InteriorPage } from "@/components/sites/indique/interior-page";
import { MenuCategoryScroll } from "@/components/sites/indique/menu-category-scroll";

export default function Page() {
  return (
    <InteriorPage
      title={
        <>
          A journey
          <br />
          through India.
        </>
      }
      eyebrow="The Indique Menu"
      lead="Familiar favourites, regional inspirations and a few new discoveries. Find something you love."
      cta={{ href: "/reservations", label: "Reserve a Table" }}
    >
      <Suspense fallback={null}>
        <MenuCategoryScroll />
      </Suspense>

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 md:px-7">
        <div className="flex flex-wrap gap-2 border-y border-[var(--ap-ink)]/10 py-4">
          {menuSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="ap-button ap-button--dark !min-h-[40px] !px-3 !text-[11px]"
            >
              {section.title}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[900px] space-y-10 px-4 pb-24 md:px-7">
        {menuSections.map((section) => (
          <article
            key={section.id}
            id={section.id}
            className="ap-menu-section scroll-mt-28 rounded-[4px] bg-[var(--ap-gold)] p-5 text-[var(--ap-ink)] md:p-8"
          >
            <h2 className="ap-display text-[clamp(28px,4vw,42px)]">
              {section.title}
            </h2>
            <p className="mt-2 text-[13px] italic opacity-80">{section.intro}</p>
            <ul className="mt-5">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="border-t border-[var(--ap-ink)]/25 py-3 text-[15px] font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
            {"note" in section && section.note ? (
              <p className="mt-4 text-[12px] leading-relaxed opacity-70">
                {section.note}
              </p>
            ) : null}
          </article>
        ))}

        <p className="text-[13px] leading-relaxed opacity-70">
          Menu selections and availability may change. Please ask our team about
          ingredients and dietary requirements.
        </p>

        <Link href="/reservations" className="ap-button ap-button--dark">
          Reserve a Table
        </Link>
      </section>
    </InteriorPage>
  );
}
