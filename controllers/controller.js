const db = require('../postgres/postgres.js')

//GET table '/table'
const getTable = (req, res, next) => {
    db.getTable(req, res)
}

module.exports = {
    getTable
}