// npm i -S ejs 或者 pug

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs')

app.set('view engine', 'ejs') // 或者 pug 

// 第三方中间件，处理 post 请求的 body 体
app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded
app.use(bodyParser.json())// parse application/json

// 内置中间件，托管静态文件，写在路由前
app.use(express.static('static'))

// 应用级中间件：执行顺序 1
app.use((req, res, next) => {
  console.log('执行顺序 1');
  true
    ? next()  // 继续向下匹配，调用 next
    : res.send('被中间截断') // 如果不向下匹配，可以这么做。

	// 权限判断用中间件比较多
});
// 路由级中间件：执行顺序 2
app.get("/", (req, res, next) => {
  console.log('执行顺序 2:路由中间件');
  next()
});

// 执行顺序 3
app.get("/", (req, res) => {
  console.log('执行顺序 3:路由');
  res.send("路由");
});

app.get('/login', (req, res) => {
	res.render('login.ejs')
})

app.post('/doLogin', (req, res) => {
	res.send(JSON.stringify(req.body))
})


// 路由级中间件：如果匹配不到任何路由，进入这个中间件
app.use((req, res, next) => {
	
	console.log('匹配不到任何路由')
	res.status(404).send("404");
})
app.listen(3000, () => console.log("Example app listening on port 3000!"));
