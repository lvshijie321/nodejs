const url = require('url')
const http = require('http')

module.exports = (() => {
    const routes = {
        '/404': (req, res) => {
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            })
            
            res.end('404')
        },
        get: {
            '/favicon.ico': (req, res) => {
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf-8'
                })
                res.end()
            },
        },
        post: {},
    }
    const app = (req, res) => {
        const pathName = url.parse(req.url).pathname
        const method = req.method.toLowerCase()
        routes[method][pathName]
            ? method === 'get'
                ? routes[method][pathName](req, res)
                : (()=> {
                    let payload = ''
                    req.on('data', chunk => payload += chunk.toString())   
                    req.on('end', () => routes[method][pathName]((req.body = payload, req), res)) 
                })()
            : routes['/404'](req, res)
    }
    const server = http.createServer(app)
    ;['get', 'post'].forEach(item => {
        server[item] = (route, callback) => routes[item][route] = callback
    })
    return server
})()