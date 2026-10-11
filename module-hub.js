/* A read-only overview of the current device/account. No progress is stored here. */
(function (root) {
  'use strict';
  let options = {};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const count = (done, total) => ({done, total, pct:total ? Math.round(done / total * 100) : 0});
  function snapshot() {
    const tasks = options.tasks?.() || [], progress = options.progress?.() || {};
    const tally = list => count(list.filter(task => !!progress[task.id]).length, list.length);
    const career = root.CareerUI?.stats?.() || {lessons:{done:0,total:0},skillsPassed:0,skillsTotal:0};
    const project = root.CareerUI?.mainProjectStats?.() || {done:0,total:0};
    const status = options.sync?.()?.status?.() || {};
    return {
      total:tally(tasks),
      buckets:[['research','科研与论文',task=>task.category==='research'],['learning','课程与基础',task=>['learning','foundation'].includes(task.category)],['demo','项目与实习',task=>task.category==='demo']].map(([id,label,filter])=>({id,label,...tally(tasks.filter(filter))})),
      lessons:count(career.lessons.done,career.lessons.total),
      project:count(project.done,project.total),
      skills:count(career.skillsPassed,career.skillsTotal),
      role:root.CareerUI?.role?.().name || '当前学习方向',
      source:status.userId ? '当前账号的私有记录' : '此浏览器的本机记录'
    };
  }
  const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const icons = {
    tasks:'<path d="M8 5h12v16H4V5h4m0-2h8v4H8V3Z"/><path d="m8 12 1.5 1.5L12 11m2 2h3m-9 4h9"/>',
    learn:'<path d="M12 5v15m0-15C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Z"/>',
    project:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="m8 9-3 3 3 3m8-6 3 3-3 3m-3-7-2 8M7 21h10"/>',
    research:'<path d="M5 2h10l5 5v15H5V2Zm10 0v5h5M8 11h9m-9 4h9m-9 4h5"/>',
    roles:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V3h8v4M2 12l10 3 10-3m-10 1v4"/>'
  };
  const icon = key => '<svg class="hub-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icons[key]+'</svg>';
  const bar = (value,label) => '<div class="hub-progress-bar" role="progressbar" aria-label="'+esc(label)+'" aria-valuemin="0" aria-valuemax="'+value.total+'" aria-valuenow="'+value.done+'" aria-valuetext="'+value.done+' / '+value.total+' 已完成"><span style="width:'+value.pct+'%"></span></div>';
  function card({route,number,kicker,title,description,action,key,featured}) {
    return '<a class="hub-module-card'+(featured?' hub-card-wide':'')+'" href="#'+route+'" data-hub-route="'+route+'"><div class="hub-card-top"><span>'+number+' / '+kicker+'</span>'+icon(key)+'</div><h3>'+title+'</h3><p>'+description+'</p><div class="hub-card-footer"><span>'+action+'</span>'+arrow+'</div></a>';
  }
  function render() {
    const el = root.document?.getElementById('moduleHub');
    if(!el || !options.openPage) return;
    const s = snapshot();
    const independent = [
      {id:'lessons',title:'课程课节',value:s.lessons,unit:'节已学',note:s.role+' · 当前必修课节'},
      {id:'project',title:'用户反馈分析 Agent',value:s.project,unit:'阶段完成',note:'独立的 4 件成果 · 手动自查保存'},
      {id:'skills',title:'实习技能自查',value:s.skills,unit:'项自查通过',note:'当前方向的必需技能 · 实操自评'}
    ];
    el.innerHTML = '<section class="hub-plan-progress" aria-labelledby="hubProgressTitle"><div class="hub-overall"><div class="hub-section-kicker">PLAN PROGRESS</div><h2 id="hubProgressTitle">整体进度<span>原计划任务</span></h2><div class="hub-overall-number"><strong id="hubOverallPercent">'+s.total.pct+'<small>%</small></strong><span id="hubOverallCount">'+s.total.done+' / '+s.total.total+' 项已完成</span></div>'+bar(s.total,'原计划整体任务')+'<p>按实际勾选计算，不按时间推进。</p></div><div class="hub-breakdown"><div class="hub-breakdown-heading"><h3>原计划细分进度</h3><span>这三项合计 '+s.total.total+' 个任务</span></div>'+s.buckets.map(b=>'<div class="hub-breakdown-row" data-hub-bucket="'+b.id+'"><div><span>'+b.label+'</span><strong>'+b.done+' <small>/ '+b.total+' 项</small></strong></div>'+bar(b,b.label)+'</div>').join('')+'</div></section>'+
      '<section class="hub-independent-progress" aria-label="独立学习与准备记录">'+independent.map(item=>'<article data-hub-metric="'+item.id+'"><div><h3>'+item.title+'</h3><strong>'+item.value.done+' <small>/ '+item.value.total+'</small></strong></div>'+bar(item.value,item.title)+'<p>'+item.unit+' · '+item.note+'</p></article>').join('')+'</section><p class="hub-progress-note">课节、Demo 阶段和技能自查分别记录，不计入上方 '+s.total.total+' 项；自查通过不代表已投递或已录用。</p>'+
      '<section class="hub-module-section" aria-labelledby="hubModuleTitle"><div class="hub-module-heading"><h2 id="hubModuleTitle">今天，从哪里开始？</h2><span>选择一个模块，专注眼前这件事。</span></div><div class="hub-module-grid">'+[
        {route:'execution/month',number:'01',kicker:'PLAN & DO',title:'整体任务',description:'查看真实月计划与顺延待办。做完一项，就记录一项。',action:'打开任务列表',key:'tasks',featured:true},
        {route:'resources',number:'02',kicker:'LEARN',title:'课程学习',description:'按当前方向继续学习，打开资料、完成练习，再记录课节。',action:'继续当前学习模块',key:'learn',featured:true},
        {route:'projects',number:'03',kicker:'BUILD & DELIVER',title:'Demo 制作与交付',description:'分阶段做出作品，留下代码、测试和演示链接。',action:'查看阶段与提交记录',key:'project'},
        {route:'execution/research',number:'04',kicker:'RESEARCH',title:'科研与论文',description:'集中查看研究任务，推进实验、写作与论文投稿。',action:'打开 '+s.buckets[0].total+' 项科研任务',key:'research'},
        {route:'roles',number:'05',kicker:'PREPARE',title:'实习准备',description:'对照岗位要求与技能记录，明确下一步准备什么。',action:'查看岗位与准备要求',key:'roles'}
      ].map(card).join('')+'</div></section><div class="hub-data-note"><span>数据来源：'+s.source+'。</span><span>交付入口用于保存证据链接，不会自动发布或向外投递。</span></div>';
    el.querySelectorAll('[data-hub-route]').forEach(link=>link.onclick=event=>{event.preventDefault();return options.openPage(link.dataset.hubRoute);});
  }
  root.ModuleHub = {init(value){options=value;render();},render,snapshot};
  root.addEventListener('careerprogresschange',render);
})(window);
