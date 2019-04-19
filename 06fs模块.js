const fs = require('fs')

// 判断是文件还是文件夹
fs.stat('06fs模块.js', (err, stats) => {
    if (!err) {
        console.log(stats.isFile()) // true
        console.log(stats.isDirectory()) // false
    }
})

// 创建文件夹
fs.mkdir('css', (err) => {
    if (!err) {
         console.log('创建文件夹成功')
    }
})

// 创建写入文件
// 文件路径不存在则创建并写入，已存在就覆盖
// 文件格式可以省略
// fs.writeFile('1.txt', '你好，nodejs1', 'utf8', (err) => {
    
// })

// 追加写入文件
// 文件路径不存在就创建并写入，已存在就在文件内容尾部追加
fs.appendFile('1.txt', '这是追加的内容\n',(err) => {
    
})