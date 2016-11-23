本案例是[好奇猫](http://haoqicat.com/)网站《React 手牵手》课程案例的源码，采用了前后端分离的技术架构，实现了一个简单的博客系统。前端页面组件化采用 React 框架，Redux 控制组件状态，Webpack 打包项目代码。后端采用 Express 框架以及 MongoDB 数据库提供 RESTful API 服务。

### 启动项目

本项目源码包括 server 和 client 两个目录。必须保证系统中安装了 Node.js 运行环境以及 MongoDB 数据库，才能运行整个项目。

#### 运行后端代码

启动后端代码之前，确保先启动 MongoDB 数据库。然后运行后端代码，执行命令：

```
cd server
npm install
node index.js
```

#### 运行前端代码

前端 `client` 目录包含 complete 和 dev-env 两个目录，dev-env 目录是搭建前端开发环境需要的代码，complete 是前端开发完成之后的代码。运行前端代码，执行命令：

```
cd client/complete
npm install
npm start
```
