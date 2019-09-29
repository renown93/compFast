export default {
  checkDocType: el => {
    const imageRE = /.png$|.jpg$|.tiff$,|tif$/
    const pdfRE = /.pdf$/
    if (imageRE.test(el)) return "image"
    if (pdfRE.test(el)) return "pdf"
    return { err: "Unsupported document type." }
  },
  generateFileName: (fileName, maxLength) => {
    const { length } = fileName.split("")

    if (length > maxLength) return (fileName = `${fileName.slice(0, 15)}...`)
    if (fileName === "") return "Select a document to start"
    return fileName
  },
  reduceOperations: operations => {
    const result = []
    for (let item in operations) {
      operations[item].forEach(value => {
        result.push(value)
      })
    }
    return result
  },
  eraseDuplicates: arr => {
    return arr.reduce((acc, item) => {
      if (acc.find(x => x.name === item.name) === undefined) {
        acc.push(item)
      }
      return acc
    }, [])
  },
  pipe: (...fns) => x => fns.reduce((v, f) => f(v), JSON.parse(JSON.stringify(x)))
}
