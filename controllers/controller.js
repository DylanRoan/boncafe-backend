const db = require('../postgres/postgres.js')

//GET table '/table'
const getMain = async (req, res, next) => {
    let result = await db.getTable('main')
    res.status(200).json(result)
}

//GET table '/client/:code'
const getCode = async (req, res, next) => {
    let code = req.params.code

    let result = await db.findInMain(code)
    if (result == undefined || result.length == 0) 
        return

    await db.createClient(code)
    let client = await db.getTable(code)
    res.status(200).json(client)
}

const validLogin = async (req, res, next) => {
    let pass = req.params.pass
    let email = req.params.email
}

module.exports = {
    getMain,
    getCode,
    validLogin
}