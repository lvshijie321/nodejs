// npm i -S ejs 或者 pug 

const express = require('express') 
const app = express()

app.set('view engine', 'ejs') // 或者 pug 

app.set('views', __dirname + '/static')// 模板默认找 views 目录，如果要改变


app.get('/', (req, res) => {
    res.render('index.ejs', {msg:123, list:[1,2,3], h:1})
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))