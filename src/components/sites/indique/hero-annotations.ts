export type HeroIngredientAnnotation = {
  id: string;
  label: string;
  anchor: { x: number; y: number };
  labelPosition: { x: number; y: number };
  side: "left" | "right";
  start: number;
  end: number;
};

/**
 * Callouts mapped to what’s actually on hero-dish-3d:
 * seared paneer, tomato gravy, dried chilli, cinnamon, coriander.
 * Anchors sit on the food; labels sit outside the plate rim.
 */
export const heroIngredientAnnotations: HeroIngredientAnnotation[] = [
  {
    id: "coriander",
    label: "Fresh coriander",
    anchor: { x: 0.36, y: 0.3 },
    labelPosition: { x: 0.06, y: 0.14 },
    side: "left",
    start: 0.7,
    end: 0.78,
  },
  {
    id: "chilli",
    label: "Dried Kashmiri chilli",
    anchor: { x: 0.52, y: 0.28 },
    labelPosition: { x: 0.94, y: 0.14 },
    side: "right",
    start: 0.74,
    end: 0.82,
  },
  {
    id: "paneer",
    label: "Seared paneer cubes",
    anchor: { x: 0.4, y: 0.46 },
    labelPosition: { x: 0.05, y: 0.42 },
    side: "left",
    start: 0.78,
    end: 0.86,
  },
  {
    id: "cinnamon",
    label: "Whole cinnamon",
    anchor: { x: 0.62, y: 0.48 },
    labelPosition: { x: 0.95, y: 0.48 },
    side: "right",
    start: 0.82,
    end: 0.9,
  },
  {
    id: "gravy",
    label: "Tomato–cashew gravy",
    anchor: { x: 0.48, y: 0.6 },
    labelPosition: { x: 0.06, y: 0.78 },
    side: "left",
    start: 0.86,
    end: 0.94,
  },
];

/** Crisp orthogonal leader: anchor → horizontal → vertical → label. */
export function heroAnnotationPath(
  annotation: HeroIngredientAnnotation,
  size = 1000,
): { ax: number; ay: number; lx: number; ly: number; d: string } {
  const ax = annotation.anchor.x * size;
  const ay = annotation.anchor.y * size;
  const lx = annotation.labelPosition.x * size;
  const ly = annotation.labelPosition.y * size;
  const midX =
    annotation.side === "left"
      ? ax - Math.max(56, (ax - lx) * 0.5)
      : ax + Math.max(56, (lx - ax) * 0.5);

  return {
    ax,
    ay,
    lx,
    ly,
    d: `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${midX.toFixed(1)} ${ay.toFixed(1)} L ${midX.toFixed(1)} ${ly.toFixed(1)} L ${lx.toFixed(1)} ${ly.toFixed(1)}`,
  };
}
