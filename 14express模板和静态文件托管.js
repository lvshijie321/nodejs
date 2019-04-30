// npm i -S ejs 或者 pug 

const express = require('express') 
const app = express()

app.set('view engine', 'ejs') // 或者 pug 
app.locals.userInfo = 1// 设置 ejs 全局变量，这样每个 ejs 文件，使用到 userInfo 变量时，值都为 1。不需要每次书写 res.render('index.ejs', { userInfo: 1 })
app.set('views', __dirname + '/static')// 模板默认找 views 目录，如果要改变

// 中间件 app.use
app.use(express.static('static'))  // 提供静态服务，否则没有注册访问不了 /css/index.css 这样的请求,所有请求现在 public 下查找
app.use(express.static('other')) // 可以提供多个静态资源路径，首先在 static 下找，找不到再到 other 下找

// 也可以注册虚拟目录，凡是以 vir 开头的请求，回到 static 目录下查找资源，
//如 http://localhost:3000/vir/css/index.css -> 以vir开头 -> 到 static 目录下查找 css/index.css 资源
app.use('/vir',express.static('static'))
app.get('/', (req, res) => {
    res.render('index.ejs', {msg:123, list:[1,2,3], h:1})
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))