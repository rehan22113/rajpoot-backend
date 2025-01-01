const mongoose = require("mongoose");

const PrincipalSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        uniqued:true
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

PrincipalSchema.pre('save', function (next) {
    if (this.isModified('name')) {
      this.url = createSlug(this.name);
    }
    next();
  });

const PrincipalModel=mongoose.model("principal",PrincipalSchema)

module.exports=PrincipalModel;
