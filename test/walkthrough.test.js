import test from 'node:test';
import assert from 'node:assert/strict';
import { demo, initialDemoState, outcomeRows, metricValue } from '../src/data/demo.js';

test('company classifications preserve baseline and conserve outcomes in each range', () => {
 for(const range of Object.keys(demo.ranges))for(const rule of Object.keys(demo.rules)){
  const before=JSON.stringify(demo.ranges[range]);
  const rows=outcomeRows({...initialDemoState(),range,rule});
  for(const metric of ['signups','revenue','retained'])assert.equal(rows.company[metric]+rows.shifted[metric],rows.mmp[metric]);
  assert.equal(rows.company.spend,rows.mmp.spend);
  assert.equal(metricValue(rows.shifted,'roas'),null);
  assert.equal(JSON.stringify(demo.ranges[range]),before);
  assert.equal(rows.shifted.signups,demo.rules[rule].counts[range==='7'?0:1]);
 }
});
test('date filters scale counts and preserve rate semantics',()=>{
 const short=outcomeRows({...initialDemoState(),range:'7'}),long=outcomeRows(initialDemoState());
 assert.equal(long.total.signups,short.total.signups*4);
 assert.equal(long.total.revenue,short.total.revenue*4);
 assert.equal(metricValue(long.mmp,'roas'),metricValue(short.mmp,'roas'));
 assert.equal(metricValue(long.total,'retention'),metricValue(short.total,'retention'));
});
