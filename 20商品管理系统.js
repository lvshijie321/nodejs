const express = require('express')
const app = express()
const url = require('url')
const ejs = require('ejs')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views/app')

app.use(express.static('public'))

app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/product', (req, res) => {
  res.render('product', {
    userinfo: {
      username: '张三'
    }
  })
})
app.get('/productAdd', (req, res) => {
  res.render('productadd', {
    userinfo: {
      username: '张三'
    }
  })
})
app.get('/productEdit', (req, res) => {
  res.render('productedit')
})
app.get('/productDelete', (req, res) => {
  res.send('productDelete')
})

app.get('/', (req, res) => {
  res.render('product', {
    userinfo: {
      username: '张三'
    }
  })
})

app.listen('3002', '127.0.0.1')