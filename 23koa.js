const koa = require('koa')
const app = new koa()

// 配置中间件（可以先当做路由）
app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

// 监听端口
app.listen(3000)