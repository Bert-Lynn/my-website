/* Optional public activities. No progress, account, application or network writes. */
(function (root) {
  'use strict';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const safeUrl = value => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : ''; }
    catch { return ''; }
  };
  const link = (url, label, cls = '') => {
    const href = safeUrl(url);
    return href ? '<a class="' + esc(cls) + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + '<span class="sr-only">（在新标签页打开）</span></a>' : '<span>' + esc(label) + '（链接暂不可用）</span>';
  };
  const list = values => '<ul>' + (values || []).map(value => '<li>' + esc(value) + '</li>').join('') + '</ul>';
  const row = (label, value) => '<div><dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd></div>';
  function status(item) {
    const code = item.status?.code;
    const caution = code === 'closed_historical' || code === 'registration_closed_historical' || code === 'cfp_provisional';
    return '<span class="event-status' + (caution ? ' event-status-caution' : '') + '">' + esc(item.status?.label || '状态待核实') + '</span>';
  }
  function fullDetails(item, data) {
    const skillNames = (item.skillIds || []).map(id => root.CAREER_CURRICULUM?.skills?.find(skill => skill.id === id)?.title || id);
    const sources = (item.sourceIds || []).map(id => (data.sources || []).find(source => source.id === id)).filter(Boolean);
    const feeLabels = { registration: '报名 / 注册', compute: '算力 / 调用', submission: '投稿', publication: '出版', travel: '出行' };
    return '<details class="event-evidence"><summary>参与细节与官方证据</summary><div class="event-evidence-body">' +
      '<p><strong>先过这道门槛：</strong>' + esc(item.readinessGate) + '</p>' +
      '<p><strong>参与要求：</strong>' + esc(item.officialWorkRequirements) + '</p>' +
      '<p><strong>资格：</strong>' + esc(item.eligibility?.official) + ' ' + esc(item.eligibility?.userFit) + '</p>' +
      '<h4>建议留存的成果</h4>' + list(item.proposedDeliverable) +
      '<p><strong>能力对应：</strong>' + esc(skillNames.join('；')) + '。这是准备建议，不是雇主认证。</p>' +
      '<p><strong>估时：</strong>' + esc((item.estimatedEffort?.hours || []).join('–')) + ' 小时。' + esc(item.estimatedEffort?.basis) + ' ' + esc(item.estimatedEffort?.weeklyRule) + '</p>' +
      '<p><strong>费用：</strong>' + esc(Object.entries(item.fees || {}).map(([key, value]) => (feeLabels[key] || key) + '：' + value).join('；')) + '</p>' +
      '<p><strong>时间与开放状态：</strong>' + esc(item.dates?.note) + ' ' + esc(item.status?.futureEdition) + '</p>' +
      '<p><strong>雇主证据：</strong>' + esc(item.employerRecognition?.evidence) + '</p>' +
      '<p><strong>证据边界：</strong>' + esc(item.employerRecognition?.limit) + '</p>' +
      '<h4>官方来源与核验限制</h4><ul class="event-source-list">' + sources.map(source => '<li>' +
        link(source.url, source.title) + '<span class="event-source-meta">核查 ' + esc(source.checkedAt) + '</span><p>' + esc(source.supports) + '</p>' +
        (source.accessNote ? '<p class="event-source-caveat">' + esc(source.accessNote) + '</p>' : '') + '</li>').join('') + '</ul></div></details>';
  }
  function cardBody(item, data) {
    const view = item.presentation || {};
    const source = (data.sources || []).find(source => source.id === view.primarySourceId);
    return '<p class="event-dates">' + esc(view.dateSummary) + '</p>' +
      '<dl class="event-brief">' + row('参与方式', view.participation) + row('需要基础', view.skills) + row('留下成果', view.output) + '</dl>' +
      '<div class="event-recognition"><p><strong>招聘关联：</strong>' + esc(view.recognition) + '</p><p>' + esc(view.recognitionLimit) + '</p></div>' +
      '<div class="event-actions">' + link(source?.url, view.primaryLabel || '查看官方来源', 'event-source-action') + '</div>' + fullDetails(item, data);
  }
  function render() {
    const host = root.document.getElementById('employerEvents'), data = root.EMPLOYER_EVENTS;
    if (!host) return;
    const first = data?.items?.find(item => item.priority === 'first_optional');
    if (!first) { host.innerHTML = '<p class="event-unavailable">可选活动资料暂未载入；岗位与学习记录照常可用。</p>'; return; }
    const later = data.items.filter(item => item.id !== first.id);
    host.innerHTML = '<section class="employer-events" aria-labelledby="employerEventsTitle">' +
      '<div class="event-section-heading"><div><span class="event-eyebrow">可选拓展 · 每次只选一项</span><h2 id="employerEventsTitle">比赛与开源实践</h2></div><span>核查 ' + esc(data.verifiedAt) + '</span></div>' +
      '<p class="event-section-intro">先完成当前 Agent 作品与评测，再按需要选择一项活动，补充可核验的求职成果。</p>' +
      '<p class="event-budget">' + esc(data.budgetRule) + '</p>' +
      '<article class="event-featured" data-employer-event="' + esc(first.id) + '"><div class="event-card-heading"><div><span class="event-eyebrow">优先了解 · 满足前置后再做</span><h3>' + esc(first.presentation?.shortTitle || first.title) + '</h3></div>' + status(first) + '</div><p class="event-tagline">' + esc(first.presentation?.tagline) + '</p>' + cardBody(first, data) + '</article>' +
      '<details class="event-later"><summary>后续再看 · ' + later.length + ' 个方向</summary><p class="event-later-note">历史赛题、后训练和研究投稿都可以以后再选，不必现在并行。</p><div class="event-later-list">' + later.map(item =>
        '<details class="event-option" data-employer-event="' + esc(item.id) + '"><summary><span><strong>' + esc(item.presentation?.shortTitle || item.title) + '</strong><span class="event-option-tagline">' + esc(item.presentation?.tagline) + '</span></span>' + status(item) + '</summary><div class="event-option-body">' + cardBody(item, data) + '</div></details>').join('') + '</div></details>' +
      '<p class="event-boundary">报名、旁听与证书不等于发表、获奖或招聘加分；主办与参与也不保证面试或录用。限期赛事当前未核实到可立即报名的一项。报名、上传或缴费前须重新核对规则。</p></section>';
  }
  root.EmployerEventsUI = { render };
  render();
})(window);
