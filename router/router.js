const express = require('express')

const router = express.Router()
const controller = require('../controllers/controller.js')

const multer = require('multer');
const upload = multer();

router.get('/main', upload.none(), controller.getMain)
router.post('/login', upload.none(), controller.login)
router.post('/table', upload.none(), controller.getTable)
router.post('/adduser', upload.none(), controller.addUser)

module.exports = router;