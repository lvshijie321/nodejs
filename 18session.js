// npm i -S express-session

const express = require('express');
const app = express();
const session = require('express-session');

// 首次访问 /login 或 / 任何注册的路由， 因为没有携带 connect.sid 将生成一个 sid（key），和 session(value),
// 只有 req 中的 connect.sid 为空时，才会返回客户端 connect.sid 这个cookie
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // secure: true 只有 https 下才能访问 cookie
}))

app.get('/login', (req, res) => {
  
  // 向 session 中设置需要的属性
  // 把 connect.sid 作为 cookie 传给客户端
  req.session.userinfo = 'zhangsan'
  res.send('登陆成功')
  
})

app.get('/', (req, res) => {
  // 第二次访问时携带了了 connect.sid，取出 connnect.sid（key） 对应的 session（value）
  // 根据 session 作相应的处理。
  req.session.userinfo 
    ? res.send('你好，' + req.session.userinfo)
    : res.send('你好，')
})




app.listen(3000, () => console.log("Example app listening on port 3000!"));
