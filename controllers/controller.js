const db = require('../functions/postgres.js')
const mailer = require('../functions/nodemailer.js')

//GET table '/table'
const getMain = async (req, res, next) => {
    let result = await db.getMain()
    res.status(200).json(result)
}

//POST login '/login'
//requires POST body : password, email
const login = async (req, res, next) => {
    if (req.body.email == undefined) { res.status(200).json({message: 'Missing: email.'}); return}
    if (req.body.password == undefined) { res.status(200).json({message: 'Missing: password.'}); return}

    let result = await db.login(req.body.password , req.body.email)

    if (result) res.status(200).json(result)
    else res.status(200).json({login: false})
}

//POST products list '/table'
//requires POST body : password, email
const getTable = async (req, res, next) => {
    if (req.body.email == undefined) { res.status(200).json({message: 'Missing: email.'}); return}
    if (req.body.password == undefined) { res.status(200).json({message: 'Missing: password.'}); return}

    let result = await db.login(req.body.password, req.body.email)

    if (!result) {res.status(200).json({login: false}); return}

    if (!result.confirmed) {res.status(200).json({confirmed: false}); return}

    let table = await db.getTable(result.code)

    res.status(200).json(table)
}

//POST new user '/adduser'
//Requires POST body : authcode, password, email, code (optional), first_name, last_name
const addUser = async (req, res, next) => {

    //check if allowed to add new user
    if (req.body.authcode != 'testauth123') 
    {
        res.status(200).json({message: 'Access Denied.'})
        return
    }

    //check if user already exists
    let email = req.body.email
    if (email == undefined)
    {
        res.status(200).json({message: 'Invalid request, missing: email.'})
        return
    }

    email = email.toLowerCase()

    let user = await db.userExists(email)
    if (user.length > 0) 
    {
        res.status(200).json({message: 'This email has already been registered.'})
        return
    }

    //check if password already exists
    let password = req.body.password
    if (password == undefined)
    {
        res.status(200).json({message: 'Invalid request, missing: password.'})
        return
    }

    if (req.body.first_name == undefined) { res.status(200).json({message: 'Missing: First Name.'}); return}
    if (req.body.last_name == undefined) { res.status(200).json({message: 'Missing: Last Name.'}); return}

    //generate code
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var code = `${email.split("@")[0].replace(/\W/g, '')}${yyyy}_${dd}_${mm}`
    
    if (req.body.code != undefined)
    {
        //need to add error checking for existing codes
        code = req.body.code
    }

    //adds letter to code if starts with number
    if (/^\d/.test(code)) code = 'M'+code

    await db.addUser(code, email, password, req.body.first_name, req.body.last_name)
    res.status(200).json({message: 'Success!'})
}

//POST confirmation email / sends email
//requires email, password
const sendConfirmation = async (req, res, next) => {
    if (req.body.email == undefined) { res.status(200).json({message: 'Missing: email.'}); return}
    if (req.body.password == undefined) { res.status(200).json({message: 'Missing: password.'}); return}

    let result = await db.login(req.body.password , req.body.email)

    if (!result) {
        res.status(200).json({login: false})
        return
    }

    if (result.confirmed) {res.status(200).json({confirmed: true}); return}

    const data = {
        "from": "req.body.email",
        "to": req.body.email,
        "subject": "Confirm Your Email Address | Boncafe UAE",
        "text": `Please click the following link in order to confirm your email address:
        \nhttps://boncafe-backend.herokuapp.com/confirm?code=${result.code}&confirm=true
        \n\nDidn't request for this? Please reach out to us at `
    }

    res.status(200).json(await mailer.sendMail(data))
}

//GET confirm email link
//requires param : code, confirm
const confirmEmail = async (req, res, next) => {

    if (req.query.code == undefined) { res.status(200).json({message: 'Missing: code.'}); return}
    if (req.query.confirm == undefined) { res.status(200).json({message: 'Missing: confirmation.'}); return}

    if (req.query.confirm != "true") {
        res.status(200).json({message: 'Invalid request. Please click the valid link. If you think this is a mistake, please reach out to us.'})
        return
    }
    
    await db.confirmEmail(req.query.code)
    res.status(200).json({message: "Complete!"})
}

//POST email maintenace request / reminder '/maintenance'
//Requires POST body : password, email, images (eventually), subject (optional), text
const maintenanceEmail = async (req, res, next) => {
    if (req.body.email == undefined) { res.status(200).json({message: 'Missing: email.'}); return}
    if (req.body.password == undefined) { res.status(200).json({message: 'Missing: password.'}); return}

    let result = await db.login(req.body.password , req.body.email)

    if (!result) {
        res.status(200).json({login: false})
        return
    }

    if (!result.confirmed) {res.status(200).json({confirmed: false}); return}

    if (req.body.text == undefined) { res.status(200).json({message: 'Missing: email text.'}); return}

    const data = {
        "from": req.body.email,
        "to": "melodyprojects.bsu23@gmail.com",
        "cc": req.body.email,
        "subject": ((req.body.subject != undefined) ? req.body.subject : "Maintenance Request"),
        "text": req.body.text
    }

    res.status(200).json(await mailer.sendMail(data))
}

module.exports = {
    getMain,
    login,
    getTable,
    addUser,
    maintenanceEmail,
    sendConfirmation,
    confirmEmail
}