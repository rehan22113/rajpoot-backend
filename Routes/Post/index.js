const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewPost,UploadImage, AddNewPost, UpdatePost, DeletePost, ViewPostByCategory, ViewSinglePost, ViewLimitedPost, ViewPostByIndustry, ViewPostByPrincipal, CategoryByPrincipal, CategoryByIndustry, postByCategoryAndPrincipal, postByCategoryAndIndustry } = require('../../Controllers/Post');
const multer = require("multer")
const path = require('path');
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")


// cloudinary.config({
//     cloud_name: "dz06webjx",
//     api_key: "135655251923377",
//     api_secret: "s_v9qHzcFHS_7ASg9kOD4dgdqMk",
// });

//    const storage = multer.diskStorage({
//      destination: './Public/uploads/PostfeaturedImage',
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
        format: async ()=> {"png","jpg","svg","jpeg"},
        public_id: (req,file)=>file.filename
    }
})

const upload = multer({ storage: storage,limits: { fileSize: 1024 * 1024 * 50 } })



// const storagecloud = new multer.memoryStorage();
// const uploadcloud = multer({
//   storagecloud,
// });


// PostViewPost Endpoint
// Route.route("/").get(ViewPost).post([VerifyAdmin,upload.single("fImage")],AddNewPostViewPost);

// Route.route("/:id").patch([VerifyAdmin,upload.single("fImage")],UpdatePostViewPost).delete([VerifyAdmin],DeletePostViewPost)

Route.get("/",ViewPost)
Route.get('/principal/:principalId/categories',CategoryByPrincipal)
Route.get('/industry/:industryId/categories',CategoryByIndustry)
Route.get('/postByCategoryAndPrincipal/:principal/:category',postByCategoryAndPrincipal)
Route.get('/postByCategoryAndIndustry/:industry/:category',postByCategoryAndIndustry)
Route.get("/:id",ViewSinglePost)
Route.get("/limited",ViewLimitedPost)
Route.get("/category/:category",ViewPostByCategory)
Route.get("/industry/:category",ViewPostByIndustry)
Route.get("/principal/:category",ViewPostByPrincipal)
Route.post("/",[VerifyAdmin,upload.array('fImage', 10)],AddNewPost);
Route.patch("/:id",[VerifyAdmin,upload.array('fImage', 10)],UpdatePost)
Route.delete("/:id",DeletePost)
Route.post("/contentimage",[VerifyAdmin,upload.single("fImage")],UploadImage)



module.exports = Route;