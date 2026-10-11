'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const p=require('../data/project-outline.json');
const sample=p.starterExample;
assert(sample && sample.files.length===3,'three clearly synthetic starter files are supplied');
const csv=source=>{const lines=source.trim().split(/\r?\n/),keys=lines.shift().split(',');return lines.map(line=>Object.fromEntries(line.split(',').map((value,i)=>[keys[i],value])))};
const file=name=>sample.files.find(file=>file.path===name)?.content;
const feedback=csv(file('input/feedback.csv')),labels=csv(file('notes/manual_labels.csv'));
assert.equal(feedback.length,8);assert.equal(new Set(feedback.map(x=>x.feedback_id)).size,8);
const required=['feedback_id','created_at','product_version','feedback_text'];
assert.deepEqual(Object.keys(feedback[0]),required);assert(feedback.every(row=>required.every(k=>row[k])));
const labelById=new Map(labels.map(x=>[x.feedback_id,x.issue_label]));
assert.equal(labelById.size,8);assert(feedback.every(row=>labelById.has(row.feedback_id)));
function counts(rows) {const unique=[...new Map(rows.map(row=>[row.feedback_id,row])).values()];const result={};for(const row of unique){const label=labelById.get(row.feedback_id);result[label]=(result[label]||0)+1}return result}
assert.deepEqual(counts(feedback),{'登录验证码未收到':3,'导出表格空白':2,'提醒重复':1,'搜索未找到':1,'上传未完成':1});
const v21=feedback.filter(row=>row.product_version==='2.1');assert.equal(v21.length,6);
assert.deepEqual(counts(v21),{'登录验证码未收到':2,'导出表格空白':2,'提醒重复':1,'上传未完成':1});
assert.deepEqual(counts([...feedback,feedback[0]]),counts(feedback),'duplicate F001 does not change deduplicated evidence counts');
assert(/虚构/.test(file('input/product_guide.md')));
assert(/人工/.test(sample.codingPrompt)&&/不能|不在/.test(sample.codingPrompt),'hand labels are not presented as autonomous classification');
assert(/模型.*读取|模型.*答案|评测/.test(sample.codingPrompt),'manual development answers are excluded from independent model evaluation');
assert(/人数/.test(sample.expected),'sample expressly distinguishes feedback records from people');
assert(/不.*优先级|频率/.test(JSON.stringify(p.countingRules)),'frequency is not conflated with product priority');
assert(/超过/.test(JSON.stringify(p.countingRules)),'multi-label totals disclose possible overlap');
assert(/不是.*Agent软件/.test(sample.note),'starter is scoped as example data, not a finished program');
for(const row of sample.files) {const actual=path.join(__dirname,'../data/work-agent-starter',row.path);assert.equal(fs.readFileSync(actual,'utf8'),row.content,row.path+': downloadable starter source exactly matches visible example');}
console.log('PASS synthetic starter: exact8 unique rows, 2.1 subset6, hand-checked issue counts and dedup result, visible/downloadable file parity, manual-label boundary, no fabricated people/priority claims.');
