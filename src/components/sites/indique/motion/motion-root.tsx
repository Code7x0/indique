"use client";

import { ScrollEffects } from "./scroll-effects";
import { SmoothScroll } from "./smooth-scroll";
import { TextSplitAnimations } from "./text-split";

export function MotionRoot() {
  return (
    <>
      <SmoothScroll />
      <TextSplitAnimations />
      <ScrollEffects />
    </>
  );
}
