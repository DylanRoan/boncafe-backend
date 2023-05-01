const mailer = require('./nodemailer.js')
const db = require('./postgres.js')

async function debug(date)
{
    const data = {
        "from": "",
        "to": "melodyprojects.bsu23@gmail.com",
        "cc": "",
        "subject": "Scheduled Maintenance Check",
        "text": date
    }

    mailer.sendMail(data)
}

async function checkDates(fireDate)
{
    const date = fireDate.split("T")
    var data = db.queryDB(`SELECT * FROM main WHERE maintenance = ${date}`)
}

module.exports = {
    debug
}