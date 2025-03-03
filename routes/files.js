const express = require('express')
const router = express.Router()
const {uploadFile, upload} = require('../controllers/file_server')


router.post('/file-directory/upload', upload.single("file"), uploadFile)

module.exports = router