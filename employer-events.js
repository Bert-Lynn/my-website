// Generated public data. Edit data/employer-events.json and run node scripts/build-employer-events.cjs.
window.EMPLOYER_EVENTS = {
  "schemaVersion": 1,
  "verifiedAt": "2026-10-12",
  "title": "能形成求职证据的技术竞赛、开源协作与研究活动",
  "scope": "2027技术实习准备的可选模块；研究结论，不含注册、缴费、投递或外发。",
  "recommendation": "先把现有Agent作品和评测做稳，再从一个小型开源贡献开始；竞赛仅按方向和资格择一，论文结合博士研究，后训练留到后续阶段。",
  "budgetRule": "每周通常6小时、最多8小时，投稿/返修周最多3小时。若选择活动，替换同周学习项，不另加任务；每次最多选一项。",
  "recognitionRule": "可验证作品、实际排名/获奖、上游评审合并、真实论文成果分别记录。主办、赞助、报名、旁听和证书均不自动等于招聘优先，更不保证面试、offer或400–600元/天。",
  "currentRegistrationFinding": "本次未核实到同时符合当前主线、目标雇主关联且可立即报名的限期赛事。不要为填满“报名中”而把历史按钮或动态页面外壳当实时开放。两项开源协作为持续参与；不是赛事报名。",
  "statusLabels": {
    "rolling_community": "持续开源协作",
    "closed_historical": "历史已截止",
    "registration_closed_historical": "报名已截止的历史赛事",
    "cfp_provisional": "CFP已出现但日期暂定",
    "future_unannounced": "2027待公告"
  },
  "items": [
    {
      "id": "cozeloop-contribution",
      "title": "CozeLoop：做一次可复现的评测/Trace贡献",
      "kind": "open_source_activity",
      "priority": "first_optional",
      "employers": [
        "字节跳动",
        "美团（技能偏好旁证）",
        "百度（任务对应旁证）"
      ],
      "status": {
        "code": "rolling_community",
        "label": "持续开源协作，非赛事报名",
        "registrationOpenVerified": false,
        "futureEdition": "无年度报名窗口；提交前重核维护状态"
      },
      "dates": {
        "deadline": null,
        "timeZone": "不适用",
        "note": "官方仓库未规定统一截止；维护者评审时间未知。"
      },
      "eligibility": {
        "official": "主仓库欢迎开发者贡献；Python SDK要求Python 3.8+。没有核实学历或年级限制。",
        "userFit": "Python主线可先做SDK最小复现与测试；主平台Go后端/React前端不在现有基础课覆盖内。"
      },
      "fees": {
        "registration": "不适用（开源协作）",
        "compute": "本地mock测试可先做；托管API/云资源费用未知，使用前确认预算。"
      },
      "officialWorkRequirements": "SDK提供Trace/Prompt接口；主仓库接受修复、文档和测试贡献，代码需评审。SDK具体提交规范本次未完整读到，提PR前补读它自己的CONTRIBUTING。",
      "proposedDeliverable": [
        "一个真实可复现问题：最小脚本、固定版本、预期/实际结果",
        "一项针对性修复或可运行示例，加边界/回归测试",
        "PR及评审记录；未合并标“待审”，只有真正合并后才能写“上游已接收”"
      ],
      "skillIds": [
        "ai-code",
        "reproducible-workflow",
        "software-testing",
        "api-delivery",
        "agent-evaluation"
      ],
      "learningUnitIds": [
        "u-git",
        "u-pytest",
        "u-test-param",
        "u-api-testing",
        "u-agent-tools",
        "u-agent-evals"
      ],
      "readinessGate": "现有Agent能稳定跑通，并且自己能读懂diff、编写测试、解释一条Trace失败原因后再选题。不是看完课就自动具备贡献能力。",
      "estimatedEffort": {
        "hours": [
          8,
          16
        ],
        "weeksAtTwoHours": [
          4,
          8
        ],
        "basis": "助手对一个小型复现＋修复＋测试的估算，不含维护者等待；复杂问题可超出。",
        "weeklyRule": "替换同周主线的2小时，不额外叠加到每周8小时上限。"
      },
      "employerRecognition": {
        "type": "project_relevance_and_explicit_general_preference",
        "evidence": "Coze官方项目可核实技术协作过程；美团对应实习偏好知名Agent社区持续贡献，百度对应实习明确重视评测/可复现规范。",
        "limit": "没有找到“给CozeLoop提一个PR即可优先面试”的官方承诺。小修补、star或参会证书不能等同持续贡献。"
      },
      "nextStep": "用自己的公开或合成Agent输入离线复现一个Trace/评测问题；先记录结果，再决定是否准备上游贡献，不上传研究私有数据。",
      "sourceIds": [
        "coze-sdk",
        "coze-main",
        "coze-contrib",
        "coze-issues",
        "meituan-open-source",
        "baidu-agent"
      ],
      "presentation": {
        "shortTitle": "CozeLoop · 评测与 Trace 小贡献",
        "tagline": "完成当前 Agent 的评测后，可选一项能复现、能解释的小贡献。",
        "participation": "用公开或合成输入本地复现问题，准备小修复与测试；提 PR 前核对 SDK 自己的贡献规则。",
        "skills": "Python、Git、pytest；能读懂改动、解释失败与评测结果。",
        "output": "最小复现＋修复或示例＋回归测试＋PR 评审记录。未合并就写“待审”。",
        "recognition": "官方开源协作可留下可查记录；美团相关实习偏好持续社区贡献，百度相关实习重视评测与复现。",
        "recognitionLimit": "这些是技术关联和岗位偏好旁证，没有“给 CozeLoop 提一次 PR 就优先面试”的承诺。",
        "primarySourceId": "coze-sdk",
        "primaryLabel": "查看官方 Python SDK",
        "dateSummary": "持续开源协作，无统一截止；提交前重核维护与参与规则。"
      }
    },
    {
      "id": "alibaba-aiops-history",
      "title": "阿里云AI原生编程挑战赛：AIOps历史题实践",
      "kind": "competition",
      "priority": "agent_application_alternative",
      "employers": [
        "阿里巴巴/阿里云"
      ],
      "status": {
        "code": "closed_historical",
        "label": "2025赛事已截止；2027同类赛待公布",
        "registrationOpenVerified": false,
        "futureEdition": "截至核查未核实2027同名赛公告、资格或DDL；不得照搬2025月份。"
      },
      "dates": {
        "registrationDeadline": "2025-11-16 24:00",
        "timeZone": null,
        "precision": "官网赛制索引给日期和时刻，未标明时区",
        "note": "详细赛制索引为延期后日期；宣传页保留旧10月30日。2026-01-20已有官方决赛页。"
      },
      "eligibility": {
        "official": "全球开放；详细赛制索引列1–3人、实名认证，触及赛题内部资料的人员不得参赛。",
        "userFit": "学生可以研究历史题；2027报名资格未核实。历史云环境及数据现在是否仍可用未知。"
      },
      "fees": {
        "registration": "未核实/未公开",
        "compute": "历史赛事资源权益不视为现在仍可用；云服务和模型调用费另行确认。"
      },
      "officialWorkRequirements": "用日志、Trace、指标等多源可观测数据定位故障根因；关注准确性与成本，决赛含答辩。",
      "proposedDeliverable": [
        "在合法可用数据上做一个只读故障分析Agent与确定性基线",
        "保留case级根因准确率、工具错误、时延/调用成本及消融",
        "演示＋复现说明；必须写“历史题复现/自拟同类任务”，不能写成官方参赛获奖"
      ],
      "skillIds": [
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "software-testing",
        "api-delivery",
        "agent-evaluation"
      ],
      "learningUnitIds": [
        "u-sql-select",
        "u-leakage",
        "u-pytest",
        "u-api",
        "u-agent-loop",
        "u-agent-evals"
      ],
      "readinessGate": "完成最小Agent循环和评测，再补Trace/日志/指标、故障树和AIOps领域知识。先复用现有项目，不并行新建一个大型平台。",
      "estimatedEffort": {
        "hours": [
          20,
          40
        ],
        "basis": "助手估计一个小型离线实践；非官方赛事用时，也非完整竞赛冲榜工时。",
        "weeklyRule": "仅在主项目可演示后替换选修时间。"
      },
      "employerRecognition": {
        "type": "employer_hosted_technical_challenge",
        "evidence": "官网与官方决赛页确认阿里云主办、云原生团队技术题及专家答辩。",
        "limit": "主办只证明技术相关性；本次未核实阿里招聘对该赛参与/获奖的优先政策，不许写招聘绿通。"
      },
      "nextStep": "先看官方题目和决赛方案，写一页对照：现有Agent评测缺什么；只有数据许可、资源和时间都合适才做历史题实验。",
      "sourceIds": [
        "ali-landing",
        "ali-rules",
        "ali-final"
      ],
      "presentation": {
        "shortTitle": "阿里云 AIOps · 历史赛题",
        "tagline": "主项目可演示后，用历史题补故障分析能力。",
        "participation": "先读官方题目与决赛方案；确认数据许可后，再做只读故障分析与确定性基线。",
        "skills": "Agent 工具调用、日志 / Trace / 指标、验证集、测试与成本统计。",
        "output": "根因分析 Demo、逐例准确率与成本、对照实验；注明“历史题实践”。",
        "recognition": "阿里云官方主办，任务和专家答辩体现技术相关性。",
        "recognitionLimit": "未核实招聘优先政策；复现不是官方参赛或获奖，主办不等于保面试。",
        "primarySourceId": "ali-landing",
        "primaryLabel": "查看历史赛题",
        "dateSummary": "2025 赛事已截止；延期截止索引为 2025-11-16 24:00，时区未标。2027 同类赛未核实。"
      }
    },
    {
      "id": "tencent-taac-watch",
      "title": "腾讯广告算法大赛：历史样题＋等待2027公告",
      "kind": "competition",
      "priority": "only_if_search_recommendation_target",
      "employers": [
        "腾讯"
      ],
      "status": {
        "code": "registration_closed_historical",
        "label": "2026报名已截止；2027待公布",
        "registrationOpenVerified": false,
        "futureEdition": "2027赛题、时间、资格、权益均未公布或未核实。"
      },
      "dates": {
        "registrationStart": "2026-03-20T20:00:00+08:00",
        "registrationDeadline": "2026-04-24T20:00:00+08:00",
        "timeZone": "Asia/Shanghai（公告明确北京时间）",
        "conferenceWindow": [
          "2026-08-09",
          "2026-08-13"
        ],
        "note": "报名日期来自腾讯官方账号公告的腾讯云转载索引，动态规则页未完整读到；KDD官方确认2026赛道与会议日期。"
      },
      "eligibility": {
        "official": "2026公告区分学生学术赛道与社会人士工业赛道。细则的在籍认定、人数及利益冲突条件未完整核验。",
        "userFit": "博士在读与学术赛道方向相符，但须按新一届具体规则确认，不能当资格审核通过。"
      },
      "fees": {
        "registration": "未核实/公告未列",
        "compute": "2026公告说提供比赛GPU；该权益不外推2027，也不代表当前可申请。"
      },
      "officialWorkRequirements": "2026聚焦序列与非序列特征的统一推荐建模。当前能直接读取的官方2025 baseline是另一届题目，含序列模型与FAISS检索，不能混用为2026baseline。",
      "proposedDeliverable": [
        "合法公开数据上的训练/验证分离与官方历史baseline复现",
        "一项明确改进＋消融＋随机种子/算力/训练时间记录",
        "只有新届实际参赛才记录官方榜单、团队本人贡献与获奖；本地复现分数不能冒充名次"
      ],
      "skillIds": [
        "pytorch-training",
        "ml-validation",
        "statistics-metrics",
        "reproducible-workflow",
        "technical-interview"
      ],
      "learningUnitIds": [
        "u-torch",
        "u-leakage",
        "u-metrics",
        "u-git",
        "u-interview"
      ],
      "readinessGate": "仅在目标岗位转向搜索/推荐算法时选；PyTorch基础之后还需推荐系统、序列建模、检索指标与GPU训练实操。主线Agent应用阶段不为凑奖项临时转赛道。",
      "estimatedEffort": {
        "hours": [
          40,
          80
        ],
        "basis": "助手估计历史基线＋一次严谨对照；竞争名次通常需要更多团队与算力投入，不能预测。",
        "weeklyRule": "作为替代路线，不与Agent项目及论文一起叠加。"
      },
      "employerRecognition": {
        "type": "explicit_conditional_career_opportunity_and_historical_cases",
        "evidence": "2026腾讯公告对优秀选手提到实习/入职绿色通道机会；腾讯官网2025文章提供往届参赛者入职案例。",
        "limit": "条件面向优秀选手，报名、完赛、复现均不保证绿通/面试/offer；2027是否沿用待公告。"
      },
      "nextStep": "先用官方2025仓库做一个小规模训练/检索实验判断是否喜欢该方向，等2027官方公告再决定参赛；现在不报名。",
      "sourceIds": [
        "tencent-kdd",
        "tencent-announcement",
        "tencent-career-case",
        "tencent-baseline"
      ],
      "presentation": {
        "shortTitle": "腾讯广告算法大赛 · 等下一届",
        "tagline": "仅当目标转向搜索 / 推荐算法时考虑。",
        "participation": "可先看 2025 官方 baseline，做小规模训练 / 检索对照；2027 公告后再核资格。",
        "skills": "PyTorch、推荐与序列建模、检索指标、留出验证；可能需要 GPU。",
        "output": "可复现训练与检索实验、严谨对照、真实参赛名次或获奖记录。",
        "recognition": "2026 腾讯公告提到优秀选手的实习 / 入职绿色通道机会，也有往届入职案例。",
        "recognitionLimit": "仅为有条件的历史机会；报名、复现或完赛不保证面试，2027 权益待公告。",
        "primarySourceId": "tencent-baseline",
        "primaryLabel": "查看 2025 官方基线",
        "dateSummary": "2026 报名已于 4 月 24 日 20:00（北京时间）截止；2027 未公布或未核实。"
      }
    },
    {
      "id": "verl-contribution",
      "title": "verl：后训练/RL阶段的实质开源贡献",
      "kind": "open_source_activity",
      "priority": "later_post_training_stage",
      "employers": [
        "字节跳动/Seed"
      ],
      "status": {
        "code": "rolling_community",
        "label": "持续开源协作；后训练阶段再做",
        "registrationOpenVerified": false,
        "futureEdition": "没有年度报名窗口。招聘文字不等于确认任何具体实习名额。"
      },
      "dates": {
        "deadline": null,
        "timeZone": "不适用",
        "note": "按当前官方仓库与贡献指南；原volcengine/verl已迁至verl-project/verl。"
      },
      "eligibility": {
        "official": "贡献指南欢迎不同经验水平参与；招聘入口未给完整学位、毕业时间或出勤要求。",
        "userFit": "当前课程的u-torch只作前置，不能据此称已掌握PPO/GRPO、分布式训练或Agentic RL。"
      },
      "fees": {
        "registration": "不适用（开源协作）",
        "compute": "CPU文档/单元测试类任务可先选；GPU训练费用及资源未知，跑实验前确认。"
      },
      "officialWorkRequirements": "依贡献指南完成范围清晰的修复/功能，过lint、适用测试，更新相关文档；使用官方good first issue/call for contribution入口重新核题。",
      "proposedDeliverable": [
        "一个能解释的reward/数据处理/评测问题与失败测试",
        "可复现实验或修复及同预算对照，报告失败和限制",
        "上游PR及review/merge记录；算法类贡献需真实训练数据，不把文档修正包装成RL算法成果"
      ],
      "skillIds": [
        "pytorch-training",
        "ml-validation",
        "reproducible-workflow",
        "software-testing",
        "agent-evaluation"
      ],
      "learningUnitIds": [
        "u-torch",
        "u-leakage",
        "u-git",
        "u-pytest",
        "u-ci",
        "u-agent-evals"
      ],
      "readinessGate": "先完成Agent应用和检索评测，能训练/保存/评估模型后，另学SFT、奖励设计、PPO/GRPO及训练稳定性，再做后训练实验。CPU小修可早做，但不能冒充后训练熟练。",
      "estimatedEffort": {
        "hours": [
          30,
          60
        ],
        "basis": "助手对已有RL基础后的一项中小贡献估算，不含补足RL理论、GPU排队和上游评审；完整研究可能远超。",
        "weeklyRule": "以后阶段替代一项选修，不现在提前加课。"
      },
      "employerRecognition": {
        "type": "official_project_team_hiring_link",
        "evidence": "官方README明确由ByteDance Seed发起，末尾直接招RL for agents实习/FTE；贡献指南真实接受开源协作。",
        "limit": "证明项目和目标团队相关，未承诺贡献者优先录用；仓库列其他企业使用不代表那些企业统一认可任何PR。"
      },
      "nextStep": "当前只收藏官方贡献入口；进入后训练阶段再选可复现的CPU测试或小模型实验问题，不提前购买GPU。",
      "sourceIds": [
        "verl-main",
        "verl-contrib",
        "meituan-open-source"
      ],
      "presentation": {
        "shortTitle": "verl · 后训练阶段再做",
        "tagline": "先完成应用与检索评测，再补训练闭环和 RL 基础。",
        "participation": "按贡献指南选小范围 CPU 测试、数据处理或可复现问题；训练实验前确认算力与费用。",
        "skills": "PyTorch 训练闭环、测试与复现；算法贡献另需 SFT、奖励设计和 PPO / GRPO。",
        "output": "失败测试、修复与对照、上游 PR；文档小修不能写成 RL 算法成果。",
        "recognition": "ByteDance Seed 发起的官方项目，README 有 RL for agents 实习 / FTE 招聘入口。",
        "recognitionLimit": "证明项目与团队相关，没有贡献者优先录用承诺；具体岗位资格需另核。",
        "primarySourceId": "verl-contrib",
        "primaryLabel": "查看官方贡献指南",
        "dateSummary": "持续开源协作，无统一报名截止；现阶段先了解，不提前买 GPU。"
      }
    },
    {
      "id": "sigir-2027-research",
      "title": "SIGIR 2027：检索/Agent评测论文或研究成果",
      "kind": "conference_research_output",
      "priority": "stretch_with_advisor",
      "employers": [
        "美团（明确论文偏好旁证）",
        "搜索/推荐相关目标团队（须逐岗核实）"
      ],
      "status": {
        "code": "cfp_provisional",
        "label": "2027全文CFP已出现，日期暂定；其他分轨待公布",
        "registrationOpenVerified": false,
        "futureEdition": "CFP的OpenReview提交链接仍待补，不应显示“立即投稿”；workshop论文/demos等具体CFP未核实。"
      },
      "dates": {
        "abstractDeadline": "2027-01-14",
        "paperDeadline": "2027-01-21",
        "timeZone": "AoE（UTC−12，官网标示）",
        "deadlineTime": null,
        "provisional": true,
        "notification": "2027-04-05",
        "conferenceWindow": [
          "2027-07-18",
          "2027-07-24"
        ],
        "note": "全文CFP将这些日期显式标为PROPOSED；不把它们当最终DDL。会议主页标题19–24与正文18–24不一致，旅行日期需再核。"
      },
      "eligibility": {
        "official": "原创新工作、英文匿名投稿、作者OpenReview资料齐全；不应一稿多投。全文最多9页加参考文献。",
        "userFit": "博一可作为作者，但需导师与合作者确认问题价值、作者贡献、投稿许可和经费。完成课程/工程demo不自动达到论文创新门槛。"
      },
      "fees": {
        "submission": "本次未核实是否有投稿费",
        "registration": "2027作者/学生注册费未公开或未核实",
        "publication": "CFP提及ACM开放获取费用及作者注册参会要求；具体金额、机构协议/减免待核实",
        "travel": "美国线下交通、住宿、签证预算未知，不建议仅为证书付费旁听。"
      },
      "officialWorkRequirements": "完整原创IR研究与可核查实验；Agentic IR、检索增强、评测/成本质量取舍均在主题内。摘要须先提交，作者列表和匿名等以最终CFP为准。",
      "proposedDeliverable": [
        "与导师选一个窄研究问题，例如受预算约束检索Agent的证据质量/失败检测",
        "强基线、固定数据切分、消融、不确定性与成本统计；保留可匿名复现实验",
        "依最终分轨提交论文或系统成果；未录用标“在研/已投稿”，不能提前称发表"
      ],
      "skillIds": [
        "statistics-metrics",
        "ml-validation",
        "agent-evaluation",
        "reproducible-workflow",
        "technical-interview"
      ],
      "learningUnitIds": [
        "u-uncertainty",
        "u-leakage",
        "u-agent-evals",
        "u-git",
        "u-interview"
      ],
      "readinessGate": "先已有稳定检索/Agent评测、明确新问题和强对照，再让导师决定是否投稿；现有13技能不完整覆盖IR研究与论文写作。不要为了1月暂定DDL抢跑。",
      "estimatedEffort": {
        "hours": [
          80,
          160
        ],
        "basis": "助手对已有研究基础及数据的窄题研究/写作估计；从零通常更久，录用和投稿工期不可保证。",
        "weeklyRule": "应与博士研究合并，用科研预算时间推进，不塞进每周8小时就业学习之外。"
      },
      "employerRecognition": {
        "type": "explicit_named_venue_preference_with_role_scope",
        "evidence": "美团4697320023官方职位索引把SIGIR等创新论文列优先；Search Agent实习另对相关顶会论文有基本要求。",
        "limit": "前者是应届岗位，仅能证明技术偏好，不能推出本人具备该岗资格；全文、workshop论文、海报与旁听证书不可等同。"
      },
      "participationDistinctions": {
        "fullPaper": "实际录用并发表的同行评审成果；必须保留track及作者贡献。",
        "workshopOrChallenge": "按具体分会公布的审稿/出版规则写，不能简称SIGIR主会论文。",
        "attendanceOnly": "学习交流，可整理技术笔记；没有查到普通旁听证书带来目标雇主招聘加分的证据。"
      },
      "nextStep": "把现有检索评测整理成1页研究问题和baseline清单给导师讨论；最终CFP与经费未确认前不注册缴费。",
      "sourceIds": [
        "sigir-cfp",
        "sigir-home",
        "sigir-workshop",
        "meituan-papers",
        "meituan-open-source"
      ],
      "presentation": {
        "shortTitle": "SIGIR 2027 · 与导师讨论研究",
        "tagline": "已有研究问题与强基线，再判断是否适合投稿。",
        "participation": "整理一页研究问题和 baseline，与导师确认创新、作者贡献、投稿和经费。",
        "skills": "检索 / Agent 评测、统计与留出验证、消融、研究创新和英文论文写作。",
        "output": "可复现实验及实际投稿 / 录用成果；严格区分主会、workshop 与旁听。",
        "recognition": "美团官方岗位索引列 SIGIR 等论文偏好，相关 Search Agent 实习也看论文成果。",
        "recognitionLimit": "部分证据来自应届岗，仅作能力偏好；普通旁听不等于发表，也未查到证书招聘加分。",
        "primarySourceId": "sigir-cfp",
        "primaryLabel": "查看官方暂定 CFP",
        "dateSummary": "暂定：摘要 2027-01-14、全文 2027-01-21，AoE（UTC−12）。提交入口待补，不能当最终 DDL。"
      }
    }
  ],
  "sources": [
    {
      "id": "coze-sdk",
      "title": "CozeLoop Python SDK 官方仓库",
      "url": "https://github.com/coze-dev/cozeloop-python",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "Python SDK、Trace与Prompt能力、Python 3.8+、MIT许可、贡献入口与字节安全联系。",
      "accessNote": null
    },
    {
      "id": "coze-main",
      "title": "Coze Loop 官方仓库",
      "url": "https://github.com/coze-dev/coze-loop",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "Agent开发、评测、观测平台及官方SDK入口；主平台后端为Go，不等于Python SDK。",
      "accessNote": null
    },
    {
      "id": "coze-contrib",
      "title": "Coze Loop 主仓库贡献指南",
      "url": "https://github.com/coze-dev/coze-loop/blob/main/CONTRIBUTING.md",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "欢迎代码、文档与评审贡献；主仓库要求测试与代码评审，通过后合并；Apache-2.0与贡献许可。",
      "accessNote": "这是主仓库指南，不能把其Go测试命令或Apache许可套用到MIT许可的Python SDK。SDK自己的贡献指南链接本次无法读取，实际提PR前必须补读。"
    },
    {
      "id": "coze-issues",
      "title": "CozeLoop Python SDK issue列表",
      "url": "https://github.com/coze-dev/cozeloop-python/issues",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "可读到Trace、兼容与示例运行类问题。",
      "accessNote": "页面还显示issue创建受限；不能承诺用户可新建issue或任何现有issue尚无人处理，实际选题前重核状态。"
    },
    {
      "id": "verl-main",
      "title": "verl 官方仓库",
      "url": "https://github.com/verl-project/verl",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "README明确由ByteDance Seed发起、社区维护；包括PPO/GRPO与工具调用支持，并列RL for agents实习/FTE招聘入口。",
      "accessNote": "原volcengine/verl已迁移。招聘文案未列薪资、实习出勤或录用保证。"
    },
    {
      "id": "verl-contrib",
      "title": "verl 官方贡献指南",
      "url": "https://github.com/verl-project/verl/blob/main/CONTRIBUTING.md",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "欢迎bug修复、文档、功能及评审；提供good first issue和call for contribution入口；要求lint、相关测试和文档。",
      "accessNote": null
    },
    {
      "id": "ali-landing",
      "title": "2025 AI 原生编程挑战赛官网",
      "url": "https://tianchi.aliyun.com/specials/promotion/2025aicloudnativecompetition",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "AIOps真实故障定位任务、日志/链路/指标等数据、LLM与低成本准确定位；面向全球，含决赛答辩。",
      "accessNote": "静态宣传页仍显示原定10月30日截止和“立即报名”，不可当成2026报名中。"
    },
    {
      "id": "ali-rules",
      "title": "2025 AI 原生编程挑战赛详细赛制",
      "url": "https://tianchi.aliyun.com/competition/entrance/532387",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_index_body_unavailable",
      "supports": "官网搜索索引给出延期至2025-11-16 24:00、1–3人组队、实名认证与参赛限制。",
      "accessNote": "已实际打开，但直接页面只返回动态站点外壳；延期日期和资格只从同一官方URL索引读到，未独立读取动态正文。"
    },
    {
      "id": "ali-final",
      "title": "2025 AI 原生编程挑战赛决赛官方视频页",
      "url": "https://developer.aliyun.com/live/255616",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "2026-01-20发布的决赛页确认阿里云主办、AIOps赛题与六队决赛；证明2025赛事已进入收官阶段。",
      "accessNote": null
    },
    {
      "id": "tencent-kdd",
      "title": "KDD 2026 官方主页",
      "url": "https://kdd2026.kdd.org/",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "2026-08-09至13日会议，官方KDD Cup导航直接链接Tencent UNI-REC Challenge至algo.qq.com。",
      "accessNote": null
    },
    {
      "id": "tencent-announcement",
      "title": "腾讯官方企鹅号公告的腾讯云转载",
      "url": "https://developer.cloud.tencent.cn/news/3700707",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_account_republication_index",
      "supports": "2026统一建模挑战；报名3月20日20:00至4月24日20:00北京时间；学生学术赛道与社会工业赛道；优秀选手有实习/入职绿色通道机会。",
      "accessNote": "索引注明文章来源“企鹅号-腾讯”，并链接腾讯原文；两种腾讯云域名与原文均尝试打开但超时/不可读。不能称动态规则完整核验。"
    },
    {
      "id": "tencent-career-case",
      "title": "腾讯官方：从学生到腾讯工程师",
      "url": "https://www.tencent.com/zh-cn/from-students-to-tencent-engineers-how-an-algorithm-competition-helps-launch-3-careers-in-tech/",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "2025-07-24官方讲述三位往届参赛者入职腾讯广告的案例；只支持存在历史路径。",
      "accessNote": null
    },
    {
      "id": "tencent-baseline",
      "title": "腾讯TAAC2025官方baseline",
      "url": "https://github.com/TencentAdvertisingAlgorithmCompetition/baseline_2025",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "官方SASRec/Transformer训练、评估、FAISS检索基线，可作往届练习；不是TAAC2026赛题或报名。",
      "accessNote": null
    },
    {
      "id": "sigir-cfp",
      "title": "SIGIR 2027 Full Paper CFP",
      "url": "https://sigir2027.org/pages/submit-full.html",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "Agentic IR及检索评测主题；摘要1月14日、全文1月21日AoE且显式PROPOSED；9页英文匿名稿、不含参考文献；OpenReview入口待补；作者注册/参会要求。",
      "accessNote": null
    },
    {
      "id": "sigir-home",
      "title": "SIGIR 2027 官方主页",
      "url": "https://sigir2027.org/",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "会议正文为2027-07-18至24日San Jose；短文/demo/resource/workshop等仍TBA。",
      "accessNote": "页面标题显示July19–24，正文显示July18–24，保留不一致，不据此订旅行。CFP日程仍标暂定。"
    },
    {
      "id": "sigir-workshop",
      "title": "SIGIR 2027 workshop proposals页",
      "url": "https://sigir2027.org/pages/submit-workshops.html",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "workshop征集页存在但内容仍待补，不应伪造某workshop论文截止。",
      "accessNote": null
    },
    {
      "id": "meituan-open-source",
      "title": "美团大模型Search Agent实习4748418063",
      "url": "https://zhaopin.meituan.com/web/position/detail?highlightType=campus&jobUnionId=4748418063",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_index_body_unavailable",
      "supports": "官方索引：2026-09-20；知名LLM/Agent社区持续贡献、竞赛获奖为优先；相关顶会论文列在基本要求。",
      "accessNote": "已实际打开官方职位并试career域名，超时或动态正文不可读；只作雇主需求证据，不确认HC或本人资格。"
    },
    {
      "id": "meituan-papers",
      "title": "美团大模型应用算法工程师4697320023",
      "url": "https://career.meituan.com/web/position/detail?highlightType=campus&jobUnionId=4697320023",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_index_body_unavailable",
      "supports": "官方索引将SIGIR等创新论文/最新算法应用实践、ACM/Kaggle靠前名次列为优先。",
      "accessNote": "已实际打开，正文动态不可读；这是应届校招岗位，仅作能力偏好旁证，不能当用户可投实习。"
    },
    {
      "id": "baidu-agent",
      "title": "百度Agent算法实习J104743",
      "url": "https://talent.baidu.com/jobs/detail/INTERN/22b11ac9-3920-4236-b079-49e13f5d08d3",
      "checkedAt": "2026-10-12",
      "evidenceType": "official_body_read",
      "supports": "官方正文：检索/重排、LLM评测、样本构建、留出验证、可复现实验和代码规范与该实习工作直接相关；未说参加某活动可获优先。",
      "accessNote": null
    }
  ],
  "excludedOrWatchOnly": [
    {
      "title": "火山杯Agent创新大赛2026",
      "url": "https://www.volcengine.com/activity/agent/competition/2026",
      "reason": "官方活动入口实际打开只返回JS外壳；合作赛官网证明赛事存在，但未完整核实符合北航个人参赛资格的独立赛、当前报名与deadline，不列立即可报。"
    },
    {
      "title": "SMP2026大模型图网络决策挑战赛",
      "url": "https://tianchi.aliyun.com/competition/",
      "reason": "官方列表索引显示8/30–10/23与立即报名，但动态页未读取当前规则；主办为学会，天池平台承办不能写成阿里招聘认可。"
    },
    {
      "title": "蚂蚁灵波具身大模型挑战赛",
      "url": "https://tianchi.aliyun.com/competition/entrance/532514/introduction",
      "reason": "官方索引有10/26截止，但偏VLA/机器人，训练资源与新领域负担大；蚂蚁不等同阿里招聘，当前主线不建议加入。"
    },
    {
      "title": "阿里云Data+AI工程师全球大奖赛",
      "url": "https://tianchi.aliyun.com/competition/entrance/532448",
      "reason": "DeepSearch题方向合适，但当前官方动态赛程未读到，宣传文章发布时间与叙述起始月份不一致；先保留线索，不冒充当前开放赛事。"
    },
    {
      "title": "普通技术大会/训练营参会证书",
      "reason": "可用于学习交流；没有核实目标雇主仅凭出席证书给招聘优先，不建议为证书挤占作品/实验时间。"
    }
  ],
  "integrationNotes": [
    "所有skillIds/learningUnitIds均来自当前career-curriculum.json，映射是准备建议，非雇主指定或认证。",
    "保持当前路线、薪资筛选与16条岗位目录不变；本数据不自动写技能通过或课程完成。",
    "推荐标题不要用“大厂必认/保面试/直通offer”；把雇主证据类型、年份与限制同时显示。",
    "如以后需要报名、接受比赛协议、上传作品/个人信息或缴费，重新检查规则并按授权执行。"
  ]
};
