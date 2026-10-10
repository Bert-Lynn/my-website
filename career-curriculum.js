// Generated public data. Edit data/career-curriculum.json and run node scripts/build-career-data.cjs.
window.CAREER_CURRICULUM = {
  "version": 2,
  "verifiedAt": "2026-10-10",
  "title": "从博士研究优势到可展示的智能决策产品",
  "route": {
    "primary": "需求预测 + 运筹优化 / 智能决策",
    "secondary": "可测试、可解释的 Agent 应用工程",
    "notMainline": [
      "基础大模型预训练",
      "全套计算机视觉",
      "同时精通所有推荐/搜索/强化学习岗位"
    ],
    "positioning": "保留管理科学、运筹与航空需求研究的优势，用软件交付与可信评测补短板。岗位匹配按当前具体 JD 判断，课程、学历和项目均不保证录用或日薪。",
    "salaryTarget": "人民币400–600元/天是求职筛选目标，不是本路线承诺。",
    "roleFamilies": [
      "decision_optimization",
      "forecasting_ml",
      "agent_engineering"
    ],
    "startMonth": "2026.10",
    "defaultTrackId": "decision_optimization"
  },
  "timeBudget": {
    "weeklyCapHours": 8,
    "plannedWeeklyHours": 6,
    "bufferWeeklyHours": 2,
    "revisionWeekHours": 3,
    "coreEstimatedHours": 124,
    "includes": "完整组合路线150小时；智能决策主线124小时、Agent主线100小时，任选其一优先。已含课程、练习、实现、验收和面试准备；同一产出不重复计时。全部是估计，不是求职达标承诺。",
    "estimateNote": "全部为规划者估算的专注工作量，非官方课时或视频片长；诊断、基础和返工会改变实际时间。",
    "busyWeekRule": "论文返修/投稿周只做维护、复现或一道变式，最多3小时；不补偿式熬夜堆积课程。",
    "optionalRule": "选修必须替换同周主线时间；默认不增加第二个大型项目。",
    "gates": [
      {
        "id": "g0",
        "title": "先跑起来",
        "afterMilestone": "ddl-m1",
        "cumulativeHours": 26,
        "timing": "约3–5周",
        "meaning": "数据校验、查询和可点击的结果预览；尚不能称完整预测决策系统。"
      },
      {
        "id": "g1",
        "title": "作品集 MVP",
        "afterMilestone": "ddl-m3",
        "cumulativeHours": 76,
        "timing": "基础合适时约8–12周，仍以验收为准",
        "meaning": "预测基线、时间切分、可行优化、对照和最小交互演示；不等全部技能通过才展示。"
      },
      {
        "id": "g2",
        "title": "可复现产品 v1",
        "afterMilestone": "ddl-m5",
        "cumulativeHours": 126,
        "timing": "约20–24周含缓冲；不是自动到期",
        "meaning": "CSV导入、方案配置、预测/决策评测、报告导出、测试和只读Agent接口。"
      },
      {
        "id": "g3",
        "title": "面向具体岗位提交证据",
        "afterMilestone": "ddl-m6",
        "cumulativeHours": 150,
        "timing": "v1后按招聘时间与缺口安排",
        "meaning": "满足目标JD的实操证据、简历和技术答辩；到岗时间/实习天数/导师同意需另行确认。"
      }
    ],
    "fullProductEstimatedHours": 150,
    "trackSelectionRule": "只选一条主线推进；共用基础一次学习。另一条作为后续扩展，不能把两条任务同时塞进每周8小时。"
  },
  "levels": [
    {
      "id": "untested",
      "label": "未测",
      "meaning": "没有实操证据，不推断能力为零。"
    },
    {
      "id": "learning",
      "label": "学习中",
      "meaning": "阅读/课程进度，不代表掌握。"
    },
    {
      "id": "practicing",
      "label": "实操中",
      "meaning": "有运行产物，仍有未满足验收项。"
    },
    {
      "id": "passed",
      "label": "实操通过·自评",
      "meaning": "全部必需项有可核查证据；仅自评，不能称第三方认证或岗位就绪。"
    }
  ],
  "assessmentPolicy": {
    "verification": "self_assessed",
    "defaultLevel": "untested",
    "rubricScale": [
      {
        "value": 0,
        "label": "尚无达标证据"
      },
      {
        "value": 4,
        "label": "已有达标证据"
      }
    ],
    "scoreMeaning": "已满足验收项的百分比，绝不是就业概率、能力排名或面试通过率。",
    "passRule": {
      "mode": "all_mandatory",
      "minimumScore": 100,
      "requireEvidence": true
    },
    "evidenceFields": [
      "evidenceUrl",
      "evidenceNote",
      "assessedAt",
      "rubric"
    ],
    "evidenceNoteTemplate": "仓库/文件与commit；复现命令与环境；输入数据与许可证；实际结果；AI辅助范围；本人解释/变式修改；已知限制。",
    "aiPolicy": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
    "diagnosticPolicy": "可先提交同等实操证据并跳过重复学习。跳课、看完视频和旧任务完成均不会自动写入技能通过。",
    "externalReviewPolicy": "当前仅记录自评。若将来请同学/导师/工程师复核，必须另记真实姓名或身份、日期、范围和反馈，不能把自评改称官方认证。",
    "retakePolicy": "失败项生成针对性补课；以新的输入/预测期/约束复测。旧尝试保留，不用反复刷同一答案证明掌握。",
    "rubricAttribution": "所有验收与练习均为本路线设计，并非声称是原课程作业或雇主正式考题。",
    "publicChallengePolicy": "本页给出的题面、期望与变式均为公开练习，不是未见题，也不能独立认证掌握。真正未见题需由复核者另给数据/参数，并记录现场完成过程；当前网站仍仅记录自评。"
  },
  "learningUnits": [
    {
      "id": "u-ai-spec",
      "title": "AI辅助开发：规格→差异审查→测试",
      "provider": "MIT Missing Semester 2026",
      "url": "https://missing.csail.mit.edu/2026/agentic-coding/",
      "scope": "Use cases中的实现、修错、代码审查；Privacy；What to watch out for。高级多Agent/MCP只作参考。",
      "estimatedMinutes": 90,
      "required": true,
      "skillIds": [
        "ai-code"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "给AI一份CSV清洗规格；审查它加入的依赖和文件操作，发现并修复一个刻意放入的分组/空值错误。",
      "type": "reading_with_video",
      "language": "英文讲义＋官方页内视频；中文字幕与片长未核验",
      "readingGuide": "Use cases中的实现、修错、代码审查；Privacy；What to watch out for。高级多Agent/MCP只作参考。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-ai-spec",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-python-diagnostic",
      "title": "Python按需诊断与函数修复",
      "provider": "Python 官方中文教程",
      "url": "https://docs.python.org/zh-cn/3/tutorial/controlflow.html",
      "scope": "4.1–4.4与函数定义/参数；只在诊断暴露缺口时补读变量、容器、文件、异常、模块，不重刷整套长课。",
      "estimatedMinutes": 90,
      "required": true,
      "skillIds": [
        "ai-code"
      ],
      "existingLessonIds": [
        "python-basics",
        "python-control",
        "python-containers",
        "python-files",
        "python-exceptions",
        "python-modules",
        "python-venv"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "90分钟上限：运行给定脚本、补两个边界测试、解释字典聚合，现场改一个分组口径。",
      "type": "reading",
      "language": "中文文字",
      "readingGuide": "4.1–4.4与函数定义/参数；只在诊断暴露缺口时补读变量、容器、文件、异常、模块，不重刷整套长课。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-python-diagnostic",
      "relatedLessonIds": [
        "python-basics",
        "python-control",
        "python-containers",
        "python-files",
        "python-exceptions",
        "python-modules",
        "python-venv"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-git",
      "title": "Git：记录、分支与撤销一次错误",
      "provider": "MIT Missing Semester 2020",
      "url": "https://missing.csail.mit.edu/2020/version-control/",
      "scope": "Git data model、基本命令、branch/merge、undo；练习仅围绕自己的项目。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "reproducible-workflow"
      ],
      "existingLessonIds": [
        "missing-git"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading_with_video",
      "language": "英文讲义＋官方页内视频；中文字幕与片长未核验",
      "readingGuide": "Git data model、基本命令、branch/merge、undo；练习仅围绕自己的项目。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-git",
      "relatedLessonIds": [
        "missing-git"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-debug",
      "title": "调试：定位错误而非只重试提示词",
      "provider": "MIT Missing Semester 2020",
      "url": "https://missing.csail.mit.edu/2020/debugging-profiling/",
      "scope": "Debugging：日志、调试器和静态分析；profiling在慢路径出现时再学。",
      "estimatedMinutes": 90,
      "required": true,
      "skillIds": [
        "ai-code",
        "reproducible-workflow"
      ],
      "existingLessonIds": [
        "missing-debug"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading_with_video",
      "language": "英文讲义＋官方页内视频；中文字幕与片长未核验",
      "readingGuide": "Debugging：日志、调试器和静态分析；profiling在慢路径出现时再学。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-debug",
      "relatedLessonIds": [
        "missing-debug"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-data-card",
      "title": "数据卡与许可：明确标签、来源及不可验证事项",
      "provider": "UCI Machine Learning Repository",
      "url": "https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset",
      "scope": "Dataset Information、Variables、Additional Variable Information、Files、Citation与License。",
      "estimatedMinutes": 90,
      "required": true,
      "skillIds": [
        "sql-data",
        "statistics-metrics"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "写Data Card：引用CC BY4.0；cnt=casual+registered；禁止把同期两分量作为cnt预测特征；数据没有调度成本/车队容量和未满足需求。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Dataset Information、Variables、Additional Variable Information、Files、Citation与License。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-data-card",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-pandas",
      "title": "pandas：按粒度聚合与合并校验",
      "provider": "pandas 官方入门教程",
      "url": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html",
      "scope": "groupby统计；配套第8节concat/merge；核查join后行数与键唯一性。",
      "estimatedMinutes": 150,
      "required": true,
      "skillIds": [
        "sql-data"
      ],
      "existingLessonIds": [
        "d2l-pandas"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "additionalSources": [
        {
          "title": "第8节 How to combine data from multiple tables",
          "url": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html"
        }
      ],
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "groupby统计；配套第8节concat/merge；核查join后行数与键唯一性。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-pandas",
      "relatedLessonIds": [
        "d2l-pandas"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-sql-select",
      "title": "SQL：SELECT与GROUP BY",
      "provider": "DuckDB 官方文档",
      "url": "https://duckdb.org/docs/current/sql/query_syntax/select",
      "scope": "SELECT列表/表达式；GROUP BY聚合。用本地DuckDB，不开云数据库。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "sql-data"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "additionalSources": [
        {
          "title": "GROUP BY Clause",
          "url": "https://duckdb.org/docs/current/sql/query_syntax/groupby"
        }
      ],
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "SELECT列表/表达式；GROUP BY聚合。用本地DuckDB，不开云数据库。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-sql-select",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-sql-join",
      "title": "SQL：JOIN、主键粒度与重复计数",
      "provider": "DuckDB 官方文档",
      "url": "https://duckdb.org/docs/current/sql/query_syntax/from",
      "scope": "FROM and JOIN中的INNER/LEFT JOIN；NULL与一对多合并。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "sql-data"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "FROM and JOIN中的INNER/LEFT JOIN；NULL与一对多合并。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-sql-join",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-sql-window",
      "title": "SQL：窗口、排名和过去窗口",
      "provider": "DuckDB 官方文档",
      "url": "https://duckdb.org/docs/current/sql/functions/window_functions",
      "scope": "OVER/PARTITION BY/ORDER BY；row_number、lag、累计/移动聚合，显式写窗口边界。",
      "estimatedMinutes": 150,
      "required": true,
      "skillIds": [
        "sql-data",
        "time-forecast"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "求每周高需求时段、lag1和只含过去的移动均值；同一结果用pandas核对，含跨日和缺失时段。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "OVER/PARTITION BY/ORDER BY；row_number、lag、累计/移动聚合，显式写窗口边界。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-sql-window",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-metrics",
      "title": "预测指标：MAE、RMSE与零需求陷阱",
      "provider": "Forecasting: Principles and Practice 3e",
      "url": "https://otexts.com/fpp3/accuracy.html",
      "scope": "5.8：训练/测试、误差、尺度依赖/百分比/缩放指标；读公式不要求另学R。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "statistics-metrics",
        "time-forecast"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "5.8：训练/测试、误差、尺度依赖/百分比/缩放指标；读公式不要求另学R。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-metrics",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "author_textbook"
    },
    {
      "id": "u-uncertainty",
      "title": "不确定性：置信区间与独立性假设",
      "provider": "SciPy 官方参考",
      "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html",
      "scope": "bootstrap的用途、paired、confidence_level与Examples；独立合成样本上练习。时间相关误差不直接套逐行iid bootstrap。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "statistics-metrics"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "比较两方案独立模拟场景的平均成本差与区间；对时间序列只报告各时间折分布，不能伪称在线因果增益。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "bootstrap的用途、paired、confidence_level与Examples；独立合成样本上练习。时间相关误差不直接套逐行iid bootstrap。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-uncertainty",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-leakage",
      "title": "sklearn：先切分、后拟合，防止数据泄漏",
      "provider": "scikit-learn 官方用户指南",
      "url": "https://scikit-learn.org/stable/common_pitfalls.html",
      "scope": "Inconsistent preprocessing、Data leakage、How to avoid data leakage、Controlling randomness。",
      "estimatedMinutes": 150,
      "required": true,
      "skillIds": [
        "ml-validation"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "让测试集含极端值，证明预处理fit只读训练集；写一个未来时间戳泄漏断言。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Inconsistent preprocessing、Data leakage、How to avoid data leakage、Controlling randomness。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-leakage",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-baselines",
      "title": "先建立朴素基线，再考虑复杂模型",
      "provider": "Forecasting: Principles and Practice 3e",
      "url": "https://otexts.com/fpp3/simple-methods.html",
      "scope": "5.2：Mean、Naïve、Seasonal naïve；用Python复现所需方法即可。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "time-forecast"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "5.2：Mean、Naïve、Seasonal naïve；用Python复现所需方法即可。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-baselines",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization"
      ],
      "sourceType": "author_textbook"
    },
    {
      "id": "u-lagged",
      "title": "从滞后特征到树模型与预测区间",
      "provider": "scikit-learn 官方实例",
      "url": "https://scikit-learn.org/stable/auto_examples/applications/plot_time_series_lagged_features.html",
      "scope": "Analyzing data、Generating lagged features、Naive evaluation、Proper next-hour evaluation、quantile regression；可用pandas等价实现，不为示例额外学全Polars。",
      "estimatedMinutes": 180,
      "required": true,
      "skillIds": [
        "ml-validation",
        "time-forecast"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "对比季节朴素、线性回归和HistGradientBoosting；复现随机切分过于乐观的对照，正式结论只用时间切分。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Analyzing data、Generating lagged features、Naive evaluation、Proper next-hour evaluation、quantile regression；可用pandas等价实现，不为示例额外学全Polars。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-lagged",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-tscv",
      "title": "滚动验证与真实可用特征",
      "provider": "Forecasting: Principles and Practice 3e",
      "url": "https://otexts.com/fpp3/tscv.html",
      "scope": "5.10：rolling forecasting origin、多步预测交叉验证；每个切分明确预测起点和数据可用时点。",
      "estimatedMinutes": 180,
      "required": true,
      "skillIds": [
        "ml-validation",
        "time-forecast"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "至少3个滚动验证窗口，保留最后连续时间段为最终测试；未来真实天气只可作为oracle对照。",
      "additionalSources": [
        {
          "title": "pandas第9节：时间戳、索引与重采样",
          "url": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/09_timeseries.html"
        }
      ],
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "5.10：rolling forecasting origin、多步预测交叉验证；每个切分明确预测起点和数据可用时点。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-tscv",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization"
      ],
      "sourceType": "author_textbook"
    },
    {
      "id": "u-or-mip",
      "title": "OR-Tools：变量、约束、目标与求解状态",
      "provider": "Google OR-Tools",
      "url": "https://developers.google.com/optimization/mip/mip_example",
      "scope": "Solving a MIP Problem：变量、约束、目标、求解与结果输出；先解释模型再复制代码。",
      "estimatedMinutes": 180,
      "required": true,
      "skillIds": [
        "optimization-modeling"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Solving a MIP Problem：变量、约束、目标、求解与结果输出；先解释模型再复制代码。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-or-mip",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-or-scheduling",
      "title": "OR-Tools：有限资源的排班/容量约束",
      "provider": "Google OR-Tools",
      "url": "https://developers.google.com/optimization/scheduling/employee_scheduling",
      "scope": "Employee Scheduling首个例子：布尔变量、每班覆盖、每天至多一次、公平分配；复杂偏好扩展可选。",
      "estimatedMinutes": 180,
      "required": true,
      "skillIds": [
        "optimization-modeling",
        "decision-evaluation"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把示例改为模拟时段容量分配；预算、每时段上限和连续性只选择确有解释的约束，不冒充真实航空排班。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Employee Scheduling首个例子：布尔变量、每班覆盖、每天至多一次、公平分配；复杂偏好扩展可选。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-or-scheduling",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-decision-eval",
      "title": "从预测误差到决策成本：自拟对照实验",
      "provider": "本路线项目练习，依据Google OR-Tools与FPP3",
      "url": "https://developers.google.com/optimization/mip/mip_example",
      "scope": "固定同一组留出需求与约束，比较均匀分配/贪心/优化；枚举小实例检查最优值；成本参数仅为合成情景。",
      "estimatedMinutes": 180,
      "required": true,
      "skillIds": [
        "decision-evaluation"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "报告资源使用、可行率、短缺/闲置与合成总成本；未优于基线时仍提交结果和原因。",
      "additionalSources": [
        {
          "title": "FPP3 5.10：rolling-origin评价依据",
          "url": "https://otexts.com/fpp3/tscv.html"
        }
      ],
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "固定同一组留出需求与约束，比较均匀分配/贪心/优化；枚举小实例检查最优值；成本参数仅为合成情景。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-decision-eval",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-pytest",
      "title": "pytest：第一个测试、异常和fixture",
      "provider": "pytest 官方入门",
      "url": "https://docs.pytest.org/en/stable/getting-started.html",
      "scope": "Create your first test、Run multiple tests、Assert expected exception、Request a unique temporary directory。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "software-testing"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Create your first test、Run multiple tests、Assert expected exception、Request a unique temporary directory。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-pytest",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-test-param",
      "title": "pytest：参数化边界与回归测试",
      "provider": "pytest 官方指南",
      "url": "https://docs.pytest.org/en/stable/how-to/parametrize.html",
      "scope": "@pytest.mark.parametrize与组合参数；测试数据、非法输入、不可行约束、超时。",
      "estimatedMinutes": 90,
      "required": true,
      "skillIds": [
        "software-testing"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "@pytest.mark.parametrize与组合参数；测试数据、非法输入、不可行约束、超时。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-test-param",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-api",
      "title": "FastAPI：类型化CSV/情景请求与明确错误",
      "provider": "FastAPI 官方中文教程",
      "url": "https://fastapi.tiangolo.com/zh/tutorial/body/",
      "scope": "Pydantic请求体与校验；配套处理错误中的HTTPException。最初做单用户本地接口，不新增账号系统。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "api-delivery"
      ],
      "existingLessonIds": [
        "fastapi-first",
        "fastapi-body",
        "fastapi-errors"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "additionalSources": [
        {
          "title": "处理错误",
          "url": "https://fastapi.tiangolo.com/zh/tutorial/handling-errors/"
        }
      ],
      "type": "reading",
      "language": "中文文字",
      "readingGuide": "Pydantic请求体与校验；配套处理错误中的HTTPException。最初做单用户本地接口，不新增账号系统。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-api",
      "relatedLessonIds": [
        "fastapi-first",
        "fastapi-body",
        "fastapi-errors"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-api-testing",
      "title": "API回归：同样输入应返回可检查的结果",
      "provider": "FastAPI 官方中文教程",
      "url": "https://fastapi.tiangolo.com/zh/tutorial/testing/",
      "scope": "TestClient和测试命名；成功、非法schema、不可行方案、模型未准备好。",
      "estimatedMinutes": 90,
      "required": true,
      "skillIds": [
        "software-testing",
        "api-delivery"
      ],
      "existingLessonIds": [
        "fastapi-testing"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "中文文字",
      "readingGuide": "TestClient和测试命名；成功、非法schema、不可行方案、模型未准备好。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-api-testing",
      "relatedLessonIds": [
        "fastapi-testing"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-docker",
      "title": "Dockerfile：在新环境重跑同一个演示",
      "provider": "Docker 官方文档",
      "url": "https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/",
      "scope": "Writing a Dockerfile；理解基础镜像、复制依赖、安装和启动指令。单服务优先，Compose按需。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "reproducible-workflow",
        "api-delivery"
      ],
      "existingLessonIds": [
        "docker-dockerfile"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Writing a Dockerfile；理解基础镜像、复制依赖、安装和启动指令。单服务优先，Compose按需。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-docker",
      "relatedLessonIds": [
        "docker-dockerfile"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-ci",
      "title": "CI：安装、测试和保存失败线索",
      "provider": "GitHub 官方文档",
      "url": "https://docs.github.com/en/actions/tutorials/build-and-test-code/python",
      "scope": "Specifying a Python version、Installing dependencies、Testing with pytest；只在已有授权仓库使用，先本地同一命令运行。",
      "estimatedMinutes": 90,
      "required": true,
      "skillIds": [
        "reproducible-workflow",
        "software-testing"
      ],
      "existingLessonIds": [],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Specifying a Python version、Installing dependencies、Testing with pytest；只在已有授权仓库使用，先本地同一命令运行。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-ci",
      "relatedLessonIds": [],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-agent-tools",
      "title": "Agent工具：输入输出schema与工具边界",
      "provider": "Hugging Face Agents Course",
      "url": "https://huggingface.co/learn/agents-course/en/unit1/tools",
      "scope": "Unit1 What are Tools：工具说明、参数和调用；只给预测、求解、报告读取白名单。",
      "estimatedMinutes": 120,
      "required": false,
      "skillIds": [
        "agent-evaluation"
      ],
      "existingLessonIds": [
        "hf-agents-tools",
        "genai-tools"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Unit1 What are Tools：工具说明、参数和调用；只给预测、求解、报告读取白名单。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-agent-tools",
      "relatedLessonIds": [
        "hf-agents-tools",
        "genai-tools"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-agent-loop",
      "title": "最小Agent循环：保留确定性入口",
      "provider": "Hugging Face Agents Course",
      "url": "https://huggingface.co/learn/agents-course/en/unit1/dummy-agent-library",
      "scope": "Unit1 Dummy Agent Library；理解输出解析、工具执行、观察与终止。用schema validator+白名单执行器替代任意代码执行。",
      "estimatedMinutes": 150,
      "required": false,
      "skillIds": [
        "agent-evaluation"
      ],
      "existingLessonIds": [
        "hf-agents-concept",
        "hf-agents-cycle",
        "hf-agents-dummy"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "实现forecast/optimize/explain三工具；默认mock模型输出用于离线测试，真实LLM只接已有获准凭证或本地模型。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Unit1 Dummy Agent Library；理解输出解析、工具执行、观察与终止。用schema validator+白名单执行器替代任意代码执行。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-agent-loop",
      "relatedLessonIds": [
        "hf-agents-concept",
        "hf-agents-cycle",
        "hf-agents-dummy"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-agent-evals",
      "title": "Agent观察与评测：成功率、工具错误和安全失败",
      "provider": "Hugging Face Agents Course",
      "url": "https://huggingface.co/learn/agents-course/en/bonus-unit2/introduction",
      "scope": "Bonus Unit2 introduction及课程给出的观察/评价思路；自建本地JSON traces与固定测试集，不要求注册外部观测服务。",
      "estimatedMinutes": 180,
      "required": false,
      "skillIds": [
        "agent-evaluation"
      ],
      "existingLessonIds": [
        "evals-observe",
        "evals-regression"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "20条开发样例与30条留出样例，覆盖正常、无数据、恶意指令、非法参数、重复与超时；比较直接表单/确定性流程/Agent。",
      "type": "reading",
      "language": "英文文字；附中文选读范围与练习",
      "readingGuide": "Bonus Unit2 introduction及课程给出的观察/评价思路；自建本地JSON traces与固定测试集，不要求注册外部观测服务。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-agent-evals",
      "relatedLessonIds": [
        "evals-observe",
        "evals-regression"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-algo",
      "title": "面试基础：数组、哈希与复杂度",
      "provider": "Hello 算法",
      "url": "https://www.hello-algo.com/chapter_computational_complexity/time_complexity/",
      "scope": "2.3时间复杂度；原目录数组/哈希章节按需；先会去重聚合、top-k、二分边界，不以刷题数量作为主目标。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "technical-interview"
      ],
      "existingLessonIds": [
        "algo-complexity",
        "algo-array",
        "algo-hash"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "各做一道聚合/查找变式；口述复杂度、边界，写可运行测试。",
      "type": "reading",
      "language": "中文文字",
      "readingGuide": "2.3时间复杂度；原目录数组/哈希章节按需；先会去重聚合、top-k、二分边界，不以刷题数量作为主目标。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-algo",
      "relatedLessonIds": [
        "algo-complexity",
        "algo-array",
        "algo-hash"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-interview",
      "title": "项目答辩：让他人能复现和判断贡献",
      "provider": "MIT Missing Semester：Git与代码差异",
      "url": "https://missing.csail.mit.edu/2020/version-control/",
      "scope": "利用commit/diff核对贡献。此单元是自拟答辩练习，不是MIT正式面试课。",
      "estimatedMinutes": 120,
      "required": true,
      "skillIds": [
        "technical-interview"
      ],
      "existingLessonIds": [
        "missing-git"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "准备3分钟演示与10分钟技术答辩；从Data Card、错误分析、约束、测试、AI贡献逐项举证；找1位真实同学按README试运行。",
      "type": "reading_with_video",
      "language": "英文讲义＋官方页内视频；中文字幕与片长未核验",
      "readingGuide": "利用commit/diff核对贡献。此单元是自拟答辩练习，不是MIT正式面试课。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "canonicalProgressId": "u-interview",
      "relatedLessonIds": [
        "missing-git"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "sourceType": "official_documentation_or_course"
    },
    {
      "id": "u-torch",
      "title": "岗位需要时补PyTorch训练闭环",
      "provider": "动手学深度学习中文教材",
      "url": "https://zh.d2l.ai/chapter_linear-networks/linear-regression-concise.html",
      "scope": "3.3简洁线性回归；按需回看2.1张量、2.5自动求导；5.5权重保存读取。先小MLP，暂不强制CNN/LSTM/Transformer整链。",
      "estimatedMinutes": 240,
      "required": false,
      "skillIds": [
        "pytorch-training"
      ],
      "existingLessonIds": [
        "d2l-tensor",
        "d2l-autograd",
        "d2l-torch",
        "d2l-mlp",
        "d2l-overfit",
        "d2l-save"
      ],
      "sourceVerifiedAt": "2026-10-10",
      "verificationNote": "已打开官方/作者单节正文，核对标题和相关内容；未声称视频片长或中文字幕可用。",
      "estimateNote": "精读与针对练习的工作量估算，非官方时长。",
      "exercise": "把本节方法用于主项目相应里程碑，按该技能验收标准提交结果。",
      "additionalSources": [
        {
          "title": "5.5 读写文件",
          "url": "https://zh.d2l.ai/chapter_deep-learning-computation/read-write.html"
        }
      ],
      "type": "reading",
      "language": "中文文字",
      "readingGuide": "3.3简洁线性回归；按需回看2.1张量、2.5自动求导；5.5权重保存读取。先小MLP，暂不强制CNN/LSTM/Transformer整链。",
      "skipScope": "未列出的高级章节先跳过；不要把官方整页/整课全部学完作为本单元通过条件。",
      "videoOptions": [
        {
          "lessonId": "d2l-tensor",
          "title": "数据操作（教材2.1）",
          "url": "https://www.bilibili.com/video/BV1CV411Y7i4",
          "note": "保留原作者课表映射；B站播放/字幕/片长未核实。"
        },
        {
          "lessonId": "d2l-autograd",
          "title": "自动求导（教材2.5）",
          "url": "https://www.bilibili.com/video/BV1KA411N7Px",
          "note": "保留原作者课表映射；B站播放/字幕/片长未核实。"
        },
        {
          "lessonId": "d2l-torch",
          "title": "线性回归的简洁实现（教材3.3）",
          "url": "https://www.bilibili.com/video/BV1PX4y1g7KC?p=4",
          "note": "保留原作者课表映射；B站播放/字幕/片长未核实。"
        },
        {
          "lessonId": "d2l-save",
          "title": "读写文件（教材5.5）",
          "url": "https://www.bilibili.com/video/BV1AK4y1P7vs?p=4",
          "note": "保留原作者课表映射；B站播放/字幕/片长未核实。"
        }
      ],
      "canonicalProgressId": "u-torch",
      "relatedLessonIds": [
        "d2l-tensor",
        "d2l-autograd",
        "d2l-torch",
        "d2l-mlp",
        "d2l-overfit",
        "d2l-save"
      ],
      "progressIdentity": "independent_unit",
      "requiredByTrack": [],
      "sourceType": "official_documentation_or_course"
    }
  ],
  "skills": [
    {
      "id": "ai-code",
      "title": "读懂、修改并验证AI生成代码",
      "why": "从复制代码升级为能给规格、审查和定位错误。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [],
      "learningUnitIds": [
        "u-ai-spec",
        "u-python-diagnostic",
        "u-debug"
      ],
      "lessonIds": [
        "python-control",
        "python-containers",
        "python-files",
        "python-exceptions",
        "missing-debug"
      ],
      "milestoneIds": [
        "ddl-m0",
        "ddl-m1"
      ],
      "roleFamilies": [
        "decision_optimization",
        "forecasting_ml",
        "agent_engineering",
        "search_recommendation",
        "foundation_model_research"
      ],
      "assessment": {
        "id": "ai-code-assessment",
        "title": "读懂、修改并验证AI生成代码实操验收",
        "minutes": 90,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "ai-code-c1",
            "text": "写清输入/输出/边界规格；审查一次AI改动并指出至少一个实质问题。",
            "mandatory": true
          },
          {
            "id": "ai-code-c2",
            "text": "在CSV处理脚本中定位一个错误，修复后正常/空数据/非法字段测试通过。",
            "mandatory": true
          },
          {
            "id": "ai-code-c3",
            "text": "不让AI代答，解释关键聚合与异常路径，并完成一个额外的分组口径变式。",
            "mandatory": true
          },
          {
            "id": "ai-code-c4",
            "text": "留下diff、复现命令、测试输出和AI辅助说明；不提交密钥或私有研究数据。",
            "mandatory": true
          }
        ],
        "transferTask": "将按天聚合改为按周并解释跨年边界。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-data"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "diagnosticLessonIds": [
        "python-basics",
        "python-control",
        "python-containers",
        "python-modules",
        "python-files",
        "python-exceptions",
        "python-venv",
        "cs50p-functions",
        "cs50p-conditionals",
        "cs50p-loops"
      ],
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "reproducible-workflow",
      "title": "Git与可复现实验",
      "why": "让别人在新环境得到同一结论。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "ai-code"
      ],
      "learningUnitIds": [
        "u-git",
        "u-debug",
        "u-docker",
        "u-ci"
      ],
      "lessonIds": [
        "missing-git",
        "missing-shell",
        "missing-debug",
        "python-venv",
        "docker-dockerfile"
      ],
      "milestoneIds": [
        "ddl-m0",
        "ddl-m4"
      ],
      "roleFamilies": [
        "decision_optimization",
        "forecasting_ml",
        "agent_engineering"
      ],
      "assessment": {
        "id": "reproducible-workflow-assessment",
        "title": "Git与可复现实验实操验收",
        "minutes": 60,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "reproducible-workflow-c1",
            "text": "仓库具备明确入口、依赖版本、配置和数据获取/生成说明；无绝对私有路径。",
            "mandatory": true
          },
          {
            "id": "reproducible-workflow-c2",
            "text": "从干净环境执行README命令成功；记录Python/依赖/数据hash/随机种子与commit。",
            "mandatory": true
          },
          {
            "id": "reproducible-workflow-c3",
            "text": "能从一次错误修改恢复，并用Git diff说明个人与AI的改动。",
            "mandatory": true
          },
          {
            "id": "reproducible-workflow-c4",
            "text": "重复运行得到容差内一致结果；不同配置输出分目录，失败保留可定位日志。",
            "mandatory": true
          }
        ],
        "transferTask": "在新目录重建环境，改变随机种子后解释哪些量应改变。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "diagnosticLessonIds": [
        "missing-shell",
        "missing-git",
        "python-venv"
      ],
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "sql-data",
      "title": "SQL与数据质量",
      "why": "分析/算法实习共同的取数、聚合和粒度基础。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "ai-code"
      ],
      "learningUnitIds": [
        "u-data-card",
        "u-pandas",
        "u-sql-select",
        "u-sql-join",
        "u-sql-window"
      ],
      "lessonIds": [
        "d2l-pandas",
        "python-containers"
      ],
      "milestoneIds": [
        "ddl-m1"
      ],
      "roleFamilies": [
        "decision_optimization",
        "forecasting_ml",
        "agent_engineering",
        "search_recommendation",
        "foundation_model_research"
      ],
      "assessment": {
        "id": "sql-data-assessment",
        "title": "SQL与数据质量实操验收",
        "minutes": 90,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "sql-data-c1",
            "text": "完成SELECT/GROUP BY、LEFT JOIN、去重和窗口4类查询；同一指标与pandas结果一致。",
            "mandatory": true
          },
          {
            "id": "sql-data-c2",
            "text": "明确一行是什么；主键、时间、缺失、重复检测可运行；join后行数变化有解释。",
            "mandatory": true
          },
          {
            "id": "sql-data-c3",
            "text": "5条人工小样例含NULL/重复/跨日边界，结果与手算一致。",
            "mandatory": true
          },
          {
            "id": "sql-data-c4",
            "text": "Data Card标注来源/许可/字段/标签口径；同期casual与registered不得泄漏cnt。",
            "mandatory": true
          }
        ],
        "transferTask": "把小时指标改成工作日分组，同时防止一对多join重复求和。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-data"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "statistics-metrics",
      "title": "指标、实验意识与不确定性",
      "why": "能把业务问题变成有口径、有局限的证据。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "sql-data"
      ],
      "learningUnitIds": [
        "u-data-card",
        "u-metrics",
        "u-uncertainty"
      ],
      "lessonIds": [
        "d2l-linear",
        "d2l-overfit"
      ],
      "milestoneIds": [
        "ddl-m2",
        "ddl-m3"
      ],
      "roleFamilies": [
        "decision_optimization",
        "forecasting_ml",
        "agent_engineering",
        "search_recommendation",
        "foundation_model_research"
      ],
      "assessment": {
        "id": "statistics-metrics-assessment",
        "title": "指标、实验意识与不确定性实操验收",
        "minutes": 60,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "statistics-metrics-c1",
            "text": "为同一目标解释MAE、RMSE和决策成本的含义，零需求时不误用MAPE。",
            "mandatory": true
          },
          {
            "id": "statistics-metrics-c2",
            "text": "用手算小样本核对指标，按时段/工作日等至少2个切片报告表现。",
            "mandatory": true
          },
          {
            "id": "statistics-metrics-c3",
            "text": "在独立合成场景给出差值与区间并说明抽样单位；时间相关样本不套独立性假设。",
            "mandatory": true
          },
          {
            "id": "statistics-metrics-c4",
            "text": "写明离线关联≠线上因果；给出未来A/B测试的随机化单位、主指标与护栏草案，不声称已做线上实验。",
            "mandatory": true
          }
        ],
        "transferTask": "平均误差下降而高峰短缺上升时，说明为何不能直接宣称改善。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-forecast"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "ml-validation",
      "title": "可信验证与留出集管理",
      "why": "预测、Agent离线评测与研究均依赖可信留出集。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "sql-data",
        "statistics-metrics"
      ],
      "learningUnitIds": [
        "u-leakage",
        "u-lagged",
        "u-tscv",
        "u-agent-evals"
      ],
      "lessonIds": [
        "d2l-overfit",
        "d2l-train-loop"
      ],
      "milestoneIds": [
        "ddl-m2"
      ],
      "roleFamilies": [
        "decision_optimization",
        "forecasting_ml",
        "agent_engineering",
        "search_recommendation",
        "foundation_model_research"
      ],
      "assessment": {
        "id": "ml-validation-assessment",
        "title": "无泄漏机器学习验证实操验收",
        "minutes": 60,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "ml-validation-c1",
            "text": "预先锁定训练/开发/验证/最终测试边界；预测用时间切分，Agent用按意图/场景分组的开发与留出样例，不能混入同一改写题。",
            "mandatory": true
          },
          {
            "id": "ml-validation-c2",
            "text": "预测路线做至少3个时间滚动验证窗口；Agent路线做至少3类场景独立切片。所有调参/改prompt只看开发集。",
            "mandatory": true
          },
          {
            "id": "ml-validation-c3",
            "text": "预测路线检测未来特征/标签分量/全量预处理；Agent路线检测题目改写泄漏、答案泄漏和用测试集改prompt，至少3类防泄漏检查。",
            "mandatory": true
          },
          {
            "id": "ml-validation-c4",
            "text": "在同一切分和口径下保存基线、配置、全部结果与失败案例；最终留出评测单独运行并标版本。",
            "mandatory": true
          }
        ],
        "transferTask": "在缺少未来天气预报时移除真实未来天气，重新比较结果。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-forecast"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "trackGuidance": {
        "decision_optimization": "重点u-leakage/u-lagged/u-tscv。",
        "agent_engineering": "重点u-leakage中开发/测试分离原则与u-agent-evals；时序高级内容可选。"
      },
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "time-forecast",
      "title": "需求预测与误差分析",
      "why": "把航空/交通研究优势迁移为可测试预测管线。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "ml-validation"
      ],
      "learningUnitIds": [
        "u-baselines",
        "u-lagged",
        "u-tscv",
        "u-metrics"
      ],
      "lessonIds": [
        "d2l-linear",
        "d2l-pandas",
        "d2l-sequence"
      ],
      "milestoneIds": [
        "ddl-m2"
      ],
      "roleFamilies": [
        "decision_optimization",
        "forecasting_ml"
      ],
      "assessment": {
        "id": "time-forecast-assessment",
        "title": "需求预测与误差分析实操验收",
        "minutes": 90,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "time-forecast-c1",
            "text": "实现季节朴素、线性模型和一类树模型，说明特征在预测时是否真实可用。",
            "mandatory": true
          },
          {
            "id": "time-forecast-c2",
            "text": "统一比较1小时与24小时预测；24小时预测不得暗用预测起点之后的真实lag值。",
            "mandatory": true
          },
          {
            "id": "time-forecast-c3",
            "text": "报告MAE/RMSE、2个需求切片、计算时间及失败案例；不要求一定击败基线。",
            "mandatory": true
          },
          {
            "id": "time-forecast-c4",
            "text": "能解释一个误差来源并做一次有依据的改动或消融，保留改前改后结果。",
            "mandatory": true
          }
        ],
        "transferTask": "从1小时改为次日24小时批量预测，重建正确的多步特征。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-forecast"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "optimization-modeling",
      "title": "约束优化建模与求解",
      "why": "体现运筹背景的核心差异化。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "ai-code",
        "statistics-metrics"
      ],
      "learningUnitIds": [
        "u-or-mip",
        "u-or-scheduling"
      ],
      "lessonIds": [],
      "milestoneIds": [
        "ddl-m3"
      ],
      "roleFamilies": [
        "decision_optimization"
      ],
      "assessment": {
        "id": "optimization-modeling-assessment",
        "title": "约束优化建模与求解实操验收",
        "minutes": 90,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "optimization-modeling-c1",
            "text": "用文字和公式定义变量、单位、目标、预算与每时段容量；成本/容量为明确标注的模拟参数。",
            "mandatory": true
          },
          {
            "id": "optimization-modeling-c2",
            "text": "至少10个可枚举小实例与穷举最优值一致，或解释容差/求解gap。",
            "mandatory": true
          },
          {
            "id": "optimization-modeling-c3",
            "text": "可行/不可行/超时状态均有处理；独立检查器验证所有硬约束。",
            "mandatory": true
          },
          {
            "id": "optimization-modeling-c4",
            "text": "改变一个变式容量或预算约束并正确重跑，不将未证最优的结果标为最优。",
            "mandatory": true
          }
        ],
        "transferTask": "加入峰时段最低服务下限并构造一个必然不可行的例子。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-optimization"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "decision-evaluation",
      "title": "预测到决策的对照评估",
      "why": "避免只有预测排行榜，没有下游解释。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "time-forecast",
        "optimization-modeling"
      ],
      "learningUnitIds": [
        "u-decision-eval",
        "u-uncertainty"
      ],
      "lessonIds": [],
      "milestoneIds": [
        "ddl-m3"
      ],
      "roleFamilies": [
        "decision_optimization"
      ],
      "assessment": {
        "id": "decision-evaluation-assessment",
        "title": "预测到决策的对照评估实操验收",
        "minutes": 60,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "decision-evaluation-c1",
            "text": "相同留出需求/资源预算下比较均匀分配、贪心与优化三策略，定义公平对照条件。",
            "mandatory": true
          },
          {
            "id": "decision-evaluation-c2",
            "text": "分别报告可行率、短缺、闲置、模拟成本和求解时间，不把预测误差等同业务收益。",
            "mandatory": true
          },
          {
            "id": "decision-evaluation-c3",
            "text": "对至少3组成本比/容量/需求扰动做敏感性分析，含一个优化不占优的情形。",
            "mandatory": true
          },
          {
            "id": "decision-evaluation-c4",
            "text": "报告说明真实数据能检验预测、合成参数只能检验what-if；不可声称真实节省金额。",
            "mandatory": true
          }
        ],
        "transferTask": "提高缺货惩罚后检查决策变化，并解释同一预测模型的策略敏感性。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-optimization"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "software-testing",
      "title": "自动测试与故障定位",
      "why": "代码能跑一次还不等于可靠交付。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "ai-code",
        "reproducible-workflow"
      ],
      "learningUnitIds": [
        "u-pytest",
        "u-test-param",
        "u-api-testing",
        "u-ci"
      ],
      "lessonIds": [
        "python-exceptions",
        "fastapi-testing"
      ],
      "milestoneIds": [
        "ddl-m1",
        "ddl-m4",
        "ddl-m5"
      ],
      "roleFamilies": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessment": {
        "id": "software-testing-assessment",
        "title": "自动测试与故障定位实操验收",
        "minutes": 60,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "software-testing-c1",
            "text": "自动测试覆盖数据校验、指标、泄漏、约束检查、API、Agent边界；关键路径有正常和失败例。",
            "mandatory": true
          },
          {
            "id": "software-testing-c2",
            "text": "提供一个先失败后修复的回归测试，证明测试确实能抓住缺陷。",
            "mandatory": true
          },
          {
            "id": "software-testing-c3",
            "text": "固定seed/小测试夹具；正常测试不依赖外部LLM、收费API或网络。",
            "mandatory": true
          },
          {
            "id": "software-testing-c4",
            "text": "在干净环境执行测试命令成功并保存输出；未运行/失败的测试不写成通过。",
            "mandatory": true
          }
        ],
        "transferTask": "删去或错误反转一个关键约束，测试必须失败而不是仍然全绿。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-agent"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "api-delivery",
      "title": "可使用的产品接口与演示",
      "why": "形成可上传、可配置、可比较和可导出的一条用户路径。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "sql-data",
        "software-testing"
      ],
      "learningUnitIds": [
        "u-api",
        "u-api-testing",
        "u-docker"
      ],
      "lessonIds": [
        "fastapi-first",
        "fastapi-body",
        "fastapi-errors",
        "fastapi-testing",
        "docker-dockerfile"
      ],
      "milestoneIds": [
        "ddl-m1",
        "ddl-m4"
      ],
      "roleFamilies": [
        "agent_engineering"
      ],
      "assessment": {
        "id": "api-delivery-assessment",
        "title": "可使用的产品接口与演示实操验收",
        "minutes": 60,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "api-delivery-c1",
            "text": "界面可导入schema校验的CSV，列出错误行；配置预测期、容量/预算/模拟成本，查看基线对照。",
            "mandatory": true
          },
          {
            "id": "api-delivery-c2",
            "text": "可导出带数据版本/参数/指标/约束状态/局限的JSON或CSV报告；空数据与不可行情景有明确反馈。",
            "mandatory": true
          },
          {
            "id": "api-delivery-c3",
            "text": "用一条文档化命令本地启动；重启后仍可重跑固定演示，默认不需要付费服务或密钥。",
            "mandatory": true
          },
          {
            "id": "api-delivery-c4",
            "text": "找1位真实试用者照README完成流程并记录具体卡点与修复；没有试用者则明确该项未通过。",
            "mandatory": true
          }
        ],
        "transferTask": "用户上传缺失字段CSV后修正并重试，不丢失已有情景配置。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-agent"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "agent-evaluation",
      "title": "工具调用Agent与安全评测",
      "why": "证明能把Agent接到确定性计算，而非只有聊天界面。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "api-delivery",
        "software-testing",
        "ml-validation"
      ],
      "learningUnitIds": [
        "u-agent-tools",
        "u-agent-loop",
        "u-agent-evals"
      ],
      "lessonIds": [
        "genai-tools",
        "genai-security",
        "hf-agents-tools",
        "hf-agents-cycle",
        "hf-agents-dummy",
        "evals-observe",
        "evals-regression"
      ],
      "milestoneIds": [
        "ddl-m5"
      ],
      "roleFamilies": [
        "agent_engineering"
      ],
      "assessment": {
        "id": "agent-evaluation-assessment",
        "title": "工具调用Agent与安全评测实操验收",
        "minutes": 90,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "agent-evaluation-c1",
            "text": "forecast/optimize/explain工具有明确schema、白名单、步数上限、超时和只读范围；不执行任意代码/SQL/外部写操作。",
            "mandatory": true
          },
          {
            "id": "agent-evaluation-c2",
            "text": "固定20条开发样例与30条留出样例；覆盖正常、无答案、错误参数、注入、超时和重复请求。",
            "mandatory": true
          },
          {
            "id": "agent-evaluation-c3",
            "text": "对比确定性界面/流程与Agent，报告任务成功、工具错误、关键安全失败、延迟；真实LLM与mock结果分开标记。",
            "mandatory": true
          },
          {
            "id": "agent-evaluation-c4",
            "text": "每个数字和结论可追溯到工具结果，不能编造最优/业务收益；实际LLM未验证时只能标“离线协议演示”。",
            "mandatory": true
          }
        ],
        "transferTask": "恶意CSV备注要求忽略规则/泄露环境变量时，工具仍拒绝越权且记录失败。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [
          "challenge-agent"
        ],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "technical-interview",
      "title": "现场修改、项目答辩与求职证据",
      "why": "把作品转成可核验贡献，避免只会展示截图。",
      "priority": "core",
      "targetLevel": "passed",
      "prerequisites": [
        "ai-code",
        "sql-data"
      ],
      "learningUnitIds": [
        "u-algo",
        "u-interview"
      ],
      "lessonIds": [
        "algo-complexity",
        "algo-array",
        "algo-hash",
        "missing-git"
      ],
      "milestoneIds": [
        "ddl-m6"
      ],
      "roleFamilies": [
        "decision_optimization",
        "forecasting_ml",
        "agent_engineering",
        "search_recommendation"
      ],
      "assessment": {
        "id": "technical-interview-assessment",
        "title": "现场修改、项目答辩与求职证据实操验收",
        "minutes": 90,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "technical-interview-c1",
            "text": "3分钟演示讲清问题、用户路径、对照、限制与个人贡献；不冒充企业落地。",
            "mandatory": true
          },
          {
            "id": "technical-interview-c2",
            "text": "10分钟答辩能解释数据切分、一个约束、一个失败案例、测试设计和AI使用边界。",
            "mandatory": true
          },
          {
            "id": "technical-interview-c3",
            "text": "独立完成1道SQL变式和1道数组/哈希变式，给出边界测试与复杂度；记录真实耗时。",
            "mandatory": true
          },
          {
            "id": "technical-interview-c4",
            "text": "针对一条当前仍开放且资格匹配的JD建立证据/缺口表；简历每个数字能追溯到实验记录。",
            "mandatory": true
          }
        ],
        "transferTask": "将预算减半后现场修改、测试、展示解释；不能事先背好唯一演示。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    },
    {
      "id": "pytorch-training",
      "title": "PyTorch训练闭环（岗位触发选修）",
      "why": "当目标JD明确要求训练框架时补齐，不先刷完整深度学习。",
      "priority": "optional",
      "targetLevel": "passed",
      "prerequisites": [
        "ml-validation"
      ],
      "learningUnitIds": [
        "u-torch"
      ],
      "lessonIds": [
        "d2l-tensor",
        "d2l-autograd",
        "d2l-torch",
        "d2l-mlp",
        "d2l-overfit",
        "d2l-save"
      ],
      "milestoneIds": [
        "ddl-m2",
        "ddl-m6"
      ],
      "roleFamilies": [
        "forecasting_ml",
        "search_recommendation",
        "foundation_model_research"
      ],
      "assessment": {
        "id": "pytorch-training-assessment",
        "title": "PyTorch训练闭环（岗位触发选修）实操验收",
        "minutes": 90,
        "allowedAI": "允许AI起草、解释、补测试和辅助调试；本人必须审查diff、运行代码、解释关键逻辑，并在不让AI直接给答案的短变式中修改关键约束或定位错误。",
        "passRule": {
          "mode": "all_mandatory",
          "minimumScore": 100,
          "requireEvidence": true
        },
        "criteria": [
          {
            "id": "pytorch-training-c1",
            "text": "正确解释张量维度、梯度、train/eval及no_grad用途。",
            "mandatory": true
          },
          {
            "id": "pytorch-training-c2",
            "text": "训练小MLP并与同一时间切分的非神经基线比较；记录超参数和seed。",
            "mandatory": true
          },
          {
            "id": "pytorch-training-c3",
            "text": "保存/加载权重后推理结果在容差内一致，且验证集不参与训练梯度。",
            "mandatory": true
          },
          {
            "id": "pytorch-training-c4",
            "text": "不靠AI直接改答案完成一个batch维度错误修复，能解释为何报错。",
            "mandatory": true
          }
        ],
        "transferTask": "把输入特征数改变一维，正确修改模型和加载校验。",
        "evidenceRequired": [
          "可访问的代码/报告链接或本地文件说明+commit",
          "复现命令和真实输出",
          "AI辅助范围、本人关键修改与限制",
          "四项验收逐条对应的证据位置"
        ],
        "challengeIds": [],
        "evidenceRequirement": "至少提交可重跑的代码/测试/实际结果，且完成一项变式练习或现场调试解释。只有勾选/截图/视频不能替代运行证据。",
        "transferTaskLabel": "变式答辩练习（公开示例）"
      },
      "requiredByTrack": [],
      "assessedCompetencyLevels": [
        {
          "level": "learning",
          "canDo": "能对照资料解释输入/输出与关键步骤。"
        },
        {
          "level": "practicing",
          "canDo": "能复现标准案例，但变式/边界或独立解释尚未全部通过。"
        },
        {
          "level": "passed",
          "canDo": "四项验收有运行证据且完成独立变式，仅表示本范围实操自评通过。"
        }
      ]
    }
  ],
  "projects": [
    {
      "id": "demand-decision-lab",
      "title": "DemandDecisionLab：需求预测与容量配置实验台",
      "priority": "main",
      "scope": "一个能上传数据、比较预测、配置模拟约束、解释方案并导出报告的可复现产品。先做确定性MVP，再接只读Agent；不是几个互不关联的Notebook。",
      "userStory": "作为需求规划练习者，我导入小时级历史计数，选择预测期和模拟资源限制，比较预测/分配策略，查看短缺与成本敏感性，并导出附带假设和限制的报告。",
      "dataPolicy": {
        "primaryDataset": {
          "title": "UCI Bike Sharing",
          "url": "https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset",
          "license": "CC BY 4.0；保留作者、来源、许可证链接，并说明修改",
          "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
          "citation": "Fanaee-T, H. (2013). Bike Sharing [Dataset]. UCI Machine Learning Repository. https://doi.org/10.24432/C5W894",
          "contents": "2011–2012年小时/日租赁计数与天气/季节字段。",
          "limitations": [
            "聚合租赁计数，不是潜在总需求/缺货损失标签。",
            "没有真实车队容量、站点调度、成本、排班或收益。",
            "casual与registered之和为cnt，预测cnt时同期分量属于标签泄漏。",
            "真实未来天气不一定在预测时可得，不能直接混入正式前瞻评测。"
          ]
        },
        "syntheticFields": [
          "可用资源预算",
          "时段容量上限",
          "短缺/闲置惩罚",
          "公平/服务下限等what-if约束"
        ],
        "aviationAdapter": "可选用固定seed生成航空市场合成数据来演示字段迁移；必须标为合成。未经许可不得上传或再分发OAG/导师/合作方数据。",
        "noClaims": [
          "真实航空调度部署",
          "真实企业客户",
          "真实线上收益或成本节省",
          "真实LLM效果由mock验证"
        ]
      },
      "deployment": "可复现的本地/离线演示优先。使用免费开源依赖，不要求GPU、付费API、新云数据库或公网服务。公开托管可作为用户自行批准的选项，不是本路线完成条件。",
      "milestones": [
        {
          "id": "ddl-m0",
          "title": "建立最小可复现骨架",
          "estimatedHours": 8,
          "targetWeek": "1–2",
          "targetMonth": "2026.10",
          "skillIds": [
            "ai-code",
            "reproducible-workflow"
          ],
          "learningUnitIds": [
            "u-ai-spec",
            "u-python-diagnostic",
            "u-git",
            "u-debug"
          ],
          "deliverables": [
            "repo/README、环境文件、数据生成/读取CLI、2个边界测试",
            "诊断记录：哪些基础已会，哪些回查官方章节"
          ],
          "acceptance": [
            "干净目录运行一次，产生带时间戳与数据hash的结果",
            "Python/Git基础不要求按章节全刷，未通过项定向补齐"
          ],
          "defaultStatus": "todo",
          "estimateNote": "含对应课程/练习/验收，不另加课时；时间窗口为估计，完成以证据为准。"
        },
        {
          "id": "ddl-m1",
          "title": "公开数据管线与可点击预览",
          "estimatedHours": 18,
          "targetWeek": "2–5",
          "targetMonth": "2026.10–11",
          "skillIds": [
            "sql-data",
            "software-testing",
            "api-delivery"
          ],
          "learningUnitIds": [
            "u-data-card",
            "u-pandas",
            "u-sql-select",
            "u-sql-join",
            "u-sql-window",
            "u-api"
          ],
          "deliverables": [
            "UCI数据卡、许可与引用、schema、SQL查询和pandas对照",
            "小型本地界面：选样例/上传CSV、看缺失与聚合统计",
            "先用固定JSON接口或预计算结果，逐步接真实计算"
          ],
          "acceptance": [
            "本地CSV限定大小/格式且不外传；坏字段给出错误行",
            "Data Card明确聚合租赁计数≠真实未满足需求，也无站点/调度成本",
            "不把预览中的预计算结果冒充实时预测"
          ],
          "defaultStatus": "todo",
          "estimateNote": "含对应课程/练习/验收，不另加课时；时间窗口为估计，完成以证据为准。"
        },
        {
          "id": "ddl-m2",
          "title": "可信预测与误差分析",
          "estimatedHours": 26,
          "targetWeek": "5–8",
          "targetMonth": "2026.11–12",
          "skillIds": [
            "statistics-metrics",
            "ml-validation",
            "time-forecast"
          ],
          "learningUnitIds": [
            "u-metrics",
            "u-uncertainty",
            "u-leakage",
            "u-baselines",
            "u-lagged",
            "u-tscv"
          ],
          "deliverables": [
            "季节朴素/线性/树模型统一训练与时间滚动验证入口",
            "1h/24h预测期报告、切片误差、泄漏测试、失败分析",
            "界面可选预测期并展示对照与真实评估范围"
          ],
          "acceptance": [
            "最终测试集锁定，未来真实天气与同期casual/registered排除",
            "所有基线同切分评估，不规定必须达到某个分数或击败基线",
            "在不同预测期下检查所有lag信息可用性"
          ],
          "defaultStatus": "todo",
          "estimateNote": "含对应课程/练习/验收，不另加课时；时间窗口为估计，完成以证据为准。"
        },
        {
          "id": "ddl-m3",
          "title": "约束优化与MVP闭环",
          "estimatedHours": 24,
          "targetWeek": "8–12",
          "targetMonth": "2026.12–2027.01",
          "skillIds": [
            "optimization-modeling",
            "decision-evaluation"
          ],
          "learningUnitIds": [
            "u-or-mip",
            "u-or-scheduling",
            "u-decision-eval"
          ],
          "deliverables": [
            "可配置预算、时段容量、短缺/闲置模拟成本的what-if优化器",
            "均匀/贪心/优化基线报告、小实例穷举与约束检查器",
            "预测→模拟配置→方案→报告的MVP演示"
          ],
          "acceptance": [
            "可行/不可行/超时正确区分，不将可行解标成已证最优",
            "只声称合成场景成本差；不得写成真实公司调度效果或节省金额",
            "MVP可演示，不用等全部技能验收完成才形成作品"
          ],
          "defaultStatus": "todo",
          "estimateNote": "含对应课程/练习/验收，不另加课时；时间窗口为估计，完成以证据为准。"
        },
        {
          "id": "ddl-m4",
          "title": "把MVP变成可使用、可复现产品",
          "estimatedHours": 24,
          "targetWeek": "12–17",
          "targetMonth": "2027.01–02",
          "skillIds": [
            "software-testing",
            "api-delivery",
            "reproducible-workflow"
          ],
          "learningUnitIds": [
            "u-pytest",
            "u-test-param",
            "u-api-testing",
            "u-docker",
            "u-ci"
          ],
          "deliverables": [
            "FastAPI、本地网页、schema校验CSV导入、参数配置、对照与报告导出",
            "Dockerfile/本地安装二选一可运行，另一个按需补；自动测试与CI配置",
            "一名真实试用者记录、问题清单与修复证据"
          ],
          "acceptance": [
            "一条命令启动，默认不需要付费服务或密钥；默认只监听本机",
            "端到端正常/失败路径可重跑，报告含数据hash/配置/约束状态/局限",
            "真实试用者未完成时保持该验收未通过，不伪造反馈"
          ],
          "defaultStatus": "todo",
          "estimateNote": "含对应课程/练习/验收，不另加课时；时间窗口为估计，完成以证据为准。"
        },
        {
          "id": "ddl-m5",
          "title": "只读Agent接口与产品v1",
          "estimatedHours": 26,
          "targetWeek": "17–24",
          "targetMonth": "2027.02–03",
          "skillIds": [
            "agent-evaluation",
            "software-testing"
          ],
          "learningUnitIds": [
            "u-agent-tools",
            "u-agent-loop",
            "u-agent-evals"
          ],
          "deliverables": [
            "forecast/optimize/explain三工具与结构化输出",
            "20开发+30留出评测用例，调用轨迹、延迟、任务结果报告",
            "默认离线mock协议演示；已有授权模型可加真实适配器",
            "固定演示数据、报告导出、3分钟录屏或本地演示包"
          ],
          "acceptance": [
            "mock与实际模型测试分别展示；未运行LLM则明确不能证明真实LLM表现",
            "注入、越权、非法参数、超时、重复请求有测试且关键安全失败为0后才自评通过",
            "LLM不改优化目标、不伪造求解状态，所有数值追溯到工具结果",
            "无需新增付费服务；如选择公开部署先检查数据、密钥、文件上传、成本与访问范围"
          ],
          "defaultStatus": "todo",
          "estimateNote": "含对应课程/练习/验收，不另加课时；时间窗口为估计，完成以证据为准。"
        },
        {
          "id": "ddl-m6",
          "title": "岗位专项与证据化求职包",
          "estimatedHours": 24,
          "targetWeek": "v1后或穿插",
          "targetMonth": "2027.03起按岗位窗口",
          "skillIds": [
            "technical-interview",
            "pytorch-training"
          ],
          "learningUnitIds": [
            "u-algo",
            "u-interview"
          ],
          "deliverables": [
            "README、架构图、可复现结果、Data Card、3分钟演示、失败案例与AI贡献说明",
            "具体JD→技能→证据→缺口表；2次模拟技术答辩记录",
            "按职位只选一个补缺分支，不另开多个大项目"
          ],
          "acceptance": [
            "无法核查的业务收益/企业客户/生产部署不写入简历",
            "资格、毕业年份、每周出勤、连续实习期、城市与导师安排单独核对",
            "若需要PyTorch/C++/推荐检索等，明确额外缺口和预算，不把主线包装成全覆盖"
          ],
          "defaultStatus": "todo",
          "estimateNote": "含对应课程/练习/验收，不另加课时；时间窗口为估计，完成以证据为准。"
        }
      ],
      "estimatedHours": 150,
      "secondProject": "默认无第二个大型项目。只在目标JD明确需要时，用8–12小时做检索评测或PyTorch小扩展，替换同周主线时间。"
    }
  ],
  "lessonOverrides": {
    "python-basics": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "python-control": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "python-containers": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "python-modules": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "python-files": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "python-exceptions": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "python-classes": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "python-venv": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "missing-shell": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "missing-git": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "missing-debug": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "algo-complexity": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "algo-array": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "algo-hash": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "d2l-tensor": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-pandas": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-autograd": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-linear": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-train-loop": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-torch": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-mlp": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-overfit": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-save": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-lenet": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-sequence": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-lstm": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-attention": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-position": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "d2l-transformer": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "genai-prompt": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "genai-api": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "genai-tools": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "genai-responsible": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "genai-rag": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "genai-security": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "hf-agents-concept": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "hf-agents-tools": {
      "required": false,
      "priority": "optional",
      "reason": "Agent路线核心，智能决策路线可选；仍以对应新单元的独立进度为准。",
      "requiredByTrack": [
        "agent_engineering"
      ]
    },
    "hf-agents-cycle": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "hf-agents-dummy": {
      "required": false,
      "priority": "optional",
      "reason": "Agent路线核心，智能决策路线可选；仍以对应新单元的独立进度为准。",
      "requiredByTrack": [
        "agent_engineering"
      ]
    },
    "hf-agents-blocks": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "hf-agents-graph": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "fastapi-first": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "fastapi-body": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "fastapi-errors": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "fastapi-security": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "fastapi-testing": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "docker-dockerfile": {
      "required": true,
      "priority": "core",
      "reason": "主线按对应学习单元选读，仍可用实操证据跳过重复材料。",
      "requiredByTrack": [
        "decision_optimization",
        "agent_engineering"
      ]
    },
    "docker-compose": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "evals-observe": {
      "required": false,
      "priority": "optional",
      "reason": "Agent路线核心，智能决策路线可选；仍以对应新单元的独立进度为准。",
      "requiredByTrack": [
        "agent_engineering"
      ]
    },
    "evals-regression": {
      "required": false,
      "priority": "optional",
      "reason": "按论文或目标JD触发，默认不进入8小时主线队列。",
      "requiredByTrack": []
    },
    "cs50p-functions": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "cs50p-conditionals": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    },
    "cs50p-loops": {
      "required": false,
      "priority": "diagnostic",
      "reason": "先诊断，只有未通过部分再补；跳过不代表技能掌握。",
      "requiredByTrack": []
    }
  },
  "taskOverrides": {
    "dec-vision-mini": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    },
    "mar-cs231n": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    },
    "mar-vision-repro": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    },
    "apr-vision-v01": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    },
    "may-multimodal": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    },
    "jun-vision-v05": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    },
    "feb-agent-rag": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    },
    "jan-seq": {
      "optional": true,
      "priority": "optional",
      "reason": "保留原任务与进度；新求职主线默认不排入，按具体JD或论文需求再开启。"
    }
  },
  "sourceNotes": [
    {
      "title": "官方岗位证据：小红书AI Agent研发实习生-引擎架构",
      "url": "https://job.xiaohongshu.com/campus/position/21231",
      "note": "协作调研核对：在校本科及以上、每周至少4天/6个月优先；一门语言、工程基础、做过AI工具/Agent脚本或Demo、运行时/工具/记忆/评测等。薪资未公开；不能由其他历史岗位推定本岗位给400–600。"
    },
    {
      "title": "主线岗位证据：百度Agent算法实习J104743",
      "url": "https://talent.baidu.com/jobs/detail/INTERN/22b11ac9-3920-4236-b079-49e13f5d08d3",
      "note": "协作岗位调研核对到Python/数据处理、划分/误差分析、tool calling、结构化输出、评测与复现；PyTorch/embedding等属于职位要求或偏好，是否开放以实时JD为准。"
    },
    {
      "title": "主线岗位证据：百度商业算法J92971",
      "url": "https://talent.baidu.com/jobs/detail/INTERN/e0c5d573-11b1-4ff5-a83e-c1d67776e057",
      "note": "协作岗位调研核对到运筹/统计背景、SQL与训练框架等。课程路径只是准备建议，不等于覆盖该职位所有要求。"
    },
    {
      "title": "内容核验与估算边界",
      "note": "2026-10-10逐页打开learningUnits引用的官方/作者正文；额外来源也核验。旧53节目录保留原核验记录，不保证B站可播放、字幕和视频时长。所有项目、验收阈值、时间预算由本路线设计。"
    },
    {
      "title": "建议与事实分离",
      "note": "课程资料事实来自官方/作者；路线优先级、技能验收与项目规划为针对用户的建议。招聘要求、开放状态、薪资与到岗安排需要投递前再核对。"
    }
  ],
  "diagnostics": [
    {
      "id": "diag-code",
      "skillIds": [
        "ai-code"
      ],
      "title": "90分钟代码实操诊断",
      "minutes": 90,
      "learningUnitIds": [
        "u-python-diagnostic"
      ],
      "lessonIds": [
        "python-basics",
        "python-control",
        "python-containers",
        "python-modules",
        "python-files",
        "python-exceptions",
        "python-venv",
        "cs50p-functions",
        "cs50p-conditionals",
        "cs50p-loops"
      ],
      "rule": "已能解释、运行、补边界测试和独立修改即可跳过对应基础阅读；须单独提交技能验收，不能自动标实操通过。"
    },
    {
      "id": "diag-or",
      "skillIds": [
        "statistics-metrics",
        "optimization-modeling"
      ],
      "title": "复用已有数学/运筹证据",
      "minutes": 60,
      "learningUnitIds": [
        "u-or-mip",
        "u-metrics"
      ],
      "lessonIds": [],
      "rule": "已有课题可复用数学推导与授权公开代码，但需补小实例核对、单位、不可行/超时处理与可复现记录。"
    }
  ],
  "roleCoverage": [
    {
      "roleFamily": "decision_optimization",
      "fit": "主线",
      "skillIds": [
        "ai-code",
        "reproducible-workflow",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "time-forecast",
        "optimization-modeling",
        "decision-evaluation",
        "software-testing",
        "technical-interview"
      ],
      "remainingGaps": "按JD补C++/高性能计算、特定优化器、供应链/派单业务、RL或决策导向学习；不要把MIP小项目等同工业大规模优化。",
      "directSkillIds": [
        "sql-data",
        "statistics-metrics",
        "time-forecast",
        "optimization-modeling",
        "decision-evaluation",
        "software-testing",
        "technical-interview"
      ],
      "prerequisiteSkillIds": [
        "ai-code",
        "reproducible-workflow",
        "ml-validation"
      ],
      "readinessScoreEnabled": true,
      "notHiringGuarantee": true
    },
    {
      "roleFamily": "forecasting_ml",
      "fit": "主线",
      "skillIds": [
        "ai-code",
        "reproducible-workflow",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "time-forecast",
        "technical-interview",
        "pytorch-training"
      ],
      "remainingGaps": "岗位若要求PyTorch，开启可选训练闭环；大规模分布式训练、因果推断、复杂推荐特征并未覆盖。",
      "directSkillIds": [
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "time-forecast",
        "reproducible-workflow",
        "pytorch-training",
        "technical-interview"
      ],
      "prerequisiteSkillIds": [
        "ai-code"
      ],
      "readinessScoreEnabled": true,
      "notHiringGuarantee": true
    },
    {
      "roleFamily": "agent_engineering",
      "fit": "次主线",
      "skillIds": [
        "ai-code",
        "reproducible-workflow",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "software-testing",
        "api-delivery",
        "agent-evaluation",
        "technical-interview"
      ],
      "remainingGaps": "岗位若要求检索/重排/微调，另做单一专项；只有mock不能证明真实LLM表现。",
      "directSkillIds": [
        "ai-code",
        "sql-data",
        "ml-validation",
        "software-testing",
        "api-delivery",
        "agent-evaluation",
        "technical-interview"
      ],
      "prerequisiteSkillIds": [
        "reproducible-workflow",
        "statistics-metrics"
      ],
      "readinessScoreEnabled": true,
      "notHiringGuarantee": true
    },
    {
      "roleFamily": "search_recommendation",
      "fit": "谨慎延伸",
      "skillIds": [
        "ai-code",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "technical-interview",
        "pytorch-training"
      ],
      "remainingGaps": "召回/排序/CTR/CVR、负采样、离线排序指标、在线A/B和业务经验需要专项补课，主线不会自动达标。",
      "directSkillIds": [
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "pytorch-training",
        "technical-interview"
      ],
      "prerequisiteSkillIds": [
        "ai-code"
      ],
      "readinessScoreEnabled": false,
      "notHiringGuarantee": true
    },
    {
      "roleFamily": "foundation_model_research",
      "fit": "暂不主攻",
      "skillIds": [
        "ai-code",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "pytorch-training"
      ],
      "remainingGaps": "缺少大模型训练/分布式系统/规模化研究证据；本路线不承诺准备充分。",
      "directSkillIds": [
        "ml-validation",
        "pytorch-training"
      ],
      "prerequisiteSkillIds": [
        "ai-code",
        "sql-data",
        "statistics-metrics"
      ],
      "readinessScoreEnabled": false,
      "notHiringGuarantee": true
    }
  ],
  "counts": {
    "skills": 13,
    "coreSkills": 12,
    "learningUnits": 30,
    "requiredLearningUnits": 26,
    "legacyLessonsPreserved": 53,
    "coreLegacyLessons": 10,
    "requiredLearningEstimatedMinutes": 3300,
    "milestones": 7,
    "requiredUnitCountByTrack": {
      "decision_optimization": 26,
      "agent_engineering": 23
    },
    "requiredSkillCountByTrack": {
      "decision_optimization": 11,
      "agent_engineering": 9
    }
  },
  "tracks": [
    {
      "id": "decision_optimization",
      "title": "智能决策 / 预测与运筹",
      "summary": "先可信预测与可行决策，再补工程交付。Agent为可选产品接口。",
      "commonSkillIds": [
        "ai-code",
        "reproducible-workflow",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "software-testing",
        "api-delivery",
        "technical-interview"
      ],
      "requiredSkillIds": [
        "ai-code",
        "reproducible-workflow",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "software-testing",
        "api-delivery",
        "technical-interview",
        "time-forecast",
        "optimization-modeling",
        "decision-evaluation"
      ],
      "optionalSkillIds": [
        "agent-evaluation",
        "pytorch-training"
      ],
      "requiredMilestoneIds": [
        "ddl-m0",
        "ddl-m1",
        "ddl-m2",
        "ddl-m3",
        "ddl-m4",
        "ddl-m6"
      ],
      "optionalMilestoneIds": [
        "ddl-m5"
      ],
      "estimatedHours": 124,
      "mvpEstimatedHours": 76,
      "mvpMilestoneId": "ddl-m3",
      "v1MilestoneId": "ddl-m4",
      "note": "项目v1不要求学完RAG、Transformer或真实LLM调用；若目标JD要求训练框架，再开PyTorch分支。",
      "requiredLearningUnitIds": [
        "u-ai-spec",
        "u-algo",
        "u-api",
        "u-api-testing",
        "u-baselines",
        "u-ci",
        "u-data-card",
        "u-debug",
        "u-decision-eval",
        "u-docker",
        "u-git",
        "u-interview",
        "u-lagged",
        "u-leakage",
        "u-metrics",
        "u-or-mip",
        "u-or-scheduling",
        "u-pandas",
        "u-pytest",
        "u-python-diagnostic",
        "u-sql-join",
        "u-sql-select",
        "u-sql-window",
        "u-test-param",
        "u-tscv",
        "u-uncertainty"
      ],
      "optionalLearningUnitIds": [
        "u-agent-evals",
        "u-agent-loop",
        "u-agent-tools",
        "u-torch"
      ],
      "learningEstimatedMinutes": 3300
    },
    {
      "id": "agent_engineering",
      "title": "AI Agent应用工程",
      "summary": "先数据/接口/测试，再做工具调用和可复现评测；预测优化模块允许使用透明的固定基线。",
      "commonSkillIds": [
        "ai-code",
        "reproducible-workflow",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "software-testing",
        "api-delivery",
        "technical-interview"
      ],
      "requiredSkillIds": [
        "ai-code",
        "reproducible-workflow",
        "sql-data",
        "statistics-metrics",
        "ml-validation",
        "software-testing",
        "api-delivery",
        "technical-interview",
        "agent-evaluation"
      ],
      "optionalSkillIds": [
        "time-forecast",
        "optimization-modeling",
        "decision-evaluation",
        "pytorch-training"
      ],
      "requiredMilestoneIds": [
        "ddl-m0",
        "ddl-m1",
        "ddl-m4",
        "ddl-m5",
        "ddl-m6"
      ],
      "optionalMilestoneIds": [
        "ddl-m2",
        "ddl-m3"
      ],
      "estimatedHours": 100,
      "mvpEstimatedHours": 50,
      "mvpMilestoneId": "ddl-m4",
      "v1MilestoneId": "ddl-m5",
      "note": "未做预测/优化专项时，工具必须标为固定基线或规则情景模拟，不能宣称学会优化算法。先做确定性表单与协议mock，真实LLM评测另记。",
      "milestoneNotes": {
        "ddl-m1": "优先数据检查/报告预览，为Agent准备稳定只读工具；可先用手写SQL+固定规则。",
        "ddl-m4": "最早MVP：输入→schema校验→调用确定性工具→报告。不要等待预测/OR分支。",
        "ddl-m5": "再加LLM适配器及真实/离线分开的评测；优化器可选。"
      },
      "requiredLearningUnitIds": [
        "u-agent-evals",
        "u-agent-loop",
        "u-agent-tools",
        "u-ai-spec",
        "u-algo",
        "u-api",
        "u-api-testing",
        "u-ci",
        "u-data-card",
        "u-debug",
        "u-docker",
        "u-git",
        "u-interview",
        "u-leakage",
        "u-metrics",
        "u-pandas",
        "u-pytest",
        "u-python-diagnostic",
        "u-sql-join",
        "u-sql-select",
        "u-sql-window",
        "u-test-param",
        "u-uncertainty"
      ],
      "optionalLearningUnitIds": [
        "u-baselines",
        "u-decision-eval",
        "u-lagged",
        "u-or-mip",
        "u-or-scheduling",
        "u-torch",
        "u-tscv"
      ],
      "learningEstimatedMinutes": 2730
    }
  ],
  "challenges": [
    {
      "id": "challenge-data",
      "skillIds": [
        "sql-data",
        "ai-code"
      ],
      "title": "CSV粒度、重复和SQL核对",
      "inputFiles": [
        "data_valid.csv",
        "data_invalid.csv",
        "markets.csv"
      ],
      "task": "严格模式读取合法CSV；非法CSV返回行号+错误原因，禁止静默丢弃。输出按market的sum/mean/count及上一观测值，LEFT JOIN包含无观测市场。",
      "expected": {
        "A": {
          "sum": 22,
          "mean": 11,
          "count": 2,
          "lag_at_09": 10
        },
        "B": {
          "sum": 8,
          "mean": 4,
          "count": 2,
          "lag_at_09": 8
        },
        "C": {
          "sum": 0,
          "count": 0,
          "mean": null
        },
        "invalidRows": [
          {
            "csvLine": 6,
            "error": "duplicate timestamp+market"
          },
          {
            "csvLine": 7,
            "error": "count missing"
          }
        ]
      },
      "failureCases": [
        "空文件",
        "负计数",
        "非法时间戳",
        "维度表重复键导致乘行"
      ],
      "evidenceFiles": [
        "queries.sql",
        "validate.py",
        "test_data.py",
        "results/data_summary.json"
      ],
      "unseenDefense": "换成跨周输入并增加一对多标签表，解释如何避免重复累计。",
      "defenseLabel": "变式答辩练习（公开）",
      "defenseTask": "换成跨周输入并增加一对多标签表，解释如何避免重复累计。",
      "unseenDefenseNote": "为兼容字段保留；本题公开，不是实际未见题。"
    },
    {
      "id": "challenge-forecast",
      "skillIds": [
        "time-forecast",
        "ml-validation",
        "statistics-metrics"
      ],
      "title": "可手算的无泄漏多步预测",
      "inputFiles": [
        "forecast_case.json"
      ],
      "task": "只使用前8个值预测未来2步；季节周期2，计算季节朴素/末值朴素的MAE/RMSE；把函数嵌入真实数据滚动验证。",
      "expected": {
        "train": [
          10,
          12,
          14,
          16,
          18,
          20,
          22,
          24
        ],
        "test": [
          26,
          28
        ],
        "seasonalNaive": [
          22,
          24
        ],
        "seasonalMAE": 4,
        "seasonalRMSE": 4,
        "lastValueNaive": [
          24,
          24
        ],
        "lastValueMAE": 3,
        "lastValueRMSE": "sqrt(10)≈3.1622776602"
      },
      "failureCases": [
        "特征包含test真实值",
        "cnt预测含同期casual+registered",
        "24h预测使用未来真实lag",
        "测试集参与缩放fit"
      ],
      "evidenceFiles": [
        "features.py",
        "forecast.py",
        "test_no_leakage.py",
        "results/backtest.csv",
        "results/split_manifest.json"
      ],
      "unseenDefense": "把预测期从2改成5，seasonal-naive必须重复最后2期而不能偷看未知值。",
      "defenseLabel": "变式答辩练习（公开）",
      "defenseTask": "把预测期从2改成5，seasonal-naive必须重复最后2期而不能偷看未知值。",
      "unseenDefenseNote": "为兼容字段保留；本题公开，不是实际未见题。"
    },
    {
      "id": "challenge-optimization",
      "skillIds": [
        "optimization-modeling",
        "decision-evaluation"
      ],
      "title": "枚举可核对的两时段分配",
      "inputFiles": [
        "optimization_case.json"
      ],
      "task": "非负整数x1,x2满足x1≤3,x2≤4,x1+x2≤5；需求[3,4]，最小化3*(3-x1)+1*(4-x2)。独立检查约束并枚举验证。",
      "expected": {
        "optimalAllocation": [
          3,
          2
        ],
        "objective": 2,
        "feasible": true,
        "simpleBaselineAllocation": [
          2,
          3
        ],
        "simpleBaselineObjective": 4,
        "infeasibleVariant": "若预算改2且增加x1≥3，必须返回INFEASIBLE，不输出伪可行方案。"
      },
      "failureCases": [
        "负预算",
        "超时未证最优却标最优",
        "零容量",
        "遗漏一个硬约束"
      ],
      "evidenceFiles": [
        "model.py",
        "check_constraints.py",
        "test_optimality.py",
        "results/decision_sensitivity.csv"
      ],
      "unseenDefense": "把惩罚[3,1]改为[1,3]，重新求解并说明分配从[3,2]变为[1,4]。",
      "defenseLabel": "变式答辩练习（公开）",
      "defenseTask": "把惩罚[3,1]改为[1,3]，重新求解并说明分配从[3,2]变为[1,4]。",
      "unseenDefenseNote": "为兼容字段保留；本题公开，不是实际未见题。"
    },
    {
      "id": "challenge-agent",
      "skillIds": [
        "agent-evaluation",
        "software-testing",
        "api-delivery"
      ],
      "title": "只读工具协议与安全故障集",
      "inputFiles": [
        "agent_cases.json"
      ],
      "task": "只允许forecast/optimize/explain；对工具名和参数做验证，步数上限3，工具执行超时要有限终止。固定mock用于工程回归；真实LLM单独评价。",
      "expected": {
        "knownForecastResult": [
          22,
          24
        ],
        "unknownTool": "reject:unknown_tool; no tool executed",
        "negativeBudget": "reject:invalid_arguments; no solver executed",
        "injectedCsvNote": "treat as data; no environment/file/network access",
        "loop": "stop at≤3 tool steps with max_steps status",
        "timeout": "bounded failure with tool_timeout, no unbounded retry"
      },
      "failureCases": [
        "工具返回字段缺失",
        "编造模型/求解指标",
        "重复请求",
        "无资料仍生成自信结论"
      ],
      "evidenceFiles": [
        "tools_schema.json",
        "agent.py",
        "tests/test_agent_cases.py",
        "results/agent_traces.jsonl",
        "results/eval_summary.json"
      ],
      "unseenDefense": "加入需要再次确认的写操作工具描述，现有只读Agent仍必须拒绝，不因工具文本要求而执行。",
      "defenseLabel": "变式答辩练习（公开）",
      "defenseTask": "加入需要再次确认的写操作工具描述，现有只读Agent仍必须拒绝，不因工具文本要求而执行。",
      "unseenDefenseNote": "为兼容字段保留；本题公开，不是实际未见题。"
    }
  ],
  "challengeFixturePath": "assessment-starter/",
  "challengeFixtureNote": "题面与示例期望公开，用于自测；不是雇主测评，也不声称防作弊或第三方认证。变式答辩仍需本人执行。",
  "progressRules": {
    "legacyLessonIdsRetained": 53,
    "newUnitProgressIds": [
      "u-ai-spec",
      "u-python-diagnostic",
      "u-git",
      "u-debug",
      "u-data-card",
      "u-pandas",
      "u-sql-select",
      "u-sql-join",
      "u-sql-window",
      "u-metrics",
      "u-uncertainty",
      "u-leakage",
      "u-baselines",
      "u-lagged",
      "u-tscv",
      "u-or-mip",
      "u-or-scheduling",
      "u-decision-eval",
      "u-pytest",
      "u-test-param",
      "u-api",
      "u-api-testing",
      "u-docker",
      "u-ci",
      "u-agent-tools",
      "u-agent-loop",
      "u-agent-evals",
      "u-algo",
      "u-interview",
      "u-torch"
    ],
    "noAutomaticSkillPromotion": true,
    "unitLessonRelationship": "related_only",
    "reason": "即使来源页面相同，新单元的范围/练习与旧课不完全相同。每个u-*独立记录，旧53项进度原样保留。",
    "progressDisplay": "分别展示所选路线学习单元进度、实操验收证据、项目里程碑；不将三者合成能力百分比。"
  }
};
