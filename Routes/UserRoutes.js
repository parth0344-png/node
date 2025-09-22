const express = require("express")
const router = express.Router()
const userController = require("../Controllers/UserController")
const requestMiddleware = require("../MiddleWare/RequestMiddlewre")
const deleteController = require("../Controllers/DelUserController")
const userValidationSchema = require("../validationschemas/userValidationSchema")
router.get("/users", userController.getUser)
router.get("/user/:id", userController.getUserById)
router.get("/userbyname/:name", userController.getUserByName)

// router.post("/user", userController.addUser)
router.post("/user",requestMiddleware(userValidationSchema),userController.addUser)
router.delete("/user/:id", userController.deleteUser)
router.put("/user/:id", userController.updateUser)
router.put("/addhobby/:id", userController.addHobby)

router.delete("/user/delete",deleteController.sendemailTodeletedUser)

module.exports = router