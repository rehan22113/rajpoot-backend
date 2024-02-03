const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewCategories, AddNewCategories, UpdateCategories, DeleteCategories } = require('../../Controllers/Category');
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
//      destination: './Public/uploads/CategoriesfeaturedImage',
//      filename: function (req, file, cb) {
//         cb(null,"featuredImage_"+ file.fieldname + '-' + Date.now() + 
//      path.extname(file.originalname));
//     }
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"rajpoot_image",
        format: async ()=> {"png","jpg","svg"},
        public_id: (req,file)=>file.filename
    }
})

const upload = multer({ storage: storage })



// const storagecloud = new multer.memoryStorage();
// const uploadcloud = multer({
//   storagecloud,
// });


// CategoriesViewCategories Endpoint
// Route.route("/").get(ViewCategories).Categories([VerifyAdmin,upload.single("fImage")],AddNewCategoriesViewCategories);

// Route.route("/:id").patch([VerifyAdmin,upload.single("fImage")],UpdateCategoriesViewCategories).delete([VerifyAdmin],DeleteCategoriesViewCategories)

Route.get("/",ViewCategories)
Route.post("/",[upload.single("fImage")],AddNewCategories);

Route.patch("/:id",[VerifyAdmin,upload.single("fImage")],UpdateCategories)
Route.delete("/:id",DeleteCategories)
Route.post("/contentimage",[VerifyAdmin,upload.single("fImage")],UploadImage)



module.exports = Route;