const mongoose=require("mongoose")


const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''); 
  };

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
    industry:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'industrie',
        required:true,
    }
    ],
    fImage:[String],
    url:{
        type:String,
        required:false,
        uniqued:true
    },
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

PostSchema.pre('save', function (next) {
    if (this.isModified('title')) {
      this.url = createSlug(this.title);
    }
    next();
  });

const PostModel=mongoose.model("Post",PostSchema)

module.exports=PostModel