// npm i -S cookie-parser

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


// 第三方中间件，处理 cookie
//app.use(cookieParser())
app.use(cookieParser('123456')) // signed 为 true 时， cookie 存储密文的密钥

app.get('/news',(req,res) => {
  res.send(JSON.stringify(req.cookies))
})
app.get('/product',(req,res) => {
  res.send(JSON.stringify(req.cookies))
})
app.get("/", (req, res) => {
  // 第一次访问 request header 里不携带 cookie，执行下面代码，response header 加入 Set-Cookie 属性，并且写入浏览器 本域名下的 cookie，下一次访问同一个域名， request header 里会携带 cookie 信息
  // 这样，同一个浏览器访问同一个域名可以共享信息
  res.cookie('age', '20', { expires: new Date(Date.now() + 30000) })
  res.cookie('name', 'zhangsan', { maxAge: 60000 }) // 设置 cookie httpPnly: false 不允许客户端脚本访问
  // maxAge 表示过期时间，如果下次访问超过这个时间，浏览器会清除当前域下的 name 这个 cookie，这次访问也就不会携带这个 cookie
  // cookie 保存在浏览器本地，如果没有过期，关闭浏览器再次访问 cookie 依旧存在

  
  res.cookie('secure', 'secure_value', { secure: true }) // secure: true 时，http 访问并响应后，浏览器不会写入 secure 这个 cookie
 /**
  * 
    hosts 文件里模拟域名解析后：
    127.0.0.1 www.aaa.com
    127.0.0.1 news.aaa.com
    通过 www.aaa.com 或 news.aaa.com 浏览器访问认为是不同域名
    首先要了解一个二级域名的概念：
    baidu.com # 域名
    news.baidu.com # 二级域名
    www.baidu.com
    如果不同域名想共享 cookie，需要设置 domain
    这样设置，aaa.com 域名下的 www.aaa.com 和 new.aaa.com 都可以在响应后写入浏览器 cookie，下次请求任意一个网址都可以携带 domain 这个 cookie，
    那么，其他域名访问并响应后，由于和 .aaa.com 不匹配，domain 这个 cookie 不会写入浏览器cookie
  */
  res.cookie('domain', 'domain_value', { domain: '.aaa.com' })
  
  // 只有 /news 才可以携带 path 这个 cookie
  res.cookie('path', 'path_value', { path: '/news' })
  
  // httpOnly 设置为 true，浏览器脚本无法访问被设置的 cookie，也无法修改
  res.cookie('httpOnly', 'httpOnly_value', { httpOnly: true })

  // 把明文 cookie 值设置成密文，只有服务器端才可以获取明文，客户端永远是密文
  res.cookie('signed', 'signed_value', { signed: true })

  res.send(`
  ${JSON.stringify(req.cookies)}
  ${JSON.stringify(req.signedCookies)}
    <script>alert(document.cookie);</script>
  `); // 获取cookie
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
