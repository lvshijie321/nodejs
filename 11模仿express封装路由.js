const myExpress = require('./modules/app')
const app = myExpress() // 或 new myExpress()
const ejs = require('ejs')
 
app.listen(5676)

app.get('/news/china/:id/:uid', (req, res) => {
     res.end(JSON.stringify(req._params))
})

app.get('/login', (req, res) => {
    ejs.renderFile(
        "views/form.ejs",
        {},
        function(err, str) {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        })
          res.end(str);
        }
      );
})

app.post('/login', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    })
    res.end(req.body)
})

app.post('/doLogin', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    })
    res.end(req.body)
})