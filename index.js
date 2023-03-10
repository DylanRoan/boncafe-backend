const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

const rt = require('./router/router.js')
app.use("/", rt)


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
    response.send(request.headers, request.originalUrl, request.method, request.body)
})

  app.listen(port, () => {
    console.log(`Connected to port ${port}`)
  })
