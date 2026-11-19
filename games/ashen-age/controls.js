import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const MOVE_CODES = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ShiftLeft', 'ShiftRight']);
const ACTION_CODES = new Set(['KeyJ', 'KeyK', 'KeyE', 'KeyP', 'KeyI', 'KeyH', 'KeyM', 'F1', 'Space', 'Escape']);
const HANDLED_CODES = new Set([...MOVE_CODES, ...ACTION_CODES]);

/** Camera-relative third-person input. Actor meshes are expected to face local +Z. */
export class ThirdPersonControls {
  constructor({canvas, camera, onAction = () => {}, onZoom = () => {}, yaw = 0, pitch = .24, distance = 5.6, targetHeight = 1.25}) {
    this.canvas = canvas;
    this.camera = camera;
    this.onAction = onAction;
    this.onZoom = onZoom;
    this.yaw = yaw;
    this.pitch = pitch;
    this.distance = distance;
    this.targetHeight = targetHeight;
    this.keys = Object.create(null);
    this._keyboard = new Set();
    this._touch = new Map();
    this._listeners = [];
    this._blocked = true;
    this._drag = null;
    this._cameraPrimed = false;
    this._direction = new THREE.Vector3();
    this._facing = new THREE.Vector3(0, 0, -1);
    this._cameraGoal = new THREE.Vector3();
    this._lookTarget = new THREE.Vector3();
    this._turnTarget = new THREE.Quaternion();
    this._last = {moving: false, speed: 0, run: false};
    this.canvas.style.touchAction = 'none';
    if (!this.canvas.hasAttribute('tabindex')) this.canvas.tabIndex = 0;

    const listen = (target, type, handler, options) => {
      target.addEventListener(type, handler, options);
      this._listeners.push(() => target.removeEventListener(type, handler, options));
    };
    const editable = event => event.target instanceof Element && !!event.target.closest('input,textarea,select,[contenteditable="true"]');

    listen(window, 'keydown', event => {
      const code = event.code;
      if (!HANDLED_CODES.has(code) || editable(event)) return;
      // Escape also works while a game dialog has blocked movement.
      if (code === 'Escape') {
        event.preventDefault();
        if (!event.repeat) { this.reset(); this.onAction(code); }
        return;
      }
      if (this._blocked) return;
      event.preventDefault();
      const alreadyHeld = this._keyboard.has(code);
      this._keyboard.add(code);
      this._sync(code);
      if (ACTION_CODES.has(code) && !event.repeat && !alreadyHeld) this.onAction(code);
    });
    listen(window, 'keyup', event => {
      if (!HANDLED_CODES.has(event.code)) return;
      this._keyboard.delete(event.code);
      this._sync(event.code);
      if (!this._blocked && !editable(event)) event.preventDefault();
    });
    listen(window, 'blur', () => this.reset());
    listen(document, 'visibilitychange', () => { if (document.hidden) this.reset(); });

    listen(canvas, 'pointerdown', event => {
      if (this._blocked || this._drag || (event.pointerType === 'mouse' && event.button !== 0 && event.button !== 2)) return;
      event.preventDefault();
      this.canvas.focus({preventScroll: true});
      this._drag = {id: event.pointerId, x: event.clientX, y: event.clientY};
      try { canvas.setPointerCapture(event.pointerId); } catch (_) { /* Browser may have already canceled the pointer. */ }
    });
    listen(canvas, 'pointermove', event => {
      if (this._blocked || this._drag?.id !== event.pointerId) return;
      event.preventDefault();
      this.yaw -= (event.clientX - this._drag.x) * .004;
      this.pitch = THREE.MathUtils.clamp(this.pitch + (event.clientY - this._drag.y) * .003, .06, .95);
      this._drag.x = event.clientX;
      this._drag.y = event.clientY;
    });
    const endOrbit = event => {
      if (this._drag?.id !== event.pointerId) return;
      this._drag = null;
      try { if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); } catch (_) { /* Pointer already released. */ }
    };
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(canvas, type, endOrbit);
    listen(canvas, 'contextmenu', event => event.preventDefault());
    listen(canvas, 'wheel', event => {
      if (this._blocked) return;
      event.preventDefault();
      this.distance = THREE.MathUtils.clamp(this.distance + event.deltaY * .005, 2.8, 9.5);
      this.onZoom(this.distance);
    }, {passive: false});

