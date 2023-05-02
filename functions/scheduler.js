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

async function checkDate(fireDate)
{
    const date = fireDate.split("T")
    var data = await db.getDate(date[0])

    for (var i = 0; i < data.length; i++)
    {
        var contract = data[i]
       
        const email =  {
            "from": "",
            "to": contract.email,
            "cc": "melodyprojects.bsu23@gmail.com",
            "subject": `Scheduled Maintenance Request (${date[0]})`,
            "text": "Good day,\n\nYour contracted machines require maintenance. Please reach out to us in order to settle a proper date for our technicians to check.\n\nKind regards,\nCompany" 
        }

        await mailer.sendMail(email)
    }
}

module.exports = {
    debug,
    checkDate
}