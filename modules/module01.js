exports === module.exports // true
exports.moduleStr = 'Hello NodeJs'
exports.moduleStr2 = 1

// exports 和 module.exports 指向同一个对象，所以 exports.moduleStr2 = 1 和 module.exports.moduleStr2 = 1 是一样的
module.exports.myModule = () => {}

// 如果当前模块什么都不导出，require 后会得到一个空对象，
exports = 1  // exports仅仅是module.exports的一个地址引用。nodejs只会导出module.exports的指向，如果exports指向变了，nodejs 认为这时候什么都不导出（其实中间有很多判断）

// exports = module.exports = function() { // 这种写法是可行的，因为exports 和 module.exports 指向同一个对象
//     return 1
// }

// 使用 exports.a = 1 这样的写法，会把 { a:1 } 赋值给 module.exports，最终由 module.exports 导出内容