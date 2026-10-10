const tasks = [
  {
    "id": "sep-python",
    "month": "2026.10",
    "category": "learning",
    "stream": "courses",
    "title": "Python 核心基础（AI辅助，验收优先）",
    "detail": "变量、容器、函数、文件、异常、模块；读懂、测试、修改AI生成的数据处理代码。已会部分用小测跳过，不要求刷完整长课。零基础结合入门示例，文档用于查缺补漏。",
    "outcome": "能独立写数据处理程序",
    "url": "https://docs.python.org/zh-cn/3/tutorial/",
    "originalMonth": "2026.09"
  },
  {
    "id": "sep-git",
    "month": "2026.10",
    "category": "foundation",
    "stream": "foundation",
    "title": "Git与Linux入门",
    "detail": "选Shell、Git、调试、打包和代码质量章节；Agentic Coding按需穿插。",
    "outcome": "建立第一个规范科研仓库",
    "url": "https://missing.csail.mit.edu/",
    "originalMonth": "2026.09"
  },
  {
    "id": "sep-paper0",
    "month": "2026.10",
    "category": "research",
    "stream": "paper0",
    "title": "现有RI-logit论文继续推进",
    "detail": "不因AI转向中断原有博士成果",
    "outcome": "形成下一版完整修改稿",
    "originalMonth": "2026.09"
  },
  {
    "id": "sep-a-data",
    "month": "2026.10",
    "category": "research",
    "stream": "paperA",
    "title": "论文A数据管线",
    "detail": "明确预测对象、时间切分、特征与泄漏检查",
    "outcome": "可重复生成训练/验证/测试数据",
    "originalMonth": "2026.09"
  },
  {
    "id": "oct-a-base",
    "month": "2026.11",
    "category": "research",
    "stream": "paperA",
    "title": "论文A基线",
    "detail": "历史均值、线性模型、XGBoost等",
    "outcome": "首张可信baseline表",
    "originalMonth": "2026.10"
  },
  {
    "id": "oct-algo",
    "month": "2026.11",
    "category": "learning",
    "stream": "courses",
    "title": "数据结构算法基础",
    "detail": "每周不超过1小时：数组、哈希、栈队列、复杂度；做过的题能讲清，不堆题量。",
    "outcome": "开始持续算法训练",
    "url": "https://www.hello-algo.com/",
    "originalMonth": "2026.10"
  },
  {
    "id": "oct-repo",
    "month": "2026.11",
    "category": "foundation",
    "stream": "foundation",
    "title": "科研代码工程化",
    "detail": "配置、日志、结果目录、可复现实验入口；固定随机种子、依赖、数据版本与最小测试，不把AI生成代码当已验证结果。",
    "outcome": "代码不再依赖手工修改路径",
    "originalMonth": "2026.10"
  },
  {
    "id": "nov-agent-api",
    "month": "2026.11",
    "category": "learning",
    "stream": "agentdemo",
    "title": "LLM API、结构化输出与工具调用",
    "detail": "选一个可用模型提供方；Python/HTTP/JSON、schema校验、超时重试、只读工具。先直接API，再用框架。",
    "outcome": "20条固定样例及异常测试可重跑；解释并修复AI生成代码；密钥不入库。",
    "url": "https://github.com/microsoft/generative-ai-for-beginners",
    "originalMonth": "2026.11"
  },
  {
    "id": "nov-d2l",
    "month": "2026.12",
    "category": "learning",
    "stream": "courses",
    "title": "PyTorch与深度学习训练",
    "detail": "必修张量、自动求导、训练循环、验证与过拟合；结合论文A做实验，不整套刷完。",
    "outcome": "独立搭建训练循环",
    "url": "https://zh.d2l.ai/",
    "originalMonth": "2026.11"
  },
  {
    "id": "nov-a-models",
    "month": "2026.12",
    "category": "research",
    "stream": "paperA",
    "title": "论文A机器学习/深度学习模型",
    "detail": "XGBoost、MLP、LSTM/TCN及合理时序模型",
    "outcome": "统一实验框架下的模型比较",
    "originalMonth": "2026.11"
  },
  {
    "id": "nov-a-horizon",
    "month": "2026.12",
    "category": "research",
    "stream": "paperA",
    "title": "长预测期退化实验",
    "detail": "比较不同预测期下误差与稳定性",
    "outcome": "形成第一条研究发现",
    "originalMonth": "2026.11"
  },
  {
    "id": "dec-a-shift",
    "month": "2027.01",
    "category": "research",
    "stream": "paperA",
    "title": "跨市场/分布变化实验",
    "detail": "市场异质性、需求冲击、跨时间泛化",
    "outcome": "不止做模型排行榜",
    "originalMonth": "2026.12"
  },
  {
    "id": "dec-air-v01",
    "month": "2027.01",
    "category": "demo",
    "stream": "airdemo",
    "title": "AirDemandLab v0.1",
    "detail": "训练、预测、模型比较、错误分析",
    "outcome": "第一个AI Demo可运行",
    "milestone": true,
    "originalMonth": "2026.12"
  },
  {
    "id": "dec-vision-mini",
    "month": "2027.01",
    "category": "demo",
    "stream": "visiondemo",
    "title": "小型视觉训练Demo",
    "detail": "完成一次分类训练、验证、推理闭环",
    "outcome": "证明自己会完整训练视觉模型",
    "originalMonth": "2026.12"
  },
  {
    "id": "jan-agent-workflow",
    "month": "2027.01",
    "category": "demo",
    "stream": "agentdemo",
    "title": "EnterpriseAgentLab v0.1：可控工作流",
    "detail": "HF Agent课Unit 1+只选一种框架；状态、路由、工具白名单、步数上限、失败恢复、人工审批。用公开/合成工单或文档，不限制航空。",
    "outcome": "查询→证据→建议→模拟审批闭环；超时、拒绝、重复请求、提示注入测试；无真实外部写操作。",
    "url": "https://huggingface.co/learn/agents-course/en/unit0/introduction",
    "originalMonth": "2027.01"
  },
  {
    "id": "jan-seq",
    "month": "2027.02",
    "category": "learning",
    "stream": "courses",
    "title": "RNN/LSTM、注意力与Transformer",
    "detail": "按论文需要选学序列模型，保留注意力与Transformer；理解计算并在自己的实验中验证。",
    "outcome": "能解释并修改时序模型",
    "url": "https://zh.d2l.ai/",
    "originalMonth": "2027.01"
  },
  {
    "id": "jan-a-write",
    "month": "2027.02",
    "category": "research",
    "stream": "paperA",
    "title": "论文A完整写作",
    "detail": "方法、实验、失败分析、局限与相关工作",
    "outcome": "完成可投稿全文",
    "originalMonth": "2027.01"
  },
  {
    "id": "jan-b-base",
    "month": "2027.02",
    "category": "research",
    "stream": "paperB",
    "title": "论文B预测到优化基线",
    "detail": "把需求预测接入航班计划/机型指派或其他优化决策",
    "outcome": "跑通预测到最终决策的链条",
    "originalMonth": "2027.01"
  },
  {
    "id": "feb-agent-rag",
    "month": "2027.02",
    "category": "demo",
    "stream": "agentdemo",
    "title": "企业知识库 RAG 与检索评测",
    "detail": "切分、embedding、检索/重排、来源引用与无答案拒答；先对比关键词检索和基础RAG。",
    "outcome": "自建至少30题含无答案/冲突证据；报告Recall@k、引用正确性与答案正确率；开发集与留出测试集分开。",
    "url": "https://github.com/microsoft/generative-ai-for-beginners/tree/main/15-rag-and-vector-databases",
    "originalMonth": "2027.02"
  },
  {
    "id": "feb-a-submit",
    "month": "2027.03",
    "category": "research",
    "stream": "paperA",
    "title": "论文A正式投稿",
    "detail": "按贡献匹配期刊/会议并提交",
    "outcome": "获得正式投稿记录",
    "milestone": true,
    "originalMonth": "2027.02"
  },
  {
    "id": "feb-air-v1",
    "month": "2027.03",
    "category": "demo",
    "stream": "airdemo",
    "title": "AirDemandLab v1.0",
    "detail": "README、环境、训练、评估、独立推理入口",
    "outcome": "形成求职可展示项目",
    "milestone": true,
    "originalMonth": "2027.02"
  },
  {
    "id": "feb-b-metric",
    "month": "2027.03",
    "category": "research",
    "stream": "paperB",
    "title": "论文B决策质量指标",
    "detail": "定义成本、收益、运力错配等下游指标",
    "outcome": "明确预测准确率与决策质量的区别",
    "originalMonth": "2027.02"
  },
  {
    "id": "mar-cs231n",
    "month": "2027.04",
    "category": "learning",
    "stream": "courses",
    "title": "CS231n 视觉核心选学",
    "detail": "CNN、ResNet、训练技巧、ViT、检测/分割",
    "outcome": "进入现代计算机视觉",
    "url": "https://cs231n.stanford.edu/",
    "originalMonth": "2027.03",
    "optional": true
  },
  {
    "id": "mar-b-dfl",
    "month": "2027.04",
    "category": "research",
    "stream": "paperB",
    "title": "论文B决策导向学习",
    "detail": "比较普通预测、预测后优化、决策导向训练",
    "outcome": "完成核心方法实验",
    "originalMonth": "2027.03"
  },
  {
    "id": "mar-vision-repro",
    "month": "2027.04",
    "category": "demo",
    "stream": "visiondemo",
    "title": "视觉论文核心复现",
    "detail": "选1篇高水平工作复现主要实验并记录偏差",
    "outcome": "形成复现报告",
    "originalMonth": "2027.03",
    "optional": true
  },
  {
    "id": "apr-agent-service",
    "month": "2027.04",
    "category": "foundation",
    "stream": "agentdemo",
    "title": "Agent API 服务化与安全部署",
    "detail": "FastAPI、请求校验、异步/超时、最小权限、Docker、CI测试；日志脱敏、用户隔离，外部写操作需人工审批。",
    "outcome": "一条命令启动；健康检查/鉴权/越权与失败恢复测试；只用公开或合成数据演示。",
    "url": "https://fastapi.tiangolo.com/tutorial/",
    "originalMonth": "2027.04"
  },
  {
    "id": "apr-b-robust",
    "month": "2027.05",
    "category": "research",
    "stream": "paperB",
    "title": "论文B稳健性与消融",
    "detail": "需求扰动、稳定性、计算代价、机制消融",
    "outcome": "主实验基本完整",
    "originalMonth": "2027.04"
  },
  {
    "id": "apr-c-scope",
    "month": "2027.05",
    "category": "research",
    "stream": "paperC",
    "title": "论文C选题筛选",
    "detail": "AI感知/学习必须连接优化、调度或复杂系统决策",
    "outcome": "形成1页Research Question与最小实验",
    "originalMonth": "2027.04"
  },
  {
    "id": "apr-vision-v01",
    "month": "2027.05",
    "category": "demo",
    "stream": "visiondemo",
    "title": "VisionLab v0.1",
    "detail": "视觉训练、推理、错误分析、扰动测试",
    "outcome": "独立视觉仓库第一版",
    "originalMonth": "2027.04",
    "optional": true
  },
  {
    "id": "may-multimodal",
    "month": "2027.06",
    "category": "learning",
    "stream": "courses",
    "title": "多模态/生成模型扩展",
    "detail": "CLIP、自监督、生成模型按目标项目与研究需要选学；视觉专项与Agent扩展共用时间预算，不再新增整套大课。",
    "outcome": "扩宽技术栈而不强行变成论文",
    "originalMonth": "2027.05",
    "optional": true
  },
  {
    "id": "may-b-write",
    "month": "2027.06",
    "category": "research",
    "stream": "paperB",
    "title": "论文B完整写作",
    "detail": "突出AI与优化真正耦合而非串联",
    "outcome": "完成完整论文稿",
    "originalMonth": "2027.05"
  },
  {
    "id": "may-c-pilot",
    "month": "2027.06",
    "category": "research",
    "stream": "paperC",
    "title": "论文C先导实验",
    "detail": "优先尝试视觉/多模态感知到优化决策，也可切AI增强优化",
    "outcome": "确认问题真实、数据可得、实验可行",
    "originalMonth": "2027.05"
  },
  {
    "id": "jun-agent-evals",
    "month": "2027.06",
    "category": "demo",
    "stream": "agentdemo",
    "title": "Agent 可观测性、成本与业务评测",
    "detail": "记录trace、工具结果、延迟、token/成本；比较单次调用、确定性工作流与Agent；不以框架数量作成果。",
    "outcome": "固定至少50例回归集；报告任务成功率、关键安全失败、p50/p95延迟与单任务成本；错误归因和一次优化前后对照。",
    "url": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    "originalMonth": "2027.06"
  },
  {
    "id": "jun-b-submit",
    "month": "2027.07",
    "category": "research",
    "stream": "paperB",
    "title": "论文B正式投稿",
    "detail": "完成补实验、检查与正式提交",
    "outcome": "第二篇新增论文获得投稿记录",
    "milestone": true,
    "originalMonth": "2027.06"
  },
  {
    "id": "jun-vision-v05",
    "month": "2027.07",
    "category": "demo",
    "stream": "visiondemo",
    "title": "VisionLab v0.5",
    "detail": "加入图文、多模态或更高级视觉模块",
    "outcome": "Demo不受博士论文边界限制",
    "originalMonth": "2027.06",
    "optional": true
  },
  {
    "id": "jun-c-rq",
    "month": "2027.07",
    "category": "research",
    "stream": "paperC",
    "title": "论文C研究问题锁定",
    "detail": "明确AI信息怎样改变下游优化决策质量",
    "outcome": "完整研究设计与基线",
    "originalMonth": "2027.06"
  },
  {
    "id": "jul-special",
    "month": "2027.08",
    "category": "learning",
    "stream": "courses",
    "title": "岗位专项补课",
    "detail": "按真实岗位JD选择LLM应用/Agent、算法工程、视觉或机器人；只补目标岗位缺口。",
    "outcome": "不再无目的刷系统课程",
    "originalMonth": "2027.07"
  },
  {
    "id": "jul-c-main",
    "month": "2027.08",
    "category": "research",
    "stream": "paperC",
    "title": "论文C主实验",
    "detail": "基线、方法/机制、跨条件泛化",
    "outcome": "主结果表与关键图",
    "originalMonth": "2027.07"
  },
  {
    "id": "jul-c-ablation",
    "month": "2027.08",
    "category": "research",
    "stream": "paperC",
    "title": "论文C消融与失败分析",
    "detail": "验证改善来自哪里、哪些条件失效",
    "outcome": "结论有证据而非单次最优",
    "originalMonth": "2027.07"
  },
  {
    "id": "aug-agent-v1",
    "month": "2027.08",
    "category": "demo",
    "stream": "agentdemo",
    "title": "EnterpriseAgentLab v1.0 与技术答辩",
    "detail": "GitHub、架构图、可复现环境、评测数据说明、失败案例、3分钟演示；可选只读预测/优化工具接口。",
    "outcome": "陌生人按README能复现；现场解释并修改工具/测试；明确个人贡献、AI辅助范围与局限。",
    "milestone": true,
    "url": "https://docs.langchain.com/oss/python/langgraph/overview",
    "originalMonth": "2027.08"
  },
  {
    "id": "aug-c-full",
    "month": "2027.09",
    "category": "research",
    "stream": "paperC",
    "title": "论文C完整实验包",
    "detail": "稳健性、成本、泛化、局限",
    "outcome": "完成论文级证据链",
    "originalMonth": "2027.08"
  },
  {
    "id": "aug-vision-v1",
    "month": "2027.09",
    "category": "demo",
    "stream": "visiondemo",
    "title": "VisionLab v1.0",
    "detail": "README、Demo、实验结果、失败案例、个人贡献",
    "outcome": "第二个成熟GitHub项目",
    "milestone": true,
    "originalMonth": "2027.08",
    "optional": true
  },
  {
    "id": "aug-c-draft",
    "month": "2027.09",
    "category": "research",
    "stream": "paperC",
    "title": "论文C完整初稿",
    "detail": "把实验结论转成论文结构",
    "outcome": "形成可内部审阅全文",
    "originalMonth": "2027.08"
  },
  {
    "id": "sep-interview",
    "month": "2027.09",
    "category": "learning",
    "stream": "courses",
    "title": "AI技术岗面试准备",
    "detail": "覆盖企业AI应用、Agent开发、算法工程；算法题、项目答辩、模型与服务排错、岗位专项。",
    "outcome": "能够现场解释和修改自己的项目",
    "originalMonth": "2027.09"
  },
  {
    "id": "sep-revision",
    "month": "2027.09",
    "category": "research",
    "stream": "paper0",
    "title": "处理已有论文审稿意见",
    "detail": "论文A/B及现有成果按实际状态修改",
    "outcome": "保持论文管线连续",
    "originalMonth": "2027.09"
  },
  {
    "id": "sep-apply",
    "month": "2027.09",
    "category": "demo",
    "stream": "foundation",
    "title": "集中投递AI技术实习",
    "detail": "以论文、Demo、GitHub和项目答辩材料申请企业AI应用、Agent开发、算法工程等技术岗位。",
    "outcome": "形成持续投递与面试反馈闭环",
    "milestone": true,
    "originalMonth": "2027.09"
  },
  {
    "id": "sep-c-submit",
    "month": "2027.10",
    "category": "research",
    "stream": "paperC",
    "title": "论文C正式投稿",
    "detail": "AI感知/学习与优化决策交叉成果",
    "outcome": "第三篇新增论文正式投稿",
    "milestone": true,
    "originalMonth": "2027.09"
  }
];

