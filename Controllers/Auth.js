// require('dotenv').config()
const bcrypt = require('bcryptjs')
const {GenerateJwtToken} = require("../function/GenerateJwt")
const { Createcookie,Clearcookie } = require('../function/GenerateCookie')
const registerModel = require('../models/register')

//Register controller

const Register= async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body
        if(name && email && password){

            const bPassword = await bcrypt.hash(password,10)
            const registers =new registerModel({
                name: name,
                email: email,
                password: bPassword,
                phone: phone,
                role:2002
            })
            const response = await registers.save();
            res.status(201).json({msg:"User Registered",data:registers})
        }
        else{
            res.status(300).json({msg:"Field Missing"})        
        }
        
    }catch(err){
        console.log("Error in Register Controller",err)
        res.status(400).json("Error in Register Controller")
    }
    }
const Login =async(req,res)=>{

     try {

    const {email,password}=req.body
    const foundUser = await registerModel.findOne({email:email})
    if(foundUser){
        const compare = await bcrypt.compare(password,foundUser.password)
        if(compare){     
                const token =await GenerateJwtToken(foundUser._id);
                const cookieRes= Createcookie(token,res)
            if(cookieRes){
                foundUser.token=[...foundUser.token,token]
                await foundUser.save()
                res.status(200).json({msg:"Login Successfull",data:foundUser})
            }
            
        else{     
            res.status(403).json({msg:"cookie not created"})
        }
      }
      else{
        res.status(401).json({msg:"Login Failed"})
    }       
    }
    else{
        res.status(401).json({msg:"Login Failed"})

    }

    } catch (error) {
        console.log("Error in Login Controller",error)
        res.status(500).json("Error in Login Controller")
     }
}

const RefreshUser = async(req,res)=>{
    let userData = req.user
    res.status(200).json({msg:"user is authorized",userData})

}

const GetAllUser = async(req,res)=>{
    try{
        const getUser = await registerModel.find()
        if(getUser)
        res.json({msg:'All user data sent',data:getUser})
        else
        res.status(400).json({msg:'Something went wrong'})
    }catch(err){
        console.log("Error in All User Controller")
        res.status(400).json("Error in all User Controller") 
    }
}

const UpdateProfile = async(req,res)=>{
    try{
        const {name,email,password,prevPassword} = req.body;

        const id = req.params['id'];
       
        const response = await registerModel.findOneAndUpdate({_id:id},{$set:{name,email}})
        if(password){
             const userFound = await  RegisterModel.findOne({_id:id});
             if(userFound.password == prevPassword ){
                 const response = await RegisterModel.findOneAndUpdate({_id:id},{$set:{password:password}}) 
                 res.status(201).json({msg:"Data Updated"}) 
                             
             }   
             else{
                res.status(300).json({msg:'Password doesnt match'})
             }
        }
        
    }catch{
        console.log("Error in Update Profile Controller")
        res.status(400).json("Error in Update Profile Controller") 
    }
}    

const Logout = async(req,res)=>{

    try {   
        // const id = req.params['id'];
        const response  =await Clearcookie(req,res);
        console.log(response)
      if(response)
        res.status(200).json({msg:"User Logout"})
        else
        res.status(400).json({msg:"Issue in Logout"})
    } catch (error) {       
        console.log("Error in Logout Controller")
        res.status(400).json("Error in logout Controller") 
    }
}



module.exports = {Register,Login,Logout,UpdateProfile,GetAllUser,RefreshUser}