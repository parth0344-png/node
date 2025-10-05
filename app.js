const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const { verifyUser } = require("./MiddleWare/AuthMiddlewar")

app.use(cors())
app.use(express.json())
const whitelistedApi = ["/user/login","/user/forgotpassword","/user/user"];

 app.use((req, res, next) => {
    const isWhitelisted = whitelistedApi.includes(req.path);
    if (isWhitelisted) {
        return next();
    }
     verifyUser(req, res, next);
});

const userRoutes = require("./Routes/UserRoutes")
app.use("/user", userRoutes)

const EmpRoutes = require("./Routes/EmpRoutes")
app.use("/emp", EmpRoutes)


const roleRoutes = require("./Routes/RoleRoutes")
app.use("/roles", roleRoutes)

const uploadRoutes = require("./Routes/UploadRoutes")
app.use("/upload", uploadRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/mern_club_mix").then(() => {
    console.log("database connected successfully!!")
})



const PORT = 3000
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})