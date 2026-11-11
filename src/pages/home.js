import { growthCTA } from '../components/content.js';
import { logo } from '../components/logo.js';
import { workflows, positioning, primaryCTA } from '../data/workflows.js';

function productVisual() {
  const rows = [
    ['Meta', 'M', '1,240', '1,084', '−156', 'paid'],
    ['Google Ads', 'G', '860', '816', '−44', 'paid'],
    ['Apple Search Ads', 'A', '380', '380', '—', 'paid'],
    ['Referral', '↗', '0', '200', '+200', 'referral'],
  ];
  return `<div class="report-frame">
    <div class="report-app">
      <aside class="report-sidebar" aria-label="Illustrative workspace navigation">
        ${logo()}
        <div class="report-workspace"><span class="workspace-avatar">S</span><span>Sample workspace<small>Growth operations</small></span><span class="workspace-chevron">⌄</span></div>
        <p class="sidebar-label">WORKSPACE</p>
        <div class="sidebar-item"><span aria-hidden="true">▦</span> Overview</div>
        <div class="sidebar-item active"><span aria-hidden="true">◫</span> Reports</div>
        <div class="sidebar-item"><span aria-hidden="true">⌁</span> Retention signals</div>
        <div class="sidebar-item"><span aria-hidden="true">≡</span> Events &amp; alerts</div>
        <div class="sidebar-bottom"><span class="status-dot"></span> Illustrative workspace</div>
      </aside>
      <div class="report-main">
        <div class="report-breadcrumb"><span>Workspace <i>/</i> Reports <i>/</i> <b>Attribution comparison</b></span><span class="report-sample">Sample data</span></div>
        <div class="report-title"><div><h2>Attribution comparison</h2><p>Your original numbers. Your rules. One clear comparison.</p></div><span class="report-date">Oct 01 – Oct 30 <span aria-hidden="true">⌄</span></span></div>
        <div class="report-tabs"><span class="selected">Reporting comparison</span><span>Retention signals</span><span>User value</span></div>
        <div class="report-summary"><div><span>Total purchases</span><strong>2,480</strong><small>Preserved across both views</small></div><div><span>Reclassified purchases</span><strong>200</strong><small>Based on your referral rule</small></div><div><span>Reporting rules</span><strong>01<span> in review</span></strong><small>Your approval comes first</small></div></div>
        <div class="report-table-wrap"><table class="report-table"><caption class="sr-only">Illustrative purchase counts before and after applying a referral reporting rule</caption><thead><tr><th>Channel</th><th>Original report</th><th>Company view</th><th>Difference</th></tr></thead><tbody>${rows.map(([name,icon,original,company,diff,type])=>`<tr><td><span class="channel-symbol ${type}">${icon}</span>${name}</td><td>${original}</td><td>${company}</td><td><span class="report-difference ${type}">${diff}</span></td></tr>`).join('')}</tbody><tfoot><tr><td>Total purchases</td><td>2,480</td><td>2,480</td><td>0</td></tr></tfoot></table></div>
        <div class="report-explanation"><span class="explanation-symbol" aria-hidden="true">↳</span><div><b>Same purchases. A different lens.</b><p>200 purchases with a referral code move into Referral. The original report stays intact.</p></div><a href="/how-it-works/#attribution" aria-label="Explore this reporting example">Explore <span aria-hidden="true">↗</span></a></div>
      </div>
    </div>
    <div class="report-caption"><span>01 / A VIEW YOU CAN EXPLAIN</span><span>Product illustration · No live systems connected</span></div>
  </div>`;
}

export function homePage() {
  return `<section class="home-intro"><div class="intro-atmosphere" aria-hidden="true"></div><div class="container">
    <div class="intro-copy"><p class="intro-label"><span></span>For growth &amp; performance teams at mobile app companies</p>
    <h1>${positioning.headline}</h1><p class="intro-description positioning-copy">${positioning.description}</p>
    <div class="actions"><a class="button" href="${primaryCTA.href}">${primaryCTA.label} <span aria-hidden="true">↗</span></a><a class="text-link" href="/how-it-works/">Try the demos <span aria-hidden="true">→</span></a></div>
    <p class="intro-note">In development · Built around your existing MMP and business data</p></div>${productVisual()}</div></section>
    <section class="section story-section"><div class="container story-layout"><p class="eyebrow">THE WORK BETWEEN TOOLS</p><div><h2>Your next growth idea<br><span>shouldn’t become a ticket.</span></h2><p>A new conversion event. A different attribution rule. A check on suspicious users. Reweigh brings that work into your team’s hands, using the data you already collect.</p><p class="story-support">Connect your mobile measurement partner (MMP), or a warehouse such as Snowflake. Define what you need, review the result, and choose the next action.</p></div></div></section>
    <section class="section capability-section"><div class="container"><div class="capability-heading"><p class="eyebrow">FIVE WAYS TO MOVE FASTER</p><h2>From a question<br>to something you can act on.</h2></div><div class="usecase-preview-grid">${workflows.map((w,i)=>`<a class="usecase-preview" href="/use-cases/#${w.id}"><span class="capability-index">0${i+1}</span><h3>${w.short}</h3><p>${w.preview}</p><span class="preview-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><a class="text-link section-action-link" href="/use-cases/">Explore all use cases <span aria-hidden="true">→</span></a></div></section>
    <section class="section control-section"><div class="container control-layout"><div><p class="eyebrow">YOUR DATA. YOUR DECISIONS.</p><h2>Give growth the controls.<br><span>Keep the review.</span></h2><p>Work from your existing data, preview what changes, and decide where it goes. Reweigh keeps the original attribution report available for comparison.</p><a class="text-link" href="/how-it-works/">Try a workflow in under a minute <span aria-hidden="true">↗</span></a></div><ol class="control-steps"><li><span>01</span><div><h3>Connect the data you already have</h3><p>An MMP, warehouse, or supported connector.</p></div></li><li><span>02</span><div><h3>Describe the result you need</h3><p>A reporting rule, a retention signal, an event, or an alert.</p></div></li><li><span>03</span><div><h3>Review it and choose the next step</h3><p>Compare the result or deliver it to a supported destination.</p></div></li></ol></div></section>${growthCTA()}`;
}
