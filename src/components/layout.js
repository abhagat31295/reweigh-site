import { site } from "../data/site.js";
import { logo } from "./logo.js";

export function layout({ title, description, path, body, schema = "" }) {
  const nav = site.navigation.map(([label, href]) => `<a href="${href}"${path === href ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — reweigh.ai</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="reweigh.ai">
  <meta property="og:title" content="${title} — reweigh.ai">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="/assets/og-image.svg">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/site.css">
  ${schema ? `<script type="application/ld+json">${schema}</script>` : ""}
</head>
<body class="${path === "/" ? "is-home" : "is-interior"}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container nav-row">
      ${logo()}
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span></button>
      <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">${nav}</nav>
      <a class="button button-small" href="mailto:${site.email}?subject=Reweigh%20early%20access">Request early access</a>
    </div>
  </header>
  <main id="main">${body}</main>
  <footer class="site-footer">
    <div class="container footer-simple">
      <div>${logo()}<p>Growth work, without the queue.</p></div>
      <nav aria-label="Footer navigation"><a href="/use-cases/">Use Cases</a><a href="/how-it-works/">How It Works</a><a href="mailto:${site.email}?subject=Reweigh%20early%20access">Contact</a></nav>
    </div>
    <div class="container footer-bottom"><span>© ${new Date().getFullYear()} reweigh.ai</span><span>In development · Demos use illustrative data</span></div>
  </footer>
  <script type="module" src="/scripts/site.js"></script>
</body>
</html>`;
}
