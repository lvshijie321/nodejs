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

// 读取文件内容
// 默认读取的是 buffer
fs.readFile('1.txt', (err, data) => {
    if (!err) {
        console.log(data.toString()) // 转 string
    }
})

// 读取目录下面的目录和文件
fs.readdir('node_modules', (err, datas) => {
    if (!err) {
    }
})

// 重命名或移动文件（夹）
// 'css/a.css', 'css/b.css' 重命名文件
// 'css/a.css', 'b.css' 移动文件
// 'dir1', 'dir2' 重命名文件夹

fs.rename('abc/a', 'cccc1', (err) => {
    if (!err) {

    }
})

// 删除文件夹，不可删除文件
fs.rmdir('cccc/1.txt', err => {
})


// 删除文件
fs.unlink('1.txt', err => {
    
});


// 综合应用1：判断服务器上有没有 upload 目录，没有则创建

((dirName) => {
    fs.stat(dirName, (err, stat) => {
    
        if (!err) {
            if (stat.isFile()) {
                fs.unlink(dirName, err => {
                    if (!err) {
                        fs.mkdir(dirName, err => {
                        })
                    }
                })
                
            }
        } else {
            fs.mkdir(dirName, err => {
            })
        }
    })
})('upload');

// 综合应用2：找出目录下的所有目录，并且打印出来
(dirName => {
    fs.readdir(dirName, (err, files) => {
        
        const dirList = [];
        (function isDirectory(index) {
            if (index === files.length) {
                console.log(dirList)
            } else {
                fs.stat(`${ dirName }/${ files[index] }`, (err, stat) => {// windows 下文件分割符是反斜杠（\），这里使用正斜杠也是没问题的
                    stat.isDirectory() && dirList.push(files[index])
                    isDirectory(++index)
                })
            }
        })(0)
        
    })
})('cccc1')