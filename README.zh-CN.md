# 低代码后端（NestJS）

本项目是基于 NestJS 的低代码平台后端服务。目标是将后续的低代码相关服务按模块聚合，统一在一级路径 `/lowcode-api` 下对外提供接口，同时预留 MySQL 数据库连接能力，便于后续在本地创建数据库并接入。

## 功能概览

- 路由前缀：所有接口统一加一级前缀 `/lowcode-api`
- 模块化：新增 `lowcode-api` 模块，聚合低代码相关能力
- 接口示例：
  - `GET /lowcode-api`：示例接口，返回 `Hello World!`
  - `POST /lowcode-api/nodes`：接收前端提交的 JSON 参数 `nodes`
- 数据库：集成 TypeORM，预留 MySQL 连接，使用环境变量进行配置

## 目录结构

```
src/
  lowcode-api/
    lowcode-api.module.ts
    lowcode-api.controller.ts
    lowcode-api.service.ts
  app.module.ts
  main.ts
```

## 快速开始

1. 安装依赖

```bash
pnpm install
```

2. 配置环境变量

复制 `.env.example` 为 `.env`，并根据本地 MySQL 修改：

```env
PORT=3000
DB_ENABLED=false # 未配置数据库时保持为 false，配置完成后改为 true
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=lowcode
```

3. 启动开发服务器

```bash
pnpm start:dev
```

启动后接口默认如下：

- `GET http://localhost:3000/lowcode-api` 返回 `Hello World!`
- `POST http://localhost:3000/lowcode-api/nodes`
  - 请求体示例：
  ```json
  { "nodes": { "id": 1, "type": "Button", "props": { "text": "提交" } } }
  ```
  - 响应示例：
  ```json
  { "success": true, "message": "nodes received", "nodes": { ... } }
  ```

## MySQL 接入（预留）

- 已安装并集成：`@nestjs/config`、`@nestjs/typeorm`、`typeorm`、`mysql2`
- `AppModule` 中通过 `TypeOrmModule.forRootAsync` 使用环境变量进行数据库连接配置：
  - `autoLoadEntities: true`：后续新增实体会自动加载
  - `synchronize: false`：建议生产环境保持关闭（避免自动更改数据库结构）
- 后续你只需：
  1. 在本地创建 MySQL 数据库，并在 `.env` 中填好连接信息
  2. 在对应模块中创建实体（如 `src/lowcode-api/entities/*.entity.ts`）
  3. 在模块中通过 `TypeOrmModule.forFeature([YourEntity])` 引入实体仓库

## 测试

```bash
pnpm test:e2e
```

`e2e` 测试已更新以匹配新的全局前缀 `/lowcode-api`。

## 后续规划

- 在 `lowcode-api` 模块内扩展节点处理逻辑（例如校验、持久化、生成代码等）
- 新增实体与仓库，落地 MySQL 数据持久化
- 根据需要添加鉴权、中间件、异常过滤器等基础设施