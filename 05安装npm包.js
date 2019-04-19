//import sd from 'silly-datetime'
var sd = require('silly-datetime');
console.log(sd.format(new Date(), 'YYYY-MM-DD HH:mm'))
// 2015-07-06 15:10
 
console.log(sd.fromNow(+new Date() - 2000))
console.log(sd.fromNow(+new Date() - 2000))

console.log(require('md5-node')('123'))