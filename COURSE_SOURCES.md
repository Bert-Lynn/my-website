# 逐节来源核验（2026-10-10）

53个稳定ID；49必修，4选修。用时均为自行估计的学习+练习时间。课程验收为针对本路线设计，并非声称来自原课作业。

核验范围：Python/MIT正文由HTTP读取；D2L教材、Hello算法、微软6节中文README、HF各节、FastAPI各节、Docker、评测资料由逐页浏览核验。D2L视频链接由官方课程表HTML精确提取，B站返回412，播放/片长/字幕未验证；CS50P官方字幕SRT读取成功。

发现并修正：Docker旧workshop/08_using_compose/重定向到run-an-app，已改为真实Multi-container applications中的Compose段；FastAPI鉴权从仅第一步换为完整JWT示例。

| ID | 课程/单节 | 入口 | 配套/来源 | 核验结果 |
|---|---|---|---|---|
| python-basics | 3. Python 速览 | https://docs.python.org/zh-cn/3/tutorial/introduction.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| python-control | 4. 更多控制流工具 | https://docs.python.org/zh-cn/3/tutorial/controlflow.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| python-containers | 5. 数据结构 | https://docs.python.org/zh-cn/3/tutorial/datastructures.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| python-modules | 6. 模块 | https://docs.python.org/zh-cn/3/tutorial/modules.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| python-files | 7. 输入与输出 | https://docs.python.org/zh-cn/3/tutorial/inputoutput.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| python-exceptions | 8. 错误和异常 | https://docs.python.org/zh-cn/3/tutorial/errors.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| python-classes | 9. 类 | https://docs.python.org/zh-cn/3/tutorial/classes.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| python-venv | 12. 虚拟环境和包 | https://docs.python.org/zh-cn/3/tutorial/venv.html | https://docs.python.org/zh-cn/3/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| missing-shell | Course Overview + The Shell | https://missing.csail.mit.edu/2020/course-shell/ | https://missing.csail.mit.edu/2020/course-shell/ | 官方单讲页面及嵌入视频来源已核验；中文字幕和实际片长未核实。 |
| missing-git | Version Control (Git) | https://missing.csail.mit.edu/2020/version-control/ | https://missing.csail.mit.edu/2020/version-control/ | 官方单讲页面及嵌入视频来源已核验；中文字幕和实际片长未核实。 |
| missing-debug | Debugging and Profiling | https://missing.csail.mit.edu/2020/debugging-profiling/ | https://missing.csail.mit.edu/2020/debugging-profiling/ | 官方单讲页面及嵌入视频来源已核验；中文字幕和实际片长未核实。 |
| algo-complexity | 2.3 时间复杂度 | https://www.hello-algo.com/chapter_computational_complexity/time_complexity/ | https://www.hello-algo.com/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| algo-array | 4.1 数组 | https://www.hello-algo.com/chapter_array_and_linkedlist/array/ | https://www.hello-algo.com/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| algo-hash | 6.1 哈希表 | https://www.hello-algo.com/chapter_hashing/hash_map/ | https://www.hello-algo.com/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| d2l-tensor | 数据操作（教材 2.1） | https://www.bilibili.com/video/BV1CV411Y7i4 | https://zh.d2l.ai/chapter_preliminaries/ndarray.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-pandas | 数据预处理（教材 2.2） | https://www.bilibili.com/video/BV1CV411Y7i4?p=3 | https://zh.d2l.ai/chapter_preliminaries/pandas.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-autograd | 自动求导（教材 2.5） | https://www.bilibili.com/video/BV1KA411N7Px | https://zh.d2l.ai/chapter_preliminaries/autograd.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-linear | 线性回归（教材 3.1） | https://www.bilibili.com/video/BV1PX4y1g7KC | https://zh.d2l.ai/chapter_linear-networks/linear-regression.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-train-loop | 线性回归的从零开始实现（教材 3.2） | https://www.bilibili.com/video/BV1PX4y1g7KC?p=3 | https://zh.d2l.ai/chapter_linear-networks/linear-regression-scratch.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-torch | 线性回归的简洁实现（教材 3.3） | https://www.bilibili.com/video/BV1PX4y1g7KC?p=4 | https://zh.d2l.ai/chapter_linear-networks/linear-regression-concise.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-mlp | 多层感知机的简洁实现（教材 4.3） | https://www.bilibili.com/video/BV1hh411U7gn?p=3 | https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp-concise.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-overfit | 欠拟合和过拟合（教材 4.4） | https://www.bilibili.com/video/BV1kX4y1g7jp?p=2 | https://zh.d2l.ai/chapter_multilayer-perceptrons/underfit-overfit.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-save | 读写文件（教材 5.5） | https://www.bilibili.com/video/BV1AK4y1P7vs?p=4 | https://zh.d2l.ai/chapter_deep-learning-computation/read-write.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-lenet | 卷积神经网络（LeNet）（教材 6.6） | https://www.bilibili.com/video/BV1t44y1r7ct/ | https://zh.d2l.ai/chapter_convolutional-neural-networks/lenet.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-sequence | 序列模型（教材 8.1） | https://www.bilibili.com/video/BV1L44y1m768/ | https://zh.d2l.ai/chapter_recurrent-neural-networks/sequence.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-lstm | 长短期记忆网络（LSTM）（教材 9.2） | https://www.bilibili.com/video/BV1JU4y1H7PC/ | https://zh.d2l.ai/chapter_recurrent-modern/lstm.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-attention | 注意力分数（教材 10.3） | https://www.bilibili.com/video/BV1Tb4y167rb/ | https://zh.d2l.ai/chapter_attention-mechanisms/attention-scoring-functions.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-position | 自注意力和位置编码（教材 10.6） | https://www.bilibili.com/video/BV19o4y1m7mo/ | https://zh.d2l.ai/chapter_attention-mechanisms/self-attention-and-positional-encoding.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| d2l-transformer | Transformer（教材 10.7） | https://www.bilibili.com/video/BV1Kq4y1H7FL/ | https://zh.d2l.ai/chapter_attention-mechanisms/transformer.html | 官方课表逐节链接已核验；B站播放、片长及字幕未验证。 |
| genai-prompt | 04 理解提示工程基础 | https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-CN/04-prompt-engineering-fundamentals/README.md | https://github.com/microsoft/generative-ai-for-beginners | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| genai-api | 06 构建文本生成应用 | https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-CN/06-text-generation-apps/README.md | https://github.com/microsoft/generative-ai-for-beginners | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| genai-tools | 11 使用函数调用集成外部应用 | https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-CN/11-integrating-with-function-calling/README.md | https://github.com/microsoft/generative-ai-for-beginners | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| genai-responsible | 03 负责任地使用生成式 AI | https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-CN/03-using-generative-ai-responsibly/README.md | https://github.com/microsoft/generative-ai-for-beginners | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| genai-rag | 15 检索增强生成 (RAG) 及向量数据库 | https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-CN/15-rag-and-vector-databases/README.md | https://github.com/microsoft/generative-ai-for-beginners | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| genai-security | 13 保障你的生成式 AI 应用安全 | https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-CN/13-securing-ai-applications/README.md | https://github.com/microsoft/generative-ai-for-beginners | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| hf-agents-concept | Unit 1 · What is an Agent? | https://huggingface.co/learn/agents-course/en/unit1/what-are-agents | https://huggingface.co/learn/agents-course/en/unit1/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| hf-agents-tools | Unit 1 · What are Tools? | https://huggingface.co/learn/agents-course/en/unit1/tools | https://huggingface.co/learn/agents-course/en/unit1/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| hf-agents-cycle | Unit 1 · Understanding AI Agents through the Thought-Action-Observation Cycle | https://huggingface.co/learn/agents-course/en/unit1/agent-steps-and-structure | https://huggingface.co/learn/agents-course/en/unit1/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| hf-agents-dummy | Unit 1 · Dummy Agent Library | https://huggingface.co/learn/agents-course/en/unit1/dummy-agent-library | https://huggingface.co/learn/agents-course/en/unit1/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| hf-agents-blocks | Unit 2.3 · Building Blocks of LangGraph | https://huggingface.co/learn/agents-course/en/unit2/langgraph/building_blocks | https://huggingface.co/learn/agents-course/en/unit1/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| hf-agents-graph | Unit 2.3 · Building Your First LangGraph | https://huggingface.co/learn/agents-course/en/unit2/langgraph/first_graph | https://huggingface.co/learn/agents-course/en/unit1/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| fastapi-first | 第一步 | https://fastapi.tiangolo.com/zh/tutorial/first-steps/ | https://fastapi.tiangolo.com/zh/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| fastapi-body | 请求体 | https://fastapi.tiangolo.com/zh/tutorial/body/ | https://fastapi.tiangolo.com/zh/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| fastapi-errors | 处理错误 | https://fastapi.tiangolo.com/zh/tutorial/handling-errors/ | https://fastapi.tiangolo.com/zh/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| fastapi-security | 使用密码（及哈希）的 OAuth2，基于 JWT 的 Bearer 令牌 | https://fastapi.tiangolo.com/zh/tutorial/security/oauth2-jwt/ | https://fastapi.tiangolo.com/zh/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| fastapi-testing | 测试 | https://fastapi.tiangolo.com/zh/tutorial/testing/ | https://fastapi.tiangolo.com/zh/tutorial/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| docker-dockerfile | Writing a Dockerfile | https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/ | https://docs.docker.com/get-started/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| docker-compose | Multi-container applications | https://docs.docker.com/get-started/docker-concepts/running-containers/multi-container-applications/ | https://docs.docker.com/get-started/ | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| evals-observe | Bonus Unit 2 · AI Agent Observability & Evaluation | https://huggingface.co/learn/agents-course/en/bonus-unit2/introduction | https://huggingface.co/learn/agents-course/en/bonus-unit2/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| evals-regression | Demystifying evals for AI agents | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | https://huggingface.co/learn/agents-course/en/bonus-unit2/introduction | 已打开本节官方正文，核对页面标题与内容；视频时长未作声称。 |
| cs50p-functions | Week 0 · Functions, Variables | https://cs50.harvard.edu/python/weeks/0/ | https://cdn.cs50.net/python/2022/x/lectures/0/lang/en/lecture0.txt | 官方页面及英文SRT字幕已核验；未核实中文字幕或实际片长。 |
| cs50p-conditionals | Week 1 · Conditionals | https://cs50.harvard.edu/python/weeks/1/ | https://cdn.cs50.net/python/2022/x/lectures/1/lang/en/lecture1.txt | 官方页面及英文SRT字幕已核验；未核实中文字幕或实际片长。 |
| cs50p-loops | Week 2 · Loops | https://cs50.harvard.edu/python/weeks/2/ | https://cdn.cs50.net/python/2022/x/lectures/2/lang/en/lecture2.txt | 官方页面及英文SRT字幕已核验；未核实中文字幕或实际片长。 |


