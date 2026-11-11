export function noiseToSignal() {
  return `<div class="noise-card" role="img" aria-label="Messy mobile campaign source names are normalized into a consistent channel taxonomy.">
    <div class="noise-head"><span class="eyebrow">From noise to signal</span><span class="mono">SOURCE LABELS → SHARED TAXONOMY</span></div>
    <div class="noise-flow">
      <div class="raw-list"><span>googleadwords_int</span><span>Facebook Ads</span><span>fb_ios_ret</span><span>applovin_int</span><span>Apple Search Ads</span><span>tiktokglobal_int</span></div>
      <div class="normalize-rule"><span>MAP</span></div>
      <div class="clean-list"><span><i class="dot blue"></i>Google Ads · UA</span><span><i class="dot black"></i>Meta · UA</span><span><i class="dot gray"></i>Meta · Retargeting</span><span><i class="dot blue"></i>AppLovin · UA</span><span><i class="dot black"></i>Apple Search Ads · UA</span><span><i class="dot gray"></i>TikTok · UA</span></div>
    </div>
  </div>`;
}

export function flowDiagram() {
  return `<div class="flow-card" role="group" aria-label="Three steps: connect data, normalize channel names, and model attribution.">
    <article><span class="step-index">01</span><div class="flow-icon connect-icon" aria-hidden="true"><i></i><i></i><i></i></div><h3>Connect</h3><p>Bring in installs, events, touchpoints, and spend.</p></article>
    <article><span class="step-index">02</span><div class="flow-icon map-icon" aria-hidden="true"><i></i><i></i><i></i><i></i></div><h3>Normalize</h3><p>Align source, campaign, geography, and creative names.</p></article>
    <article><span class="step-index">03</span><div class="flow-icon model-icon" aria-hidden="true"><i></i><i></i><i></i></div><h3>Model</h3><p>Choose how credit is assigned and compare the result.</p></article>
  </div>`;
}

export function reconciliation() {
  return `<div class="reconcile-card" role="group" aria-label="Illustrative comparison between MMP last touch and reweigh time decay. Both views total 48,212 installs.">
    <div class="reconcile-columns">
      <div><h3>MMP official <span>LAST TOUCH</span></h3><table><tbody><tr><td>Meta</td><td>12,440</td><td>2.1×</td></tr><tr><td>Google</td><td>17,300</td><td>3.2×</td></tr><tr><td>Apple Search</td><td>18,472</td><td>4.0×</td></tr></tbody></table></div>
      <div><h3>reweigh.ai <span>TIME DECAY v3</span></h3><table><tbody><tr><td>Meta</td><td>16,212</td><td>2.8×</td></tr><tr><td>Google</td><td>17,900</td><td>3.3×</td></tr><tr><td>Apple Search</td><td>14,100</td><td>3.1×</td></tr></tbody></table></div>
    </div><div class="reconcile-total">TOTAL INSTALLS <strong>48,212 = 48,212</strong><span aria-label="Totals reconcile">✓</span></div>
    <p class="fine-print">Illustrative data. Reconciliation behavior must be validated against each supported integration.</p>
  </div>`;
}
