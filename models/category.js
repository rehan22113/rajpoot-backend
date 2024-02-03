const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorie',
        required:false,
        default:null
    },
    featured:{
        type:Boolean,
        default:false
    }
})

const CategoryModel=mongoose.model("categorie",CategoriesSchema)

module.exports=CategoryModel;
