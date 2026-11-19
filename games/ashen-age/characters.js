import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js';

// These rigs share a verified 24-joint hierarchy. Motion rotations come from
// the CC0 donor; translations retain each character's own bone lengths.
// See assets/motions.json and ASSETS.md for provenance. Forward is local +Z.
const loader = new GLTFLoader();
const cachedModels = new Map();
let motionPromise;
const profiles = {
  hero: { file: 'knight.glb', height: 1.86, weapon: 'sword' },
  garrick: { file: 'garrick.glb', height: 1.88, weapon: 'sword' },
  mira: { file: 'mira.glb', height: 1.76, weapon: 'staff' },
  lyra: { file: 'mira.glb', height: 1.77, weapon: 'bow', tint: '#a9c3a0' },
};
const Y = new THREE.Vector3(0, 1, 0);
const V = (x, y, z) => new THREE.Vector3(x, y, z);

async function fetchMotion() {
  if (!motionPromise) motionPromise = fetch(new URL('./assets/motions.json', import.meta.url))
    .then(response => { if (!response.ok) throw new Error('角色动作文件无法加载'); return response.json(); })
    .catch(error => { motionPromise = null; throw error; });
  return motionPromise;
}

async function fetchModel(file, onProgress) {
  if (!cachedModels.has(file)) {
    const url = new URL(`./assets/${file}`, import.meta.url).href;
    const promise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('人物资源下载超时，请点击重试')), 60000);
      loader.load(url, value => { clearTimeout(timer); resolve(value); }, event => {
        onProgress?.({ file, loaded: event.loaded, total: event.total || 0 });
      }, error => { clearTimeout(timer); reject(error); });
    }).catch(error => { cachedModels.delete(file); throw error; });
    cachedModels.set(file, promise);
  }
  return cachedModels.get(file);
}

function importedClips(bones, data) {
  const hip = bones.Hips;
  const heightRatio = hip.position.y / data.hipRest[1];
  return data.clips.map(source => {
    const tracks = source.tracks.filter(track => bones[track.name.split('.')[0]]).map(track => {
      const values = track.values.slice();
      if (track.name.endsWith('.position')) {
        // In-place movement: the game owns world X/Z, animation owns vertical gait.
        for (let i = 0; i < values.length; i += 3) {
          values[i] = hip.position.x;
          values[i + 1] = hip.position.y + (values[i + 1] - data.hipRest[1]) * heightRatio;
          values[i + 2] = hip.position.z;
        }
        return new THREE.VectorKeyframeTrack(track.name, track.times, values);
      }
      return new THREE.QuaternionKeyframeTrack(track.name, track.times, values);
    });
    return new THREE.AnimationClip(source.name, source.duration, tracks);
  });
}

function getPose(bones) {
  return Object.fromEntries(Object.entries(bones).map(([name, bone]) => [name, {
    q: bone.quaternion.clone(), p: bone.position.clone(),
  }]));
}

function applyPose(bones, pose) {
  for (const [name, bone] of Object.entries(bones)) {
    bone.quaternion.copy(pose[name].q);
    bone.position.copy(pose[name].p);
  }
}

// Aim the bone's local +Y axis at a direction in model space, keeping its roll.
// This authors joint keyframes; it never moves a rigid replacement character.
function aimBone(model, bones, name, direction) {
  const bone = bones[name];
  if (!bone) return;
  model.updateMatrixWorld(true);
  const current = bone.getWorldQuaternion(new THREE.Quaternion());
  const from = Y.clone().applyQuaternion(current).normalize();
  const delta = new THREE.Quaternion().setFromUnitVectors(from, direction.clone().normalize());
  const world = delta.multiply(current);
  const parent = bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
  bone.quaternion.copy(parent.multiply(world));
}

