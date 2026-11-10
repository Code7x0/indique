export const ASSET = "/sites/indique";

export const brand = {
  name: "INDIQUE",
  tagline: "ALL OF INDIA. ONE PLATE.",
  line: "A little bit of everywhere. A whole lot of India.",
  blurb:
    "A contemporary Indian restaurant and bar celebrating the many flavours, traditions and stories of India.",
  email: "hello@indique.example",
  emailHref: "mailto:hello@indique.example",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
] as const;

/** Header left links — Menu & Reserve sit on the right actions */
export const primaryNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
] as const;

export const location = {
  name: "Indique",
  address: "[ADD CONFIRMED ADDRESS]",
  phone: "[ADD CONFIRMED PHONE NUMBER]",
  phoneHref: "tel:",
  email: brand.email,
  emailHref: brand.emailHref,
  hours: ["[ADD CONFIRMED DAYS AND HOURS]"],
  directionsUrl: "#directions",
} as const;

export const socials = [
  { href: "#instagram", label: "Instagram" },
  { href: "#facebook", label: "Facebook" },
] as const;

export const signaturePlates = [
  {
    name: "Spinach & Kale Chaat",
    description: "Crisp greens, bright chutneys, and a punch of spice.",
  },
  {
    name: "Chicken Tikka Bao Bun",
    description: "Smoky tikka tucked into a soft bao — made for sharing.",
  },
  {
    name: "Butter Chicken",
    description: "The classic, silky and rich — always worth another bite.",
  },
  {
    name: "Lamb Chops",
    description: "Charred from the tandoor, bold and fragrant.",
  },
  {
    name: "Parda Dum Biryani",
    description: "Sealed, slow-cooked, and layered with aroma.",
  },
  {
    name: "Daab Chingari Prawns",
    description: "Coastal heat meeting a contemporary plate.",
  },
  {
    name: "Dark Chocolate Bomb",
    description: "A sweet ending with drama at the table.",
  },
  {
    name: "Guava Spritzer",
    description: "Refreshing, unexpected, and easy to raise a glass to.",
  },
] as const;

export const menuCategories = [
  {
    title: "Small Plates",
    description: "A little something to begin.",
    href: "/menu#small-plates",
  },
  {
    title: "Chakna",
    description: "The perfect reason for another round.",
    href: "/menu#chakna",
  },
  {
    title: "Tandoor Appetizers",
    description: "Smoky, charred and straight from the fire.",
    href: "/menu#tandoor-appetizers",
  },
  {
    title: "Entrées",
    description: "The heart of every good meal.",
    href: "/menu#entrees",
  },
  {
    title: "Sides",
    description: "The perfect companions.",
    href: "/menu#sides",
  },
  {
    title: "Breads",
    description: "Freshly made for the table.",
    href: "/menu#breads",
  },
  {
    title: "Desserts",
    description: "A sweet ending, always.",
    href: "/menu#desserts",
  },
  {
    title: "Drinks",
    description: "Something refreshing. Something unexpected.",
    href: "/menu#drinks",
  },
] as const;

const ORBIT_IMG = "/sites/indique/images/orbit/cutouts";

