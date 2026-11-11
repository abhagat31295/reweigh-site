import { workflows } from '../data/workflows.js';
import { createSimulation, stepSimulation, attributionResult, retentionResult, alertScenarios, alertResult } from '../data/simulations.js';

const states = new Map(workflows.map(w=>[w.id,createSimulation(w.id)]));
const roots = new Map([...document.querySelectorAll('[data-simulation]')].map(root=>[root.dataset.simulation,root]));
let fraudApplied = 0;
const escape = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const destinationName = value => ({mmp:"MMP",snowflake:"Snowflake",ga:"Google Analytics",ads:"Google Ads"}[value]);
const number = value => Number(value).toLocaleString('en-US');
const select = (id,key,label,options,value) => `<label class="sim-field" for="${id}-${key}">${label}<select id="${id}-${key}" data-sim-field="${key}">${options.map(([v,t])=>`<option value="${v}"${String(value)===String(v)?' selected':''}>${t}</option>`).join('')}</select></label>`;
const card = (label,title,copy) => `<div class="sim-card"><span class="sim-label">${label}</span><h4>${title}</h4><p>${copy}</p></div>`;
const note = text => `<p class="sim-explanation">${text}</p>`;
const sourceOptions=[['mmp','Existing MMP connection'],['snowflake','Snowflake event data']];
const rate = (count,total) => `${Math.round(count/total*100)}%`;
const table = (headers,rows) => `<div class="sim-table-scroll"><table class="sim-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

function attribution(s) {
  const r=attributionResult(s,fraudApplied);
  if(s.step===0) return `<div class="sim-card-grid">${card('USER-LEVEL DATA','MMP + retargeting','100 sample conversions. Returning-user ad interactions are labeled separately.')}${card('AGGREGATE DATA','Apple SKAN','80 sample reported installs. Shown as a separate source, never added to user-level conversions.')}</div>${note('SKAN is Apple’s privacy-preserving attribution framework. Its aggregate counts cannot identify the individual users in the MMP view.')}`;
  if(s.step===1) return `${select(s.id,'model','Compare the MMP result with',[['last','Last touch'],['first','First touch'],['linear','Linear (shared credit)']],s.model)}${table(['Campaign','MMP original','Selected model'],['Prospecting','Retargeting','Organic'].map((n,i)=>[n,r.original[i],r.modeled[i]]))}${note('First touch credits the earliest ad interaction. Last touch credits the latest. Linear shares credit across the sample journey. Each model allocates all 100 sample conversions.')}`;
  if(s.step===2) return `<div class="sim-rule"><span class="sim-label">YOUR COMPANY’S LOGIC</span><h4>Separate returning-user conversions.</h4><p>When the sample user was already active and re-engaged with an ad, group that conversion under Retargeting in your company view.</p><label class="sim-check"><input type="checkbox" data-sim-field="rule" ${s.rule?'checked':''}> Apply this rule to 10 sample conversions</label></div>${note('This changes campaign labels in your company report. It preserves the MMP result and the total number of conversions.')}`;
  return `${table(['Campaign','MMP original','Company view'],['Prospecting','Retargeting','Organic'].map((n,i)=>[n,r.original[i],r.company[i]]))}<div class="sim-result-bar"><span>Company view: <b>${r.total} conversions</b></span><span>Excluded after review: <b>${r.excluded}</b></span><span>Original: <b>100</b></span></div>${note(fraudApplied?'The records selected in the fraud demo are excluded from the company view. The original still includes them. Kept + excluded = 100.':'Your rule moves 10 conversions from Prospecting to Retargeting when enabled. SKAN remains a separate aggregate source; totals are not combined.')}<a class="text-link" href="#fraud">Try feeding a fraud review into this report ↗</a>`;
}
function signals(s) {
  const r=retentionResult(s.window);
  if(s.step===0) return `${select(s.id,'source','Use event data from',sourceOptions,s.source)}<div class="sim-card-grid">${card(s.source==='snowflake'?'SNOWFLAKE SAMPLE':'MMP SAMPLE','Signup + event history','User ID, signup time, event name, and event time are available in the sample.')}${card('OUTCOME','Returned on day 30','Use only signup groups old enough to measure the retention outcome.')}</div>`;
  if(s.step===1) return `${select(s.id,'window','Look for actions completed within',[[3,'3 days after signup'],[7,'7 days after signup']],s.window)}<div class="sim-rule"><span class="sim-label">ILLUSTRATIVE AI FINDING</span><h4>${r.sequence}</h4><p>Completed within ${s.window} days of signup. This sequence is a candidate for identifying users who return later.</p></div>${note('The demo uses a predefined example. The product is intended to search event sequences and time windows in the connected data.')}`;
  if(s.step===2) return `${table(['Separate validation group','Users','Returned on day 30'],[['Completed the sequence',r.matched,`${r.retained} (${rate(r.retained,r.matched)})`],['Did not complete it',r.other,`${r.otherRetained} (${rate(r.otherRetained,r.other)})`]])}${note('Illustrative validation cohort: 200 users, separate from discovery. The association merits investigation; it does not establish causation or guarantee future retention.')}`;
  return `<div class="sim-rule"><span class="sim-label">REVIEWED CANDIDATE</span><h4>qualified_user</h4><p>${r.sequence}, within ${s.window} days of signup.</p></div>${note('A more expensive acquisition can still be valuable if the user stays longer. Review cost alongside retention before using this signal to optimize campaigns.')}<button type="button" class="button" data-use-signal>Continue in the event demo →</button>`;
}
function events(s) {
  const r=retentionResult(s.window);
  const destination=destinationName(s.destination);
  if(s.step===0) return `<label class="sim-field" for="event-name">Name your event<input id="event-name" type="text" maxlength="40" data-sim-field="eventName" value="${escape(s.eventName)}" aria-describedby="event-name-help"></label><p id="event-name-help" class="sim-explanation">Use 2–40 lowercase letters, numbers, or underscores. Start with a letter.</p>${select(s.id,'window','Sequence completed within',[[3,'3 days after signup'],[7,'7 days after signup']],s.window)}<div class="sim-rule"><span class="sim-label">YOUR BRIEF</span><h4>“Create an event for users who complete this sequence.”</h4><p>${r.sequence}, within ${s.window} days of signup.</p></div>${select(s.id,'source','Provide the relevant data through',[...sourceOptions,['connector','New connector with a supplied schema']],s.source)}${note('A schema is a list of field names and types. Reweigh also needs access to the actual records behind those fields.')}`;
  if(s.step===1) return `${table(['Required field','Sample status'],[['User ID','Available'],['Signup time','Available'],['Event name','Available'],['Event time',s.missing?'Missing — cannot create the event':'Available']])}<label class="sim-check"><input type="checkbox" data-sim-field="missing" ${s.missing?'checked':''}> Simulate a missing event timestamp</label>${note(s.missing?'This event is blocked. Supply the missing field through the source or connector before continuing. Reweigh cannot derive a time window from a field that was never collected.':'Required fields are present. The definition can be evaluated without adding a new tracking event inside the app.')}`;
  if(s.step===2) return `${select(s.id,'destination','Send the derived event to',[['mmp','MMP'],['snowflake','Snowflake'],['ga','Google Analytics'],['ads','Google Ads']],s.destination)}<div class="sim-card-grid">${card('EVENT',escape(s.eventName),'Created from the existing event sequence, with a user ID and completion timestamp.')}${card('DELIVERY','Check before sending','The real connection must support this event, its identifiers, and the required permissions.')}</div>${note('These are destinations from the product brief, not a list of verified live connectors. No delivery takes place in this demo.')}`;
  return `<div class="sim-receipt"><span class="sim-label">SIMULATED DELIVERY RECEIPT</span><h4>${escape(s.eventName)} → ${destination}</h4><dl><div><dt>Definition</dt><dd>Reviewed ${s.window}-day sequence</dd></div><div><dt>Sample user</dt><dd>demo_user_017</dd></div><div><dt>Destination</dt><dd>${destination}</dd></div><div><dt>Status</dt><dd>Preview accepted · Nothing sent</dd></div></dl></div>${note('In the product, the team selects the destination and Reweigh delivers through a supported, authorized connection. Failed delivery can trigger an alert.')}<button type="button" class="text-link sim-link-button" data-delivery-alert>Try a destination-failure alert ↗</button>`;
}
function fraud(s) {
  if(s.step===0) return `<div class="sim-rule"><span class="sim-label">YOUR BUSINESS CONDITION</span><h4>Repeated accounts using the same redemption token.</h4><p>The sample business expects a redemption token to belong to a single account. Combine that condition with a suspicious-install signal from the MMP.</p><label class="sim-check"><input type="checkbox" data-sim-field="strict" ${s.strict?'checked':''}> Require both signals before flagging a record</label></div>${note('This is an illustrative business rule, not a universal fraud definition. A shared token could have a legitimate explanation.')}`;
  if(s.step===1) return `${table(['Sample record','MMP signal','Business condition','Review status'],[['demo_041','Suspicious','Repeated token','Flagged'],['demo_072','Suspicious','Repeated token','Flagged'],['demo_089','No flag','Repeated token',s.strict?'Not flagged':'Flagged']])}${note(`${s.strict?2:3} sample records match the selected condition. Inspect both sources before making an exclusion decision.`)}`;
  if(s.step===2) return `<div class="sim-rule"><span class="sim-label">REVIEW EACH RECORD</span><h4>Choose which records to exclude.</h4><p>Your selection changes the company attribution view. The original stays intact.</p>${['demo_041','demo_072',...(s.strict?[]:['demo_089'])].map(record=>`<label class="sim-check"><input type="checkbox" data-exclusion="${record}" ${s.exclusions.includes(record)?'checked':''}> ${record} · ${record==='demo_089'?'Business signal only':'Both signals present'}</label>`).join('')}</div>${note(`${s.exclusions.length} selected. Apply this review to update the attribution demo.`)}`;
  return `<div class="sim-result-bar"><span>MMP original <b>100</b></span><span>Company included <b>${100-s.exclusions.length}</b></span><span>Reviewed exclusions <b>${s.exclusions.length}</b></span></div>${note('Your selected records are excluded from the company view. Revisit the review to change your decision, or inspect the updated attribution report.')}<button type="button" class="button" data-open-attribution>See the updated attribution demo →</button>`;
}
function alerts(s) {
  const r=alertResult(s);
  if(s.step===0) return `${select(s.id,'scenario','Alert me when',Object.entries(alertScenarios).map(([k,v])=>[k,v.label]),s.scenario)}<div class="sim-card"> <span class="sim-label">AFFECTED SOURCE</span><h4>${escape(r.source)}</h4><p>${r.next}</p></div>`;
  if(s.step===1) return `<label class="sim-field" for="alert-threshold">Trigger when ${r.metric.toLowerCase()} is above<input id="alert-threshold" data-sim-field="threshold" type="number" min="1" max="120" step="1" value="${s.threshold}"><span class="field-unit">${r.unit}</span></label><div class="sim-rule"><span class="sim-label">RECIPIENT</span><h4>Growth on-call</h4><p>Sample recipient only. The real team chooses a notification destination during setup.</p></div>`;
  if(s.step===2) return `<div class="sim-result-bar"><span>Observed <b>${r.observed} ${r.unit}</b></span><span>Threshold <b>${s.threshold} ${r.unit}</b></span><span>Test result <b>${r.triggered?'Alert triggered':'No alert'}</b></span></div>${note(r.triggered?'The observed value exceeds your threshold. Continue to inspect the alert.':'The observed value does not exceed your threshold. Continue to see the quiet state, or go back and lower the threshold.')}`;
  return `<div class="sim-receipt"><span class="sim-label">${r.triggered?'ALERT PREVIEW':'NO ALERT SENT'}</span><h4>${r.triggered?r.label:'Within your chosen threshold.'}</h4><dl><div><dt>Source</dt><dd>${escape(r.source)}</dd></div><div><dt>Observed</dt><dd>${r.observed} ${r.unit}</dd></div><div><dt>Your rule</dt><dd>Above ${s.threshold} ${r.unit}</dd></div><div><dt>Next check</dt><dd>${r.triggered?r.next:'Continue monitoring. No action required by this rule.'}</dd></div></dl></div>${note('This is a local preview. No message was sent, and no monitoring service is running.')}`;
}
const views={attribution,signals,events,fraud,alerts};
function render(id,focus=false) {
  const root=roots.get(id);if(!root)return;
  const s=states.get(id),w=workflows.find(w=>w.id===id);
  const panel=root.querySelector('[data-simulation-panel]');
  panel.innerHTML=`<div class="sim-panel-heading"><span class="sim-label">STEP ${s.step+1} OF 4</span><h3>${w.steps[s.step]}</h3><p>${w.captions[s.step]}</p></div>${views[id](s)}`;
  root.querySelectorAll('.simulation-progress li').forEach((li,i)=>{li.classList.toggle('current',i===s.step);li.classList.toggle('done',i<s.step);li.querySelector('button').disabled=i>s.visited;if(i===s.step)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
  root.querySelector('[data-sim-back]').disabled=s.step===0;
  const next=root.querySelector('[data-sim-next]');
  next.disabled=id==='events'&&((s.step===1&&s.missing)||(s.step===0&&!/^[a-z][a-z0-9_]{1,39}$/.test(s.eventName)));
  next.textContent=s.step===3?'Run again ↻':s.step===2?(id==='fraud'?'Apply demo review →':id==='events'?'Create demo event →':'Review result →'):'Next step →';
  root.querySelector('[data-sim-position]').textContent=`${s.step+1} / 4`;
  if(focus)panel.focus({preventScroll:true});
}
function jump(id) {
  render(id);
  const section=document.getElementById(id);section.scrollIntoView({behavior:'auto',block:'start'});
  roots.get(id).querySelector('[data-simulation-panel]').focus({preventScroll:true});
}
for(const [id,root] of roots) {
  root.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    let s=states.get(id);
    if(button.hasAttribute('data-sim-next')) {
      if(s.step===3){root.querySelector('[data-sim-reset]').click();return;}
      if(id==='events'&&s.step===1&&s.missing)return;
      if(id==='fraud'&&s.step===2){fraudApplied=s.exclusions.length;s.approved=true;render('attribution');}
      states.set(id,stepSimulation(s,1));render(id,true);
    } else if(button.hasAttribute('data-sim-step')) {const step=Number(button.dataset.simStep);if(step<=s.visited){s.step=step;render(id,true);}} else if(button.hasAttribute('data-sim-back')) {states.set(id,stepSimulation(s,-1));render(id,true);}
    else if(button.hasAttribute('data-sim-reset')) {states.set(id,createSimulation(id));if(id==='fraud'){fraudApplied=false;render('attribution');}render(id,true);}
    else if(button.hasAttribute('data-open-attribution')) {states.get('attribution').step=3;states.get('attribution').visited=3;jump('attribution');}
    else if(button.hasAttribute('data-delivery-alert')) {states.set('alerts',{...createSimulation('alerts'),scenario:'delivery',threshold:3,deliverySource:`${s.eventName} → ${destinationName(s.destination)}`});jump('alerts');}
    else if(button.hasAttribute('data-use-signal')) {states.set('events',{...createSimulation('events'),window:s.window,source:s.source});jump('events');}
    root.querySelector('[data-sim-status]').textContent=`${workflows.find(w=>w.id===id).short}: ${states.get(id).step+1} of 4. Simulation only.`;
  });
  root.addEventListener('input',event=>{
    if(event.target.dataset.simField!=='eventName')return;
    const s=states.get(id);s.eventName=event.target.value;s.visited=0;
    root.querySelector('[data-sim-next]').disabled=!/^[a-z][a-z0-9_]{1,39}$/.test(s.eventName);
    root.querySelectorAll('[data-sim-step]').forEach(button=>button.disabled=Number(button.dataset.simStep)>0);
  });
  root.addEventListener('change',event=>{
    const input=event.target,key=input.dataset.simField;
    if(input.dataset.exclusion){const s=states.get(id);s.exclusions=input.checked?[...s.exclusions,input.dataset.exclusion]:s.exclusions.filter(v=>v!==input.dataset.exclusion);s.approved=false;s.visited=Math.min(s.visited,2);fraudApplied=0;render('attribution');render(id);return;}if(!key||key==='eventName')return;
    const s=states.get(id);
    if(input.type==='checkbox')s[key]=input.checked;
    else if(key==='threshold'||key==='window')s[key]=Math.max(1,Math.min(120,Number(input.value)||1));
    else s[key]=input.value;
    if(key==='scenario'){s.threshold=alertScenarios[s.scenario].threshold;delete s.deliverySource;}
    s.visited=Math.min(s.visited,s.step);
    if(id==='fraud'){s.approved=false;fraudApplied=0;if(s.strict)s.exclusions=s.exclusions.filter(v=>v!=='demo_089');render('attribution');}
    render(id);root.querySelector(`[data-sim-field="${key}"]`)?.focus();
    root.querySelector('[data-sim-status]').textContent='Sample preview updated.';
  });
  render(id);
}
