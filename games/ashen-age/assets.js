import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const cache = new Map();
const files = {
  commonTree: './assets/nature/common-tree.glb',
  pineTree: './assets/nature/pine-tree.glb',
  birchTree: './assets/nature/birch-tree.glb',
  bush: './assets/nature/bush.glb',
  mossRock: './assets/nature/moss-rock.glb',
  house: './assets/village/house.glb',
  inn: './assets/village/inn.glb',
  blacksmith: './assets/village/blacksmith.glb',
  well: './assets/village/well.glb',
  barrel: './assets/village/barrel.glb',
  wolf: './assets/creatures/wolf.glb',
  spider: './assets/creatures/spider.glb',
  sword: './assets/weapons/sword.glb'
};
async function get(key) {
  if (!cache.has(key)) cache.set(key, loader.loadAsync(new URL(files[key], import.meta.url).href));
  return cache.get(key);
}
function cloneAsset(gltf, height, materialOptions = {}) {
  const root = gltf.scene.clone(true);
  root.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = true; o.receiveShadow = true;
    if (o.material) {
      const materials = (Array.isArray(o.material) ? o.material : [o.material]).map(m => {
        const copy = m.clone();
        if (materialOptions.roughness !== undefined) copy.roughness = materialOptions.roughness;
        if (materialOptions.color) copy.color.multiply(new THREE.Color(materialOptions.color));
        return copy;
      });
      o.material = Array.isArray(o.material) ? materials : materials[0];
    }
  });
  root.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(root);
  const size = bounds.getSize(new THREE.Vector3());
  const scale = height / Math.max(.001, size.y);
  root.scale.setScalar(scale);
  root.position.y = -bounds.min.y * scale;
  return root;
}
function place(scene, gltf, key, x, z, height, rotation = 0) {
  const root = cloneAsset(gltf, height);
  root.position.x = x; root.position.z = z; root.rotation.y = rotation;
  scene.add(root);
  return root;
}
export async function populateWorldAssets({scene, world, enemies, onProgress = () => {}}) {
  const keys = Object.keys(files);
  const loaded = {};
  let completed = 0;
  await Promise.all(keys.map(async key => {
    try { loaded[key] = await get(key); }
    catch (error) { console.warn('Optional 3D asset unavailable:', key, error); }
    completed++; onProgress(completed / keys.length, key);
  }));
  const required = ['commonTree','pineTree','birchTree','bush','house','inn','blacksmith','well','barrel','wolf'];
  const missing = required.filter(key => !loaded[key]);
  if (missing.length) throw new Error('3D素材加载失败：' + missing.join(', '));

  // Real, textured tree and bush meshes replace the crossed-plane forest dressing.
  let seed = 0x4a71c3;
  const rand = () => ((seed = (Math.imul(seed,1664525) + 1013904223) >>> 0) / 4294967296);
  const treeTypes = ['commonTree','pineTree','birchTree'];
  for (let i = 0; i < 112; i++) {
    const angle = rand() * Math.PI * 2, radius = 43 + rand() * 76;
    const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius - 14;
    if (Math.abs(x) < 39 && z > -34 && z < 39) continue;
    if (Math.abs(x) < 5 && z < -25) continue;
    const key = treeTypes[i % treeTypes.length];
    const tree = cloneAsset(loaded[key], 7.5 + rand() * 2.2);
    tree.position.set(x, 0, z); tree.rotation.y = rand() * Math.PI * 2;
    const s = .82 + rand() * .34; tree.scale.multiplyScalar(s); scene.add(tree);
  }
  for (let i = 0; i < 48; i++) {
    const x = (rand() - .5) * 190, z = (rand() - .5) * 190;
    if (Math.abs(x) < 36 && z > -35 && z < 38) continue;
    const shrub = cloneAsset(loaded.bush, .9 + rand() * .7);
    shrub.position.set(x, 0, z); shrub.rotation.y = rand() * Math.PI * 2; scene.add(shrub);
  }

  // A handful of full GLB buildings add scale and a recognisable village silhouette.
  const villageBuildings = [
    ['house', -51, -4, 7.2, -.2],
    ['house', 39, -18, 7.5, 1.1],
    ['inn', -52, 20, 8.4, .25],
    ['blacksmith', 35, 16, 7.8, -1.0]
  ];
  for (const [key,x,z,h,r] of villageBuildings) place(scene, loaded[key], key, x, z, h, r);

  // Furnished village props use actual source meshes, not primitive stand-ins.
  place(scene, loaded.well, 'well', -8, 10, 2.7, 0);
  for (const [x,z,r] of [[-31,16,.2],[-28,13,1.2],[8,29,.7],[19,8,2.1],[-44,8,.4]]) {
    const barrel = cloneAsset(loaded.barrel, 1.05); barrel.position.set(x,0,z); barrel.rotation.y=r; scene.add(barrel);
  }
  if (loaded.mossRock) for (let i=0;i<24;i++) {
    const x=(rand()-.5)*180,z=(rand()-.5)*180;
    if (Math.abs(x)<38&&z>-34&&z<38) continue;
    const rock=cloneAsset(loaded.mossRock,.45+rand()*.65);rock.position.set(x,0,z);rock.rotation.y=rand()*6.28;scene.add(rock);
  }

  // Replace the temporary procedural wolf bodies with actual animated GLB wolves.
  const wolfMixers = [];
  for (const enemy of enemies) {
    enemy.root.remove(enemy.torso);
    const model = cloneAsset(loaded.wolf, 1.45, {roughness:.86});
    model.rotation.y = Math.PI;
    enemy.root.add(model);
    enemy.assetModel = model;
    if (loaded.wolf.animations?.length) {
      const mixer = new THREE.AnimationMixer(model);
      const clip = loaded.wolf.animations.find(c => /walk|run|idle/i.test(c.name)) || loaded.wolf.animations[0];
      const action = mixer.clipAction(clip); action.play();
      enemy.assetMixer = mixer; wolfMixers.push(mixer);
    }
  }
  return {
    count: 112 + 48 + villageBuildings.length + enemies.length,
    missingOptional: Object.keys(files).filter(key => !loaded[key]),
    update(dt) { wolfMixers.forEach(mixer => mixer.update(dt)); }
  };
}
