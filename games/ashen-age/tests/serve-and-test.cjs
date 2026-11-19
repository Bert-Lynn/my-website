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
server.listen(4173,'127.0.0.1',async()=>{
  const deploymentSmoke=process.env.QA_DEPLOYMENT_SMOKE==='1';
  const requestedSuite=deploymentSmoke?null:(process.env.QA_SUITE||null);
  if(requestedSuite&&!['smoke.cjs','combat.cjs'].includes(requestedSuite)){
    console.error('Invalid QA_SUITE: expected smoke.cjs or combat.cjs');
    server.close(()=>{process.exitCode=1;});return;
  }
  const suites=deploymentSmoke?['live.cjs']:requestedSuite?[requestedSuite]:['smoke.cjs','combat.cjs'];
  const budgetMinutes=deploymentSmoke?3:15;
  const budgetMs=budgetMinutes*60*1000,started=Date.now(),deadline=started+budgetMs;
  const output=path.resolve(process.env.QA_OUTPUT||'ashen-age-qa');
  fs.mkdirSync(output,{recursive:true});
  const summary={mode:deploymentSmoke?'public-deployment-smoke':requestedSuite?'targeted-predeployment':'full-predeployment',requestedSuite,budgetMs,startedAt:new Date(started).toISOString(),suites:[]};
  const run=suite=>new Promise(resolve=>{
    const remaining=deadline-Date.now();
    if(remaining<=2000){resolve({suite,passed:false,status:'not-run-time-budget-exhausted'});return;}
    const suiteStarted=Date.now();
    console.log('START_SUITE '+suite+' remainingBudgetMs='+remaining);
    const defaultURL=deploymentSmoke?'https://bert-lynn.github.io/my-website/games/ashen-age/':'http://127.0.0.1:4173/games/ashen-age/';
    const child=spawn(process.execPath,[path.join(__dirname,suite)],{stdio:'inherit',env:{...process.env,QA_OUTPUT:output,GAME_URL:process.env.GAME_URL||defaultURL}});
    let timedOut=false,forceKill=null,finished=false;
    const finish=result=>{
      if(finished)return;finished=true;clearTimeout(timer);if(forceKill)clearTimeout(forceKill);
      resolve({suite,...result,elapsedMs:Date.now()-suiteStarted});
    };
    const timer=setTimeout(()=>{
      timedOut=true;console.error('SUITE_TIMEOUT '+suite+' exceeded the shared '+budgetMinutes+'-minute test budget');
      child.kill('SIGTERM');forceKill=setTimeout(()=>child.kill('SIGKILL'),2000);
    },remaining-2000);
    child.on('close',(code,signal)=>finish({passed:!timedOut&&code===0,status:timedOut?'timeout':code===0?'passed':'failed',exitCode:code,signal}));
    child.on('error',error=>finish({passed:false,status:'spawn-error',error:String(error)}));
  });
  try{
    // Both suites use real input; failures remain failures even if the other passes.
    for(const suite of suites)summary.suites.push(await run(suite));
  }catch(error){summary.error=String(error);}
  summary.elapsedMs=Date.now()-started;
  summary.passed=!summary.error&&summary.suites.length===suites.length&&summary.suites.every(suite=>suite.passed);
  fs.writeFileSync(path.join(output,'suite-summary.json'),JSON.stringify(summary,null,2));
  console.log('SUITE_SUMMARY '+JSON.stringify(summary));
  server.close(()=>{process.exitCode=summary.passed?0:1;});
});
