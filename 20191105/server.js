const Koa = require('koa');
const staticCache = require('koa-static-cache');
const body = require('koa-better-body');
const convert = require('koa-convert');
const session = require('koa-session');
const config = require('./config');
const Router = require('koa-router');
const ejs = require('koa-ejs');
const pathlib = require('path');
const url = require('url');
const path = require('path')
const staticFiles = require('koa-static')

let server = new Koa();
server.listen(8090);
// 配置静态目录 获取静态文件
server.use(staticFiles(path.join(__dirname + '/public/')))
// 异常集中处理
let error_handler = require("./libs/error_handler");
error_handler(server);
// 连接数据库
let db = require("./libs/db");
server.use(async (ctx, next) => {
    // console.log(url.parse(ctx.url, true).path)
    ctx.db = db;
    await next();
})
// post 
server.use(convert(body({
    uploadDir: config.uploadDir
})));

// session 
server.keys = config.secret_key;
server.use(session({}, server));

// ejs
ejs(server, {
    root: pathlib.resolve('template'),
    layout: false,
    viewExt: '.ejs.html',
    cache: false,
    debug: false
});
// router
let mainRouter = new Router();
mainRouter.use("/", require('./routers/index'));
server.use(mainRouter.routes());

// static
server.use(staticCache(config.wwwDir));