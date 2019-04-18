
const module1 = require('./modules/module01')
const moduleExportStr = require('./modules/module02')
const moduleExportStr3 = require('./modules/module03')

console.log(module1.moduleStr) // 'Hello NodeJs'
console.log(module1.moduleStr2) // 1
console.log(module1.myModule) // () => { … } 

console.log(moduleExportStr) // 'Hello NodeJs'

console.log(moduleExportStr3) // 1

// NodeJs开发者建议导出对象用module.exports,导出多个方法和变量用exports
