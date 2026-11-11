import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { layout } from "../src/components/layout.js";
import { homePage } from "../src/pages/home.js";
import { productPage } from "../src/pages/product.js";
import { howPage } from "../src/pages/how.js";
import { pricingPage } from "../src/pages/pricing.js";
import { securityPage } from "../src/pages/security.js";
import { featuresPage } from "../src/pages/features.js";
import { aboutPage } from "../src/pages/about.js";
import { customAttributionPage } from "../src/pages/custom-attribution.js";
import { useCasesPage } from "../src/pages/use-cases.js";
import { comingSoonPage } from "../src/pages/coming-soon.js";
import { pageMeta } from "../src/data/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist");
const applicationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "reweigh.ai",
  applicationCategory: "BusinessApplication",
  description: "Help mobile growth teams act on attribution, retention signals, events, fraud, and alerts without waiting on engineering for every change."
});

const pages = [
  { key: "home", path: "", body: homePage(), schema: applicationSchema },
  { key: "customAttribution", path: "custom-attribution", body: customAttributionPage() },
  { key: "features", path: "features", body: featuresPage() },
  { key: "product", path: "product", body: productPage() },
  { key: "how", path: "how-it-works", body: howPage() },
  { key: "useCases", path: "use-cases", body: useCasesPage() },
  ...["careers", "privacy", "terms"].map(key => ({key, path:key, body:comingSoonPage(key)})),
  { key: "pricing", path: "pricing", body: pricingPage() },
  { key: "about", path: "about", body: aboutPage() },
  { key: "security", path: "security", body: securityPage() }
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, "public"), out, { recursive: true });
await cp(path.join(root, "src/data"), path.join(out, "data"), { recursive: true });
await cp(path.join(root, "src/scripts"), path.join(out, "scripts"), { recursive: true });

for (const page of pages) {
  const destination = page.path ? path.join(out, page.path, "index.html") : path.join(out, "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  const html = layout({
    title: pageMeta[page.key].title,
    description: pageMeta[page.key].description,
    path: page.path ? `/${page.path}/` : "/",
    body: page.body,
    schema: page.schema ?? ""
  });
  await writeFile(destination, html);
}

const headers = `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/assets/*\n  Cache-Control: public, max-age=86400\n`;
await writeFile(path.join(out, "_headers"), headers);
await writeFile(path.join(out, "robots.txt"), "User-agent: *\nAllow: /\n");

const htmlFiles = pages.map(page => page.path ? `${page.path}/index.html` : "index.html");
for (const relative of htmlFiles) {
  const html = await readFile(path.join(out, relative), "utf8");
  if (!html.includes("<title>") || !html.includes("name=\"description\"") || !html.includes("id=\"main\"")) {
    throw new Error(`Missing required document metadata or main landmark: ${relative}`);
  }
}
console.log(`Built ${pages.length} pages into ${out}`);
