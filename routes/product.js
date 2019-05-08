const router = require('express').Router()
const a = require('./product/a')
router.use('/a',a)

module.exports = router