const mongoose=require("mongoose")

const Db=()=>{
    
    mongoose.connect("mongodb+srv://zaidbarlas:RLweb%402024@rajpootlink.i8rmrlj.mongodb.net/rajpootlink").then(()=>{
        console.log("Database connection established")
    }).catch((err)=>{
        console.log("Database is not established")
        console.log(err)
    })
}

module.exports=Db