const streamLabels={paper0:"现有论文",paperA:"论文 A",paperB:"论文 B",paperC:"论文 C",courses:"课程",airdemo:"AirDemandLab",visiondemo:"VisionLab",foundation:"基础能力",agentdemo:"企业 AI / Agent"};
const papers=[
{stream:"paperA",code:"A",title:"智能需求预测",due:"2027.03",desc:"长预测期、跨市场泛化、需求冲击与分布变化。"},
{stream:"paperB",code:"B",title:"决策导向学习",due:"2027.07",desc:"让预测模型真正服务下游优化与最终决策质量。"},
{stream:"paperC",code:"C",title:"AI 感知 + 优化",due:"2027.10",desc:"视觉、多模态或其他 AI 感知，连接调度、维修、分配或规划。"}
];
const demos=[
{stream:"airdemo",title:"AirDemandLab",due:"2027.03",desc:"需求预测、比较、错误分析与优化决策接口。"},
{stream:"visiondemo",title:"VisionLab",due:"2027.09",desc:"视觉、ViT、检测分割、CLIP 与多模态自由扩展。"},
{stream:"agentdemo",title:"EnterpriseAgentLab",due:"2027.08",desc:"企业知识库、可控 Agent 工作流、评测与安全服务化。"}
];
const courseTracks=[
  {
    "phase": "2026.10—11",
    "title": "AI辅助编程与可验证基础",
    "desc": "先能读懂、测试、修改代码，再让AI提高速度。已会内容用小测跳过。",
    "links": [
      [
        "主课 · MIT Missing Semester",
        "https://missing.csail.mit.edu/"
      ],
      [
        "参考 · Python中文教程",
        "https://docs.python.org/zh-cn/3/tutorial/"
      ],
      [
        "参考 · Hello算法",
        "https://www.hello-algo.com/"
      ]
    ]
  },
  {
    "phase": "2026.12—2027.02",
    "title": "机器学习与深度学习必要主线",
    "desc": "张量、训练、验证、过拟合与数据泄漏检查。以论文A实验为验收，不追求刷完整套课。",
    "links": [
      [
        "主课 · 动手学深度学习",
        "https://zh.d2l.ai/"
      ],
      [
        "参考 · scikit-learn常见陷阱",
        "https://scikit-learn.org/stable/common_pitfalls.html"
      ]
    ]
  },
  {
    "phase": "2026.11—2027.02",
    "title": "LLM → Agent → RAG",
    "desc": "先直接API与确定性工作流，再选一种Agent框架，最后加入有引用、有评测的知识库。",
    "links": [
      [
        "主线 · 微软生成式AI入门",
        "https://github.com/microsoft/generative-ai-for-beginners"
      ],
      [
        "主线 · Hugging Face Agent课程",
        "https://huggingface.co/learn/agents-course/en/unit0/introduction"
      ],
      [
        "原则 · 构建有效的Agent",
        "https://www.anthropic.com/engineering/building-effective-agents"
      ]
    ]
  },
  {
    "phase": "2027.04—08",
    "title": "企业AI工程与业务验收",
    "desc": "围绕EnterpriseAgentLab学习服务化、权限、部署、观测与评测；用公开或合成数据演示。",
    "links": [
      [
        "服务 · FastAPI",
        "https://fastapi.tiangolo.com/tutorial/"
      ],
      [
        "部署 · Docker",
        "https://docs.docker.com/get-started/"
      ],
      [
        "可选框架 · LangGraph",
        "https://docs.langchain.com/oss/python/langgraph/overview"
      ],
      [
        "评测 · Agent Evals",
        "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
      ]
    ]
  }
];
const key="lin-ai-phd-roadmap-progress-v1";
let progress={};
try {
  const saved=JSON.parse(localStorage.getItem(key)||"{}");
  if(saved && typeof saved==="object" && !Array.isArray(saved)) progress=saved;
} catch {}
const plannedMonths=[...new Set(tasks.map(t=>t.month))].sort();
let observedMonth=currentMonth();
let activeMonth=observedMonth;
let view="month";
function currentMonth(){
  const parts=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date());
  return parts.find(p=>p.type==="year").value+"."+parts.find(p=>p.type==="month").value;
}
function monthTasks(month){return tasks.filter(t=>t.month===month)}
function carriedTasks(month){return tasks.filter(t=>t.month<month && !progress[t.id])}
function refreshMonth(){
  const now=currentMonth();
  if(now!==observedMonth){if(view!=="stage" && activeMonth===observedMonth) activeMonth=now;observedMonth=now;render()}
}
let pendingOnly=false,page='today',selectedStage=0,cloudSync=null;
window.AppProgress={sync:()=>cloudSync};
const stages=[
  {start:'2026.10',end:'2027.01',title:'基础与实验',desc:'编程基础、数据管线与可信基线'},
  {start:'2027.02',end:'2027.03',title:'首篇投稿',desc:'完成论文 A 与第一个成熟项目'},
  {start:'2027.04',end:'2027.07',title:'方法拓展',desc:'推进论文 B，锁定论文 C 研究问题'},
  {start:'2027.08',end:'2027.10',title:'成果与实习',desc:'完成论文 C，准备项目展示与实习'}
];
function stageTasks(i){return tasks.filter(t=>t.month>=stages[i].start&&t.month<=stages[i].end)}
function tally(a){const done=a.filter(t=>progress[t.id]).length;return {done,total:a.length,pct:a.length?Math.round(done/a.length*100):0}}
function bar(percent){return '<div class="progress-line"><i style="width:'+percent+'%"></i></div>'}
function taskMarkup(t){
  const carried=t.month<activeMonth&&!progress[t.id];
  const lesson=(window.COURSE_LESSONS?.courses||[]).flatMap(c=>c.lessons).find(l=>l.taskId===t.id);
  const timing=(t.originalMonth!==t.month?'原计划 '+t.originalMonth+' → ':'')+'计划 '+t.month;
  return '<article id="task-'+t.id+'" class="task-item category-'+t.category+' '+(progress[t.id]?'done':'')+'"><label class="task-check"><input id="check-'+t.id+'" type="checkbox" data-id="'+t.id+'" aria-label="完成：'+t.title+'" '+(progress[t.id]?'checked':'')+'></label><div class="task-copy"><label class="task-title" for="check-'+t.id+'">'+t.title+'</label><p class="task-outcome"><span>交付：</span>'+t.outcome+'</p><div class="task-meta"><i>'+streamLabels[t.stream]+'</i>'+(t.milestone?'<i class="hot">里程碑</i>':'')+((t.optional||window.CAREER_CURRICULUM?.taskOverrides?.[t.id]?.optional)?'<i class="optional-tag">当前主线选修</i>':'')+(carried?'<i class="carry-tag">顺延自 '+t.month+'</i>':'<span>计划 '+t.month+'</span>')+'</div><details class="task-detail"><summary>任务说明</summary><p>'+t.detail+'</p><small>'+timing+(progress[t.id]?' · 完成：'+(window.GoalUI?.date(cloudSync?.taskCompletedAtSnapshot?.()[t.id])||'历史完成日期未记录'):'')+'</small></details>'+(lesson?'<button class="task-lessons-button" data-task-lessons="'+lesson.id+'">查看对应的逐节课程 →</button>':'')+'</div>'+(t.url?'<a class="task-link" href="'+t.url+'" target="_blank" rel="noreferrer" aria-label="打开'+t.title+'学习资料">资料 →</a>':'')+'</article>';
}
function taskGroup(title,a,isBacklog=false){const s=tally(a),shown=pendingOnly?a.filter(t=>!progress[t.id]):a;if(!shown.length)return '';return '<section class="task-month '+(isBacklog?'is-backlog':'')+'"><div class="task-month-head"><strong>'+title+'</strong><span>'+s.done+' / '+s.total+' 已完成</span></div>'+shown.map(taskMarkup).join('')+'</section>'}
function pct(stream){return tally(tasks.filter(t=>t.stream===stream)).pct}
function save(){try{localStorage.setItem(key,JSON.stringify(progress));document.querySelector('#saveStatus').textContent='已保存在此浏览器 · 尚未连接云端';return true}catch{document.querySelector('#saveStatus').textContent='当前浏览器无法保存进度；请勿关闭页面，以免丢失本次勾选。';return false}}
function toggle(id){
  const source=document.activeElement,historyOpen=document.querySelector('.completed-history')?.open;
  let saved=true;
  if(cloudSync){saved=cloudSync.set(id,!progress[id]);progress=cloudSync.snapshot()}else{progress[id]=!progress[id];saved=save()}
  render();
  if(historyOpen&&document.querySelector('.completed-history'))document.querySelector('.completed-history').open=true;
  const input=document.querySelector('#check-'+id);if(source?.dataset?.id===id){if(input)input.focus({preventScroll:true});else document.querySelector('#pendingOnly').focus({preventScroll:true})}
  document.querySelector('#announcer').textContent=(progress[id]?'已完成：':'已恢复待办：')+tasks.find(t=>t.id===id).title+(saved?'，进度已记录。':'，未能保存。');
}
const pageNames={today:['从研究，到第一件 AI 作品','面向 AI 应用 / Agent 开发实习。今天先做一件看得见结果的小事。','我的职业路线'],roles:['实习岗位参考','查看岗位要求和薪资资料。具体机会以投递时为准。','更多内容'],skills:['详细自查记录','这页保留全部技能记录。日常学习从首页的大模块进入。','详细记录'],resources:['这一模块，按顺序学','每次展开一小节，看资料、做练习，再记录完成。','正在学习'],assessments:['检查自己会不会','照着题目做一次，再按实际结果保存记录。','练习自查'],projects:['我的作品','把每一步的代码、测试和结果，接成一个能演示的工具。','作品与证据'],overview:['博士计划','原来的论文、研究任务和时间安排都在这里。','更多内容'],timeline:['研究时间表','计划时间和实际完成时间分开记录。','博士计划'],outcomes:['论文与作品','查看原来的论文和项目任务。','博士计划'],storage:['进度与账号','不登录也能在本机保存。登录后可以同步到自己的账号。','保存进度']};
let activeRoute='today';
function setPage(next,historyMode=true){
  const requested=String(next||'today'),moduleId=requested.startsWith('learn/')?requested.slice(6):null;
  const target=moduleId?'resources':['execution',...Object.keys(pageNames)].includes(requested)?requested:'today';
  if((target!==page||requested!==activeRoute)&&window.CareerUI?.canNavigate&&!window.CareerUI.canNavigate()){
    if(!historyMode&&window.history?.pushState&&window.location?.hash!=='#'+activeRoute)window.history.pushState({page:activeRoute},'','#'+activeRoute);
    return false;
  }
  page=target;activeRoute=moduleId?'learn/'+moduleId:target;const more=document.getElementById('moreNavigation');if(more)more.open=false;
  if(target==='resources')window.CareerUI?.selectModule(moduleId);
  if(historyMode&&window.history?.pushState&&window.location?.hash!=='#'+activeRoute)window.history.pushState({page:activeRoute},'','#'+activeRoute);
  render();document.querySelector('#pageTitle').scrollIntoView({behavior:'auto',block:'start'});document.querySelector('#pageTitle').focus?.({preventScroll:true});return true;
}
window.AppNavigation={open:setPage,current:()=>page,route:()=>activeRoute};
window.addEventListener('popstate',()=>setPage((window.location?.hash||'#today').slice(1),false));
function setMonth(month){activeMonth=month;view='month';page='execution';render()}
function navigateMonth(direction){const [y,m]=activeMonth.split('.').map(Number),d=new Date(y,m-1+direction,1);setMonth(d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0'))}
function render(){
  if(window.LessonUI) window.LessonUI.render();
  window.GoalUI?.render();
  document.querySelector('#nextLessonHero').hidden=true;
  window.CareerUI?.render();
  const phdPages=['overview','execution','timeline','outcomes'],skillPages=['skills','resources','assessments'];
  document.body?.setAttribute('data-current-page',page);
  document.querySelector('#skillTabs').hidden=!['skills','assessments'].includes(page);
  document.querySelector('#researchTabs').hidden=!phdPages.includes(page);
  document.querySelector('.journey').hidden=!['execution','timeline'].includes(page);
  document.querySelector('.progress-sidebar').hidden=page!=='execution';
  document.querySelector('.workspace-layout').classList.toggle('with-sidebar',page==='execution');
  document.querySelector('#resetBtn').hidden=page!=='storage';
  document.querySelectorAll('.section-tabs [data-open-page]').forEach(b=>b.setAttribute('aria-current',b.dataset.openPage===page?'page':'false'));
  const all=tally(tasks),now=currentMonth(),backlog=carriedTasks(view==='stage'?stages[selectedStage].start:activeMonth),mt=monthTasks(activeMonth),ms=tally(mt);
  document.querySelector('#todayLabel').textContent=now.replace('.','年')+'月 · 上海时间';
  document.querySelector('#pageTitle').textContent=page==='today'?(window.CareerUI?.homeHeading?.()[0]||pageNames.today[0]):page==='resources'?(window.CareerUI?.currentModule()?.title||'模块学习'):page==='execution'?(view==='stage'?stages[selectedStage].title+' · 阶段任务':activeMonth===now?'本月执行计划':activeMonth.replace('.','年')+'月执行计划'):(pageNames[page]?.[0]||'成长工作台');
  document.querySelector('#pageSubtitle').textContent=page==='today'?(window.CareerUI?.homeHeading?.()[1]||pageNames.today[1]):page==='execution'?'先补齐未完成的任务，再推进本月安排。':pageNames[page]?.[1]||'';
  document.querySelector('#pageEyebrow').textContent=pageNames[page]?.[2]||'RESEARCH EXECUTION';
  document.querySelectorAll('[data-panel]').forEach(el=>el.hidden=el.dataset.panel!==page);
  const primaryPage=page==='resources'?'resources':['skills','assessments'].includes(page)?'skills':phdPages.includes(page)?'overview':page;
  document.querySelectorAll('[data-page]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.page===primaryPage)));
  document.querySelector('#overallPct').innerHTML=all.pct+'<span>%</span>';
  document.querySelector('#overallCount').textContent=all.done+' / '+tasks.length+' 项已完成';
  document.querySelector('#progressRing').style.setProperty('--progress',all.pct);
  document.querySelector('#progressRing').setAttribute('aria-label','全部 '+tasks.length+' 项，已完成 '+all.done+' 项，完成率 '+all.pct+'%');
  document.querySelector('#overallNote').textContent=all.done===0?'完成第一项，点亮你的进度。':all.done===tasks.length?'全部计划已完成，看看你的积累。':'进度只来自你已完成的任务。';
  document.querySelector('#remainingCount').textContent='还有 '+(tasks.length-all.done)+' 项待完成';
  document.querySelector('#dimensionProgress').innerHTML=[['科研','research'],['课程与基础','learning'],['项目','demo']].map(([label,c])=>{const a=tasks.filter(t=>c==='learning'?['learning','foundation'].includes(t.category):t.category===c),s=tally(a);return '<div class="dimension-row"><span>'+label+'</span><strong>'+s.done+' / '+s.total+'</strong>'+bar(s.pct)+'</div>'}).join('');
  const si=stages.findIndex((s,i)=>stageTasks(i).some(t=>!progress[t.id]));
  document.querySelector('#stageExplanation').textContent=si<0?'四个阶段已全部完成':'当前推进：'+stages[si].title+' · 依据实际勾选';
  document.querySelector('#stageTrack').innerHTML=stages.map((s,i)=>{const ss=tally(stageTasks(i)),complete=ss.done===ss.total;return '<button class="stage-step '+(complete?'complete':i===si?'current':'')+'" data-stage="'+i+'" aria-label="查看'+s.title+'阶段，'+s.start+'至'+s.end+'，'+ss.done+'/'+ss.total+'项完成"><span class="stage-number">'+(complete?'✓':i+1)+'</span><strong>'+s.title+'</strong><small>'+s.start.slice(2)+'–'+s.end.slice(2)+' · '+ss.done+'/'+ss.total+'</small>'+(i===si?'<span class="stage-state">当前</span>':'')+'</button>'}).join('');
  document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{selectedStage=Number(b.dataset.stage);activeMonth=stages[selectedStage].start;view='stage';page='execution';render();document.querySelector('#workspace').scrollIntoView({behavior:'smooth',block:'start'})});
  const months=[...new Set([...plannedMonths,now,activeMonth])].sort();
  document.querySelector('#monthPicker').innerHTML=months.map(m=>'<option value="'+m+'" '+(m===activeMonth?'selected':'')+'>'+m.replace('.','年')+'月</option>').join('');
  const scope=view==='stage'?stageTasks(selectedStage):mt,scopeStats=tally(scope);
  document.querySelector('#scopeCountLabel').textContent=view==='stage'?'阶段计划完成':'所选月计划完成';
  document.querySelector('#pendingScopeLabel').textContent=view==='stage'?'阶段待办':'所选月待办';
  document.querySelector('#stageViewTab').hidden=view!=='stage';
  document.querySelector('#monthCount').innerHTML=scopeStats.done+' / '+scope.length+'<small>项</small>';
  document.querySelector('#pendingCount').innerHTML=(backlog.length+scope.filter(t=>!progress[t.id]).length)+'<small>项</small>';
  document.querySelector('#backlogCount').innerHTML=backlog.length+'<small>项</small>';
  document.querySelectorAll('#viewTabs button').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-pressed',String(b.dataset.view===view))});
  const captions={stage:stages[selectedStage].title+' · '+stages[selectedStage].start+'—'+stages[selectedStage].end,month:activeMonth+'计划 + 顺延待办',year:'全部'+tasks.length+'项 · 按计划月份',research:'科研与论文 · 全部月份',learning:'课程与基础 · 全部月份',demo:'项目与实习 · 全部月份'};
  document.querySelector('#viewCaption').textContent=captions[view];
  const list=view==='stage'?stageTasks(selectedStage):view==='year'?tasks:view==='research'?tasks.filter(t=>t.category==='research'):view==='learning'?tasks.filter(t=>['learning','foundation'].includes(t.category)):view==='demo'?tasks.filter(t=>t.category==='demo'):mt;
  let markup='';
  if(view==='month'){const history=tasks.filter(t=>t.month<activeMonth&&progress[t.id]);markup=(backlog.length?taskGroup('优先补齐 · 顺延待办',backlog,true):'')+taskGroup(activeMonth+' · 本月推进',mt)+(history.length&&!pendingOnly?'<details class="completed-history"><summary>已完成历史任务（'+history.length+'）· 可取消勾选</summary>'+taskGroup('已完成历史',history)+'</details>':'')}
  else markup=(view==='stage'&&backlog.length?taskGroup('阶段前尚未完成 · 优先补齐',backlog,true):'')+plannedMonths.filter(m=>list.some(t=>t.month===m)).map(m=>taskGroup(m,list.filter(t=>t.month===m))).join('');
  document.querySelector('#taskGroups').innerHTML=markup||'<div class="next-empty">'+(pendingOnly?'当前视图没有未完成任务 ✓':'此月没有新安排，未完成任务会持续显示在这里。')+'</div>';
  document.querySelectorAll('[data-task-lessons]').forEach(b=>b.onclick=()=>window.LessonUI?.openLesson(b.dataset.taskLessons));
  document.querySelectorAll('.task-item input').forEach(el=>el.onchange=()=>toggle(el.dataset.id));
  const submitted=['feb-a-submit','jun-b-submit','sep-c-submit'].filter(id=>progress[id]).length,finished=['feb-air-v1','aug-vision-v1','aug-agent-v1'].filter(id=>progress[id]).length;
  document.querySelector('#outcomeCount').textContent='已投稿 '+submitted+'/3 · 成熟项目 '+finished+'/'+demos.length;
  document.querySelector('#paperGrid').innerHTML=papers.map(p=>{const a=tasks.filter(t=>t.stream===p.stream),s=tally(a),next=a.find(t=>!progress[t.id]);return '<article><div class="paper-top"><div class="paper-code">'+p.code+'</div><span>目标投稿 · '+p.due+'</span></div><h3>'+p.title+'</h3><p>'+p.desc+'</p><div class="paper-foot"><span>'+s.done+' / '+s.total+' 项已完成</span><strong>'+s.pct+'%</strong></div>'+bar(s.pct)+'<div class="stream-next">'+(next?'下一步：'+next.title:'全部任务已完成 ✓')+'</div></article>'}).join('');
  document.querySelector('#demoList').innerHTML=demos.map((d,i)=>{const s=tally(tasks.filter(t=>t.stream===d.stream));return '<article><span class="demo-icon">'+(i===2?'E':i?'V':'A')+'</span><div><h3>'+d.title+'</h3><p>'+d.desc+'</p>'+bar(s.pct)+'</div><div class="demo-stat"><strong>'+s.done+' / '+s.total+'</strong><span>项已完成</span><span>目标 '+d.due+'</span></div></article>'}).join('');
  const milestones=tasks.filter(t=>t.milestone).sort((a,b)=>a.month.localeCompare(b.month)),next=milestones.find(t=>!progress[t.id]);
  document.querySelector('#nextMilestone').innerHTML=next?'<span class="next-milestone-date">目标 '+next.month+'</span><strong class="next-milestone-title">'+next.title+'</strong><p class="next-milestone-note">'+next.outcome+'</p>':'<p class="next-milestone-note">全部里程碑已完成 ✓</p>';
}
document.querySelectorAll('#viewTabs button').forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>setPage(b.dataset.page));
document.querySelector('#homeBtn').onclick=e=>{e.preventDefault();setPage('today');document.querySelector('#pageTitle').scrollIntoView({behavior:'smooth',block:'start'})};
document.querySelector('#monthPicker').onchange=e=>setMonth(e.target.value);
document.querySelector('#prevMonth').onclick=()=>navigateMonth(-1);
document.querySelector('#nextMonth').onclick=()=>navigateMonth(1);
document.querySelector('#todayBtn').onclick=()=>setMonth(currentMonth());
document.querySelector('#showAllBtn').onclick=()=>{page='execution';view='year';pendingOnly=false;document.querySelector('#pendingOnly').checked=false;render();document.querySelector('#workspace').scrollIntoView({behavior:'smooth',block:'start'})};
document.querySelector('#showOutcomesBtn').onclick=()=>setPage('outcomes');
document.querySelector('#backlogJump').onclick=()=>{view='month';render();(document.querySelector('.is-backlog')||document.querySelector('#taskGroups')).scrollIntoView({behavior:'smooth',block:'center'})};
document.querySelector('#cloudEntry').onclick=()=>setPage('storage');
document.querySelector('#pendingOnly').onchange=e=>{pendingOnly=e.target.checked;render()};
document.querySelector('#resetBtn').onclick=()=>{if(confirm('确定清空全部 '+tasks.length+' 项任务的勾选进度吗？此操作无法撤销。')){if(cloudSync){cloudSync.resetAll();progress=cloudSync.snapshot()}else{progress={};save()}render();document.querySelector('#announcer').textContent='任务进度已重置，课程记录保持不变。'}};
window.GoalUI?.init({tasks,progress:()=>progress,sync:()=>cloudSync,toggle,openPage:setPage,openArea:area=>{view=area;setPage("execution")},taskMarkup});
window.LessonUI?.init({openCourses:()=>{if(setPage('resources')===false)return false;const archive=document.getElementById('legacyLearningArchive');if(archive)archive.open=true;return true},sync:()=>cloudSync});
window.CareerUI?.init({openPage:setPage});
document.querySelectorAll('.section-tabs [data-open-page]').forEach(b=>b.onclick=()=>setPage(b.dataset.openPage));
if(window.location?.hash){const route=window.location.hash.slice(1);if(route.startsWith('learn/')){page='resources';activeRoute=route;window.CareerUI?.selectModule(route.slice(6));}else if(['execution',...Object.keys(pageNames)].includes(route)){page=route;activeRoute=route;}}
render();
window.addEventListener('focus',refreshMonth);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshMonth()});
window.addEventListener('storage',e=>{if(!cloudSync&&e.key===key){try{const saved=JSON.parse(e.newValue||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved)){progress=saved;render()}}catch{}}});
setInterval(refreshMonth,60000);

