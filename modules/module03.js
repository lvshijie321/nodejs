// 同时使用 module.exports 和 exports 到处对象， 前者覆盖后者，其实这里面有很多的判断

var counter  = 0;
exports.printNextCount = 2
module.exports = 1
 

