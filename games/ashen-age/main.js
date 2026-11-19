import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createEnvironment } from './environment.js?v=20261119-6';
import { loadCharacter } from './characters.js?v=20261119-6';
import { ThirdPersonControls } from './controls.js?v=20261119-6';
import { populateWorldAssets } from './assets.js?v=20261119-6';

const VERSION = '2026.11.19-6';
const $ = id => document.getElementById(id);
const qaMode = new URLSearchParams(location.search).has('qa');
const SAVE_KEY = 'ashen-age-v3-save';
const defaults = {hp:100,maxHp:100,mp:50,maxMp:50,xp:0,level:1,gold:35,potions:3,damage:22,kills:0,accepted:false,complete:false,claimed:false,inventory:[],day:1};
let state = {...defaults,inventory:[]};
const companions = [
  {id:'lyra',name:'莉拉',role:'精灵游侠',initial:'莉',desc:'披着林地斗篷的游侠，正在追寻北境失落的封印。她的箭会掩护你的旅途。',aff:18,joined:true,gift:'月露花',giftDay:0,talkDay:0},
  {id:'garrick',name:'加里克',role:'流亡骑士',initial:'加',desc:'曾效忠于一位已逝的领主。沉稳可靠，愿意站在你与危险之间。',aff:6,joined:false,gift:'陈年麦酒',giftDay:0,talkDay:0},
  {id:'mira',name:'米拉',role:'见习术士',initial:'米',desc:'研究古代符文的年轻术士，希望在龙陨之地找到魔法的起源。',aff:0,joined:false,gift:'古代符文',giftDay:0,talkDay:0},
];
let active='lyra', ready=false, modal=false, highQuality=true, storedPosition=null, tracked='guild';
if(!qaMode){
  try{
    const save=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');
    if(save?.schema===3){
      for(const key of Object.keys(defaults)){
        if(typeof defaults[key]==='number' && Number.isFinite(save.state?.[key])) state[key]=Math.max(0,save.state[key]);
        if(typeof defaults[key]==='boolean') state[key]=!!save.state?.[key];
      }
      state.hp=Math.min(state.maxHp,state.hp)||state.maxHp;state.mp=Math.min(state.maxMp,state.mp);
      state.inventory=Array.isArray(save.state?.inventory)?save.state.inventory.filter(x=>companions.some(c=>c.gift===x)).slice(0,99):[];
      companions.forEach(c=>{const stored=save.companions?.find(x=>x.id===c.id);if(stored){c.aff=THREE.MathUtils.clamp(Number(stored.aff)||0,0,100);c.joined=!!stored.joined;c.giftDay=Number(stored.giftDay)||0;c.talkDay=Number(stored.talkDay)||0;}});
      if(companions.some(c=>c.id===save.active&&c.joined))active=save.active;
      if(Array.isArray(save.position)&&save.position.length===3&&save.position.every(Number.isFinite))storedPosition=save.position;
    }
  }catch(_){/* A blocked or old local save must never block the game. */}
}
function saveGame(){
  if(qaMode||!ready)return;
  try{localStorage.setItem(SAVE_KEY,JSON.stringify({schema:3,state,companions,active,position:player.position.toArray()}));$('save-state').textContent='已自动保存';}
  catch(_){$('save-state').textContent='本次游玩未保存';}
}
let toastTimer;
function toast(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3100);}
function progress(value,label,detail){$('load-progress').value=value;$('load-number').textContent=Math.round(value)+'%';$('load-label').textContent=label;if(detail)$('load-detail').textContent=detail;}
const scene=new THREE.Scene();scene.background=new THREE.Color('#b7c7c5');scene.fog=new THREE.Fog('#b6c5be',65,205);
const camera=new THREE.PerspectiveCamera(52,innerWidth/innerHeight,.08,330);
let renderer;
try{
  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
}catch(_){throw new Error('此浏览器未能启动 WebGL 3D 渲染。请检查浏览器的硬件加速设置，再点击重新加载。');}
renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
$('world').appendChild(renderer.domElement);
renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();ready=false;window.showBootError(new Error('3D 渲染连接已中断，请点击重新加载。你的最近进度已保存在本机。'));});
scene.add(new THREE.HemisphereLight('#d1e5ef','#5e6241',2.05));
const sun=new THREE.DirectionalLight('#ffe1aa',3.1);sun.position.set(-26,48,24);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-36,right:36,top:36,bottom:-36,near:1,far:130});sun.shadow.bias=-.00012;sun.shadow.normalBias=.025;
scene.add(sun,sun.target);
const pmrem=new THREE.PMREMGenerator(renderer),reflectionRoom=new RoomEnvironment();
const envMap=pmrem.fromScene(reflectionRoom,.05);scene.environment=envMap.texture;scene.environmentIntensity=.65;pmrem.dispose();reflectionRoom.dispose();
progress(8,'正在构建灰烬镇','准备石板道路、房屋、林地与光照。');

