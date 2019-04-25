// npm i -S express

const express = require('express')
const app = express()

// 动态路由
app.get('/news/:id', (req, res) => {
    
    res.send(req.params.id)
})

app.get('/product', (req, res) => {
    res.send(req.query.id)
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))