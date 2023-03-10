const express = require('express')

const router = express.Router()
const controller = require('../controllers/controller.js')

const multer = require('multer');
const upload = multer();

router.get('/table', upload.none(), controller.getTable)
router.get('/login/:pass/:email', upload.none(), controller.validLogin)

module.exports = router;