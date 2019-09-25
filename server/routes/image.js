const express = require('express')

const { compress, resize, changeDocType } = require('../controller/image')

const router = express.Router()

router.post('/changeDocType/:to', changeDocType)
router.post('/compress/:size', compress)
router.post('/resize/:w/:h/:percent', resize)

module.exports = router
