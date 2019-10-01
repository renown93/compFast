// ------------------ Helper Functions------------------ //
export const findDocType = el => {
  const imageRE = /.png$|.jpg$|.tiff$,|tif$/
  const pdfRE = /.pdf$/
  if (imageRE.test(el)) return "image"
  if (pdfRE.test(el)) return "pdf"
  return { err: "Unsupported document type." }
}

export const reduceOperations = operations => {
  const result = []
  for (let item in operations) {
    operations[item].forEach(value => {
      result.push(value)
    })
  }
  return result
}
export const json = obj => JSON.parse(JSON.stringify(obj))
export const eraseDuplicates = arr => {
  return arr.reduce((acc, item) => {
    if (acc.find(x => x.name === item.name) === undefined) {
      acc.push(item)
    }
    return acc
  }, [])
}
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), JSON.parse(JSON.stringify(x)))

// ------------------ Generator Functions ------------------ //
export const generateFileName = (fileName, maxLength) => {
  const { length } = fileName.split("")

  if (length > maxLength) return (fileName = `${fileName.slice(0, 15)}...`)
  if (fileName === "") return "Select a document to start"
  return fileName
}

export const generateChildOperations = (fileType, operations, params) => {
  return operations[fileType]
}

export const generateOperations = (fileType, operations) => operations[fileType]

export const findFileType = fileName => findDocType(fileName)

export const generateInitialOperations = operations =>
  pipe(
    reduceOperations,
    eraseDuplicates
  )(operations)
