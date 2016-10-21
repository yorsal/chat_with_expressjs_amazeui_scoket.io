## 文件解释

* ./bin/www 创建服务器(监听)
* conf 配置 
 - config.js 配置文件 (常量)
 - function.js 公共函数库
 - sequelize.js 数据库配置/连接

* controllers 控制器模块 （业务逻辑）
* models 数据持久层模块
* node_modules 引入的node模块
* public 静态文件 (images, js, css) url路径不需要包含public 直接用 /dist or /src
* routes 路由
* views 模版
* gulpfile.js 打包配置文件
* package.json npm 依赖配置
* README.me

## 创建数据库持久层
./node_modules/sequelize-auto/bin/sequelize-auto -o "./models" -d yorsal_jiayuan -h localhost -u root

## 启动/部署服务器

* 启动程序 npm start 建议使用 supervisor ./bin/www 自动更新

* 部署程序 采用 forever 后台部署 