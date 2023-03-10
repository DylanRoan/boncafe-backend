const db = require('../postgres/postgres.js')

//POST table '/table'
const getTable = (req, res, next) => {
    res.json({message: "POST WAH"})
}

module.exports = {
    getTable
}