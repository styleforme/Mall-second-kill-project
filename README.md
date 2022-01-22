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

第一步：创建 MySQL 数据库seckill，并执行Mall-second-kill-projects/sql/seckill-data初始化表数据

第二步：修改配置信息Mall-second-kill-projects/seckill/src/main/resources/applition-dev

第三步：安装 Redis 并启动

第四步：安装RocketMQ并启动

第六步：启动后端服务

第七步：启动前端服务：VSCode打开seckill-site文件夹，在终端输入npm install命令安装依赖，输入npm run serve启动服务


Linux云端部署并压测

第一步：进入云服务器控制台防火墙开放相应的端口号

![image](https://user-images.githubusercontent.com/97151855/150635010-118f38d5-2a79-4f10-b0bc-d12b5eb6a218.png)

第二步：服务器安装JDK、MySQL、Redis、Nginx、RocketMQ、Jmeter并修改相应的配置文件

安装步骤链接：https://blog.csdn.net/m0_57237237/category_11596031.html?spm=1001.2014.3001.5482

第三步：在IDEA对项目进行打包

mvn clean package -Dmaven.test.skip=ture命令打包

第四步：上传打包的项目和SQL到服务器

scp seckill-0.0.1-SNAPSHOT.jar root@121.36.65.190:/root命令上传jar包
scp seckill.sql root@121.36.65.190:/root命令上传sql表
scp seckill-data.sql root@121.36.65.190:/root命令上传sql数据

第五步：配置Nginx反向代理

server {
listen 80;
location / {
alias /usr/share/nginx/html/seckill-site/;
index seckill.html;
} }（本机的，Tomcat，超过三次请求不到，就认为失败，超过 30s 访问不到就不访问了。）
upstream myserver {
server 127.0.0.1:8080 max_fails=3 fail_timeout=30s;
}（负载均衡，再来个 server，90 端口会把请求转给 myserver）
server {
listen 90;
server_name _;
location / {
proxy_pass http://myserver;
}
}

第六步：通过jmeter进行压测

点击 test plan（左侧），添加线程-线程组，添加线程组设置 50 10 10

选择线程组，右键，添加取样器，HTTP 请求

填表：协议 HTTP，路径名称或 ip121.36.65.190，端口 90（只压测后端：商品详情+下单操作），HTTP 请求 GET，路径/item/detail/161，内容编码 utf-8

线程组，右键，添加监听器，察看结果树（看结果对不对）

线程组，右键，添加监听器，聚合报告（一共发了多少请求，吞吐量，有没有错误）【90%、95%、异常有没有报错、吞吐量】，每秒查询率 QPS 和吞吐量 TPS 均看的是聚合报告里的吞吐量，但是操作不一

样，一个是 GET 请求详情页，一个是用户下单的操作
