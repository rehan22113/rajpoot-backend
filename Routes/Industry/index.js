const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewIndustry, AddNewIndustry, UpdateIndustry, DeleteIndustry, ViewSingleIndustry } = require('../../Controllers/Industry');
const multer = require("multer")
const path = require('path');
const { UploadImage } = require('../../Controllers/Post');
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")


// cloudinary.config({
//     cloud_name: "dz06webjx",
//     api_key: "135655251923377",
//     api_secret: "s_v9qHzcFHS_7ASg9kOD4dgdqMk",
// });

//    const storage = multer.diskStorage({
//      destination: './Public/uploads/IndustryfeaturedImage',
//      filename: function (req, file, cb) {
//         cb(null,"featuredImage_"+ file.fieldname + '-' + Date.now() + 
//      path.extname(file.originalname));
//     }
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"rajpoot_image",
        timeout:1000000,
        format: async ()=> {"png","jpg","svg"},
        public_id: (req,file)=>file.filename
    }
})

const upload = multer({ storage: storage })



// const storagecloud = new multer.memoryStorage();
// const uploadcloud = multer({
//   storagecloud,
// });


// IndustryViewIndustry Endpoint
// Route.route("/").get(ViewIndustry).Industry([VerifyAdmin,upload.single("fImage")],AddNewIndustryViewIndustry);

// Route.route("/:id").patch([VerifyAdmin,upload.single("fImage")],UpdateIndustryViewIndustry).delete([VerifyAdmin],DeleteIndustryViewIndustry)

Route.get("/",ViewIndustry)
Route.get("/:id",ViewSingleIndustry)
Route.post("/",[upload.single("fImage")],AddNewIndustry);

Route.patch("/:id",[VerifyAdmin,upload.single("fImage")],UpdateIndustry)
Route.delete("/:id",DeleteIndustry)
Route.post("/contentimage",[VerifyAdmin,upload.single("fImage")],UploadImage)



module.exports = Route;