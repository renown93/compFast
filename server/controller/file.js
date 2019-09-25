const path = require('path')
const fs = require('fs')
exports.file = async (req, res) => {
  const filePath = `${path.join(__dirname, '../data/')}${req.params.id}`
  fs.existsSync(filePath)
    ? res.sendFile(filePath)
    : res.status(404).json({ err: 'file not found' })
}
