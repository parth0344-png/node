const multer = require("multer")
const cloudinaryUtil = require("../Utils/cloudinaryUtil")


const storage = multer.diskStorage({
     destination: "./uploads",
     filename: (req, file, cb) => {
          cb(null, file.originalname)
     }
})

const upload = multer({
     storage: storage,
     fileFilter: (req, file, cb) => {
          if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
               cb(null, true)
          }
          else {
               cb(new Error("only images are allowd"), false)
          }
     }
}).single("file")


const uploadFile =async (req, res) => {

     upload(req, res,async (err) => {
          if (err) {


               res.json({
                    message: "error while uploading file...",
                    err: err.message
               })
          }
          else {
               const cloudinaryResponse = await cloudinaryUtil.uploadToCloud(req.file.path)
               res.json({
                    message: "file uploaded successfully1!",
                    file: req.file,
                    cloudinaryResponse:cloudinaryResponse
               })
          }
     })

}

module.exports = {
     uploadFile
}