const mongoose = require("mongoose");

const PrincipalSchema = mongoose.Schema({
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

const PrincipalModel=mongoose.model("principal",PrincipalSchema)

module.exports=PrincipalModel;
