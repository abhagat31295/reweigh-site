// Deterministic synthetic fixtures. No customer data, networking, or live writes.
export const alertScenarios = {
  missing: {label:'MMP events stop arriving', metric:'Minutes since the last purchase event', observed:42, threshold:30, unit:'minutes', source:'MMP → purchase', next:'Check whether the app is still recording purchases, then inspect MMP delivery.'},
  attribution: {label:'Attribution views diverge', metric:'Difference between report views', observed:12, threshold:10, unit:'%', source:'MMP report ↔ company view', next:'Inspect the records affected by the latest reporting rule.'},
  signals: {label:'Retention signal weakens', metric:'Drop in the signal’s retention association', observed:8, threshold:5, unit:'percentage points', source:'Reviewed retention signal', next:'Check cohort maturity and rerun validation on a separate group.'},
  fraud: {label:'Fraud flags rise', metric:'Share of users flagged for review', observed:7, threshold:5, unit:'%', source:'MMP signals + business rule', next:'Review flagged records and their evidence before changing exclusions.'},
  delivery: {label:'An event destination fails', metric:'Consecutive failed deliveries', observed:4, threshold:3, unit:'attempts', source:'qualified_user → Google Ads', next:'Inspect the destination’s permissions and the event’s required fields.'}
};
export function createSimulation(id) {
  return {id, step:0, visited:0, eventName:'qualified_user', exclusions:['demo_041','demo_072'], model:'linear', rule:true, source:'mmp', window:7, destination:'mmp', missing:false, strict:true, approved:false, scenario:'missing', threshold:30};
}
export function attributionResult(state, fraudApplied=false) {
  const original=[60,30,10];
  const models={last:[60,30,10],first:[45,40,15],linear:[50,35,15]};
  const modeled=[...models[state.model]];
  const company=[...modeled];
  if(state.rule){company[0]-=10;company[1]+=10;}
  const excluded=typeof fraudApplied==='number'?Math.max(0,Math.min(3,fraudApplied)):(fraudApplied?2:0);
  company[0]-=excluded;
  return {original,modeled,company,excluded,total:company.reduce((a,b)=>a+b,0)};
}
export function retentionResult(days) {
  return days===3 ? {sequence:'Complete onboarding → save an item',matched:60,retained:30,other:140,otherRetained:42} : {sequence:'Complete onboarding → save an item → return to the app',matched:80,retained:48,other:120,otherRetained:36};
}
export function alertResult(state) {
  const scenario=alertScenarios[state.scenario];
  return {...scenario,source:state.scenario==='delivery'&&state.deliverySource?state.deliverySource:scenario.source,triggered:scenario.observed>state.threshold};
}
export function stepSimulation(state, direction) {
  if(direction>0 && state.id==='events' && ((state.step===0&&!/^[a-z][a-z0-9_]{1,39}$/.test(state.eventName))||(state.step===1&&state.missing)))return state;
  const step=Math.max(0,Math.min(3,state.step+direction));
  return {...state,step,visited:Math.max(state.visited,step)};
}
