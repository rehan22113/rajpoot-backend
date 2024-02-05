const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
        default:false
    }
})

const ClientModel=mongoose.model("client",ClientSchema)

module.exports=ClientModel;