// 非 ./ 开头的路径，nodejs 会去 当前父目录下的 node_module 的第一级里查找
const foo = require('foo')
// const boo = require('boo') // Error: Cannot find module 'boo'
const boo = require('dir/boo') // 可以这样写
// 或者在 dir 下 配置 package.json，这里用 nav 为例子，在 nav 下配置 package.json 
const nav = require('nav') // 非 ./ 开头的路径，nodejs 会去 当前父目录下的 node_module 的第一级里查找，这时能找到 nav 目录，
                           //会进入该目录找到 package.json 下的 main 属性，此属性值就是 nav 目录的路口文件，这样就定位到 nav/navb.js 了
                           // 打印 { a: 1 }
// npm init --yes 生成 默认的 package.json，使用 npm init 需要手动填写配置项                       
const navIndex = require('goo') // 如果不配置 package.json， 只能找到 index.js

// 引用自定义模块需要使用 ./ 开头相对路径，不可省略 ./ ，否则会去 node_modules 下查找模块
let getMime = require('./lib/getmime') // 可以找到模块
getMime = require('lib/getmime') // Error: Cannot find module 'lib/getmime'