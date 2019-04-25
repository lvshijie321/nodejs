const app = require('./modules/app')
const ejs = require('ejs')
 
app.listen(6661)



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