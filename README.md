# x-core-monorepo-template

## 使用
用来当作最基础的monorepo模版，包含一些常用的配置和脚本


### 常用脚本
```bash
pnpm run gen # 生成相关代码, 具体项目内容需要子类模板进行实现
pnpm run dev # 本地开发
pnpm run build # 构建项目
pnpm run lint # 代码风格检查
pnpm run format # 代码格式化检查
pnpm run test # 运行测试
pnpm run clean # 清理项目，删除node_modules和构建产物
```


## 项目说明

### 名词解释

| 名词         | 解释                                                                      | 备注           |
| ------------ | ------------------------------------------------------------------------- | -------------- |
| mono package | 项目中的package，位于packages或者其他目录之下，包含一个独立的功能模块     | 也可以称为子包 |
| root package | 项目的根目录，包含整体的配置文件和脚本                                    |                |
| 依赖package  | 位于package.json的dependencies、devDependencies、peerDependencies中的依赖 |                |

### 设计思路
本项目建立在以下几个设计原则之上：
* 独立性：
  * 每个mono package需要的依赖应明确声明，避免隐式依赖，
  * mono package的依赖package版本为exact，如`1.0.0`，避免使用范围版本，如`^1.0.0`，确保依赖的稳定性
  * 每个mono package应遵循单一原则，避免过度复杂化
* 统一性：项目中的mono package应遵循统一的代码风格，规范，脚本接口，确保代码的一致性和可读性
* 高内聚性：相关功能应集中在同一mono package中，如模块A，对外暴露出来的接口应该包含模块A的所有功能，包括工具函数，UI组件，类型定义等
* 高可维护性：每个mono package通过清晰的结构和规范，确保项目易于维护和扩展，主要表现在
  * 文档：每个mono package应包含README.md，描述其功能、安装和使用方法
  * 测试：每个mono package应包含`tests`文件夹，用于测试代码，确保其功能的正确性
  * 接口：每个mono package应通过明确的接口与其他包交互，避免直接依赖其他包的内部实现，`entry points`由`package.json`中的`exports`定义，脚本接口由`package.json`中的`scripts`定义


### 结构
```
|-- apps  // 存放应用相关的mono package，如web应用，移动应用，e2e测试等
|-- dev-tools // 存放开发相关的mono package，如eslint配置，prettier配置等
|-- features // 存放业务相关的mono package，如用户系统，订单系统等
|-- packages // 存放通用类的mono package，如组件库，工具库等
|-- turbo
|  |-- generators // 包含turbo generate脚本
```

### 技术栈和基本规则
* pnpm: 用于包管理
* typescript: 语言
* turbo: 用于加速构建和任务运行
* vitest: 用于单元测试
* 规则校验
  * eslint + oxc：执行命令为`oxlint . && eslint .`，用于代码风格检查
  * prettier + oxc plugin：用于代码格式化
	* commitlint + husky：用于提交信息规范
	* lint-staged：用于在提交前对代码进行格式化和校验
  	* 每个mono package都有lint stage配置，用于自定义
	* syncpack：用于同步mono package的版本号
* 组织结构：monorepo

### 脚本命令
脚本命令统一在根目录的`package.json`中定义，且mono package也应包含相应的脚本命令，具体如下：
| 脚本命令      | 调用命令                 | 说明                                                                 | 备注                       |
| ------------- | ------------------------ | -------------------------------------------------------------------- | -------------------------- |
| clean         | `pnpm run clean`         | 清理项目                                                             | 删除node_modules和构建产物 |
| clean:all     | `pnpm run clean:all`     | 全量清理项目，会调用mono pakcage的clean命令和root package的clean命令 | 只存在于root package       |
| dev           | `pnpm run dev`           | 本地开发                                                             |                            |
| build         | `pnpm run build`         | 构建项目                                                             |                            |
| preview       | `pnpm run preview`       | 预览构建结果                                                         |                            |
| lint          | `pnpm run lint`          | 代码风格检查                                                         |                            |
| lint:fix      | `pnpm run lint:fix`      | 代码校验并修复                                                       |                            |
| format        | `pnpm run format`        | 代码格式化检查                                                       |                            |
| format:fix    | `pnpm run format:fix`    | 代码格式化并修复                                                     |                            |
| test          | `pnpm run test`          | 运行测试                                                             |                            |
| test:coverage | `pnpm run test:coverage` | 运行测试并生成覆盖率报告                                             |                            |
| gen           | `pnpm run gen`           | 生成相关代码                                                         | 只存在于root package       |

