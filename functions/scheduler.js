const mailer = require('./nodemailer.js')
const db = require('./postgres.js')

async function debug()
{
    return
    
    const date = new Date();

    const data = {
        "from": "",
        "to": "melodyprojects.bsu23@gmail.com",
        "cc": "",
        "subject": "Scheduled Maintenance Check",
        "text": date
    }

    mailer.sendMail(data)
}

async function checkDate()
{
    var date_obj = new Date()

    // current date
    var day = ("0" + date_obj.getDate()).slice(-2);
    var month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
    var year = date_obj.getFullYear();
    
    var date = year + "-" + month + "-" + day
    
    var data = await db.getDate(date)

    console.log("Maintenance Check : " + date)

    for (var i = 0; i < data.length; i++)
    {
        var contract = data[i]
       
        const email =  {
            "from": "",
            "to": contract.email,
            "cc": "melodyprojects.bsu23@gmail.com",
            "subject": `Scheduled Maintenance Request | ${contract.name} (${date})`,
            "text": "Good day,\n\nYour contracted machines require maintenance. Please reach out to us in order to settle a proper date for our technicians to check.\n\nKind regards,\nCompany" 
        }

        await mailer.sendMail(email)
    }

    console.log("Maintenance Check : Success!")
}

module.exports = {
    debug,
    checkDate
}