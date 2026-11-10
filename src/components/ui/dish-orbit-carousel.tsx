"use client"

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/*
 * Dish Orbit Carousel: a smart-kitchen-display menu. The plated dish sits on
 * the left; changing dish swings it out over the top on a wide orbit while the
 * next plate swings in from the other side. The two-weight title wipes out and
 * back in (thin line from the right, heavy line from the left), the chef card
 * and its coloured rating badge cross-fade, and a pastel arc behind the scene
 * turns and takes the dish's colour. The page scroll drives it: the section
 * pins and each stretch of scroll brings the next dish, endlessly both ways.
 * Arrows, thumbnails, the side pager, arrow keys and swipes jump too.
 */

export type Dish = {
  /** The thin first title line, e.g. "Char grill". */
  title: string
  /** The heavy second title line, e.g. "Ribeye". */
  subtitle: string
  /** Plate photo, ideally a top-down cut-out (transparent PNG/WebP), square. */
  image: string
  alt?: string
  /** Small line above the title. Defaults to "#n Most loved dish". */
  eyebrow?: string
  /** Two-line label under the thumbnail. Defaults to title + subtitle. */
  label?: string
  rating: number
  chef: string
  /** Kitchen or restaurant, under the chef's name. */
  kitchen?: string
  description: string
  likes: number
  ingredients?: string[]
  /** Badge and band colour: hex or rgb(), so the band can morph between dishes. */
  accent: string
}

export type DishOrbitCarouselProps = {
  dishes: Dish[]
  /** Root height. A definite length: percentages collapse on a host page. */
  height?: string
  /** Optional photo behind the display, e.g. a kitchen wall. Washed by the theme background. */
  backdrop?: string
  /** Scroll on forever: past the last dish comes the first again, and up from the first, the last. */
  loop?: boolean
  /** Embedded display face (Outfit, OFL). Pass null to use the host's font. */
  fontSrc?: string | null
  onPlay?: (dish: Dish, index: number) => void
  onOrder?: (dish: Dish, index: number) => void
  onChange?: (index: number) => void
  className?: string
}

// #region carousel
export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0
  return ((Math.round(i) % n) + n) % n
}

/** Which way to swing when jumping from one dish to another: the shorter way round. */
export function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1
  const fwd = (((to - from) % n) + n) % n
  return fwd <= n - fwd ? 1 : -1
}

/** Scroll stretches in the section: one per dish change, plus one back round to the first when looping. */
export function scrollSteps(n: number, loop: boolean): number {
  return Math.max(0, loop ? n : n - 1)
}

/** The scroll stretch for dish `i` nearest the current one (when looping, dish 0 is also the last stretch). */
export function segmentFor(i: number, current: number, n: number, loop: boolean): number {
  return loop && i === 0 && current > n / 2 ? n : i
}

/** First thumbnail shown in the strip window, keeping the current one in view. */
export function stripStart(index: number, n: number, visible: number): number {
  if (n <= visible) return 0
  return Math.max(0, Math.min(index - 1, n - visible))
}

/** Title font size so a line of `chars` characters fits `width` px at `em` average glyph width. */
export function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em))
}
/**
 * The pastel band: a thick stroke along the plates' orbit circle, tapering at
 * both ends. Angles in degrees, screen space (0 = right, 90 = straight down).
 */
export function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = []
  const inner: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45)
    const c = Math.cos(a)
    const s = Math.sin(a)
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1))
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1))
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z"
}

/** Where the band rests for each dish, as [start, end] angles along the orbit. Measured off the reference. */
export const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]]
export function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length]
}

/** The band mid-swap: it stretches to trail between the outgoing and incoming plate. */
export const ARC_SWEEP = [38, 146]
// #endregion

// The plates' orbit: its pivot sits above the canvas (the .dsh-orbit transform-origin).
const CANVAS_W = 1600
const CANVAS_H = 720
const ORBIT_X = 420
const ORBIT_Y = -460
const ORBIT_R = 820
const SCROLL_PER_DISH = 0.4 // stage heights of scroll per dish
const SWING = 50 // degrees the plate travels round the orbit's pivot
const ITEM = 148 // thumbnail pitch in canvas px
const VISIBLE = 7

const FONT = "dsh-face"