/** Orbit carousel — all Indique menu categories (floating cutout plates) */
export const orbitCategories = [
  {
    title: "Small",
    subtitle: "Plates",
    label: "Small plates",
    eyebrow: "01 / 08  ·  Begin here",
    href: "/menu#small-plates",
    image: `${ORBIT_IMG}/small-plates.png`,
    alt: "Vibrant Indian small plates and chaat",
    rating: 4.8,
    chef: "Indique Kitchen",
    kitchen: "Small Plates",
    description: "A little something to begin — crisp, bright, and made for sharing.",
    likes: 96,
    ingredients: ["Chaat", "Chutneys", "Spice", "Crunch"],
    accent: "#d49653",
  },
  {
    title: "Bar",
    subtitle: "Chakna",
    label: "Chakna bites",
    eyebrow: "02 / 08  ·  With your drink",
    href: "/menu#chakna",
    image: `${ORBIT_IMG}/chakna.png`,
    alt: "Spiced bar snacks for sharing",
    rating: 4.6,
    chef: "Indique Bar",
    kitchen: "Chakna",
    description: "The perfect reason for another round — salty, spiced, and sociable.",
    likes: 74,
    ingredients: ["Nuts", "Spice mix", "Crisps", "Pickle"],
    accent: "#c4784a",
  },
  {
    title: "Tandoor",
    subtitle: "Fire",
    label: "Tandoor apps",
    eyebrow: "03 / 08  ·  From the clay oven",
    href: "/menu#tandoor-appetizers",
    image: `${ORBIT_IMG}/tandoor.png`,
    alt: "Charred tandoor appetizers",
    rating: 4.9,
    chef: "Indique Kitchen",
    kitchen: "Tandoor Appetizers",
    description: "Smoky, charred and straight from the fire.",
    likes: 128,
    ingredients: ["Yogurt marinade", "Char", "Masala"],
    accent: "#c45c3e",
  },
  {
    title: "Main",
    subtitle: "Entrées",
    label: "Entrées",
    eyebrow: "04 / 08  ·  Heart of the meal",
    href: "/menu#entrees",
    image: `${ORBIT_IMG}/entrees.png`,
    alt: "Rich Indian entrée curry",
    rating: 4.9,
    chef: "Indique Kitchen",
    kitchen: "Entrées",
    description: "The heart of every good meal — familiar favourites and unexpected finds.",
    likes: 210,
    ingredients: ["Curry", "Gravy", "Protein", "Aroma"],
    accent: "#e8a05a",
  },
  {
    title: "On the",
    subtitle: "Side",
    label: "Sides",
    eyebrow: "05 / 08  ·  Perfect companions",
    href: "/menu#sides",
    image: `${ORBIT_IMG}/sides.png`,
    alt: "Indian side dishes and dal",
    rating: 4.5,
    chef: "Indique Kitchen",
    kitchen: "Sides",
    description: "The perfect companions — dals, greens, and everything in between.",
    likes: 61,
    ingredients: ["Dal", "Vegetables", "Tempering"],
    accent: "#b8a078",
  },
  {
    title: "Fresh",
    subtitle: "Breads",
    label: "Breads",
    eyebrow: "06 / 08  ·  Made for the table",
    href: "/menu#breads",
    image: `${ORBIT_IMG}/breads.png`,
    alt: "Fresh Indian flatbreads",
    rating: 4.7,
    chef: "Indique Kitchen",
    kitchen: "Breads",
    description: "Freshly made for the table — soft, blistered, and ready to scoop.",
    likes: 142,
    ingredients: ["Flour", "Ghee", "Tandoor"],
    accent: "#d4b896",
  },
  {
    title: "Sweet",
    subtitle: "Ending",
    label: "Desserts",
    eyebrow: "07 / 08  ·  Finish strong",
    href: "/menu#desserts",
    image: `${ORBIT_IMG}/desserts.png`,
    alt: "Indian-inspired dessert",
    rating: 4.8,
    chef: "Indique Kitchen",
    kitchen: "Desserts",
    description: "A sweet ending, always — drama at the table optional, delight guaranteed.",
    likes: 88,
    ingredients: ["Chocolate", "Cardamom", "Cream"],
    accent: "#8b6b4a",
  },
  {
    title: "Raise a",
    subtitle: "Glass",
    label: "Drinks",
    eyebrow: "08 / 08  ·  Sip & stay",
    href: "/menu#drinks",
    image: `${ORBIT_IMG}/drinks.png`,
    alt: "Cocktail and refreshing drinks",
    rating: 4.7,
    chef: "Indique Bar",
    kitchen: "Drinks",
    description: "Something refreshing. Something unexpected — cocktails, spritzers, and more.",
    likes: 115,
    ingredients: ["Spirits", "Citrus", "Spice", "Ice"],
    accent: "#9fcbe8",
  },
] as const;

