const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewPrincipal, AddNewPrincipal, UpdatePrincipal, DeletePrincipal, ViewSinglePrincipal } = require('../../Controllers/Principal');
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
//      destination: './Public/uploads/PrincipalfeaturedImage',
//      filename: function (req, file, cb) {
//         cb(null,"featuredImage_"+ file.fieldname + '-' + Date.now() + 
//      path.extname(file.originalname));
//     }
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"devzox_image",
        format: async ()=> {"png","jpg","svg"},
        public_id: (req,file)=>file.filename
    }
})

const upload = multer({ storage: storage })



// const storagecloud = new multer.memoryStorage();
// const uploadcloud = multer({
//   storagecloud,
// });


// PrincipalViewPrincipal Endpoint
// Route.route("/").get(ViewPrincipal).Principal([VerifyAdmin,upload.single("fImage")],AddNewPrincipalViewPrincipal);

// Route.route("/:id").patch([VerifyAdmin,upload.single("fImage")],UpdatePrincipalViewPrincipal).delete([VerifyAdmin],DeletePrincipalViewPrincipal)

Route.get("/",ViewPrincipal)
Route.get("/:id",ViewSinglePrincipal)
Route.post("/",[upload.single("fImage")],AddNewPrincipal);

Route.patch("/:id",[VerifyAdmin,upload.single("fImage")],UpdatePrincipal)
Route.delete("/:id",DeletePrincipal)
Route.post("/contentimage",[VerifyAdmin,upload.single("fImage")],UploadImage)



module.exports = Route;