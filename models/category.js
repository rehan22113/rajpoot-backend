const mongoose = require("mongoose");

const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''); 
  };

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
    },
    url:{
        type:String,
        required:true,
        uniqued:true
    }
})

CategoriesSchema.pre('save', function (next) {
    if (this.isModified('name')) {
      this.url = createSlug(this.name);
    }
    next();
  });

const CategoryModel=mongoose.model("categorie",CategoriesSchema)

module.exports=CategoryModel;
