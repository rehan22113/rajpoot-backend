
const jwt = require("jsonwebtoken")
const GenerateJwtToken = async(id)=>{
    if(id){
        const token = await jwt.sign({id},"process.env.SECRETKEY123")
        return token; 
    }
    else{
        console.log("id not found")
        return null;
    }
} 


module.exports = {GenerateJwtToken}