function authoredClips(model, bones, idlePose) {
  function floorHeight() {
    model.updateMatrixWorld(true);
    let minimum = Infinity;
    model.traverse(object => {
      if (!object.isSkinnedMesh) return;
      object.computeBoundingBox();
      minimum = Math.min(minimum, object.boundingBox.clone().applyMatrix4(object.matrixWorld).min.y);
    });
    return minimum;
  }
  applyPose(bones, idlePose);
  const referenceFloor = floorHeight();
  const definitions = {
    Attack: {
      times: [0, 0.13, 0.28, 0.40, 0.58, 0.76],
      poses: [
        {},
        { rightArm: [0.45, 0.10, -0.35], rightForeArm: [0.05, 0.9, 0.05], turn: -0.28 },
        { rightArm: [0.30, 0.42, -0.05], rightForeArm: [0.05, 0.65, 0.45], turn: -0.42 },
        { rightArm: [-0.08, -0.14, 0.85], rightForeArm: [-0.28, -0.30, 0.70], turn: 0.32 },
        { rightArm: [-0.30, -0.60, 0.20], rightForeArm: [-0.30, -0.55, 0.10], turn: 0.15 },
        {},
      ],
    },
    Cast: {
      times: [0, 0.22, 0.45, 0.64, 0.93],
      poses: [{},
        { leftArm: [-0.25, 0.05, 0.40], leftForeArm: [-0.1, 0.55, 0.30], turn: 0.13 },
        { leftArm: [-0.25, 0.15, 0.70], leftForeArm: [0, 0.20, 0.80], turn: -0.10 },
        { leftArm: [-0.30, 0.05, 0.75], leftForeArm: [0, 0.05, 0.90], turn: -0.08 },
        {}],
    },
    Dodge: {
      times: [0, 0.12, 0.27, 0.43, 0.62],
      poses: [{},
        { crouch: 0.12, lean: 0.25, rightArm: [0.25, -0.4, -0.35], leftArm: [-0.25, -0.4, -0.35] },
        { crouch: 0.22, lean: 0.42, rightArm: [0.30, -0.2, -0.40], leftArm: [-0.30, -0.2, -0.40] },
        { crouch: 0.10, lean: 0.18 },
        {}],
    },
  };
  const clips = [];
  for (const [name, definition] of Object.entries(definitions)) {
    const quaternionValues = Object.fromEntries(Object.keys(bones).map(key => [key, []]));
    const hipValues = [];
    for (const pose of definition.poses) {
      applyPose(bones, idlePose);
      if (pose.turn) bones.Spine.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(Y, pose.turn));
      if (pose.lean) bones.Spine.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(V(1, 0, 0), pose.lean));
      if (pose.crouch) {
        bones.Hips.position.y -= pose.crouch * 100;
        bones.LeftUpLeg.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(V(1, 0, 0), -pose.crouch * 2));
        bones.RightUpLeg.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(V(1, 0, 0), -pose.crouch * 2));
        bones.LeftLeg.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(V(1, 0, 0), pose.crouch * 4));
        bones.RightLeg.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(V(1, 0, 0), pose.crouch * 4));
      }
      for (const [field, bone] of [['rightArm', 'RightArm'], ['rightForeArm', 'RightForeArm'], ['leftArm', 'LeftArm'], ['leftForeArm', 'LeftForeArm']]) {
        if (pose[field]) aimBone(model, bones, bone, V(...pose[field]));
      }
      // Keep crouched key poses above the floor despite different limb lengths.
      const floor = floorHeight();
      if (floor < referenceFloor) {
        const unitScale = bones.Hips.parent.getWorldScale(new THREE.Vector3()).y;
        bones.Hips.position.y += (referenceFloor - floor) / unitScale;
      }
      for (const [key, bone] of Object.entries(bones)) bone.quaternion.toArray(quaternionValues[key], quaternionValues[key].length);
      bones.Hips.position.toArray(hipValues, hipValues.length);
    }
    const tracks = Object.entries(quaternionValues).map(([bone, values]) => new THREE.QuaternionKeyframeTrack(`${bone}.quaternion`, definition.times, values));
    tracks.push(new THREE.VectorKeyframeTrack('Hips.position', definition.times, hipValues));
    clips.push(new THREE.AnimationClip(name, definition.times.at(-1), tracks));
  }
  applyPose(bones, idlePose);
  model.updateMatrixWorld(true);
  return clips;
}

