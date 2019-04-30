const express = require("express");
const app = express();
const admin = require('./routes/admin')
const index = require('./routes/index')


app.use('/admin', admin)
app.use('/', index)
app.listen("3003", "127.0.0.1");
