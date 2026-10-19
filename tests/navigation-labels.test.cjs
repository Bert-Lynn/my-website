'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const names={execution:'任务列表',today:'发展路线',resources:'课程学习',projects:'项目作品',overview:'博士计划',roles:'实习岗位参考',skills:'详细自查记录'};
for(const [page,label] of Object.entries(names)){
 const tag=html.match(new RegExp('<button[^>]*data-page="'+page+'"[^>]*>'))?.[0];
 assert(tag,`navigation ${page} exists`);
 assert(tag.includes(`aria-label="${label}"`),`${page} has an explicit stable accessible name`);
 assert(tag.includes('type="button"'),`${page} is not a submit control`);
}
let selectedRole='agent_engineering';
const ctx={window:null,URL,addEventListener(){},phdCareerProgress:{read:()=>({selectedRole,skills:{},milestones:{}})}};
ctx.window=ctx;vm.runInNewContext(fs.readFileSync(path.join(root,'career-ui.js'),'utf8'),ctx);
assert.equal(ctx.CareerUI.role().tag,'当前主线');
assert.match(ctx.CareerUI.role().name,/Agent 开发/);
selectedRole='decision_optimization';assert.equal(ctx.CareerUI.role().tag,'原有方向');
selectedRole='forecasting_ml';assert.equal(ctx.CareerUI.role().tag,'可选方向');
assert(html.includes('./career-ui.js?v=20261019-action-clarity1'),'updated role labels bypass the previous cached UI asset');
console.log('PASS explicit desktop/narrow navigation names and Agent main-direction labels; saved direction IDs unchanged.');
