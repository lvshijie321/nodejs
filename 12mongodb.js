const MongoClient = require('mongodb').MongoClient
const http = require('http')
const ejs = require('ejs')

// npm i mongodb -S

http.createServer((req, res) => {
    if (req.url !== '/favicon.ico') {
        const url = 'mongodb://127.0.0.1:27017'
        MongoClient.connect(url, (err, client) => {
            if (!err) {
                const db = client.db('itying')
                // 新增
                // db.collection('product').insertOne({
                //     name: 'NodeJS',
                //     pid: 123,
                //     cid: 456,
                // }, (err, result) => {
                //     if (!err) {
                //         client.close()
                //     }
                // })

                // 修改
                // db.collection('product').updateOne({
                //     name:  'NodeJS'
                // }, {
                //     $set: { pid: 676 }
                // }, (err, result) => {
                //     client.close()
                // })

                // 删除 // deleteMany
                // db.collection('product').deleteOne({
                //     name:  'NodeJS'
                // }, (err, result) => {
                //     client.close()
                // })

                // 查询
                const result = db.collection('admin').find({})
                // const list = []
                // result.each((err, data) => {
                //     if (!err) {
                //         if (data) {
                //             list.push(data.a)
                //         } else { // 遍历完成
                //             res.end(JSON.stringify(list))
                //             client.close()
                //         }
                //     }
                // })
                
                // 另一种方法
                result.toArray((err, data) => {
                    debugger
                })
            }
        })
    }
     
}).listen(1900)