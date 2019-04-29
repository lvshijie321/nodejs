// npm i -S express-session
const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
let count = 0
// 浏览器关闭后，sesseion 信息会被清空，这是不同域 cookie 的地方，cookie 只要不过期，一直存在浏览器本地
// 第一种 cookie 是持久化 cookie ,把 cookie 固化在用户的浏览器里，只要 cookie 不过期，关闭浏览器依旧存在。
// 第二种是会话 cookie ,把 cookie 放在浏览器内存里,只能在这个浏览器的内存范围里完成会话,如果关闭浏览器 cookie 就被清除，或者手动删除 cookie 也会清除，是一种不长久的方式。session 就使用了第二种会话 cookie 方式。

// session 是放在服务器内存里的

// 首次访问 /login 或 / 任何注册的路由， 因为没有携带 connect.sid（name 字段的属性值） 将生成一个 sid（key），和 session(value),
// 只有 req 中的 connect.sid 为空时，才会返回客户端会话 cookie，里面包含 connect.sid 。
app.use(
  session({
    secret: "keyboard cat", // 作为服务器端生成 session 的签名
    name: "connect.sid", // 返回浏览器的会话 cookie 的名称
    resave: false, // 是否在 session 没有变化时也要强制保存 session
    saveUninitialized: true, //  强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。此配置项为 true ，session 未初始化时服务端也会返回会话 cookie，false 则不返回
    // 这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。
    cookie: {
      // cookie 的所有配置项这里都可以进行配置
      maxAge: 10000, // cookie 过期时间，无论期间是否请求服务器，都会过期
      secure: false // secure: true 只有 https 下才能访问 cookie
    },
    rolling: true, // 每次请求重置 cookie 选项中的 maxAge 值，变相的延长 maxAge 时间，返回客户端会话 cookie， 里面的connect.sid 不变，过期时间改变。
    store: new MongoStore({ // 执行到这句后，会向 session 数据库里新增 sessions 集合
      url: "mongodb://127.0.0.1:27017/session",
      touchAfter: 24 * 3600 // time period in seconds
    })
  })
);

app.get("/login", (req, res) => {
  // 向 session 中设置需要的属性
  // 把 connect.sid 作为 cookie 传给客户端
  req.session.userInfo = "zhangsan1"; // 执行这行代码，回向 sessions 集合中插入数据
  req.session.count = count++
  res.send("登陆成功");
});

app.get("/logout", (req, res) => {
  req.session.cookie.maxAge = 0; // 销毁 session 方式1
  req.session.destroy(function(err) {
    // 销毁 session 方式2
    console.log("已销毁");
  });
  res.send("已退出");
});
app.get("/", (req, res) => {
  // 第二次访问时携带了了 connect.sid，取出 connnect.sid（key） 对应的 session（value）
  // 根据 session 作相应的处理。
  res.cookie("aid", "aid123"); // 这是持久化 cookie，关闭浏览器依旧存在

  //req.session.cookie.maxAge=5000; //重新设置 cookie 的过期时间，这时会重新返回会话 cookie，但 connect.sid 不变， 过期时间变了
  req.session.userInfo
    ? res.send("你好，" + req.session.userInfo)
    : res.send("session 过期");
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
