const express = require("express");
const app = express();
const url = require("url");
const ejs = require("ejs");
const bodyParser = require("body-parser"); // 不能处理图片上传
const db = require("./lib/db");
const session = require("express-session");
const md5 = require("md5-node");
const multiparty = require("multiparty");

// res.redirect('/') 会设置 response header 的 Location 值为 /，让浏览器重定向到 / ，并且 response 空内容
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

// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/app");

app.use(express.static("public"));
app.use('/upload',express.static('upload'));

// app.use((req, res, next) => {
//   const pathName = url.parse(req.url).pathname;
//   pathName === "/login" || pathName === "/doLogin"
//     ? req.session.userInfo
//       ? res.redirect("/") ///todo：怎么停留在当前页面
//       : next()
//     : req.session.userInfo
//     ? next()
//     : res.redirect("/login");

//   // 权限判断用中间件比较多
// });

app.post("/doLogin", (req, res) => {
  const param = {
    ...req.body
  };
  param.password = md5(req.body.password);
  db.find("user", param).then(data => {
    data.length
      ? /*res.render('product', {userinfo: {
              username: "张三"
            }}) */
        ((app.locals.userInfo = req.session.userInfo = data[0]),
        res.redirect("/product"))
      : res.send("<script>alert('登录失败');location.href='/login';</script>");
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/loginOut", (req, res) => {
  req.session.cookie.maxAge = 0; // 这么做客户端的 cookie 会清除
  req.session.destroy(function(err) {
    if (!err) {
      res.redirect("/login");
    }
  });
});
app.get("/product", (req, res) => {
  db.find("product")
    .then(data => {
      console.log(data[0]._id.toString()) // _id 值是一个对象类型， 在 ejs 模板里使用会调用 toString()
      res.render("product", { list: data });
    })
    .catch(e => {});
});
app.get("/productAdd", (req, res) => {
  res.render("productadd");
});
app.get("/productEdit", (req, res) => {
  res.render("productedit");
});
app.get("/productDelete", (req, res) => {
  res.send("productDelete");
});

app.get("/", (req, res) => {
  res.redirect("/product");
});

app.get("/delete/:id", (req, res) => {
  db.deleteOne("product", { _id: new db.ObjectID(req.params.id) }).then(() => {
    res.redirect("/product");
  });
});
app.get('/edit/:id', (req, res) => {
  db.find("product", {_id: new db.ObjectID(req.params.id)})
    .then(data => {
      res.render("productedit", { detail: {
        ...data[0],
        id: req.params.id,
      } });
    })
    .catch(e => {});
})
app.post("/doProductAdd", (req, res) => {
  const form = new multiparty.Form();
  form.uploadDir = 'upload'
  form.parse(req, function(err, fields, files) {
    db.insert('product', {
      title: fields.title[0],
      price: Number(fields.price[0]),
      fee: Number(fields.fee[0]),
      pic: files.pic[0].path,
      description: fields.description[0]
    }).then(data => {
      res.redirect('/product')
    })
  });
});
app.post("/doProductEdit/:id", (req, res) => {
  const form = new multiparty.Form();
  form.uploadDir = 'upload'
  form.parse(req, function(err, fields, files) {
    db.updateOne('product', {_id: new db.ObjectID(req.params.id)}, {$set: { // 使用 _id 查询时，需要转化为 Object 对象
      pic: files.pic[0].path,
      description:fields.description[0],
      fee:fields.fee[0],
      price:fields.price[0],
      title:fields.title[0],
    }}).then(data => {
      res.redirect('/product')
    })
  });
});
app.listen("3002", "127.0.0.1");
