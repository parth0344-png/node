const express = require("express") 
const mongoose  = require("mongoose")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())  
 

const userRoutes = require("./Routes/UserRoutes")
app.use("/user",userRoutes)

const EmpRoutes = require("./Routes/EmpRoutes")
app.use("/emp",EmpRoutes)


const roleRoutes = require("./Routes/RoleRoutes")
app.use("/roles",roleRoutes)



 mongoose.connect("mongodb://127.0.0.1:27017/mern_club_mix").then(()=>{
    console.log("database connected successfully!!")
})



const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})