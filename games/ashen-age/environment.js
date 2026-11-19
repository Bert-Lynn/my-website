import * as THREE from 'three';

// Original deterministic environment art. All canvases below are material maps;
// every world surface is rendered as geometry by Three.js / WebGL.
export function createEnvironment(scene, renderer) {
  const group = new THREE.Group(); group.name = 'GreyhavenEnvironment'; scene.add(group);
  const colliders = [], cameraColliders = [], interactables = [], animated = [], materials = [], textures = [];
  const batches = new Map();
  let seed = 0x527c9a31;
  const rand = () => ((seed = (Math.imul(seed,1664525) + 1013904223) >>> 0) / 4294967296);
  const range = (a,b) => a + rand()*(b-a);
  const color = (r,g,b,a=1) => `rgba(${r|0},${g|0},${b|0},${a})`;
  function texture(kind, size=512) {
    const canvas=document.createElement('canvas');canvas.width=canvas.height=size;
    const c=canvas.getContext('2d'), s=size;
    c.fillStyle=kind==='grass'?'#666952':kind==='wood'?'#66503a':kind==='slate'?'#384650':kind==='plaster'?'#b3a38a':kind==='cobble'?'#5a574e':'#77746a';c.fillRect(0,0,s,s);
    if(kind==='stone'||kind==='cobble'||kind==='slate') {
      const rows=kind==='cobble'?10:kind==='slate'?10:6, cols=kind==='cobble'?9:kind==='slate'?7:4;
      const h=s/rows,w=s/cols;
      for(let j=-1;j<=rows;j++)for(let i=-1;i<=cols;i++) {
        const x=i*w+(j%2)*w*.5+range(1,3),y=j*h+range(1,3),v=range(-16,18);
        c.fillStyle=kind==='slate'?color(67+v,78+v,83+v):kind==='cobble'?color(137+v,132+v,117+v):color(154+v,148+v,130+v);
        c.beginPath();c.roundRect(x,y,w-range(3,7),h-range(3,7),kind==='slate'?2:range(4,8));c.fill();
        c.strokeStyle='rgba(239,221,181,.18)';c.lineWidth=2;c.beginPath();c.moveTo(x+5,y+3);c.lineTo(x+w-7,y+3);c.stroke();
        c.strokeStyle='rgba(24,24,21,.3)';c.lineWidth=2;c.beginPath();c.moveTo(x+w-4,y+5);c.lineTo(x+w-4,y+h-4);c.lineTo(x+6,y+h-4);c.stroke();
      }
    }
    if(kind==='wood'){
      for(let i=0;i<70;i++) {const x=range(0,s);c.strokeStyle=color(range(48,110),range(38,75),range(25,53),.5);c.lineWidth=range(.4,3);c.beginPath();c.moveTo(x,0);c.bezierCurveTo(x+range(-8,8),s*.3,x+range(-12,12),s*.7,x+range(-4,4),s);c.stroke();}
      for(let i=0;i<6;i++){const x=range(0,s),y=range(0,s);c.strokeStyle='#44362688';c.lineWidth=2;for(let j=0;j<4;j++){c.beginPath();c.ellipse(x,y,3+j*3,8+j*9,.03,0,Math.PI*2);c.stroke();}}
    }
    const n=kind==='grass'?27000:kind==='plaster'?18000:9000;
    for(let i=0;i<n;i++) {const v=rand(),x=range(0,s),y=range(0,s);c.fillStyle=v<.5?'rgba(16,22,16,.06)':'rgba(240,231,199,.08)';c.fillRect(x,y,range(.5,2.5),range(.5,2.5));}
    if(kind==='grass')for(let i=0;i<4800;i++){c.strokeStyle=rand()<.5?'#4b5b3277':'#9e9b5a66';c.lineWidth=range(.5,1.2);const x=range(0,s),y=range(0,s);c.beginPath();c.moveTo(x,y);c.lineTo(x+range(-3,3),y-range(2,7));c.stroke();}
    const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textures.push(t);return t;
  }
  function mat(opts){const m=new THREE.MeshStandardMaterial(opts);materials.push(m);return m;}
  const stoneMap=texture('stone'), woodMap=texture('wood'), slateMap=texture('slate'), plasterMap=texture('plaster'), cobbleMap=texture('cobble'), groundMap=texture('grass');
  const stone=mat({map:stoneMap,bumpMap:stoneMap,bumpScale:.07,roughness:.94,color:'#b2ad9e'});
  const stoneDark=mat({map:stoneMap,bumpMap:stoneMap,bumpScale:.065,roughness:.94,color:'#747567'});
  const plaster=mat({map:plasterMap,bumpMap:plasterMap,bumpScale:.035,roughness:1,color:'#c8bca2'});
  const wood=mat({map:woodMap,bumpMap:woodMap,bumpScale:.055,roughness:.9,color:'#796a54'});
  const woodDark=mat({map:woodMap,bumpMap:woodMap,bumpScale:.04,roughness:.92,color:'#514235'});
  const roofMat=mat({map:slateMap,bumpMap:slateMap,bumpScale:.06,roughness:.8,color:'#9da9ac'});
  const iron=mat({color:'#363e3a',roughness:.48,metalness:.7});
  const brass=mat({color:'#bb9454',roughness:.36,metalness:.65});
  const windowMat=mat({color:'#e1bd73',emissive:'#c78439',emissiveIntensity:.5,roughness:.45});
  const banner=mat({color:'#294959',roughness:1,side:THREE.DoubleSide});
  const burgundy=mat({color:'#783b32',roughness:1,side:THREE.DoubleSide});
  const pathMat=mat({map:cobbleMap,bumpMap:cobbleMap,bumpScale:.09,roughness:.98,color:'#b9b2a0'});
  const groundMat=mat({map:groundMap,bumpMap:groundMap,bumpScale:.045,roughness:1,color:'#b9b28b',vertexColors:true});
  const darkMat=mat({color:'#171e1b',roughness:1});
  const matrix=new THREE.Matrix4(), q=new THREE.Quaternion(), eul=new THREE.Euler(), v=new THREE.Vector3();
  const unit=new THREE.Vector3(1,1,1);
  function addGeo(geom,material,x=0,y=0,z=0,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1) {
    let g=geom.index?geom.toNonIndexed():geom.clone();
    eul.set(rx,ry,rz);q.setFromEuler(eul);matrix.compose(v.set(x,y,z),q,new THREE.Vector3(sx,sy,sz));g.applyMatrix4(matrix);
    if(!g.attributes.uv)g.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(g.attributes.position.count*2),2));
    if(!batches.has(material))batches.set(material,[]);batches.get(material).push(g);geom.dispose();return g;
  }
  function physicalUV(g,scale=1){const p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv;for(let i=0;i<p.count;i++){const ax=Math.abs(n.getX(i)),ay=Math.abs(n.getY(i)),az=Math.abs(n.getZ(i));if(ay>ax&&ay>az)u.setXY(i,p.getX(i)*scale,p.getZ(i)*scale);else if(ax>az)u.setXY(i,p.getZ(i)*scale,p.getY(i)*scale);else u.setXY(i,p.getX(i)*scale,p.getY(i)*scale);}return g;}
  function box(x,y,z,w,h,d,m=wood,ry=0,rz=0,rx=0){return addGeo(physicalUV(new THREE.BoxGeometry(w,h,d),.55),m,x,y,z,rx,ry,rz);}
  function cylinder(x,y,z,top,bottom,h,m=wood,segments=10,rx=0,ry=0,rz=0){return addGeo(new THREE.CylinderGeometry(top,bottom,h,segments),m,x,y,z,rx,ry,rz);}
  function beam(a,b,width=.15,material=wood){const dir=new THREE.Vector3().subVectors(b,a),mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5);const g=physicalUV(new THREE.BoxGeometry(width,dir.length(),width),.6);q.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());matrix.compose(mid,q,unit);g.applyMatrix4(matrix);if(!batches.has(material))batches.set(material,[]);batches.get(material).push(g);}
  function torus(x,y,z,r,t,m=stone,rx=Math.PI/2,ry=0){return addGeo(new THREE.TorusGeometry(r,t,8,32),m,x,y,z,rx,ry);}
  function cameraBox(x,y,z,w,h,d){cameraColliders.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,minY:y-h/2,maxY:y+h/2});}
  function collider(x,z,w,d,height=6){const bounds={minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,minY:0,maxY:height};colliders.push(bounds);cameraColliders.push({...bounds});}
  function path(x,z,w,d){const g=new THREE.PlaneGeometry(w,d);const p=g.attributes.position,u=g.attributes.uv;for(let i=0;i<p.count;i++)u.setXY(i,p.getX(i)*.7,p.getY(i)*.7);addGeo(g,pathMat,x,.022,z,-Math.PI/2);}
  // The playable land remains level; distant slopes are decorative and outside its bounds.
  const terrain=new THREE.PlaneGeometry(310,310,80,80), tp=terrain.attributes.position, tc=[];
  for(let i=0;i<tp.count;i++){const x=tp.getX(i),z=-tp.getY(i),distance=Math.hypot(x,z);const h=distance>104?(Math.sin(x*.057)*Math.cos(z*.043)+.8)*Math.min(8,(distance-104)*.17):0;tp.setZ(i,h);const n=.88+.11*Math.sin(x*.095+z*.064)+.055*Math.sin(x*.27-z*.2);tc.push(n*.91,n,n*.78);terrain.attributes.uv.setXY(i,x*.19,z*.19);}
  terrain.setAttribute('color',new THREE.Float32BufferAttribute(tc,3));terrain.computeVertexNormals();const land=new THREE.Mesh(terrain,groundMat);land.rotation.x=-Math.PI/2;land.receiveShadow=true;group.add(land);
  path(0,-26,7.4,154);path(-9,15,83,7);path(-15,-3,7,23);path(9,12,24,7);path(0,19,17,19);path(-35,16.5,13,8);path(3,32,14,8);
  // Shallow paving edging and patches interrupt the mathematically straight road borders.
  for(let i=0;i<70;i++){const z=-93+i*1.8;for(const s of [-1,1]){if(z>10&&z<20)continue;box(s*3.95,.07,z,.32,.14,1.45,stoneDark,range(-.03,.03));}}
  function gable(x,z,w,d,base,top,material){
    const pts=[-w/2,base,-d/2,0,top,-d/2,w/2,base,-d/2,-w/2,base,d/2,w/2,base,d/2,0,top,d/2];
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));g.computeVertexNormals();g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,w*.5,0,w*.25,(top-base)*.5,0,0,w*.25,(top-base)*.5,w*.5,0],2));addGeo(g,material,x,0,z);
  }
  function sign(title,x,y,z,w=3.1){
    cameraBox(x,y,z+.006,w,.78,.142);for(const side of [-1,1])cameraBox(x+side*w*.33,y+.6,z,.045,.445,.045);
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;const c=canvas.getContext('2d');c.fillStyle='#302c23';c.fillRect(0,0,512,128);c.strokeStyle='#a38a53';c.lineWidth=4;c.strokeRect(8,8,496,112);c.fillStyle='#e0cf9d';c.textAlign='center';c.textBaseline='middle';c.font='600 47px serif';c.fillText(title,256,67,470);
    const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;textures.push(t);const m=mat({map:t,roughness:1});box(x,y,z,w,.78,.13,woodDark);addGeo(new THREE.PlaneGeometry(w-.05,.73),m,x,y,z+.076);beam(new THREE.Vector3(x-w*.33,y+.4,z),new THREE.Vector3(x-w*.33,y+.8,z),.045,iron);beam(new THREE.Vector3(x+w*.33,y+.4,z),new THREE.Vector3(x+w*.33,y+.8,z),.045,iron);
  }
  function lantern(x,y,z){
    cameraBox(x,y+.314,z,.38,1.428,.38);
    box(x,y+.42,z,.38,.12,.38,iron);box(x,y-.36,z,.3,.08,.3,iron);box(x,y,z,.24,.65,.24,windowMat);
    for(const sx of [-1,1])for(const sz of [-1,1])box(x+sx*.15,y,z+sz*.15,.035,.7,.035,iron);cylinder(x,y+.68,z,.025,.025,.45,iron,6);torus(x,y+.93,z,.08,.018,iron,0);
  }
  function shutterWindow(x,y,z,w=.8,h=1.25){
    cameraBox(x,y-.04,z+.095,w+.7,h+.3,.37);
    box(x,y,z,w+.24,h+.22,.18,woodDark);box(x,y,z+.11,w,h,.025,windowMat);
    box(x,y,z+.14,.055,h,.07,iron);box(x,y,z+.14,w,.055,.07,iron);
    for(const sx of [-1,1]){box(x+sx*(w*.5+.22),y,z+.04,.26,h+.14,.1,wood);box(x+sx*(w*.5+.22),y-.35,z+.11,.25,.055,.03,iron);box(x+sx*(w*.5+.22),y+.35,z+.11,.25,.055,.03,iron);}
    box(x,y-h/2-.13,z+.11,w+.65,.12,.34,stone);
  }
  function building(x,z,w,d,title,kind){
    const front=z+d/2,h=kind==='guild'?5.4:kind==='tavern'?4.7:3.4,roofHeight=w*.31;
    box(x,.24,z,w+.45,.48,d+.45,stoneDark);box(x,h/2+.35,z,w,h,d,plaster);
    box(x,.8,z,w+.04,.95,d+.04,stone);box(x,h+.38,z,w+.36,.23,d+.35,woodDark);
    const top=h+.48;gable(x,z,w,d,top,top+roofHeight,plaster);
    const slope=Math.atan2(roofHeight,w/2),slant=Math.hypot(w/2+.55,roofHeight+.22);
    for(const side of [-1,1])box(x+side*(w*.25+.1),top+roofHeight*.5+.05,z,slant,.18,d+1.2,roofMat,0,-side*slope);
    box(x,top+roofHeight+.1,z,.24,.2,d+1.3,woodDark);
    // Structural posts, lintels and diagonal braces have real silhouette and cast shadows.
    for(const side of [-1,1]){
      const zz=z+side*(d/2+.07);
      for(let i=0;i<=4;i++)box(x-w/2+i*w/4,h/2+.4,zz,.18,h+.22,.18,woodDark);
      box(x,2.7,zz,w,.18,.18,woodDark);
      for(let i=0;i<4;i++){const xa=x-w/2+i*w/4+.1,xb=xa+w/4-.2;beam(new THREE.Vector3(xa,2.82,zz+.02),new THREE.Vector3(xb,h+.25,zz+.02),.13,woodDark);}
      beam(new THREE.Vector3(x-w/2,top,zz),new THREE.Vector3(x,top+roofHeight,zz),.16,woodDark);beam(new THREE.Vector3(x+w/2,top,zz),new THREE.Vector3(x,top+roofHeight,zz),.16,woodDark);
      box(x,top+roofHeight*.45,zz,.18,roofHeight*.9,.16,woodDark);
    }
    for(const side of [-1,1]){box(x+side*(w/2+.07),h/2+.4,z,.18,h+.2,.18,woodDark);box(x+side*(w/2+.07),2.7,z,.18,.16,d,woodDark);}
    const doorWidth=kind==='guild'?1.8:1.4;
    cameraBox(x,1.44,front+.1,doorWidth+.36,2.55,.23);cameraBox(x,1.35,front+.3,doorWidth,2.3,.17);cameraBox(x+.4,1.38,front+.43,.18,.18,.036);
    cameraBox(x,.1,front+.52,doorWidth+.8,.2,.9);cameraBox(x,.025,front+1.02,doorWidth+1.2,.1,.5);
    box(x,1.44,front+.1,doorWidth+.36,2.55,.23,stoneDark);box(x,1.35,front+.25,doorWidth,2.3,.12,woodDark);
    for(let i=0;i<6;i++)box(x-doorWidth/2+(i+.5)*doorWidth/6,1.35,front+.32,.018,2.25,.03,iron);
    box(x,.7,front+.35,doorWidth,.09,.07,iron);box(x,2,front+.35,doorWidth,.09,.07,iron);torus(x+.4,1.38,front+.43,.072,.018,brass,0);
    box(x,.1,front+.52,doorWidth+.8,.2,.9,stone);box(x,.025,front+1.02,doorWidth+1.2,.1,.5,stoneDark);
    for(const side of [-1,1]){shutterWindow(x+side*w*.31,1.8,front+.15,.9,1.2);if(h>4)shutterWindow(x+side*w*.28,3.87,front+.15,.76,1.1);lantern(x+side*(doorWidth*.5+.6),2.05,front+.47);}
    sign(title,x,3.04,front+.55,kind==='guild'?3.65:3.2);
    // A brick chimney, cap and pot make each roof readable at distance.
    box(x+w*.27,top+roofHeight*.85,z-d*.21,.7,2.8,.8,stoneDark);box(x+w*.27,top+roofHeight*.85+1.43,z-d*.21,.9,.18,1,stone);cylinder(x+w*.27,top+roofHeight*.85+1.72,z-d*.21,.22,.27,.5,stoneDark,8);
    if(kind==='guild'){
      for(const side of [-1,1]){const flag=new THREE.Mesh(new THREE.PlaneGeometry(.7,2,4,8),banner);flag.position.set(x+side*(w*.5+.55),3.5,front+.5);group.add(flag);animated.push({mesh:flag,base:flag.geometry.attributes.position.array.slice(),phase:rand()*7});beam(new THREE.Vector3(flag.position.x,4.55,front+.3),new THREE.Vector3(flag.position.x,4.55,front+1.1),.06,iron);addGeo(new THREE.RingGeometry(.17,.2,24),brass,flag.position.x,3.7,front+.51);}
    }
    if(kind==='merchant'){
      // Separate canopy/counter volumes preserve the open space beneath the awning.
      cameraBox(x,2.8,front+1.25,w*.78,2.5*Math.cos(Math.PI*.38),2.5*Math.sin(Math.PI*.38));
      for(const side of [-1,1])cameraBox(x+side*w*.38,1.45,front+2.35,.16,2.9,.16);
      cameraBox(x,1.02,front+1.2,w*.65,.18,1);cameraBox(x,.52,front+1.2,w*.65,.92,.75);
      const awning=new THREE.PlaneGeometry(w*.78,2.5);addGeo(awning,burgundy,x,2.8,front+1.25,-Math.PI*.38);for(const side of [-1,1])cylinder(x+side*w*.38,1.45,front+2.35,.06,.08,2.9,woodDark,6);box(x,1.02,front+1.2,w*.65,.18,1,wood);box(x,.52,front+1.2,w*.65,.92,.75,woodDark);
    }
    if(kind==='smith'){
      box(x+w*.5+1.7,.5,z+1,2.1,1,1.8,stoneDark);box(x+w*.5+1.7,1.1,z+1,1.5,.25,1.25,iron);box(x+w*.5+1.7,1.35,z+1,.65,.35,.85,iron);cylinder(x+w*.5+1.7,.3,z+3,.5,.6,.6,wood,10);collider(x+w*.5+1.7,z+1,2.2,1.9,1.7);
    }
    collider(x,z,w+.35,d+.4,h+.65+roofHeight);interactables.push({x,z:front+2.1,title,kind});
  }
  building(-15,-12,13,10,'冒险者公会','guild');building(-35,10,11,9,'旅人酒馆','tavern');building(17,5,9,8,'铁匠铺','smith');building(3,25,10,8,'旅行商人','merchant');
  // A few rooflines beyond the functional streets give the town a sense of depth.
  for(const [x,z,w,d] of [[24,-13,7,7],[-33,-16,8,8],[21,30,7,7],[-24,29,6,7]]){
    box(x,1.55,z,w,3.1,d,plaster);box(x,.3,z,w+.15,.6,d+.15,stoneDark);gable(x,z,w,d,3.1,5.6,plaster);const slope=Math.atan2(2.5,w/2);for(const side of [-1,1]){box(x+side*w*.25,4.35,z,Math.hypot(w/2,2.5)+.5,.17,d+1,roofMat,0,-side*slope);box(x+side*w*.48,1.6,z+d/2+.05,.15,3.2,.15,woodDark);shutterWindow(x+side*w*.25,1.8,z+d/2+.1,.65,1);}
    box(x,1.25,z+d/2+.1,1.1,2.5,.16,woodDark);collider(x,z,w,d,5.8);
  }
  // Market-town well and furnishings, all static parts are merged into material batches.
  const wx=-9,wz=10;torus(wx,.28,wz,1.3,.24,stoneDark);torus(wx,.72,wz,1.25,.23,stone);cylinder(wx,.4,wz,1.1,1.1,.1,darkMat,32);
  for(const side of [-1,1])box(wx+side*1.23,1.75,wz,.19,2.2,.19,woodDark);
  beam(new THREE.Vector3(wx-1.4,2.85,wz),new THREE.Vector3(wx+1.4,2.85,wz),.2,woodDark);cylinder(wx,2.7,wz,.12,.12,.8,wood,10,0,0,Math.PI/2);cylinder(wx,1.91,wz,.022,.022,1.5,woodDark,6);cylinder(wx,1.12,wz,.17,.13,.3,iron,10);collider(wx,wz,2.9,2.9,3.2);
  function barrel(x,z,s=1){cylinder(x,.48*s,z,.35*s,.38*s,.96*s,wood,12);for(const y of [.12,.45,.82])torus(x,y*s,z,.365*s,.028*s,iron);addGeo(new THREE.CircleGeometry(.34*s,12),wood,x,.967*s,z,-Math.PI/2);}
  for(const [x,z,s] of [[-30,15,.95],[-31,15.7,.8],[-39,15.5,1.2],[7.8,31.4,1],[-20,-5.7,.8],[12,10,.9],[12.8,10.3,.7]])barrel(x,z,s);
  for(const [x,z] of [[-31,18.5],[-26,10],[10,17],[-13,-5]]){box(x,.62,z,2.3,.15,.65,wood);for(const s of [-1,1])box(x+s*.85,.3,z,.14,.6,.5,woodDark);}
  for(const [x,z] of [[-4,3],[5,-14],[-24,16],[8,22],[-5,-27]]){cylinder(x,1.9,z,.07,.13,3.8,woodDark,8);beam(new THREE.Vector3(x,3.6,z),new THREE.Vector3(x+.65,3.6,z),.1,iron);lantern(x+.55,3.1,z);}
  // A weathered gate frames the route to the northern woods.
  for(const s of [-1,1]){box(s*5.4,2.3,-29,.55,4.6,.55,woodDark);box(s*5.4,.65,-29,1.2,1.3,1.2,stoneDark);}
  beam(new THREE.Vector3(-5.8,4.5,-29),new THREE.Vector3(5.8,4.5,-29),.5,woodDark);sign('幽影林地',0,4.05,-28.7,3.4);
  for(const s of [-1,1])for(let i=0;i<17;i++){const x=s*(7+i*1.65);cylinder(x,1.25,-30,.15,.2,2.5,wood,7);if(i<16){box(x+s*.8,1.9,-30,1.7,.13,.13,woodDark);box(x+s*.8,.8,-30,1.7,.13,.13,woodDark);}}
  // Irregular transparent leaf clusters are real 3D crossed planes, not full-tree billboards.
  const leafCanvas=document.createElement('canvas');leafCanvas.width=leafCanvas.height=128;const lc=leafCanvas.getContext('2d');
  for(let i=0;i<155;i++){const a=range(0,Math.PI*2),r=Math.sqrt(rand())*53,x=64+Math.cos(a)*r,y=64+Math.sin(a)*r;lc.fillStyle=color(range(48,82),range(74,105),range(35,61));lc.beginPath();lc.ellipse(x,y,range(3,7),range(1.6,3.8),a,0,Math.PI*2);lc.fill();}
  const leafTex=new THREE.CanvasTexture(leafCanvas);leafTex.colorSpace=THREE.SRGBColorSpace;textures.push(leafTex);
  const leafMat=mat({map:leafTex,alphaTest:.45,side:THREE.DoubleSide,roughness:1,color:'#b7b887'});
  const treeBark=mat({map:woodMap,bumpMap:woodMap,bumpScale:.09,color:'#7b7464',roughness:1});
  function foliage(x,y,z,w,h,seedRot=0){for(let i=0;i<3;i++)addGeo(new THREE.PlaneGeometry(w,h),leafMat,x,y,z,range(-.3,.3),seedRot+i*Math.PI/3,range(-.16,.16));}
  function tree(x,z,s=1){const height=range(7,10)*s,lean=range(-.22,.22);cylinder(x,height*.36,z,.13*s,.31*s,height*.72,treeBark,8,lean*.2,0,lean*.15);for(let i=0;i<7;i++){const a=i*2.4+rand()*.4,r=range(.8,1.7)*s,cy=height*(.54+i*.055),cx=x+Math.sin(a)*r,cz=z+Math.cos(a)*r;beam(new THREE.Vector3(x,height*.35+i*.36,z),new THREE.Vector3(cx,cy,cz),.09*s,treeBark);foliage(cx,cy,cz,range(2.5,3.6)*s,range(2,2.8)*s,a);}foliage(x,height*.94,z,2.7*s,2.5*s);}
  const treeLocations=[];
  for(let i=0;i<185;i++){let x=range(-126,126),z=range(-126,126);if(Math.abs(x)<46&&z>-37&&z<44)continue;if(Math.abs(x)<6&&z>-95)continue;if(Math.hypot(x+50,z+45)<13)continue;treeLocations.push([x,z,range(.7,1.35)]);}
  for(const xyz of [[-26,1,1],[-47,22,1.25],[34,20,.85],[34,-2,1],[-21,38,.9],[-11,35,.85],[12,-24,.8]])treeLocations.push(xyz);
  treeLocations.forEach(x=>tree(...x));
  // Mottled boulders and irregular ruins provide cover and scale beyond the town.
  const rockMat=mat({map:stoneMap,bumpMap:stoneMap,bumpScale:.09,roughness:1,color:'#7c8177'});
  for(let i=0;i<80;i++){const x=range(-105,105),z=range(-110,100);if(Math.abs(x)<43&&z>-35&&z<42)continue;const r=range(.3,1.65);const g=new THREE.IcosahedronGeometry(r,1);const p=g.attributes.position;for(let j=0;j<p.count;j++){const f=.86+.2*Math.sin(p.getX(j)*5+p.getY(j)*7+p.getZ(j)*9);p.setXYZ(j,p.getX(j)*f,p.getY(j)*f*.62,p.getZ(j)*f);}g.computeVertexNormals();addGeo(g,rockMat,x,r*.25,z,range(0,.5),range(0,6),range(0,.3));}
  // Low grass tufts are instanced; no per-blade objects, no alpha-blended overdraw.
  const grassVertices=[];for(let k=0;k<4;k++){const a=k*2.4,dx=Math.sin(a)*.1,dz=Math.cos(a)*.1,h=.25+rand()*.2;grassVertices.push(dx-.025,0,dz,dx+.025,0,dz,dx+.1,h,dz+.04);}
  const grassGeo=new THREE.BufferGeometry();grassGeo.setAttribute('position',new THREE.Float32BufferAttribute(grassVertices,3));grassGeo.computeVertexNormals();
  const grassBlade=mat({color:'#7a814d',roughness:1,side:THREE.DoubleSide});const grass=new THREE.InstancedMesh(grassGeo,grassBlade,4500);grass.name='InstancedMeadow';let grassCount=0;
  for(let i=0;i<10000&&grassCount<4500;i++){const x=range(-95,95),z=range(-100,95);if(Math.abs(x)<4.7||Math.abs(z-15)<4.3&&x>-52&&x<34)continue;if(colliders.some(o=>x>o.minX-1&&x<o.maxX+1&&z>o.minZ-1&&z<o.maxZ+1))continue;if(Math.abs(x)<10&&z>5&&z<36)continue;const s=range(.6,1.5);q.setFromAxisAngle(new THREE.Vector3(0,1,0),range(0,6.28));matrix.compose(new THREE.Vector3(x,.025,z),q,new THREE.Vector3(s,s,s));grass.setMatrixAt(grassCount++,matrix);}grass.count=grassCount;grass.instanceMatrix.needsUpdate=true;grass.receiveShadow=true;group.add(grass);
  // Distant mountain rings have vertex color and irregular ridges, never intersecting play space.
  const mountainMat=mat({vertexColors:true,roughness:1,color:'#a6b3ad'});
  const mg=new THREE.BufferGeometry(),mp=[],mc=[];
  for(let ring=0;ring<2;ring++)for(let i=0;i<80;i++){
    const a=i/80*Math.PI*2,b=(i+1)/80*Math.PI*2,r=145+ring*42,ra=r+range(-4,4),rb=r+range(-4,4),ha=16+Math.sin(i*1.7+ring)*8+Math.sin(i*.53)*13+ring*10,hb=16+Math.sin((i+1)*1.7+ring)*8+Math.sin((i+1)*.53)*13+ring*10;
    const verts=[[Math.sin(a)*ra,-2,Math.cos(a)*ra],[Math.sin(b)*rb,-2,Math.cos(b)*rb],[Math.sin(b)*(rb+8),hb,Math.cos(b)*(rb+8)],[Math.sin(a)*ra,-2,Math.cos(a)*ra],[Math.sin(b)*(rb+8),hb,Math.cos(b)*(rb+8)],[Math.sin(a)*(ra+8),ha,Math.cos(a)*(ra+8)]];
    verts.forEach((p,j)=>{mp.push(...p);const high=j===2||j===4||j===5,f=.65+ring*.14+(high?.05:0);mc.push(f*.7,f*.82,f*.84);});
  }
  mg.setAttribute('position',new THREE.Float32BufferAttribute(mp,3));mg.setAttribute('color',new THREE.Float32BufferAttribute(mc,3));mg.computeVertexNormals();const mountains=new THREE.Mesh(mg,mountainMat);group.add(mountains);
  // A gradual horizon, a soft sun and thin clouds replace the old flat background color.
  const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color('#7295a8')},horizon:{value:new THREE.Color('#c3ccb9')}},vertexShader:'varying vec3 vWorld;void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 vWorld;uniform vec3 top;uniform vec3 horizon;void main(){vec3 d=normalize(vWorld);float h=smoothstep(-.05,.65,d.y);vec3 c=mix(horizon,top,h);float s=pow(max(0.,dot(d,normalize(vec3(-.45,.66,.42)))),220.);c+=vec3(1.,.71,.36)*s*.6;float cloud=sin(d.x*20.+sin(d.z*9.))*sin(d.z*24.+d.x*7.);float veil=smoothstep(.24,.62,d.y)*(1.-smoothstep(.65,.94,d.y))*smoothstep(.45,.95,cloud)*.15;c=mix(c,vec3(.9,.91,.84),veil);gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>}' });
  const sky=new THREE.Mesh(new THREE.SphereGeometry(285,32,16),skyMat);sky.renderOrder=-100;sky.frustumCulled=false;group.add(sky);materials.push(skyMat);
  // Consolidate static triangles by material (normally fewer than 30 draw calls).
  const batchMeshes=[];
  for(const [material,geos] of batches){let count=geos.reduce((n,g)=>n+g.attributes.position.count,0),pos=new Float32Array(count*3),normal=new Float32Array(count*3),uv=new Float32Array(count*2),offset=0;
    for(const g of geos){pos.set(g.attributes.position.array,offset*3);normal.set(g.attributes.normal.array,offset*3);uv.set(g.attributes.uv.array,offset*2);offset+=g.attributes.position.count;g.dispose();}
    const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.BufferAttribute(pos,3));geom.setAttribute('normal',new THREE.BufferAttribute(normal,3));geom.setAttribute('uv',new THREE.BufferAttribute(uv,2));geom.computeBoundingSphere();const mesh=new THREE.Mesh(geom,material);mesh.castShadow=material!==windowMat;mesh.receiveShadow=true;mesh.name='WorldBatch';group.add(mesh);batchMeshes.push(mesh);
  }
  let quality='high';
  return {
    group,colliders,cameraColliders,interactables,
    update(dt,time=0){for(const a of animated){const p=a.mesh.geometry.attributes.position;for(let i=0;i<p.count;i++){const y=a.base[i*3+1],weight=(1-y)*.5;p.setZ(i,a.base[i*3+2]+Math.sin(time*2.1+y*3+a.phase)*.07*weight);}p.needsUpdate=true;a.mesh.geometry.computeVertexNormals();}},
    setQuality(preset){quality=preset;grass.visible=preset!=='low';grass.count=preset==='balanced'?Math.min(1800,grassCount):grassCount;for(const m of batchMeshes)m.castShadow=preset!=='low'&&m.material!==windowMat&&(preset==='high'||m.material!==leafMat);},
    diagnostics(){return{batches:batchMeshes.length,trees:treeLocations.length,grass:grass.visible?grass.count:0,colliders:colliders.length,cameraColliders:cameraColliders.length,quality};},
    dispose(){scene.remove(group);group.traverse(o=>o.geometry?.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}
  };
}
