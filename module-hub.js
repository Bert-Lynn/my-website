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
  const bar = (value,label) => '<div class="hub-progress-bar" role="progressbar" aria-label="'+esc(label)+'" aria-valuemin="0" aria-valuemax="'+value.total+'" aria-valuenow="'+value.done+'" aria-valuetext="'+value.done+' / '+value.total+' 已完成"><span style="width:'+value.pct+'%"></span></div>';
  const link=(route,label)=>'<a href="#'+route+'" data-hub-route="'+route+'">'+label+' <span aria-hidden="true">→</span></a>';
  function render() {
    const el = root.document?.getElementById('moduleHub');
    if(!el || !options.openPage) return;
    const s = snapshot();
    const independent = [
      {id:'lessons',title:'以前的课程',value:s.lessons},
      {id:'project',title:'主项目验收',value:s.project},
      {id:'skills',title:'技能自查',value:s.skills}
    ];
    const study=root.CareerUI?.studyLinks?.();
    const currentVideos=(study?.resources||[]).slice(0,2).map(x=>{const safe=root.CareerUI?.safeURL?.(x.url);return safe?'<a href="'+esc(safe)+'" target="_blank" rel="noopener noreferrer">'+esc(x.shortTitle||x.title)+' ↗</a>':''}).join('');
    el.innerHTML='<div class="v7-record-grid"><section class="v7-record-section" aria-labelledby="hubProgressTitle">'+
      '<h2 id="hubProgressTitle">学习与项目</h2><p>这三类各自记录，完成一个不等于完成另一个。</p><dl class="v7-record-list">'+
      independent.map(item=>'<div data-hub-metric="'+item.id+'"><dt>'+item.title+'</dt><dd><strong>'+item.value.done+' / '+item.value.total+'</strong>'+bar(item.value,item.title)+'</dd></div>').join('')+
      '</dl></section><section class="v7-record-section v7-record-archive"><h2>原计划</h2><div class="v7-record-total"><strong id="hubOverallPercent">'+s.total.pct+'<small>%</small></strong><span id="hubOverallCount">'+s.total.done+' / '+s.total.total+' 项已完成</span></div>'+
      bar(s.total,'原计划整体任务')+'<dl class="v7-record-list">'+s.buckets.map(b=>'<div data-hub-bucket="'+b.id+'"><dt>'+b.label+'</dt><dd><strong>'+b.done+' / '+b.total+'</strong>'+bar(b,b.label)+'</dd></div>').join('')+'</dl></section></div>'+
      '<nav class="v7-record-shortcuts" aria-label="进度相关页面">'+link('execution','打开练习')+link('resources','课程')+link('projects','查看 4 项交付')+link('execution/research','阅读与研究任务')+link('roles','实习岗位')+'</nav>'+
      '<details class="hub-course-card v7-record-section"><summary>最近的课程参考</summary><p>'+esc(study?.title||'当前学习模块')+'</p><div class="hub-course-shortcuts">'+currentVideos+'</div></details>'+
      '<p class="hub-progress-note">自查通过不代表已投递或已录用。</p><p class="hub-data-note">数据来源：'+esc(s.source)+'。保存证据不会自动发布或向外投递。</p>';
    el.querySelectorAll('[data-hub-route]').forEach(link=>link.onclick=event=>{event.preventDefault();return options.openPage(link.dataset.hubRoute);});
  }
  root.ModuleHub = {init(value){options=value;render();},render,snapshot};
  root.addEventListener('careerprogresschange',render);
})(window);
