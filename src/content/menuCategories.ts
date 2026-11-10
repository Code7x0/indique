export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  order: number;
};

const CATEGORY_IMG = "/images/categories";

export const menuCategories: MenuCategory[] = [
  {
    id: "small-plates",
    slug: "small-plates",
    name: "Small Plates",
    description: "Small beginnings. Big flavours.",
    image: `${CATEGORY_IMG}/small-plates.webp`,
    alt: "Assorted Indian small plates and sharing bites",
    order: 1,
  },
  {
    id: "chakna",
    slug: "chakna",
    name: "Chakna",
    description: "Made for sharing. Best enjoyed together.",
    image: `${CATEGORY_IMG}/chakna.webp`,
    alt: "Indian bar snacks and crunchy savoury bites",
    order: 2,
  },
  {
    id: "tandoor-appetizers",
    slug: "tandoor-appetizers",
    name: "Tandoor Appetizers",
    description: "Smoky aromas. Straight from the fire.",
    image: `${CATEGORY_IMG}/tandoor-appetizers.webp`,
    alt: "Charred tandoor appetizers and grilled kebabs",
    order: 3,
  },
  {
    id: "entrees",
    slug: "entrees",
    name: "Entrées",
    description: "The heart of every good meal.",
    image: `${CATEGORY_IMG}/entrees.webp`,
    alt: "Rich Indian curry entrée in a ceramic bowl",
    order: 4,
  },
  {
    id: "sides",
    slug: "sides",
    name: "Sides",
    description: "The perfect companions to the table.",
    image: `${CATEGORY_IMG}/sides.webp`,
    alt: "Indian dal and traditional side dishes",
    order: 5,
  },
  {
    id: "breads",
    slug: "breads",
    name: "Breads",
    description: "Freshly made. Ready to share.",
    image: `${CATEGORY_IMG}/breads.webp`,
    alt: "Fresh blistered Indian naan breads",
    order: 6,
  },
  {
    id: "desserts",
    slug: "desserts",
    name: "Desserts",
    description: "A sweet ending, always.",
    image: `${CATEGORY_IMG}/desserts.webp`,
    alt: "Premium Indian dessert composition",
    order: 7,
  },
  {
    id: "drinks",
    slug: "drinks",
    name: "Drinks",
    description: "Something refreshing. Something unexpected.",
    image: `${CATEGORY_IMG}/drinks.webp`,
    alt: "Signature Indian-inspired cocktail",
    order: 8,
  },
];

export const menuCategorySlugs = menuCategories.map((c) => c.slug);

export function getMenuCategory(slug: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.slug === slug);
}
