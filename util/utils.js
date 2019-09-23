const fs = require('fs')

exports.setDelete = (original, created) => {
  fs.unlink(original, err => {
    if (err) {
      console.log(err)
    }
  })
  // delete the compressed file after an hour.
  setTimeout(() => {
    if (created != null) {
      fs.unlink(created, err => {
        if (err) {
          console.log(err)
        }
      })
    }
  }, 360000)
}

exports.splitVerify = params => {
  let errors = []
  if (params.to > params.pagesCount) {
    errors.push('[TO] cannot be bigger then total file pages.')
  }
  if (params.from < 0) {
    errors.push('[FROM] cannot be smaller then 1.')
  }
  if (params.to < params.from) {
    errors.push('[FROM] cannot be bigger then [TO].')
  }
  if (errors.length) {
    return errors
  } else {
    return false
  }
}
