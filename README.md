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

创建 MySQL 数据库seckill，并执行初始化表数据
修改配置信息blog-api/src/main/resources/application-dev.properties
安装 Redis 并启动
启动后端服务
分别在blog-cms和blog-view目录下执行npm install安装依赖
分别在blog-cms和blog-view目录下执行npm run serve启动前后台页面
