// Generated public data. Edit data/internships.json and run node scripts/build-career-data.cjs.
window.INTERNSHIP_DATA = {
  "schemaVersion": "1.0",
  "verifiedAt": "2026-10-10",
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
    "400–600元/天有具体历史招聘依据，但本次未核实任何同时满足当前HC明确、用户届别明确合格、个人日薪确认的岗位。",
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
  "recommendedReferenceLabel": "8个准备方向对照（含历史、未公开薪资和待核实岗位；不是8个正在招聘的400–600元岗位）",
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ],
      "sources": []
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
          ]
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
          ]
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
          ]
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
          ]
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
      "overallFinding": "乘客定价、价格弹性、供需匹配最能迁移选择模型研究；已核实具体历史样本低于薪资目标。",
      "targetSalaryEvidence": "历史乘客定价正文320/天；400–430与ETA300–500只见聚合线索，未作为已验证目标岗。",
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
          ]
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
          "eligibility": "计算机或统计/运筹相关专业；未在正文限定具体毕业年份。",
          "attendance": "该页未公开每周出勤/最短月份",
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
              "checkedAt": "2026-10-10",
              "supports": "日期、日常实习、专业、技能、会员定价/uplift业务；未公开薪资",
              "accessNote": "网页正文或搜索索引可读"
            }
          ]
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
          "eligibility": "本科及以上在读，计算机/数学/统计/ML相关；未写毕业年份限制。",
          "attendance": "连续6个月以上、每周4天以上优先",
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
              "checkedAt": "2026-10-10",
              "supports": "日期、日常实习、Python/评测/Agent技能、出勤偏好；未公开薪资",
              "accessNote": "网页正文或搜索索引可读"
            }
          ]
        }
      ],
      "sources": []
    },
    {
      "company": "阿里巴巴",
      "companyEn": "Alibaba",
      "overallFinding": "物流AI应用+运筹、预测优化一体化是专业优势路线；优先日常实习，不误投仅2027毕业生的转正计划。",
      "targetSalaryEvidence": "阿里云历史2024招聘为400–500/天；当前物流Agent运筹岗薪资未公开，不能继承历史价。",
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
            "value": "aggregator_unconfirmed",
            "label": "聚合页有正文，官网抓取未成功",
            "sourceDate": "2026-08-06",
            "caveat": "2026-08-06为聚合收录日；另一聚合称2026-01-07发布，官方发布时间未核实。"
          },
          "internshipType": "日常实习（聚合转引）",
          "eligibility": "本科及以上，未见明确毕业窗口；官网需再次确认。",
          "attendance": "未公开",
          "skillsRequired": [
            "OR业务建模",
            "MIP、启发式或ADP",
            "离线/在线工程实现",
            "ML与优化结合"
          ],
          "skillsPreferred": [
            "业务落地和数据建模"
          ],
          "fit": "主线方向非常贴合，但目前技能正文来自聚合转引，保留验证标记。",
          "priority": "primary",
          "sources": [
            {
              "url": "https://campus-talent.alibaba.com/campus/position/199904240014",
              "type": "official_link_only",
              "checkedAt": "2026-10-10",
              "supports": "聚合页面指向的官方职位；未成功读取正文",
              "accessNote": "两次抓取超时"
            },
            {
              "url": "https://jobs.ultraai.site/jobs/alibaba_campus/internship:199904240014",
              "type": "aggregator",
              "checkedAt": "2026-10-10",
              "supports": "日常实习正文、杭州、技能；收录时间",
              "accessNote": "网页正文或搜索索引可读"
            },
            {
              "url": "https://www.jdwatch.work/jobs/jt5qtu3nb",
              "type": "aggregator",
              "checkedAt": "2026-10-10",
              "supports": "同职位正文及另一发布日期，未当作官方日期",
              "accessNote": "网页正文或搜索索引可读"
            }
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
    "rolesDocumented": 16,
    "referenceShortlist": 8,
    "historicalExactBandExamples": 5,
    "confirmedCurrentEligibleTargetSalaryMatches": 0
  }
};
