const express = require('express')
const {VerifyAdmin} = require('../../Middleware/AdminAuth')
const Route = express.Router();
const { ViewContact, AddNewContact, DeleteContact } = require('../../Controllers/Contact');


Route.get("/",VerifyAdmin,ViewContact)
Route.post("/",AddNewContact)
Route.delete("/",VerifyAdmin,DeleteContact);
// Route.patch("/:id",[VerifyAdmin,upload.single("image")],UpdateContact)

module.exports = Route;