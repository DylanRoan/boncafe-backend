const express = require('express')

const router = express.Router()

const getTable = (req, res, next) => {
    res.json({message: "POST WAH"})
}

router.post('/table', getTable)

module.exports = router;