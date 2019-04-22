const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer((req, res) => {
    
    let pathName = req.url
    if (pathName === '/') {
        pathName = '/index.html' // 默认加载首页
    }
    if (pathName !== '/favicon.ico') { // 过滤 favicon.ico
        fs.readFile(`static${pathName}`, (err, data) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write(data.toString())
                
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            }
            res.end()
        })
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        res.end()
    }
   
    
}).listen(1303, '127.0.0.1')