function addWeapon(bones, type) {
  const hand = bones.RightHand;
  if (!hand) return;
  const weapon = new THREE.Group();
  weapon.name = `${type}-right-hand`;
  weapon.scale.setScalar(100); // Bones use centimetres; weapon meshes use metres.
  weapon.position.set(0, 6.5, 0);
  const steel = new THREE.MeshStandardMaterial({ color: '#aebac1', metalness: 0.92, roughness: 0.25 });
  const dark = new THREE.MeshStandardMaterial({ color: '#33291e', metalness: 0.10, roughness: 0.80 });
  const brass = new THREE.MeshStandardMaterial({ color: '#a18b55', metalness: 0.8, roughness: 0.35 });
  const part = (geometry, material, position) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position); mesh.castShadow = true; weapon.add(mesh); return mesh;
  };
  if (type === 'sword') {
    // Diamond-section tapered blade, short quillons, leather grip and pommel.
    const vertices = new Float32Array([
      -0.035,0.16,0, 0,0.16,0.012, 0.035,0.16,0, 0,0.16,-0.012,
      -0.025,0.74,0, 0,0.74,0.009, 0.025,0.74,0, 0,0.74,-0.009,
      0,0.88,0,
    ]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex([0,5,4,0,1,5,1,6,5,1,2,6,2,7,6,2,3,7,3,4,7,3,0,4,4,5,8,5,6,8,6,7,8,7,4,8]);
    geometry.computeVertexNormals();
    part(geometry, steel, V(0, 0, 0));
    part(new THREE.CylinderGeometry(0.024, 0.024, 0.18, 10), dark, V(0, 0.04, 0));
    const guard = part(new THREE.CylinderGeometry(0.018, 0.018, 0.25, 8), brass, V(0, 0.15, 0)); guard.rotation.z = Math.PI / 2;
    part(new THREE.SphereGeometry(0.038, 12, 8), brass, V(0, -0.07, 0));
    weapon.rotation.x = 0.16;
  } else if (type === 'staff') {
    part(new THREE.CylinderGeometry(0.023, 0.035, 1.55, 10), dark, V(0, 0.45, 0));
    part(new THREE.IcosahedronGeometry(0.095, 1), new THREE.MeshStandardMaterial({color:'#a8d9e8', emissive:'#489bc4', emissiveIntensity:0.8, metalness:.3, roughness:.2}), V(0, 1.25, 0));
    part(new THREE.TorusGeometry(0.11, 0.015, 6, 18), brass, V(0, 1.24, 0));
  } else {
    const curve = new THREE.CatmullRomCurve3([V(0, -.48, 0), V(.18, -.25, 0), V(.22, 0, 0), V(.18,.25,0), V(0,.48,0)]);
    part(new THREE.TubeGeometry(curve, 24, .018, 7, false), dark, V(0,0,0));
    part(new THREE.CylinderGeometry(.002,.002,.96,4), new THREE.MeshStandardMaterial({color:'#b7b19b'}), V(0,0,0));
    weapon.position.y = 3;
  }
  hand.add(weapon);
  return weapon;
}

