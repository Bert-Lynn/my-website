/* Real-browser regression checks. Reads #qa-state; never mutates game state. */
const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const target = new URL(process.env.GAME_URL || process.argv[2] || 'http://127.0.0.1:4173/games/ashen-age/');
target.searchParams.set('qa', '1');
const output = path.resolve(process.env.QA_OUTPUT || process.argv[3] || 'ashen-age-qa');
fs.mkdirSync(output, {recursive: true});
const report = {url: target.href, checks: [], runtimeErrors: [], consoleErrors: [], webglErrors: [], failedRequests: [], screenshots: []};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const subtract = (a, b) => a.map((x, i) => x - b[i]);
const magnitude = vector => Math.hypot(...vector);
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const isLocomotion = mode => /walk|run|locomotion/i.test(String(mode));
const isIdle = mode => /idle|stand/i.test(String(mode));
const isAttack = mode => /attack|slash|strike|sword/i.test(String(mode));
function check(name, passed, evidence = {}) {
  report.checks.push({name, passed: !!passed, evidence});
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name} ${JSON.stringify(evidence)}`);
}
function horizontalForward(state) {
  const delta = subtract(state.player.position, state.camera.position);
  delta[1] = 0;
  const length = magnitude(delta);
  return delta.map(value => value / length);
}
function bonePose(state) {
  const bones = state.player.bones;
  if (!bones) return [];
  const entries = Array.isArray(bones) ? bones : Object.entries(bones).map(([name, q]) => ({name, q}));
  if (entries.every(value => typeof value === 'number')) return entries;
  return entries.flatMap(bone => {
    const q = Array.isArray(bone) ? bone : (bone.q || bone.quaternion || bone.rotation);
    return Array.isArray(q) ? q.filter(value => typeof value === 'number') : [];
  });
}
function poseDelta(a, b) {
  const x = bonePose(a), y = bonePose(b);
  if (!x.length || x.length !== y.length) return null;
  return Math.max(...x.map((value, index) => Math.abs(value - y[index])));
}
async function until(read, predicate, timeout = 12000) {
  const start = Date.now();
  let value;
  do {
    value = await read();
    if (predicate(value)) return value;
    await sleep(100);
  } while (Date.now() - start < timeout);
  throw new Error('Timed out waiting for game state: ' + JSON.stringify(value));
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.launch({
      headless: true,
      ...(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {}),
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
    });
    const context = await browser.newContext({viewport: {width: 1280, height: 800}, deviceScaleFactor: 1});
    page = await context.newPage();
    page.setDefaultTimeout(15000);
    const watch = observedPage => {
      observedPage.on('pageerror', error => report.runtimeErrors.push(String(error)));
      observedPage.on('console', message => {
        const text = message.text();
        if (message.type() === 'error') report.consoleErrors.push(text);
        if (/WebGL.*(?:INVALID|error|failed|lost)|THREE\.WebGLProgram.*error|GL_INVALID|GL_OUT_OF_MEMORY|CONTEXT_LOST|shader.*(?:error|failed)/i.test(text)) report.webglErrors.push(text);
      });
      observedPage.on('requestfailed', request => report.failedRequests.push({url: request.url(),reason: request.failure()?.errorText}));
    };
    watch(page);
    const screenshot = async name => {
      await page.screenshot({path: path.join(output, `${name}.png`)});
      report.screenshots.push(`${name}.png`);
    };
    const snapshot = async () => {
      const text = await page.locator('#qa-state').textContent();
      return text ? JSON.parse(text) : {ready: false};
    };
    const startedAt = Date.now();
    await page.goto(target.href, {waitUntil: 'domcontentloaded', timeout: 60000});
    await page.locator('#qa-state').waitFor({state: 'attached'});
    const initial = await until(snapshot, state => state.ready, 90000);
    report.initial = initial;
    report.readyAfterMs = Date.now() - startedAt;
    await screenshot('01-spawn');
    check('Required character assets finished loading', initial.ready === true, {version: initial.version, readyAfterMs: report.readyAfterMs, renderer: initial.renderer});
    check('Player has a skinned mesh and observable skeletal joints', initial.player.skinnedMeshes > 0 && initial.player.boneCount >= 20 && bonePose(initial).length >= 12, {poseValueCount: bonePose(initial).length, skinnedMeshes: initial.player.skinnedMeshes, boneCount: initial.player.boneCount});
    check('Scene is rendered with WebGL and actual triangles', initial.renderer.webgl2 === true && initial.renderer.triangles > 10000, initial.renderer);

    async function movement(code, label, takeWalkFrames = false) {
      const before = await snapshot();
      const forward = horizontalForward(before);
      const right = [-forward[2], 0, forward[0]];
      const expected = code === 'KeyW' ? forward : code === 'KeyS' ? forward.map(x => -x) : code === 'KeyD' ? right : right.map(x => -x);
      let phaseA, phaseB;
      try {
        await page.keyboard.down(code);
        await sleep(650);
        phaseA = await until(snapshot, state => magnitude(subtract(state.player.position, before.player.position)) > .45);
        if (takeWalkFrames) await screenshot(`${label}-walk-A`);
        await sleep(370);
        phaseB = await snapshot();
        if (takeWalkFrames) await screenshot(`${label}-walk-B`);
      } finally {
        await page.keyboard.up(code);
      }
      await sleep(400);
      const after = await snapshot();
      const delta = subtract(after.player.position, before.player.position);
      const distance = magnitude(delta);
      const alignment = dot(delta, expected) / distance;
      check(`${label}: movement follows the camera`, distance > .45 && alignment > .88, {delta, distance, alignment, expected, yaw: before.camera.yaw});
      if (takeWalkFrames) {
        const jointChange = poseDelta(phaseA, phaseB);
        check(`${label}: walking changes local limb poses`, isLocomotion(phaseA.player.mode) && isLocomotion(phaseB.player.mode) && jointChange !== null && jointChange > .01, {modeA: phaseA.player.mode, modeB: phaseB.player.mode, jointChange, timeA: phaseA.player.actionTime, timeB: phaseB.player.actionTime});
        check(`${label}: animation advances beyond its first frame`, Math.max(Number(phaseA.player.actionTime), Number(phaseB.player.actionTime)) > .1, {timeA: phaseA.player.actionTime, timeB: phaseB.player.actionTime});
      }
      const settled = await until(snapshot, state => isIdle(state.player.mode));
      await sleep(400);
      const stopped = await snapshot();
      check(`${label}: release returns to idle without sliding`, isIdle(stopped.player.mode) && magnitude(subtract(stopped.player.position, settled.player.position)) < .05, {mode: stopped.player.mode, drift: magnitude(subtract(stopped.player.position, settled.player.position))});
    }

    await movement('KeyW', '02-forward', true);
    await movement('KeyS', '03-backward');
    await movement('KeyA', '04-left');
    await movement('KeyD', '05-right');

    // Rotate about 90 degrees using the real drag interaction, then repeat movement.
    await page.mouse.move(700, 380);
    await page.mouse.down();
    await page.mouse.move(1090, 380, {steps: 16});
    await page.mouse.up();
    await sleep(600);
    const orbit = await snapshot();
    check('Mouse drag changes camera yaw', Math.abs(Number(orbit.camera.yaw) - Number(initial.camera.yaw)) > .8, {before: initial.camera.yaw, after: orbit.camera.yaw});
    await screenshot('06-orbit');
    await movement('KeyW', '07-forward-after-orbit', true);
    await movement('KeyD', '08-right-after-orbit');

    // A one-shot attack must visibly animate and return to idle.
    const beforeAttack = await snapshot();
    await page.keyboard.press('KeyJ');
    const duringAttack = await until(snapshot, state => isAttack(state.player.mode), 6000);
    await screenshot('09-attack');
    const afterAttack = await until(snapshot, state => isIdle(state.player.mode), 12000);
    const attackDelta = poseDelta(beforeAttack, duringAttack);
    check('Attack plays a changing skeletal pose and returns to idle', attackDelta !== null && attackDelta > .01 && isIdle(afterAttack.player.mode), {attackMode: duringAttack.player.mode, attackTime: duringAttack.player.actionTime, poseDelta: attackDelta, finalMode: afterAttack.player.mode});

    // Freeze controls on a game dialog and preserve existing companions/inventory.
    await page.keyboard.press('KeyP');
    const dialog = page.locator('#modal');
    await dialog.waitFor({state: 'visible'});
    const partnerText = await dialog.innerText();
    check('Companions and affinity remain accessible', /莉拉/.test(partnerText) && /好感/.test(partnerText), {text: partnerText.slice(0, 500)});
    await screenshot('10-companions');
    const beforeModalMove = await snapshot();
    await page.keyboard.down('KeyW');
    await sleep(600);
    await page.keyboard.up('KeyW');
    const afterModalMove = await snapshot();
    check('Dialog prevents character movement', magnitude(subtract(afterModalMove.player.position, beforeModalMove.player.position)) < .05);
    await page.keyboard.press('Escape');
    await dialog.waitFor({state: 'hidden'});
    await until(snapshot, state => !state.modal && !state.controls.blocked);
    await page.keyboard.press('KeyI');
    await dialog.waitFor({state: 'visible'});
    const inventoryText = await dialog.innerText();
    check('Inventory remains accessible', /背包/.test(inventoryText) && /药水|金币/.test(inventoryText), {text: inventoryText.slice(0, 250)});
    await page.keyboard.press('Escape');
    await dialog.waitFor({state: 'hidden'});
    await until(snapshot, state => !state.modal && !state.controls.blocked);

    // See the face as well as the back; this screenshot is for human visual review.
    await page.mouse.move(280, 380);
    await page.mouse.down();
    await page.mouse.move(1060, 380, {steps: 24});
    await page.mouse.up();
    await sleep(600);
    await screenshot('11-front');

    // Pointer controls invoke the same action dispatcher at a narrow viewport.
    await page.setViewportSize({width: 430, height: 850});
    await sleep(400);
    const touchAttack = page.locator('[data-k="KeyJ"]').first();
    if (await touchAttack.isVisible()) {
      await touchAttack.click();
      const touchAttackState = await until(snapshot, state => isAttack(state.player.mode), 6000);
      check('Touch attack button triggers an attack animation', isAttack(touchAttackState.player.mode));
      await until(snapshot, state => isIdle(state.player.mode));
      const moveButton = page.locator('[data-k="KeyW"]').first();
      const rect = await moveButton.boundingBox();
      const beforeTouch = await snapshot();
      await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
      await page.mouse.down();
      await sleep(650);
      const movingTouch = await until(snapshot, state => magnitude(subtract(state.player.position, beforeTouch.player.position)) > .35);
      await page.mouse.move(210, 400);
      await page.mouse.up();
      await sleep(400);
      const touchReleased = await snapshot();
      await sleep(400);
      const touchSettled = await snapshot();
      check('Touch movement releases correctly outside the button', isLocomotion(movingTouch.player.mode) && magnitude(subtract(touchSettled.player.position, touchReleased.player.position)) < .05, {keys: touchSettled.controls?.keys, finalMode: touchSettled.player.mode});
    } else {
      check('Touch controls are visible at a narrow viewport', false);
    }
    await screenshot('12-mobile');
    report.final = await snapshot();

    // Start a second fresh game and walk to real services using input only.
    // The QA flag disables save restoration; no teleport or state mutation hooks exist.
    await page.close();
    page = await context.newPage();
    page.setDefaultTimeout(15000);
    watch(page);
    await page.goto(target.href, {waitUntil: 'domcontentloaded', timeout: 60000});
    await page.locator('#qa-state').waitFor({state: 'attached'});
    const townStart = await until(snapshot, state => state.ready, 90000);
    check('Fresh navigation starts with the expected camera bearing', Math.abs(townStart.camera.yaw) < .01, {yaw: townStart.camera.yaw});

    async function walkAxis(axis, destination, label) {
      const index = axis === 'x' ? 0 : 2;
      const started = Date.now();
      const before = await snapshot();
      let held = null, running = false;
      try {
        while (true) {
          const current = await snapshot();
          const remaining = destination - current.player.position[index];
          if (Math.abs(remaining) < .45) break;
          if (Date.now() - started > 50000) throw new Error(`${label}: could not reach ${axis}=${destination}; at ${current.player.position.join(',')}`);
          const key = axis === 'x' ? (remaining > 0 ? 'KeyD' : 'KeyA') : (remaining > 0 ? 'KeyS' : 'KeyW');
          const shouldRun = Math.abs(remaining) > 2.5;
          if (held !== key) {
            if (held) await page.keyboard.up(held);
            await page.keyboard.down(key);
            held = key;
          }
          if (shouldRun !== running) {
            if (shouldRun) await page.keyboard.down('Shift'); else await page.keyboard.up('Shift');
            running = shouldRun;
          }
          await sleep(100);
        }
      } finally {
        if (held) await page.keyboard.up(held);
        await page.keyboard.up('Shift');
      }
      await sleep(250);
      const after = await snapshot();
      check(label, Math.abs(after.player.position[index] - destination) < .9 && magnitude(subtract(after.player.position, before.player.position)) > 1, {from: before.player.position, to: after.player.position, targetAxis: axis, targetValue: destination});
    }

    // Follow the open roads: north along X=0, then west in front of the guild.
    await walkAxis('z', -4.9, 'Walk north from spawn to the guild street');
    await walkAxis('x', -15, 'Walk west to the actual guild entrance');
    const atGuild = await until(snapshot, state => state.nearest?.kind === 'guild' && state.nearest.d < 3.4);
    await page.keyboard.press('KeyE');
    await page.locator('#modal').waitFor({state: 'visible'});
    const guildTitle = await page.locator('#mtitle').innerText();
    check('E opens the guild after walking to its entrance', /公会/.test(guildTitle), {position: atGuild.player.position, nearest: atGuild.nearest, title: guildTitle});
    await screenshot('13-guild');
    await page.locator('[data-do="quest"]').click();
    await page.locator('#modal').waitFor({state: 'hidden'});
    const questAccepted = await until(snapshot, state => state.state.accepted === true && !state.modal && !state.controls.blocked);
    check('Guild quest can be accepted through its real button', questAccepted.state.accepted && questAccepted.state.kills === 0, {state: questAccepted.state});
    await screenshot('14-quest-accepted');

    // South and west avoids the guild walls and the well at (-9,10).
    await walkAxis('z', 16.6, 'Walk south along the guild road');
    await walkAxis('x', -35, 'Walk west to the actual tavern entrance');
    const atTavern = await until(snapshot, state => state.nearest?.kind === 'tavern' && state.nearest.d < 3.4);
    await page.keyboard.press('KeyE');
    await page.locator('#modal').waitFor({state: 'visible'});
    const tavernTitle = await page.locator('#mtitle').innerText();
    check('E opens the tavern after walking to its entrance', /酒馆/.test(tavernTitle), {position: atTavern.player.position, nearest: atTavern.nearest, title: tavernTitle});
    await screenshot('15-tavern');
    const affinityBefore = Number((await page.locator('#ally-affinity').innerText()).match(/\d+/)?.[0]);
    await page.locator('[data-do="ale"]').click();
    const afterAle = await until(snapshot, state => state.state.gold === atTavern.state.gold - 12);
    const affinityAfter = Number((await page.locator('#ally-affinity').innerText()).match(/\d+/)?.[0]);
    check('Tavern social action updates money and companion affinity', afterAle.state.gold === atTavern.state.gold - 12 && affinityAfter === affinityBefore + 8, {goldBefore: atTavern.state.gold, goldAfter: afterAle.state.gold, affinityBefore, affinityAfter});
    report.townInteractions = {guild: atGuild, questAccepted, tavern: atTavern, afterAle};

    // Separate purpose-built visual fixture: large front and side animation poses.
    // Only this fixture exposes pose controls; the playable game stays read-only.
    await page.close();
    page = await context.newPage();
    page.setDefaultTimeout(15000);
    watch(page);
    const characterURL = new URL(process.env.CHARACTER_FIXTURE_URL || './tests/characters.html', target);
    await page.goto(characterURL.href, {waitUntil: 'domcontentloaded', timeout: 60000});
    await page.waitForFunction(() => window.characterQAReady === true, null, {timeout: 90000});
    await screenshot('16-character-front-poses');
    const sidePoses = await page.evaluate(() => window.showPoses(['Walk', 'Run', 'Attack'], [.35, .25, .40], Math.PI / 2));
    await screenshot('17-character-side-poses');
    report.characterFixture = sidePoses;
    check('Character fixture renders rigged walk, run, and attack poses', sidePoses.length === 3 && sidePoses.every(item => item.ready && item.skinnedMeshes > 0 && item.bones >= 20), {modes: sidePoses.map(item => item.mode), bones: sidePoses.map(item => item.bones)});

    check('No uncaught runtime errors', report.runtimeErrors.length === 0, {errors: report.runtimeErrors});
    check('No console WebGL or shader errors', report.webglErrors.length === 0, {errors: report.webglErrors});
    check('No console errors', report.consoleErrors.length === 0, {errors: report.consoleErrors});
    check('No failed required model or engine requests', !report.failedRequests.some(item => /\.glb|three.*\.js|controls\.js|characters\.js/.test(item.url)), {failedRequests: report.failedRequests});
  } catch (error) {
    report.fatal = String(error.stack || error);
    console.error(report.fatal);
    if (page) await page.screenshot({path: path.join(output, 'fatal.png')}).catch(() => {});
  } finally {
    if (browser) await browser.close();
    report.passed = !report.fatal && report.checks.length > 0 && report.checks.every(item => item.passed);
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  }
  process.exitCode = report.passed ? 0 : 1;
})();
