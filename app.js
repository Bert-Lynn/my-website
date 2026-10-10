const tasks = [
  {
    "id": "sep-python",
    "month": "2026.10",
    "category": "learning",
    "stream": "courses",
    "title": "Python核心基础",
    "detail": "变量、容器、循环、函数、文件、异常、模块、类",
    "outcome": "能独立写数据处理程序",
    "url": "https://www.bilibili.com/video/BV1sHU9BmEne/",
    "originalMonth": "2026.09"
  },
  {
    "id": "sep-git",
    "month": "2026.10",
    "category": "foundation",
    "stream": "foundation",
    "title": "Git与Linux入门",
    "detail": "Shell、Git、环境、调试",
    "outcome": "建立第一个规范科研仓库",
    "url": "https://www.bilibili.com/video/BV15qzxBhEsa/",
    "originalMonth": "2026.09"
  },
  {
    "id": "sep-paper0",
    "month": "2026.10",
    "category": "research",
    "stream": "paper0",
    "title": "现有RI-logit论文继续推进",
    "detail": "不因AI转向中断原有博士成果",
    "outcome": "形成下一版完整修改稿",
    "originalMonth": "2026.09"
  },
  {
    "id": "sep-a-data",
    "month": "2026.10",
    "category": "research",
    "stream": "paperA",
    "title": "论文A数据管线",
    "detail": "明确预测对象、时间切分、特征与泄漏检查",
    "outcome": "可重复生成训练/验证/测试数据",
    "originalMonth": "2026.09"
  },
  {
    "id": "oct-a-base",
    "month": "2026.11",
    "category": "research",
    "stream": "paperA",
    "title": "论文A基线",
    "detail": "历史均值、线性模型、XGBoost等",
    "outcome": "首张可信baseline表",
    "originalMonth": "2026.10"
  },
  {
    "id": "oct-algo",
    "month": "2026.11",
    "category": "learning",
    "stream": "courses",
    "title": "数据结构算法基础",
    "detail": "数组、哈希、栈队列、复杂度",
    "outcome": "开始持续算法训练",
    "url": "https://www.hello-algo.com/",
    "originalMonth": "2026.10"
  },
  {
    "id": "oct-repo",
    "month": "2026.11",
    "category": "foundation",
    "stream": "foundation",
    "title": "科研代码工程化",
    "detail": "配置、日志、结果目录、可复现实验入口",
    "outcome": "代码不再依赖手工修改路径",
    "originalMonth": "2026.10"
  },
  {
    "id": "nov-d2l",
    "month": "2026.12",
    "category": "learning",
    "stream": "courses",
    "title": "PyTorch与深度学习训练",
    "detail": "张量、自动求导、MLP、训练验证、过拟合",
    "outcome": "独立搭建训练循环",
    "url": "https://www.bilibili.com/video/BV1RxZmYCEfB/",
    "originalMonth": "2026.11"
  },
  {
    "id": "nov-a-models",
    "month": "2026.12",
    "category": "research",
    "stream": "paperA",
    "title": "论文A机器学习/深度学习模型",
    "detail": "XGBoost、MLP、LSTM/TCN及合理时序模型",
    "outcome": "统一实验框架下的模型比较",
    "originalMonth": "2026.11"
  },
  {
    "id": "nov-a-horizon",
    "month": "2026.12",
    "category": "research",
    "stream": "paperA",
    "title": "长预测期退化实验",
    "detail": "比较不同预测期下误差与稳定性",
    "outcome": "形成第一条研究发现",
    "originalMonth": "2026.11"
  },
  {
    "id": "dec-a-shift",
    "month": "2027.01",
    "category": "research",
    "stream": "paperA",
    "title": "跨市场/分布变化实验",
    "detail": "市场异质性、需求冲击、跨时间泛化",
    "outcome": "不止做模型排行榜",
    "originalMonth": "2026.12"
  },
  {
    "id": "dec-air-v01",
    "month": "2027.01",
    "category": "demo",
    "stream": "airdemo",
    "title": "AirDemandLab v0.1",
    "detail": "训练、预测、模型比较、错误分析",
    "outcome": "第一个AI Demo可运行",
    "milestone": true,
    "originalMonth": "2026.12"
  },
  {
    "id": "dec-vision-mini",
    "month": "2027.01",
    "category": "demo",
    "stream": "visiondemo",
    "title": "小型视觉训练Demo",
    "detail": "完成一次分类训练、验证、推理闭环",
    "outcome": "证明自己会完整训练视觉模型",
    "originalMonth": "2026.12"
  },
  {
    "id": "jan-seq",
    "month": "2027.02",
    "category": "learning",
    "stream": "courses",
    "title": "RNN/LSTM、注意力与Transformer",
    "detail": "理解时序建模与注意力计算",
    "outcome": "能解释并修改时序模型",
    "url": "https://www.bilibili.com/video/BV1RxZmYCEfB/",
    "originalMonth": "2027.01"
  },
  {
    "id": "jan-a-write",
    "month": "2027.02",
    "category": "research",
    "stream": "paperA",
    "title": "论文A完整写作",
    "detail": "方法、实验、失败分析、局限与相关工作",
    "outcome": "完成可投稿全文",
    "originalMonth": "2027.01"
  },
  {
    "id": "jan-b-base",
    "month": "2027.02",
    "category": "research",
    "stream": "paperB",
    "title": "论文B预测到优化基线",
    "detail": "把需求预测接入航班计划/机型指派或其他优化决策",
    "outcome": "跑通预测到最终决策的链条",
    "originalMonth": "2027.01"
  },
  {
    "id": "feb-a-submit",
    "month": "2027.03",
    "category": "research",
    "stream": "paperA",
    "title": "论文A正式投稿",
    "detail": "按贡献匹配期刊/会议并提交",
    "outcome": "获得正式投稿记录",
    "milestone": true,
    "originalMonth": "2027.02"
  },
  {
    "id": "feb-air-v1",
    "month": "2027.03",
    "category": "demo",
    "stream": "airdemo",
    "title": "AirDemandLab v1.0",
    "detail": "README、环境、训练、评估、独立推理入口",
    "outcome": "形成求职可展示项目",
    "milestone": true,
    "originalMonth": "2027.02"
  },
  {
    "id": "feb-b-metric",
    "month": "2027.03",
    "category": "research",
    "stream": "paperB",
    "title": "论文B决策质量指标",
    "detail": "定义成本、收益、运力错配等下游指标",
    "outcome": "明确预测准确率与决策质量的区别",
    "originalMonth": "2027.02"
  },
  {
    "id": "mar-cs231n",
    "month": "2027.04",
    "category": "learning",
    "stream": "courses",
    "title": "CS231n视觉主课",
    "detail": "CNN、ResNet、训练技巧、ViT、检测/分割",
    "outcome": "进入现代计算机视觉",
    "url": "https://www.bilibili.com/video/BV1nJ411z7fe/",
    "originalMonth": "2027.03"
  },
  {
    "id": "mar-b-dfl",
    "month": "2027.04",
    "category": "research",
    "stream": "paperB",
    "title": "论文B决策导向学习",
    "detail": "比较普通预测、预测后优化、决策导向训练",
    "outcome": "完成核心方法实验",
    "originalMonth": "2027.03"
  },
  {
    "id": "mar-vision-repro",
    "month": "2027.04",
    "category": "demo",
    "stream": "visiondemo",
    "title": "视觉论文核心复现",
    "detail": "选1篇高水平工作复现主要实验并记录偏差",
    "outcome": "形成复现报告",
    "originalMonth": "2027.03"
  },
  {
    "id": "apr-b-robust",
    "month": "2027.05",
    "category": "research",
    "stream": "paperB",
    "title": "论文B稳健性与消融",
    "detail": "需求扰动、稳定性、计算代价、机制消融",
    "outcome": "主实验基本完整",
    "originalMonth": "2027.04"
  },
  {
    "id": "apr-c-scope",
    "month": "2027.05",
    "category": "research",
    "stream": "paperC",
    "title": "论文C选题筛选",
    "detail": "AI感知/学习必须连接优化、调度或复杂系统决策",
    "outcome": "形成1页Research Question与最小实验",
    "originalMonth": "2027.04"
  },
  {
    "id": "apr-vision-v01",
    "month": "2027.05",
    "category": "demo",
    "stream": "visiondemo",
    "title": "VisionLab v0.1",
    "detail": "视觉训练、推理、错误分析、扰动测试",
    "outcome": "独立视觉仓库第一版",
    "originalMonth": "2027.04"
  },
  {
    "id": "may-multimodal",
    "month": "2027.06",
    "category": "learning",
    "stream": "courses",
    "title": "多模态/生成模型扩展",
    "detail": "CLIP、自监督、生成模型按研究和兴趣选学",
    "outcome": "扩宽技术栈而不强行变成论文",
    "url": "https://www.bilibili.com/video/BV1aiADewEBC/",
    "originalMonth": "2027.05"
  },
  {
    "id": "may-b-write",
    "month": "2027.06",
    "category": "research",
    "stream": "paperB",
    "title": "论文B完整写作",
    "detail": "突出AI与优化真正耦合而非串联",
    "outcome": "完成完整论文稿",
    "originalMonth": "2027.05"
  },
  {
    "id": "may-c-pilot",
    "month": "2027.06",
    "category": "research",
    "stream": "paperC",
    "title": "论文C先导实验",
    "detail": "优先尝试视觉/多模态感知到优化决策，也可切AI增强优化",
    "outcome": "确认问题真实、数据可得、实验可行",
    "originalMonth": "2027.05"
  },
  {
    "id": "jun-b-submit",
    "month": "2027.07",
    "category": "research",
    "stream": "paperB",
    "title": "论文B正式投稿",
    "detail": "完成补实验、检查与正式提交",
    "outcome": "第二篇新增论文获得投稿记录",
    "milestone": true,
    "originalMonth": "2027.06"
  },
  {
    "id": "jun-vision-v05",
    "month": "2027.07",
    "category": "demo",
    "stream": "visiondemo",
    "title": "VisionLab v0.5",
    "detail": "加入图文、多模态或更高级视觉模块",
    "outcome": "Demo不受博士论文边界限制",
    "originalMonth": "2027.06"
  },
  {
    "id": "jun-c-rq",
    "month": "2027.07",
    "category": "research",
    "stream": "paperC",
    "title": "论文C研究问题锁定",
    "detail": "明确AI信息怎样改变下游优化决策质量",
    "outcome": "完整研究设计与基线",
    "originalMonth": "2027.06"
  },
  {
    "id": "jul-special",
    "month": "2027.08",
    "category": "learning",
    "stream": "courses",
    "title": "岗位专项补课",
    "detail": "按兴趣选择C++、3D视觉、机器人、自动驾驶或医学视觉",
    "outcome": "不再无目的刷系统课程",
    "originalMonth": "2027.07"
  },
  {
    "id": "jul-c-main",
    "month": "2027.08",
    "category": "research",
    "stream": "paperC",
    "title": "论文C主实验",
    "detail": "基线、方法/机制、跨条件泛化",
    "outcome": "主结果表与关键图",
    "originalMonth": "2027.07"
  },
  {
    "id": "jul-c-ablation",
    "month": "2027.08",
    "category": "research",
    "stream": "paperC",
    "title": "论文C消融与失败分析",
    "detail": "验证改善来自哪里、哪些条件失效",
    "outcome": "结论有证据而非单次最优",
    "originalMonth": "2027.07"
  },
  {
    "id": "aug-c-full",
    "month": "2027.09",
    "category": "research",
    "stream": "paperC",
    "title": "论文C完整实验包",
    "detail": "稳健性、成本、泛化、局限",
    "outcome": "完成论文级证据链",
    "originalMonth": "2027.08"
  },
  {
    "id": "aug-vision-v1",
    "month": "2027.09",
    "category": "demo",
    "stream": "visiondemo",
    "title": "VisionLab v1.0",
    "detail": "README、Demo、实验结果、失败案例、个人贡献",
    "outcome": "第二个成熟GitHub项目",
    "milestone": true,
    "originalMonth": "2027.08"
  },
  {
    "id": "aug-c-draft",
    "month": "2027.09",
    "category": "research",
    "stream": "paperC",
    "title": "论文C完整初稿",
    "detail": "把实验结论转成论文结构",
    "outcome": "形成可内部审阅全文",
    "originalMonth": "2027.08"
  },
  {
    "id": "sep-interview",
    "month": "2027.09",
    "category": "learning",
    "stream": "courses",
    "title": "AI算法岗面试准备",
    "detail": "算法题、项目答辩、模型训练排错、岗位专项",
    "outcome": "能够现场解释和修改自己的项目",
    "originalMonth": "2027.09"
  },
  {
    "id": "sep-c-submit",
    "month": "2027.10",
    "category": "research",
    "stream": "paperC",
    "title": "论文C正式投稿",
    "detail": "AI感知/学习与优化决策交叉成果",
    "outcome": "第三篇新增论文正式投稿",
    "milestone": true,
    "originalMonth": "2027.09"
  },
  {
    "id": "sep-revision",
    "month": "2027.09",
    "category": "research",
    "stream": "paper0",
    "title": "处理已有论文审稿意见",
    "detail": "论文A/B及现有成果按实际状态修改",
    "outcome": "保持论文管线连续",
    "originalMonth": "2027.09"
  },
  {
    "id": "sep-apply",
    "month": "2027.09",
    "category": "demo",
    "stream": "foundation",
    "title": "集中投递AI算法实习",
    "detail": "以论文、Demo、GitHub和项目答辩材料申请技术岗位",
    "outcome": "形成持续投递与面试反馈闭环",
    "milestone": true,
    "originalMonth": "2027.09"
  }
];

