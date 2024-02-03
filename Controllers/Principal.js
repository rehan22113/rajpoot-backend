const PrincipalModel = require('../models/principal')


const ViewPrincipal = async(req,res)=>{
    
    try{
        let response;
        const limit = req.query.limit
        if(limit){
        response = await PrincipalModel.find().limit(limit)
        }else{
            response = await  PrincipalModel.find()
        }
        if(response)
        res.status(200).json({msg:"Data Sendt",data:response})
        else
        res.status(404).json({msg:"data not found"})
    }catch(err){
        console.log("View Principal issue",err)
        res.status(400).json({msg:'Got error to find Principal'})
    }
}

const AddNewPrincipal = async(req,res)=>{
    try{
        const imageFile = req.file.path;
        const {name,featured} = req.body;

        const response = new PrincipalModel({
            name,
            featured,
            image:imageFile
        })

        await response.save();
        res.status(201).json({msg:"Data Saved"})

    }catch(err){
        console.log("View Principal issue",err)
        res.status(400).json({msg:"Error to upload"})
    }

}

const DeletePrincipal=async(req,res)=>{
try{
    
    const {id}=req.params
    await PrincipalModel.findOneAndDelete({_id:id})
    res.status(201).json({msg:"Principal deleted"})
}catch(err){
    console.log("error in deleting Principal",err)

    res.status(400).json({msg:"Error in Principal deletion"})
    
}
}

const UpdatePrincipal= async(req,res)=>{
    try{

        const imageFile = req.file.path;
        const {name,color} = req.body;
        const id = req.params['id'];
        
        const response = await PrincipalModel.findOneAndUpdate({_id:id},{$set:{name,color,image:imageFile}});
        res.status(201).json({msg:"Principal Updated"})

    }catch(err){
        console.log("error in upate Principal",err)
        res.status(400).json({msg:"Error in Updation"})
    }   
}


module.exports = {ViewPrincipal,AddNewPrincipal,DeletePrincipal,UpdatePrincipal}