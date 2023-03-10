const db = require('../postgres/postgres.js')

//GET table '/table'
const getTable = (req, res, next) => {
    db.getTable(req, res)
}

const validLogin = async (req, res, next) => {
    let pass = req.params.pass
    let email = req.params.email


}

module.exports = {
    getTable,
    validLogin
}