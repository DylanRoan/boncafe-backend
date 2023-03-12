const db = require('../postgres/postgres.js')

//GET table '/table'
const getMain = async (req, res, next) => {
    let result = await db.getMain()
    res.status(200).json(result)
}

//POST login '/login'
//requires POST body : password, email
const login = async (req, res, next) => {
    let result = await db.login(req.body.password, req.body.email)

    if (!Array.isArray(result) || !result.length) res.status(200).json({auth: false})
    else res.status(200).json({auth: true})
    
}

//POST products list '/table'
//requires POST body : password, email
const getTable = async (req, res, next) => {
    let result = await db.login(req.body.password, req.body.email)

    if (!Array.isArray(result) || !result.length) {
        res.status(200).json({auth: false})
        return
    }

    let table = await db.getTable(result[0].code)
    res.status(200).json(table)
}

module.exports = {
    getMain,
    login,
    getTable
}