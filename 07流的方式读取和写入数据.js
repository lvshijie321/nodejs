const fs = require('fs')

// createReadStream 每次只能读取一块文件（如果文件内容足够大，会分多次读取）
// 如果文件过大，可以使用 createReadStream 分块读取，不至于给人一种卡死的假相
const readStream = fs.createReadStream('readStream.txt')
let str = ''

// 广播读取文件块事件
readStream.on('data', (chunk) => {
    str += chunk.toString()
})
// 广播读取完成事件
readStream.on('end', () => {
    console.log(str)
})
// 广播读取失败事件
readStream.on('error', err => {
    
})

// createWriteStream 写入流
// 写入路径大于一级，不存在会报错
const data = '写入流\n'
const writeStream = fs.createWriteStream('outputStream.txt') // 多次执行这行，然后执行 write 会覆盖文件，但同一个 writeStream 多次写入会在末尾追加
writeStream.write(data, 'utf8')
writeStream.end() // 注册 finish 写入成功事件
// 广播写入成功事件，需要提前注册
writeStream.on('finish', () => {
    console.log('finish')
})
writeStream.on('error', err => {
    
})

// 同一个 writeStream 多次写入会追加内容
const ws = fs.createWriteStream('outputStream.txt')
for (let i = 0; i < 10; i++) {
    ws.write(data, 'utf8')
}
ws.end()
ws.on('finish', () => { // 10 此写入完后回调
    console.log('finish')
})

// 管道流：适合大文件，读取一块，写入一块
const rs = fs.createReadStream('readStream.txt')
const ws2 = fs.createWriteStream('outputStream2.txt')
rs.pipe(ws2)