const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const root=process.cwd();
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png'};
const server=http.createServer((request,response)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch(_){response.writeHead(400).end();return;}
  let file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)&&file!==root){response.writeHead(403).end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){response.writeHead(404).end('Not found');return;}
  response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':fs.statSync(file).size});
  fs.createReadStream(file).pipe(response);
});
server.listen(4173,'127.0.0.1',()=>{
  const child=spawn(process.execPath,[path.join(__dirname,'smoke.cjs')],{stdio:'inherit',env:{...process.env,GAME_URL:process.env.GAME_URL||'http://127.0.0.1:4173/games/ashen-age/'}});
  child.on('exit',code=>server.close(()=>{process.exitCode=code??1;}));
  child.on('error',error=>{console.error(error);server.close(()=>{process.exitCode=1;});});
});
