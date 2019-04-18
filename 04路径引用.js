// 如果 foo 在当前父目录下找不到，nodejs 会去 当前父目录下的 node_module 的第一级里查找
const foo = require('foo')
// const boo = require('boo') // Error: Cannot find module 'boo'
const boo = require('dir/boo') // 可以这样写

debugger