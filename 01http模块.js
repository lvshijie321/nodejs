/**
 * 我们使用 PHP 编写后端代码时，需要 Apache 或 Nginx 的 HTTP 服务器来处理客户端请求，Node.js 概念完全不一样了，不仅仅实现一个应用，同时还实现了整个 HTTP 服务器
 */

const http = require('http')

// 创建服务
http.createServer((req, res) => {
    
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"'}) // 文件类型 html，字符集 utf-8
    // res.writeHead 需要写在 res.write() 之前，否则会报错：Provisional headers are shown
    
    // 浏览器请求服务后（localhost:1001）会接收到 2 次请求，另一次是 /favicon.ico
    
    if (req.url !== '/favicon.ico') { // 过滤 favicon.ico
        res.write('你好，nodejs')
        res.write('你好，nodejs')
        res.write('你好，nodejs')
    }
    res.end() // 如果不加结束响应语句，标签页一直转圈，且第二次 favicon.ico 不会请求
    // res.write('。。。'); res.end() 可以写成 res.end('。。。')
    
}).listen(1001) //  可填写 '127.0.0.1' 或 '192.168.100.137' ，也可省略，如果填写，前台必须由填写项发起请求，如：这里配置 127.0.0.1， 前台需要由 127.0.0.1 发起，
                // 不可以由 192.168.100.137 发起，报错：Provisional headers are shown，如果省略 localhost '127.0.0.1' 或 '192.168.100.137' 都可发起