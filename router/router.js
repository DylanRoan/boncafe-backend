const express = require('express')

const router = express.Router()
const controller = require('../controllers/controller.js')

const multer = require('multer');
const upload = multer();

router.get('/main', upload.none(), controller.getMain)
router.get('/client/:code', upload.none(), controller.getCode)
//router.post('/login', upload.none(), controller.validLogin)

module.exports = router;