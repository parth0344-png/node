const cloudinary = require("cloudinary").v2;

const uploadToCloud = async (path) => {

     cloudinary.config({
          api_key: "564612294423438",
          cloud_name: "dacmpvvsr",
          api_secret: "Joz2i0jYP00qmck3zL5kvFohvS4"
     })

     const cloudinaryResponse = await cloudinary.uploader.upload(path)
     return cloudinaryResponse
}
module.exports = { uploadToCloud }