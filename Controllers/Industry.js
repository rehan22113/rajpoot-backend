const IndustryModel = require('../models/industry')


const ViewIndustry = async(req,res)=>{
    
    try{
        let response;
        const limit = req.query.limit
        if(limit){
        response = await  IndustryModel.find().limit(limit)
        }else{
            response = await  IndustryModel.find()
        }
        if(response)
        res.status(200).json({msg:"Data Sendt",data:response})
        else
        res.status(404).json({msg:"data not found"})
    }catch(err){
        console.log("View Industry issue",err)
        res.status(400).json({msg:'Got error to find Industry'})
    }
}

const AddNewIndustry = async(req,res)=>{
    try{
        const imageFile = req.file.path;
        const {name,featured} = req.body;

        const response = new IndustryModel({
            name,
            featured,
            image:imageFile
        })

        await response.save();
        res.status(201).json({msg:"Data Saved"})

    }catch(err){
        console.log("View Industry issue",err)
        res.status(400).json({msg:"Error to upload"})
    }

}

const DeleteIndustry=async(req,res)=>{
try{
    
    const {id}=req.params 
    await IndustryModel.findOneAndDelete({_id:id})
    res.status(201).json({msg:"Industry deleted"})
}catch(err){
    console.log("error in deleting Industry",err)

    res.status(400).json({msg:"Error in Industry deletion"})
    
}
}

const UpdateIndustry= async(req,res)=>{
    try{

        const imageFile = req.file.path;
        const {name,color} = req.body;
        const id = req.params['id'];
        
        const response = await IndustryModel.findOneAndUpdate({_id:id},{$set:{name,color,image:imageFile}});
        res.status(201).json({msg:"Industry Updated"})

    }catch(err){
        console.log("error in upate Industry",err)
        res.status(400).json({msg:"Error in Updation"})
    }   
}


module.exports = {ViewIndustry,AddNewIndustry,DeleteIndustry,UpdateIndustry}