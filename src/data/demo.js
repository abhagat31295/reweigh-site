export const demo = {
 disclaimer: 'Interactive demo · Illustrative data · No live systems connected',
 sources: [
 ['Tracking tool report (MMP)','Installs, signups, and which ads received credit'],
 ['App activity','Actions the app recorded, when they happened, and collected details'],
 ['Your company’s data','Purchases, subscriptions, and users who returned'],
 ['Campaign spend','What you spent on each campaign and when']
 ],
 steps: ['Connect your tools','Check what is tracked','Review ad settings','Choose your reporting rule','Compare the reports','See what needs attention'],
 explanations: [
 'Choose the tools to include in this example. A real connection would need your permission and access only to the information required.',
 'Check what each recorded action means. For example, does purchase_complete count as a purchase? If your app never records the action, your engineering team needs to add it.',
 'Check what trial-start information reaches the ad partner and how long an ad can receive credit. Preview a change before approving it. These sample settings are not recommendations.',
 'Choose how your team wants to group signups. Keep the original tracking result alongside your company’s report so everyone can explain the difference.',
 'See how your reporting rule changes the way users are grouped. The total stays the same. Purchase and return-visit data comes from fictional user groups with enough time to measure their outcomes.',
 'Open a sample issue to see which records are affected and what your team should check next. These examples do not diagnose your real data.'
 ],
 mappingRows: [['app_signup','Signup'],['trial_started','Trial start'],['purchase_complete','Purchase'],['revenue_amount','Revenue value']],
 rules: {
 referral:{label:'Referral code',field:'referral_code is present',source:'Referral',counts:[28,112],share:.2},
 qualification:{label:'Qualification signal',field:'qualification_status = qualified',source:'Qualified signup',counts:[42,168],share:.3}
 },
 // Mature synthetic cohorts. Totals reconcile; only allocations by reporting label change.
 ranges: {
 '7': {label:'Last 7 days',signups:310,revenue:12050,retained:74,spend:7750,paid:{signups:140,revenue:5880,retained:35,spend:2800}},
 '30': {label:'Last 30 days',signups:1240,revenue:48200,retained:296,spend:31000,paid:{signups:560,revenue:23520,retained:140,spend:11200}}
 },
 issues: [
 {title:'Some signups are missing a detail',source:'App activity · signup_completed',records:'demo-011, demo-024, demo-037',detail:'Three sample signup records are missing the detail your team uses to decide whether a signup is qualified.',next:'Ask whether the app recorded the qualification detail and whether it was kept when the data moved. If it was never collected, engineering needs to add it.'},
 {title:'Trial information reached an ad partner late',source:'MMP sample delivery log · trial_started',records:'demo-018, demo-026',detail:'Two sample trial-start messages reached the ad partner later than the app recorded them.',next:'Check which trial event was sent and the delivery history before changing the setup.'},
 {title:'A campaign name needs matching',source:'Campaign spend table · campaign_name',records:'demo-042, demo-043',detail:'The sample campaign name FB_US_trial has not been matched to the name your team uses in reports.',next:'Choose the agreed campaign name, preview the records affected, and ask the owner to approve the match.'}
 ]
};
export function initialDemoState() { return {step:0,connected:[true,true,true,true],mapping:'Purchase',mappingReviewed:false,window:7,postback:'StartTrial',approvedWindow:7,approvedPostback:'StartTrial',rule:'referral',mode:'compare',metric:'signups',range:'30',configPreview:false,settingsReview:false,settingsApproved:false}; }
export function mappingCount(mapping) { return {'Purchase':96,'Trial start':180,'Signup':310,'Unmapped':0}[mapping]??0; }
export function outcomeRows(state) {
 const d=demo.ranges[state.range],r=demo.rules[state.rule],share=r.share;
 const shifted={signups:Math.round(d.paid.signups*share),revenue:Math.round(d.paid.revenue*share),retained:Math.round(d.paid.retained*share),spend:0};
 const company={signups:d.paid.signups-shifted.signups,revenue:d.paid.revenue-shifted.revenue,retained:d.paid.retained-shifted.retained,spend:d.paid.spend};
 return {total:d,mmp:d.paid,company,shifted,label:r.source};
}
export function metricValue(row,metric) { return metric==='retention'?row.retained/row.signups:metric==='roas'?(row.spend?row.revenue/row.spend:null):row[metric]; }
