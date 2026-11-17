'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {makeDocument}=require('./helpers/app-harness.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const doc=makeDocument(html);
const names={home:'学习计划',resources:'课程',execution:'练习',projects:'项目','execution/research':'研究',roles:'实习'};
const nav=doc.querySelector('#mainTabs');
assert.equal(nav.getAttribute('aria-label'),'网站导航');
const items=nav.querySelectorAll('a');
assert.deepEqual(items.map(item=>item.textContent),Object.values(names));
assert.deepEqual(items.map(item=>item.getAttribute('href')),Object.keys(names).map(page=>'#'+page));
assert.equal(doc.querySelector('#cloudEntry').getAttribute('type'),'button');
assert.match(doc.querySelector('#cloudEntry').textContent,/我的记录/);
for(const [page,label] of Object.entries({cover:'网站封面',today:'方向设置',skills:'技能自查'})){
 const control=doc.querySelector('#moreNavigation [data-page="'+page+'"]');
 assert.equal(control.textContent,label);
 assert.equal(control.getAttribute('type'),'button');
}
let selectedRole='agent_engineering';
const ctx={window:null,URL,addEventListener(){},phdCareerProgress:{read:()=>({selectedRole,skills:{},milestones:{}})}};
ctx.window=ctx;vm.runInNewContext(fs.readFileSync(path.join(root,'career-ui.js'),'utf8'),ctx);
assert.equal(ctx.CareerUI.role().tag,'当前主线');
assert.match(ctx.CareerUI.role().name,/Agent 开发/);
selectedRole='decision_optimization';assert.equal(ctx.CareerUI.role().tag,'原有方向');
selectedRole='forecasting_ml';assert.equal(ctx.CareerUI.role().tag,'可选方向');
assert(html.includes('./career-ui.js?v=20261117-v7'),'updated role labels bypass the previous cached UI asset');
console.log('PASS explicit desktop/narrow navigation names and Agent main-direction labels; saved direction IDs unchanged.');
