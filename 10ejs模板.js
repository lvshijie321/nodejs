const http = require("http");
const ejs = require("ejs");
const url = require("url");

/**
 * EJS 常用标签 
 <% %>流程控制标签 
 <%= %>输出标签（原文输出 HTML 标签） 
 <%- %>输出标签（HTML 会被浏览器解析） 
 */
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    const pathName = url.parse(req.url).pathname;
    if (pathName === "/favicon.ico") {
      res.end();
      return;
    } else if (pathName === "/login") {
      ejs.renderFile(
        "views/form.ejs",
        {},
        function(err, str) {
          res.end(str);
        }
      );
    } else if (pathName === "/doLogin" && req.method.toLowerCase() === 'post') {
        // post 取值的方法
        let postStr = ''
        req.on('data', (chunk) => {
            postStr += chunk.toString()
            console.log(postStr)//username=123&password=456    
        })
        req.on('end', () => {
            res.end('<script>alert(1);</script>')
        })
        //res.end('doLogin')
    } else {
      ejs.renderFile(
        "views/index.ejs",
        { msg: "你好", list: ["vue.js", "React.js"], h: "<h1>h1</h1>" },
        function(err, str) {
          res.end(str);
        }
      );
    }
  })
  .listen(8808);