const streamLabels={paper0:"现有论文",paperA:"论文 A",paperB:"论文 B",paperC:"论文 C",courses:"课程",airdemo:"AirDemandLab",visiondemo:"VisionLab",foundation:"基础能力"};
const papers=[
{stream:"paperA",code:"A",title:"智能需求预测",due:"2027.03",desc:"长预测期、跨市场泛化、需求冲击与分布变化。"},
{stream:"paperB",code:"B",title:"决策导向学习",due:"2027.07",desc:"让预测模型真正服务下游优化与最终决策质量。"},
{stream:"paperC",code:"C",title:"AI 感知 + 优化",due:"2027.10",desc:"视觉、多模态或其他 AI 感知，连接调度、维修、分配或规划。"}
];
const demos=[
{stream:"airdemo",title:"AirDemandLab",due:"2027.03",desc:"需求预测、比较、错误分析与优化决策接口。"},
{stream:"visiondemo",title:"VisionLab",due:"2027.09",desc:"视觉、ViT、检测分割、CLIP 与多模态自由扩展。"}
];
const courses=[
["2026.10-11","黑马程序员 Python","https://www.bilibili.com/video/BV1sHU9BmEne/"],
["穿插学习","MIT Missing Semester 2026","https://www.bilibili.com/video/BV15qzxBhEsa/"],
["2026.12-2027.03","李沐 动手学深度学习","https://www.bilibili.com/video/BV1RxZmYCEfB/"],
["全年少量","Hello 算法","https://www.hello-algo.com/"],
["2027.04起","Stanford CS231n","https://www.bilibili.com/video/BV1nJ411z7fe/"],
["2027.06起选学","李宏毅 2025 机器学习","https://www.bilibili.com/video/BV1aiADewEBC/"]
];
const key="lin-ai-phd-roadmap-progress-v1";
let progress={};
try {
  const saved=JSON.parse(localStorage.getItem(key)||"{}");
  if(saved && typeof saved==="object" && !Array.isArray(saved)) progress=saved;
} catch {}
const plannedMonths=[...new Set(tasks.map(t=>t.month))].sort();
let observedMonth=currentMonth();
let activeMonth=observedMonth;
let view="month";
function currentMonth(){
  const parts=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date());
  return parts.find(p=>p.type==="year").value+"."+parts.find(p=>p.type==="month").value;
}
function monthTasks(month){return tasks.filter(t=>t.month===month)}
function carriedTasks(month){return tasks.filter(t=>t.month<month && !progress[t.id])}
function refreshMonth(){
  const now=currentMonth();
  if(now!==observedMonth){if(activeMonth===observedMonth) activeMonth=now;observedMonth=now;render()}
}
let pendingOnly=false;
const stages=[
  {end:'2027.01',title:'打好基础，跑通实验',desc:'搭建编程与数据底座，建立可信基线，让第一个 Demo 跑起来。'},
  {end:'2027.03',title:'完成首篇投稿',desc:'把论文 A 的实验整理成完整论文，同时推进决策优化研究。'},
  {end:'2027.07',title:'拓展方法，沉淀成果',desc:'推进论文 B 投稿，锁定论文 C 的研究问题，迭代视觉项目。'},
  {end:'2027.10',title:'成果收束，走向实习',desc:'完成论文 C 与成熟项目，带着可展示的成果准备面试与投递。'}
];
function stageTasks(i){return tasks.filter(t=>t.month<=stages[i].end && (!i||t.month>stages[i-1].end))}
function tally(a){return {done:a.filter(t=>progress[t.id]).length,total:a.length,pct:a.length?Math.round(a.filter(t=>progress[t.id]).length/a.length*100):0}}
function bar(percent){return '<div class="progress-line"><i style="width:'+percent+'%"></i></div>'}
function taskMarkup(t){
  const carried=t.month<activeMonth && !progress[t.id];
  const timing=(t.originalMonth!==t.month?'原计划 '+t.originalMonth+' → ':'')+'计划 '+t.month;
  return '<article id="task-'+t.id+'" class="task-item category-'+t.category+' '+(progress[t.id]?'done':'')+'"><label class="task-check"><input id="check-'+t.id+'" type="checkbox" data-id="'+t.id+'" aria-label="完成：'+t.title+'" '+(progress[t.id]?'checked':'')+'></label><div class="task-copy"><label class="task-title" for="check-'+t.id+'">'+t.title+'</label><p>'+t.detail+'</p><small>完成标准 · '+t.outcome+'</small><div class="task-tags"><i>'+streamLabels[t.stream]+'</i>'+(t.milestone?'<i class="hot">里程碑</i>':'')+(carried?'<i class="carry-tag">顺延待办</i>':'')+'</div><small class="task-timing">'+timing+'</small></div>'+(t.url?'<a href="'+t.url+'" target="_blank" rel="noreferrer" aria-label="打开'+t.title+'课程">课程 ↗</a>':'')+'</article>';
}
function taskGroup(title,a){
  const stats=tally(a),shown=pendingOnly?a.filter(t=>!progress[t.id]):a;
  if(!shown.length) return '';
  return '<section class="task-month"><div class="task-month-head"><strong>'+title+'</strong><span>'+stats.done+' / '+stats.total+' 已完成</span></div><div>'+shown.map(taskMarkup).join('')+'</div></section>';
}
function pct(stream){return tally(tasks.filter(t=>t.stream===stream)).pct}
function save(){
  try{localStorage.setItem(key,JSON.stringify(progress));document.querySelector('#saveStatus').textContent='已保存到当前浏览器 · 不跨设备同步';return true}
  catch{document.querySelector('#saveStatus').textContent='当前浏览器无法保存进度；请勿关闭页面，以免丢失本次勾选。';return false}
}
function toggle(id){
  const source=document.activeElement;
  const historyOpen=document.querySelector('.completed-history')?.open;
  progress[id]=!progress[id];const saved=save();render();
  if(historyOpen && document.querySelector('.completed-history')) document.querySelector('.completed-history').open=true;
  const input=document.querySelector('#check-'+id);
  if(source?.dataset?.id===id){if(input)input.focus({preventScroll:true});else document.querySelector('#pendingOnly').focus({preventScroll:true})}
  document.querySelector('#announcer').textContent=(progress[id]?'已完成：':'已恢复待办：')+tasks.find(t=>t.id===id).title+(saved?'，进度已保存。':'，当前浏览器未能保存。');
}
function jumpToTask(id){
  pendingOnly=false;document.querySelector('#pendingOnly').checked=false;view='month';render();
  const el=document.querySelector('#task-'+id);if(el){el.classList.add('highlight');el.scrollIntoView({behavior:'smooth',block:'center'});el.querySelector('input').focus({preventScroll:true})}
}
function render(){
  const overall=tally(tasks),now=currentMonth();
  document.querySelector('#todayLabel').textContent=now.replace('.',' / ')+' · 上海时间';
  document.querySelector('#overallPct').textContent=overall.pct;
  document.querySelector('#overallCount').textContent=overall.done+' / '+tasks.length+' 项已完成';
  document.querySelector('#overallNote').textContent=overall.done===0?'从第一项开始，积累会被看见。':overall.done===tasks.length?'这一段旅程，已全部完成。':'每一次勾选，都让成果更近一步。';
  document.querySelector('#remainingCount').textContent='还剩 '+(tasks.length-overall.done)+' 项';
  document.querySelector('#overallSegments').innerHTML=tasks.map(t=>'<i class="'+(progress[t.id]?'complete':'')+'" title="'+t.title+'"></i>').join('');
  document.querySelector('#dimensionProgress').innerHTML=[['科研','research'],['课程与基础','learning'],['项目','demo']].map(([label,c])=>{const a=tasks.filter(t=>c==='learning'?['learning','foundation'].includes(t.category):t.category===c),s=tally(a);return '<div class="dimension-row"><span>'+label+'</span>'+bar(s.pct)+'<strong>'+s.done+' / '+s.total+' 项</strong></div>'}).join('');
  let si=stages.findIndex((s,i)=>stageTasks(i).some(t=>!progress[t.id]));const allDone=si<0;if(allDone)si=stages.length-1;
  const ss=tally(stageTasks(si));
  document.querySelector('#stageIndex').textContent=allDone?'全部完成':'阶段 0'+(si+1)+' / 04';
  document.querySelector('#stageTitle').textContent=allDone?'本阶段计划已完成':stages[si].title;
  document.querySelector('#stageDesc').textContent=allDone?'所有 41 项任务都已勾选完成。你可以在全年视图回顾每一项积累。':stages[si].desc;
  document.querySelector('#stageTrack').innerHTML=stages.map((s,i)=>'<span class="'+(tally(stageTasks(i)).done===stageTasks(i).length?'complete':i===si?'current':'')+'" title="'+s.title+'"></span>').join('');
  document.querySelector('#stageCount').textContent='本阶段 '+ss.done+' / '+ss.total+' 项已完成';
  const milestoneDefs=[['feb-a-submit','论文 A 投稿','paperA'],['jun-b-submit','论文 B 投稿','paperB'],['sep-apply','实习投递',null],['sep-c-submit','论文 C 投稿','paperC']];
  document.querySelector('#milestones').innerHTML=milestoneDefs.map(([id,title,stream])=>{const t=tasks.find(t=>t.id===id),done=!!progress[id];const status=done?'已完成':t.month<now?'待完成':stream&&pct(stream)>0?'推进中':'待完成';return '<div class="milestone"><time>'+t.month+'</time><strong>'+title+'</strong><span class="status-pill '+(done?'done':'')+'">'+status+'</span></div>'}).join('');
  const months=[...new Set([...plannedMonths,now,activeMonth])].sort();
  const backlog=carriedTasks(activeMonth),mt=monthTasks(activeMonth),ms=tally(mt);
  document.querySelector('#activeMonthTitle').textContent=activeMonth;
  document.querySelector('#monthPct').textContent=mt.length?ms.pct+'%':'—';
  document.querySelector('#monthCount').textContent=mt.length?'当月计划 '+ms.done+' / '+mt.length+' 完成':'本月无新增计划';
  document.querySelector('#backlogCount').innerHTML=backlog.length+'<small>项</small>';
  document.querySelector('#backlogNote').textContent=backlog.length?'来自 '+backlog[0].month+' 起的未完成任务，已保留在清单中。先补齐，再推进。':'所选月之前没有未完成任务。按自己的节奏，推进眼前的一步。';
  const next=[...backlog,...mt.filter(t=>!progress[t.id])].slice(0,3);
  document.querySelector('#nextActions').innerHTML=next.length?next.map((t,i)=>'<button class="next-action" data-next="'+t.id+'"><span class="next-index">0'+(i+1)+'</span><span><strong>'+t.title+'</strong><small>'+t.outcome+'</small><em>'+(t.month<activeMonth?'顺延自 '+t.month:streamLabels[t.stream])+' · 查看任务 ↗</em></span></button>').join(''):'<div class="next-empty">所选月待办已清空 ✓<br>可以回顾成果，或选择下个月。</div>';
  document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>jumpToTask(b.dataset.next));
  document.querySelector('#monthPicker').innerHTML=months.map(m=>'<button class="'+(m===activeMonth?'active':'')+'" aria-pressed="'+(m===activeMonth)+'" data-month="'+m+'">'+m.slice(2)+'</button>').join('');
  document.querySelectorAll('#monthPicker button').forEach(b=>b.onclick=()=>{activeMonth=b.dataset.month;view='month';render();document.querySelector('[data-month="'+activeMonth+'"]').focus({preventScroll:true})});
  document.querySelectorAll('#viewTabs button').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-pressed',String(b.dataset.view===view))});
  const captions={month:'所选月计划 + 此前未完成',year:'全部 41 项 · 按计划月份',research:'科研成果与论文任务',learning:'课程学习与基础能力',demo:'项目开发与实习投递'};
  document.querySelector('#viewCaption').textContent=captions[view];
  let list=view==='year'?tasks:view==='research'?tasks.filter(t=>t.category==='research'):view==='learning'?tasks.filter(t=>['learning','foundation'].includes(t.category)):view==='demo'?tasks.filter(t=>t.category==='demo'):mt;
  let markup='';
  if(view==='month'){
    const history=tasks.filter(t=>t.month<activeMonth && progress[t.id]);
    markup=(backlog.length?taskGroup('顺延待办 · 优先补齐',backlog):'')+taskGroup(activeMonth+' 计划',mt)+(history.length&&!pendingOnly?'<details class="completed-history"><summary>已完成历史任务（'+history.length+'）· 可取消勾选</summary>'+taskGroup('已完成历史',history)+'</details>':'');
  }else markup=plannedMonths.filter(m=>list.some(t=>t.month===m)).map(m=>taskGroup(m,list.filter(t=>t.month===m))).join('');
  document.querySelector('#taskGroups').innerHTML=markup||'<div class="next-empty">'+(pendingOnly?'当前视图没有未完成任务 ✓':'此月没有新安排；未完成任务会持续显示在这里。')+'</div>';
  document.querySelectorAll('.task-item input').forEach(el=>el.onchange=()=>toggle(el.dataset.id));
  const submitted=['feb-a-submit','jun-b-submit','sep-c-submit'].filter(id=>progress[id]).length,finishedDemos=['feb-air-v1','aug-vision-v1'].filter(id=>progress[id]).length;
  document.querySelector('#outcomeCount').textContent='已投稿 '+submitted+' / 3 · 成熟项目 '+finishedDemos+' / 2';
  document.querySelector('#paperGrid').innerHTML=papers.map(p=>{const a=tasks.filter(t=>t.stream===p.stream),s=tally(a),next=a.find(t=>!progress[t.id]);return '<article><div class="paper-top"><div class="paper-code">'+p.code+'</div><span>目标投稿 · '+p.due+'</span></div><h3>'+p.title+'</h3><p>'+p.desc+'</p><div class="paper-foot"><span>'+s.done+' / '+s.total+' 项已完成</span><strong>'+s.pct+'%</strong></div>'+bar(s.pct)+'<div class="stream-next">'+(next?'下一步 · '+next.title:'全部任务已完成 ✓')+'</div></article>'}).join('');
  document.querySelector('#demoList').innerHTML=demos.map((d,i)=>{const s=tally(tasks.filter(t=>t.stream===d.stream));return '<article><span class="demo-icon">'+(i?'◈':'⌁')+'</span><div><h3>'+d.title+'</h3><p>'+d.desc+'</p>'+bar(s.pct)+'</div><div class="demo-stat"><strong>'+s.pct+'%</strong><span>'+s.done+' / '+s.total+' 项</span><span>目标 '+d.due+'</span></div></article>'}).join('');
}
document.querySelectorAll('#viewTabs button').forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});
document.querySelector('#todayBtn').onclick=()=>{activeMonth=currentMonth();view='month';render()};
document.querySelector('#pendingOnly').onchange=e=>{pendingOnly=e.target.checked;render()};
document.querySelector('#resetBtn').onclick=()=>{if(confirm('确定清空全部 41 项任务的勾选进度吗？此操作无法撤销。')){progress={};save();render();document.querySelector('#announcer').textContent='全部进度已重置。'}};
document.querySelector('#courseList').innerHTML=courses.map(c=>'<a href="'+c[2]+'" target="_blank" rel="noreferrer"><span>'+c[0]+'</span><strong>'+c[1]+'</strong><i>↗</i></a>').join('');
render();
window.addEventListener('focus',refreshMonth);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshMonth()});
window.addEventListener('storage',e=>{if(e.key===key){try{const saved=JSON.parse(e.newValue||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved)){progress=saved;render()}}catch{}}});
setInterval(refreshMonth,60000);
