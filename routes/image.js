const express = require('express')

const { compress, compressAs, changeToPdf } = require('../controller/image')

const router = express.Router()

router.post('/changeToPdf', changeToPdf)
router.post('/compress/:size', compress)
router.post('/compressAs/:type/:size', compressAs)

module.exports = router
//
