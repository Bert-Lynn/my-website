/* Post-deployment public-URL smoke. This does not repeat the full quest suite. */
const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const target = new URL(process.env.GAME_URL || process.argv[2] || 'https://bert-lynn.github.io/my-website/games/ashen-age/');
target.searchParams.set('qa', '1');
target.searchParams.set('live-check', String(Date.now()));
const output = path.resolve(process.env.QA_OUTPUT || process.argv[3] || 'ashen-age-qa');
fs.mkdirSync(output, {recursive: true});
const expectedVersion = '2026.11.19-8';
const report = {
  url: target.href, expectedVersion, scope: 'Public deployment, same-origin assets, rendered hero, camera-relative W, walking skeleton, release, and one-shot attack. Guild, tavern, and full combat workflows are covered by the pre-deployment suites.',
  checks: [], requests: [], failedRequests: [], runtimeErrors: [], consoleErrors: [], webglErrors: [], screenshots: [],
  profiles: {visual: {width: 1280, height: 800, quality: '精细'}, functional: {width: 800, height: 500, quality: '流畅', renderer: 'Chromium ANGLE SwiftShader (CPU)'}}
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const subtract = (a, b) => a.map((x, i) => x - b[i]);
const magnitude = value => Math.hypot(...value);
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const idle = state => state.player.mode === 'Idle';
const walking = state => state.player.mode === 'Walk';
function check(name, passed, evidence = {}) {
  report.checks.push({name, passed: !!passed, evidence});
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name} ${JSON.stringify(evidence)}`);
}
async function until(read, predicate, timeout = 12000) {
  const started = Date.now();
  let state;
  do {
    state = await read();
    if (predicate(state)) return state;
    await sleep(100);
  } while (Date.now() - started < timeout);
  throw new Error('Timed out waiting for live deployment state: ' + JSON.stringify(state));
}
function poseDelta(a, b) {
  const left = a.player.bones.flatMap(bone => bone.q);
  const right = b.player.bones.flatMap(bone => bone.q);
  if (!left.length || left.length !== right.length) return null;
  return Math.max(...left.map((value, i) => Math.abs(value - right[i])));
}

(async () => {
  let browser, page, timer;
  const started = Date.now();
  async function verify() {
    if (target.protocol !== 'https:' || /^(?:localhost$|127\.|0\.0\.0\.0$|\[?::1\]?$|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/i.test(target.hostname)) {
      throw new Error('live.cjs must verify the public HTTPS deployment, not a local preview.');
    }
    browser = await chromium.launch({headless: true,
      ...(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {}),
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});
    const context = await browser.newContext({viewport: {width: 1280, height: 800}, deviceScaleFactor: 1});
    page = await context.newPage();
    page.setDefaultTimeout(12000);
    page.on('pageerror', error => report.runtimeErrors.push(String(error)));
    page.on('console', message => {
      const text = message.text();
      if (message.type() === 'error') report.consoleErrors.push(text);
      if (/WebGL.*(?:INVALID|error|failed|lost)|THREE\.WebGLProgram.*error|GL_INVALID|GL_OUT_OF_MEMORY|CONTEXT_LOST|shader.*(?:error|failed)/i.test(text)) report.webglErrors.push(text);
    });
    page.on('response', response => {
      const url = new URL(response.url());
      const asset = /\.glb$|\/vendor\/.*\.js$|\/assets\/motions\.json$/.test(url.pathname);
      if (url.origin === target.origin || asset) report.requests.push({url: url.href, status: response.status(), sameOrigin: url.origin === target.origin, asset});
    });
    page.on('requestfailed', request => report.failedRequests.push({url: request.url(), reason: request.failure()?.errorText}));
    const snapshot = async () => {
      const text = await page.locator('#qa-state').textContent();
      return text ? JSON.parse(text) : {ready: false};
    };
    const fresh = (before, predicate = () => true) => until(snapshot, state => Number.isFinite(state.frame) && state.frame > before.frame && predicate(state));
    const screenshot = async name => {
      await page.screenshot({path: path.join(output, `${name}.png`), timeout: 15000});
      report.screenshots.push({file: `${name}.png`, viewport: page.viewportSize()});
    };

    const documentResponse = await page.goto(target.href, {waitUntil: 'domcontentloaded', timeout: 45000});
    report.document = {status: documentResponse?.status(), url: page.url(), headers: {
      etag: documentResponse?.headers().etag,
      lastModified: documentResponse?.headers()['last-modified'],
      githubRequestId: documentResponse?.headers()['x-github-request-id']
    }};
    check('Public game document responds successfully', documentResponse?.ok(), report.document);
    await page.locator('#qa-state').waitFor({state: 'attached'});
    const initial = await until(snapshot, state => state.ready, 80000);
    report.initial = initial;
    report.readyAfterMs = Date.now() - started;
    await screenshot('live-01-spawn-high');
    check('Public deployment is the expected ready version', initial.ready && initial.version === expectedVersion, {version: initial.version, expectedVersion, readyAfterMs: report.readyAfterMs});
    if (initial.version !== expectedVersion) throw new Error('The public deployment version is not the expected version.');
    check('Live scene has a visible skinned-character render', initial.renderer.webgl2 === true && initial.renderer.triangles > 10000 && initial.player.skinnedMeshes > 0 && initial.player.boneCount >= 20, {renderer: initial.renderer, skinnedMeshes: initial.player.skinnedMeshes, bones: initial.player.boneCount});
    check('Initial live camera is outside collision volumes', initial.camera.insideCollider === false, initial.camera);

    // Retain the high-quality image above; reduce CPU-rendered pixels for input tests.
    await page.setViewportSize({width: 800, height: 500});
    const quality = page.locator('#quality');
    if (!(await quality.innerText()).includes('流畅')) await quality.click();
    const beforeWalk = await fresh(initial);
    console.log('LIVE_FUNCTIONAL_PROFILE '+JSON.stringify({...report.profiles.functional, frame: beforeWalk.frame, observedFPS: beforeWalk.renderer.fps}));
    const direction = subtract(beforeWalk.player.position, beforeWalk.camera.position);
    direction[1] = 0;
    const forward = direction.map(value => value / magnitude(direction));
    let walkA, walkB;
    try {
      await page.keyboard.down('KeyW');
      await sleep(650);
      walkA = await until(snapshot, state => state.frame > beforeWalk.frame && walking(state) && magnitude(subtract(state.player.position, beforeWalk.player.position)) > .4);
      await screenshot('live-02-walk-A');
      await sleep(250);
      walkB = await fresh(walkA, walking);
      await screenshot('live-03-walk-B');
    } finally {
      await page.keyboard.up('KeyW');
    }
    const released = await fresh(walkB, state => !state.controls.keys.KeyW && idle(state));
    const settled = await fresh(released, state => !state.controls.keys.KeyW && idle(state));
    const movement = subtract(released.player.position, beforeWalk.player.position);
    const alignment = dot(movement, forward) / magnitude(movement);
    const jointChange = poseDelta(walkA, walkB);
    check('Real W input moves in the live camera forward direction', magnitude(movement) > .4 && alignment > .88, {movement, distance: magnitude(movement), alignment, forward});
    check('Live walking advances local skeletal poses across fresh frames', walking(walkA) && walking(walkB) && walkB.frame > walkA.frame && jointChange !== null && jointChange > .01 && Math.max(walkA.player.actionTime, walkB.player.actionTime) > .1, {frameA: walkA.frame, frameB: walkB.frame, timeA: walkA.player.actionTime, timeB: walkB.player.actionTime, jointChange});
    check('Key release returns to Idle without drift on later frames', !released.controls.keys.KeyW && !settled.controls.keys.KeyW && idle(released) && idle(settled) && settled.frame > released.frame && magnitude(subtract(settled.player.position, released.player.position)) < .05, {releaseFrame: released.frame, settledFrame: settled.frame, mode: settled.player.mode, keys: settled.controls.keys, drift: magnitude(subtract(settled.player.position, released.player.position))});
    report.walk = {before: beforeWalk.player, frameA: walkA.player, frameB: walkB.player, released: released.player, settled: settled.player};

    const beforeAttack = await snapshot();
    await page.keyboard.press('KeyJ');
    const attack = await fresh(beforeAttack, state => state.player.mode === 'Attack' && state.player.actionTime >= .13);
    await screenshot('live-04-attack');
    const afterAttack = await fresh(attack, idle);
    const attackDelta = poseDelta(beforeAttack, attack);
    check('Live J input performs a skeletal attack and returns to Idle', attack.player.mode === 'Attack' && attackDelta !== null && attackDelta > .01 && idle(afterAttack) && afterAttack.frame > attack.frame, {attackFrame: attack.frame, afterFrame: afterAttack.frame, attackTime: attack.player.actionTime, jointChange: attackDelta, finalMode: afterAttack.player.mode});
    report.attack = {before: beforeAttack.player, during: attack.player, after: afterAttack.player};
    await screenshot('live-05-final');

    const required = ['assets/knight.glb', 'assets/garrick.glb', 'assets/mira.glb', 'assets/motions.json', 'vendor/three.module.js'];
    const missing = required.filter(file => !report.requests.some(request => new URL(request.url).pathname.endsWith('/'+file) && request.status >= 200 && request.status < 400 && request.sameOrigin));
    const badResponses = report.requests.filter(request => request.status >= 400);
    const externalAssets = report.requests.filter(request => request.asset && !request.sameOrigin);
    check('Required deployed models and engine load from the same origin', missing.length === 0 && externalAssets.length === 0, {missing, externalAssets});
    check('No live asset request fails or returns an HTTP error', report.failedRequests.length === 0 && badResponses.length === 0, {failedRequests: report.failedRequests, badResponses});
    check('No live runtime, console, or WebGL errors', report.runtimeErrors.length === 0 && report.consoleErrors.length === 0 && report.webglErrors.length === 0, {runtime: report.runtimeErrors, console: report.consoleErrors, webgl: report.webglErrors});
    report.final = await snapshot();
  }
  try {
    await Promise.race([
      verify(),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Public deployment smoke exceeded its 170-second execution budget.')), 170000); })
    ]);
  } catch (error) {
    report.fatal = String(error.stack || error);
    console.error(report.fatal);
    if (page) await page.screenshot({path: path.join(output, 'live-fatal.png'), timeout: 5000}).catch(() => {});
  } finally {
    clearTimeout(timer);
    if (browser) await browser.close();
    report.elapsedMs = Date.now() - started;
    report.passed = !report.fatal && report.checks.length > 0 && report.checks.every(item => item.passed);
    fs.writeFileSync(path.join(output, 'live-report.json'), JSON.stringify(report, null, 2));
  }
  process.exitCode = report.passed ? 0 : 1;
})();
