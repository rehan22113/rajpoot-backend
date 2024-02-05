const ClientModel = require('../models/Client')


const ViewClient = async(req,res)=>{
    
    try{
        let response;
        const limit = req.query.limit
        if(limit){
        response = await  ClientModel.find().limit(limit)
        }else{
            response = await  ClientModel.find()
        }
        if(response)
        res.status(200).json({msg:"Data Sendt",data:response})
        else
        res.status(404).json({msg:"data not found"})
    }catch(err){
        console.log("View Client issue",err)
        res.status(400).json({msg:'Got error to find Client'})
    }
}

const AddNewClient = async(req,res)=>{
    try{
        const imageFile = req.file.path;
        const {name,featured} = req.body;

        const response = new ClientModel({
            name,
            featured,
            image:imageFile
        })

        await response.save();
        res.status(201).json({msg:"Data Saved"})

    }catch(err){
        console.log("View Client issue",err)
        res.status(400).json({msg:"Error to upload"})
    }

}

const DeleteClient=async(req,res)=>{
try{
    
    const {id}=req.params 
    await ClientModel.findOneAndDelete({_id:id})
    res.status(201).json({msg:"Client deleted"})
}catch(err){
    console.log("error in deleting Client",err)

    res.status(400).json({msg:"Error in Client deletion"})
    
}
}

const UpdateClient= async(req,res)=>{
    try{

        const imageFile = req.file.path;
        const {name,color} = req.body;
        const id = req.params['id'];
        
        const response = await ClientModel.findOneAndUpdate({_id:id},{$set:{name,color,image:imageFile}});
        res.status(201).json({msg:"Client Updated"})

    }catch(err){
        console.log("error in upate Client",err)
        res.status(400).json({msg:"Error in Updation"})
    }   
}


module.exports = {ViewClient,AddNewClient,DeleteClient,UpdateClient}