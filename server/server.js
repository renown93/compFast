const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const config = require("./util/config")

const pdfRoutes = require("./routes/pdf")
const fileRoutes = require("./routes/file")
const imageRoutes = require("./routes/image")

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/image", imageRoutes)
app.use("/file", fileRoutes)
app.use("/pdf", pdfRoutes)

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ message: "success" })
})

app.listen(config.PORT, () =>
  console.log(`Server is running on port ${config.PORT}.`)
)
