export default {
  checkDocType: el => {
    const imageRE = /.png$|.jpg$|.tiff$,|tif$/
    const pdfRE = /.pdf$/
    if (imageRE.test(el)) {
      return 'image'
    } else if (pdfRE.test(el)) {
      return 'pdf'
    } else {
      return { err: 'Unsupported document type.' }
    }
  }
}
