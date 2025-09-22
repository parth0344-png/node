const router = require("express").Router()
const roleController = require("../Controllers/RoleController")
router.post("/",roleController.createRole)
router.get("/",roleController.getRoles)

module.exports = router