## 2026-10-12 视频主线（独立于历史课节）

本次新增8个只读视频资源，各对应既有WA任务；不复用旧课节ID，不新建视频完成状态。每节的项目练习是迁移应用，不冒称原视频讲解了全部项目验收标准。技能ID连接既有完整量表，只说明部分覆盖。

所有视频均在精确目标地址核验标题、作者、目录或播放器时长，并看到短预览；未验证全程播放。B站页面可能要求登录后完整观看，不承诺免登录、无地区限制或永久免费服务。具体核验字段和证据链接保存在data/video-learning.json。

### 1. 把反馈CSV读进来，再导出文件

- 视频：[P15 · 3.5 pandas 导入导出](https://www.bilibili.com/video/av16378934/?p=15)；莫烦Python；07:22
- 对应：wa-m0；技能 sql-data
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：2017年录播，读写思路仍适用；安装和函数参数以当前项目环境为准。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

### 2. 只取这次任务需要的反馈

- 视频：[P12 · 3.2 pandas 选择数据](https://www.bilibili.com/video/av16378934/?p=12)；莫烦Python；11:43
- 对应：wa-m0；技能 sql-data
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：老版示例若出现.ix不要照搬；本项目只使用当前支持的布尔筛选、loc或iloc。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

### 3. 让Python实际调用一次模型

- 视频：[P13 · 12-AI通识-大模型API-编程调用大模型](https://www.bilibili.com/video/BV178w1z7EHQ/?p=13)；黑马程序员；17:59
- 对应：wa-m1；技能 api-delivery
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：P序号从1开始，而课程标题从00开始；本节12对应P13。不要照着课程自动开通付费服务。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

### 4. 让模型选择并调用已有工具

- 视频：[第1期 · 快速构建 ReAct Agent](https://www.bilibili.com/video/BV1g52uBZEco/)；沧海九粟（LangChain × OceanBase社区课程）；20:13
- 对应：wa-m1；技能 agent-evaluation
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：课程基于LangChain V1；沿用项目选定版本，不因课程另换整套项目。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

### 5. 先让错误被自动检查发现

- 视频：[P1 · pytest01-快速上手](https://www.bilibili.com/video/BV1bV41167a4/)；白月黑羽编程；28:37
- 对应：wa-m2；技能 software-testing
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：2020年录播；学习测试函数与断言。pytest不是unittest的版本升级，原视频总标题只是作者命名。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

### 6. 用一组坏输入重复检查

- 视频：[P5 · pytest05-数据驱动与调试](https://www.bilibili.com/video/BV1bV41167a4/?p=5)；白月黑羽编程；13:09
- 对应：wa-m2；技能 software-testing
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：本课教测试组织方法；文件边界、重试上限等仍须在你自己的Agent代码中实现和验证。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

### 7. 先决定怎样算做对

- 视频：[独立视频 · 走近LLM应用的评测：LangSmith助力RAG和Agent评估（上）](https://www.bilibili.com/video/BV1WdNheeEGG/)；沧海九粟；22:26
- 对应：wa-m3；技能 agent-evaluation, statistics-metrics
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：2025年录播；先学评测方法，项目可把结果保存在本地CSV。观看课程不等于同意上传资料。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

### 8. 跑同一批任务，留下可比较的结果

- 视频：[第4节 · LangSmith Evaluations：执行评估评测](https://www.bilibili.com/video/BV12f421X7j1/)；沧海九粟；20:10
- 对应：wa-m3；技能 agent-evaluation, ml-validation
- 范围：只看本节完整视频，不要求刷完整套课程
- 版本提醒：2024年录播，LangSmith界面/API可能已变；不要求注册或上传。可将同样评测流程实现为本地脚本。
- 核验：已在云浏览器核验本节标题、作者、目录时长与短预览；完整观看可能需登录。

