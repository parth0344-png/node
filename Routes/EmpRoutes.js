     const express = require("express")
     const router = express.Router()
const EmpController = require("../Controllers/EmpController")
const requestMiddleware = require("../MiddleWare/RequestMiddlewre")
const empValidationSchema = require("../validationschemas/empValidationSchema")

router.post("/emp",requestMiddleware(empValidationSchema),EmpController.addEmp)
 
module.exports = router