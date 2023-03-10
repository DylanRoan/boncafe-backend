const express = require('express')

const router = express.Router()
const controller = require('../controllers/controller.js')

const multer = require('multer');
const upload = multer();

router.post('/table', upload.none(), controller.getTable)

module.exports = router;