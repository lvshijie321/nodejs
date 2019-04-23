const http = require('http')
const ejs = require('ejs')
const url = require('url')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    if (req.url === '/favicon.ico') {
        res.end()
        return
    }
    ejs.renderFile('views/index.ejs', { msg: '你好', list: ['vue.js', 'React.js'] }, function(err, str){
        
        res.end(str)

    });
}).listen(8808)