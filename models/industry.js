const mongoose = require("mongoose");

const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''); 
  };

const IndustrySchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:false,
        uniqued:true
    },
    featured:{
        type:Boolean,
        default:false
    }
})

IndustrySchema.pre('save', function (next) {
    if (this.isModified('name')) {
      this.url = createSlug(this.name);
    }
    next();
  });

const IndustryModel=mongoose.model("industrie",IndustrySchema)

module.exports=IndustryModel;
