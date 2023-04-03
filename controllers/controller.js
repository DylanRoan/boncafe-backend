const db = require('../postgres/postgres.js')

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

    if (result) res.status(200).json({login: true})
    else res.status(200).json({login: false})
}

//POST products list '/table'
//requires POST body : password, email
const getTable = async (req, res, next) => {
    if (req.body.email == undefined) { res.status(200).json({message: 'Missing: email.'}); return}
    if (req.body.password == undefined) { res.status(200).json({message: 'Missing: password.'}); return}

    let result = await db.login(req.body.password, req.body.email)

    if (result)
    {
        let table = await db.getTable(result)
        res.status(200).json(table)
    }
    else res.status(200).json({login: false})
}

//POST new user '/adduser'
//Requires POST body : authcode, password, email, code (optional)
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

    //generate code
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var code = `${email.split("@")[0].replace(/\W/g)}${yyyy}_${dd}_${mm}`
    
    if (req.body.code != undefined)
    {
        //need to add error checking for existing codes
        code = req.body.code
    }

    db.addUser(code, email, password)
    res.status(200).json({message: 'Success!'})
}


module.exports = {
    getMain,
    login,
    getTable,
    addUser
}