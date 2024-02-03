const registerModel = require('../models/register');
const {Roles} = require('../utils/RoleConfig')
const jwt = require('jsonwebtoken')


const VerifyAdmin = async(req,res,next)=>{
    try{
        const {jwt:token} = req.cookies;
        if(!token){  
            res.status(403).json({msg:"UnAuthorized"})
        }
            const {id} = await jwt.verify(token,"process.env.SECRETKEY123");
            const foundUser = await registerModel.findOne({_id:id})
            // console.log(foundUser,foundUser.role == Roles.Admin)
            if(!foundUser){
                res.status(404).json({msg:"Unauthorized"})
            }
            if(foundUser.role == Roles.Admin){  
                req.user = foundUser;
                req.token = token;
                next()
            }else{
                res.status(403).json({msg:"Unauthorized"})
            }     
        
    }catch(err){
        console.log("Error in Admin Verification ",err)
    }
}

module.exports = {VerifyAdmin} 
