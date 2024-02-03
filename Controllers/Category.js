const CategoryModel = require('../models/category')


const ViewCategories = async(req,res)=>{

    try{
        let response;
        const limit = req.query.limit
        if(limit){
        response = await  CategoryModel.find().limit(limit)
        }else{
            response = await  CategoryModel.find()
        }
        if(response)
        res.status(200).json({msg:"Data Send",data:response})
        else
        res.status(404).json({msg:"data not found"})
    }catch(err){
        console.log("View Categories issue",err)
        res.status(400).json({msg:'Got error to find category'})
    }
}

const AddNewCategories = async(req,res)=>{
    try{
        const imageFile = req.file.path;
        const {name,featured,parent} = req.body;

        const response = new CategoryModel({
            name,
            featured,
            parent,
            image:imageFile
        })

        await response.save();
        res.status(201).json({msg:"Data Saved"})

    }catch(err){
        console.log("View Categories issue",err)
        res.status(400).json({msg:"Error to upload"})
    }

}

const DeleteCategories=async(req,res)=>{
try{
    
    const {id}=req.params 
    await CategoryModel.findOneAndDelete({_id:id})
    res.status(201).json({msg:"Category deleted"})
}catch(err){
    console.log("error in deleting category",err)
    res.status(400).json({msg:"Error in category deletion"})
}
}

const UpdateCategories= async(req,res)=>{
    try{

        const imageFile = req.file.path;
        const {name,color} = req.body;
        const id = req.params['id'];
        
        const response = await CategoryModel.findOneAndUpdate({_id:id},{$set:{name,color,image:imageFile}});
        res.status(201).json({msg:"Category Updated"})

    }catch(err){
        console.log("error in upate categories",err)
        res.status(400).json({msg:"Error in Updation"})
    }   
}


module.exports = {ViewCategories,AddNewCategories,DeleteCategories,UpdateCategories}