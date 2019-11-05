const Jimp = require("jimp")
const path = require("path")
const { saveImg } = require("../util/store")
const { IP, REVERSE_PROXY_PORT } = require("../util/config")
const {
  qualityParams,
  changeDocTypeVerify,
  setDelete,
  findResizeMethod
} = require("../util/utils")

exports.compress = (req, res) => {
  const { size } = req.params
  saveImg(req, res, err => {
    if (err) return res.json({ err })
    if (req.file == undefined)
      return res.status(400).json({ err: "no file is uploaded" })

    const { destination, filename, fileType } = req.file
    const newFileName = `comped${filename}`

    Jimp.read(req.file.path)
      .then(image => {
        const { width, height } = image.bitmap

        if (fileType === ".png") {
          return image
            .resize(width * qualityParams[size].png, Jimp.AUTO)
            .write(path.join(destination, newFileName))
        }

        image
          .quality(qualityParams[size].jpg)
          .write(path.join(destination, newFileName))
      })
      .then(() => {
        setDelete(req.file.path, path.join(destination, newFileName))
        //setdelete
        return res.status(200).json({
          link: `${IP}:${REVERSE_PROXY_PORT}/api/file/comped${filename}`
        })
      })
      .catch(err => console.log(err))
  })
}
exports.changeDocType = (req, res) => {
  const { to } = req.params
  saveImg(req, res, err => {
    const errors = changeDocTypeVerify(req, res, err, to)
    if (errors)
      return (
        setDelete(req.file.path),
        res.status(400).json({ err: errors })
      )

    const { destination, filename } = req.file
    const newFileName = `typechange_${filename.slice(0, -3)}${to}`

    Jimp.read(req.file.path)
      .then(image => {
        image.quality(100).write(path.join(destination, newFileName))
      })
      .then(() => {
        setDelete(req.file.path, path.join(destination, newFileName))
        return res.status(200).json({
          link: `${IP}:${REVERSE_PROXY_PORT}/api/file/${newFileName}`
        })
      })
      .catch(err => console.log(err))
  })
}
exports.resize = (req, res) => {
  saveImg(req, res, err => {
    if (err) return res.json({ err })
    if (req.file == undefined)
      return res.status(400).json({ err: "no file is uploaded" })
    //setdelete
    const { destination, filename } = req.file

    Jimp.read(req.file.path)
      .then(image => {
        const { width, height } = image.bitmap
        const { h, w, percent } = req.params

        const resizeMethod = findResizeMethod(
          h,
          w,
          percent,
          width,
          height
        )
        const { newWidth, newHeight } = resizeMethod

        if (resizeMethod.err) {
          return res.status(400).json({ err: resizeMethod.err })
        }

        image
          .resize(Number(newWidth), Number(newHeight))
          .quality(60)
          .write(path.join(destination, `resized_${filename}`))
      })
      .then(() => {
        setDelete(
          req.file.path,
          path.join(destination, `resized_${filename}`)
        )
        return res.status(200).json({
          link: `${IP}:${REVERSE_PROXY_PORT}/api/file/resized_${filename}`
        })
      })
      .catch(err => console.log(err))
  })
}
