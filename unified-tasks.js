/* One index, independent source identities. Never infer one activity from another. */
(function(root){
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const videoIds=['wa-video-2025-heima-pandas-io','wa-video-2025-heima-pandas-filter','wa-video-2026-nange-langchain-quickstart','wa-video-2025-heima-assertions','wa-video-2025-heima-pytest','wa-video-2026-manxue-agent-graders','wa-video-2026-manxue-evaluation-suite'];
const progressIds=videoIds.flatMap(id=>['watch-'+id,'practice-'+id]);
const labels={watch:'视频课程',practice:'项目练习',delivery:'项目交付',research:'科研',researchPlan:'研究计划',plan:'原计划',lesson:'原课程',unit:'原练习',skill:'能力自查',archive:'原项目'};
let opts={},filter='recent',statusFilter='all',query='',owner='',expanded=new Set(),lastRoute='',focusStage='',requestedId='',toolsOpen=false;
const lessons=()=>opts.sync?.()?.lessonSnapshot?.()||{};
const career=()=>root.phdCareerProgress?.read?.()||{skills:{},milestones:{}};
const dates=()=>opts.sync?.()?.lessonCompletedAtSnapshot?.()||{};
const formatDate=value=>value?root.GoalUI?.date?.(value)||value:'历史完成日期未记录';
function registry(){
 const all=[],seen=new Set(),lp=lessons(),cp=career(),tp=opts.progress?.()||{},now=opts.month?.()||'',videos=root.VIDEO_LEARNING?.resources||[],outline=root.PROJECT_OUTLINE||{};
 const add=item=>{if(!seen.has(item.id)){seen.add(item.id);all.push(item)}};
 for(const step of root.PAPER2_RESEARCH?.steps||[])add({id:'research-plan:'+step.id,kind:'researchPlan',current:true,readOnly:true,group:'paper2 · 当前探索（题目未定）',title:step.title,description:step.summary,check:step.check,source:step});
 for(const stage of outline.milestones||[]){
  for(const v of videos.filter(v=>v.taskId===stage.id&&videoIds.includes(v.id))){
   for(const kind of ['watch','practice']){const progressId=kind+'-'+v.id;add({id:'lesson:'+progressId,progressId,kind,current:true,stageId:stage.id,group:stage.title,title:(kind==='watch'?'看课：':'练习：')+(v.shortTitle||v.title),description:kind==='watch'?v.episodeLabel+' · '+v.watchScope:v.practice,check:kind==='watch'?'看完指定课节，再手动勾选；练习与项目交付分别记录。':v.check,url:v.url,source:v,done:lp[progressId]==='done',completedAt:dates()[progressId]})}
  }
  const r=cp.milestones?.[outline.projectId]?.[stage.id]||{};
  add({id:'milestone:'+outline.projectId+':'+stage.id,kind:'delivery',current:true,stageId:stage.id,group:stage.title,title:stage.title,description:stage.summary||stage.input,done:r.status==='done',status:r.status||'todo',completedAt:r.completedAt,source:stage});
 }
 for(const t of opts.tasks?.()||[]){const optional=!!(t.optional||root.CAREER_CURRICULUM?.taskOverrides?.[t.id]?.optional);add({id:'task:'+t.id,kind:t.category==='research'?'research':'plan',archivedResearch:t.stream===root.PAPER2_RESEARCH?.legacyStream,group:t.stream===root.PAPER2_RESEARCH?.legacyStream?'论文B · 历史方向':t.category==='research'?'科研与论文':'原月计划',title:t.title,description:t.outcome,check:t.detail,month:t.month,originalMonth:t.originalMonth,optional,current:t.category==='research'&&t.stream!==root.PAPER2_RESEARCH?.legacyStream&&!optional&&t.month<=now,carried:!tp[t.id]&&t.month<now,done:!!tp[t.id],completedAt:opts.sync?.()?.taskCompletedAtSnapshot?.()[t.id],source:t})}
 for(const c of root.COURSE_LESSONS?.courses||[])for(const l of c.lessons||[])add({id:'lesson:'+l.id,progressId:l.id,kind:'lesson',group:'原课程 · '+c.title,title:l.title,description:l.scope||l.chapter,check:l.acceptance,exercise:l.exercise||l.practice,url:l.url,done:lp[l.id]==='done',skipped:lp[l.id]==='skipped',completedAt:dates()[l.id],source:l});
 for(const u of root.CAREER_CURRICULUM?.learningUnits||[]){const id=u.canonicalProgressId||u.id;add({id:'lesson:'+id,progressId:id,kind:'unit',group:'原基础练习',title:u.title,description:u.scope||u.readingGuide,check:u.acceptance||u.exercise,exercise:u.exercise,url:u.url,done:lp[id]==='done',skipped:lp[id]==='skipped',completedAt:dates()[id],source:u})}
 for(const s of root.CAREER_CURRICULUM?.skills||[]){const r=cp.skills?.[s.id]||{};add({id:'skill:'+s.id,kind:'skill',group:'能力自查',title:s.title,description:s.assessment?.task||s.description,done:r.level==='passed'&&r.verification==='self_assessed',status:r.level,completedAt:r.assessedAt,source:s})}
 const archived=[...(root.CAREER_CURRICULUM?.projects||[]),...(outline.archivedProjects||[]).map(p=>({...p,id:p.projectId,title:p.mainTitle}))];
 for(const p of archived)for(const m of p.milestones||[]){const r=cp.milestones?.[p.id]?.[m.id]||{};add({id:'milestone:'+p.id+':'+m.id,kind:'archive',group:'原项目 · '+p.title,title:m.title,description:m.summary,done:r.status==='done',status:r.status,completedAt:r.completedAt,source:m,projectId:p.id})}
 return all;
}
const isMainline=x=>['watch','practice','delivery'].includes(x.kind);
function nextItem(list=registry()){return list.find(x=>isMainline(x)&&!x.done)||null}
function stageItems(list=registry()){
 const id=focusStage||nextItem(list)?.stageId;
 return id?list.filter(x=>isMainline(x)&&x.stageId===id):[];
}
// Presentation summaries of the existing exercise/check fields. No new requirements or state.
const practiceOutputs={
 'wa-video-2025-heima-pandas-io':'可打开的导出文件，保留反馈编号和原话',
 'wa-video-2025-heima-pandas-filter':'筛选后的反馈、反馈编号与去重计数',
 'wa-video-2026-nange-langchain-quickstart':'两种请求的 Excel、报告与真实工具调用记录',
 'wa-video-2025-heima-assertions':'三条断言、故意写错时的报错及边界输入检查',
 'wa-video-2025-heima-pytest':'测试函数、失败输出与修复后的复查结果',
 'wa-video-2026-manxue-agent-graders':'固定检查任务、正确答案与四类评分规则',
 'wa-video-2026-manxue-evaluation-suite':'逐例对照结果、失败记录与可重跑演示'
};
const deliveryBriefs={
 'wa-m0':{title:'生成有原文依据的问题表',action:'把反馈读取、去重、分类、计数和原文关联连起来，实际运行后打开结果核对。',output:'analyze.py、issues.xlsx、样例与实际运行命令',check:'全量8条、2.1版6条；各类数量能由反馈编号重算，原话和文档位置可复核。'},
 'wa-m1':{title:'让真实 Agent 生成表格和报告',action:'先确认模型与费用授权，再分别运行全量反馈和“只看2.1版本”两个请求。',output:'agent.py、两次运行的 issues.xlsx、report.md、run.json',check:'真实工具参数与筛选范围一起变化；文件能打开，失败或中断不显示成功。'},
 'wa-m2':{title:'补齐坏输入与失败处理测试',action:'测试缺列、重复、空结果、超时与越权读取；修复发现的问题后重跑。',output:'测试用例、失败输出、修复记录与复查结果',check:'坏输入有明确处理，越权被阻止，重试有上限；保留实际失败与复查证据。'},
 'wa-m3':{title:'完成对照评测并演示作品',action:'在相同资料范围比较直接问模型与 Agent，到干净目录重跑，再演示改条件与失败场景。',output:'逐例评测结果、README、演示与个人贡献说明',check:'保留真实失败、模型版本和耗时；能重跑、改筛选条件并解释局限。'}
};
function actionDetails(item){
 const x=typeof item==='string'?registry().find(row=>row.id===item):item;if(!x)return null;
 const v=x.source||{},plain=value=>Array.isArray(value)?value.join('；'):value||'',base={...x,taskHash:'#execution',href:'#execution',linkLabel:'查看操作与记录',action:x.description||'',output:'',check:x.check||''};
 if(x.kind==='watch')return {...base,title:'看视频：'+v.title,action:v.episodeLabel+' · '+v.durationLabel+'；'+v.watchScope,output:v.skillLabel,check:'看完指定课节后手动勾选；对应练习另做、另记。',href:v.url,linkLabel:'打开这节视频'};
 if(x.kind==='practice')return {...base,title:'动手：'+v.title,action:v.practice,output:practiceOutputs[v.id]||v.practice,check:v.check,location:'在自己电脑的 work-assistant 项目中，用编辑器与终端完成。',linkLabel:'展开练习与打卡'};
 if(x.kind==='delivery')return {...base,...(deliveryBriefs[x.stageId]||{title:v.title,action:v.summary,output:(v.deliverables||[]).join(' '),check:(v.acceptance||[]).join(' ')}),title:'交付：'+(deliveryBriefs[x.stageId]?.title||v.title),location:'代码与结果保存在本地；本站记录阶段状态和已有证据链接。',linkLabel:'打开交付步骤与记录'};
 if(x.kind==='researchPlan')return {...base,output:v.deliverable||'',linkLabel:'打开阅读范围与来源'};
 if(x.kind==='lesson'||x.kind==='unit')return {...base,action:plain(x.exercise)||x.description||'',output:plain(x.exercise),check:plain(x.check),linkLabel:'打开原练习与记录'};
 if(x.kind==='skill')return {...base,action:v.assessment?.transferTask||x.description||'',output:v.assessment?.evidenceRequirement||plain(v.assessment?.evidenceRequired),check:'',linkLabel:'打开原自评标准'};
 if(x.kind==='archive')return {...base,output:plain(v.deliverables),check:plain(v.acceptance),linkLabel:'打开原交付与记录'};
 if(x.kind==='research'||x.kind==='plan')return {...base,action:plain(x.check),output:x.description||'',check:'',linkLabel:'打开原计划与记录'};
 return base;
}
function nextAction(){return actionDetails(nextItem())}
function selected(list){const stageIds=new Set(stageItems(list).map(x=>x.id));return list.filter(x=>{
 const group=filter==='all'||filter==='recent'&&stageIds.has(x.id)||filter==='courses'&&x.kind==='watch'||filter==='practice'&&x.kind==='practice'||filter==='delivery'&&x.kind==='delivery'||filter==='research'&&(x.kind==='researchPlan'||x.kind==='research'&&!x.archivedResearch)||filter==='original'&&(x.archivedResearch||['plan','lesson','unit','skill','archive'].includes(x.kind));
 const state=statusFilter==='all'||statusFilter==='pending'&&!x.done&&!x.skipped||statusFilter==='done'&&x.done||statusFilter==='carried'&&x.carried||statusFilter==='skipped'&&x.skipped;
 return group&&state&&(!query||[x.title,x.description,x.check,x.group,labels[x.kind],x.source?.shortTitle,actionDetails(x)?.title,x.source?.episodeLabel,x.source?.practice,...(x.source?.focus||[]),...(x.source?.read||[]).map(id=>root.PAPER2_RESEARCH?.references.find(p=>p.id===id)?.title),...(x.source?.optionalRead||[]).map(id=>root.PAPER2_RESEARCH?.references.find(p=>p.id===id)?.title)].join(' ').toLowerCase().includes(query.toLowerCase()));
})}
const safeLink=(url,label)=>{const safe=root.CareerUI?.safeURL?.(url);return safe?'<a class="text-action" href="'+esc(safe)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>':''};
function stateLabel(x){return x.readOnly?'只读计划':x.done?'已完成':x.skipped?'已跳过':x.status==='doing'||x.status==='learning'||x.status==='practicing'?'正在做':x.carried?'顺延待办':'待完成'}
function row(x,next){
 const details=actionDetails(x);let body='';
 if(x.kind==='researchPlan')body=root.Paper2UI?.taskMarkup(x.source)||esc(x.description);
 else if(x.kind==='delivery')body=root.CareerUI?.taskMarkup?.(x.source)||'';
 else {
  body=(x.archivedResearch?'<p class="paper2-readonly">旧论文B历史方向，保留原任务与勾选；不表示当前paper2完成。当前探索请查看科研分类。</p>':'')+(x.description?'<p>'+esc(x.description)+'</p>':'')+(x.exercise&&x.exercise!==x.description?'<p><strong>练习：</strong>'+esc(x.exercise)+'</p>':'')+(x.check?'<p><strong>完成标准：</strong>'+esc(x.check)+'</p>':'')+(x.month?'<p>原计划时间：'+esc(x.month)+'；任务仍按原内容保留。</p>':'')+(x.done?'<p>实际完成：'+esc(formatDate(x.completedAt))+'</p>':'');
  if(x.kind==='practice')body='<p class="unified-location">'+esc(details.location)+'</p>'+body+'<p>按上面的验收逐项核对后，再记录完成。代码与实际结果留在自己的项目目录。</p>';
  if(x.kind==='watch')body+='<p>'+esc(x.source.author)+' · '+esc(x.source.durationLabel)+' · '+esc(x.source.episodeLabel)+'</p>';
  if(x.progressId)body+='<div class="unified-actions">'+safeLink(x.url,x.kind==='watch'?'打开这节视频':'打开资料')+'<label class="unified-check"><input type="checkbox" data-unified-lesson="'+esc(x.progressId)+'" '+(x.done?'checked':'')+'> '+(x.kind==='watch'?'我已看完这节':x.kind==='practice'?'我已完成练习并核对':'按原标准完成')+'</label></div>';
  else if(x.kind==='research'||x.kind==='plan')body+='<label class="unified-check"><input type="checkbox" data-unified-task="'+esc(x.source.id)+'" '+(x.done?'checked':'')+'> 按原标准完成这项任务</label>';
  else if(x.kind==='skill')body+='<button class="text-action" data-unified-skill="'+esc(x.source.id)+'">查看标准与自评记录 →</button>';
  else if(x.kind==='archive')body+='<button class="text-action" data-unified-project="'+esc(x.projectId)+'" data-unified-milestone="'+esc(x.source.id)+'">打开原项目记录 →</button>';
 }
 const fields=[[x.kind==='research'||x.kind==='plan'?'原步骤':'现在做',details.action],[x.kind==='watch'?'学会':x.kind==='research'||x.kind==='plan'?'目标结果':'留下',details.output],['验收',details.check]].filter(([,value])=>value);
 const brief=fields.length?'<span class="unified-brief">'+fields.map(([label,value])=>'<span><strong>'+label+'</strong><span>'+esc(value)+'</span></span>').join('')+'</span>':'';
 const actions=isMainline(x)?'<div class="unified-quick-actions">'+(x.kind==='watch'?safeLink(x.url,details.linkLabel):'<button class="text-action" data-unified-open="'+esc(x.id)+'">'+esc(details.linkLabel)+' →</button>')+(x.kind==='practice'&&x.stageId==='wa-m0'?'<a class="text-action" href="./data/work-agent-starter.zip" download>下载8条虚构样例 ↓</a>':'')+(x.kind==='practice'?'<span>在自己的编辑器和终端动手</span>':x.kind==='delivery'?'<span>在本地生成文件，再回来保存记录</span>':'')+'</div>':'';
 return '<article class="unified-task-card'+(isMainline(x)?' has-action-brief':'')+'" data-unified-card="'+esc(x.id)+'"><details class="unified-row'+(x.done?' is-done':'')+'" data-unified-row="'+esc(x.id)+'" '+(expanded.has(x.id)?'open':'')+'><summary><span class="unified-kind">'+labels[x.kind]+'</span><span class="unified-title">'+esc(details.title)+'<small>'+(x.kind==='watch'?esc(x.source.shortTitle)+' · '+esc(x.source.author):x.kind==='practice'?'对应课程：'+esc(x.source.shortTitle):x.kind==='researchPlan'?esc(x.source.readingMode)+' · 未接入打卡':x.kind==='research'?esc(x.month)+(x.carried?' · 顺延':''):x.current?'当前主线':'原记录 · 按需回看')+'</small></span><span class="unified-state">'+(next?.id===x.id?'<b>下一项</b>':'')+stateLabel(x)+'</span>'+'<span class="unified-disclosure">详情</span></summary><div class="unified-row-body">'+brief+body+actions+'</div></details>'+(x.kind==='watch'?'<div class="unified-direct-link">'+safeLink(x.url,'看视频')+'</div>':'')+'</article>';
}
function refreshSummaries(){
 const all=registry(),current=all.filter(isMainline),next=nextItem(all),el=root.document?.getElementById('currentTaskList');if(!el)return;
 const total=el.querySelector('[data-unified-total]');if(total)total.textContent='当前学习与作品 '+current.filter(x=>x.done).length+' / '+current.length+' 项完成';
 el.querySelectorAll('[data-unified-row]').forEach(row=>{const item=all.find(x=>x.id===row.dataset.unifiedRow);if(!item)return;row.classList.toggle('is-done',item.done);const state=row.querySelector('.unified-state');if(state)state.innerHTML=(next?.id===item.id?'<b>下一项</b>':'')+stateLabel(item)});
}
function allowChange(){return !root.CareerUI?.canNavigate||root.CareerUI.canNavigate()}
function refresh(){root.CareerUI?.render?.();root.ModuleHub?.render?.()}
function render(){
 const el=root.document?.getElementById('currentTaskList');if(!el||!opts.tasks)return;
 const user=opts.sync?.()?.status?.().userId||'';if(user!==owner){owner=user;expanded.clear();focusStage='';requestedId=''}
 if(requestedId){const item=registry().find(x=>x.id===requestedId);if(item)focusStage=item.stageId!==nextItem()?.stageId?item.stageId||'':'';requestedId=''}
 const all=registry(),visible=selected(all),current=all.filter(isMainline),next=nextItem(all),groups=[...new Set(visible.map(x=>x.group))];
 el.innerHTML='<section class="unified-tasks" aria-label="分阶段行动清单"><details class="unified-tools"'+(toolsOpen?' open':'')+'><summary>查找与全部记录</summary><div class="unified-summary"><span data-unified-total>当前学习与作品 '+current.filter(x=>x.done).length+' / '+current.length+' 项完成</span></div><div class="unified-toolbar"><label class="unified-search">查找任务<input type="search" id="unifiedSearch" placeholder="课程名、课节、练习或科研任务" value="'+esc(query)+'"></label><label>状态<select id="unifiedStatus">'+[['all','全部状态'],['pending','未完成'],['done','已完成'],['carried','顺延'],['skipped','已跳过']].map(([id,label])=>'<option value="'+id+'" '+(id===statusFilter?'selected':'')+'>'+label+'</option>').join('')+'</select></label></div><nav class="unified-filters" aria-label="总清单分类">'+[['recent','现在做'],['all','全部记录'],['courses','视频课程'],['practice','动手练习'],['delivery','项目交付'],['research','科研'],['original','原记录']].map(([id,label])=>'<button data-unified-filter="'+id+'" aria-pressed="'+(id===filter)+'">'+label+'</button>').join('')+'</nav></details><p class="unified-count">显示 '+visible.length+' 条'+(filter==='recent'?' · 当前阶段；其他阶段可在视频、练习、交付中查看':filter==='original'?' · 原课程、练习、项目与自查，不要求重新全做':'')+'。</p>'+(visible.length?groups.map(group=>'<section class="unified-group"><h2>'+esc(group)+'</h2>'+(group==='paper2 · 当前探索（题目未定）'?root.Paper2UI?.intro()||'':'')+visible.filter(x=>x.group===group).map(x=>row(x,next)).join('')+'</section>').join(''):'<p class="unified-empty">'+(filter==='recent'&&!next?'当前18项学习与交付均已记录完成。可查看科研、全部记录，或回看已有成果。':'没有符合条件的任务。可切换分类或清除搜索。')+'</p>')+'<details class="unified-record-note"><summary>记录说明</summary><p class="unified-note">paper2探索为只读计划，未接入打卡。原计划的 47 项进度仍单独计算。这里的记录数包含不同层级，不作为博士计划完成率；课程观看不会代替练习或交付。比赛与开源活动仍为可选资料。</p></details></section>';
 const tools=el.querySelector('.unified-tools');tools.ontoggle=()=>{if(tools.isConnected)toolsOpen=tools.open};
 el.querySelectorAll('[data-unified-filter]').forEach(b=>b.onclick=()=>{if(!allowChange())return;filter=b.dataset.unifiedFilter;focusStage='';refresh()});
 const search=el.querySelector('#unifiedSearch');search.onchange=()=>{if(!allowChange()){search.value=query;return}query=search.value.trim();if(query)filter='all';refresh();el.querySelector('#unifiedSearch')?.focus?.({preventScroll:true})};
 el.querySelector('#unifiedStatus').onchange=e=>{if(!allowChange()){e.target.value=statusFilter;return}statusFilter=e.target.value;if(['done','carried','skipped'].includes(statusFilter))filter='all';refresh()};
 el.querySelectorAll('[data-unified-open]').forEach(b=>b.onclick=()=>openItem(b.dataset.unifiedOpen));
 el.querySelectorAll('[data-unified-row]').forEach(d=>d.ontoggle=()=>{if(d.open)expanded.add(d.dataset.unifiedRow);else expanded.delete(d.dataset.unifiedRow)});
 el.querySelectorAll('[data-unified-lesson]').forEach(input=>input.onchange=()=>{if(!allowChange()){input.checked=!input.checked;return}const sync=opts.sync?.();const saved=sync?.setLesson?.(input.dataset.unifiedLesson,input.checked?'done':false);if(saved){refresh();opts.changed?.()}else{input.checked=!input.checked;const a=root.document.getElementById('announcer');if(a)a.textContent='进度未成功保存，请稍后重试。'}});
 el.querySelectorAll('[data-unified-task]').forEach(input=>input.onchange=()=>{if(!allowChange()){input.checked=!input.checked;return}opts.toggle?.(input.dataset.unifiedTask)});
 el.querySelectorAll('[data-unified-skill]').forEach(b=>b.onclick=()=>root.CareerUI?.openSkill?.(b.dataset.unifiedSkill));
 el.querySelectorAll('[data-unified-project]').forEach(b=>b.onclick=()=>root.CareerUI?.openArchivedTask?.(b.dataset.unifiedProject,b.dataset.unifiedMilestone));
}
function openItem(id){
 const item=registry().find(x=>x.id===id);if(!item||!allowChange())return false;
 if(root.AppNavigation?.route?.()!=='execution'&&root.AppNavigation?.open?.('execution')===false)return false;
 filter=isMainline(item)?'recent':item.kind==='researchPlan'||item.kind==='research'&&!item.archivedResearch?'research':'all';
 focusStage=isMainline(item)&&item.stageId!==nextItem()?.stageId?item.stageId:'';statusFilter='all';query='';expanded.add(id);refresh();
 const row=root.document?.querySelector('[data-unified-row="'+id+'"]');
 if(row){row.open=true;row.ontoggle?.();const work=row.querySelector('.task-work-detail');if(work){work.open=true;work.ontoggle?.()}row.scrollIntoView?.({block:'center'});row.querySelector('summary')?.focus?.({preventScroll:true})}
 return true;
}
root.UnifiedTasks={route(route){if(route!==lastRoute){if(route==='execution/research'){filter='research';statusFilter='all';query='';focusStage=''}else if(route==='execution'||route==='execution/current'){filter='recent';statusFilter='all';query='';focusStage=''}lastRoute=route}},progressIds,registry,selected,nextAction,actionDetails,openItem,render,refreshSummaries,init(o){opts=o},reset(){filter='recent';statusFilter='all';query='';focusStage=''},showTask(id){filter='recent';statusFilter='all';query='';requestedId='milestone:'+(root.PROJECT_OUTLINE?.projectId||'work-assistant')+':'+id;expanded.add(requestedId)}};
})(window);