const CSS =
  ".dsh-trk{position:relative;width:100%}" +
  ".dsh-root{position:sticky;top:0;overflow:hidden;width:100%;background:var(--color-background);color:var(--color-foreground);" +
  "font-family:" + FONT + ",ui-sans-serif,system-ui,sans-serif;container-type:inline-size;-webkit-tap-highlight-color:transparent}" +
  ".dsh-root *{box-sizing:border-box}" +
  ".dsh-bd{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;pointer-events:none}" +
  ".dsh-wash{position:absolute;inset:0;background:color-mix(in oklab,var(--color-background) 38%,transparent);pointer-events:none}" +
  ".dsh-dim{position:absolute;inset:0;background:var(--color-background);mix-blend-mode:multiply;opacity:.72;pointer-events:none}" +
  ".dsh-root:focus-visible{outline:2px solid var(--color-primary);outline-offset:-4px}" +
  ".dsh-canvas{position:absolute;left:50%;top:50%;width:" + CANVAS_W + "px;height:" + CANVAS_H + "px;transform:translate(-50%,-50%) scale(var(--dsh-s,1));transform-origin:50% 50%}" +
  ".dsh-arc{position:absolute;left:0;top:0;width:" + CANVAS_W + "px;height:" + CANVAS_H + "px;overflow:visible;pointer-events:none}" +
  ".dsh-btn{appearance:none;border:0;background:none;color:inherit;font:inherit;padding:0;margin:0;cursor:pointer}" +
  ".dsh-btn:focus-visible{outline:2px solid var(--color-primary);outline-offset:3px;border-radius:10px}" +
  ".dsh-pager{position:absolute;left:48px;top:230px;display:flex;flex-direction:column;align-items:center;gap:8px}" +
  ".dsh-dot{width:14px;height:10px;display:grid;place-items:center}" +
  ".dsh-dot i{display:block;width:3px;height:3px;border-radius:3px;background:var(--color-foreground);opacity:.45;transition:height .45s cubic-bezier(.3,.7,.2,1),opacity .3s}" +
  ".dsh-dot[aria-current] i{height:26px;opacity:.9}" +
  ".dsh-dot[aria-current]{height:30px}" +
  ".dsh-dot{transition:height .45s cubic-bezier(.3,.7,.2,1)}" +
  ".dsh-plates{position:absolute;left:120px;top:40px;width:460px;height:460px;touch-action:pan-y}" +
  ".dsh-orbit{position:absolute;inset:0;transform-origin:56% -145%;visibility:hidden;will-change:transform}" +
  ".dsh-orbit>img{display:block;width:460px;height:460px;max-width:none;object-fit:contain;border-radius:0;" +
  "user-select:none;-webkit-user-drag:none;background:transparent;" +
  "filter:drop-shadow(0 36px 50px rgba(44,44,44,.32)) drop-shadow(0 12px 20px rgba(44,44,44,.16))}" +
  ".dsh-head{position:absolute;left:680px;top:160px;width:780px;height:220px}" +
  ".dsh-hd{position:absolute;inset:0;visibility:hidden}" +
  ".dsh-eye{font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin:0 0 12px 2px;opacity:.72}" +
  ".dsh-t1,.dsh-t2{display:block;white-space:nowrap;line-height:1;text-transform:uppercase;margin:0}" +
  ".dsh-t1{font-weight:200;letter-spacing:-.02em;margin-top:4px}" +
  ".dsh-t2{font-weight:800;letter-spacing:-.035em;margin-top:8px;color:color-mix(in oklab,var(--color-foreground) 90%,transparent)}" +
  ".dsh-copy{position:absolute;left:680px;top:400px;width:620px;margin:0;font-size:16px;line-height:1.55;opacity:.72;max-width:36rem}" +
  ".dsh-strip{position:absolute;left:120px;top:540px;width:1240px;height:150px;display:flex;align-items:center}" +
  ".dsh-arrow{width:40px;height:40px;display:grid;place-items:center;flex:none;opacity:.7;transition:opacity .25s}" +
  ".dsh-arrow:hover{opacity:1}" +
  ".dsh-arrow svg{width:12px;height:16px;fill:currentColor}" +
  ".dsh-win{position:relative;width:" + ITEM * VISIBLE + "px;height:150px;overflow:hidden;flex:none;margin:0 6px;" +
  "-webkit-mask-image:linear-gradient(90deg,#000 90%,transparent);mask-image:linear-gradient(90deg,#000 90%,transparent)}" +
  ".dsh-track{position:absolute;left:0;top:0;display:flex;transition:transform .6s cubic-bezier(.65,0,.35,1)}" +
  ".dsh-th{width:" + ITEM + "px;height:150px;display:flex;justify-content:center;padding-top:6px}" +
  ".dsh-th .dsh-btn{width:108px;height:140px;border-radius:18px;display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:10px;transition:background .45s,box-shadow .45s}" +
  ".dsh-th .dsh-btn[aria-current]{background:color-mix(in oklab,var(--color-background) 55%,transparent);box-shadow:0 14px 28px -16px rgba(0,0,0,.28)}" +
  ".dsh-th img{width:78px;height:78px;max-width:none;object-fit:contain;border-radius:0;" +
  "filter:drop-shadow(0 8px 12px rgba(0,0,0,.2));transition:transform .45s;background:transparent}" +
  ".dsh-th .dsh-btn[aria-current] img{transform:scale(1.08)}" +
  ".dsh-th span{font-size:11px;line-height:1.25;text-align:center;font-weight:500;color:color-mix(in oklab,var(--color-foreground) 78%,transparent);max-width:96px}" +
  ".dsh-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
  "@container (max-width:719px){" +
  ".dsh-canvas{position:relative;left:auto;top:auto;width:100%;height:auto;transform:none;display:flex;flex-direction:column;align-items:center;padding:18px 16px 28px}" +
  ".dsh-arc{width:220%;height:auto;left:-70%;top:-40px}" +
  ".dsh-pager{left:12px;top:170px}" +
  ".dsh-plates{position:relative;left:auto;top:auto;width:min(78vw,44svh);height:min(78vw,44svh);margin-top:8px}" +
  ".dsh-orbit>img{width:100%;height:100%}" +
  ".dsh-head{position:relative;left:auto;top:auto;width:100%;height:auto;min-height:110px;margin-top:18px}" +
  ".dsh-hd{text-align:center;transform:none}" +
  ".dsh-copy{position:relative;left:auto;top:auto;width:100%;max-width:28rem;text-align:center;margin:10px auto 0;font-size:14px}" +
  ".dsh-strip{position:relative;left:auto;top:auto;width:100%;max-width:100%;margin-top:18px;justify-content:center}" +
  ".dsh-win{width:min(100%," + ITEM * 4 + "px)}" +
  "}" +
  "@media (prefers-reduced-motion:reduce){.dsh-track,.dsh-dot,.dsh-dot i,.dsh-th .dsh-btn,.dsh-th img{transition:none}}"

