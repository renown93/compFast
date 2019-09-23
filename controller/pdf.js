const changePdf = require('change-pdf')
const { save } = require('../util/store')
const { PORT, IP } = require('../util/config')
const path = require('path')
const fs = require('fs')
const hummus = require('hummus')
const { setDelete, splitVerify } = require('../util/utils')

exports.compress = async (req, res) => {
  await save(req, res, err => {
    if (err) return res.json({ err })
    if (req.file == undefined) return res.json({ err: 'no file is uploaded' })

    const { destination, filename } = req.file
    changePdf
      .compressPdf(
        req.file.path,
        path.join(destination, `comped${filename}`),
        // can recieve the size as param ['screen', 'ebook','printer','prepress']
        req.params.size
      )
      .then(() => {
        setDelete(req.file.path, path.join(destination, `comped${filename}`))
      })
    return res.json({ link: `${IP}:${PORT}/file/comped${filename}` })
  })
}

exports.split = async (req, res) => {
  const params = { from: req.params.from - 1, to: req.params.to - 1, res }

  await save(req, res, err => {
    if (err) return res.json({ err })
    if (req.file == undefined) return res.json({ err: 'no file is uploaded' })

    const { destination, filename } = req.file
    const inStream = new hummus.PDFRStreamForFile(req.file.path)
    let pdfReader = hummus.createReader(inStream)
    params.pagesCount = pdfReader.getPagesCount()

    if (splitVerify(params)) {
      inStream.close()
      setDelete(req.file.path, null)
      return res.status(500).json({ err: splitVerify(params) })
    }

    let pdfWriter = hummus.createWriter(
      path.join(destination, `splited-${filename}`)
    )

    for (let i = 0; i < params.pagesCount; i++) {
      if (i >= params.from && i <= params.to) {
        pdfWriter.createPDFCopyingContext(pdfReader).appendPDFPageFromPDF(i)
      }
    }

    inStream.close()
    pdfWriter.end()

    setDelete(req.file.path, path.join(destination, `splited-${filename}`))

    return res.json({ link: `${IP}:${PORT}/file/splited-${filename}` })
  })
}
exports.changeToImage = async (req, res) => {
  res.json({ endpoint: 'changeToImage' })
}