    this._buttons = [...document.querySelectorAll('[data-k]')];
    for (const button of this._buttons) {
      const code = button.dataset.k;
      if (!HANDLED_CODES.has(code)) continue;
      button.style.touchAction = 'none';
      listen(button, 'pointerdown', event => {
        if (this._blocked && code !== 'Escape') return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        const wasHeld = !!this.keys[code];
        this._touch.set(event.pointerId, code);
        this._sync(code);
        try { button.setPointerCapture(event.pointerId); } catch (_) { /* Pointer canceled. */ }
        if (ACTION_CODES.has(code) && !wasHeld) this.onAction(code);
      }, {passive: false});
      const release = event => {
        const held = this._touch.get(event.pointerId);
        if (!held) return;
        this._touch.delete(event.pointerId);
        this._sync(held);
        try { if (button.hasPointerCapture(event.pointerId)) button.releasePointerCapture(event.pointerId); } catch (_) { /* Pointer canceled. */ }
      };
      for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(button, type, release);
    }
  }

  _sync(code) {
    const pressed = this._keyboard.has(code) || [...this._touch.values()].includes(code);
    if (pressed) this.keys[code] = true;
    else delete this.keys[code];
    for (const button of this._buttons || []) {
      if (button.dataset.k === code) button.classList.toggle('is-pressed', pressed);
    }
  }

  /** Clear pending input when a dialog opens, focus is lost, or a scene changes. */
  reset() {
    this._keyboard.clear();
    this._touch.clear();
    for (const key of Object.keys(this.keys)) delete this.keys[key];
    if (this._drag) {
      const id = this._drag.id;
      this._drag = null;
      try { if (this.canvas.hasPointerCapture(id)) this.canvas.releasePointerCapture(id); } catch (_) { /* Pointer already released. */ }
    }
    for (const button of this._buttons || []) button.classList.remove('is-pressed');
    this._last = {moving: false, speed: 0, run: false};
  }

  /**
   * Movement owns actor world x/z; animation owns the skeleton below that actor.
   * Space only dispatches an action: the game owns dodge duration and cooldown.
   */
  update(dt, player, {blocked = false, walkSpeed = 2.3, runSpeed = 4.8, dodgeDirection = null, dodgeSpeed = 0, movementLocked = false} = {}) {
    dt = THREE.MathUtils.clamp(dt, 0, .1);
    if (blocked && !this._blocked) this.reset();
    this._blocked = blocked;
    this._direction.set(0, 0, 0);
    let speed = 0;
    let run = false;
    if (!blocked && dodgeDirection && dodgeSpeed > 0) {
      this._direction.set(dodgeDirection.x || 0, 0, dodgeDirection.z || 0).normalize();
      speed = dodgeSpeed;
    } else if (!blocked && !movementLocked) {
      const forward = Number(!!(this.keys.KeyW || this.keys.ArrowUp)) - Number(!!(this.keys.KeyS || this.keys.ArrowDown));
      const side = Number(!!(this.keys.KeyD || this.keys.ArrowRight)) - Number(!!(this.keys.KeyA || this.keys.ArrowLeft));
      if (forward || side) {
        const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
        this._direction.set(side * cos - forward * sin, 0, -side * sin - forward * cos).normalize();
        run = !!(this.keys.ShiftLeft || this.keys.ShiftRight);
        speed = run ? runSpeed : walkSpeed;
      }
    }
    const moving = speed > 0 && this._direction.lengthSq() > 0;
    if (moving) {
      player.position.addScaledVector(this._direction, speed * dt);
      this._facing.copy(this._direction);
      this._turnTarget.setFromAxisAngle(UP, Math.atan2(this._direction.x, this._direction.z));
      player.quaternion.slerp(this._turnTarget, 1 - Math.exp(-18 * dt));
    }
    this._lookTarget.copy(player.position).y += this.targetHeight;
    const horizontal = Math.cos(this.pitch) * this.distance;
    this._cameraGoal.set(
      player.position.x + Math.sin(this.yaw) * horizontal,
      player.position.y + this.targetHeight + Math.sin(this.pitch) * this.distance,
      player.position.z + Math.cos(this.yaw) * horizontal
    );
    if (!this._cameraPrimed) {
      this.camera.position.copy(this._cameraGoal);
      this._cameraPrimed = true;
    } else {
      this.camera.position.lerp(this._cameraGoal, 1 - Math.exp(-12 * dt));
    }
    this.camera.lookAt(this._lookTarget);
    this._last = {moving, speed: moving ? speed : 0, run: moving && run};
    return {...this._last, direction: this._direction.clone()};
  }

  getState() {
    return {
      ...this._last,
      keys: {...this.keys},
      yaw: this.yaw,
      pitch: this.pitch,
      distance: this.distance,
      blocked: this._blocked,
      dragging: !!this._drag,
      direction: this._direction.toArray(),
      facing: this._facing.toArray()
    };
  }

  dispose() {
    this.reset();
    for (const remove of this._listeners) remove();
    this._listeners.length = 0;
  }
}
