const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const rt = require('./router/router.js')
app.use("/", rt)

app.route("/").get(function (req, res) {
  res.send(request.headers, request.originalUrl, request.method, request.body)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})