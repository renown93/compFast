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
const save = multer({
  storage,
  limits: { fileSize: 150000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('newFile')

function checkFileType(file, cb) {
  const fileTypes = /pdf|jpg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  mimetype && extname ? cb(null, true) : cb('Unexpected File Type')
}

module.exports.storage = storage
module.exports.save = save
