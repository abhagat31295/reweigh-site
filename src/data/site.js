export const site = {
  brand: "reweigh.ai",
  description: "Reweigh helps mobile growth teams act on attribution, retention signals, events, fraud, and alerts without waiting on engineering for every change.",
  email: "hello@reweigh.ai",
  navigation: [
    ["Use Cases", "/use-cases/"],
    ["How It Works", "/how-it-works/"],
    ["Pricing", "/pricing/"],
    ["About Us", "/about/"]
  ]
};

export const channels = ["Meta", "TikTok", "Google Ads", "Apple Search Ads"];

export const models = {
  last: { label: "Last touch", credits: [0, 0, 0, 100] },
  first: { label: "First touch", credits: [100, 0, 0, 0] },
  linear: { label: "Linear", credits: [25, 25, 25, 25] },
  decay: { label: "Time decay", credits: [10, 20, 30, 40] },
  position: { label: "Position-based", credits: [40, 10, 10, 40] },
  custom: { label: "Custom", credits: [10, 30, 30, 30] }
};

export function customCredits(clickWeight, lookbackDays) {
  const days = [6, 4, 2, 0];
  const weights = [100 - clickWeight, clickWeight / 3, clickWeight / 3, clickWeight / 3];
  const visible = weights.map((weight, index) => days[index] <= lookbackDays ? weight : 0);
  const total = visible.reduce((sum, value) => sum + value, 0) || 1;
  const split = visible.map(value => Math.floor(value / total * 100));
  const remainder = 100 - split.reduce((sum, value) => sum + value, 0);
  split[visible.lastIndexOf(Math.max(...visible))] += remainder;
  return split;
}

export const pageMeta = {
  home: { title: "Move growth forward. Skip the engineering queue.", description: "Compare attribution, discover retention signals, create events, review fraud, and set alerts with your existing MMP and business data." },
  customAttribution: { title: "Custom attribution for your business logic", description: "Combine MMP attribution with first-party warehouse signals, define your team's reporting rules, and compare both views while preserving the original MMP record." },
  features: { title: "Features", description: "Move on attribution, signals, events, fraud, and alerts with your existing MMP and business data." },
  about: { title: "About reweigh.ai", description: "Meet Aakash Bhagat and the mission behind Reweigh: help mobile growth teams move without waiting on engineering for every change." },
  product: { title: "Product", description: "Configure and monitor measurement with team approval, then compare attribution views and interpret reports." },
  how: { title: "How it works", description: "Try five interactive demos: attribution, retention signal discovery, event creation, fraud review, and custom alerts." },
  useCases: { title: "Use cases", description: "Five workflows for mobile growth teams: compare attribution, discover retention signals, create events, review fraud, and set alerts." },
  careers: { title: "Careers", description: "Reweigh careers information is coming soon." },
  privacy: { title: "Privacy", description: "Privacy policy status and contact information for Reweigh." },
  terms: { title: "Terms", description: "Terms of service status and contact information for Reweigh." },
  pricing: { title: "Pricing", description: "Simple pricing for mobile app attribution modeling. Plans and rates are available by conversation." },
  security: { title: "Security & privacy", description: "Review the proposed data flow, deployment options, and security details for reweigh.ai." }
};
