const userModel = require("../models/UserModel")
const cloudinaryUtil = require("../Utils/cloudinaryUtil")
const XLSX = require("xlsx");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = "parth"
const mailSend = require("../Utils/MailUtil");
const { act, use } = require("react");



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
          const hashedPassword = bcrypt.hashSync(req.body.password, 10)
          req.body.password = hashedPassword
          //const savedUser = await userModel.create(req.body);
          const cloudinaryResponse = await cloudinaryUtil.uploadToCloud(req.file.path)
          //console.log("cloundiary res..",cloudinaryResponse)
          // const savedUser = await userModel.create({...req.body,file:req.file.path});
          const savedUser = await userModel.create({ ...req.body, file: cloudinaryResponse.secure_url });

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

const addBulkUser = async (req, res) => {
     try {
          if (!req.file) {
               return res.status(400).json({ message: "No file uploaded" });
          }

          // --> ADD THIS LOG to see what multer is providing
          console.log("File details from multer:", req.file);

          const workbook = XLSX.readFile(req.file.path);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);

          // --> THIS IS THE MOST IMPORTANT LOG
          console.log("Data parsed from Excel sheet:", data);

          const savedUsers = await userModel.insertMany(data);

          res.json({
               message: "Users saved successfully",
               data: savedUsers,
          });
     } catch (err) {
          console.error("Error in addBulkUser:", err);
          res.status(500).json({
               message: "Error while adding users",
               err: err.message,
          });
     }
};
const loginUser = async (req, res) => {

     const { email, password } = req.body;
     console.log(password)
     //const foundUser = await userModel.find({email:email,password:password}) //fail..
     const foundUserFromEmail = await userModel.findOne({ email: email }) //[] //{}
     console.log(foundUserFromEmail)
     //const token = jwt.sign(foundUserFromEmail.toObject(),secret)
     const token = jwt.sign({ id: foundUserFromEmail._id }, secret, {
          expiresIn: 600
     })

     if (foundUserFromEmail) {
          //{} --object db... hashedPassword
          if (bcrypt.compareSync(password, foundUserFromEmail.password)) {
               res.status(200).json({
                    message: "user found",
                    //data:foundUserFromEmail
                    token: token
               })
          }
          else {
               res.status(401).json({
                    message: "invalid cred",
               })
          }
     }
     else {
          res.status(404).json({
               message: "user not found.."
          })
     }
}

const getUserFromToken = async (req, res) => {


     const token = req.body.token;
     try {

          const userFromToken = jwt.verify(token, secret)
          console.log(userFromToken)
          const user = await userModel.findById(userFromToken.id)

          res.status(200).json({
               message: "valid user",
               user: userFromToken,
               user: user
          })
     } catch (err) {
          console.log(err)
          res.status(401).json({
               message: "token is not valid.."
          })

     }

}

const getUsers = async (req, res) => {
     const users = await userModel.find().populate("roleId", "name");
     res.json({
          message: "user fetched..",
          data: users,
     });
};

const forgotPassword = async (req, res) => {
     const { email } = req.body;
     try {
          const user = await userModel.findOne({ email });
          if (!user) return res.status(404).json({ message: "User not found" });
          console.log(email);

          const token = jwt.sign({ id: user._id }, secret);
          console.log(token);

          const subject = "Password Reset Request";
          const text = `Reset Link  :- http://localhost:5173/resetpassword/${token}`;

           await mailSend(email, subject, text);

          res.json({
               token: token
          });
     } catch (err) {
          res.status(401).json({
               message: err
          });
     }
};

const resetpassword = async (req,res)=>{
     const token = req.body.token;
     try{ 
          const userFromToken = jwt.verify(token,secret)
          console.log(userFromToken);
          const hashedPassword = bcrypt.hashSync(req.body.password,10)
          const user = await userModel.findByIdAndUpdate(userFromToken.id,{password:hashedPassword})

          res.status(200).json({
               message:"valid user",
               user:userFromToken,
               user:user
          })
          
     }catch(err){
          console.log(err);
          res.status(401).json({
               message:"token invalid che bhai"
          })
}

module.exports = {
     getUser, getUserById, getUserByName, addUser, deleteUser, addHobby, updateUser, addBulkUser, loginUser, getUserFromToken, getUsers, forgotPassword
};
 
