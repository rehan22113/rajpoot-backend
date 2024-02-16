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

const ViewSinglePrincipal = async(req,res)=>{

    try{
        let response;
        const {id} = req.params
        response = await  PrincipalModel.findOne({_id:id})
        if(response)
        res.status(200).json({msg:"Data Send",data:response})
        else
        res.status(404).json({msg:"data not found"})
    }catch(err){
        console.log("View principal have an issue",err)
        res.status(500).json({msg:'Got error to find category'})
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

        const imageFile = req.file?.path;
        const {name,featured} = req.body;
        console.log(req.body)
        const id = req.params['id'];
        if(imageFile){
            const response = await PrincipalModel.findOneAndUpdate({_id:id},{$set:{name,featured,image:imageFile}});
            res.status(201).json({msg:"principal Updated with image"})
        }
        else{
            const response = await PrincipalModel.findOneAndUpdate({_id:id},{$set:{name,featured}});
            res.status(201).json({msg:"principal Updated without image"})
        }
    }catch(err){
        console.log("error in upate principal",err)
        res.status(400).json({msg:"Error in Updation"})
    }   
}


module.exports = {ViewPrincipal, ViewSinglePrincipal,AddNewPrincipal,DeletePrincipal,UpdatePrincipal}