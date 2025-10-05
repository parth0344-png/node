const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
     name: {
          type: String
     },
     age: {
          type: Number
     },
     status: {
          type: Boolean,
          default: true
     }, hobbies: [
          {
               type: String,
          }
     ],
     bloodGroup: {
          enum: ["A+", "A-", "O+", "O-"],
          type: String
     },
     roleId: {
          type: Schema.Types.ObjectId,
          ref: "role"

     },
     file: {
          type: String
     },
     password: {
          type: String
     },
     email: {
          type: String,
          unique: true
     }
}, {
     timestamps: true

})


module.exports = mongoose.model("users", userSchema)