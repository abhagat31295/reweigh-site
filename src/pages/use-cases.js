import { workflows } from '../data/workflows.js';
import { pageIntro, growthCTA } from '../components/content.js';
export function useCasesPage() {
  return pageIntro('Use Cases','Do the growth work.<br>Skip the handoffs.','Compare attribution, find retention signals, create events, review fraud, and set alerts using the MMP and business data your team already has.') +
  `<div class="container case-jumps" aria-label="Use case shortcuts">${workflows.map((w,i)=>`<a href="#${w.id}"><span>0${i+1}</span>${w.short}</a>`).join('')}</div>
  <section class="section"><div class="container case-list">${workflows.map((w,i)=>`<article class="case-detail" id="${w.id}"><div class="case-title"><p class="eyebrow">USE CASE 0${i+1}</p><h2>${w.title}</h2><a class="text-link" href="/how-it-works/#${w.id}">Try this demo <span aria-hidden="true">↗</span></a></div><div><dl class="case-story"><div><dt>The problem</dt><dd>${w.problem}</dd></div><div><dt>What Reweigh does</dt><dd>${w.action}</dd></div><div><dt>The outcome for your team</dt><dd>${w.outcome}</dd></div></dl><div class="case-alert"><span class="eyebrow">KEEP WATCH</span><p>${w.alert}</p></div><p class="case-boundary">${w.note}</p></div></article>`).join('')}</div></section>${growthCTA()}`;
}
