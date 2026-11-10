import Link from "next/link";
import { brand, location, navLinks, socials } from "./content";

function isConfirmed(value: string | undefined | null): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/\[ADD\b/i.test(trimmed)) return false;
  if (/\.example\b/i.test(trimmed)) return false;
  if (trimmed === "tel:" || trimmed === "#directions") return false;
  return true;
}

function isConfiguredSocial(href: string): boolean {
  return /^https?:\/\//i.test(href.trim());
}

export function SiteFooter() {
  const address = isConfirmed(location.address) ? location.address : null;
  const phone = isConfirmed(location.phone) ? location.phone : null;
  const phoneHref = isConfirmed(location.phoneHref) ? location.phoneHref : null;
  const email = isConfirmed(location.email) ? location.email : null;
  const emailHref = isConfirmed(location.emailHref)
    ? location.emailHref
    : null;
  const hours = location.hours.filter(isConfirmed);
  const activeSocials = socials.filter((s) => isConfiguredSocial(s.href));
  const hasDetails =
    Boolean(address) ||
    Boolean(phone) ||
    Boolean(email) ||
    hours.length > 0;
  const hasContact = hasDetails || activeSocials.length > 0;

  return (
    <footer className="ap-footer">
      <div className="ap-footer__inner">
          <div
            className={`ap-footer__grid${hasContact ? "" : " ap-footer__grid--two"}`}
          >
            <div className="ap-footer__brand" data-fade-up>
              <p className="ap-footer__brand-name">{brand.name}</p>
              <p className="ap-footer__brand-tagline">{brand.tagline}</p>
              <p className="ap-footer__brand-line">{brand.line}</p>
              <p className="ap-footer__brand-blurb">{brand.blurb}</p>
            </div>

            <nav className="ap-footer__nav" aria-label="Footer">
              <p className="ap-footer__eyebrow">Explore</p>
              <ul className="ap-footer__link-list">
                {navLinks.map((link) => (
                  <li key={link.href} data-fade-up>
                    <Link href={link.href} className="ap-footer__link">
                      <span>{link.label}</span>
                      <span className="ap-footer__link-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {hasContact ? (
              <div className="ap-footer__contact">
                {hasDetails ? (
                  <>
                    <p className="ap-footer__eyebrow">Get in Touch</p>
                    <div className="ap-footer__contact-block" data-fade-up>
                      {address ? (
                        <p className="ap-footer__contact-text whitespace-pre-line">
                          {address}
                        </p>
                      ) : null}
                      {phone ? (
                        phoneHref ? (
                          <a
                            href={phoneHref}
                            className="ap-footer__contact-text ap-footer__contact-link"
                          >
                            {phone}
                          </a>
                        ) : (
                          <p className="ap-footer__contact-text">{phone}</p>
                        )
                      ) : null}
                      {email && emailHref ? (
                        <a
                          href={emailHref}
                          className="ap-footer__contact-text ap-footer__contact-link"
                        >
                          {email}
                        </a>
                      ) : null}
                      {hours.length > 0 ? (
                        <ul className="ap-footer__hours">
                          {hours.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </>
                ) : null}

                {activeSocials.length > 0 ? (
                  <div
                    className={`ap-footer__social${hasDetails ? "" : " ap-footer__social--solo"}`}
                    data-fade-up
                  >
                    <p className="ap-footer__eyebrow">Follow Along</p>
                    <ul className="ap-footer__link-list">
                      {activeSocials.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="ap-footer__link"
                          >
                            <span>{s.label}</span>
                            <span
                              className="ap-footer__link-arrow"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="ap-footer__rule" aria-hidden="true" />

          <p
            data-fade-up
            data-text-split
            data-letters-fade-in
            className="ap-footer__wordmark"
          >
            {brand.name}
          </p>

          <div className="ap-footer__rule" aria-hidden="true" />

          <div className="ap-footer__bottom">
            <p>
              © {new Date().getFullYear()} {brand.name}. ALL RIGHTS RESERVED.
            </p>
            <p>{brand.tagline}</p>
          </div>
      </div>
    </footer>
  );
}
