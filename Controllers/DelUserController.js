const UserModel = require("../models/UserModel")

const sendemailTodeletedUser = async(req,res)=>
{
 
    emailsend(req.body.email,"Delete Mail","Your Account has been deleted")

}

module.exports = {
     sendemailTodeletedUser
};