const HIDE_1 = "inset(0% 0% 0% 100%)" // thin line: wipes in from the right
const HIDE_2 = "inset(0% 100% 0% 0%)" // heavy line: wipes in from the left
const SHOW = "inset(0% 0% 0% 0%)"

export function DishOrbitCarousel({
  dishes,
  height = "100svh",
  backdrop,
  loop = true,
  fontSrc = null,
  onChange,
  className,
}: DishOrbitCarouselProps) {
  const n = dishes.length
  const [index, setIndex] = useState(0)

  const trackRef = useRef(null as HTMLDivElement | null)
  const rootRef = useRef(null as HTMLDivElement | null)
  const stRef = useRef(null as ScrollTrigger | null)
  const segRef = useRef(0)
  const indexRef = useRef(0)
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])
  const orbits = useRef([] as (HTMLDivElement | null)[])
  const heads = useRef([] as (HTMLDivElement | null)[])
  const copies = useRef([] as (HTMLParagraphElement | null)[])
  const arcRef = useRef(null as SVGPathElement | null)
  const arc = useRef({ a0: 0, a1: 0 })
  const shown = useRef(-1)
  const dirRef = useRef(1 as 1 | -1)
  const tlRef = useRef(null as gsap.core.Timeline | null)
  const reducedRef = useRef(false)
  const swipe = useRef(null as { x: number; y: number } | null)

  // Fit the design canvas to the root. Measured on resize only.
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const fit = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      el.style.setProperty("--dsh-s", String(Math.min(w / CANVAS_W, h / CANVAS_H, 2.4)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => (reducedRef.current = mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  // The swap. Every dish is in the DOM; GSAP only moves the outgoing and incoming ones.
  useLayoutEffect(() => {
    const from = shown.current
    const to = index
    const parts = (i: number) => {
      const head = heads.current[i]
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector(".dsh-eye"),
        t1: head && head.querySelector(".dsh-t1"),
        t2: head && head.querySelector(".dsh-t2"),
        copy: copies.current[i],
      }
    }
    // Writes the band's path only; no layout is read.
    const drawArc = () => arcRef.current?.setAttribute("d", arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 140))
    const rest = arcRest(to)
    const tint = dishes[to] ? dishes[to].accent : "transparent"
    if (tlRef.current) tlRef.current.progress(1).kill()
    const b = parts(to)
    if (from === -1 || from === to || reducedRef.current) {
      for (let i = 0; i < n; i++) if (i !== to) {
        const p = parts(i)
        gsap.set([p.orbit, p.head, p.copy], { autoAlpha: 0 })
      }
      gsap.set([b.orbit, b.head, b.copy, b.eye], { autoAlpha: 1, rotation: 0, y: 0 })
      gsap.set(b.t1, { clipPath: SHOW })
      gsap.set(b.t2, { clipPath: SHOW })
      arc.current.a0 = rest[0]
      arc.current.a1 = rest[1]
      drawArc()
      if (arcRef.current) gsap.set(arcRef.current, { fill: tint })
      shown.current = to
      return
    }
    const a = parts(from)
    const d = dirRef.current
    const tl = gsap.timeline({ onComplete: () => { tlRef.current = null } })
    tlRef.current = tl
    // plate: out over the top on the orbit, the next one swings in from the far side
    tl.to(a.orbit, { rotation: SWING * d, duration: 0.62, ease: "power2.in" }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, 0.62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: 0.95, ease: "power3.out" }, 0.3)
    // title: thin line clips away to the right, heavy line to the left, then the next wipes in
    tl.to(a.t1, { clipPath: HIDE_1, duration: 0.42, ease: "power2.in" }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: 0.42, ease: "power2.in" }, 0.06)
      .to(a.eye, { autoAlpha: 0, duration: 0.25 }, 0)
      .to(a.copy, { autoAlpha: 0, y: -6, duration: 0.28, ease: "power1.in" }, 0.05)
      .set(a.head, { autoAlpha: 0 }, 0.5)
      .set(b.head, { autoAlpha: 1 }, 0.5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.62)
      .fromTo(b.copy, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.62)
    // the band stretches along the orbit with the plates, then settles into the next dish's span, morphing colour
    tl.to(arc.current, { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.6, ease: "power2.inOut", onUpdate: drawArc }, 0)
      .to(arc.current, { a0: rest[0], a1: rest[1], duration: 0.85, ease: "power3.out", onUpdate: drawArc }, 0.6)
    if (arcRef.current) tl.to(arcRef.current, { fill: tint, duration: 1.1, ease: "power1.inOut" }, 0.1)
    shown.current = to
  }, [index, n, dishes])

  useEffect(() => () => { tlRef.current?.kill() }, [])

  const select = (next: number, dir: 1 | -1) => {
    if (next === indexRef.current) return
    dirRef.current = dir
    indexRef.current = next
    setIndex(next)
    onChangeRef.current?.(next)
  }

  // The page scroll drives the dish: the stage sticks, one stretch of scroll per dish.
  // No infinite loop on scroll — past the last dish (or above the first) the page continues.
  const steps = scrollSteps(n, loop)
  useEffect(() => {
    const track = trackRef.current
    if (!track || steps < 1) return
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      // Soft snap between dishes, but release at either end so the page can leave the section.
      snap: {
        snapTo: (value) => {
          if (value <= 0.02 || value >= 0.98) return value > 0.5 ? 1 : 0
          return Math.round(value * steps) / steps
        },
        duration: { min: 0.15, max: 0.45 },
        delay: 0.02,
        ease: "power1.out",
      },
      onUpdate: (self) => {
        const seg = Math.min(n - 1, Math.max(0, Math.round(self.progress * steps)))
        if (seg === segRef.current) return
        const dir = seg > segRef.current ? 1 : -1
        segRef.current = seg
        select(seg, dir)
      },
    })
    stRef.current = trigger
    // Lenis / layout settle — refresh so end points match the real track height.
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      trigger.kill()
      stRef.current = null
    }
  }, [steps, loop, n])

  // Buttons, keys and swipes jump to a dish and move the scroll to its stretch, so the two stay in step.
  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return
    const next = loop ? wrapIndex(to, n) : Math.min(n - 1, Math.max(0, Math.round(to)))
    if (next === index) return
    const st = stRef.current
    const y = st ? st.scroll() : 0
    if (st && y >= st.start - 1 && y <= st.end + 1) {
      const seg = segmentFor(next, segRef.current, n, loop)
      segRef.current = seg
      st.scroll(st.start + ((st.end - st.start) * seg) / Math.max(1, steps))
    }
    select(next, dir ?? stepDirection(index, next, n))
  }
  const step = (d: 1 | -1) => {
    if (!loop && ((d < 0 && index <= 0) || (d > 0 && index >= n - 1))) return
    go(index + d, d)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1) }
  }
  const onPointerDown = (e: PointerEvent) => { swipe.current = { x: e.clientX, y: e.clientY } }
  const onPointerUp = (e: PointerEvent) => {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) step(dx < 0 ? 1 : -1)
  }

  const start = stripStart(index, n, VISIBLE)
  const dish = dishes[index]

  return (
    <div ref={trackRef} className={"dsh-trk" + (className ? " " + className : "")} style={{ height: "calc(" + height + " * " + (1 + steps * SCROLL_PER_DISH) + ")" }}>
    <div
      ref={rootRef}
      className="dsh-root"
      style={{ height }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Dishes"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <style>
        {(fontSrc ? "@font-face{font-family:" + FONT + ";src:url(" + fontSrc + ") format('woff2');font-weight:100 900;font-display:swap}" : "") + CSS}
      </style>
      {backdrop ? <img className="dsh-bd" src={backdrop} alt="" width={1200} height={900} /> : null}
      {backdrop ? <div className="dsh-dim" /> : null}
      {backdrop ? <div className="dsh-wash" /> : null}

      <div className="dsh-canvas">
        <svg className="dsh-arc" viewBox={"0 0 " + CANVAS_W + " " + CANVAS_H} aria-hidden="true">
          <path ref={arcRef} style={{ opacity: 0.28 }} />
        </svg>

        <div className="dsh-pager" role="tablist" aria-label="Choose a dish">
          {dishes.map((d, i) => (
            <button key={i} type="button" role="tab" className="dsh-btn dsh-dot" aria-selected={i === index}
              aria-current={i === index ? "true" : undefined} aria-label={d.title + " " + d.subtitle} onClick={() => go(i)}>
              <i />
            </button>
          ))}
        </div>

        <div className="dsh-plates" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
          {dishes.map((d, i) => (
            <div key={i} ref={(el) => { orbits.current[i] = el }} className="dsh-orbit" aria-hidden={i !== index}>
              <img src={d.image} alt={d.alt ?? d.title + " " + d.subtitle} width={340} height={340} draggable={false} />
            </div>
          ))}
        </div>

        <div className="dsh-head" aria-live="polite">
          {dishes.map((d, i) => (
            <div key={i} ref={(el) => { heads.current[i] = el }} className="dsh-hd" aria-hidden={i !== index}>
              <p className="dsh-eye">{d.eyebrow ?? "#" + (i + 1) + " Most loved dish"}</p>
              <h2 style={{ margin: 0, font: "inherit" }}>
                <span className="dsh-t1" style={{ fontSize: fitSize(d.title.length, 72, 600, 0.54) + "px" }}>{d.title}</span>
                <span className="dsh-t2" style={{ fontSize: fitSize(d.subtitle.length, 86, 600, 0.58) + "px" }}>{d.subtitle}</span>
              </h2>
            </div>
          ))}
        </div>

        {dishes.map((d, i) => (
          <p
            key={"copy-" + i}
            ref={(el) => { copies.current[i] = el }}
            className="dsh-copy"
            aria-hidden={i !== index}
          >
            {d.description}
          </p>
        ))}

        <div className="dsh-strip">
          <button type="button" className="dsh-btn dsh-arrow" aria-label="Previous dish" onClick={() => step(-1)}>
            <svg viewBox="0 0 12 16" aria-hidden="true"><path d="M11 0v16L0 8z" /></svg>
          </button>
          <div className="dsh-win">
            <div className="dsh-track" style={{ transform: "translateX(" + -start * ITEM + "px)" }}>
              {dishes.map((d, i) => (
                <div key={i} className="dsh-th">
                  <button type="button" className="dsh-btn" aria-current={i === index ? "true" : undefined} onClick={() => go(i)}>
                    <img src={d.image} alt="" width={68} height={68} draggable={false} />
                    <span>{d.label ?? d.title + " " + d.subtitle}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="dsh-btn dsh-arrow" aria-label="Next dish" onClick={() => step(1)}>
            <svg viewBox="0 0 12 16" aria-hidden="true"><path d="M1 0v16l11-8z" /></svg>
          </button>
        </div>

      </div>
      <p className="dsh-sr" aria-live="polite">{dish ? "Dish " + (index + 1) + " of " + n + ": " + dish.title + " " + dish.subtitle : ""}</p>
    </div>
    </div>
  )
}

export default DishOrbitCarousel

