const mongoose = require("mongoose")
const Schema = mongoose.Schema


const EmpSchema = new Schema({


     firstName: {
          type: String,
     },
     lastName: {
          type: String,
     },
     gender: {
          type: String
     },
     email: {
          type: String
     },
     salary: {
          type: Number
     },
     department: [
          {
               type: String,
          }
     ], roleId: {
          type: Schema.Types.ObjectId,
          ref: "role"
     }
})

module.exports = mongoose.model("employees", EmpSchema)