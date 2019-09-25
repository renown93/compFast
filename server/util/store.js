const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: `${path.join(__dirname, '../data')}`,
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  }
})
const savePdf = multer({
  storage,
  limits: { fileSize: 150000000 },
  fileFilter: (req, file, cb) => {
    checkIfPdf(file, cb)
  }
}).single('newFile')

const saveImg = multer({
  storage,
  limits: { fileSize: 150000000 },
  fileFilter: (req, file, cb) => {
    checkIfImg(file, cb)
  }
}).single('newFile')

function checkIfPdf(file, cb) {
  const fileTypes = /pdf/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  mimetype && extname ? cb(null, true) : cb('Unexpected File Type')
}

function checkIfImg(file, cb) {
  const fileTypes = /bmp|jpeg|jpg|png|tiff|gif/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  file.fileType = path.extname(file.originalname)
  mimetype && extname ? cb(null, true) : cb('Unexpected File Type')
}

module.exports.storage = storage
module.exports.saveImg = saveImg
module.exports.savePdf = savePdf
