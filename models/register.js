const mongoose=require("mongoose")
// const mongSchema=mongoose.Schema


const registerSchema=mongoose.Schema({

    name:String,
    email:String,
    phone:String,
    password:String,
    role:{
        type:Number,
        default:1001
    },
    token:[String]
})

const registerModel=mongoose.model("register",registerSchema)

module.exports=registerModel