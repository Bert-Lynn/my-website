/* The start page recommends actions; all completion records remain in the original task UI. */
(function (root) {
  'use strict';
  const first = 'practice-wa-video-2025-heima-pandas-io';
  // Labels explain the skill before the exercise. Existing IDs and checks stay authoritative.
  const week = {
    'wa-m0': '用 Python 筛选、去重和统计表格。',
    'wa-m1': '让 AI 调用 Python 函数，按不同要求生成文件。',
    'wa-m2': '给 Python 程序写测试，能查出坏数据和运行错误。',
    'wa-m3': '用同一组题比较两种做法，再写一份别人能照着跑的说明。'
  };
  const basics = {
    'wa-video-2025-heima-pandas-io': [
      '用 Python 读取和保存表格',
      '学会打开一份 CSV 表格，再另存为新文件。',
      '练习做完后，打开新表核对 8 条记录。'
    ],
    'wa-video-2025-heima-pandas-filter': [
      '用 Python 筛选表格、去掉重复行',
      '按列里的值挑出几行，再按编号去掉重复记录。',
      '小练习：只留 2.1 版的 6 条。把一条记录复制进去，去重后全表仍是 8 条。'
    ],
    'wa-m0': [
      '用 Python 给表格分类和计数',
      '把读表、去重、分类和计数写到同一个脚本里。',
      '小练习：导出一张统计表，每类的数量都能按编号重新数出来。'
    ],
    'wa-video-2026-nange-langchain-quickstart': [
      '让 AI 调用 Python 函数',
      '学怎么把现成的函数交给模型，让它按你的要求选择和运行。',
      '小练习：在有授权的模型环境里，给出两种不同要求，检查调用参数和导出结果。'
    ],
    'wa-m1': [
      '让 AI 按要求筛数据、写报告',
      '分别试试“整理全部”和“只看 2.1 版”，保留两次运行的记录。',
      '小练习：打开两次生成的表格和报告，核对筛选范围有没有按要求变化。'
    ],
    'wa-video-2025-heima-assertions': [
      '用 assert 检查程序算得对不对',
      '把你预期的结果写进代码。实际结果不一样，程序就报错。',
      '小练习：把一个预期值故意改错，确认程序报错；改回来后应通过。'
    ],
    'wa-video-2025-heima-pytest': [
      '用 pytest 一次跑多项检查',
      '把检查写成测试函数，试试空表、缺编号和重复编号。',
      '小练习：故意弄坏一处代码，测试要能查出来；修好后再跑一次。'
    ],
    'wa-m2': [
      '处理坏数据和运行失败',
      '试试缺列、重复、超时和读到不该读的文件。',
      '小练习：错误要能被发现，程序不能把失败说成成功。'
    ],
    'wa-video-2026-manxue-agent-graders': [
      '给 AI 的答案定检查标准',
      '先写好一组题和正确答案，检查计数、筛选、引用和文件能否打开。',
      '小练习：评分前固定答案。让模型看不到标准答案，出错也照样记录。'
    ],
    'wa-video-2026-manxue-evaluation-suite': [
      '用同一组题比较两种 AI 做法',
      '比较直接问模型和让模型调用函数。两边用相同的资料。',
      '小练习：每道题分别记下输出、报错和耗时，换个目录也能重跑。'
    ],
    'wa-m3': [
      '写使用说明，让别人也能运行',
      '写清需要什么文件、输入什么命令、结果存在哪里。',
      '小练习：在空目录照说明跑一遍。再改一个筛选条件，看看结果有没有跟着变。'
    ]
  };
  const byId = id => root.document.getElementById(id);
  const set = (id, value) => { byId(id).textContent = value; };
  let previousId;

  function select(items) {
    return items.find(item => ['practice', 'delivery'].includes(item.kind) && !item.done) || null;
  }

  // A pack stays on screen until its required work is done. No calendar or new completion keys.
  function dailyPack(items) {
    for (const stage of Object.keys(week)) {
      const stageItems = items.filter(item => item.stageId === stage);
      const practices = stageItems.filter(item => item.kind === 'practice');
      if (practices.some(item => !item.done)) {
        const firstVideo = stageItems.find(item => item.kind === 'watch');
        return { stage, required: practices, rows: firstVideo ? [...practices, firstVideo] : practices };
      }
      const delivery = stageItems.find(item => item.kind === 'delivery');
      if (delivery && !delivery.done) return { stage, required: [delivery], rows: [delivery] };
    }
    return null;
  }

  let packKey = '';
  function renderPack(pack) {
    const list = byId('learningPackRows');
    const count = byId('learningPackCount');
    if (!list || !count) return;
    const rootDoc = root.document;
    const key = pack?.rows.map(item => item.id).join('|') || 'empty';
    const done = pack?.required.filter(item => item.done).length || 0;
    const summary = pack ? '必做已完成 ' + done + ' / ' + pack.required.length + ' 项' : '主线已完成';
    if (count.textContent !== summary) count.textContent = summary;
    const bar = byId('learningPackProgress');
    if (bar) {
      bar.setAttribute('max', pack?.required.length || 1);
      bar.setAttribute('value', pack ? done : 1);
    }
    if (key === packKey) {
      for (const item of pack?.rows || []) {
        const input = list.querySelector('[data-home-lesson="' + item.progressId + '"]');
        if (input) { input.checked = item.done; input.closest('li')?.classList.toggle('lh-task-done', item.done); }
      }
      return;
    }
    const hadFocus = list.contains(rootDoc.activeElement);
    packKey = key;
    list.textContent = '';
    if (!pack) {
      const empty = rootDoc.createElement('p');
      empty.textContent = '所有练习和验收都做完了。';
      empty.tabIndex = -1;
      list.appendChild(empty);
      if (hadFocus) empty.focus?.();
      return;
    }
    const groups = {};
    for (const item of pack.rows) {
      const group = item.kind === 'watch' ? 'optional' : 'required';
      if (!groups[group]) {
        const groupEl = rootDoc.createElement('section');
        groupEl.setAttribute('class','lh-task-group lh-task-group-' + group);
        groupEl.setAttribute('aria-labelledby','learning-list-' + group);
        const label = rootDoc.createElement('h3');
        label.id = 'learning-list-' + group;
        label.textContent = group === 'optional' ? '可选视频' : item.kind === 'delivery' ? '验收' : '必做练习';
        groupEl.appendChild(label);
        groups[group] = rootDoc.createElement('ul');
        groupEl.appendChild(groups[group]);
        list.appendChild(groupEl);
      }
      const optional = item.kind === 'watch';
      const isDelivery = item.kind === 'delivery';
      const skill = basics[isDelivery ? item.stageId : item.source.id]?.[0] || item.title;
      const li = rootDoc.createElement('li');
      li.classList.toggle('lh-task-done', item.done);
      const kind = rootDoc.createElement('span');
      kind.className = 'lh-task-kind';
      kind.textContent = optional ? item.source.durationLabel : '';
      if (optional) li.appendChild(kind);
      if (!isDelivery) {
        const label = rootDoc.createElement('label');
        const id = 'lh-' + item.progressId;
        label.setAttribute('for', id);
        label.textContent = skill;
        li.appendChild(label);
        const checkbox = rootDoc.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.checked = item.done;
        checkbox.setAttribute('data-home-lesson', item.progressId);
        if (!optional) checkbox.setAttribute('data-home-required', 'true');
        checkbox.onchange = () => {
          const checked = checkbox.checked;
          const saved = root.UnifiedTasks.saveLesson(item.progressId, checked);
          if (!saved) {
            checkbox.checked = !checked;
            byId('learningPackStatus').textContent = '没能保存。请稍后再试。';
          } else {
            render();
            byId('learningPackStatus').textContent = checked ? '已勾选：' + skill : '已取消勾选：' + skill;
          }
        };
        li.appendChild(checkbox);
      } else {
        const title = rootDoc.createElement('span');
        title.className = 'lh-task-name';
        title.textContent = skill;
        li.appendChild(title);
      }
      const action = rootDoc.createElement('a');
      const url = optional && root.CareerUI?.safeURL?.(item.source.url);
      action.setAttribute('href', url || '#execution');
      action.textContent = optional && url ? '看视频' : isDelivery ? '去验收' : '看步骤';
      // Every action gets a specific accessible name, including repeated visible labels.
      action.setAttribute('aria-label', action.textContent + '：' + skill);
      if (url) {
        action.setAttribute('target', '_blank');
        action.setAttribute('rel', 'noopener noreferrer');
      } else {
        action.onclick = event => {
          if (modified(event)) return;
          event.preventDefault();
          if (item.progressId === first && select(root.UnifiedTasks.registry())?.progressId === first) {
            if (byId('learningTodaySteps').hidden) byId('learningTodayStepsButton').click();
            byId('learningTodaySample').focus?.();
          } else root.UnifiedTasks.openItem(item.id);
        };
      }
      li.appendChild(action);
      groups[group].appendChild(li);
    }
    if (hadFocus) (list.querySelector('[data-home-required]') || list.querySelector('a'))?.focus?.();
  }

  function renderStageProgress(items, pack) {
    const table = byId('learningStageTable');
    if (!table) return;
    for (const row of table.querySelectorAll('[data-progress-stage]')) {
      const stage = row.dataset.progressStage;
      const requirements = items.filter(item => item.stageId === stage
        && (item.kind === 'practice' || item.kind === 'delivery'));
      const finished = requirements.filter(item => item.done).length;
      const next = requirements.find(item => !item.done);
      row.classList.toggle('lh-stage-current', stage === pack?.stage);
      const count = row.querySelector('.lh-stage-count');
      count.textContent = requirements.length ? finished + ' / ' + requirements.length : '—';
      const link = row.querySelector('.lh-stage-next');
      const empty = row.querySelector('.lh-stage-empty');
      link.hidden = !next;
      empty.hidden = Boolean(next);
      empty.textContent = requirements.length ? '本阶段完成' : '—';
      if (next) {
        link.textContent = basics[next.kind === 'delivery' ? stage : next.source?.id]?.[0] || next.title;
        link.onclick = event => {
          if (modified(event)) return;
          event.preventDefault();
          root.UnifiedTasks.openItem(next.id);
        };
      }
    }
  }

  function renderSignal(items, pack) {
    const path = byId('learningCourseSignal');
    if (!path) return;
    for (const stop of path.querySelectorAll('[data-signal-stage]')) {
      const stage = stop.dataset.signalStage;
      const milestones = items.filter(item => item.stageId === stage
        && (item.kind === 'practice' || item.kind === 'delivery'));
      const finished = milestones.length > 0 && milestones.every(item => item.done);
      const current = stage === pack?.stage;
      stop.classList.toggle('lh-signal-current', current);
      stop.classList.toggle('lh-signal-done', finished);
      if (current) stop.setAttribute('aria-current', 'step');
      else stop.removeAttribute('aria-current');
      stop.querySelector('.lh-signal-status').textContent = current ? '现在学' : finished ? '已完成' : '';
    }
  }

  function modified(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  }

  function render() {
    const page = byId('learningHome');
    const registry = root.UnifiedTasks?.registry;
    const path = byId('learningPath');
    if (!page || !registry || (page.hidden && path.hidden)) return;
    const items = registry();
    const pack = dailyPack(items);
    const item = select(items);
    if (!path.hidden) {
      for (const row of path.querySelectorAll('[data-home-stage]')) {
        const current = row.dataset.homeStage === item?.stageId;
        row.classList.toggle('lh-path-current', current);
        row.querySelector('strong').hidden = !current;
      }
      return;
    }
    renderPack(pack);
    renderSignal(items, pack);
    renderStageProgress(items, pack);
    const id = item?.id || '';
    const steps = byId('learningTodaySteps');
    const actionButton = byId('learningTodayStepsButton');
    const record = byId('learningTodayRecord');
    const sample = byId('learningTodaySample');
    const video = byId('learningTodayVideo');
    const firstPractice = item?.progressId === first;
    const detail = item && basics[item.kind === 'delivery' ? item.stageId : item.source?.id];
    const nextWeek = week[item?.stageId] || '练习都完成了。现在可以回看做好的作品。';

    if (id !== previousId) {
      steps.hidden = true;
      actionButton.setAttribute('aria-expanded', 'false');
      previousId = id;
    }
    set('learningTodayTitle', detail?.[0] || '回看做好的作品');
    set('learningTodayAction', detail?.[1] || '照说明重跑一次，再改一个条件看看结果。');
    set('learningTodayCheck', detail?.[2] || '确认结果和说明里的一样，出错时也能看见提示。');
    set('learningWeekTitle', nextWeek);
    byId('learningSamplePreview').hidden = !firstPractice;
    actionButton.textContent = firstPractice && !steps.hidden ? '收起步骤' : '看怎么做';
    actionButton.hidden = !item;
    video.hidden = item?.kind !== 'practice';
    sample.hidden = !firstPractice;
    if (!video.hidden) {
      const url = root.CareerUI?.safeURL?.(item.source.url);
      video.hidden = !url;
      if (url) {
        video.setAttribute('href', url);
        video.textContent = '看视频 · ' + item.source.durationLabel;
      }
    }
    if (firstPractice) {
      actionButton.setAttribute('aria-controls', 'learningTodaySteps');
      actionButton.setAttribute('aria-expanded', String(!steps.hidden));
    } else {
      actionButton.removeAttribute('aria-controls');
      actionButton.removeAttribute('aria-expanded');
    }
    const doneLink = byId('learningDoneLink');
    doneLink.hidden = Boolean(item);
    record.onclick = event => {
      if (!modified(event) && item) {
        event.preventDefault();
        root.UnifiedTasks.openItem(item.id);
      }
    };
    actionButton.onclick = () => {
      if (!firstPractice && item) { root.UnifiedTasks.openItem(item.id); return; }
      steps.hidden = !steps.hidden;
      actionButton.setAttribute('aria-expanded', String(!steps.hidden));
      actionButton.textContent = steps.hidden ? '看怎么做' : '收起步骤';
    };
  }

  for (const link of root.document.querySelectorAll('[data-home-route]')) {
    link.onclick = event => {
      if (!modified(event) && root.AppNavigation?.open) {
        event.preventDefault();
        if (root.AppNavigation.route() !== link.dataset.homeRoute) root.AppNavigation.open(link.dataset.homeRoute);
      }
    };
  }
  for (const link of root.document.querySelectorAll('[data-home-scroll]')) {
    link.onclick = event => {
      if (modified(event)) return;
      const target = byId(link.dataset.homeScroll);
      if (!target) return;
      event.preventDefault();
      target.focus?.({preventScroll:true});
      target.scrollIntoView?.({behavior:root.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'start'});
    };
  }
  root.addEventListener('careerprogresschange', render);
  root.LearningHome = { render, select, dailyPack };
})(window);
