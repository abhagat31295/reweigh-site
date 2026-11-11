import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulation, stepSimulation, attributionResult, retentionResult, alertResult, alertScenarios } from '../src/data/simulations.js';
import { workflows } from '../src/data/workflows.js';

test('company attribution conserves sample conversions across models, rules, and reviewed exclusions',()=>{
  for(const model of ['last','first','linear']) for(const rule of [true,false]) for(const fraud of [true,false]) {
    const s={...createSimulation('attribution'),model,rule};
    const r=attributionResult(s,fraud);
    assert.equal(r.original.reduce((a,b)=>a+b,0),100);
    assert.equal(r.modeled.reduce((a,b)=>a+b,0),100);
    assert.equal(r.total+r.excluded,100);
    assert.ok(r.company.every(x=>x>=0));
    assert.equal(r.company[1],r.modeled[1]+(rule?10:0));
    assert.equal(r.company[2],r.modeled[2]);
    assert.deepEqual(r.original,[60,30,10]);
  }
});
test('retention examples use disjoint validation groups with valid counts',()=>{
  for(const window of [3,7]) {
    const r=retentionResult(window);
    assert.equal(r.matched+r.other,200);
    assert.ok(r.retained<=r.matched && r.otherRetained<=r.other);
  }
});
test('all five alert scenarios respect the threshold, including quiet boundary values',()=>{
  for(const [scenario,r] of Object.entries(alertScenarios)) {
    const s={...createSimulation('alerts'),scenario,threshold:r.observed};
    assert.equal(alertResult(s).triggered,false);
    assert.equal(alertResult({...s,threshold:r.observed-1}).triggered,true);
    assert.equal(alertResult({...s,threshold:r.observed+1}).triggered,false);
  }
});
test('every use case has a bounded four-step demo with a clean reset state',()=>{
  assert.equal(workflows.length,5);
  for(const w of workflows) {
    assert.equal(w.steps.length,4);assert.equal(w.captions.length,4);
    let s=createSimulation(w.id);
    assert.equal(stepSimulation(s,-1).step,0);
    for(let i=0;i<8;i++)s=stepSimulation(s,1);
    assert.equal(s.step,3);
    assert.equal(createSimulation(w.id).approved,false);
  }
});

test('event progression rejects invalid names and missing timestamps, then recovers',()=>{
  for(const eventName of ['', 'bad name', '<script>', '1event', 'a'.repeat(41)]) {
    const s={...createSimulation('events'),eventName};
    assert.equal(stepSimulation(s,1).step,0);
  }
  let s=stepSimulation({...createSimulation('events'),eventName:'retained_user'},1);
  assert.equal(s.step,1);
  s.missing=true;
  assert.equal(stepSimulation(s,1).step,1);
  s.missing=false;
  s=stepSimulation(s,1);
  assert.equal(s.step,2);
  assert.equal(s.visited,2);
  assert.equal(stepSimulation(s,-1).visited,2);
});
test('reviewed exclusions update attribution for every possible selection size',()=>{
  for(const count of [0,1,2,3]) {
    const result=attributionResult(createSimulation('attribution'),count);
    assert.equal(result.excluded,count);
    assert.equal(result.total,100-count);
    assert.deepEqual(result.original,[60,30,10]);
  }
});
test('delivery alert preserves the selected event and destination',()=>{
  const s={...createSimulation('alerts'),scenario:'delivery',threshold:3,deliverySource:'retained_user → Snowflake'};
  assert.equal(alertResult(s).source,'retained_user → Snowflake');
  assert.equal(alertResult(s).triggered,true);
  assert.equal(alertResult({...s,threshold:4}).triggered,false);
  assert.equal(alertResult({...s,scenario:'missing'}).source,alertScenarios.missing.source);
});
