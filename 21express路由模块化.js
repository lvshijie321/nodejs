const express = require("express");
const app = express();
const admin = require('./routes/admin')
const index = require('./routes/index')
const product = require('./routes/product')

app.use('/product', product)
app.use('/admin', admin) // 浏览器里访问 http://www.lvshijie.com:3002/admin/product，执行 admin.js 中的 /product 路由
app.use('/', index) // 浏览器里访问 http://www.lvshijie.com:3002/，执行 index.js 中的 / 路由
app.listen("3034", "127.0.0.1");