const world=createEnvironment(scene,renderer);
let indoor=null, indoorReturn=null, outdoorCameraObstacles=null;
const roomMat={
 floor:new THREE.MeshStandardMaterial({color:'#a18c6d',roughness:.95}),
 plaster:new THREE.MeshStandardMaterial({color:'#d9c9a9',roughness:1}),
 timber:new THREE.MeshStandardMaterial({color:'#68482f',roughness:.9}),
 dark:new THREE.MeshStandardMaterial({color:'#3b2a20',roughness:.9}),
 stone:new THREE.MeshStandardMaterial({color:'#8b8c7e',roughness:1}),
 rug:new THREE.MeshStandardMaterial({color:'#8b4939',roughness:1}),
 glow:new THREE.MeshStandardMaterial({color:'#ffd28b',emissive:'#ff9d38',emissiveIntensity:1.3})
};
function roomPart(g,x,y,z,w,h,d,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function buildInterior(kind){
 const g=new THREE.Group();g.name='Interior-'+kind;
 roomPart(g,0,-.18,0,18,.35,14,roomMat.floor);
 roomPart(g,0,3.1,-7,18,6.2,.35,roomMat.plaster);roomPart(g,-9,3.1,0,.35,6.2,14,roomMat.plaster);roomPart(g,9,3.1,0,.35,6.2,14,roomMat.plaster);
 roomPart(g,0,6.25,0,18,.3,14,roomMat.dark);
 for(let x=-7;x<=7;x+=3.5)roomPart(g,x,5.95,0,.16,.3,13,roomMat.timber);
 const table=(x,z)=>{roomPart(g,x,.95,z,2.7,.18,1.45,roomMat.timber);for(const dx of [-1,1])for(const dz of [-.48,.48])roomPart(g,x+dx,.45,z+dz,.13,.9,.13,roomMat.dark);};
 const bench=(x,z)=>{roomPart(g,x,.62,z,2.4,.18,.55,roomMat.timber);for(const dx of [-.95,.95])roomPart(g,x+dx,.3,z,.12,.6,.12,roomMat.dark);};
 if(kind==='tavern'){
  roomPart(g,0,1.05,-5,7,.22,1.2,roomMat.timber);roomPart(g,0,1.7,-5.35,7,.95,.22,roomMat.dark);
  for(let x=-6;x<=6;x+=4){table(x,1.7);bench(x,2.8);bench(x,.65);}
  roomPart(g,-6,1.5,-6.7,2.3,2.8,.3,roomMat.stone);roomPart(g,-6,1.15,-6.4,.8,.4,.1,roomMat.glow);
  for(let i=0;i<4;i++)roomPart(g,5.6+i*.45,.65,-5.6,.35,1.3,.35,roomMat.timber);
 }else if(kind==='guild'){
  roomPart(g,0,1.3,-5.6,8,.25,.8,roomMat.dark);roomPart(g,0,2.15,-5.85,8,1.5,.25,roomMat.timber);
  for(let x=-3;x<=3;x+=1.5)roomPart(g,x,2.15,-5.68,.04,1.25,.04,roomMat.glow);
  for(let x of [-5,0,5]){table(x,1.5);bench(x,2.7);}
  roomPart(g,0,4.4,-6.55,4,.75,.16,roomMat.rug);
 }else{
  roomPart(g,-5,.9,-4,2.5,.18,1.5,roomMat.stone);roomPart(g,-5,1.45,-4,2.7,.95,.2,roomMat.dark);
  roomPart(g,4,.9,-3,3,.18,2,roomMat.timber);for(let i=0;i<4;i++)roomPart(g,3+i*.65,1.55,-3,.5,1.1,.5,roomMat.stone);
 }
 roomPart(g,0,1.35,6.82,2.1,2.7,.22,roomMat.dark);roomPart(g,0,.1,6.65,2.5,.2,.6,roomMat.stone);
 const light=new THREE.PointLight('#ffd69a',kind==='tavern'?100:75,24,2);light.position.set(0,4,0);g.add(light);
 g.visible=false;scene.add(g);return g;
}
const interiors={guild:buildInterior('guild'),tavern:buildInterior('tavern'),smith:buildInterior('smith')};
function enterInterior(kind){
 if(!interiors[kind])return;
 indoorReturn=player.position.clone();world.group.visible=false;enemies.forEach(e=>e.root.visible=false);Object.values(party).forEach(a=>a.root.visible=false);
 indoor=kind;outdoorCameraObstacles=controls._cameraObstacles;controls._cameraObstacles=[];Object.values(interiors).forEach(g=>g.visible=false);interiors[kind].visible=true;
 player.position.set(0,0,1.8);player.rotation.y=Math.PI;controls.reset();controls.yaw=0;controls.pitch=.18;controls.distance=5.2;controls.update(0,player,{blocked:false});close();
 toast('已进入室内，按 E 从正门离开。');
}
function leaveInterior(){
 if(!indoor)return;interiors[indoor].visible=false;indoor=null;if(outdoorCameraObstacles){controls._cameraObstacles=outdoorCameraObstacles;outdoorCameraObstacles=null;}world.group.visible=true;enemies.forEach(e=>e.root.visible=!e.dead);Object.values(party).forEach(a=>a.root.visible=true);
 player.position.copy(indoorReturn);indoorReturn=null;controls.reset();controls.yaw=0;controls.update(0,player,{blocked:false});toast('已返回灰烬镇。');
}

const player=new THREE.Group();player.name='Player';player.position.set(0,0,16);player.rotation.y=Math.PI;scene.add(player);
if(storedPosition){player.position.set(THREE.MathUtils.clamp(storedPosition[0],-94,94),0,THREE.MathUtils.clamp(storedPosition[2],-94,94));}
let hero,party={},npcs={},cool=0,spellCool=0,dodgeCool=0,dodgeTime=0,attackTime=0,pendingHit=null,allyClock=0,nearest=null,time=0;
const dodgeDirection=new THREE.Vector3(0,0,-1),up=new THREE.Vector3(0,1,0),previousPosition=new THREE.Vector3();
const controls=new ThirdPersonControls({canvas:renderer.domElement,camera,colliders:world.cameraColliders||world.colliders,onAction:action,distance:5.4,pitch:.26,targetHeight:1.25});
const homes={lyra:new THREE.Vector3(-5,0,21),garrick:new THREE.Vector3(-10,0,-4),mira:new THREE.Vector3(12,0,21)};
const npcInteractions=companions.map(c=>({x:homes[c.id].x,z:homes[c.id].z,title:c.name,kind:c.id}));
const interactables=[...world.interactables,...npcInteractions];
function groundShadow(radius=.65){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d'),gradient=ctx.createRadialGradient(32,32,2,32,32,31);gradient.addColorStop(0,'rgba(10,20,15,.36)');gradient.addColorStop(1,'rgba(10,20,15,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(radius*2,radius*2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(canvas),transparent:true,depthWrite:false}));mesh.rotation.x=-Math.PI/2;mesh.position.y=.045;return mesh;
}
player.add(groundShadow(.65));
const particles=[];
const fxGeometry=new THREE.SphereGeometry(.07,8,6);
const fxGold=new THREE.MeshBasicMaterial({color:'#ffe5a1'}),fxBlue=new THREE.MeshBasicMaterial({color:'#a6e6ff'}),fxRed=new THREE.MeshBasicMaterial({color:'#d77649'});
function spark(position,type='gold',count=12){for(let i=0;i<count;i++){const mesh=new THREE.Mesh(fxGeometry,type==='blue'?fxBlue:type==='red'?fxRed:fxGold);mesh.position.copy(position);scene.add(mesh);particles.push({mesh,life:.35+Math.random()*.3,max:.65,velocity:new THREE.Vector3((Math.random()-.5)*3,Math.random()*2,(Math.random()-.5)*3)});}}
const projectileGeometry=new THREE.SphereGeometry(.12,12,8);
const projectiles=[];
function projectile(start,end,color='blue'){const mesh=new THREE.Mesh(projectileGeometry,color==='blue'?fxBlue:fxGold);mesh.position.copy(start);scene.add(mesh);projectiles.push({mesh,start:start.clone(),end:end.clone(),age:0,duration:.28});}
const enemyFur=new THREE.MeshStandardMaterial({color:'#5f5c50',roughness:1}),enemyDark=new THREE.MeshStandardMaterial({color:'#393c37',roughness:1}),enemyEye=new THREE.MeshStandardMaterial({color:'#ffa16a',emissive:'#b33516',emissiveIntensity:2});
const enemies=[];
function makeWolf(x,z,big=false){
  const g=new THREE.Group();g.position.set(x,0,z);const torso=new THREE.Group();g.add(torso);
  function ellipsoid(parent,x,y,z,a,b,c,material=enemyFur){const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,12,9),material);mesh.position.set(x,y,z);mesh.scale.set(a,b,c);mesh.castShadow=true;parent.add(mesh);return mesh;}
  ellipsoid(torso,0,.75,0,.29,.37,.63);ellipsoid(torso,0,.88,.42,.28,.39,.34);ellipsoid(torso,0,1.12,.66,.25,.25,.32);
  ellipsoid(torso,0,1.01,.94,.16,.14,.28,enemyDark);ellipsoid(torso,0,1.03,1.14,.10,.075,.075,enemyDark);
  for(const side of [-1,1]){const ear=new THREE.Mesh(new THREE.ConeGeometry(.13,.34,5),enemyDark);ear.position.set(side*.17,1.4,.58);ear.rotation.z=-side*.2;torso.add(ear);ellipsoid(torso,side*.18,1.17,.84,.04,.038,.035,enemyEye);}
  const legs=[];
  for(const side of [-1,1])for(const zPos of [-.4,.39]){const pivot=new THREE.Group();pivot.position.set(side*.21,.64,zPos);torso.add(pivot);ellipsoid(pivot,0,-.16,0,.10,.24,.12);ellipsoid(pivot,0,-.42,.025,.075,.2,.07,enemyDark);ellipsoid(pivot,0,-.58,.08,.09,.055,.14,enemyDark);legs.push(pivot);}
  const tail=new THREE.Group();tail.position.set(0,.85,-.53);tail.rotation.x=-.6;torso.add(tail);ellipsoid(tail,0,-.12,-.3,.12,.13,.42);
  g.add(groundShadow(.8));if(big)g.scale.setScalar(1.23);scene.add(g);
  const enemy={root:g,torso,legs,tail,home:new THREE.Vector3(x,0,z),hp:big?90:54,maxHp:big?90:54,big,dead:false,cd:0,phase:Math.random()*6,respawn:0};enemies.push(enemy);return enemy;
}
for(const [i,pos] of [[-16,-42],[-24,-54],[-39,-44],[-51,-58],[-62,-40],[-73,-58],[-43,-76],[-24,-73]].entries())makeWolf(...pos,i===5);
function closestEnemy(range){return enemies.filter(e=>!e.dead&&e.root.position.distanceTo(player.position)<range).sort((a,b)=>a.root.position.distanceTo(player.position)-b.root.position.distanceTo(player.position))[0];}
function gainXP(amount){state.xp+=amount;while(state.xp>=100){state.xp-=100;state.level++;state.maxHp+=12;state.maxMp+=6;state.hp=state.maxHp;state.mp=state.maxMp;toast('冒险等级提升至 '+state.level);}}
function damageEnemy(enemy,amount){if(enemy.dead)return;enemy.hp-=amount;spark(enemy.root.position.clone().add(new THREE.Vector3(0,1,0)),amount>25?'blue':'gold');if(enemy.hp<=0){enemy.dead=true;enemy.root.visible=false;enemy.respawn=55;state.gold+=5;gainXP(25);if(state.accepted&&!state.complete){state.kills++;if(state.kills>=3){state.complete=true;toast('委托目标已完成，返回公会领取报酬。');}}const c=companions.find(c=>c.id===active);if(c)c.aff=Math.min(100,c.aff+1);updateQuest();saveGame();}}
function hit(){
  if(cool>0||modal||!ready||!hero.playOnce('Attack'))return;
  cool=.8;attackTime=.7;const target=closestEnemy(3.2);
  if(target){const d=target.root.position.clone().sub(player.position);player.rotation.y=Math.atan2(d.x,d.z);}
  pendingHit={remaining:.38,target};
}
function cast(){
  if(spellCool>0||modal||!ready)return;if(state.mp<12){toast('法力不足');return;}
  const target=closestEnemy(18);if(!target){toast('18 米内没有可施法的目标');return;}
  if(!hero.playOnce('Cast'))return;
  spellCool=1.1;attackTime=.75;state.mp-=12;
  const direction=target.root.position.clone().sub(player.position);player.rotation.y=Math.atan2(direction.x,direction.z);
  projectile(player.position.clone().add(new THREE.Vector3(0,1.4,0)),target.root.position.clone().add(new THREE.Vector3(0,.9,0)));
  damageEnemy(target,38);
}
function dodge(){
  if(dodgeCool>0||modal||!ready)return;if(state.mp<6){toast('闪避需要 6 点法力');return;}
  if(!hero.playOnce('Dodge'))return;
  const movement=controls.getState();dodgeDirection.fromArray(movement.moving?movement.direction:movement.facing);if(dodgeDirection.lengthSq()<.1)dodgeDirection.set(0,0,-1);
  state.mp-=6;dodgeTime=.38;dodgeCool=1.25;
}
function usePotion(){if(state.hp>=state.maxHp){toast('生命值已满');return;}if(state.potions<=0){toast('药水已用完，可前往铁匠铺补充');return;}state.potions--;state.hp=Math.min(state.maxHp,state.hp+45);toast('使用生命药水 · 恢复 45 点生命');saveGame();}

