# Reweigh revision — November 11, 2026

## Positioning and structure

The five primary tabs are Home, Use Cases, How It Works, Pricing, About Us, in that order. The consistent proposition is growth teams acting on attribution, retention signals, event creation, fraud review, and alerting without an engineering/data/QA handoff for every change. Request early access is the repeated primary CTA; it opens the existing hello@reweigh.ai address. Pricing plan CTAs and all pricing body copy were deliberately preserved.

The background is one fixed, cool white-to-blue gradient. Main sections are transparent over the same treatment, including the closing CTA and footer. Reweigh's name, logo, and #1263F5 blue are retained.

## Fraud positioning research

The chosen opportunity is a marketer-operated review-to-report workflow: combine MMP fraud signals with customer business conditions, inspect the evidence, and carry reviewed decisions into a separate company attribution view and related alerts. This is a proposed workflow advantage based on the supplied brief, not an established detection advantage or a claim of exclusivity.

- AppsFlyer already describes AI detection, flexible enforcement, and validation rules: https://www.appsflyer.com/products/measurement/fraud-protection/
- Adjust positions its protection around rejection before payment and transparent rejection reasons: https://www.adjust.com/solutions/fraud-prevention/
- Singular explicitly offers custom fraud rules and suspicious/rejected outcomes: https://www.singular.net/fraud-prevention/ and https://support.singular.net/hc/en-us/articles/360003141571-How-to-Set-Up-Singular-Fraud-Protection
- Standalone vendor TrafficGuard describes click, attribution, and post-attribution protection: https://www.trafficguard.ai/video/protect-pro-mobile-an-ad-fraud-prevention-solution

These sources rule out claiming that custom rules, post-install detection, or feeding fraud back into attribution are uniquely Reweigh features. The site makes no comparative accuracy, savings, real-time blocking, or vendor coverage claims. Flags require review. The MMP original remains visible.

## Founder source

https://aakashbuilds.com/ was opened successfully in the browser (its initial HTML is JavaScript-only). The biography uses its published Fetch, Stratifyd, and Valiance Partners background, without importing customer results or performance metrics as Reweigh claims. The published portrait was downloaded from that page. CEO / Founder is the role supplied in the current brief.

## Demos

Five independent four-step simulations share deterministic fixtures. Inputs, back/next, reset, and linked actions work in the browser. Nothing is connected or delivered. AI discovery results are explicitly predefined examples. Event creation is blocked when the timestamp field is missing. Fraud review feeds two exclusions into the attribution demo; resetting fraud clears that effect. Alerts cover all five use cases and include a quiet state when the threshold is not exceeded.

The original attribution always totals 100; company included + excluded totals 100. Retargeting rules reclassify existing conversions. SKAN is separate aggregate data, never added to user-level totals. Retention examples use a separate illustrative validation group and do not assert causation.

## Outstanding inputs and preserved issue

- No deck was attached. The attachment directory contains the current and previous written briefs only. No extra deck-only use cases were invented; reconcile the deck when supplied.
- Connector availability is not verified. The site says in development and marks the connections/destinations as examples subject to support, access, and permissions.
- No founder placeholder was needed.
- Pricing was kept verbatim as requested. Its pre-existing FAQ asks “Do we keep our tracking tool?” but begins its answer with “No” before saying Reweigh works alongside it. This contradiction was not changed without permission to edit pricing copy.

## Verification

Build succeeded. Eleven unit tests pass, covering the existing attribution calculations plus the new simulation invariants, retargeting classification, retention cohort counts, threshold boundaries, and step limits. Static links/assets were checked across all generated pages. Pricing source was compared byte-for-byte with the pre-revision copy.

Browser rendering confirmed that all five demos initialize. Live interaction checks progressed through attribution and retention signals before browser security review rejected a click in the event demo. No alternate browser or indirect click mechanism was used. Remaining live interactions and responsive visual checks for this revision are not verified.
