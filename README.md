# boilerplate-vue-app

## 初始化

clone 项目模板到本地，删除目录中的 `.git` 目录（模板 git 仓库）

```bash
git clone git@github.com:ishen7/boilerplate-vue-app.git my-project
cd my-project && rm -rf .git/
```

### 环境依赖

- node 8.9+ LTS
- npm 5.7+

### 本地开发

```
yarn install
yarn run serve:dev    ## 日常环境 API
yarn run serve:mock   ## 本地环境 Mock API
```

### 构建生产包

```
yarn run build:prod       ## 构建生产环境包
yarn run build:staging    ## 构建预发环境包
yarn run build:test       ## 构建测试环境包
```

### 其他命令

```
yarn run lint           ## 代码审查
yarn run build:report   ## 构建生产环境包统计报告以分析包各模块大小
```
