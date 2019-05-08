const express = require("express");
const app = express();
const db = require('./lib/db')
const login = require('./routes/login')
const product = require('./routes/product/index')
const session = require("express-session");
const url = require('url')

app.set("view engine", "ejs");
app.set("views", process.cwd() + '/views');

app.use(express.static("public"));
app.use('/upload', express.static('upload'));

app.locals.db = db


app.use(
    session({
        secret: "keyboard cat", // 作为服务器端生成 session 的签名
        name: "connect.sid", // 返回浏览器的会话 cookie 的名称
        resave: false, // 是否在 session 没有变化时也要强制保存 session
        saveUninitialized: true, //  强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。此配置项为 true ，session 未初始化时服务端也会返回会话 cookie，false 则不返回
        // 这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。
        cookie: {
            // cookie 的所有配置项这里都可以进行配置
            maxAge: 1000 * 60 * 30, // cookie 过期时间，无论期间是否请求服务器，都会过期
            secure: false // secure: true 只有 https 下才能访问 cookie
        },
        rolling: true // 每次请求重置 cookie 选项中的 maxAge 值，变相的延长 maxAge 时间，返回客户端会话 cookie， 里面的connect.sid 不变，过期时间改变。
    })
);

app.use((req, res, next) => {
    const pathName = url.parse(req.url).pathname;
    if (req.session.userInfo) {
        switch (pathName) {
            case '/':
            case '/login':
            case '/login/do':
                res.redirect("/product") ///todo：怎么停留在当前页面
                break
            default:
                next()

        }
    } else {
        switch (pathName) {
            case '/login':
            case '/login/do':
                next()
                break
            default:
                res.redirect("/login")

        }
    }
});


app.use('/login', login)

app.use('/product', product)

app.listen("3042", "127.0.0.1");

