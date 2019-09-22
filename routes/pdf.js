const express = require('express')

const { compress, split, changeToImage } = require('../controller/pdf')

const router = express.Router()

router.post('/split/:from/:to', split)
router.post('/compress/:size', compress)
router.post('/changeToImage', changeToImage)

module.exports = router
