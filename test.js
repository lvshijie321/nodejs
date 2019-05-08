const express = require('express')
const app = express()

app.get('/', (req, res) => {
    app.locals.abc = 1

    console.log(res.app === app)
    res.send('index')
})

app.listen(9898)