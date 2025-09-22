const userModel = require("../models/UserModel")

const getUser = async (req, res) => {

     const users = await userModel.find().populate("roleId");
     res.json({
          Message: "User fetched",
          data: users
     });
};
const getUserById = async (req, res) => {

     const foundUser = await userModel.findById(req.params.id);
     if (foundUser) {
          res.json({
               message: "user found with criteria",
               data: foundUser,
          });
     } else {
          res.json({
               message: "user not found with criteria",
               data: null,
          });
     }
};
const getUserByName = async (req, res) => {

     const foundUser = await userModel.find({ name: req.params.name });
     if (foundUser) {
          res.json({
               message: "user found with criteria",
               data: foundUser,
          });
     } else {
          res.json({
               message: "user not found with criteria",
               data: null,
          });
     }
};

const addUser = async (req, res) => {
     console.log("req body", req.body);

     try {
          const savedUser = await userModel.create(req.body)
          res.json({
               message: "user saved successfully",
               data: savedUser
          })
     } catch (err) {
          res.json({
               message: "error while adding user",
               err: err
          })
     }


}

const deleteUser = async (req, res) => {

     const deletedUser = await userModel.findByIdAndDelete(req.params.id)
     res.json({
          message: "user deleted !",
          data: deletedUser
     })


}

const updateUser = async (req, res) => {


     //udpate table set name= ?,... where id = ?
     //db.users.update({$set:{}},id)
     const id = req.params.id
     //const updatedUser  = await userModel.findByIdAndUpdate(id,req.body) //it will return ol data
     const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true })
     res.json({
          message: "user updated successfully!!",
          data: updatedUser
     })


}

const addHobby = async (req, res) => {


     //if hobby is exist send error message that this hobby is already exist !!
     const id = req.params.id
     const updatedUser = await userModel.findByIdAndUpdate(id, { $push: { hobbies: req.body.hobby } }, { new: true })
     res.json({
          message: `new hobby ${req.body.hobby} added successfully...`,
          data: updatedUser
     })



}

module.exports = {
     getUser, getUserById, getUserByName, addUser, deleteUser, addHobby, updateUser
};