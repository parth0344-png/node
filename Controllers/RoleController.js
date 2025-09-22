const roleModel = require("../models/RoleModel")
const createRole = async(req,res)=>{
         try{

        const savedRole = await roleModel.create(req.body)
        res.status(201).json({
            message:"role saved successfully!!",
            data:savedRole
        })
    }catch(err){

        res.status(500).json({
            message:"error while saving role !",
            err:err
        })
    }
}

const getRoles = async(req,res)=>{
    

    try{

            const roles = await roleModel.find()
            if(roles  && roles.length>0){
                res.status(200).json({
                    message:"roles found",
                    data:roles
                })
            }
            else{
                res.status(404).json({
                    message:"no role found",
                    data:null
                }) 
            }

    }catch(err){

        res.status(500).json({
            message:"error while fetching roles",
            err:err
        })
    }

}
module.exports = {
    createRole,getRoles
}