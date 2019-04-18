/**
 * 我们使用 PHP 编写后端代码时，需要 Apache 或 Nginx 的 HTTP 服务器来处理客户端请求，Node.js 概念完全不一样了，不仅仅实现一个应用，同时还实现了整个 HTTP 服务器
 */

const http = require('http')

// 创建服务
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"'}) // 文件类型 html，字符集 utf-8
    // res.writeHead 需要写在 res.write() 之前，否则会报错：Provisional headers are shown
    
    // 浏览器请求服务后（localhost:1001）会接收到 2 次请求，另一次是 /favicon.ico
    
    res.write('你好，nodejs')
    res.write('你好，nodejs')
    res.write('你好，nodejs')
    res.end() // 如果不加结束响应语句，标签页一直转圈
}).listen(1001, '127.0.0.1') //  '127.0.0.1' 可省略