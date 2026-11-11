# reweigh.ai website

A static marketing site for Reweigh, built for mobile app growth and performance marketing teams. The five primary pages are Home, Use Cases, How It Works, Pricing, and About Us. The site uses a consistent white-to-blue gradient, the existing Reweigh logo, DM Sans, and brand blue `#1263F5`.

## Run

Requires Node.js 20 or newer. No dependency installation is needed.

- `npm run dev` builds and serves the site, normally at `http://127.0.0.1:4173`. Busy ports are skipped.
- `npm run build` generates deployable static files in `dist/`.
- `npm run check` runs the calculation and simulation tests.

## Content and simulations

- `src/data/workflows.js`: positioning, primary CTA, five use cases, and demo step labels.
- `src/data/simulations.js`: deterministic synthetic data and pure calculation functions.
- `src/scripts/simulations.js`: five local interactive demos, including the signal-to-event and fraud-to-attribution handoffs.
- `src/pages/`: generated page content. Pricing copy is preserved from the prior revision.
- `src/components/layout.js`: shared five-tab navigation and concise footer.
- `public/assets/site.css`: shared visual system and responsive component styles.
- `public/assets/aakash-bhagat.png`: published portrait from aakashbuilds.com.
- `docs/revision-notes.md`: source research, fraud positioning, outstanding inputs, and verification limits.

All demo data is synthetic. Demos do not establish connections, run AI analysis, send events, persist approvals, or deliver notifications. The missing-field example blocks derived-event creation. Reviewed fraud exclusions affect only the local company attribution view. Resetting fraud clears those exclusions. Alert thresholds can produce either a triggered or quiet preview.

The product is marked in development. Source and destination names come from the supplied brief and are examples, not verified live integrations. CTA links open the existing `hello@reweigh.ai` mailbox. Original MMP reports remain visible in the examples; SKAN aggregate counts are not summed with user-level conversions. Retention patterns are associations rather than causal claims.

## Publishing

The deployment output is `dist/`. This revision is available in the local preview and has not been published. Legacy page source modules and calculation examples remain in the project. Add the confirmed production domain and sitemap before public launch.

## Outstanding input

The current and previous written briefs were available, but no deck file was attached. Reconcile any additional deck-only use cases when the deck is supplied. Aakash’s published bio was accessible, so no founder placeholder is needed. An existing contradiction in the pricing FAQ is recorded in the revision notes; its copy was deliberately left unchanged.
