// 广播和接收广播
const events = require('events')
const eventEmitter = new events.EventEmitter()
// 订阅广播
eventEmitter.on('on_publish', data => {
    console.log(data) // '发布广播'
})
// 发布广播
eventEmitter.emit('on_publish', '发布广播')

