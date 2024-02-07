const mongoose=require("mongoose")

// categoryId:{
//     type: mongoose.Types.ObjectId,
//     require:false,
// },
const PostSchema=mongoose.Schema({
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'categorie',
        required:true,
    }
    ],
    principal:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'principal',
        required:true,
    },
    industry:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'industrie',
        required:true,
    },
    fImage:[String],
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    weburl:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        required:false
    },
    status:{
        type:Boolean,
        required:true,
    },
    tags:{
        type:String,
        required:false,
    },
    fb:{
        type:String,
        required:false,
    },
    tw:{
        type:String,
        required:false,
    },
    insta:{
        type:String,
        required:false,
    },


})

const PostModel=mongoose.model("Post",PostSchema)

module.exports=PostModel