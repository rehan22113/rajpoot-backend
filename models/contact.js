const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
})

const MessageModel=mongoose.model("message",MessageSchema)

module.exports=MessageModel;
