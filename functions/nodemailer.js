require('dotenv').config()
const nodemailer = require('nodemailer')

const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
}

async function sendMail(data)
{
    const transporter = nodemailer.createTransport(config)

    return await transporter.sendMail(data)
}

module.exports = {
    sendMail
}