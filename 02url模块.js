const url = require('url')
const http = require('http')


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"'}) // 文件类型 html，字符集 utf-8
    
    res.write(req.url) // 第一次打印 / ，第二次打印 /favicon.ico，会请求两次，如果浏览器重请求地址是 http://localhost:1003/news?aid=1，则会打印 /news?aid=1
    res.write('</br>')
    res.write('</br>')
    
    res.write(JSON.stringify(
        url.parse(req.url, true).query
    ))
    res.write('</br>')
    res.write('</br>')
    
    res.write(JSON.stringify(
        url.parse('www.baidu.com?name=shijie'),
        null,
        '\t'
    ))
    res.write('</br>')
    res.write('</br>')

    const urlPasrse = url.parse('www.baidu.com?name=shijie', true) // 设置 query 是个对象
    res.write(urlPasrse.query.name)  // shijie
    res.write('</br>')
    res.write('</br>')

    res.write(JSON.stringify(
        url.parse('/a'),
        null,
        '\t'
    ))
    res.write('</br>')
    res.write('</br>')

    const urlFormat = url.format({
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '?name=shijie',
        query: 'name=shijie',
        pathname: 'www.baidu.com',
        path: 'www.baidu.com?name=shijie',
        href: 'www.baidu.com?name=shijie'
    })
    res.write(urlFormat) // www.baidu.com?name=shijie

    res.write('</br>')
    res.write('</br>')

    res.write(url.resolve('www.baidu.com/', 'abc')) // www.baidu.com/abc
    
    res.write('</br>')
    res.write('</br>')
    res.write(url.resolve('www.baidu.com', 'abc')) // abc

    
    res.write('</br>')
    res.write('</br>')
    res.write(url.resolve('www.baidu.com/a', 'abc')) // www.baidu.com/abc

    
    res.write('</br>')
    res.write('</br>')
    res.write(url.resolve('www.baidu.com/a/b', 'abc')) // www.baidu.com/a/abc

    
    res.write('</br>')
    res.write('</br>')
    res.write(url.resolve('www.baidu.com', '/abc')) // /abc


    
    res.write('</br>')
    res.write('</br>')
    res.write(url.resolve('www.baidu.com/a/b', '/abcb')) // abcd
    res.write(urlFormat) // www.baidu.com?name=shijie

    res.end() // 如果不加结束响应语句，标签页一直转圈
}).listen(1002)


 

 
