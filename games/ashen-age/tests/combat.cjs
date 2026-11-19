/* Actual-input combat regression. Reads #qa-state; never mutates game state. */
const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const target = new URL(process.env.GAME_URL || process.argv[2] || 'http://127.0.0.1:4173/games/ashen-age/');
target.searchParams.set('qa', '1');
const output = path.resolve(process.env.QA_OUTPUT || process.argv[3] || 'ashen-age-combat-qa');
fs.mkdirSync(output, {recursive: true});
const report = {url: target.href, checks: [], runtimeErrors: [], consoleErrors: [], webglErrors: [], screenshots: [], companionModes: {}, profile: {viewport: {width: 800, height: 500}, quality: '流畅', renderer: 'Chromium ANGLE SwiftShader (CPU)', note: 'Functional combat verification; high-resolution visual review is captured by smoke.cjs.'}};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const subtract = (a, b) => a.map((x, i) => x - b[i]);
const magnitude = vector => Math.hypot(...vector);
const distance = (a, b) => magnitude(subtract(a, b));
const idle = state => /idle|stand/i.test(state.player.mode);
const mode = (state, expected) => state.player.mode.toLowerCase() === expected.toLowerCase();
function check(name, passed, evidence = {}) {
  report.checks.push({name, passed: !!passed, evidence});
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name} ${JSON.stringify(evidence)}`);
}
async function until(read, predicate, timeout = 15000) {
  const started = Date.now();
  let state;
  do {
    state = await read();
    if (predicate(state)) return state;
    await sleep(100);
  } while (Date.now() - started < timeout);
  throw new Error('Timed out waiting for combat state: ' + JSON.stringify(state));
}
function nearestEnemy(state, range) {
  return state.enemies.map((enemy, index) => ({...enemy, index: enemy.index ?? index, distance: distance(enemy.position, state.player.position)}))
    .filter(enemy => !enemy.dead && enemy.distance < range).sort((a, b) => a.distance - b.distance)[0];
}
function enemyAt(state, index) {
  return state.enemies.find((enemy, offset) => (enemy.index ?? offset) === index);
}
function boneDelta(a, b) {
  const left = a.player.bones.flatMap(bone => bone.q);
  const right = b.player.bones.flatMap(bone => bone.q);
  return left.length === right.length && left.length ? Math.max(...left.map((value, index) => Math.abs(value - right[index]))) : 0;
}

(async () => {
  let browser;
  let page;
  try {
    browser = await chromium.launch({headless: true,
      ...(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {}),
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});
    const context = await browser.newContext({viewport: report.profile.viewport, deviceScaleFactor: 1});
    page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.on('pageerror', error => report.runtimeErrors.push(String(error)));
    page.on('console', message => {
      const text = message.text();
      if (message.type() === 'error') report.consoleErrors.push(text);
      if (/WebGL.*(?:INVALID|error|failed|lost)|THREE\.WebGLProgram.*error|GL_INVALID|GL_OUT_OF_MEMORY|CONTEXT_LOST|shader.*(?:error|failed)/i.test(text)) report.webglErrors.push(text);
    });
    const snapshot = async () => {
      const text = await page.locator('#qa-state').textContent();
      const state = text ? JSON.parse(text) : {ready: false};
      const allyMode = state.ally?.animation?.mode;
      if (allyMode) {
        const saved = report.companionModes[allyMode];
        // Keep a mid-action sample, not merely the first frame of a cross-fade.
        if (!saved || (/Cast|Attack/.test(allyMode) && Math.abs(state.ally.animation.time - .42) < Math.abs(saved.time - .42))) {
          report.companionModes[allyMode] = state.ally.animation;
        }
      }
      return state;
    };
    const screenshot = async name => {
      await page.screenshot({path: path.join(output, `${name}.png`)});
      report.screenshots.push(`${name}.png`);
    };
    const freshSnapshot = (previous, predicate = () => true, timeout = 15000) => until(snapshot, state => Number.isFinite(state.frame) && state.frame > previous.frame && predicate(state), timeout);
    await page.goto(target.href, {waitUntil: 'domcontentloaded', timeout: 60000});
    await page.locator('#qa-state').waitFor({state: 'attached'});
    const loaded = await until(snapshot, state => state.ready, 90000);
    const quality = page.locator('#quality');
    if (!(await quality.innerText()).includes('流畅')) await quality.click();
    const initial = await freshSnapshot(loaded);
    console.log('TEST_RENDER_PROFILE '+JSON.stringify({...report.profile,frame:initial.frame,observedFPS:initial.renderer.fps}));
    report.initial = initial;
    if (!Array.isArray(initial.enemies)) throw new Error('Combat QA requires the read-only enemies array in #qa-state. No gameplay mutations were attempted.');
    check('Enemy diagnostics expose real combat targets', initial.enemies.length >= 2 && initial.enemies.every(enemy => Number.isFinite(enemy.hp) && Array.isArray(enemy.position)), {count: initial.enemies.length});

    // Sprint must select its own running clip and animate limbs, then stop cleanly.
    let runA, runB;
    try {
      await page.keyboard.down('Shift');
      await page.keyboard.down('KeyW');
      await sleep(650);
      runA = await until(snapshot, state => mode(state, 'Run') && distance(state.player.position, initial.player.position) > .5);
      await screenshot('combat-01-run-A');
      await sleep(330);
      runB = await freshSnapshot(runA, state => mode(state, 'Run'));
      await screenshot('combat-02-run-B');
    } finally {
      await page.keyboard.up('KeyW');
      await page.keyboard.up('Shift');
    }
    const afterRun = await until(snapshot, state => idle(state) && !state.controls.keys.KeyW && !state.controls.keys.ShiftLeft);
    check('Shift selects Run and advances the skeleton', mode(runA, 'Run') && mode(runB, 'Run') && boneDelta(runA, runB) > .01, {modeA: runA.player.mode, modeB: runB.player.mode, jointChange: boneDelta(runA, runB), actionTimeA: runA.player.actionTime, actionTimeB: runB.player.actionTime});
    check('Releasing sprint returns to idle', idle(afterRun) && !afterRun.controls.keys.ShiftLeft && !afterRun.controls.keys.KeyW, {position: afterRun.player.position, mode: afterRun.player.mode});

    // Keep Space held beyond the actual UI cooldown, proving no automatic repeats.
    const beforeDodge = await snapshot();
    let duringDodge, heldDodge;
    try {
      await page.keyboard.down('Space');
      duringDodge = await until(snapshot, state => mode(state, 'Dodge'), 6000);
      await screenshot('combat-03-dodge');
      const landed = await until(snapshot, idle);
      await page.waitForFunction(() => document.getElementById('dodge-cd').textContent.includes('6 法力'), null, {timeout: 20000});
      await sleep(500);
      heldDodge = await freshSnapshot(landed, state => idle(state) && state.controls.keys.Space === true);
    } finally {
      await page.keyboard.up('Space');
    }
    const dodgeDistance = distance(heldDodge.player.position, beforeDodge.player.position);
    const dodgeTransitions = heldDodge.player.animation.transitions - beforeDodge.player.animation.transitions;
    check('Dodge visibly animates and returns to idle', mode(duringDodge, 'Dodge') && boneDelta(beforeDodge, duringDodge) > .005 && idle(heldDodge), {jointChange: boneDelta(beforeDodge, duringDodge), mode: heldDodge.player.mode});
    check('Holding Space past cooldown does not repeat dodge', heldDodge.controls.keys.Space === true && dodgeTransitions === 2 && dodgeDistance > 1 && dodgeDistance < 4.1, {transitions: dodgeTransitions, displacement: dodgeDistance, manaBefore: beforeDodge.state.mp, manaAfter: heldDodge.state.mp});
    report.sprint = {runA: runA.player, runB: runB.player, afterRun: afterRun.player};
    report.dodge = {before: beforeDodge.player, during: duringDodge.player, held: heldDodge.player};

    async function walkAxis(axis, destination, label) {
      const index = axis === 'x' ? 0 : 2;
      const started = Date.now();
      let held = null, running = false;
      try {
        while (true) {
          const state = await snapshot();
          const remaining = destination - state.player.position[index];
          if (Math.abs(remaining) < .45) break;
          if (Date.now() - started > 65000) throw new Error(`${label}: stalled at ${state.player.position.join(',')}`);
          const key = axis === 'x' ? (remaining > 0 ? 'KeyD' : 'KeyA') : (remaining > 0 ? 'KeyS' : 'KeyW');
          const shouldRun = Math.abs(remaining) > 2.5;
          if (held !== key) {
            if (held) await page.keyboard.up(held);
            await page.keyboard.down(key); held = key;
          }
          if (running !== shouldRun) {
            if (shouldRun) await page.keyboard.down('Shift'); else await page.keyboard.up('Shift');
            running = shouldRun;
          }
          await sleep(100);
        }
      } finally {
        if (held) await page.keyboard.up(held);
        await page.keyboard.up('Shift');
      }
      const released = await until(snapshot, state => idle(state) && !state.controls.keys.KeyW && !state.controls.keys.KeyS && !state.controls.keys.KeyA && !state.controls.keys.KeyD);
      await freshSnapshot(released, idle);
    }

    // Accept the quest at its real entrance so kill progress can be verified.
    await walkAxis('z', -4.9, 'Reach guild street');
    await walkAxis('x', -15, 'Reach guild entrance');
    await until(snapshot, state => state.nearest?.kind === 'guild' && state.nearest.d < 3.4);
    await page.keyboard.press('KeyE');
    await page.locator('#modal').waitFor({state: 'visible'});
    await page.locator('[data-do="quest"]').click();
    await page.locator('#modal').waitFor({state: 'hidden'});
    await until(snapshot, state => state.state.accepted && !state.controls.blocked);

    // Use the north road, then approach the first wolves on foot.
    await walkAxis('x', 0, 'Return to north road');
    await walkAxis('z', -34, 'Pass through the northern gate');
    await walkAxis('x', -16, 'Approach the first wolf clearing');
    await walkAxis('z', -39, 'Enter real-time combat');
    const beforeMelee = await until(snapshot, state => idle(state) && !!nearestEnemy(state, 3.1), 22000);
    const meleeTarget = nearestEnemy(beforeMelee, 3.1);
    await page.keyboard.press('KeyJ');
    const duringMelee = await until(snapshot, state => mode(state, 'Attack'), 6000);
    await screenshot('combat-04-melee');
    const expectedMeleeDamage = Math.min(beforeMelee.state.damage, meleeTarget.hp);
    const afterMelee = await until(snapshot, state => {
      const targetState = enemyAt(state, meleeTarget.index);
      return targetState.dead || meleeTarget.hp - targetState.hp >= expectedMeleeDamage;
    });
    const meleeAfter = enemyAt(afterMelee, meleeTarget.index);
    check('J attack applies real melee damage', mode(duringMelee, 'Attack') && (meleeAfter.dead || meleeTarget.hp - meleeAfter.hp >= expectedMeleeDamage), {targetIndex: meleeTarget.index, hpBefore: meleeTarget.hp, hpAfter: meleeAfter.hp, dead: meleeAfter.dead, attackMode: duringMelee.player.mode, distance: meleeTarget.distance});
    await until(snapshot, idle);

    const beforeSpell = await until(snapshot, state => idle(state) && !!nearestEnemy(state, 18));
    const spellTarget = nearestEnemy(beforeSpell, 18);
    await page.keyboard.press('KeyK');
    const duringSpell = await until(snapshot, state => mode(state, 'Cast'), 6000);
    await screenshot('combat-05-spell');
    const spellAfter = enemyAt(duringSpell, spellTarget.index);
    check('K spell changes target health and spends mana', mode(duringSpell, 'Cast') && (spellAfter.dead || spellTarget.hp - spellAfter.hp >= Math.min(38, spellTarget.hp)) && beforeSpell.state.mp - duringSpell.state.mp > 9, {targetIndex: spellTarget.index, hpBefore: spellTarget.hp, hpAfter: spellAfter.hp, manaBefore: beforeSpell.state.mp, manaAfter: duringSpell.state.mp, mode: duringSpell.player.mode});
    await until(snapshot, idle);
    const progress = await until(snapshot, state => state.state.kills >= 1);
    check('Real enemy deaths advance the accepted quest', progress.state.accepted && progress.state.kills >= 1 && progress.enemies.some(enemy => enemy.dead), {kills: progress.state.kills, deadEnemies: progress.enemies.filter(enemy => enemy.dead).length, complete: progress.state.complete});

    const allyCombat = report.companionModes.Cast || report.companionModes.Attack;
    const allyIdle = report.companionModes.Idle;
    const combatQ = allyCombat?.joints?.LeftArm?.quaternion || [];
    const idleQ = allyIdle?.joints?.LeftArm?.quaternion || [];
    const allyJointDelta = combatQ.length === idleQ.length && combatQ.length ? Math.max(...combatQ.map((value, i) => Math.abs(value - idleQ[i]))) : 0;
    check('Companion performs a real skeletal combat action', !!allyCombat && allyCombat.skinnedMeshes > 0 && allyJointDelta > .005, {observedModes: Object.keys(report.companionModes), combatMode: allyCombat?.mode, jointChange: allyJointDelta});
    await screenshot('combat-06-clearing');
    report.melee = {before: beforeMelee, during: duringMelee, after: afterMelee};
    report.spell = {before: beforeSpell, during: duringSpell};
    report.final = progress;
    check('Combat produced no runtime or WebGL errors', report.runtimeErrors.length === 0 && report.consoleErrors.length === 0 && report.webglErrors.length === 0, {runtime: report.runtimeErrors, console: report.consoleErrors, webgl: report.webglErrors});
  } catch (error) {
    report.fatal = String(error.stack || error);
    console.error(report.fatal);
    if (page) await page.screenshot({path: path.join(output, 'combat-fatal.png')}).catch(() => {});
  } finally {
    if (browser) await browser.close();
    report.passed = !report.fatal && report.checks.length > 0 && report.checks.every(item => item.passed);
    fs.writeFileSync(path.join(output, 'combat-report.json'), JSON.stringify(report, null, 2));
  }
  process.exitCode = report.passed ? 0 : 1;
})();
