const express = require('express')

const { file } = require('../controller/file')

const router = express.Router()

router.get('/:id', file)

module.exports = router