function open(title,html){modal=true;controls.reset();hero?.setMotion('Idle');$('mtitle').textContent=title;$('mbody').innerHTML=html;$('modal').hidden=false;$('prompt').hidden=true;$('close').focus();saveGame();}
function close(){modal=false;$('modal').hidden=true;controls.reset();if(ready)controls.update(0,player,{blocked:false});renderer.domElement.focus({preventScroll:true});}
$('close').onclick=close;$('modal').addEventListener('click',event=>{if(event.target===$('modal'))close();});
function relation(aff){return aff>=70?'挚友':aff>=40?'信赖':aff>=15?'熟识':'初识';}
function companionHTML(){return '<p>同行伙伴会跟随你，并在战斗中提供支援。交谈、赠礼和并肩作战会增进友谊。</p>'+companions.map(c=>`<article class="comp"><div class="portrait">${c.initial}</div><div class="compmain"><h3>${c.name} <span class="tag">${c.role}</span><span class="tag">${active===c.id?'当前同行':c.joined?'已加入':'待结识'}</span></h3><p>${c.desc}</p><div class="relationship"><span>${relation(c.aff)}</span><span>好感度 ${c.aff} / 100</span></div><div class="meter"><i style="width:${c.aff}%"></i></div><button class="btn" data-do="talk" data-id="${c.id}">交谈</button><button class="btn" data-do="gift" data-id="${c.id}">赠礼</button>${c.joined?`<button class="btn secondary" data-do="active" data-id="${c.id}" ${active===c.id?'disabled':''}>邀请同行</button>`:`<button class="btn secondary" data-do="recruit" data-id="${c.id}">邀请加入</button>`}</div></article>`).join('')+'<p class="note">这些好友是旅途中结识的角色；当前版本为单人游戏。休息一晚可开始新的一天。</p>';}
function openComp(){open('伙伴与好友',companionHTML());}
function inventory(){open('冒险者背包',`<div class="cards"><div class="card"><h3>旅人长剑</h3><p>攻击力 ${state.damage}</p></div><div class="card"><h3>生命药水 × ${state.potions}</h3><p>每瓶恢复 45 点生命，按 H 使用。</p></div></div><p>金币：${state.gold}</p><p>礼物：${state.inventory.join('、')||'暂无，可在旅行商人处购买。'}</p>`);}
function map(){open('灰烬镇 · 行路指引','<p>选择目的地以跟踪距离。镇北木门通往幽影林地。</p><div class="map-list">'+world.interactables.map(item=>`<button data-do="track" data-id="${item.kind}"><strong>${item.title}</strong><span>距你 ${Math.round(Math.hypot(item.x-player.position.x,item.z-player.position.z))} 米 · 跟踪目的地</span></button>`).join('')+'</div><p class="note">公会在北侧，酒馆在西侧，铁匠铺在东侧，商人在南侧。按住 Shift 奔跑。</p>');}
function help(){open('冒险者操作手册','<table class="controls-table"><tr><td>W / S</td><td>朝镜头前方 / 后方移动</td></tr><tr><td>A / D</td><td>朝画面左侧 / 右侧移动</td></tr><tr><td>Shift</td><td>按住奔跑</td></tr><tr><td>鼠标拖动 / 滚轮</td><td>转动镜头 / 调整距离</td></tr><tr><td>J / K / 空格</td><td>斩击 / 奥术飞弹 / 闪避</td></tr><tr><td>E / P / I / M</td><td>互动 / 伙伴好友 / 背包 / 地图</td></tr><tr><td>H / Esc</td><td>使用药水 / 关闭窗口</td></tr></table><p class="note">进度自动保存在当前浏览器。画面右上角可切换精细 / 流畅画质。</p>');}
function interact(kind){
  if(kind==='guild')open('灰烬镇冒险者公会',`<p>火漆封着新的委托。公会需要可靠的人，清理北边林道上的腐化狼群。</p><div class="cards"><div class="card"><h3>林道上的阴影</h3><p>击败三只腐化灰狼，再向公会报告。</p><span class="tag">60 金币</span><span class="tag">80 经验</span><p>${state.claimed?'委托已完成，报酬已领取。':state.complete?'目标已完成，可以领取报酬。':state.accepted?`已击败 ${state.kills} / 3`:'沿镇北木门进入林地。'}</p><button class="btn" data-do="quest" ${state.claimed?'disabled':''}>${state.complete?'领取报酬':state.accepted?'继续委托':'接受委托'}</button></div><div class="card"><h3>公会伙伴名录</h3><p>可靠的伙伴会让危险的旅程多一份胜算。</p><button class="btn secondary" data-do="companions">查看伙伴</button></div></div><button class="btn" data-do="enter" data-id="guild">进入公会大厅</button>`);
  else if(kind==='tavern')open('旅人酒馆 · 暖炉与麦酒','<p>火炉映亮陈旧的木桌。酒客们谈着北境的传闻，你可以和同行伙伴坐下休息。</p><div class="cards"><div class="card"><h3>共饮一杯</h3><p>花费 12 金币，同行伙伴好感 +8。</p><button class="btn" data-do="ale">买一轮酒</button></div><div class="card"><h3>听听传闻</h3><p>古石阵的封印似乎正在松动。</p><button class="btn" data-do="rumor">打听消息</button></div><div class="card"><h3>休息一晚</h3><p>花费 8 金币，恢复生命、法力，开始新的一天。</p><button class="btn" data-do="rest">入住客房</button></div></div><button class="btn" data-do="enter" data-id="tavern">进入酒馆</button>');
  else if(kind==='smith')open('铁匠铺','<p>铁匠把尚有余温的长剑放在砧上：“一把可靠的剑，会替你挡下许多麻烦。”</p><button class="btn" data-do="upgrade">磨砺长剑 · 45 金币 · 攻击 +5</button><button class="btn" data-do="potion">购买药水 · 10 金币</button><button class="btn" data-do="enter" data-id="smith">进入铁匠铺</button>');
  else if(kind==='merchant')open('旅行商人','<p>商人收集了适合赠予伙伴的小物件，每件 12 金币。</p>'+companions.map(c=>`<button class="btn" data-do="buygift" data-id="${c.id}">${c.gift} · 12 金币</button>`).join(''));
  else if(companions.some(c=>c.id===kind))openComp();
}
function spend(amount){if(state.gold<amount){toast('金币不足');return false;}state.gold-=amount;return true;}
$('mbody').addEventListener('click',event=>{
  const button=event.target.closest('[data-do]');if(!button||button.disabled)return;
  const cmd=button.dataset.do,id=button.dataset.id,c=companions.find(c=>c.id===id),current=companions.find(c=>c.id===active);
  if(cmd==='companions'){openComp();return;}
  if(cmd==='enter'){enterInterior(id);return;}
  if(cmd==='track'){tracked=id;close();toast('已跟踪 '+world.interactables.find(i=>i.kind===id).title);return;}
  if(cmd==='quest'){
    if(state.claimed)return;
    if(state.complete){state.gold+=60;gainXP(80);state.claimed=true;state.complete=false;state.accepted=false;toast('委托报酬：60 金币、80 经验');}
    else if(state.accepted){toast('继续沿镇北木门进入林地，当前进度已保留。');}
    else{state.accepted=true;state.kills=0;toast('已接受委托：击败三只腐化灰狼');}
    close();updateQuest();
  }
  if(cmd==='talk'&&c){if(c.talkDay===state.day){toast('今天已经聊过了，一起冒险也能增进友谊。');return;}c.talkDay=state.day;c.aff=Math.min(100,c.aff+3);open(c.name,`<p>${c.desc}</p><p>你们分享了各自的故事。好感度 +3。</p><button class="btn" data-do="companions">返回伙伴名录</button>`);}
  if(cmd==='gift'&&c){
    if(c.giftDay===state.day){toast('今天已送过礼物，休息一晚后可以再送。');return;}
    const giftIndex=state.inventory.indexOf(c.gift);if(giftIndex>=0)state.inventory.splice(giftIndex,1);else if(!spend(12))return;
    c.giftDay=state.day;c.aff=Math.min(100,c.aff+14);open(c.name,`<p>你送出了${c.gift}。${c.name}郑重地收下了这份心意。好感度 +14。</p><button class="btn" data-do="companions">返回伙伴名录</button>`);
  }
  if(cmd==='recruit'&&c){if(c.aff<15){toast('好感度达到 15 后，伙伴才愿意加入。');return;}c.joined=true;c.aff=Math.min(100,c.aff+5);openComp();toast(c.name+' 已加入队伍');}
  if(cmd==='active'&&c?.joined){setActive(c.id);openComp();toast(c.name+' 将与你同行');}
  if(cmd==='ale'&&spend(12)){current.aff=Math.min(100,current.aff+8);open('酒馆闲谈',`<p>你和${current.name}举杯，聊起旅途中的见闻。好感度 +8。</p>`);}
  if(cmd==='rumor')open('酒馆传闻','<p>老板压低声音：“北边古石阵亮起了蓝色的火。那是龙陨之地的封印。”</p><span class="tag">线索：北境古石阵</span>');
  if(cmd==='rest'&&spend(8)){state.hp=state.maxHp;state.mp=state.maxMp;state.day++;close();toast('天亮了。生命、法力已恢复。');}
  if(cmd==='upgrade'&&spend(45)){state.damage+=5;close();toast('长剑攻击力提升至 '+state.damage);}
  if(cmd==='potion'&&spend(10)){state.potions++;close();toast('获得生命药水');}
  if(cmd==='buygift'&&c&&spend(12)){state.inventory.push(c.gift);close();toast('获得 '+c.gift);}
  refreshHUD();saveGame();
});
function action(code){
  if(code==='Escape'){close();return;}if(!ready||modal)return;
  if(code==='KeyJ')hit();if(code==='KeyK')cast();if(code==='Space')dodge();if(code==='KeyH')usePotion();
  if(code==='KeyE'&&indoor){leaveInterior();return;}if(code==='KeyE'&&nearest?.d<3.4)interact(nearest.kind);
  if(code==='KeyP')openComp();if(code==='KeyI')inventory();if(code==='KeyM')map();if(code==='F1')help();
}
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>action(button.dataset.action)));
$('track').onclick=map;
$('quality').onclick=()=>{highQuality=!highQuality;renderer.setPixelRatio(Math.min(devicePixelRatio,highQuality?1.7:1));sun.shadow.mapSize.set(highQuality?2048:1024,highQuality?2048:1024);sun.shadow.map?.dispose();sun.shadow.map=null;world.setQuality(highQuality?'high':'balanced');$('quality').textContent='画质 · '+(highQuality?'精细':'流畅');};
function setActive(id){
  if(!companions.some(c=>c.id===id&&c.joined))return;active=id;
  for(const c of companions){const actor=party[c.id];if(!actor)continue;actor.root.position.copy(c.id===active?player.position.clone().add(new THREE.Vector3(-1.6,0,1.2)):homes[c.id]);actor.setMotion('Idle');}
}
function updateQuest(){
  $('qtitle').textContent=state.claimed?'新的旅程':state.complete?'返回公会领取报酬':state.accepted?'林道上的阴影':'旅途的第一份委托';
  $('qdesc').textContent=state.claimed?'你已赢得公会的信任。继续探索林地，结识旅途中的伙伴。':state.complete?'腐化灰狼已被清理，向公会报告你的发现。':'镇北林道出现腐化灰狼，公会需要你的帮助。';
  $('objective').textContent=state.claimed?'◇ 委托已完成':state.complete?'◇ 返回公会':state.accepted?`◇ 击败腐化灰狼 ${Math.min(3,state.kills)} / 3`:'◇ 前往公会接受委托';
}
function moveOutOfWalls(position,old){
  position.x=THREE.MathUtils.clamp(position.x,-100,100);position.z=THREE.MathUtils.clamp(position.z,-100,100);
  for(const b of world.colliders){const pad=.35;if(position.x>b.minX-pad&&position.x<b.maxX+pad&&position.z>b.minZ-pad&&position.z<b.maxZ+pad){
    if(old.x<=b.minX-pad||old.x>=b.maxX+pad)position.x=old.x;
    else if(old.z<=b.minZ-pad||old.z>=b.maxZ+pad)position.z=old.z;
    else{const exits=[{d:Math.abs(position.x-(b.minX-pad)),axis:'x',v:b.minX-pad},{d:Math.abs(position.x-(b.maxX+pad)),axis:'x',v:b.maxX+pad},{d:Math.abs(position.z-(b.minZ-pad)),axis:'z',v:b.minZ-pad},{d:Math.abs(position.z-(b.maxZ+pad)),axis:'z',v:b.maxZ+pad}];exits.sort((a,b)=>a.d-b.d);position[exits[0].axis]=exits[0].v;}
  }}
}
let hudClock=0,saveClock=0,qaClock=0,frameCount=0,renderedFrames=0,frameTime=0,fps=0;
function refreshHUD(){
  $('hp').style.width=state.hp/state.maxHp*100+'%';$('mp').style.width=state.mp/state.maxMp*100+'%';$('xp').style.width=state.xp+'%';
  $('hptext').textContent=Math.ceil(state.hp)+' / '+state.maxHp;$('mptext').textContent=Math.floor(state.mp)+' / '+state.maxMp;$('xptext').textContent='经验 '+state.xp+' / 100';
  $('lvl').textContent=String(state.level).padStart(2,'0');$('gold').textContent=state.gold;$('potions').textContent='× '+state.potions;
  $('attack-cd').textContent=cool>.05?cool.toFixed(1)+' s':'长剑';$('spell-cd').textContent=spellCool>.05?spellCool.toFixed(1)+' s':'12 法力';$('dodge-cd').textContent=dodgeCool>.05?dodgeCool.toFixed(1)+' s':'6 法力';
  const c=companions.find(c=>c.id===active);$('ally-name').textContent=c.name;$('ally-role').textContent=c.role;$('ally-affinity').textContent=`好感 ${c.aff} · ${relation(c.aff)}`;
  $('region').textContent=player.position.z<-31?'幽影林地':'灰烬镇';
  const bearing=((controls.yaw*180/Math.PI)%360+360)%360;const directions=['北 N','西 W','南 S','东 E'];$('compass').textContent=directions[Math.round(bearing/90)%4];
  const destination=world.interactables.find(i=>i.kind===tracked)||world.interactables[0];$('track').firstChild.textContent='⌖ '+destination.title+' ';$('distance').textContent=Math.round(Math.hypot(destination.x-player.position.x,destination.z-player.position.z))+' m';
  const movingNPCs=npcInteractions.filter(o=>o.kind!==active).map(o=>({...o,x:party[o.kind]?.root.position.x??o.x,z:party[o.kind]?.root.position.z??o.z}));
  nearest=[...world.interactables,...movingNPCs].map(o=>({...o,d:Math.hypot(o.x-player.position.x,o.z-player.position.z)})).sort((a,b)=>a.d-b.d)[0];
  $('prompt').hidden=modal||!nearest||nearest.d>=3.4;if(nearest)$('prompt-text').textContent=nearest.title;
  const e=closestEnemy(20);$('target').hidden=!e||modal;if(e){$('target-name').textContent=e.big?'腐化狼王':'腐化灰狼';$('target-hp').style.width=Math.max(0,e.hp/e.maxHp)*100+'%';}
}
function update(dt){
  if(indoor){
    cool=Math.max(0,cool-dt);spellCool=Math.max(0,spellCool-dt);dodgeCool=Math.max(0,dodgeCool-dt);dodgeTime=Math.max(0,dodgeTime-dt);
    previousPosition.copy(player.position);
    const movement=controls.update(dt,player,{blocked:modal||!ready,walkSpeed:2.3,runSpeed:4.8,dodgeDirection:dodgeTime>0?dodgeDirection:null,dodgeSpeed:dodgeTime>0?8.5:0});
    player.position.x=THREE.MathUtils.clamp(player.position.x,-8.1,8.1);
    player.position.z=THREE.MathUtils.clamp(player.position.z,-5.7,5.5);
    const speed=player.position.distanceTo(previousPosition)/Math.max(dt,.0001);
    const motion=speed>.1?(movement.run?'Run':'Walk'):'Idle';
    hero.setMotion(motion,motion==='Idle'?1:speed/hero.velocity[motion]);
    const companion=party[active];
    if(companion){const target=player.position.clone().add(new THREE.Vector3(-1.6,0,1.2).applyAxisAngle(up,player.rotation.y));companion.root.position.lerp(target,Math.min(1,dt*4));companion.root.rotation.y=player.rotation.y;companion.setMotion(speed>.1?motion:'Idle');}
    return;
  }
  cool=Math.max(0,cool-dt);spellCool=Math.max(0,spellCool-dt);dodgeCool=Math.max(0,dodgeCool-dt);dodgeTime=Math.max(0,dodgeTime-dt);attackTime=Math.max(0,attackTime-dt);
  previousPosition.copy(player.position);
  const movement=controls.update(dt,player,{blocked:modal||!ready,walkSpeed:2.3,runSpeed:4.8,dodgeDirection:dodgeTime>0?dodgeDirection:null,dodgeSpeed:dodgeTime>0?8.5:0,movementLocked:attackTime>0});
  moveOutOfWalls(player.position,previousPosition);
  const actualSpeed=player.position.distanceTo(previousPosition)/Math.max(dt,.0001);
  const heroMotion=actualSpeed>.1?(movement.run?'Run':'Walk'):'Idle';
  hero.setMotion(heroMotion,heroMotion==='Idle'?1:actualSpeed/hero.velocity[heroMotion]);
  state.mp=Math.min(state.maxMp,state.mp+dt*1.3);
  if(pendingHit){pendingHit.remaining-=dt;if(pendingHit.remaining<=0){const e=pendingHit.target;if(e&&!e.dead&&e.root.position.distanceTo(player.position)<3.6)damageEnemy(e,state.damage);else spark(player.position.clone().add(new THREE.Vector3(Math.sin(player.rotation.y)*1.1,1.1,Math.cos(player.rotation.y)*1.1)), 'gold',4);pendingHit=null;}}
  for(const e of enemies){
    if(e.dead){e.respawn-=dt;if(e.respawn<=0&&player.position.distanceTo(e.home)>25){e.dead=false;e.root.visible=true;e.hp=e.maxHp;e.root.position.copy(e.home);}continue;}
    const d=e.root.position.distanceTo(player.position);let moving=false;
    if(d<17&&player.position.z<-28){
      const dir=player.position.clone().sub(e.root.position).setY(0).normalize();e.root.rotation.y=Math.atan2(dir.x,dir.z);
      if(d>1.6){e.root.position.addScaledVector(dir,2.2*dt);moving=true;}
      else if(e.cd<=0){e.cd=1.35;if(dodgeTime<=0){state.hp-=e.big?14:7;spark(player.position.clone().add(new THREE.Vector3(0,1,0)),'red',5);if(state.hp<=0){state.hp=state.maxHp;state.gold=Math.max(0,state.gold-10);player.position.set(0,0,16);controls.reset();setActive(active);toast('你被镇民救回。损失 10 金币，生命已恢复。');saveGame();}}}
    }else if(e.root.position.distanceTo(e.home)>1){const dir=e.home.clone().sub(e.root.position).normalize();e.root.position.addScaledVector(dir,1.4*dt);e.root.rotation.y=Math.atan2(dir.x,dir.z);moving=true;}
    e.cd=Math.max(0,e.cd-dt);e.phase+=dt*(moving?10:1.2);e.legs.forEach((leg,i)=>leg.rotation.x=moving?Math.sin(e.phase+(i===0||i===3?0:Math.PI))*.58:0);e.torso.position.y=moving?Math.abs(Math.sin(e.phase))*.035:Math.sin(e.phase)*.008;e.tail.rotation.z=Math.sin(e.phase*.5)*.15;
  }
  for(const c of companions){
    const actor=party[c.id];if(!actor)continue;
    if(c.id===active){
      const behind=new THREE.Vector3(-1.5,0,-1.5).applyAxisAngle(up,player.rotation.y);const destination=player.position.clone().add(behind);const to=destination.sub(actor.root.position);const d=to.length();
      if(d>12){actor.root.position.copy(player.position).add(behind);actor.setMotion('Idle');}
      else if(d>.45){const speed=Math.min(d*2.6,5);const old=actor.root.position.clone();const dir=to.normalize();actor.root.position.addScaledVector(dir,Math.min(d,speed*dt));moveOutOfWalls(actor.root.position,old);const actual=actor.root.position.distanceTo(old)/Math.max(.0001,dt);actor.root.quaternion.slerp(new THREE.Quaternion().setFromAxisAngle(up,Math.atan2(dir.x,dir.z)),1-Math.exp(-8*dt));const motion=actual>3?'Run':actual>.1?'Walk':'Idle';actor.setMotion(motion,motion==='Idle'?1:actual/actor.velocity[motion]);}
      else actor.setMotion('Idle');
      allyClock-=dt;const enemy=closestEnemy(c.id==='garrick'?5:16);
      if(enemy&&allyClock<=0&&actor.playOnce(c.id==='garrick'?'Attack':'Cast')){allyClock=2.5;const dir=enemy.root.position.clone().sub(actor.root.position);actor.root.rotation.y=Math.atan2(dir.x,dir.z);if(c.id!=='garrick')projectile(actor.root.position.clone().add(new THREE.Vector3(0,1.3,0)),enemy.root.position.clone().add(new THREE.Vector3(0,.9,0)),c.id==='lyra'?'gold':'blue');damageEnemy(enemy,c.id==='lyra'?12:c.id==='mira'?16:14);}
    }else actor.setMotion('Idle');
  }
  for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=5*dt;p.mesh.scale.setScalar(Math.max(.01,p.life/p.max));if(p.life<=0){scene.remove(p.mesh);particles.splice(i,1);}}
  for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];p.age+=dt;p.mesh.position.lerpVectors(p.start,p.end,Math.min(1,p.age/p.duration));if(p.age>=p.duration){scene.remove(p.mesh);projectiles.splice(i,1);}}
  sun.position.copy(player.position).add(new THREE.Vector3(-26,48,24));sun.target.position.copy(player.position);
}
function diagnostics(){
  const d=hero?.diagnostics();
  return {ready,version:VERSION,indoor,frame:renderedFrames,simulationTime:time,player:{position:player.position.toArray(),rotation:player.rotation.y,mode:d?.mode,actionTime:d?.time,boneCount:d?.bones,skinnedMeshes:d?.skinnedMeshes,vertices:d?.vertices,bones:d?Object.entries(d.joints).map(([name,j])=>({name,q:j.quaternion,p:j.position})):[],animation:d},camera:{position:camera.position.toArray(),yaw:controls.yaw,pitch:controls.pitch,insideCollider:(world.cameraColliders||world.colliders).some(b=>camera.position.x>b.minX-.3&&camera.position.x<b.maxX+.3&&camera.position.y>(b.minY??0)&&camera.position.y<(b.maxY??8)&&camera.position.z>b.minZ-.3&&camera.position.z<b.maxZ+.3),distanceToPlayer:camera.position.distanceTo(player.position)},controls:controls.getState(),ally:party[active]?{id:active,position:party[active].root.position.toArray(),animation:party[active].diagnostics()}:null,enemies:enemies.map((enemy,index)=>({index,position:enemy.root.position.toArray(),hp:enemy.hp,maxHp:enemy.maxHp,dead:enemy.dead})),state:{...state},modal,nearest,renderer:{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,webgl2:renderer.capabilities.isWebGL2,fps},environment:world.diagnostics()};
}
async function boot(){
  progress(6,'正在加载真实世界素材','下载树木、房屋、家具与怪物模型。');
  const environmentAssets = await populateWorldAssets({scene,world,enemies,onProgress:(ratio,key)=>progress(6+ratio*9,'正在加载场景素材',`已载入 ${key}`)});
  progress(15,'正在加载骑士与伙伴','准备骨骼模型、材质和行走动作。');
  const loaded={};const estimates={'knight.glb':6754704,'garrick.glb':3934364,'mira.glb':3213988};
  const onProgress=event=>{loaded[event.file]=event.loaded;const total=Object.values(estimates).reduce((a,b)=>a+b,0);progress(15+Math.min(1,Object.values(loaded).reduce((a,b)=>a+b,0)/total)*72,'正在加载骑士与伙伴',`人物资源 ${Math.round(Object.values(loaded).reduce((a,b)=>a+b,0)/1024/1024*10)/10} MB`);};
  const results=await Promise.all([loadCharacter('hero',{onProgress}),...companions.map(c=>loadCharacter(c.id,{onProgress}))]);
  hero=results[0];player.add(hero.root);
  companions.forEach((c,i)=>{party[c.id]=results[i+1];scene.add(party[c.id].root);party[c.id].root.add(groundShadow(.55));});
  setActive(active);moveOutOfWalls(player.position,player.position.clone());
  controls.update(0,player,{blocked:true});
  progress(94,'正在准备光照与动作','模型已加载，正在编译 3D 材质。');
  await renderer.compileAsync(scene,camera);
  ready=true;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);controls.update(0,player,{blocked:false});refreshHUD();updateQuest();
  $('loading').hidden=true;$('hud').hidden=false;$('mobile').hidden=false;
  renderer.render(scene,camera);renderer.domElement.focus();
  if(qaMode)$('qa-state').textContent=JSON.stringify(diagnostics());
  toast(state.accepted?'欢迎回来，沿镇北木门进入林地。':'欢迎来到灰烬镇。按 M 查看公会与酒馆的位置。');
  console.info('ASHEN_AGE_READY',VERSION,{hero:hero.diagnostics().clips.map(c=>c.name),rigged:true});
}
await boot();
let previous=performance.now();
function loop(now){
  requestAnimationFrame(loop);const raw=Math.max(0,(now-previous)/1000);previous=now;
  if(!ready)return;
  // Use the same elapsed time for movement, cooldowns and skeletons. Substeps
  // keep collisions stable when rendering takes longer than a normal frame.
  const dt=document.hidden?0:Math.min(raw,.5);
  if(document.hidden)controls.update(0,player,{blocked:true});
  const steps=Math.ceil(dt/(1/60)),step=steps?dt/steps:0;
  for(let i=0;i<steps;i++){
    if(!modal)update(step);else controls.update(step,player,{blocked:true});
    hero.update(step);Object.values(party).forEach(c=>c.update(step));environmentAssets?.update(step);
  }
  time+=dt;if(dt)world.update(dt,time);
  renderer.render(scene,camera);renderedFrames++;frameCount++;frameTime+=raw;if(frameTime>=1){fps=Math.round(frameCount/frameTime);frameCount=0;frameTime=0;}
  hudClock+=dt;qaClock+=dt;saveClock+=dt;
  if(hudClock>.12){refreshHUD();hudClock=0;}if(saveClock>6){saveGame();saveClock=0;}
  if(qaMode&&qaClock>.08){$('qa-state').textContent=JSON.stringify(diagnostics());qaClock=0;}
}
requestAnimationFrame(loop);
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
window.addEventListener('pagehide',saveGame);
