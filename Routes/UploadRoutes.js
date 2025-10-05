const router = require("express").Router()
const uploadController = require("../Controllers/UploadController")
router.post("/",uploadController.uploadFile)
module.exports = router