// Cloud adapter is optional: local tasks remain usable if configuration or the SDK is unavailable.
let cloudUIKey='',authMode='signin';
function renderCloud(state){
  const badge={local:'本地保存',loading:'正在连接',signin:'未登录',ready:'云端已同步',pending:'待同步',syncing:'正在同步',conflict:'需要处理',error:'同步未完成'};
  document.querySelector('#cloudBadge').textContent=badge[state.mode]||'本地保存';
  document.querySelector('#cloudMode').textContent=state.userId?'私有账号':state.configured?'等待登录':'尚未启用';
  document.querySelector('#cloudStatus').textContent=state.message||'进度保存在此浏览器。';
  document.querySelector('#saveStatus').textContent=state.userId?(state.email+' · 仅此账号可见'):'本机进度不会自动上传或公开。';
  document.querySelector('#cloudEntry').setAttribute('data-sync',state.mode);
  const uiKey=[!!state.configured,state.userId||'',!!state.conflict,!!state.canImport,authMode].join('|');
  if(uiKey===cloudUIKey)return;cloudUIKey=uiKey;
  const controls=document.querySelector('#cloudControls');
  if(!state.configured){controls.innerHTML='<p class="cloud-help">云端同步待启用。本机勾选仍会保存，不影响执行计划。</p>';return}
  if(!state.userId){
    const registering=authMode==='signup';
    controls.innerHTML='<div class="auth-switch"><button type="button" id="authSignIn" aria-pressed="'+!registering+'">已有账号</button><button type="button" id="authSignUp" aria-pressed="'+registering+'">注册同步账号</button></div><form id="cloudLogin"><label for="cloudEmail">账号邮箱</label><input id="cloudEmail" type="email" autocomplete="username" required placeholder="你的邮箱"><label for="cloudPassword">密码</label><input id="cloudPassword" type="password" autocomplete="'+(registering?'new-password':'current-password')+'" '+(registering?'minlength="8"':'')+' required placeholder="'+(registering?'设置至少 8 位密码':'同步账号密码')+'">'+(registering?'<label for="cloudPasswordConfirm">再次确认密码</label><input id="cloudPasswordConfirm" type="password" autocomplete="new-password" minlength="8" required placeholder="再次输入密码">':'')+'<button type="submit" class="cloud-primary">'+(registering?'创建我的同步账号':'登录并同步')+'</button><p class="cloud-help">'+(registering?'请在你自己的浏览器中注册。若收到确认邮件，验证后回到这里登录。本机任务、课程、实操自评与项目证据不会自动上传。':'使用本网站的同步账号，不是 Supabase 管理后台账号。已有该项目 Auth 账号也可登录。首次登录后可手动合并本机任务、课程、实操自评与项目证据。')+'</p><p id="loginError" role="alert"></p></form>';
    document.querySelector('#authSignIn').onclick=()=>{authMode='signin';cloudUIKey='';renderCloud(cloudSync.status())};
    document.querySelector('#authSignUp').onclick=()=>{authMode='signup';cloudUIKey='';renderCloud(cloudSync.status())};
    document.querySelector('#cloudLogin').onsubmit=async e=>{
      e.preventDefault();const button=e.target.querySelector('button[type="submit"]'),email=document.querySelector('#cloudEmail').value,password=document.querySelector('#cloudPassword').value;
      const out=document.querySelector('#loginError');out.textContent='';
      if(registering&&password!==document.querySelector('#cloudPasswordConfirm').value){out.textContent='两次密码不一致，请重新确认。';return}
      button.disabled=true;
      try{if(registering){const result=await cloudSync.signUp(email,password);const currentOut=document.querySelector('#loginError');if(currentOut)currentOut.textContent=result?.needsEmailConfirmation?'请查看邮箱并完成确认，然后回到本网站选择“已有账号”登录。':'账号已创建。可选择是否合并本机任务、课程、实操自评与项目证据。'}else await cloudSync.signIn(email,password)}catch(error){const currentOut=document.querySelector('#loginError');if(currentOut)currentOut.textContent=error.message}finally{for(const id of ['#cloudPassword','#cloudPasswordConfirm']){const input=document.querySelector(id);if(input)input.value=''}if(button.isConnected)button.disabled=false}
    };
  }else{
    controls.innerHTML=(state.conflict?'<p class="cloud-help">两台设备的进度不同，请选择保留的版本。</p><button id="useCloud">采用云端版本</button><button id="useLocal">保留本机版本</button>':'<button id="syncNow">立即同步</button>')+(state.canImport&&!state.conflict?'<button id="importGuest">合并本机已有进度</button>':'')+'<button id="signOut">退出登录</button>';
    if(state.conflict){document.querySelector('#useCloud').onclick=()=>{if(confirm('采用云端进度？本机尚未同步的修改将被替换。'))cloudSync.resolveConflict('cloud')};document.querySelector('#useLocal').onclick=()=>{if(confirm('以本机版本更新云端？另一台设备的新修改可能被覆盖。'))cloudSync.resolveConflict('local')}}
    else document.querySelector('#syncNow').onclick=()=>cloudSync.syncNow();
    if(state.canImport&&!state.conflict)document.querySelector('#importGuest').onclick=()=>{if(confirm('把本机任务、课程、实操自评与项目证据合并到当前账号？云端已有记录会保留，只导入本机未同步的记录。'))cloudSync.importGuest()};
    document.querySelector('#signOut').onclick=async()=>{if(cloudSync.status().dirty&&!confirm('仍有修改尚未同步。退出后会保存在此设备，是否继续？'))return;try{await cloudSync.signOut()}catch(e){document.querySelector('#cloudStatus').textContent=e.message}};
  }
}
if(window.PhdCloud){
  cloudSync=window.PhdCloud.create({ids:tasks.map(t=>t.id),lessonIds:window.LessonUI?.ids||[],onCompletionDates:value=>{window.GoalUI?.dates(value);window.LessonUI?.dates?.(value.lessons);render()},onLessons:value=>{window.LessonUI?.update(value);window.GoalUI?.render();window.CareerUI?.render()},onProgress:value=>{const changed=tasks.some(t=>!!progress[t.id]!==!!value[t.id]);progress=value;if(changed)render()},onStatus:renderCloud});
  progress=cloudSync.snapshot();window.LessonUI?.update(cloudSync.lessonSnapshot?.()||{});render();cloudSync.start();
}

