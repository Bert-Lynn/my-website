// Generated public data. Edit data/internships.json and run node scripts/build-career-data.cjs.
window.INTERNSHIP_DATA = {
  "schemaVersion": "1.0",
  "verifiedAt": "2026-10-19",
  "target": {
    "country": "中国大陆",
    "currency": "CNY",
    "unit": "day",
    "salaryMin": 400,
    "salaryMax": 600,
    "internshipYear": 2027
  },
  "disclaimer": "这是一份为2027年准备的岗位与证据地图，不是录用承诺或实时招聘保证。薪资按具体页面原始区间记录；未公开不等于无薪。历史岗位只作路线/薪资样本，不能计为当前可投。",
  "criticalCaveats": [
    "2027年去实习不等于2027届毕业生；低年级博士优先日常实习、项目实习、科研实习，先核对预计毕业日期。",
    "本次尚未核实同时具备当前可投证据、公开400–600日薪区间、明确适用资格的岗位；官网可检索且未公开薪资的岗位仍列作待确认机会。",
    "公开标价不是实际到手；问清税前/税后、出勤计薪、博士档、餐住补贴是否另算、合同主体。",
    "多数相关实习要求每周4–5天、连续3–6个月。每周8小时是准备阶段学习预算，不能当作到岗安排；需先与导师协调。",
    "官网动态页面抓取不全时，保留官方链接和聚合正文来源，不伪装成官网已核实。",
    "未联系招聘方、未投递、未注册账号。"
  ],
  "roleFamilies": [
    {
      "id": "decision_optimization",
      "label": "运筹/定价/决策优化",
      "recommendation": "第一主线",
      "reason": "利用管理科学、选择模型、航空需求研究的既有优势"
    },
    {
      "id": "forecasting_ml",
      "label": "需求预测/应用机器学习",
      "recommendation": "与第一主线合并",
      "reason": "让预测进入容量、库存或预算决策，展示业务价值"
    },
    {
      "id": "agent_engineering",
      "label": "Agent应用/算法工程",
      "recommendation": "第二主线",
      "reason": "把成熟分析与优化工具封装为可测试、可观测、可控的产品"
    },
    {
      "id": "search_recommendation",
      "label": "搜索/推荐/增长算法",
      "recommendation": "可迁移扩展",
      "reason": "需要额外补召回排序、A/B和因果评估，勿同时全面展开"
    },
    {
      "id": "foundation_model_research",
      "label": "基座/多模态/Agentic RL研究",
      "recommendation": "暂不作为主线",
      "reason": "通常需要更深模型训练与科研积累，学习成本显著更高"
    }
  ],
  "recommendedReferenceRoleIds": [
    "baidu_business_j92971",
    "meituan_forecasting",
    "jd_or_intern",
    "alibaba_logistics_or_agent",
    "xiaohongshu_agent_engine",
    "baidu_agent_j104743",
    "bytedance_tts_algo_engineering",
    "didi_passenger_pricing"
  ],
  "recommendedReferenceLabel": "8个原有准备方向对照（新增岗位另列证据库；并非8个正在招聘的400–600元岗位）",
  "evidenceLabels": {
    "exact_target": "该岗位标价全段落在400–600内；仍须看状态",
    "overlap_only": "仅部分重合，含只触及400端点",
    "undisclosed": "未公开",
    "below_target": "低于目标",
    "conflicting": "证据冲突，不采用"
  },
  "statusLabels": {
    "closed": "已结束/历史",
    "public_page_unconfirmed": "公开页可读，当前HC未确认",
    "publisher_page_unconfirmed": "招聘平台显示可投，HC未独立确认",
    "aggregator_unconfirmed": "聚合线索，未完成官网复核"
  },
  "companies": [
    {
      "company": "京东",
      "companyEn": "JD",
      "overallFinding": "运筹、供应链决策与专业最贴合。当前可读实习僧岗位标价200–400；另有450–500历史岗位，但要求偏资深。",
      "targetSalaryEvidence": "历史具体岗位有目标区间标价；不能推断普通运筹实习统一400–600。",
      "officialCareersUrl": "https://campus.jd.com/",
      "roles": [
        {
          "id": "jd_or_intern",
          "title": "算法工程师-运筹优化",
          "roleFamily": "decision_optimization",
          "location": "北京",
          "salary": {
            "min": 200,
            "max": 400,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "overlap_only",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "200–400元/天",
            "note": "仅400元端点触及目标下限，不能当作400–600岗位"
          },
          "status": {
            "value": "publisher_page_unconfirmed",
            "label": "平台可投页，未独立确认HC",
            "sourceDate": "2026-01-23",
            "caveat": "页面写截止2027-01-23；2026-01-23刷新较久，需重新核实。"
          },
          "internshipType": "在校生实习",
          "eligibility": "本科及以上在校生；27届优先，并非页面明确仅限27届。运筹、工业工程、数学、统计等相关背景。",
          "attendance": "5天/周，3个月",
          "skillsRequired": [
            "Python/Java/C/C++/R至少一门",
            "运筹或机器学习基础",
            "把定价、库存、调度需求转为模型并实现"
          ],
          "skillsPreferred": [
            "项目经验",
            "关系数据库、Linux、脚本能力"
          ],
          "fit": "主线目标。航空需求/选择研究可迁移到定价、库存、容量配置；薪资是主要待核实项。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://www.shixiseng.com/intern/inn_ow94fr9nvxye?pcm=pc_SearchList",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "岗位、薪资、刷新/截止日期、在校生/27届优先、出勤和技能",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "optimization-modeling"
            ],
            "supportingSkillIds": [
              "ai-code",
              "sql-data",
              "ml-validation",
              "reproducible-workflow",
              "decision-evaluation",
              "api-delivery",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "完整编码能力与数据结构基础，不能仅用一个脚本的验收替代。",
              "该课程只覆盖小规模MIP/容量配置；岗位实际定价、库存、网络调度场景需针对团队补充。",
              "机器学习常用算法的理论广度仍需按面试要求补齐。"
            ],
            "mappingNote": "选择JD允许的运筹方向对照；关系数据库和Linux是优先项，不把整套工程课程视为硬门槛。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "sql-data"
            ],
            "directCoverageNotes": {
              "optimization-modeling": "对应业务建模、模型实现与运筹基础；只证明课程所选模型范围，不等于熟悉所有运筹算法。"
            },
            "nonSkillBlockers": [
              "公开标价200–400元/天，仅触及目标下限。",
              "27届优先；需确认毕业较晚的在校博士是否接收。",
              "平台显示截止2027-01-23，当前HC需再次确认；5天/周、3个月。"
            ],
            "sourceUrls": [
              "https://www.shixiseng.com/intern/inn_ow94fr9nvxye?pcm=pc_SearchList"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "jd_or_salary_history",
          "title": "运筹优化算法工程师（历史薪资样本）",
          "roleFamily": "decision_optimization",
          "location": "北京",
          "salary": {
            "min": 450,
            "max": 500,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "exact_target",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "450–500元/天",
            "note": "历史招聘标价落在目标内；页面已结束，不能视为当前offer"
          },
          "status": {
            "value": "closed",
            "label": "已结束，历史样本",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "实习",
          "eligibility": "硕士及以上，明确含管理科学工程；但要求至少3年供应链最优化/启发式项目经验。",
          "attendance": "5天/周，至少3个月",
          "skillsRequired": [
            "线性/整数/非线性/动态规划，或启发式算法",
            "复杂业务抽象与生产系统落地",
            "Python/Java/C#/C++至少一门"
          ],
          "skillsPreferred": [
            "在线优化闭环",
            "运筹论文",
            "ML/DL/LLM项目"
          ],
          "fit": "方向高度贴合，但三年项目门槛使其不适合作为博士二年级的默认入门岗。",
          "priority": "salary_reference",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/394654",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "450–500/天、已结束、管理科学工程、3年项目要求",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "optimization-modeling"
            ],
            "supportingSkillIds": [
              "ai-code",
              "reproducible-workflow",
              "api-delivery",
              "software-testing",
              "decision-evaluation",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "至少3年供应链最优化/启发式项目经验，课程不能替代。",
              "线性/整数/非线性/动态规划的深入掌握，或遗传/模拟退火/粒子群/ALNS的实现与改进；课程仅覆盖其中基础子集。",
              "物流或电信网络领域理解、复杂生产系统融合与高效算法工程。"
            ],
            "mappingNote": "仅把约束建模映射为直接部分；部署、测试和对照评估是辅助作品建议，不能替代资深项目经历。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "pytorch-training"
            ],
            "directCoverageNotes": {
              "optimization-modeling": "覆盖变量、目标、约束、求解状态与小实例验证；不覆盖全部优化理论、启发式与工业规模调优。"
            },
            "nonSkillBlockers": [
              "已结束的历史薪资样本。",
              "5天/周、至少3个月。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/394654"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        }
      ],
      "sources": [
        {
          "url": "https://job.xidian.edu.cn/teachin/view/id/126566",
          "type": "university_employer_notice",
          "checkedAt": "2026-10-10",
          "supports": "核实京东官方校园投递入口；该宣讲活动已过期，不用其月薪当实习日薪",
          "accessNote": "网页正文或搜索索引可读"
        }
      ]
    },
    {
      "company": "字节跳动",
      "companyEn": "ByteDance",
      "overallFinding": "供应链算法工程是现实备选，运筹算法也贴专业；必须区分日常实习与2027届毕业生ByteIntern。",
      "targetSalaryEvidence": "算法工程历史岗位500–510/天匹配目标；公开当前HC、2027未来薪资未确认。",
      "officialCareersUrl": "https://jobs.bytedance.com/campus",
      "roles": [
        {
          "id": "bytedance_tts_algo_engineering",
          "title": "TikTok Shop算法工程实习生",
          "roleFamily": "agent_engineering",
          "location": "杭州",
          "salary": {
            "min": 500,
            "max": 510,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "exact_target",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "500–510元/天",
            "note": "具体历史岗位标价；不表示所有字节实习都为此标准"
          },
          "status": {
            "value": "closed",
            "label": "已结束，技能与薪资参考",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "日常实习",
          "eligibility": "面向全体在校生，本科及以上；计算机/软件/信息技术/数学等相关专业优先。",
          "attendance": "至少4天/周，3个月以上",
          "skillsRequired": [
            "Python/Go/Java等一种后端语言",
            "计算机基础和工程实现",
            "数据生产链路与算法架构"
          ],
          "skillsPreferred": [
            "机器学习、AI大模型或运筹课程/项目",
            "Redis/MongoDB、消息队列、搜索引擎"
          ],
          "fit": "可用需求预测→优化→服务化项目证明数据/算法工程能力。管理科学专业是否认可需招聘方确认。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/441854",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "500–510/天、已结束、日常实习面向在校生、4天/3个月、技能",
              "accessNote": "搜索索引全文可读；直接打开不稳定"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "api-delivery"
            ],
            "supportingSkillIds": [
              "ai-code",
              "sql-data",
              "reproducible-workflow",
              "software-testing",
              "optimization-modeling",
              "ml-validation",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "计算机理论、后端工程和数据结构的系统基础。",
              "生产级数据链路、高可用/高性能架构与分布式系统，课程本地API只是起点。",
              "Redis/MongoDB、消息队列、搜索引擎等基础组件为JD优先项，当前课程未系统教授。"
            ],
            "mappingNote": "接口交付只对应后端实现的入门部分；数据质量和运筹项目是支持证据。该岗不是Agent专岗，不把Agent作为雇主硬性要求。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "optimization-modeling"
            ],
            "directCoverageNotes": {
              "api-delivery": "对应后端实现与模块复用的基础能力；课程FastAPI演示不等于大规模算法架构经验。"
            },
            "nonSkillBlockers": [
              "页面已结束；历史500–510元/天不代表2027仍有同岗。",
              "日常实习面向在校生，但专业是否适配需确认；至少4天/周、3个月。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/441854"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "bytedance_ecommerce_or",
          "title": "运筹优化算法实习生-抖音电商",
          "roleFamily": "decision_optimization",
          "location": "杭州",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "薪资未公开",
            "note": "未公开薪资；不代表无薪，也不能假定达到目标"
          },
          "status": {
            "value": "aggregator_unconfirmed",
            "label": "聚合页显示招聘中；官网正文未取到",
            "sourceDate": "2026-08-11",
            "caveat": "此为聚合收录日期，不是官方发布日期；不能确认当前可投。"
          },
          "internshipType": "ByteIntern转正实习",
          "eligibility": "明确2027届硕士及以上，毕业窗口2026-09至2027-08；不适合毕业较晚的低年级博士直接按此届别投。",
          "attendance": "未公开",
          "skillsRequired": [
            "Java/Python",
            "运筹建模",
            "PyTorch/TensorFlow"
          ],
          "skillsPreferred": [
            "供应链/物流实际建模",
            "相关高水平论文"
          ],
          "fit": "方向吻合，但这条具体岗位有毕业届别硬门槛。2027应寻找日常/科研实习同类岗位。",
          "priority": "eligibility_warning",
          "sources": [
            {
              "url": "https://jobs.bytedance.com/campus/position/7597373332220741941/detail",
              "type": "official",
              "checkedAt": "2026-10-10",
              "supports": "官方职位链接和标题可核实；正文动态加载",
              "accessNote": "只显示校园招聘标题"
            },
            {
              "url": "https://jobs.ultraai.site/jobs/bytedance_campus/7597373332220741941",
              "type": "aggregator",
              "checkedAt": "2026-10-10",
              "supports": "正文、届别、收录日期；未提供薪资",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "optimization-modeling",
              "pytorch-training"
            ],
            "supportingSkillIds": [
              "ai-code",
              "sql-data",
              "statistics-metrics",
              "ml-validation",
              "decision-evaluation",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "即时配送/物流的网络规划、订单分配、合单、路径优化建模与实际项目。",
              "统计推断与运筹结合的机制设计，当前容量分配项目不能覆盖全部业务。",
              "JD要求熟练训练框架，课程小MLP仅是最低入门证据；需按实际团队模型补充。"
            ],
            "mappingNote": "PyTorch在全局路线虽为选修，这条JD明确要求框架能力，若以它为目标便需补学；具体岗位有届别限制。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {
              "optimization-modeling": "对应物流决策的建模基础，尚未教授大规模物流求解。",
              "pytorch-training": "对应训练框架基础子能力，不能据一次MLP练习声称熟练。"
            },
            "nonSkillBlockers": [
              "标题/正文明确2027届，毕业窗口2026-09至2027-08。",
              "官网正文未取得，技能来自聚合转引；当前HC和薪资未确认。"
            ],
            "sourceUrls": [
              "https://jobs.bytedance.com/campus/position/7597373332220741941/detail",
              "https://jobs.ultraai.site/jobs/bytedance_campus/7597373332220741941"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        }
      ],
      "sources": [
        {
          "url": "https://seed.bytedance.com/zh/seedearlycareer",
          "type": "official",
          "checkedAt": "2026-10-12",
          "supports": "Seed项目级实习通道面向2027年9月及以后毕业的在读学生；没有公开数值日薪。它与2027届ByteIntern是不同通道，不证明某具体岗位的当前HC。",
          "accessNote": "官网项目正文直接可读；不是具体职位详情。"
        }
      ]
    },
    {
      "company": "美团",
      "companyEn": "Meituan",
      "overallFinding": "酒店/销量预测、调度评测与航空需求研究贴合；公开薪资证据为宽区间，不能保证400元以上。",
      "targetSalaryEvidence": "预测岗位200–500/天仅部分重合；未核实适合本用户的当前400–600具体岗位。",
      "officialCareersUrl": "https://join.meituan.com/web/position",
      "roles": [
        {
          "id": "meituan_forecasting",
          "title": "预测方向算法工程师（实习）",
          "roleFamily": "forecasting_ml",
          "location": "北京望京",
          "salary": {
            "min": 200,
            "max": 500,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "overlap_only",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "200–500元/天",
            "note": "只有400–500这一段与目标重合；不能按500元预算"
          },
          "status": {
            "value": "public_page_unconfirmed",
            "label": "岗位正文可读；发布日期与当前HC未知",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "实习，项目类型未写明",
          "eligibility": "硕士/博士在读，含数理统计、运筹优化等相关专业。",
          "attendance": "4天/周，4个月",
          "skillsRequired": [
            "算法与编码基础",
            "数据处理、特征工程、误差分析",
            "了解PyTorch/TensorFlow"
          ],
          "skillsPreferred": [
            "时序预测或NLP项目",
            "Transformer、Seq2Seq、N-BEATS、DeepAR"
          ],
          "fit": "主线高适配。先做季节基线与树模型，再增加一个深度预测对照，避免只堆模型名。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://mnowpick.nowcoder.com/m/detail/index?channel=newCompanyPage&jobId=311880&pageSource=5012",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "200–500/天、出勤、运筹/统计背景、时序预测技能",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "sql-data",
              "time-forecast",
              "pytorch-training"
            ],
            "supportingSkillIds": [
              "ai-code",
              "statistics-metrics",
              "ml-validation",
              "reproducible-workflow",
              "software-testing",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "Transformer、Seq2Seq、N-BEATS、DeepAR属于JD优先项，基础时序/MLP课程并未完整覆盖。",
              "大规模酒店/销量预测的业务特征与分布变化需另做团队化验证。",
              "算法与代码能力需通过独立实现/调试进一步检验。"
            ],
            "mappingNote": "SQL与数据质量单元只映射其pandas清洗/特征部分；原JD未写SQL硬门槛。PyTorch为此岗位要求的“了解框架”，不是泛指所有岗位都必修。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "time-forecast"
            ],
            "directCoverageNotes": {
              "sql-data": "对应数据处理与特征工作；SQL语法本身是本路线附加准备。",
              "time-forecast": "直接对应时序预测、模型对照和case分析。",
              "pytorch-training": "对应了解PyTorch/TensorFlow的基础训练闭环；进阶深度时序模型尚未覆盖。"
            },
            "nonSkillBlockers": [
              "200–500元/天仅部分重合，当前HC及发布日期未知。",
              "4天/周、4个月。"
            ],
            "sourceUrls": [
              "https://mnowpick.nowcoder.com/m/detail/index?channel=newCompanyPage&jobId=311880&pageSource=5012"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "meituan_planning_eval",
          "title": "无人车业务部-决策规划行为模型项目实习生",
          "roleFamily": "decision_optimization",
          "location": "北京",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "薪资未公开",
            "note": "未公开薪资；不代表无薪，也不能假定达到目标"
          },
          "status": {
            "value": "closed",
            "label": "官网显示当前职位无法投递",
            "sourceDate": "2026-09-10",
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "日常项目实习",
          "eligibility": "官网推荐无转正需求的低年级在校生；未给明确毕业窗口。",
          "attendance": "长期且尽快到岗优先；没有明确每周/月份数字",
          "skillsRequired": [
            "SQL+Python数据开发，或后端/全栈，或C++决策规划中的一项",
            "逻辑、独立解决问题、沟通与抽象能力"
          ],
          "skillsPreferred": [
            "评测/规划控制/数据研发项目",
            "机器学习、行为建模、时序决策经验"
          ],
          "fit": "可把仿真、约束检查、离线评测和监控作为项目亮点。无需把自动驾驶感知训练加入主线。",
          "priority": "secondary",
          "sources": [
            {
              "url": "https://zhaopin.meituan.com/web/position/detail?highlightType=campus&jobUnionId=4757787198",
              "type": "official",
              "checkedAt": "2026-10-10",
              "supports": "2026-09-10更新、无法投递、日常项目实习、技能与低年级说明",
              "accessNote": "官方搜索索引全文可读；直接抓取超时"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "sql-data"
            ],
            "supportingSkillIds": [
              "ai-code",
              "api-delivery",
              "software-testing",
              "statistics-metrics",
              "ml-validation",
              "reproducible-workflow",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "真实无人车数据集、判别器口径与场景评测体系仍需业务学习。",
              "若选择规划算法分支，需另补C++、搜索/优化、learning-based planning或控制经验；不能由SQL分支自动覆盖。",
              "多车调度服务、现场运营工具与大规模工程的可靠性超出本地项目。"
            ],
            "mappingNote": "JD允许数据开发、全栈、后端或规划中的任一分支；这里选择最贴本路线的SQL+Python分支，不能把全部分支当作已满足。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {
              "sql-data": "对应JD明确列出的SQL+Python数据开发分支，Python完整工程能力仍需另验。"
            },
            "nonSkillBlockers": [
              "2026-09-10更新的官网页显示当前无法投递。",
              "长期实习且尽快入职优先；明确出勤数字未公开。"
            ],
            "sourceUrls": [
              "https://zhaopin.meituan.com/web/position/detail?highlightType=campus&jobUnionId=4757787198"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        }
      ],
      "sources": []
    },
    {
      "company": "小红书",
      "companyEn": "Xiaohongshu",
      "overallFinding": "官方Agent工程实习允许用真实工程作品证明能力，是比基座/Agentic RL研究更可学的入口。",
      "targetSalaryEvidence": "官方引擎Agent岗薪资未公开；另一个历史社区增长后端Agent岗400–500/天，不能套给当前岗。",
      "officialCareersUrl": "https://job.xiaohongshu.com/campus",
      "roles": [
        {
          "id": "xiaohongshu_agent_engine",
          "title": "AI Agent研发实习生-引擎架构",
          "roleFamily": "agent_engineering",
          "location": "北京",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "薪资未公开",
            "note": "未公开薪资；不代表无薪，也不能假定达到目标"
          },
          "status": {
            "value": "public_page_unconfirmed",
            "label": "官网岗位可检索，HC待确认",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "在校生研发实习",
          "eligibility": "本科及以上在校生；无明确毕业届别限制。",
          "attendance": "每周4天以上稳定实习，6个月以上优先",
          "skillsRequired": [
            "Java/Python/Go/C++至少一门、工程基础",
            "真实做过AI工具/Agent demo/自动化脚本/工程项目",
            "问题拆解、主动使用AI编码和排障"
          ],
          "skillsPreferred": [
            "后端、分布式、稳定性、可观测",
            "Tool Calling、RAG、Workflow实践"
          ],
          "fit": "可学的第二主线。作品应有真实工具接口、受控执行、任务成功率/错误分析和日志，不能只有聊天界面。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://job.xiaohongshu.com/campus/position/21231",
              "type": "official",
              "checkedAt": "2026-10-10",
              "supports": "正式岗位名称、在校生/出勤、语言/项目门槛、Agent工程职责",
              "accessNote": "官方搜索索引全文可读；直接抓取超时"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "ai-code",
              "api-delivery",
              "agent-evaluation"
            ],
            "supportingSkillIds": [
              "reproducible-workflow",
              "software-testing",
              "ml-validation",
              "statistics-metrics",
              "sql-data",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "企业级Agent Runtime/Workflow、记忆管理和框架可治理性；课程仅有受控工具循环。",
              "分布式系统、稳定性、日志/Trace/指标的生产级可观测体系。",
              "搜索/推荐/广告引擎的业务链路和真实系统工具接入。"
            ],
            "mappingNote": "JD明确重视真实动手项目、AI辅助编码/排障、工具接入与评测；三个直接单元对应这些部分。未把企业级基础设施要求缩减成聊天Demo。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {
              "ai-code": "对应主动用AI提升编码和排查效率，且必须有本人审查/调试证据。",
              "api-delivery": "对应可运行工程项目及真实能力接口的基础。",
              "agent-evaluation": "对应工具调用与任务成功率/失败分析；课程不覆盖完整企业Agent底座。"
            },
            "nonSkillBlockers": [
              "官方页可检索、当前HC需确认；日薪未公开。",
              "至少4天/周，6个月以上优先。"
            ],
            "sourceUrls": [
              "https://job.xiaohongshu.com/campus/position/21231"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "xiaohongshu_growth_agent_history",
          "title": "社区增长Agent后端研发（历史样本）",
          "roleFamily": "agent_engineering",
          "location": "北京",
          "salary": {
            "min": 400,
            "max": 500,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "exact_target",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "400–500元/天",
            "note": "历史不同团队岗位，不能转嫁到引擎架构岗"
          },
          "status": {
            "value": "closed",
            "label": "已结束，历史薪资样本",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "实习",
          "eligibility": "本科及以上，计算机相关专业；在校生优先。",
          "attendance": "5天/周，至少3个月",
          "skillsRequired": [
            "Java/Python/Go等一种后端语言基础",
            "数据结构算法基础",
            "AI辅助需求拆解、编码、调试"
          ],
          "skillsPreferred": [
            "Agent/LLM实践",
            "已有实习经历"
          ],
          "fit": "比模型预训练岗门槛更可拆解，但仍需后端基本功与代码验证。",
          "priority": "salary_reference",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/432965",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "400–500/天、已结束、Agent后端、基本技能与出勤",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "ai-code",
              "api-delivery"
            ],
            "supportingSkillIds": [
              "agent-evaluation",
              "software-testing",
              "reproducible-workflow",
              "ml-validation",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "后端语言、数据结构和算法基础的系统熟练度。",
              "社区增长业务系统与真实Agent落地经验；课程原型不能当作企业实习成果。"
            ],
            "mappingNote": "JD直接要求AI辅助需求拆解/编码/调试和后端基础；Agent/LLM既有经验列为优先，故课程Agent安全评测放支持项。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "agent-evaluation"
            ],
            "directCoverageNotes": {
              "ai-code": "对应AI工具辅助研发提效与调试。",
              "api-delivery": "对应后端基础代码与模块交付的入门部分，不能替代完整后端知识。"
            },
            "nonSkillBlockers": [
              "已结束的400–500元/天历史样本，不可套给当前引擎Agent岗位。",
              "5天/周，至少3个月。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/432965"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        }
      ],
      "sources": [
        {
          "url": "https://job.xiaohongshu.com/campus?jobType=tech&workplace=all",
          "type": "official",
          "checkedAt": "2026-10-10",
          "supports": "区分2027届校园招聘、在校生实习和Ace顶尖实习项目",
          "accessNote": "网页正文或搜索索引可读"
        }
      ]
    },
    {
      "company": "多邻国",
      "companyEn": "Duolingo",
      "overallFinding": "本次官方北京岗位检索未发现符合方向的实习。北京展示职位集中于较资深工程、设计、产品。",
      "targetSalaryEvidence": "未发现可核实的中国400–600元/天相关实习；不引用美国实习薪资换算。",
      "officialCareersUrl": "https://careers.duolingo.com/?location=Beijing%2C+China",
      "roles": [],
      "sources": [
        {
          "url": "https://careers.duolingo.com/?location=Beijing%2C+China",
          "type": "official",
          "checkedAt": "2026-10-10",
          "supports": "北京岗位列表未见实习；不能推导公司永远不招实习",
          "accessNote": "搜索索引列出北京职位；直接打开需JavaScript"
        },
        {
          "url": "https://careers.duolingo.com/?department=University",
          "type": "official",
          "checkedAt": "2026-10-10",
          "supports": "当前可索引大学生职位为Detroit插画实习，不能当中国技术实习",
          "accessNote": "网页正文或搜索索引可读"
        }
      ]
    },
    {
      "company": "滴滴",
      "companyEn": "DiDi",
      "overallFinding": "新增北京Marketplace Agent应用、杭州L Lab客服Agent评测两条平台候选；均300–500元/天，HC未独立确认。",
      "targetSalaryEvidence": "两条10月13–15日刷新具体帖300–500元/天，仅部分重合，不保证400元底薪；原定价岗保留关闭历史。",
      "officialCareersUrl": "https://campus.didiglobal.com/",
      "roles": [
        {
          "id": "didi_passenger_pricing",
          "title": "乘客定价算法实习（历史样本）",
          "roleFamily": "decision_optimization",
          "location": "北京",
          "salary": {
            "min": 300,
            "max": 350,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "below_target",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "300–350元/天",
            "note": "列表300–350；岗位正文明确320元/天。低于目标。"
          },
          "status": {
            "value": "closed",
            "label": "已结束；2025届转正历史样本",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "转正导向实习",
          "eligibility": "2025年毕业硕士优先；该历史窗口不适合用户未来直接申请。",
          "attendance": "正文至少4天/周、3个月，最好半年；列表5天/周",
          "skillsRequired": [
            "ML/数据挖掘基础",
            "Python/Java/C++",
            "SQL、Spark"
          ],
          "skillsPreferred": [
            "Uplift、收益管理、归因、强化学习",
            "供需与价格弹性模型"
          ],
          "fit": "研究适配高，但需找到日常实习新岗位并重新谈薪；不能把公司名等同400+。",
          "priority": "secondary",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/311944",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "已结束、2025届优先、正文320/天、技能与出勤",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "sql-data",
              "statistics-metrics"
            ],
            "supportingSkillIds": [
              "ai-code",
              "ml-validation",
              "time-forecast",
              "optimization-modeling",
              "decision-evaluation",
              "reproducible-workflow",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "Spark大数据处理。",
              "因果推断、价格弹性、Uplift与收益管理，简单需求回归或离线对照不等于因果建模。",
              "深入机器学习/数据挖掘及供需匹配模型；强化学习是优先经验但当前路线未教。"
            ],
            "mappingNote": "直接对应取数与效果分析；预测/优化课程是迁移支持，不能把它们算成已掌握因果定价、强化学习或Spark。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {
              "sql-data": "对应明确SQL要求及数据分析基础，未覆盖Spark。",
              "statistics-metrics": "对应策略效果分析与指标意识；只含A/B设计草案，未覆盖因果估计方法。"
            },
            "nonSkillBlockers": [
              "2025届转正历史岗位，已结束。",
              "正文320元/天低于目标；至少4天/周、3个月，最好半年。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/311944"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "didi_marketplace_agent_8gko0qaflyy6",
          "title": "Marketplace-算法实习生（2）",
          "roleFamily": "agent_engineering",
          "location": "北京",
          "salary": {
            "min": 300,
            "max": 500,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "overlap_only",
            "scope": "该具体岗位公开页面的标价；非公司统一标准、非个人报价",
            "label": "300–500元/天",
            "note": "仅400–500段与目标重合，不保证400元底薪。"
          },
          "status": {
            "value": "publisher_page_unconfirmed",
            "label": "平台可投页，未独立确认HC",
            "sourceDate": "2026-10-15",
            "sourceDateType": "平台刷新日；非首次发布日期",
            "caveat": "页面正文或申请按钮可见，不证明当前实际名额、本人资格或2027年仍有同岗。 尚未找到可一一对应的官方职位ID；资格与薪资均来自该招聘帖。",
            "expiresAt": "2026-12-30"
          },
          "internshipType": "实习，提供转正机会；未明确项目类别",
          "eligibility": "正文本科及以上在读、计算机/AI/软件等相关专业优先；页头硕士，与正文冲突待核；未列毕业届别。",
          "attendance": "至少4天/周，至少3个月",
          "skillsRequired": [
            "Python、接口调用、数据处理与基础服务",
            "Prompt、RAG、Function Calling",
            "日志和评测驱动的问题分析"
          ],
          "skillsPreferred": [],
          "fit": "当前Agent应用方向较贴合；学历字段冲突及300元下限需保留。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://www.shixiseng.com/intern/inn_8gko0qaflyy6?pcm=pc_SearchList",
              "type": "employer_platform",
              "checkedAt": "2026-10-19",
              "supports": "该具体职位的标题、地点、任职要求、出勤与状态；薪资原文：300-500/天。",
              "accessNote": "直接读取完整正文；页面可读及申请按钮不能替代实际HC和本人资格确认。"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "agent-evaluation",
              "api-delivery",
              "sql-data"
            ],
            "supportingSkillIds": [
              "ai-code",
              "software-testing",
              "ml-validation"
            ],
            "preferredSkillIds": [],
            "uncoveredRequirements": [
              "真实RAG、上下文记忆和完整Python服务工程。",
              "业务接入与模型微调能力；现有练习不覆盖完整生产系统。"
            ],
            "directCoverageNotes": {
              "agent-evaluation": "对应规划、工具调用、失败分析与评测基础。",
              "api-delivery": "对应接口与基础服务实现。",
              "sql-data": "仅映射数据清洗处理，不表示JD要求SQL。"
            },
            "nonSkillBlockers": [
              "正文本科及以上在读、计算机/AI/软件等相关专业优先；页头硕士，与正文冲突待核；未列毕业届别。",
              "至少4天/周，至少3个月",
              "仅400–500段与目标重合，不保证400元底薪。",
              "当前HC未独立确认；未联系或投递。"
            ],
            "sourceUrls": [
              "https://www.shixiseng.com/intern/inn_8gko0qaflyy6?pcm=pc_SearchList"
            ],
            "mappedAt": "2026-10-19",
            "mappingNote": "维护者对JD局部能力的映射，不是雇主认证；支持项不等于硬门槛，完成课程不等于满足完整JD。",
            "definition": "直接对应仅指岗位明确要求可被现有单元支持的局部；缺口和非技能约束独立保留。"
          }
        },
        {
          "id": "didi_llab_agent_fwomns7jwnjf",
          "title": "L Lab-算法实习生（2）",
          "roleFamily": "agent_engineering",
          "location": "杭州",
          "salary": {
            "min": 300,
            "max": 500,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "overlap_only",
            "scope": "该具体岗位公开页面的标价；非公司统一标准、非个人报价",
            "label": "300–500元/天",
            "note": "仅400–500段与目标重合，不保证400元底薪。"
          },
          "status": {
            "value": "publisher_page_unconfirmed",
            "label": "平台可投页，未独立确认HC",
            "sourceDate": "2026-10-13",
            "sourceDateType": "平台刷新日；非首次发布日期",
            "caveat": "页面正文或申请按钮可见，不证明当前实际名额、本人资格或2027年仍有同岗。 尚未找到可一一对应的官方职位ID；资格与薪资均来自该招聘帖。",
            "expiresAt": "2026-12-30"
          },
          "internshipType": "实习，未明确日常/转正类别",
          "eligibility": "页面学历字段本科，未列毕业届别；正文要求NLP基础。",
          "attendance": "4天/周，至少4个月",
          "skillsRequired": [
            "Python/Java/C++至少一种",
            "NLP基础",
            "客服Agent自动评测与训练数据清洗"
          ],
          "skillsPreferred": [
            "LLM、RLHF、Agent评测或NLP项目"
          ],
          "fit": "评测方向贴合，但职责包含CPT/SFT/RLHF，不能把当前应用课程当作后训练经验。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://www.shixiseng.com/intern/inn_fwomns7jwnjf?pcm=pc_SearchList",
              "type": "employer_platform",
              "checkedAt": "2026-10-19",
              "supports": "该具体职位的标题、地点、任职要求、出勤与状态；薪资原文：300-500/天。",
              "accessNote": "直接读取完整正文；页面可读及申请按钮不能替代实际HC和本人资格确认。"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "agent-evaluation",
              "ml-validation"
            ],
            "supportingSkillIds": [
              "pytorch-training",
              "sql-data",
              "reproducible-workflow"
            ],
            "preferredSkillIds": [],
            "uncoveredRequirements": [
              "真实客服评测、reward设计、NLP与CPT/SFT/RLHF。",
              "雇主未指定PyTorch；基础训练闭环不足以替代LLM训练经验。"
            ],
            "directCoverageNotes": {
              "agent-evaluation": "对应评测集、失败分析和Agent效果验证的基础部分。",
              "ml-validation": "对应数据与模型评测的通用方法，不覆盖完整RL奖励评测体系。"
            },
            "nonSkillBlockers": [
              "页面学历字段本科，未列毕业届别；正文要求NLP基础。",
              "4天/周，至少4个月",
              "仅400–500段与目标重合，不保证400元底薪。",
              "当前HC未独立确认；未联系或投递。"
            ],
            "sourceUrls": [
              "https://www.shixiseng.com/intern/inn_fwomns7jwnjf?pcm=pc_SearchList"
            ],
            "mappedAt": "2026-10-19",
            "mappingNote": "维护者对JD局部能力的映射，不是雇主认证；支持项不等于硬门槛，完成课程不等于满足完整JD。",
            "definition": "直接对应仅指岗位明确要求可被现有单元支持的局部；缺口和非技能约束独立保留。"
          }
        }
      ],
      "sources": [
        {
          "url": "https://www.career.zju.edu.cn/jyxt/sczp/xjhgl/ckXjhgwXq.zf?xjhbh=cd018266cc3706c353020888a556b6e8",
          "type": "university_employer_notice",
          "checkedAt": "2026-10-10",
          "supports": "2027校招窗口和官方入口，仅用于届别提醒",
          "accessNote": "网页正文或搜索索引可读"
        },
        {
          "url": "https://m.zhipin.com/zhaopin/f55be0e02ab4d5591nV83926GQ~~/",
          "type": "aggregator",
          "checkedAt": "2026-10-10",
          "supports": "400–430/天乘客定价线索；未验证单岗发布日期/HC/毕业限制，不能算确认匹配",
          "accessNote": "网页正文或搜索索引可读"
        }
      ]
    },
    {
      "company": "百度",
      "companyEn": "Baidu",
      "overallFinding": "商业算法岗位明确欢迎统计/运筹；Agent岗要求评测和工程化。两条2026官方日常实习是本次最可靠的能力对照。",
      "targetSalaryEvidence": "两条官网均未公开薪资，不能宣称400–600；需招聘方给出博士档日薪和补贴口径。",
      "officialCareersUrl": "https://talent.baidu.com/",
      "roles": [
        {
          "id": "baidu_business_j92971",
          "title": "商业算法工程师 J92971",
          "roleFamily": "decision_optimization",
          "location": "北京",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "薪资未公开",
            "note": "未公开薪资；不代表无薪，也不能假定达到目标"
          },
          "status": {
            "value": "public_page_unconfirmed",
            "label": "官方日常实习页可读，HC待确认",
            "sourceDate": "2026-07-21",
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "日常实习",
          "eligibility": "计算机或统计/运筹相关专业；未在正文限定具体毕业年份。 百度官网项目总说明：日常实习面向在校生、不限毕业时间；这不代表专业与能力审核已经通过。",
          "attendance": "职位正文未列每周天数或最短月份；公司实习项目总说明为不少于3个月。",
          "skillsRequired": [
            "数据结构、算法、编码",
            "SQL",
            "PyTorch或TensorFlow",
            "从数据定义业务问题"
          ],
          "skillsPreferred": [
            "深度学习、因果推断、强化学习或运筹经验",
            "KDD/Kaggle项目或竞赛"
          ],
          "fit": "高度贴合定价/选择研究；重点补实验设计、ML训练和工程实现。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://talent.baidu.com/jobs/detail/INTERN/e0c5d573-11b1-4ff5-a83e-c1d67776e057",
              "type": "official",
              "checkedAt": "2026-10-12",
              "supports": "日期、日常实习、专业、技能、会员定价/uplift业务；未公开薪资",
              "accessNote": "网页正文或搜索索引可读"
            },
            {
              "url": "https://talent.baidu.com/jobs/list?recruitType=INTERN",
              "type": "official",
              "checkedAt": "2026-10-12",
              "supports": "公司项目总说明：日常实习不限毕业时间；实习项目不少于3个月。不是本岗位独立的每周出勤要求。",
              "accessNote": "官网列表正文直接可读。"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "sql-data",
              "statistics-metrics",
              "pytorch-training"
            ],
            "supportingSkillIds": [
              "ai-code",
              "ml-validation",
              "optimization-modeling",
              "decision-evaluation",
              "reproducible-workflow",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "深度学习、数据结构、算法与编码需要达到JD实际面试深度，MLP入门验收不足以全覆盖。",
              "Uplift/因果推断/强化学习与会员定价、推荐、人群预估中的至少一条业务建模能力。",
              "线上商业化目标及真实实验机制，课程模拟收益不能声称线上增收。"
            ],
            "mappingNote": "SQL和训练框架是该岗明示要求，PyTorch选修在投此岗时转为岗位驱动补课；运筹经验是优先项，不能用运筹优势免除其他基础要求。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "optimization-modeling"
            ],
            "directCoverageNotes": {
              "sql-data": "对应SQL与深入分析数据。",
              "statistics-metrics": "对应从业务目标定义问题与分析效果；不等同因果推断掌握。",
              "pytorch-training": "对应PyTorch/TensorFlow基础框架能力，仅覆盖小模型训练的部分要求。"
            },
            "nonSkillBlockers": [
              "官方日常实习页2026-07-21，当前HC需确认；薪资与出勤未公开。"
            ],
            "sourceUrls": [
              "https://talent.baidu.com/jobs/detail/INTERN/e0c5d573-11b1-4ff5-a83e-c1d67776e057"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "baidu_agent_j104743",
          "title": "Agent算法实习生 J104743",
          "roleFamily": "agent_engineering",
          "location": "北京",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "薪资未公开",
            "note": "未公开薪资；不代表无薪，也不能假定达到目标"
          },
          "status": {
            "value": "public_page_unconfirmed",
            "label": "官方日常实习页可读，HC待确认",
            "sourceDate": "2026-08-19",
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "日常实习",
          "eligibility": "本科及以上在读，计算机/数学/统计/ML相关；未写毕业年份限制。 百度官网项目总说明：日常实习面向在校生、不限毕业时间；这不代表专业与能力审核已经通过。",
          "attendance": "职位正文为连续6个月以上、每周4天以上者优先；公司项目不少于3个月的总说明不替代该岗优先条件。",
          "skillsRequired": [
            "Python、NumPy/Pandas/sklearn",
            "机器学习与数据分析基础",
            "可复现实验、代码规范、文档沟通"
          ],
          "skillsPreferred": [
            "PyTorch/TensorFlow",
            "样本构建、Embedding/Rerank/Prompt/微调/评测之一",
            "Coding Agent工具编排、搜索排序、A/B实验"
          ],
          "fit": "实用ML+Agent的好对照。评测流水线、错误归因、结构化工具调用比堆提示词更有说服力。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://talent.baidu.com/jobs/detail/INTERN/22b11ac9-3920-4236-b079-49e13f5d08d3",
              "type": "official",
              "checkedAt": "2026-10-12",
              "supports": "日期、日常实习、Python/评测/Agent技能、出勤偏好；未公开薪资",
              "accessNote": "网页正文或搜索索引可读"
            },
            {
              "url": "https://talent.baidu.com/jobs/list?recruitType=INTERN",
              "type": "official",
              "checkedAt": "2026-10-12",
              "supports": "公司项目总说明：日常实习不限毕业时间；实习项目不少于3个月。不是本岗位独立的每周出勤要求。",
              "accessNote": "官网列表正文直接可读。"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "sql-data",
              "statistics-metrics",
              "ml-validation",
              "reproducible-workflow",
              "agent-evaluation"
            ],
            "supportingSkillIds": [
              "ai-code",
              "api-delivery",
              "software-testing",
              "pytorch-training",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "搜索召回/排序、Query理解、LTR、相关性建模；通用工具Agent不能覆盖搜索算法。",
              "Embedding/向量检索、Rerank、SFT/LoRA、DPO等属于可选优先方向，当前路线未系统教授。",
              "真实线上A/B分桶、回归监控与弱标注/银标一致性校验，需要针对岗位新增证据。",
              "NumPy/sklearn基础之外的机器学习理论广度仍需按岗位检查。"
            ],
            "mappingNote": "直接映射样本处理、验证拆分、实验评估、可复现与工具Agent职责；PyTorch和Coding Agent经验在任职要求中为优先项，支持项不应全部显示为硬门槛。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "ai-code",
              "pytorch-training"
            ],
            "directCoverageNotes": {
              "sql-data": "对应pandas/NumPy数据清洗与样本构造，原JD没有把SQL单列为必备。",
              "statistics-metrics": "对应A/B指标与实验意识，课程只有设计练习而无真实线上实验。",
              "ml-validation": "对应训练验证拆分、误差分析和评测。",
              "reproducible-workflow": "对应实验复现、代码规范和文档要求。",
              "agent-evaluation": "对应工具调用、结构化输出与搜索评测Agent原型，搜索专属模型尚未覆盖。"
            },
            "nonSkillBlockers": [
              "官方日常实习页2026-08-19，当前HC需确认，薪资未公开。",
              "6个月以上、每周4天以上优先。"
            ],
            "sourceUrls": [
              "https://talent.baidu.com/jobs/detail/INTERN/22b11ac9-3920-4236-b079-49e13f5d08d3"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "baidu_decision_agent_j97505",
          "title": "Agent算法实习生 J97505（预测与优化决策）",
          "roleFamily": "decision_optimization",
          "location": "北京",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位公开页面的标价；非公司统一标准、非个人报价",
            "label": "薪资未公开",
            "note": "未公开不等于无薪，不推定达到目标。"
          },
          "status": {
            "value": "public_page_unconfirmed",
            "label": "官方正文可读，HC待确认",
            "sourceDate": "2026-07-21",
            "sourceDateType": "官方页面日期",
            "caveat": "页面正文或申请按钮可见，不证明当前实际名额、本人资格或2027年仍有同岗。"
          },
          "internshipType": "日常实习",
          "eligibility": "本科及以上在读，计算机/数学/自动化/AI等相关专业优先；公司日常项目不限毕业时间，具体专业适配仍需确认。",
          "attendance": "单岗未列每周天数/最短月份；公司实习项目总说明不少于3个月。",
          "skillsRequired": [
            "扎实Python工程与完整算法项目",
            "RL/MARL、进化算法、LLM Agent框架至少一类实践",
            "决策Agent、组合优化和策略评估"
          ],
          "skillsPreferred": [
            "科研或竞赛经历"
          ],
          "fit": "预测+优化与Agent融合很贴合原研究背景；薪资未知，工业算法与完整项目门槛仍需补齐。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://talent.baidu.com/jobs/detail/INTERN/cd423c1c-7a35-4672-b0a7-2857308efe43",
              "type": "official",
              "checkedAt": "2026-10-19",
              "supports": "该具体职位的标题、地点、任职要求、出勤与状态；薪资未公开。",
              "accessNote": "直接读取完整正文；页面可读及申请按钮不能替代实际HC和本人资格确认。"
            },
            {
              "url": "https://talent.baidu.com/jobs/list?recruitType=INTERN",
              "type": "official",
              "checkedAt": "2026-10-19",
              "supports": "项目级说明：日常实习不限毕业时间，实习项目不少于3个月；不是单岗每周到岗条款。",
              "accessNote": "官网项目说明直接可读。"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "optimization-modeling",
              "decision-evaluation",
              "agent-evaluation"
            ],
            "supportingSkillIds": [
              "ai-code",
              "time-forecast",
              "reproducible-workflow"
            ],
            "preferredSkillIds": [],
            "uncoveredRequirements": [
              "工业规模多目标、强约束、不确定性决策。",
              "进化/RL算法或完整Agent框架实践不能由小规模练习替代。"
            ],
            "directCoverageNotes": {
              "optimization-modeling": "对应预测优化问题的约束建模基础。",
              "decision-evaluation": "对应策略对照和闭环评估基础。",
              "agent-evaluation": "对应工具和评测型Agent的基础；不覆盖完整自进化决策系统。"
            },
            "nonSkillBlockers": [
              "本科及以上在读，计算机/数学/自动化/AI等相关专业优先；公司日常项目不限毕业时间，具体专业适配仍需确认。",
              "单岗未列每周天数/最短月份；公司实习项目总说明不少于3个月。",
              "未公开不等于无薪，不推定达到目标。",
              "当前HC未独立确认；未联系或投递。"
            ],
            "sourceUrls": [
              "https://talent.baidu.com/jobs/detail/INTERN/cd423c1c-7a35-4672-b0a7-2857308efe43",
              "https://talent.baidu.com/jobs/list?recruitType=INTERN"
            ],
            "mappedAt": "2026-10-19",
            "mappingNote": "维护者对JD局部能力的映射，不是雇主认证；支持项不等于硬门槛，完成课程不等于满足完整JD。",
            "definition": "直接对应仅指岗位明确要求可被现有单元支持的局部；缺口和非技能约束独立保留。"
          }
        }
      ],
      "sources": [
        {
          "url": "https://github.com/Bert-Lynn/my-website/blob/main/data/internship-verification-2026-10-12.md",
          "type": "verification_note",
          "label": "10月12日补充核验说明",
          "checkedAt": "2026-10-12",
          "supports": "新增J106354等独立线索的来源、资格、薪资与技能映射另列；这些新增线索尚未纳入结构化16条目录或其汇总，不等同已确认可投岗位。",
          "accessNote": "公开核验说明；不包含个人进度或申请资料。"
        }
      ]
    },
    {
      "company": "阿里巴巴",
      "companyEn": "Alibaba",
      "overallFinding": "新增千问MOS Agent平台帖，500–510元/天、2028年及以后毕业、5天/周至少6个月；训练与搜索要求高，HC未独立确认。原运筹日常岗位继续保留。",
      "targetSalaryEvidence": "牛客432153具体帖标500–510元/天，当前平台有申请入口；不是官网HC确认或本人资格通过。原关闭样本保持历史状态。",
      "officialCareersUrl": "https://campus-talent.alibaba.com/",
      "roles": [
        {
          "id": "alibaba_logistics_or_agent",
          "title": "日常实习生-业务技术-AI应用算法工程师（运筹优化）",
          "roleFamily": "decision_optimization",
          "location": "杭州",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "薪资未公开",
            "note": "未公开薪资；不代表无薪，也不能假定达到目标"
          },
          "status": {
            "value": "public_page_unconfirmed",
            "label": "官网正文及投递入口可读，HC待确认",
            "sourceDate": "2026-04-14",
            "sourceDateType": "官方职位更新日",
            "caveat": "2026-10-12直接读取官网动态正文；投递入口不证明当前实际名额或2027年仍开放。聚合收录日与官方更新日分别保留。"
          },
          "internshipType": "日常实习（官网直接核实）",
          "eligibility": "本科及以上；官网页面显示毕业起止时间为2026-04-29至2029-12-30。须以预计毕业日期逐项核对，不能因2027年去实习或日常实习身份直接认定符合。",
          "attendance": "官网未公开每周天数或最短月份",
          "skillsRequired": [
            "扎实的运筹优化业务建模",
            "深入理解MIP、启发式、ADP并解决实际问题",
            "扎实工程实现及离线/在线系统经验",
            "能推进技术业务落地"
          ],
          "skillsPreferred": [],
          "fit": "运筹建模、物流决策与ML融合方向贴合；官方正文已核实。须先核对预计毕业日期是否落在2026-04-29至2029-12-30窗口内，薪资和实际名额仍未知。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://campus-talent.alibaba.com/campus/position/199904240014",
              "type": "official",
              "checkedAt": "2026-10-12",
              "supports": "完整标题、杭州、2026-04-14更新、毕业窗口、日常项目、在招业务及完整技能正文；未列薪资/出勤",
              "accessNote": "云端浏览器直接读取官网动态正文；普通网页文本抓取为空，不据此判关闭。"
            },
            {
              "url": "https://jobs.ultraai.site/jobs/alibaba_campus/internship:199904240014",
              "type": "aggregator",
              "checkedAt": "2026-10-10",
              "supports": "保留聚合收录日2026-08-06及正文的历史溯源；不作为官方更新日期",
              "accessNote": "网页正文或搜索索引可读"
            },
            {
              "url": "https://www.jdwatch.work/jobs/jt5qtu3nb",
              "type": "aggregator",
              "checkedAt": "2026-10-10",
              "supports": "保留另一聚合自称2026-01-07发布的历史溯源；不覆盖官网2026-04-14更新日",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "optimization-modeling",
              "api-delivery"
            ],
            "supportingSkillIds": [
              "ai-code",
              "sql-data",
              "ml-validation",
              "decision-evaluation",
              "agent-evaluation",
              "reproducible-workflow",
              "software-testing",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "ADP、在线/随机优化、博弈/机制设计和工业启发式算法，当前MIP课程未完整覆盖。",
              "对离线/在线系统有经验的工程深度，单机API演示不足。",
              "电商物流真实大规模数据建模与ML结合优化。"
            ],
            "mappingNote": "直接映射优化建模与系统实现的基础部分；本次已直接核实官网正文。Agent出现在团队方向中，不能把工具调用项目等同MIP、ADP与线上系统经验。此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {
              "optimization-modeling": "对应MIP与业务建模；不包含ADP或全部优化方法。",
              "api-delivery": "仅对应把算法交付成可运行服务的起步能力；不等于JD所需线上系统经验。"
            },
            "nonSkillBlockers": [
              "官网毕业窗口2026-04-29至2029-12-30；须核对预计毕业日，日常实习不代表不限届别。",
              "官网投递入口可读，实际HC和2027年开放情况仍未确认；日薪、每周天数与最短月份未公开。"
            ],
            "sourceUrls": [
              "https://campus-talent.alibaba.com/campus/position/199904240014",
              "https://jobs.ultraai.site/jobs/alibaba_campus/internship:199904240014",
              "https://www.jdwatch.work/jobs/jt5qtu3nb"
            ],
            "mappedAt": "2026-10-12",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "alibaba_ecs_salary_history",
          "title": "阿里云弹性计算-算法实习（历史样本）",
          "roleFamily": "decision_optimization",
          "location": "杭州/北京",
          "salary": {
            "min": 400,
            "max": 500,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "exact_target",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "400–500元/天",
            "note": "2024招聘、2025毕业窗口的历史薪资，不代表2027待遇"
          },
          "status": {
            "value": "closed",
            "label": "历史截止已过",
            "sourceDate": "2024-03-08",
            "caveat": "投递窗口2024-03-08至2024-07-01；即使页面仍有投递按钮，也不算在招。"
          },
          "internshipType": "2025届实习",
          "eligibility": "2025毕业本硕博；用户需另找日常实习或匹配届别。",
          "attendance": "页面写7天/周、6个月；异常高出勤标记须向招聘方核实，不能理解为合理默认安排",
          "skillsRequired": [
            "Python/C++/Java至少一门",
            "ML或OR等相关基础",
            "数理统计、数据分析"
          ],
          "skillsPreferred": [
            "深度学习/大规模数据处理",
            "论文/竞赛"
          ],
          "fit": "调度、购买行为与时序预测能与主项目对应；只作薪资/技能历史证据。",
          "priority": "salary_reference",
          "sources": [
            {
              "url": "https://mnowpick.nowcoder.com/m/detail/index?jobId=314714&urlSource=sitemap",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "400–500/天、2024窗口、2025届、出勤字段与ECS业务",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "statistics-metrics",
              "optimization-modeling",
              "time-forecast"
            ],
            "supportingSkillIds": [
              "ai-code",
              "sql-data",
              "ml-validation",
              "decision-evaluation",
              "reproducible-workflow",
              "pytorch-training",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "常用机器学习理论与实现广度，以及云资源调度的系统背景。",
              "若选择强化学习/推荐/NLP等其他方向，需额外专项准备；当前三项不是全岗覆盖。",
              "大规模数据处理和实际云平台工程经验。"
            ],
            "mappingNote": "这是多方向实习；按OR调度+时序预测方向映射工作内容，统计基础为明示要求。不表示每位候选人必须同时掌握所有岗位方向。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [
              "pytorch-training"
            ],
            "directCoverageNotes": {
              "statistics-metrics": "对应数理统计、数据分析素养。",
              "optimization-modeling": "对应选定OR调度方向的基础，云调度规模与工程未覆盖。",
              "time-forecast": "对应用户增长中的时序预测方向；只是岗位多方向中的一种。"
            },
            "nonSkillBlockers": [
              "2024招聘、2025届窗口，已过期。",
              "页面异常写7天/周、6个月，须核实，不当作默认可接受工时。"
            ],
            "sourceUrls": [
              "https://mnowpick.nowcoder.com/m/detail/index?jobId=314714&urlSource=sitemap"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "alibaba_2027_or",
          "title": "算法工程师-运筹优化-2027届实习生",
          "roleFamily": "decision_optimization",
          "location": "上海/杭州",
          "salary": {
            "min": null,
            "max": null,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "undisclosed",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "薪资未公开",
            "note": "未公开薪资；不代表无薪，也不能假定达到目标"
          },
          "status": {
            "value": "closed",
            "label": "页面标已结束，虽显示未来截止",
            "sourceDate": "2026-07-15",
            "caveat": "页面列投递时间2026-07-15至2027-07-15，但同时标已结束；以关闭状态处理，必须重新核实。"
          },
          "internshipType": "2027届实习",
          "eligibility": "标题限定2027届；不是2027年实习就自动符合。",
          "attendance": "未公开",
          "skillsRequired": [
            "Python NumPy/Pandas/SciPy",
            "C++/Java/Julia等一门高性能语言",
            "优化建模与系统思维"
          ],
          "skillsPreferred": [
            "OR+LLM/RL交叉研究",
            "开源贡献",
            "预测-优化项目"
          ],
          "fit": "可做能力目标，不能按日期误判用户满足毕业届别。",
          "priority": "eligibility_warning",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/439501",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "2027届、薪资面议、已结束与截止冲突、预测-优化一体化技能",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "optimization-modeling",
              "sql-data",
              "decision-evaluation"
            ],
            "supportingSkillIds": [
              "ai-code",
              "time-forecast",
              "ml-validation",
              "reproducible-workflow",
              "agent-evaluation",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "C++/Java/Julia至少一门高性能语言；当前路线主要Python，不覆盖此硬要求。",
              "NumPy/Pandas/SciPy的熟练程度与高性能数值计算，SQL课程中的pandas只是子集。",
              "OR-LLM/RL、因果推理与复杂系统/多智能体建模。",
              "大规模优化与鲁棒性研究、开源/论文等优先证据。"
            ],
            "mappingNote": "映射预测-优化一体化职责；sql-data只代表pandas数据部分，不能说JD要求SQL或课程已经覆盖SciPy/高性能语言。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {
              "optimization-modeling": "对应优化建模基础；混合推理与大规模数值求解仍是缺口。",
              "sql-data": "仅映射明确Python数据栈中的pandas子能力。",
              "decision-evaluation": "对应预测-优化方案验证、可解释性和鲁棒性意识；课程小规模敏感性分析不等于研究级鲁棒优化。"
            },
            "nonSkillBlockers": [
              "2027届限定；页面同时写已结束与未来截止，按关闭处理。",
              "日薪面议。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/439501"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        },
        {
          "id": "alibaba_qwen_mos_agent_432153",
          "title": "千问C端MOS实验室-Agent算法实习生",
          "roleFamily": "agent_engineering",
          "location": "杭州西溪C区",
          "salary": {
            "min": 500,
            "max": 510,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "exact_target",
            "scope": "该具体岗位公开页面的标价；非公司统一标准、非个人报价",
            "label": "500–510元/天",
            "note": "平台具体帖子标价；实际薪资与名额须独立确认。"
          },
          "status": {
            "value": "publisher_page_unconfirmed",
            "label": "平台可投页，未独立确认HC",
            "sourceDate": null,
            "sourceDateType": "发布日期未公开",
            "caveat": "页面正文或申请按钮可见，不证明当前实际名额、本人资格或2027年仍有同岗。 尚未找到可一一对应的官方职位ID；资格与薪资均来自该招聘帖。"
          },
          "internshipType": "实习，可转正；未明确日常/转正项目类别",
          "eligibility": "计算机/AI/NLP等相关专业硕士及以上；明确2028年及以后毕业，不能按2027年实习推断符合。",
          "attendance": "5天/周，至少6个月",
          "skillsRequired": [
            "大规模LLM训练与优化经验",
            "RAG、Agent架构、搜索算法及Query理解"
          ],
          "skillsPreferred": [
            "LLM/搜索顶会论文",
            "独立Agent或开源贡献",
            "强化学习"
          ],
          "fit": "薪资有目标区间证据，但训练与搜索算法门槛高；不是只会调用API的Agent入门岗。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/432153",
              "type": "employer_platform",
              "checkedAt": "2026-10-19",
              "supports": "该具体职位的标题、地点、任职要求、出勤与状态；薪资原文：500-510元/天。",
              "accessNote": "直接读取完整正文；页面可读及申请按钮不能替代实际HC和本人资格确认。"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "agent-evaluation"
            ],
            "supportingSkillIds": [
              "pytorch-training",
              "ml-validation",
              "api-delivery",
              "reproducible-workflow"
            ],
            "preferredSkillIds": [],
            "uncoveredRequirements": [
              "大规模LLM训练与优化是明确要求，小MLP不替代。",
              "SFT/RL后训练、搜索Query理解、多模态检索的深度经验。"
            ],
            "directCoverageNotes": {
              "agent-evaluation": "仅支持Agent架构、工具与效果验证基础；不覆盖大模型训练或完整搜索系统。"
            },
            "nonSkillBlockers": [
              "计算机/AI/NLP等相关专业硕士及以上；明确2028年及以后毕业，不能按2027年实习推断符合。",
              "5天/周，至少6个月",
              "平台具体帖子标价；实际薪资与名额须独立确认。",
              "当前HC未独立确认；未联系或投递。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/432153"
            ],
            "mappedAt": "2026-10-19",
            "mappingNote": "维护者对JD局部能力的映射，不是雇主认证；支持项不等于硬门槛，完成课程不等于满足完整JD。",
            "definition": "直接对应仅指岗位明确要求可被现有单元支持的局部；缺口和非技能约束独立保留。"
          }
        }
      ],
      "sources": []
    },
    {
      "company": "腾讯",
      "companyEn": "Tencent",
      "overallFinding": "有400元以上日常实习历史标价，但此次匹配样本偏Agentic RL研究，宜作进阶选项。",
      "targetSalaryEvidence": "深圳算法实习历史400–450/天；未确认可投新HC，更不能外推全部腾讯算法实习。",
      "officialCareersUrl": "https://join.qq.com/",
      "roles": [
        {
          "id": "tencent_agentic_rl_history",
          "title": "算法工程师（日常实习，Agentic RL）",
          "roleFamily": "foundation_model_research",
          "location": "深圳",
          "salary": {
            "min": 400,
            "max": 450,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "exact_target",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "400–450元/天",
            "note": "历史单岗标价，页已结束"
          },
          "status": {
            "value": "closed",
            "label": "已结束，历史薪资样本",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "日常实习",
          "eligibility": "本科以上，NLP/ML/AI/计算机相关专业。",
          "attendance": "5天/周，至少6个月",
          "skillsRequired": [
            "Python/C++/Java至少一门",
            "编码和问题分析能力"
          ],
          "skillsPreferred": [
            "论文",
            "多模态/强化学习经验"
          ],
          "fit": "有薪资匹配证据，但工作以Agentic RL和模型应用研究为主。短期8小时/周不应为它另开重型训练主线。",
          "priority": "stretch",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/384421?channel=npJobTab&deliverSource=1&pageSource=5001",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "400–450/天、已结束、深圳日常实习、出勤与技能",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [],
            "supportingSkillIds": [
              "ai-code",
              "pytorch-training",
              "ml-validation",
              "agent-evaluation",
              "statistics-metrics",
              "reproducible-workflow",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "Agentic RL的算法研究、训练与评测，工具调用安全Agent不能替代。",
              "多模态模型与数字人/游戏NPC的特定下游建模。",
              "扎实编程与研究问题分析能力仍需独立证明；课程小MLP只是前置基础。"
            ],
            "mappingNote": "当前13项没有直接覆盖该岗核心Agentic RL研究能力，因此不填虚假的直接覆盖项；支持项只用于打基础。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {},
            "nonSkillBlockers": [
              "已结束的深圳日常实习，历史400–450元/天。",
              "5天/周、至少6个月；相关专业背景需招聘方判断。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/384421?channel=npJobTab&deliverSource=1&pageSource=5001"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        }
      ],
      "sources": [
        {
          "url": "https://careers.tencent.com/m/zh-cn/faqdetail.html",
          "type": "official",
          "checkedAt": "2026-10-10",
          "supports": "官方FAQ明确国内校招入口join.qq.com；海外实习条件不套用国内",
          "accessNote": "网页正文或搜索索引可读"
        },
        {
          "url": "https://ailab.tencent.com/ailab/zh/recruit/",
          "type": "official",
          "checkedAt": "2026-10-10",
          "supports": "AI Lab硕博研究实习路线存在，页面较旧且无薪资，不据此推断当前HC",
          "accessNote": "网页正文或搜索索引可读"
        }
      ]
    },
    {
      "company": "网易",
      "companyEn": "NetEase",
      "overallFinding": "有道Agent/AI应用可关注；公开可核实具体历史岗位350–400，不应按聚合最高500元估算收入。",
      "targetSalaryEvidence": "历史有道350–400/天仅端点触及目标；280–500活动汇总和350–500聚合属线索。",
      "officialCareersUrl": "https://hr.163.com/",
      "roles": [
        {
          "id": "netease_youdao_llm_history",
          "title": "有道大模型算法实习生（历史样本）",
          "roleFamily": "foundation_model_research",
          "location": "北京",
          "salary": {
            "min": 350,
            "max": 400,
            "currency": "CNY",
            "unit": "day",
            "evidenceClass": "overlap_only",
            "scope": "该具体岗位的公开标价；非公司统一标准、非个人已获报价",
            "label": "350–400元/天",
            "note": "仅400元端点达到目标下限；不是400–600保证区间"
          },
          "status": {
            "value": "closed",
            "label": "已结束，历史技能样本",
            "sourceDate": null,
            "caveat": "不保证2027年仍有同岗；投递前须重新核实HC、届别、薪资和出勤"
          },
          "internshipType": "实习，项目类型未写明",
          "eligibility": "该具体帖子要求211院校硕士及以上，计算机/AI优先；不等于公司所有岗位的统一条件。",
          "attendance": "4天/周，至少3个月",
          "skillsRequired": [
            "ML/多模态模型研发与评测",
            "团队沟通、技术文档"
          ],
          "skillsPreferred": [
            "OCR/多模态开发",
            "高水平论文"
          ],
          "fit": "帖子职责提Agent/RAG，但要求块偏OCR/多模态，存在方向混杂；不能当通用Agent工程入门岗。",
          "priority": "stretch",
          "sources": [
            {
              "url": "https://www.nowcoder.com/jobs/detail/382927",
              "type": "employer_platform",
              "checkedAt": "2026-10-10",
              "supports": "350–400/天、已结束、出勤、要求；方向混杂需注意",
              "accessNote": "网页正文或搜索索引可读"
            }
          ],
          "skillMapping": {
            "directRequiredSkillIds": [
              "pytorch-training",
              "ml-validation"
            ],
            "supportingSkillIds": [
              "ai-code",
              "agent-evaluation",
              "reproducible-workflow",
              "software-testing",
              "technical-interview"
            ],
            "uncoveredRequirements": [
              "公式OCR或多模态大模型的开发、训练和优化。",
              "LLM/多模态架构、数据构造与任务专属评测；小MLP并不能替代大模型经验。",
              "职位职责写Agent/RAG，而要求块偏OCR/多模态，必须先与招聘方澄清实际方向。"
            ],
            "mappingNote": "只能把训练闭环和评测映射为部分基础；原JD未指定PyTorch，该单元是我们选择的训练框架实现，不是雇主指定技术栈。 此处为路线设计者对JD的映射，不是雇主认证；完成所列单元不表示满足完整JD。",
            "preferredSkillIds": [],
            "directCoverageNotes": {
              "pytorch-training": "对应模型训练/保存/推理的基础流程，框架选择是我们的建议。",
              "ml-validation": "对应模型评测的通用基础，OCR/多模态指标与数据集尚未覆盖。"
            },
            "nonSkillBlockers": [
              "已结束，公开350–400元/天只触及目标下限。",
              "具体帖子要求211硕士及以上；4天/周、至少3个月。"
            ],
            "sourceUrls": [
              "https://www.nowcoder.com/jobs/detail/382927"
            ],
            "mappedAt": "2026-10-10",
            "definition": "直接对应指JD明确写出的工作内容或基础要求的可覆盖部分；支持项是我们的准备建议，不能倒推为雇主硬性要求。优先项另列。"
          }
        }
      ],
      "sources": [
        {
          "url": "https://hr.youdao.com/intern/recruit_summary.php?t1=intern",
          "type": "official",
          "checkedAt": "2026-10-10",
          "supports": "在校本硕博实习路线；页面较旧，不保证当前岗位",
          "accessNote": "网页正文或搜索索引可读"
        },
        {
          "url": "https://hr.youdao.com/questions/question.php?t1=qa",
          "type": "official",
          "checkedAt": "2026-10-10",
          "supports": "官方指向hr.163.com日常实习入口",
          "accessNote": "网页正文或搜索索引可读"
        },
        {
          "url": "https://campus.niuqizp.com/job-v8y5Z5nn5.html",
          "type": "aggregator",
          "checkedAt": "2026-10-10",
          "supports": "280–500/天为多岗位招聘活动汇总，不能分配给具体Agent岗",
          "accessNote": "网页正文或搜索索引可读"
        },
        {
          "url": "https://campus.niuqizp.com/schedule-7rYU5LCzn.html",
          "type": "aggregator",
          "checkedAt": "2026-10-10",
          "supports": "活动窗口2026-03-18至2026-04-15，已过期",
          "accessNote": "网页正文或搜索索引可读"
        },
        {
          "url": "https://m.zhipin.com/zhaopin/16cd3071f478ff1b1nN-3Nm4Fg~~/",
          "type": "aggregator",
          "checkedAt": "2026-10-10",
          "supports": "Agent模型实习350–500线索，未核实HC/届别",
          "accessNote": "网页正文或搜索索引可读"
        }
      ]
    }
  ],
  "exclusions": [
    {
      "url": "https://www.nowcoder.com/jobs/detail/378972",
      "reason": "搜索结果500–510/天且27届以后，与直接打开400–1000/天且泛化SSP文案冲突；不纳入匹配清单。"
    },
    {
      "url": "https://www.nowcoder.com/jobs/detail/438901?urlSource=sitemap",
      "reason": "标题为阿里淘天，发布者却标网易有道；公司身份不一致，排除。"
    },
    {
      "url": "https://watchjobs.net/zh/explore/job/c259-53687dbda1cc8221/%E8%A7%84%E5%88%92%E8%B0%83%E5%BA%A6%E9%A1%B9%E7%9B%AE%E5%AE%9E%E4%B9%A0%E7%94%9F-%E7%BE%8E%E5%9B%A2",
      "reason": "4–8千/月为AI估算，不能当真实薪资、不能换算成已核实日薪。"
    }
  ],
  "summaryCounts": {
    "companiesChecked": 10,
    "rolesDocumented": 20,
    "referenceShortlist": 8,
    "historicalExactBandExamples": 5,
    "confirmedCurrentEligibleTargetSalaryMatches": 0
  }
};
