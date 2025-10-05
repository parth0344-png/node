const express = require("express")
const router = express.Router()
const userController = require("../Controllers/UserController")
const requestMiddleware = require("../MiddleWare/RequestMiddlewre")
const deleteController = require("../Controllers/DelUserController")
const userValidationSchema = require("../validationschemas/userValidationSchema")
const upload = require("../MiddleWare/uploadMiddleware")
const authMiddleWare = require("../MiddleWare/AuthMiddlewar")
// router.get("/users", userController.getUser)
router.get("/user/:id", userController.getUserById)
router.get("/userbyname/:name", userController.getUserByName)


// router.post("/user", userController.addUser)
// router.post("/user",requestMiddleware(userValidationSchema),userController.addUser)
router.post("/user", upload.single("file"), requestMiddleware(userValidationSchema), userController.addUser)

router.delete("/user/:id", userController.deleteUser)
router.put("/user/:id", userController.updateUser)
router.put("/addhobby/:id", userController.addHobby)
router.post("/addbulkusers", upload.single("file"), userController.addBulkUser);
router.delete("/user/delete", deleteController.sendemailTodeletedUser)
router.get("/users", authMiddleWare.verifyUser, userController.getUsers)
router.post("/token",userController.getUserFromToken)
router.post("/login",userController.loginUser)
router.post("/forgotpassword", userController.forgotPassword);


module.exports = router