export async function loadCharacter(kind = 'hero', { onProgress } = {}) {
  const profile = profiles[kind] || profiles.hero;
  const [gltf, motionData] = await Promise.all([fetchModel(profile.file, onProgress), fetchMotion()]);
  const model = cloneSkeleton(gltf.scene);
  model.name = `${kind}-skinned-model`;
  const root = new THREE.Group();
  root.name = `${kind}-character`;
  root.add(model);
  const bones = {};
  const skinnedMeshes = [];
  model.traverse(object => {
    if (object.isBone) bones[object.name] = object;
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = false;
    object.frustumCulled = false; // Avoid stale rest-pose bounds during sword/arm movement.
    if (object.isSkinnedMesh) skinnedMeshes.push(object);
    const materials = (Array.isArray(object.material) ? object.material : [object.material]).map(material => {
      const copy = material.clone();
      if (profile.tint) copy.color.multiply(new THREE.Color(profile.tint));
      copy.roughness = kind === 'hero' ? .58 : .85;
      copy.envMapIntensity = kind === 'hero' ? 1.2 : .65;
      return copy;
    });
    object.material = Array.isArray(object.material) ? materials : materials[0];
  });
  for (const required of ['Hips','Spine','LeftArm','RightArm','LeftUpLeg','RightUpLeg','LeftLeg','RightLeg']) {
    if (!bones[required]) throw new Error(`人物骨骼不完整：${required}`);
  }
  if (!skinnedMeshes.length) throw new Error('人物文件没有蒙皮网格');
  model.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  root.scale.setScalar(profile.height / size.y);
  model.position.set(-(bounds.min.x + bounds.max.x) / 2, -bounds.min.y, -(bounds.min.z + bounds.max.z) / 2);
  const clips = importedClips(bones, motionData);
  const mixer = new THREE.AnimationMixer(model);
  const idlePreview = mixer.clipAction(clips.find(clip => clip.name === 'Idle'));
  idlePreview.play(); mixer.update(0);
  const idlePose = getPose(bones);
  idlePreview.stop();
  clips.push(...authoredClips(model, bones, idlePose));
  const actions = Object.fromEntries(clips.map(clip => [clip.name, mixer.clipAction(clip)]));
  for (const name of ['Attack', 'Cast', 'Dodge']) {
    actions[name].setLoop(THREE.LoopOnce, 1);
    actions[name].clampWhenFinished = true;
  }
  let current = '', desired = 'Idle', desiredSpeed = 1, locked = false, transitions = 0;
  function transition(name, speed = 1, once = false) {
    const next = actions[name];
    if (!next) return false;
    if (current === name && !once) { next.setEffectiveTimeScale(speed); return true; }
    const previous = actions[current];
    next.enabled = true;
    next.reset().setEffectiveTimeScale(speed).setEffectiveWeight(1).fadeIn(.16).play();
    if (previous && previous !== next) previous.fadeOut(.16);
    current = name; transitions++;
    return true;
  }
  transition('Idle');
  mixer.update(0);
  model.updateMatrixWorld(true);
  skinnedMeshes.forEach(mesh => mesh.computeBoundingBox());
  const posedBounds = new THREE.Box3().setFromObject(root);
  model.position.y -= posedBounds.min.y / root.scale.y;
  addWeapon(bones, profile.weapon);
  mixer.addEventListener('finished', event => {
    if (event.action !== actions[current]) return;
    locked = false;
    transition(desired, desiredSpeed);
  });
  return {
    root, model, mixer,
    // Native clip speeds measured from the planted foot's backwards velocity.
    // Pass actual world speed / velocity[mode] to setMotion to reduce foot slide.
    velocity: { Walk: 1.5 * profile.height / 1.86, Run: 4.4 * profile.height / 1.86 },
    setMotion(name, speed = 1) {
      if (!['Idle','Walk','Run'].includes(name)) return;
      desired = name; desiredSpeed = THREE.MathUtils.clamp(speed, .35, 2.2);
      if (!locked) transition(desired, desiredSpeed);
    },
    playOnce(name) {
      if (locked || !actions[name] || !['Attack','Cast','Dodge'].includes(name)) return false;
      locked = true;
      return transition(name, 1, true);
    },
    update(dt) { mixer.update(Math.min(.1, Math.max(0, dt))); },
    diagnostics() {
      const mesh = skinnedMeshes[0];
      return {
        kind, ready: true, skinnedMeshes: skinnedMeshes.length, bones: Object.keys(bones).length,
        mode: current, time: actions[current]?.time || 0, weight: actions[current]?.getEffectiveWeight() || 0,
        desired, locked, transitions, clips: clips.map(clip => ({ name: clip.name, duration: clip.duration, tracks: clip.tracks.length })),
        joints: Object.fromEntries(['Hips','LeftUpLeg','RightUpLeg','LeftLeg','RightLeg','LeftArm','RightArm'].map(name => [name, {
          quaternion: bones[name].quaternion.toArray(), position: bones[name].position.toArray(),
        }])),
        vertices: mesh.geometry.attributes.position.count, normalizedHeight: profile.height,
      };
    },
  };
}
