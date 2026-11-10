import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imgDir = path.join(root, "public/sites/indique/images");
const fontDir = path.join(root, "public/sites/indique/fonts");
const videoDir = path.join(root, "public/sites/indique/videos");

for (const d of [imgDir, fontDir, videoDir]) fs.mkdirSync(d, { recursive: true });

const assets = [
  // fonts
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab682a7a96e21e312a6cb7_Satoshi-Regular.woff2",
    "fonts/Satoshi-Regular.woff2",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab682aafa6258cac9f6576_Satoshi-Medium.woff2",
    "fonts/Satoshi-Medium.woff2",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab682aa0a6b4bc699d3396_Satoshi-Bold.woff2",
    "fonts/Satoshi-Bold.woff2",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab68a77717b49e8d0f3e52_TT%20Ramillas%20Trial%20Variable%20Roman.ttf",
    "fonts/TT-Ramillas-Variable.ttf",
  ],
  // icons / logo
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab69d9e852bb71813eafdf_Logo.png",
    ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6aad6d37e1980d319ac9_menu-icon.png",
    "images/menu-icon.png",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6aad663e114eb608fb96_order-icon.png",
    "images/order-icon.png",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68c9c21775852a6417f46e90_chevron-down.svg",
    "images/chevron-down.svg",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6f5c7f6ef175306f18bb_star-icon.png",
    "images/star-icon.png",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6f5c31e3e7b0a84252b6_google-icon.png",
    "images/google-icon.png",
  ],
  // photos (best quality)
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6d83cbb46c5a59dea24b_Background%20Hero-min.avif",
    "images/hero-desktop.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/6900f221f61431ab7c171d52_mobile_hero.avif",
    "images/hero-mobile.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac4c4fc4648b01d408500b_Featured%20Menu.avif",
    "images/featured-menu.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68e46be43526b08d9492bd44_img-1.avif",
    "images/catering-1.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68e46be3bdd582aff715479c_img-2.avif",
    "images/catering-2.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68e46be4c3b9f44298ee4f60_img-3.avif",
    "images/catering-3.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac50267055b2ef13a16065_cocktails-1.avif",
    "images/cocktails-1.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac5027270c47ed176e5cd7_cocktails-2.avif",
    "images/cocktails-2.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac5358491181ca69dbe1f5_fullsize-min.avif",
    "images/fullsize-hall.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/69a5fe2eb039b97dd5da108d_amrit-poster.avif",
    "images/video-poster.avif",
  ],
  [
    "https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2%2F68ab88ee4daaf51c42a59660_Amrit%20Palace%20%281%29-transcode.mp4",
    "videos/indique.mp4",
  ],
];

async function download([url, rel]) {
  const dest = path.join(root, "public/sites/indique", rel);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    console.log("skip", rel);
    return;
  }
  process.stdout.write(`get ${rel} ... `);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; indique-assets)" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`${buf.length} bytes (${res.headers.get("content-type")})`);
}

for (const a of assets) {
  await download(a);
}
console.log("done");
