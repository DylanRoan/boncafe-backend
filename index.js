const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('html'))

const rt = require('./router/router.js')
app.use("/", rt)

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/html/index.html")
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

//scheduler for noon
const schedule = require('node-schedule')
const schedulerFunction = require('./functions/scheduler.js')

schedule.scheduleJob('35 8 * * *', function(fireDate){ //production uses UTC
  //schedulerFunction.debug()
  schedulerFunction.checkDate()
})