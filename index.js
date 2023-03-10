const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    //default
})

  app.listen(port, () => {
    console.log(`Connected to port ${port}`)
  })

const db = require('./postgres.js')
app.get('/table', db.getTable)
