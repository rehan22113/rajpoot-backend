const multer = require('multer');
const PostModel = require('../models/post');
const CategoryModel = require('../models/category');


const CategoryByPrincipal = async (req, res) => {
    const principalId = req.params.principalId;
  
    try {
      const Posts = await PostModel.find({ principal: principalId })
      const categoryIds = Posts.map(product => product.category);
      const categories = await CategoryModel.find({ _id: { $in: categoryIds } })
  
      res.json({msg:"OK",data:categories,error:false});
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const CategoryByIndustry = async (req, res) => {
    const industryId = req.params.industryId;
  
    try {
      const Posts = await PostModel.find({ industry: industryId })
      const categoryIds = Posts.map(product => product.category);
      const categories = await CategoryModel.find({ _id: { $in: categoryIds } });
  
      res.json({msg:"OK",data:categories,error:false});
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const postByCategoryAndPrincipal = async( req,res)=>{
    const {category,principal} = req.params;
    // console.log(category,principal)
    try {
      const Posts = await PostModel.find({category,principal}).populate("category").populate("industry").populate("principal")
  
      res.json({msg:"OK",data:Posts,error:false});
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
const postByCategoryAndIndustry = async( req,res)=>{
    const {category,industry} = req.params;
    // console.log(category,principal)
    try {
      const Posts = await PostModel.find({category,industry}).populate("category").populate("industry").populate("principal")
  
      res.json({msg:"OK",data:Posts,error:false});
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const ViewPost = async(req,res)=>{
    
    try{
        const {limit=200,industry,category,principal} = req.query;
        const filter={
            limit,
            industry: industry ? (Array.isArray(industry) ? industry : [industry]) : [],
            category: category ? (Array.isArray(category) ? category : [category]) : [],
            principal: principal ? (Array.isArray(principal) ? principal : [principal]) : []
        }
        let response;
        if(limit && (filter.industry.length>0||filter.category.length>0||filter.principal.length>0)){
            console.log(limit,industry,category,principal)
           response =await PostModel.aggregate([
                {
                  $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                  }
                },
                {
                  $lookup: {
                    from: 'industries',
                    localField: 'industry',
                    foreignField: '_id',
                    as: 'industryData'
                  }
                },
                {
                  $lookup: {
                    from: 'principals',
                    localField: 'principal',
                    foreignField: '_id',
                    as: 'principalData'
                  }
                },
                {
                  $match: {
                    $or: [
                      { "categoryData.name": { $in: filter.category } },
                      { "industryData.name": { $in: filter.industry } },
                      { "principalData.name": { $in: filter.principal } }
                    ]
                  }
                },
                {
                  $limit: parseInt(filter.limit)
                },{
                   $match:{ status:true }
                }
              ]);
        }else{
          response = await PostModel.find().populate("category").populate("industry").populate("principal")
        }
        if(response)
        res.status(200).json({msg:"Data Sent",data:response})
        else
        res.status(404).json({msg:"data not found"})
        
    }catch(err){
        console.log("View Post issue",err)
        res.status(500).json({msg:'Got error to find Post'})
    }

}
const ViewSinglePost = async(req,res)=>{
    
    try{
         const id = req.params["id"]
         const response = await PostModel.findOne({_id:id}).populate("category").populate("industry").populate("principal")
        
        if(response)
        res.status(200).json({msg:"Data Sent",data:response})
        else
        res.status(404).json({msg:"data not found"})
        
    }catch(err){
        console.log("View Post issue",err)
        res.status(500).json({msg:'Got error to find Post'})
    }

}
const ViewLimitedPost= async(req,res)=>{
    
    try{
        const limit= req.query["limit"]
        const response = await PostModel.find({status:true}).populate("category").populate("industry").populate("principal").limit(limit)
        if(response)
        res.status(200).json({msg:"limited Post Sent",data:response})
        else
        res.status(404).json({msg:"limited Post not found"})
        
    }catch(err){
        console.log("View Post issue",err)
        res.status(500).json({msg:'Got error to find Post by Category'})
    }

}
const ViewPostByCategory = async(req,res)=>{
    
    try{
        const category= req.params["category"]
        const response = await PostModel.find({category}).populate("category").populate("industry").populate("principal")
        if(response)
        res.status(200).json({msg:"Category Data Sent",data:response})
        else
        res.status(404).json({msg:"Category data not found"})
        
    }catch(err){
        console.log("View Post issue",err)
        res.status(500).json({msg:'Got error to find Post by Category'})
    }

}
const ViewPostByIndustry = async(req,res)=>{
    
    try{
        const industry= req.params["category"]
        const response = await PostModel.find({industry}).populate("category").populate("industry").populate("principal")
        if(response)
        res.status(200).json({msg:"Industry Data Sent",data:response})
        else
        res.status(404).json({msg:"Industry data not found"})
        
    }catch(err){
        console.log("View Post issue",err)
        res.status(500).json({msg:'Got error to find Post by Industry'})
    }

}
const ViewPostByPrincipal = async(req,res)=>{
    
    try{
        const principal= req.params["category"]
        const response = await PostModel.find({principal}).populate("category").populate("industry").populate("principal")
        if(response)
        res.status(200).json({msg:"Principal Data Sent",data:response})
        else
        res.status(404).json({msg:"Principal data not found"})
        
    }catch(err){
        console.log("View Post issue",err)
        res.status(500).json({msg:'Got error to find Post by Principal'})
    }

}
const AddNewPost = async(req,res)=>{
    
    try{
        const imageFile = req.files;
        const AllPaths = imageFile.map((item)=>item.path)
        // console.log("files",AllPaths)
        const {title,content,category,industry,principal,weburl,isFeatured,status,tags,fb,tw,insta} = req.body;
        const cat= JSON.parse(category)
        const ind= JSON.parse(industry)

        // const filesPath = JSON.parse(AllPaths)
        // console.log(cat)
     const data = new PostModel(
        {
        fImage:AllPaths,
        title,
        content,
        weburl,
        category:cat,
        industry:ind,
        principal,
        tags,
        fb,
        tw,
        insta,
        isFeatured,
        status
        }
     )
    const response = await data.save();
    if(response){
       res.status(201).json({msg:"Post Inserted"}) 
    }    
    else{
        res.status(400).json({msg:"Post not inserted"})
    }
    }catch(err){
        console.log("error in insetion Post",err)
        res.status(500).json({msg:"Error in Post insertion"})     
    }

}

const DeletePost=async(req,res)=>{
    try{
        const id = req.params['id'];
        const response = await PostModel.findOneAndDelete({_id:id})
        if(response)
        res.status(204).json({msg:"Post deleted"})
        else{
         res.status(404).json({msg:"Post not found"})
        }
    }catch(err){
        console.log("error in deleting Post",err)
        res.status(400).json({msg:"Error in Post deletion"})
    }
}

const UpdatePost=async(req,res)=>{
    try{
        const imageFile = req.files;
        const AllPaths = imageFile?imageFile.map((item)=>item.path):[]
        const { title,content,weburl,category,industry,principal,tags,fb,tw,insta,isFeatured,status} = req.body;
        const cat= JSON.parse(category)
        const ind= JSON.parse(industry)

        const id = req.params['id'];
        if(AllPaths.length>0){
            const response = await PostModel.findOneAndUpdate({_id:id},{$set:{   fImage:AllPaths,
            title,
            content,
            weburl,
            category:cat,
            industry:ind,
            principal,
            tags,
            fb,
            tw,
            insta,
            isFeatured,
            status
            }});
            res.status(201).json({msg:"Post Updated with featured image",res:response})
        }else{
                const response = await PostModel.findOneAndUpdate({_id:id},{$set:{   title,
                    content,
                    weburl,
                    category:cat,
                    industry:ind,
                    principal,
                    tags,
                    fb,
                    tw,
                    insta,
                    isFeatured,
                    status}});
                res.status(201).json({msg:"Post Updated without featured image",res:response})
        }

    }catch(err){
        console.log("error in update Post",err)
        res.status(400).json({msg:"Error in Updation"})
    } 
}

const UploadImage=async(req,res)=>{

    try{
        const imageFile = req.file.path;
    
    if(imageFile){
       res.status(201).json({msg:"image Inserted",image:imageFile}) 
    }    
    else{
        res.status(400).json({msg:"image not inserted"})
    }
    }catch(err){
        console.log("error in insetion Post",err)
        res.status(400).json({msg:"Error in Post insertion"})     
    }
}


module.exports={ CategoryByPrincipal,CategoryByIndustry, postByCategoryAndPrincipal, postByCategoryAndIndustry,ViewPost,ViewSinglePost,ViewLimitedPost,ViewPostByCategory, ViewPostByIndustry,ViewPostByPrincipal,AddNewPost,DeletePost,UpdatePost,UploadImage}
