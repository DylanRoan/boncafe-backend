const express = require('express')

const router = express.Router()
const controller = require('../controllers/controller.js')

const multer = require('multer');
const upload = multer();

router.get('/main', upload.none(), controller.getMain)
router.post('/login', upload.none(), controller.login)
router.post('/table', upload.none(), controller.getTable)
router.post('/adduser', upload.none(), controller.addUser)

router.post('/emailconfirm', upload.none(), controller.sendConfirmation)
router.get('/confirm', upload.none(), controller.confirmEmail)

router.post('/email', upload.none(), controller.maintenanceEmail)

router.post('/contract', upload.none(), controller.getContract)

module.exports = router;