const mongoose = require("mongoose");

const IndustrySchema = mongoose.Schema({
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

const IndustryModel=mongoose.model("industrie",IndustrySchema)

module.exports=IndustryModel;
