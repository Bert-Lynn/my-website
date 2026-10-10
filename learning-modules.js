// Generated public data. Edit data/learning-modules.json and run node scripts/build-career-data.cjs.
window.LEARNING_MODULES = {
  "version": 1,
  "curriculumVersion": 2,
  "intro": {
    "title": "按这6步，做出一个小工具",
    "steps": [
      "从首页第1个大模块开始。点进去，就能看到学什么、做什么和具体小节。",
      "按当前项目阶段动手，遇到缺口再看对应资料；旧练习和旧自查可按需参考，不必先刷完。原题仍按原要求记录，新作品另按阶段检查。",
      "做出本模块的小成果，再继续下一步。每周通常安排6小时、最多8小时；论文返修周最多3小时。"
    ],
    "note": "当前优先准备AI应用开发。软件、演示和新论文仍要逐步完成，旧练习记录不会自动变成新项目成果。"
  },
  "budget": {
    "weeklyCapHours": 8,
    "plannedWeeklyHours": 6,
    "bufferWeeklyHours": 2,
    "revisionWeekHours": 3,
    "fullProductEstimatedHours": 150,
    "summary": "每周通常6小时，最多8小时；论文返修周最多3小时。先选一条路线，选学也占同一份时间。",
    "estimateScope": "原完整项目的150小时估计仅供历史参考；当前AI选项比较助手不沿用该工期。"
  },
  "projectExample": {
    "title": "AI选项比较助手",
    "description": "你接下来会做一个小型AI应用：给它候选表和条件，让它调用查询与计算工具，检查限制，再解释比较依据。",
    "demoSteps": [
      "读入候选表",
      "明确预算和偏好",
      "调用查询与计算工具",
      "检查条件并解释依据",
      "保存对比报告与调用记录"
    ],
    "example": "第一款演示叫“航班怎么选”：用虚构航班比较费用、总时间和限制；改一个条件，看看结果与解释如何变化。",
    "stateLabel": "已确定学习方向 · 软件尚未建成",
    "limitations": "演示使用虚构或获准使用的数据，不查询实时票价或代订机票。固定模拟回答不能证明真实AI表现。",
    "byTrack": {
      "agent_engineering": "重点是读表、理解条件、工具调用、错误处理、评测和交付。预测与资源分配是选学。",
      "decision_optimization": "保留原预测与资源分配学习路线及记录，作为需要时的扩展；不是新助手第一版的必备步骤。"
    }
  },
  "progressCopy": {
    "module": "模块学习",
    "unit": "小节练习",
    "assessment": "动手检查",
    "milestone": "项目成果",
    "unitDone": "练习做完了",
    "moduleCompletionNote": "模块进度按小节记录。看完资料、做完小节和做好项目分别记录，不会自动互相标成完成。",
    "assessmentNote": "旧技能自查是按原题记录的参考证据，不是新项目阶段的完成条件。"
  },
  "tracks": [
    {
      "id": "decision_optimization",
      "title": "预测和分配",
      "description": "先学会预测数量、安排有限资源，再做成可操作的小工具。",
      "estimatedHours": 124,
      "firstDemoEstimatedHours": 76,
      "firstDemoMilestoneId": "ddl-m3",
      "requiredUnitCount": 26,
      "requiredSkillCount": 11,
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
      "learningEstimatedMinutes": 3300,
      "modules": [
        {
          "id": "code",
          "title": "用AI写程序",
          "learn": "学会把要求告诉AI，再自己运行、查错和修改一小段程序。",
          "make": "你会写出一个能读入表格、输出统计结果的小程序，并保存修改记录。",
          "done": "换一份数据还能运行；你能自己改一个统计规则，并解释两个边界测试。",
          "unitIds": [
            "u-python-diagnostic",
            "u-ai-spec",
            "u-git",
            "u-debug"
          ],
          "milestoneIds": [
            "ddl-m0"
          ],
          "skillIds": [
            "ai-code"
          ],
          "relatedSkillIds": [
            "ai-code",
            "reproducible-workflow"
          ],
          "prerequisiteModuleIds": [],
          "prerequisiteLabel": "从这里开始。先做小练习，看看哪些已经会了。",
          "learningEstimatedMinutes": 390,
          "branches": [],
          "diagnosticUnitIds": [
            "u-python-diagnostic"
          ],
          "diagnosticNote": "先用最多90分钟做基础小练习。已经会的知识不用重看，没做出来的部分再补；仍要如实记录练习是否完成。"
        },
        {
          "id": "data",
          "title": "整理数据",
          "learn": "学会读表格、查重复和空值、合并表格，再按小时统计租车数量。",
          "make": "你会做出一份数据来源说明、几条统计查询和一个能看数据结果的本地预览页。",
          "done": "正常文件能显示统计结果；坏数据指出哪一行出错；两种统计方法的结果对得上。",
          "unitIds": [
            "u-data-card",
            "u-pandas",
            "u-sql-select",
            "u-sql-join",
            "u-sql-window",
            "u-api"
          ],
          "milestoneIds": [
            "ddl-m1"
          ],
          "skillIds": [
            "sql-data"
          ],
          "relatedSkillIds": [
            "sql-data",
            "statistics-metrics",
            "time-forecast",
            "api-delivery"
          ],
          "prerequisiteModuleIds": [
            "code"
          ],
          "prerequisiteLabel": "先做前一个模块；已经会的部分可以先检查，再按需补学。",
          "learningEstimatedMinutes": 750,
          "branches": [],
          "notes": [
            "这里先做最小预览页：页面提交数据，程序返回结果。后面的“做成小工具”再补完整测试和启动说明。",
            "租车记录里没有真实车队容量、未满足需求或调度成本；之后用到的资源上限和成本将由你设置，并明确标成模拟。"
          ]
        },
        {
          "id": "forecast",
          "title": "做需求预测",
          "learn": "学会用过去的租车记录预测后面的数量，并公平比较几种预测方法。",
          "make": "你会做出预测结果表、不同时间段的误差对比图和一份失败原因说明。",
          "done": "预测只用当时已知的数据；几种方法用同一批测试数据比较，表现不好也如实记录。",
          "unitIds": [
            "u-metrics",
            "u-uncertainty",
            "u-leakage",
            "u-baselines",
            "u-lagged",
            "u-tscv"
          ],
          "milestoneIds": [
            "ddl-m2"
          ],
          "skillIds": [
            "statistics-metrics",
            "ml-validation",
            "time-forecast"
          ],
          "relatedSkillIds": [
            "statistics-metrics",
            "time-forecast",
            "ml-validation"
          ],
          "prerequisiteModuleIds": [
            "data"
          ],
          "prerequisiteLabel": "先做前一个模块；已经会的部分可以先检查，再按需补学。",
          "learningEstimatedMinutes": 870,
          "branches": [
            {
              "id": "train-model",
              "title": "需要时再练模型训练",
              "label": "选学 · 暂时可以跳过",
              "description": "只有目标岗位要求训练框架时再学；先完成当前路线，不同时增加一个大项目。",
              "unitIds": [
                "u-torch"
              ],
              "milestoneIds": [],
              "skillIds": [
                "pytorch-training"
              ],
              "relatedSkillIds": [
                "pytorch-training"
              ],
              "prerequisiteUnitIds": [
                "u-leakage"
              ],
              "learningEstimatedMinutes": 240,
              "make": "你会训练并保存一个小模型，再重新读取它生成预测。",
              "done": "重新读取模型后能重现结果，并解释训练、验证和测试数据分别用来做什么。",
              "budgetNote": "选学占用同一周的学习时间，不另外加课。"
            }
          ]
        },
        {
          "id": "allocation",
          "title": "做资源安排",
          "learn": "学会给定总资源和每个时段的上限，比较不同安排办法。",
          "make": "你会做出一个按时段分配模拟资源的小程序，以及平均分配、简单规则和计算方案的对比表。",
          "done": "方案不超过预算和时段上限；无解或超时会明确提示；小例子能用手算或穷举核对。",
          "unitIds": [
            "u-or-mip",
            "u-or-scheduling",
            "u-decision-eval"
          ],
          "milestoneIds": [
            "ddl-m3"
          ],
          "skillIds": [
            "optimization-modeling",
            "decision-evaluation"
          ],
          "relatedSkillIds": [
            "optimization-modeling",
            "decision-evaluation"
          ],
          "prerequisiteModuleIds": [
            "forecast"
          ],
          "prerequisiteLabel": "先做前一个模块；已经会的部分可以先检查，再按需补学。",
          "learningEstimatedMinutes": 540,
          "branches": [],
          "notes": [
            "这里只做模拟资源的时段分配，不做真实航空机组排班，也不声称带来真实企业节省。"
          ]
        },
        {
          "id": "app",
          "title": "做成小工具",
          "learn": "学会把已有程序接成能上传表格、改参数、看结果、导出报告的本地网页。",
          "make": "你会做出“需求预测与资源安排小工具”的本地演示包、启动说明和自动检查程序。",
          "done": "按说明能从头启动；正常与错误输入都有检查；真实试用者能完成一次操作，问题有记录。",
          "unitIds": [
            "u-pytest",
            "u-test-param",
            "u-api-testing",
            "u-docker",
            "u-ci"
          ],
          "milestoneIds": [
            "ddl-m4"
          ],
          "skillIds": [
            "reproducible-workflow",
            "software-testing",
            "api-delivery"
          ],
          "relatedSkillIds": [
            "software-testing",
            "api-delivery",
            "reproducible-workflow"
          ],
          "prerequisiteModuleIds": [
            "allocation"
          ],
          "prerequisiteLabel": "先做前一个模块；已经会的部分可以先检查，再按需补学。",
          "learningEstimatedMinutes": 510,
          "branches": [
            {
              "id": "ai-tools",
              "title": "想加AI对话时再学",
              "label": "选学 · 暂时可以跳过",
              "description": "先把小工具做稳定，再让AI调用已有查询、计算和报告功能；AI不能随意改计算规则。",
              "unitIds": [
                "u-agent-tools",
                "u-agent-loop",
                "u-agent-evals"
              ],
              "milestoneIds": [
                "ddl-m5"
              ],
              "skillIds": [
                "agent-evaluation"
              ],
              "relatedSkillIds": [
                "agent-evaluation"
              ],
              "prerequisiteUnitIds": [
                "u-api-testing",
                "u-leakage"
              ],
              "learningEstimatedMinutes": 450,
              "make": "你会增加一个调用现有工具的对话入口，并保存调用记录和测试结果。",
              "done": "错误参数、越权要求、超时等情况能被挡住；模拟回答和真实模型测试分开记录。",
              "budgetNote": "选学占用同一周的学习时间，不另外加课。"
            }
          ],
          "notes": [
            "先在自己的电脑运行，不要求付费接口或公开发布。打包方式按原项目要求选择，课程阅读不会自动证明软件已经做完。"
          ]
        },
        {
          "id": "interview",
          "title": "准备作品面试",
          "learn": "学会把自己做过什么讲清楚，并练习现场改代码和回答项目问题。",
          "make": "你会整理项目说明、运行步骤、三分钟演示、失败案例，以及按真实岗位要求修改的简历材料。",
          "done": "别人能照说明运行；你能讲清AI帮了什么、自己改了什么，以及还有哪些限制。",
          "unitIds": [
            "u-algo",
            "u-interview"
          ],
          "milestoneIds": [
            "ddl-m6"
          ],
          "skillIds": [
            "technical-interview"
          ],
          "relatedSkillIds": [
            "technical-interview"
          ],
          "prerequisiteModuleIds": [
            "app"
          ],
          "prerequisiteLabel": "先做前一个模块；已经会的部分可以先检查，再按需补学。",
          "learningEstimatedMinutes": 240,
          "branches": [],
          "notes": [
            "只写实际做完、能核查的内容。学完本路线不保证录用或薪资，资格与出勤安排还需按实际岗位确认。"
          ]
        }
      ],
      "flow": {
        "startLabel": "从第1步开始",
        "direction": "sequential",
        "edges": [
          {
            "from": "code",
            "to": "data",
            "label": "完成后继续"
          },
          {
            "from": "data",
            "to": "forecast",
            "label": "完成后继续"
          },
          {
            "from": "forecast",
            "to": "allocation",
            "label": "完成后继续"
          },
          {
            "from": "allocation",
            "to": "app",
            "label": "完成后继续"
          },
          {
            "from": "app",
            "to": "interview",
            "label": "完成后继续"
          }
        ],
        "branchLabel": "选学：需要时再展开"
      },
      "budgetNote": "总时间包含学习、练习、实现和检查，是规划估计。小节用时已经包含在内，不要重复相加。"
    },
    {
      "id": "agent_engineering",
      "title": "AI工具开发",
      "description": "用一份候选表做起，学会处理条件、调用工具、检查解释，再交付一个可测试的小型AI应用。",
      "estimatedHours": 100,
      "firstDemoEstimatedHours": 50,
      "firstDemoMilestoneId": "ddl-m4",
      "requiredUnitCount": 20,
      "requiredSkillCount": 7,
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
      "learningEstimatedMinutes": 2340,
      "modules": [
        {
          "id": "code",
          "title": "用AI写程序",
          "learn": "学会把要求告诉AI，再自己运行、查错和修改一小段程序。",
          "make": "你会写出一个能读入表格、输出统计结果的小程序，并保存修改记录。",
          "done": "换一份数据还能运行；你能自己改一个统计规则，并解释两个边界测试。",
          "unitIds": [
            "u-python-diagnostic",
            "u-ai-spec",
            "u-git",
            "u-debug"
          ],
          "milestoneIds": [
            "ddl-m0"
          ],
          "skillIds": [
            "ai-code"
          ],
          "relatedSkillIds": [
            "ai-code",
            "reproducible-workflow"
          ],
          "prerequisiteModuleIds": [],
          "prerequisiteLabel": "从当前的小程序开始。先动手，缺什么再查资料；不用先刷完基础课。",
          "learningEstimatedMinutes": 390,
          "branches": [],
          "diagnosticUnitIds": [
            "u-python-diagnostic"
          ],
          "diagnosticNote": "先用最多90分钟做基础小练习。已经会的知识不用重看，没做出来的部分再补；仍要如实记录练习是否完成。"
        },
        {
          "id": "data",
          "title": "整理数据",
          "learn": "学会读表格、查缺失和重复，把候选项与使用者的条件整理清楚。",
          "make": "为选项助手做候选表说明、输入检查程序和本地预览页。原租车或市场表格题可用来补缺口，不必先全部完成。",
          "done": "正常表格能读入；坏字段指出具体位置；预算和必需条件有明确字段，虚构数据也有标注。",
          "unitIds": [
            "u-data-card",
            "u-pandas",
            "u-sql-select",
            "u-sql-join",
            "u-sql-window",
            "u-api"
          ],
          "milestoneIds": [
            "ddl-m1"
          ],
          "skillIds": [
            "sql-data"
          ],
          "relatedSkillIds": [
            "sql-data",
            "statistics-metrics",
            "time-forecast",
            "api-delivery"
          ],
          "prerequisiteModuleIds": [
            "code"
          ],
          "prerequisiteLabel": "按前一阶段的项目成果继续；缺什么知识再查对应课节，旧题勾选和自评不替代新项目阶段。",
          "learningEstimatedMinutes": 750,
          "branches": [],
          "notes": [
            "优先在当前航班候选表上练习读表、缺失检查、连接和筛选。原课题面与完成记录保留；只看过资料或做了不同练习，不自动勾选旧题。",
            "先检查候选项、币种、费用项和时间单位，再把条件交给后面的工具。"
          ]
        },
        {
          "id": "check-results",
          "title": "检查结果",
          "learn": "把费用、时间和预算规则写成能重复运行的检查，主动试出错误和边界情况。",
          "make": "为航班比较写一组有已知答案的自动测试，覆盖正常输入、刚好到预算、超预算、缺字段和无结果。",
          "done": "改错一次预算或比较规则时，测试能报错；修复后通过，并保存实际运行输出。新作品按下方阶段标准记录。",
          "unitIds": [
            "u-pytest",
            "u-test-param"
          ],
          "milestoneIds": [],
          "skillIds": [
            "software-testing"
          ],
          "relatedSkillIds": [
            "software-testing"
          ],
          "prerequisiteModuleIds": [
            "data"
          ],
          "prerequisiteLabel": "按前一阶段的项目成果继续；缺什么知识再查对应课节，旧题勾选和自评不替代新项目阶段。",
          "learningEstimatedMinutes": 210,
          "branches": [
            {
              "id": "deeper-validation",
              "title": "需要预测或统计推断时再学",
              "label": "选学 · 暂时可以跳过",
              "description": "保留原预测误差、区间估计和训练集处理练习。目标岗位或研究需要时再做，不挡住航班工具第一版。",
              "unitIds": [
                "u-metrics",
                "u-uncertainty",
                "u-leakage"
              ],
              "milestoneIds": [
                "ddl-m2"
              ],
              "skillIds": [
                "statistics-metrics",
                "ml-validation"
              ],
              "relatedSkillIds": [
                "statistics-metrics",
                "ml-validation"
              ],
              "prerequisiteUnitIds": [
                "u-data-card",
                "u-pandas"
              ],
              "learningEstimatedMinutes": 390,
              "make": "按原题分别检查预测误差、差异区间和数据泄漏，保留各自结果。",
              "done": "满足对应原练习要求后才记录完成；选学通过不会自动标记AI助手阶段。",
              "budgetNote": "选学使用同一周的学习预算，不另外增加一套必做任务。"
            },
            {
              "id": "deeper-forecast",
              "title": "想自己做预测时再学",
              "label": "选学 · 暂时可以跳过",
              "description": "在“检查结果”的基础上，补预测方法和按时间测试；不影响先做AI工具路线。",
              "unitIds": [
                "u-baselines",
                "u-lagged",
                "u-tscv"
              ],
              "milestoneIds": [
                "ddl-m2"
              ],
              "skillIds": [
                "time-forecast"
              ],
              "relatedSkillIds": [
                "time-forecast",
                "ml-validation"
              ],
              "prerequisiteUnitIds": [
                "u-metrics",
                "u-uncertainty",
                "u-leakage"
              ],
              "learningEstimatedMinutes": 480,
              "make": "你会做出几种预测方法的结果对比表。",
              "done": "所有预测方法按相同的时间切分比较，预测时没有用到未来信息。",
              "budgetNote": "选学占用同一周的学习时间，不另外加课。"
            },
            {
              "id": "deeper-allocation",
              "title": "想自己做分配时再学",
              "label": "选学 · 暂时可以跳过",
              "description": "先完成上面的预测选学，再做模拟资源分配和方案比较。",
              "unitIds": [
                "u-or-mip",
                "u-or-scheduling",
                "u-decision-eval"
              ],
              "milestoneIds": [
                "ddl-m3"
              ],
              "skillIds": [
                "optimization-modeling",
                "decision-evaluation"
              ],
              "relatedSkillIds": [
                "optimization-modeling",
                "decision-evaluation"
              ],
              "prerequisiteUnitIds": [
                "u-tscv",
                "u-metrics"
              ],
              "learningEstimatedMinutes": 540,
              "make": "你会做出满足预算和时段上限的模拟分配程序。",
              "done": "小例子的结果可核对；无解、超时和模拟成本都有清楚说明。",
              "budgetNote": "选学占用同一周的学习时间，不另外加课。"
            },
            {
              "id": "train-model",
              "title": "需要时再练模型训练",
              "label": "选学 · 暂时可以跳过",
              "description": "只有目标岗位要求训练框架时再学；先完成当前路线，不同时增加一个大项目。",
              "unitIds": [
                "u-torch"
              ],
              "milestoneIds": [],
              "skillIds": [
                "pytorch-training"
              ],
              "relatedSkillIds": [
                "pytorch-training"
              ],
              "prerequisiteUnitIds": [
                "u-leakage"
              ],
              "learningEstimatedMinutes": 240,
              "make": "你会训练并保存一个小模型，再重新读取它生成预测。",
              "done": "重新读取模型后能重现结果，并解释训练、验证和测试数据分别用来做什么。",
              "budgetNote": "选学占用同一周的学习时间，不另外加课。"
            }
          ],
          "notes": [
            "本模块直接检查当前航班工具，不要求先完成预测误差、区间估计或模型训练练习。",
            "预测与统计资料移到选学；开发样例和最终检查样例分开的要求仍在后续AI评测与项目阶段中保留。"
          ]
        },
        {
          "id": "app",
          "title": "做成小工具",
          "learn": "学会把读表、条件输入、查询与计算接成一个可操作的本地网页。",
          "make": "你会为AI选项比较助手做出表单版：上传样例、填写条件、比较结果并导出报告。",
          "done": "不使用AI也能按按钮完成正确计算；正常与错误输入都有自动检查；按启动说明可重新运行。",
          "unitIds": [
            "u-api-testing",
            "u-docker",
            "u-ci"
          ],
          "milestoneIds": [
            "ddl-m4"
          ],
          "skillIds": [
            "reproducible-workflow",
            "api-delivery"
          ],
          "relatedSkillIds": [
            "software-testing",
            "api-delivery",
            "reproducible-workflow"
          ],
          "prerequisiteModuleIds": [
            "check-results"
          ],
          "prerequisiteLabel": "按前一阶段的项目成果继续；缺什么知识再查对应课节，旧题勾选和自评不替代新项目阶段。",
          "learningEstimatedMinutes": 300,
          "branches": [],
          "notes": [
            "先做好确定的计算与条件检查，再接AI。不要靠预写的推荐文案冒充工具调用。",
            "本模块原接口和测试课程继续使用；新助手代码和运行结果另存。"
          ]
        },
        {
          "id": "ai-tools",
          "title": "让AI调用工具",
          "learn": "学会让AI读懂要求、选择查询和计算工具，再根据真实结果检查条件并解释。",
          "make": "你会给助手增加真实工具调用、错误处理、调用记录和固定测试；航班比较是第一款演示。",
          "done": "费用与时间来自工具计算；限制有逐项检查；真实AI与模拟测试分开，错误请求不会被写成成功。",
          "unitIds": [
            "u-agent-tools",
            "u-agent-loop",
            "u-agent-evals"
          ],
          "milestoneIds": [
            "ddl-m5"
          ],
          "skillIds": [
            "agent-evaluation"
          ],
          "relatedSkillIds": [
            "agent-evaluation"
          ],
          "prerequisiteModuleIds": [
            "app"
          ],
          "prerequisiteLabel": "按前一阶段的项目成果继续；缺什么知识再查对应课节，旧题勾选和自评不替代新项目阶段。",
          "learningEstimatedMinutes": 450,
          "branches": [],
          "notes": [
            "先把当前航班计算和条件工具跑对，再接获准的真实模型；模型费用和公开部署另行确认。",
            "原forecast/optimize/explain题面只作工具协议的参考，不要求先另建旧预测项目。当前助手通过aca阶段验收，旧课与旧量表按原含义单独记录。"
          ]
        },
        {
          "id": "interview",
          "title": "准备作品面试",
          "learn": "学会把自己做过什么讲清楚，并练习现场改代码和回答项目问题。",
          "make": "你会整理选项助手实际完成的代码、运行说明、三分钟航班演示和错误案例，用来讲清自己的工作。",
          "done": "别人能照说明运行；你能讲清AI帮了什么、自己改了什么，以及还有哪些限制。",
          "unitIds": [
            "u-algo",
            "u-interview"
          ],
          "milestoneIds": [
            "ddl-m6"
          ],
          "skillIds": [
            "technical-interview"
          ],
          "relatedSkillIds": [
            "technical-interview"
          ],
          "prerequisiteModuleIds": [
            "ai-tools"
          ],
          "prerequisiteLabel": "按前一阶段的项目成果继续；缺什么知识再查对应课节，旧题勾选和自评不替代新项目阶段。",
          "learningEstimatedMinutes": 240,
          "branches": [],
          "notes": [
            "只写实际做完、能核查的内容。学完本路线不保证录用或薪资，资格与出勤安排还需按实际岗位确认。"
          ]
        }
      ],
      "flow": {
        "startLabel": "从第1步开始",
        "direction": "sequential",
        "edges": [
          {
            "from": "code",
            "to": "data",
            "label": "完成后继续"
          },
          {
            "from": "data",
            "to": "check-results",
            "label": "完成后继续"
          },
          {
            "from": "check-results",
            "to": "app",
            "label": "完成后继续"
          },
          {
            "from": "app",
            "to": "ai-tools",
            "label": "完成后继续"
          },
          {
            "from": "ai-tools",
            "to": "interview",
            "label": "完成后继续"
          }
        ],
        "branchLabel": "选学：需要时再展开"
      },
      "budgetNote": "20个建议课节共约39小时，含课内练习，仅是学习量估计。当前软件总工期尚未重新估算；原100/50小时不适用，也不能与39小时简单相加。",
      "newProjectNote": "当前主线围绕AI选项比较助手推进，不必先完成全部旧预测题再开始航班软件。相关原题作为可查参考，题面、勾选与自查仍按原含义保存；新作品仅按aca六阶段验收。",
      "firstSession": {
        "title": "今天先跑通两条航班的比较",
        "minutes": 30,
        "output": "一段实际运行过的比较程序，以及预算为 1000、900、800 元时的三次输出。",
        "unitId": "u-python-diagnostic",
        "steps": [
          {
            "minutes": "0–5 分钟",
            "title": "先知道正确答案",
            "text": "使用两条虚构航班：A 的总费用 980 元、总时间 5.5 小时；B 的总费用 880 元、总时间 7.5 小时。规则是先满足预算，再选总时间更短的。预算 1000 元时选 A，900 元时选 B，800 元时应提示没有符合条件的选项。"
          },
          {
            "minutes": "5–15 分钟",
            "title": "让一小段程序跑起来",
            "text": "在你已能运行 Python 的项目目录中，用这两条数据写一个接收预算、返回结果的函数。可以让 AI 起草，再亲自运行。今天不接模型、不查真实票价，也不用先做网页。"
          },
          {
            "minutes": "15–25 分钟",
            "title": "自己改一次输入",
            "text": "先运行预算 1000 元的情况，再由你把输入改成 900 和 800。核对三次结果是否分别为 A、B、没有符合条件的选项；让程序输出费用和时间，并说明为什么这样选。"
          },
          {
            "minutes": "25–30 分钟",
            "title": "留下结果和卡点",
            "text": "保存代码、运行命令和三次输出。写一句「我自己改了什么」，再记下仍不懂或报错的地方。今天先停在这里；下一步按项目第1阶段补读表、启动说明和一次修错记录，缺基础再查下方原练习。"
          }
        ],
        "codingPrompt": "请只写一个不依赖额外库的 Python 小程序。使用两条明确标为虚构的航班：A，总费用 980 元、总时间 5.5 小时；B，总费用 880 元、总时间 7.5 小时。写一个接收预算的函数：先筛掉超预算选项，再选总时间更短的一条；没有合适选项时明确返回无结果。运行 1000、900、800 元三个输入，输出航班、费用、时间和选择理由。解释筛选和排序的代码。不要连接网络、模型或真实购票服务。",
        "materials": [
          {
            "title": "需要时查：怎样让 AI 写代码并检查结果",
            "url": "https://missing.csail.mit.edu/2026/agentic-coding/",
            "scope": "只读 Use cases 中 Implementing new features、Fixing errors 两段，以及 What to watch out for。今天不用看完整视频；这里讲的是给清楚要求、运行检查和自己审查。"
          }
        ],
        "saveInstruction": "代码和输出保存在你自己的项目目录。网站只记录学习状态和结果链接，不会运行或收走这些文件。想记下已经开始，可到「我的作品」第 1 阶段，手动保存为「正在做」。",
        "completionNote": "这 30 分钟只是本节的起步练习，不代表完整的 90 分钟基础检查、技能自查或项目阶段已完成。达到下方原练习的全部要求后，才勾选「这节练习做完了」。",
        "resumeNote": "下次回到「今日总览」，点当前主按钮继续；「学习路线」也会打开首个未完成作品阶段。下方原课节仍按原题要求勾选，课程勾选不会自动完成作品；具体代码做到哪里以你保存的文件和卡点记录为准。",
        "environmentNote": "30 分钟是已有可用 Python 环境时的练习安排，不是完成保证。如果还没安装或不能运行，环境准备另算；今天先写清输入和预期结果，记录环境卡点。不能把 AI 在聊天里给出的数字记作自己已经运行成功。",
        "dataNote": "所有金额和时间均为虚构练习数据；今天仅练预算筛选和时间比较，不表示真实旅客偏好模型。",
        "sample": [
          {
            "flight": "A",
            "totalCostCny": 980,
            "totalHours": 5.5
          },
          {
            "flight": "B",
            "totalCostCny": 880,
            "totalHours": 7.5
          }
        ],
        "expected": [
          {
            "budgetCny": 1000,
            "result": "A",
            "reason": "两条都符合预算，A 的总时间更短。"
          },
          {
            "budgetCny": 900,
            "result": "B",
            "reason": "A 超过预算，B 符合预算。"
          },
          {
            "budgetCny": 800,
            "result": "没有符合条件的选项",
            "reason": "两条都超过预算，不能编造一个推荐。"
          }
        ],
        "nextAction": "接着完成作品第 1 阶段的读表、启动说明和修错记录；下次从「今日总览」的主按钮或「学习路线」回到该阶段。下方原课练习需要时再做。"
      },
      "estimatedHoursScope": "legacy_demand_decision_lab_only",
      "milestoneMappingScope": "legacy_demand_decision_lab_only",
      "estimateNote": "100小时完整路线、50小时首Demo是原DemandDecisionLab组合的历史估计，不适用于当前AI选项比较助手。2340分钟仅为本路线20个课节的学习练习估计，不是新作品总工期。",
      "currentProjectId": "ai-choice-assistant",
      "currentProjectMilestoneIds": [
        "aca-m0",
        "aca-m1",
        "aca-m2",
        "aca-m3",
        "aca-m4",
        "aca-m5"
      ],
      "progressionPolicy": "当前作品阶段仅由ai-choice-assistant的aca阶段记录推进；旧课程、旧技能自查和DDL里程碑不会自动完成或跳过新阶段。"
    }
  ],
  "unitLabels": {
    "u-python-diagnostic": {
      "title": "先试一段Python程序",
      "description": "先做最多90分钟的小练习，看看读文件、循环、函数和查错哪些已经会了。",
      "kind": "diagnostic",
      "kindLabel": "先试再补学",
      "technicalTitle": "Python按需诊断与函数修复",
      "progressId": "u-python-diagnostic",
      "estimatedMinutes": 90,
      "exercise": "最多用90分钟写一个读表程序：按类别统计数量；遇到空文件、缺失值或重复记录时给出提示。可以让AI起草，但自己改一次分组规则。",
      "done": "程序跑过正常和错误输入；留下两条边界检查；能解释分组怎么算。未做出来的部分先记下，不必重刷整门课。",
      "purpose": "先确认你能运行、修改和解释一小段代码，已经会的基础不用重学。",
      "projectApply": "上面的30分钟先练运行、筛选和修改输入。当前项目按阶段做读表与修错；下方原题供查漏补缺，完成原题全部要求后才勾选其课节。"
    },
    "u-ai-spec": {
      "title": "让AI按要求写代码",
      "description": "写清输入、输出和不能做的事，再检查AI改了哪些代码。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "AI辅助开发：规格→差异审查→测试",
      "progressId": "u-ai-spec",
      "estimatedMinutes": 90,
      "exercise": "给AI写清读表程序的输入、输出和错误处理要求。检查它新增的依赖与文件操作，故意放入一个空值或分组错误，再定位并修复。",
      "done": "保存修改前后的代码和运行结果；能指出AI改了哪里、错误为什么发生，以及自己怎样确认修好了。",
      "purpose": "工作中要把含糊要求变成能检查的输入、输出和规则。",
      "projectApply": "写清航班费用是否含附加费、预算怎样判断、无结果怎样提示，再审查 AI 是否实现了这些要求。"
    },
    "u-git": {
      "title": "保存修改，撤销错误",
      "description": "用Git记录每次修改，练习找回一次改坏的版本。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "Git：记录、分支与撤销一次错误",
      "progressId": "u-git",
      "estimatedMinutes": 120,
      "exercise": "用Git提交一次程序修改；再故意把一个计算改错并提交，随后撤销这个错误。保留修改前后实际运行结果。",
      "done": "能在Git历史中找到修改和撤销操作，解释每次改了什么；撤销后程序恢复正常。",
      "purpose": "改坏程序时能找回上一个可用版本，也能说明哪些改动是自己做的。",
      "projectApply": "保存第一次能运行的航班比较；改坏一个条件后再撤销，核对输出恢复。"
    },
    "u-debug": {
      "title": "找到程序哪里出错",
      "description": "读报错、加日志，定位出错的位置后再修改。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "调试：定位错误而非只重试提示词",
      "progressId": "u-debug",
      "estimatedMinutes": 90,
      "exercise": "给读表程序放入一个可重复的错误，用报错、日志或调试器找出位置；修复后，用原来的失败输入再运行一次。",
      "done": "留下失败输入、报错位置、修改内容和修复后的结果；能解释原因，而不只是重新向AI提问。",
      "purpose": "能找到错误发生在哪一步，才能接手真实开发任务。",
      "projectApply": "故意把「不超过预算」写错一次，观察错误输出，定位并修复。"
    },
    "u-data-card": {
      "title": "弄清数据能说明什么",
      "description": "记录数据从哪里来、每列是什么意思、使用许可和缺少的信息。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "数据卡与许可：明确标签、来源及不可验证事项",
      "progressId": "u-data-card",
      "estimatedMinutes": 90,
      "exercise": "读原资料中的公开租车数据，写一页来源说明：来源与许可、主要字段、数量之间的关系，以及缺少的容量和成本信息。迁移到新助手时，另写候选表说明并标明哪些行是虚构的。",
      "done": "原数据说明含来源、许可和限制；指出同期两项数量之和就是目标数量，不能拿它们提前预测答案。新助手数据说明另存，不能拿旧说明冒充。",
      "purpose": "先判断数据能回答什么，避免把缺失信息当成事实。",
      "projectApply": "写明航班是虚构的，费用与时间各包含什么，以及哪些字段不知道。原公开数据说明仍单独保留。"
    },
    "u-pandas": {
      "title": "用Python整理表格",
      "description": "用pandas分组统计和合并表格，检查是否多算或漏算。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "pandas：按粒度聚合与合并校验",
      "progressId": "u-pandas",
      "estimatedMinutes": 150,
      "exercise": "用pandas按类别计算总量、平均值和行数；再合并一张类别说明表。故意加入重复键，检查合并前后行数是否异常。",
      "done": "结果能用小表手算核对；重复键不会悄悄造成重复统计；保留代码和检查结果。",
      "purpose": "真实候选表可能有重复、缺失和拼接错误，比较之前要先处理。",
      "projectApply": "将数据检查方法用到航班表，核对行数、单位和重复项；没有费用时给出提示。"
    },
    "u-sql-select": {
      "title": "筛选数据并分组统计",
      "description": "用SQL挑出需要的行，按时段或类别计算数量。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "SQL：SELECT与GROUP BY",
      "progressId": "u-sql-select",
      "estimatedMinutes": 120,
      "exercise": "在本地DuckDB读取小表，写查询筛选行，再按类别计算总量、平均值和行数；与Python统计结果核对。",
      "done": "查询可以重新运行；每组结果与小表手算或Python结果一致，包括数量为零的情况。",
      "purpose": "学会从一张表里准确筛选和汇总，支撑后面的查询工具。",
      "projectApply": "练习找出预算以内的候选项，核对筛选后的数量和结果。"
    },
    "u-sql-join": {
      "title": "把两张表正确拼起来",
      "description": "按对应的键合并表格，检查重复行和没有匹配的数据。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "SQL：JOIN、主键粒度与重复计数",
      "progressId": "u-sql-join",
      "estimatedMinutes": 120,
      "exercise": "准备数据表与类别表，分别做内连接和左连接；加入没有记录的类别和重复键，观察结果差别。",
      "done": "能保留没有记录的类别，并说明它的空值如何处理；重复键造成的多行被发现，汇总没有重复计算。",
      "purpose": "把两张表拼错，可能重复计费或漏掉费用。",
      "projectApply": "若把航班和附加费分成两表，用唯一编号连接，再检查是否多出或少了行。"
    },
    "u-sql-window": {
      "title": "比较前后时段的数据",
      "description": "取上一时段的值和过去一段时间的平均值，避免混入未来数据。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "SQL：窗口、排名和过去窗口",
      "progressId": "u-sql-window",
      "estimatedMinutes": 150,
      "exercise": "按时间排序，查每周数量较高的时段、上一时段值和过去窗口的平均值；加入跨日和缺失时段，用pandas核对。",
      "done": "两种写法的结果相同；能说明窗口包含哪些行，确认没有把未来的数据算进过去平均值。",
      "purpose": "需要比较同组内的顺序或前后变化时，再用这类查询。",
      "projectApply": "原课练前后时段比较。航班第一版只筛选和排序时不必强用窗口函数；保留为复杂比较的补充。"
    },
    "u-metrics": {
      "title": "算清楚预测差了多少",
      "description": "比较平均绝对误差和均方根误差，留意数量为零时的计算问题。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "预测指标：MAE、RMSE与零需求陷阱",
      "progressId": "u-metrics",
      "estimatedMinutes": 120,
      "exercise": "用原预测练习的小数据，手算并编程计算平均绝对误差和均方根误差，再试一次包含零值的数据。迁移到选项助手时，另为费用和时间计算准备已知正确答案。",
      "done": "手算和程序计算一致；能说明零值时哪些百分比指标会出问题。费用和时间检查另存，不把预测误差当成助手整体正确率。",
      "purpose": "选学：目标岗位或研究需要预测时，再学习怎样衡量预测误差。",
      "projectApply": "航班助手主要核对金额、时长、条件与解释是否正确。不要直接把预测的 MAE、RMSE 当作整个助手的成绩。"
    },
    "u-uncertainty": {
      "title": "判断结果差别是否可靠",
      "description": "比较独立模拟场景的结果变化范围，说明哪些结论不能直接推广。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "不确定性：置信区间与独立性假设",
      "progressId": "u-uncertainty",
      "estimatedMinutes": 120,
      "exercise": "用独立生成的模拟场景比较两种方案，计算平均成本差和变化范围；再说明为什么不能把时间相关的逐行误差当成独立样本。",
      "done": "保留场景、计算代码和区间结果；说明抽样假设，没有把模拟差异写成真实业务或因果收益。",
      "purpose": "选学：需要统计推断或多次实验比较时，再判断观察到的差异是否稳定。",
      "projectApply": "两条手算样例先逐项核对。等真实 AI 重复评测后再讨论差异；原模拟成本练习独立保留。"
    },
    "u-leakage": {
      "title": "别让模型提前看到答案",
      "description": "先分训练和测试数据，再做处理，防止未来信息混入。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "sklearn：先切分、后拟合，防止数据泄漏",
      "progressId": "u-leakage",
      "estimatedMinutes": 150,
      "exercise": "把原模型练习的数据先分成训练与测试部分；在测试部分放入极端值，检查预处理只使用训练数据；加一条未来时间戳检查。",
      "done": "测试值不影响训练时的处理参数；未来数据混入时会报错。做AI助手评测时另留一批未用于调提示词的测试问题。",
      "purpose": "调程序用过的问题，不能再当作完全没见过的考试题。",
      "projectApply": "预测或模型训练需要时再做原练习。当前助手仍需分别保留开发样例和最终检查样例，这在后面的AI评测与项目阶段验收中完成。"
    },
    "u-baselines": {
      "title": "先做最简单的预测",
      "description": "先用上一次或上一个周期的数量作预测，作为比较起点。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "先建立朴素基线，再考虑复杂模型",
      "progressId": "u-baselines",
      "estimatedMinutes": 120,
      "exercise": "用同一段历史数据分别做上一次数值、历史平均值和上一周期数值三种预测，并保存结果。",
      "done": "三种方法使用同一训练段与测试段；预测结果和误差可核对。此项属于预测选学，不是选项助手第一版的完成条件。"
    },
    "u-lagged": {
      "title": "用过去的数据训练预测",
      "description": "比较简单方法、线性模型和树模型，检查哪些输入在预测时可用。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "从滞后特征到树模型与预测区间",
      "progressId": "u-lagged",
      "estimatedMinutes": 180,
      "exercise": "用过去时段的数值训练线性与树模型，与简单预测比较；做一次随机切分和时间切分的对照。",
      "done": "写清每个输入在预测时是否已知；正式比较使用时间切分，保留效果较差的结果和原因。"
    },
    "u-tscv": {
      "title": "按时间反复检查预测",
      "description": "用前面的数据预测后面，换几个时间窗口检查结果。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "滚动验证与真实可用特征",
      "progressId": "u-tscv",
      "estimatedMinutes": 180,
      "exercise": "按时间设置至少三个滚动测试窗口，最后一段连续数据单独留作最终测试；逐项检查一小时和一天后预测需要的输入。",
      "done": "保存每次切分和对应结果；没有用未来真实天气或尚未发生的数量生成正式预测。"
    },
    "u-or-mip": {
      "title": "把资源限制写进程序",
      "description": "用变量表示分配数量，写清预算、上限和希望改善的目标。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "OR-Tools：变量、约束、目标与求解状态",
      "progressId": "u-or-mip",
      "estimatedMinutes": 180,
      "exercise": "写一个很小的模拟分配问题：定义每个时段的数量、总预算、时段上限和目标；求解后打印实际状态。",
      "done": "能逐项解释变量与限制；用手算或穷举核对小例子；无解、可行和已证明最优没有混为一谈。"
    },
    "u-or-scheduling": {
      "title": "安排各时段的有限资源",
      "description": "把排班例子改成模拟容量分配，检查每个时段的限制。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "OR-Tools：有限资源的排班/容量约束",
      "progressId": "u-or-scheduling",
      "estimatedMinutes": 180,
      "exercise": "把原排班例子改成模拟时段分配，只加入能解释的预算与时段上限；试一次资源充足和一次限制冲突的输入。",
      "done": "输出满足每条限制，或明确报告无解；模拟设定写清楚，没有写成真实航空排班。"
    },
    "u-decision-eval": {
      "title": "比较哪种安排更合适",
      "description": "在同样需求和限制下比较不同安排，报告短缺、闲置和模拟成本。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "从预测误差到决策成本：自拟对照实验",
      "progressId": "u-decision-eval",
      "estimatedMinutes": 180,
      "exercise": "在同一组留出需求与限制下比较平均分配、简单贪心规则和优化方案，列出资源用量、短缺、闲置及模拟总成本。",
      "done": "小实例可穷举核对；每种方案使用同样的需求与限制；即使优化方案没更好，也留下结果与原因。"
    },
    "u-pytest": {
      "title": "给程序加自动检查",
      "description": "写几个正常和出错的例子，让程序自动检查结果。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "pytest：第一个测试、异常和fixture",
      "progressId": "u-pytest",
      "estimatedMinutes": 120,
      "exercise": "给读表、统计或费用计算函数写自动测试：正常输入、空输入、非法数值各一个；文件测试使用临时目录。",
      "done": "运行测试能看到通过结果；故意改错计算时测试会失败，修复后恢复通过，且没有改坏原始数据。",
      "purpose": "把手工核对变成每次改代码都能重复执行的检查。",
      "projectApply": "给预算 1000、900、800 元的三种情况写自动检查，并补边界和缺失字段情况。"
    },
    "u-test-param": {
      "title": "多换几组输入测试",
      "description": "一次检查多组边界情况，防止改好一处又弄坏另一处。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "pytest：参数化边界与回归测试",
      "progressId": "u-test-param",
      "estimatedMinutes": 90,
      "exercise": "把重复测试整理成一组输入与期望结果，覆盖零值、缺失、重复、错误格式和超时；每修好一个错误就保留对应测试。",
      "done": "一次命令能跑完这组测试；至少一个旧错误再次出现时会被检查发现。",
      "purpose": "同一个规则要换多种输入验证，避免只对一个示例有效。",
      "projectApply": "继续检查费用恰好等于预算、所有选项超预算、时间相同等情况。"
    },
    "u-api": {
      "title": "让页面接收和检查输入",
      "description": "用FastAPI连接页面与程序，输入不合法时返回明确的错误。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "FastAPI：类型化CSV/情景请求与明确错误",
      "progressId": "u-api",
      "estimatedMinutes": 120,
      "exercise": "用FastAPI做一个本地入口：接收表格或条件，检查字段和数值范围，正常时返回结构化结果，错误时返回具体原因。",
      "done": "正常输入能得到结果；缺少字段、非法数值和错误格式都有明确提示；默认只在本机运行。",
      "purpose": "让网页或其他程序能把输入交给你的比较功能，并拿回明确结果。",
      "projectApply": "给航班比较提供一个入口：输入候选项和预算，返回选项、理由或具体错误。"
    },
    "u-api-testing": {
      "title": "检查页面调用是否正常",
      "description": "自动检查正常请求、错误参数和程序没准备好的情况。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "API回归：同样输入应返回可检查的结果",
      "progressId": "u-api-testing",
      "estimatedMinutes": 90,
      "exercise": "用TestClient自动发送正常请求、缺字段请求、非法参数，以及程序尚未准备好的请求；检查返回内容和错误状态。",
      "done": "每种请求都有预期结果；失败不会伪装成成功；同一有效输入能得到可检查的一致计算结果。",
      "purpose": "计算正确还不够，页面传入的数据也可能格式不对。",
      "projectApply": "分别发送正常请求、缺预算、非法费用等输入，核对接口返回。"
    },
    "u-docker": {
      "title": "换个环境也能运行",
      "description": "了解Docker打包方式，写清安装和启动程序需要什么。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "Dockerfile：在新环境重跑同一个演示",
      "progressId": "u-docker",
      "estimatedMinutes": 120,
      "exercise": "为小程序写一份Dockerfile，说明基础环境、依赖和启动命令；构建并运行样例，核对输入文件位置和输出。",
      "done": "能说明每条打包指令的用途；在新环境按记录复现一次样例。若尚未成功运行，先留未完成并记录报错。",
      "purpose": "作品不能只在你自己的旧环境里碰巧运行。",
      "projectApply": "在交付阶段打包已跑通的助手，检查别人能按说明启动；第一天不必先做这一步。"
    },
    "u-ci": {
      "title": "每次改动后自动检查",
      "description": "配置代码修改后的自动测试，并保留失败时的报错。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "CI：安装、测试和保存失败线索",
      "progressId": "u-ci",
      "estimatedMinutes": 90,
      "exercise": "先在本地用一条命令跑完测试，再在已有授权的代码仓库配置相同的自动检查，故意制造一次失败并查看日志。",
      "done": "记录一次失败及修复后的通过结果；没有授权仓库时保留本地结果，仓库检查仍注明未完成。",
      "purpose": "后续改动时自动重跑检查，尽早发现原本能用的功能被改坏。",
      "projectApply": "让代码更新后自动检查筛选、费用、无结果等测试。"
    },
    "u-agent-tools": {
      "title": "规定AI能用哪些工具",
      "description": "写清每个工具能做什么、需要哪些输入，以及哪些操作不允许。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "Agent工具：输入输出schema与工具边界",
      "progressId": "u-agent-tools",
      "estimatedMinutes": 120,
      "exercise": "按原资料为工具写用途、输入、输出和允许的操作。新助手另定义查询候选项、计算总费用与总时间、检查条件等工具；不让AI执行任意代码。",
      "done": "缺字段、错误类型和不允许的操作会被拒绝；每个工具可单独运行，输出能追溯到输入数据。新工具测试单独保存。",
      "purpose": "AI 要清楚知道每个工具能做什么、要传什么参数。",
      "projectApply": "新助手的工具是查候选项、算费用时间、检查条件；原课的预测和求解工具只是另外的例子。"
    },
    "u-agent-loop": {
      "title": "让AI完成一次工具调用",
      "description": "练习解析请求、调用工具、读取结果和及时停止。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "最小Agent循环：保留确定性入口",
      "progressId": "u-agent-loop",
      "estimatedMinutes": 150,
      "exercise": "先用原课程的模拟输出跑通一次“解析请求→调用工具→读结果→停止”。新助手再接候选查询、费用计算和条件检查；具备获准使用的模型后，另测真实AI是否会选对工具。",
      "done": "保留实际调用记录；工具报错、重复调用或超时会停止并提示。模拟回答和真实模型运行分别标注，没接真实模型就不写已验证AI效果。",
      "purpose": "理解 AI 怎样提出调用、程序怎样执行、结果怎样返回，才能定位错误。",
      "projectApply": "把已跑对的航班查询、计算和条件检查工具接给真实模型，保存参数、返回值和停止原因；旧forecast/optimize/explain题可查参考，按原题完成时才勾选原课。"
    },
    "u-agent-evals": {
      "title": "测试AI调用会不会出错",
      "description": "用固定例子检查正常请求、错误参数、越权要求和超时。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "Agent观察与评测：成功率、工具错误和安全失败",
      "progressId": "u-agent-evals",
      "estimatedMinutes": 180,
      "exercise": "准备20条开发问题和30条另外保留的测试问题，覆盖正常、无数据、恶意指令、非法参数、重复请求和超时；比较直接表单与AI调用。",
      "done": "逐条记录条件是否满足、计算是否正确、错误是否被拦住，以及耗时和失败原因；预留问题没有用于调提示词，真实与模拟结果分开统计。",
      "purpose": "用事先确定的案例检查 AI 是否算错、漏条件或把失败说成成功。",
      "projectApply": "比较手动调用工具、直接问 AI 和工具辅助 AI 的实际结果；固定回放只用于调试，不算真实 AI 表现。"
    },
    "u-algo": {
      "title": "练习查找、聚合和去重",
      "description": "做几道小题，解释程序步骤、边界情况和计算量。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "面试基础：数组、哈希与复杂度",
      "progressId": "u-algo",
      "estimatedMinutes": 120,
      "exercise": "各做一道分组去重、查找边界和取前几项的小题，换一份输入再运行；口述用了哪些步骤，并加边界测试。",
      "done": "结果可核对；能解释数据变多时计算量怎样变化，且不依赖AI直接给出最后的修改。",
      "purpose": "面试可能要求现场处理数据和解释效率，需要自己能写、能改。",
      "projectApply": "练候选项去重、找最短可行航班与边界输入；简单题完成不等于所有岗位的算法要求已满足。"
    },
    "u-interview": {
      "title": "讲清楚项目和自己的工作",
      "description": "准备演示和答辩，说明结果、错误、AI帮助和本人修改。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "项目答辩：让他人能复现和判断贡献",
      "progressId": "u-interview",
      "estimatedMinutes": 120,
      "exercise": "为实际做过的程序准备三分钟演示和十分钟问答，说明数据、计算、错误处理、AI帮助与本人修改；请一位真实同学照说明试运行。",
      "done": "说明和演示反映真实完成情况；保留试运行反馈，并能现场改一个小条件。还没人试用时，该项继续记为待完成。",
      "purpose": "让面试官看见你实际做过什么，以及你能独立解释和修改什么。",
      "projectApply": "演示改变一个条件、展示一次失败与修复，说明 AI 帮助范围和自己的贡献。"
    },
    "u-torch": {
      "title": "需要时学训练小模型",
      "description": "用PyTorch完成训练、保存、重新读取和生成预测。",
      "kind": "learning",
      "kindLabel": "学习与练习",
      "technicalTitle": "岗位需要时补PyTorch训练闭环",
      "progressId": "u-torch",
      "estimatedMinutes": 240,
      "exercise": "只有岗位需要时才做：训练一个小模型，划分训练与测试数据，保存参数，再重新读取并生成预测。",
      "done": "读取后的模型能重现结果；能说明数据划分、训练步骤与保存位置。此项仍为选学，不因新软件改名而完成。"
    }
  },
  "legacyMaterials": {
    "label": "需要时补基础",
    "description": "原有课程和已保存的学习记录仍保留。缺什么再查，不需要把所有课程再学一遍。"
  },
  "glossary": {
    "Git": "保存和找回代码版本的工具",
    "SQL": "从表格里筛选、合并和统计数据的语言",
    "pandas": "在Python中整理表格的工具",
    "API": "页面或程序向另一段程序提交请求、拿回结果的接口",
    "FastAPI": "用Python编写上述接口的工具",
    "pytest": "自动检查程序结果的工具",
    "Docker": "把程序及运行环境打包的工具",
    "CI": "每次改代码后自动运行检查",
    "Agent": "能按请求调用指定工具的AI助手",
    "mock": "预设的模拟回答，用于测试连接和错误处理",
    "PyTorch": "训练模型时使用的工具",
    "数据泄漏": "训练或调参时提前用了本不该知道的答案或未来信息"
  },
  "homeIntro": {
    "eyebrow": "从研究到实习",
    "headline": "把分析能力，做成别人能用的 AI 工具",
    "intro": "准备 2027 年 AI 应用 / Agent 开发实习。第一件作品是「AI 选项比较助手」，先从航班怎么选做起。",
    "careerGoal": "实际工作：把用户的要求接到数据和计算程序上，让 AI 能调用、能检查，出错时能找到原因。",
    "salaryTarget": "400–600 元 / 天是投递筛选目标，实际薪资、资格和出勤要求要按当时的岗位确认。",
    "firstUse": [
      "点「开始今天这一步」，先花 30 分钟跑一个小例子。",
      "遇到不懂的地方，只查这一步指定的小节；已经会的部分直接做。",
      "保存代码和运行结果，按项目阶段标准记录进度；下次回到「今日总览」，点当前主按钮继续。「学习路线」也会打开首个未完成作品阶段。"
    ],
    "relationship": [
      {
        "title": "岗位要看什么",
        "text": "能把一个功能做出来，接上数据和 AI，并用测试查出错误。"
      },
      {
        "title": "作品用来证明什么",
        "text": "用一份能运行的航班比较作品，展示你怎样处理条件、核对计算、解释结果和修复失败。"
      },
      {
        "title": "课程怎么帮到你",
        "text": "跟着当前作品往前做，缺什么补什么。旧练习可以按需查，不必先全部完成；课节勾选和项目阶段分别记录。"
      }
    ],
    "researchAdvantage": {
      "title": "你的研究可以带来什么优势",
      "text": "运筹和旅客选择研究，能帮助你把预算、时间和偏好说清楚，检查方案是否满足限制，并设计有对照的实验。把这些判断真正写进代码、解释和测试里，才会成为求职优势。原有论文继续推进。"
    },
    "growth": [
      {
        "title": "先能独立做一个功能",
        "text": "处理输入、调用程序、检查结果，做出别人能按说明运行的小应用。"
      },
      {
        "title": "再把一个 AI 应用做可靠",
        "text": "能记录调用、找到失败原因，比较不同方案的效果、成本和等待时间。"
      },
      {
        "title": "形成自己的业务专长",
        "text": "沿选择、定价、出行或资源安排积累项目，逐步承担更完整的决策功能。是否深化算法研究，再看成果、兴趣与岗位要求。"
      }
    ],
    "portfolioBoundary": {
      "proves": "作品完成后，可以证明你做过数据处理、工具调用、条件检查、自动测试与复现。",
      "gaps": "还需要按具体岗位补代码面试、后端基础或机器学习。小样例不代表真实线上效果，作品也不能代替实习资格与到岗安排。"
    },
    "futureMilestones": [
      {
        "title": "能演示",
        "text": "改预算或时间要求，页面会给出不同结果，也会明确说没有合适选项。",
        "status": "计划中"
      },
      {
        "title": "能核对",
        "text": "接入真实 AI，保存工具调用和错误案例，检查它是否算错、漏条件或解释不一致。",
        "status": "计划中"
      },
      {
        "title": "能复现、能讲清",
        "text": "整理代码、启动说明和对照结果，练习三分钟演示，并能现场改一个条件。",
        "status": "计划中"
      },
      {
        "title": "按岗位准备投递",
        "text": "用实际成果对照招聘要求，补差距，再确认毕业时间、实习天数、导师安排和薪资。",
        "status": "计划中"
      }
    ],
    "sourceNote": "岗位白话是对工作内容的概括，不代表某一岗位的全部要求。百度 Agent 算法实习的官方样本还涉及搜索、样本建设、模型评估等内容；官网可读不等于当前仍有名额。",
    "careerSources": [
      {
        "title": "百度 Agent 算法实习生 J104743（官方岗位样本）",
        "url": "https://talent.baidu.com/jobs/detail/INTERN/22b11ac9-3920-4236-b079-49e13f5d08d3",
        "checkedAt": "2026-10-10"
      }
    ]
  }
};
