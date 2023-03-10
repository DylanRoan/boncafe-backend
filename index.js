const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const rt = require('./router/router.js')
app.use("/", rt)

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/test.html")
})

app.get('/', (request, response) => {
    response.send(request.headers, request.originalUrl, request.method, request.body)
})

  app.listen(port, () => {
    console.log(`Connected to port ${port}`)
  })