export const menuSections = [
  {
    id: "small-plates",
    title: "Small Plates",
    intro: "Small beginnings. Big flavours.",
    items: [
      "Spinach & Kale Chaat",
      "Crispy Garlic Cauliflower",
      "Crispy Okra Fries",
      "Eggplant Dip with Fig Naan",
      "Whipped Chana",
      "Samosa Trio",
      "Chicken Tikka Bao Bun",
      "Butter Chicken Chops",
      "Chicken Ghee Roast Tacos",
      "Desi Style Lamb Tacos",
      "Kheema Pav",
      "Koliwada",
    ],
  },
  {
    id: "chakna",
    title: "Chakna",
    intro: "Made for sharing. Best enjoyed with good company.",
    items: ["Chana Koliwada", "Fritters Platter"],
    note: "Additional items arriving soon.",
  },
  {
    id: "tandoor-appetizers",
    title: "Tandoor Appetizers",
    intro: "Smoky aromas. Bold flavours. Straight from the fire.",
    items: [
      "Tikka",
      "Tandoori",
      "Malai Chicken Tikka",
      "Tandoori Chicken Momos",
      "Chicken Bihari / Banjara Kabab",
      "Chicken Sheekh Kabab",
      "Lamb Chops",
    ],
  },
  {
    id: "entrees",
    title: "Entrées",
    intro: "The heart of the table.",
    items: [
      "Jackfruit Malai Kofta",
      "Saag",
      "Tikka Masala",
      "Korma",
      "Butter Chicken",
      "Vindaloo",
      "Champaran Goat",
      "Parda Dum Biryani",
      "Lamb Shank",
      "Burgundi Rogan Josh",
      "Daab Chingari Prawns",
    ],
  },
  {
    id: "sides",
    title: "Sides",
    intro: "The little things that complete the meal.",
    items: [
      "Yellow Daal Tadka",
      "Daal Makhani",
      "Jeera Rice",
      "Mango Chutney",
      "Onion Chutney",
    ],
  },
  {
    id: "breads",
    title: "Breads",
    intro: "Made for the last bit of gravy.",
    items: [
      "Naan",
      "Rosemary Garlic Naan",
      "Kheema Cilantro Naan",
      "Whole Wheat Roti",
      "Dry Fruit Naan",
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    intro: "Always leave room for something sweet.",
    items: ["Fruit Custard", "Kulfi Trio", "Dark Chocolate Bomb"],
  },
  {
    id: "drinks",
    title: "Drinks",
    intro: "Something to sip. Something to remember.",
    items: ["Guava Spritzer", "Passionfruit Lassi", "Jamun Mojito"],
    note: "Additional bar categories and beverages will be added as the expanded bar menu is approved.",
  },
] as const;

export const drinks = [
  {
    name: "Guava Spritzer",
    description: "Bright, refreshing, and easy to keep pouring.",
  },
  {
    name: "Passionfruit Lassi",
    description: "Tropical, creamy, and playfully Indian-inspired.",
  },
  {
    name: "Jamun Mojito",
    description: "Tart jamun meeting cool mint — unexpected and memorable.",
  },
] as const;

export const philosophy = [
  {
    title: "Rooted in India",
    body: "Inspired by the country's extraordinary culinary diversity.",
  },
  {
    title: "Flavour First",
    body: "A celebration of ingredients, spices and character.",
  },
  {
    title: "Made to Share",
    body: "Because the best tables are never just for one.",
  },
  {
    title: "Hospitality Always",
    body: "Good food matters. How it makes you feel matters just as much.",
  },
] as const;

export const reviews = [
  {
    source: "Guest",
    quote:
      "Familiar favourites and unexpected discoveries on every plate. We stayed for dessert and one more round.",
    author: "A. K.",
  },
  {
    source: "Guest",
    quote:
      "The tandoor dishes were smoky and perfect. Great energy at the bar and a table that felt made for sharing.",
    author: "M. R.",
  },
  {
    source: "Guest",
    quote:
      "A contemporary Indian dinner that still feels warm and welcoming. We’ll be back for the biryani.",
    author: "S. P.",
  },
  {
    source: "Guest",
    quote:
      "Drinks were playful, food was memorable, and the evening stretched longer than we planned — in the best way.",
    author: "J. L.",
  },
] as const;

export const galleryFilters = ["All", "Food", "Drinks", "The Space"] as const;

export const galleryItems = [
  {
    src: `${ASSET}/images/gallery/food-curry.jpg`,
    alt: "Rich Indian curry with rice, garnished with cream and coriander",
    category: "Food",
  },
  {
    src: `${ASSET}/images/gallery/drinks-pour.jpg`,
    alt: "Colourful cocktails lined up on the Indique bar",
    category: "Drinks",
  },
  {
    src: `${ASSET}/images/gallery/drinks-smoke.jpg`,
    alt: "A dark berry cocktail with citrus and mint",
    category: "Drinks",
  },
  {
    src: `${ASSET}/images/gallery/space-dining.jpg`,
    alt: "Warm, intimate dining room at Indique",
    category: "The Space",
  },
  {
    src: `${ASSET}/images/gallery/space-lounge.jpg`,
    alt: "Warm bar lighting and lounge seating at Indique",
    category: "The Space",
  },
  {
    src: `${ASSET}/images/gallery/food-spices.jpg`,
    alt: "Indian spices, chillies, turmeric and fresh aromatics",
    category: "Food",
  },
] as const;
