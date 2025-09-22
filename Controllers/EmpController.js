const EmpModel = require("../models/EmpModel");
const  mailSend  = require("../Utils/MailUtil"); // adjust path


const addEmp = async (req, res) => {
     console.log("req body", req.body);

     try {
          const savedEmp = await EmpModel.create(req.body)

          await mailSend("patelparth0344@gmail.com",
               "Welcome to Portal",
               `Hello ${savedEmp.firstName}, your account has been created successfully!`
          );
          res.json({
               message: "emp saved successfully",
               data: savedEmp
          })

     } catch (err) {
          res.json({
               message: "error while adding user",
               err: err
          })
     }


}
     module.exports = {
          addEmp
     };