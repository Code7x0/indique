# INDIQUE — page brief

Source: https://indique.example/ (Webflow + GSAP/Lenis/SplitType/Splide)

## Route map

| Source | Local | Notes |
|---|---|---|
| `/` | `/` | Homepage (first-pass focus) |
| `/catering` | `/catering` | |
| `/gift-cards` | `/gift-cards` | |
| `/about` | `/about` | |
| `/contact` | `/contact` | |
| `/menu` | `/menu` | |
| `/store` | `/store` | |
| `/privacy-policy` | `/privacy-policy` | |
| `/terms-and-conditions` | `/terms-and-conditions` | |
| `/cookie-policy` | `/cookie-policy` | |
| OpenTable / ToastTab | external | keep outbound |

## Design tokens

- Cream: `#D8CBB8` / `rgb(216, 203, 184)` — body bg, hero type, gift/testimonials
- Warm taupe: `#BFB4A3` / `rgb(191, 180, 163)` — catering band
- Ink: `#2C2C2C` / `rgb(44, 44, 44)` — body text
- Footer dark: `#292622` / `rgb(41, 38, 34)`
- Display: TT Ramillas Variable (weight ~300), tracking tight
- UI/body: Satoshi 400/500/700

## Homepage sections (desktop 1440)

1. **Header** fixed — logo left; links; Reserve dropdown; Contact; Menu/Order sticky CTAs
2. **Hero** full viewport — dark dining photo, “FLAVORS / THAT STAY”, ratings pill
3. **Video** — sticky copy “The Spirit of Indian Dining” over looping video
4. **Featured menu** — SIGNATURE PLATES + dish list + food photo; classic roots copy + Reserve CTA
5. **Catering** — large typography + three feature cards (images)
6. **Drinks** — sticky left cream panel + cocktail list; cocktail photos
7. **Gift card** — cream section with hall image and CTAs
8. **Fullsize** — “Rooted in Experience” over hall photo
9. **Testimonials** — rating + marquee/splide reviews
10. **Footer** — locations, hours, contact, newsletter, link columns, wordmark

## Interactions

- Lenis smooth scroll
- GSAP / ScrollTrigger reveals & sticky scenes
- Reserve / Order dropdowns (Ocala vs Gainesville)
- Mobile bottom bar: Menu | Order Now
- Splide testimonial carousel

## Assets

Stored under `public/sites/indique/` (fonts, images, video).
