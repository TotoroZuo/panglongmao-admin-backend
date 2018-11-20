const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// error handler
onerror(app)

// 配置信息
const config = require('./config/config')

const jwt = require('koa-jwt') // 路有权限控制
// // 请求拦截
const interceptors = require('./config/interceptors')
app.use(interceptors())
// 过滤不用jwt验证
app.use(jwt({
  secret: config.SECRET
}).unless({
  path: [
    '/wx/user/getToken',
    '/admin/user/doLogin',
    '/admin/user/createUserInfo',
    '/admin/common/upload'
  ]
}))

// middlewares
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200000 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const wxRoutes = require('./routes/wx/index') // 路由输入口
// routes
app.use(wxRoutes.routes(), wxRoutes.allowedMethods())
const adminRoutes = require('./routes/admin/index') // 路由输入口
// routes
app.use(adminRoutes.routes(), adminRoutes.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
