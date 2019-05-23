const http = require("http");
const url = require("url");
const fs = require("fs");
const mime = require("./lib/getmime");
const events = require("events");

http
  .createServer((req, res) => {
    let pathName = url.parse(req.url).pathname; // 过滤 query 参数，否则找不到文件
    const emitter = new events.EventEmitter();

    if (pathName === "/") {
      pathName = "/index.html"; // 默认加载首页
    }

    if (pathName !== "/favicon.ico") {
      // 过滤 favicon.ico
      fs.readFile(`static${pathName}`,'binary', (err, data) => {
        if (!err) {
          mime(pathName, emitter);
          emitter.on("onContentType", _mime => {
            res.writeHead(200, { "Content-Type": `${_mime};charset=utf-8` });
            res.write(
              data, 'binary'
              //"application/octet-stream" === _mime ? data : data.toString()
            );
            res.end();
          });
          // mime(pathName, _mime => {
          //     res.writeHead(200, { 'Content-Type': `${_mime};charset=utf-8` })
          //     res.write('application/octet-stream' === _mime ? data : data.toString())
          //     res.end()
          // })
        } else {
          fs.readFile("static/404.html", (err, data) => {
            if (!err) {
              mime(pathName, emitter);
              emitter.on("onContentType", _mime => {
                res.writeHead(200, {
                  "Content-Type": `${_mime};charset=utf-8`
                });
                res.write(data.toString());
                res.end();
              });
              // mime(pathName, _mime => {
              //     res.writeHead(404, { 'Content-Type': `${_mime};charset=utf-8` })
              //     res.write(data.toString())
              //     res.end()
              // })
            }
          });
        }
      });
    } else {
      mime(pathName, emitter);
      emitter.on("onContentType", _mime => {
        res.writeHead(200, { "Content-Type": `${_mime};charset=utf-8` });
        res.end();
      });
      // mime(pathName, _mime => {
      //     res.writeHead(200, { 'Content-Type': `${_mime};charset=utf-8` })
      //     res.end()
      // })
    }
  })
  .listen(1303, "127.0.0.1");
