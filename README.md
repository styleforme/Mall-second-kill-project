项目介绍
-

采用前后端分离技术开发的基于SpringBoot+bootstrap的商城秒杀项目，主要解决商城促销活动中的高并发。

预览地址
-

http://119.91.194.100/

前端技术栈
-

核心框架:Bootstrap

搭配js

后端技术栈
-

核心框架：SpringBoot

持久化框架：MyBatis

Token认证：JWT

数据库：MySQL Redis

中间件：RocketMQ

缓存：Guava Cache

快速开始
-

Winows部署

创建 MySQL 数据库seckill，并执行Mall-second-kill-projects/sql/seckill-data初始化表数据

修改配置信息Mall-second-kill-projects/seckill/src/main/resources/applition-dev

安装 Redis 并启动

安装RocketMQ并启动

启动后端服务

启动前端服务：VSCode打开seckill-site文件夹，在终端输入npm install命令安装依赖，输入npm run serve启动服务


