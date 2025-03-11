const express = require('express')
const router = express.Router()
const {uploadFile, upload} = require('../controllers/file_server')
const { getFile} = require("../controllers/get_file");

// ✅ Get File (Accepts form-data with `filePath`)
router.post("/file-directory/get-file", upload.none(), getFile);


router.post('/file-directory/upload', upload.single("file"), uploadFile)
// router.post('/file-directory/get-file', getFile)

module.exports = router