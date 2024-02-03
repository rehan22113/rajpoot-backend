const express = require('express')
const Route = express.Router();


// controller
const {Register,Login,UpdateProfile,Logout, GetAllUser, RefreshUser} = require("../../Controllers/Auth");
const { VerifyAdmin } = require('../../Middleware/AdminAuth');


Route.get("/",(req,res)=>{
    res.send("Admin enpoint working fine")
})


// Auth Endpoint
// Route.post("/login",Login)
// Route.route("/register").post(Register)
// Route.route("/register/:id").patch(UpdateProfile);
// Route.route("/logout").post(Logout)

Route.post("/login",Login)
Route.post("/register",Register)
Route.patch("/register/:id",VerifyAdmin,UpdateProfile);
Route.post("/logout",VerifyAdmin,Logout)
Route.get("/alluser",VerifyAdmin,GetAllUser)
Route.get("/refresh",VerifyAdmin,RefreshUser)



module.exports = Route;