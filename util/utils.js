const fs = require('fs')

exports.setDelete = (original, created) => {
  fs.unlink(original, err => {
    if (err) {
      console.log(err)
    }
  })
  // delete the compressed file after an hour.
  setTimeout(() => {
    fs.unlink(created, err => {
      if (err) {
        console.log(err)
      }
    })
  }, 360000)
}
