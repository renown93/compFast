const fs = require('fs')

exports.setDelete = (original, created) => {
  fs.unlink(original, err => {
    if (err) {
      console.log(err)
    }
  })
  // delete the compressed file after an hour.
  if (created != false) {
    setTimeout(() => {
      fs.unlink(created, err => {
        if (err) {
          console.log(err)
        }
      })
    }, 100000)
  }
}

exports.splitVerify = params => {
  let errors = []

  if (params.to > params.pagesCount) errors.push('[TO] cannot be bigger then total file pages.')
  if (params.from < 0) errors.push('[FROM] cannot be smaller then 1.')
  if (params.to < params.from) errors.push('[FROM] cannot be bigger then [TO].')

  if (errors.length) return errors
  return false
}
exports.changeDocTypeVerify = (req, res, err, to) => {
  let errors = []

  if (err) errors.push(err)
  if (req.file == undefined) errors.push('no file is uploaded')
  if (to.split('').length > 3) errors.push('Unsupported document type.')
  if (errors.length) return errors

  return false
}

exports.qualityParams = {
  max: { jpg: 20, png: 0.5, pdf: 'screen' },
  normal: { jpg: 35, png: 0.7, pdf: 'ebook' },
  min: { jpg: 50, png: 0.8, pdf: 'printer' }
}

exports.findResizeMethod = (w, h, percent, width, height) => {
  const result = {}
  const err = []
  if (percent === '0') {
    percent = false
  }

  if (percent) {
    const percentSize = (100 - percent) / 100
    if (percent > 99) err.push('percent must be smaller then 100')

    result.newWidth = Math.floor(width * percentSize)
    result.newHeight = Math.floor(height * percentSize)

    if (err != false) {
      result.err = err
      return result
    }
    return result
  }

  if (w < 1 || h < 1) err.push('Heigth and width need to be positive values.')
  result.newWidth = w
  result.newHeight = h
  if (err != false) {
    result.err = err
    return result
  }
  return result
}
