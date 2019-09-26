const changePdf = require('change-pdf')
const { savePdf } = require('../util/store')
const { PORT, IP } = require('../util/config')
const path = require('path')
const hummus = require('hummus')
const { setDelete, splitVerify, qualityParams } = require('../util/utils')

exports.compress = (req, res) => {
  savePdf(req, res, err => {
    if (err) return res.status(400).json({ err })
    if (req.file == undefined)
      return res.status(400).json({ err: 'no file is uploaded' }), setDelete(req.file.path, null)
    if (!['max', 'normal', 'min'].includes(req.params.size))
      return res.status(400).json({ err: 'wrong compress value' }), setDelete(req.file.path, null)

    const { destination, filename } = req.file
    changePdf
      .compressPdf(
        req.file.path,
        path.join(destination, `comped${filename}`),
        // can recieve the size as param ['screen', 'ebook','printer','prepress']
        qualityParams[req.params.size].png
      )
      .then(() => {
        setDelete(req.file.path, path.join(destination, `comped${filename}`))
      })
      .catch(err => console.log(err))
    return res.status(200).json({ link: `${IP}:${PORT}/file/comped${filename}` })
  })
}
exports.split = (req, res) => {
  const params = { from: req.params.from - 1, to: req.params.to - 1, res }

  savePdf(req, res, err => {
    if (err) return res.status(400).json({ err })
    if (req.file == undefined) return res.status(400).json({ err: 'no file is uploaded' })

    const { destination, filename } = req.file
    const inStream = new hummus.PDFRStreamForFile(req.file.path)
    let pdfReader = hummus.createReader(inStream)
    params.pagesCount = pdfReader.getPagesCount()

    if (splitVerify(params)) {
      inStream.close()
      setDelete(req.file.path, null)
      return res.status(400).json({ err: splitVerify(params) })
    }

    let pdfWriter = hummus.createWriter(path.join(destination, `splited-${filename}`))

    for (let i = 0; i < params.pagesCount; i++) {
      if (i >= params.from && i <= params.to) {
        pdfWriter.createPDFCopyingContext(pdfReader).appendPDFPageFromPDF(i)
      }
    }

    inStream.close()
    pdfWriter.end()

    setDelete(req.file.path, path.join(destination, `splited-${filename}`))

    return res.status(400).json({ link: `${IP}:${PORT}/file/splited-${filename}` })
  })
}
exports.changeToImage = (req, res) => {
  res.json({ endpoint: 'changeToImage' })
}
