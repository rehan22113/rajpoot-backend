// const multer = require('multer');
const PostModel = require('../models/post');
const CategoryModel = require('../models/category');
const IndustryModel = require('../models/industry');
const PrincipalModel = require('../models/principal');

// const CategoryByPrincipal = async (req, res) => {

//     try {

//       const principalId = req.params.principalId;
//       const Posts = await PostModel.find({ principal: principalId })
//     //   const categoryIds = Posts.map(product => product.category);
//     const categoryIds = Array.from(new Set(Posts.flatMap(product => product.category)));
//     //     const postNumber = PostModel.find({ category: { $in: categoryIds }}).count()
//     //   console.log(postNumber)
//       const categories = await CategoryModel.find({ _id: { $in: categoryIds } })

    

//       res.json({msg:"OK",data:categories,error:false});
//     } catch (error) {
//         console.log(error)
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const CategoryByPrincipal = async (req, res) => {
//     try {
//       const principalUrl = req.params.principalId;

      
//       const principal = await PrincipalModel.findOne({ url: principalUrl });
      
//       // Fetch posts for the given principalId
//       const Posts = await PostModel.find({ principal: principal._id });
  
//       // Extract unique category IDs from the posts
//       const categoryIds = Array.from(new Set(Posts.flatMap(post => post.category)));
  
//       // Fetch categories for these IDs
//       const categories = await CategoryModel.find({ _id: { $in: categoryIds } });
  
//       // Helper function to find the top-level parent recursively
//       const findTopParent = async (category) => {
//         if (!category.parent) {
//           return category; // Return the category if it has no parent (it's the top-level category)
//         }
//         const parentCategory = await CategoryModel.findById(category.parent);
//         return findTopParent(parentCategory); // Recursively find the top-level parent
//       };
  
//       // Resolve the top-level categories
//       const topLevelCategories = [];
//       for (const category of categories) {
//         const topCategory = await findTopParent(category);
//         topLevelCategories.push(topCategory);
//       }
  
//       // Remove duplicates (in case multiple child categories map to the same top-level category)
//       const uniqueTopLevelCategories = Array.from(
//         new Map(topLevelCategories.map(cat => [cat._id.toString(), cat])).values()
//       );
  
//       res.json({ msg: "OK", data: uniqueTopLevelCategories, error: false });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
  
// const CategoryByIndustry = async (req, res) => {
//     const industryUrl = req.params.industryId;
  
//     try {

//       const industry = await IndustryModel.findOne({ url: industryUrl });
 
//       console.log("industry category by  industry",industry)

//       const Posts = await PostModel.find({ industry: industry._id })
//     //   const categoryIds = Posts.map(product => product.category);
//     //   const categories = await CategoryModel.find({ _id: { $in: categoryIds[0] },parent:null });
//     const categoryIds = Array.from(new Set(Posts.flatMap(product => product.category)));

//     const categories = await CategoryModel.find({ _id: { $in: categoryIds } })

//     // Helper function to find the top-level parent recursively
//     const findTopParent = async (category) => {
//         if (!category.parent) {
//           return category; // Return the category if it has no parent (it's the top-level category)
//         }
//         const parentCategory = await CategoryModel.findById(category.parent);
//         return findTopParent(parentCategory); // Recursively find the top-level parent
//       };
  
//       // Resolve the top-level categories
//       const topLevelCategories = [];
//       for (const category of categories) {
//         const topCategory = await findTopParent(category);
//         topLevelCategories.push(topCategory);
//       }
  
//       // Remove duplicates (in case multiple child categories map to the same top-level category)
//       const uniqueTopLevelCategories = Array.from(
//         new Map(topLevelCategories.map(cat => [cat._id.toString(), cat])).values()
//       );

  
//       res.json({msg:"OK",data:uniqueTopLevelCategories,error:false});
//     } catch (error) {
//         console.log(error)
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// } 


const CategoryByPrincipal = async (req, res) => {

    try {

      const principalId = req.params.principalId;
      const Posts = await PostModel.find({ principal: principalId })
    //   const categoryIds = Posts.map(product => product.category);
    const categoryIds = Array.from(new Set(Posts.flatMap(product => product.category)));
    //     const postNumber = PostModel.find({ category: { $in: categoryIds }}).count()
    //   console.log(postNumber)
      const categories = await CategoryModel.find({ _id: { $in: categoryIds },parent:null })

      res.json({msg:"OK",data:categories,error:false});
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const CategoryByIndustry = async (req, res) => {
  const industryUrl = req.params.industryId;

  try {
      // Fetch industry directly by URL
      const industry = await IndustryModel.findOne({ url: industryUrl }).lean();
      if (!industry) {
          return res.status(404).json({ error: 'Industry not found' });
      }

      // Fetch posts related to the industry
      const posts = await PostModel.find({ industry: industry._id }, 'category').lean();
      if (!posts.length) {
          return res.status(404).json({ error: 'No posts found for the industry' });
      }

      // Extract unique category IDs from posts
      const categoryIds = Array.from(new Set(posts.flatMap(post => post.category)));

    const categories = await CategoryModel.find({ _id: { $in: categoryIds },parent:null })

      // Extract top-level categories and remove duplicates
      const uniqueTopLevelCategories = Array.from(
          new Map(
              categories
                  .filter(cat => cat.topParent) // Ensure topParent exists
                  .map(cat => [cat.topParent._id.toString(), cat.topParent])
          ).values()
      );

      res.json({ msg: 'OK', data: uniqueTopLevelCategories, error: false });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const postByCategoryAndPrincipal = async( req,res)=>{
//     const {category,principal} = req.params;
//     console.log("category======================",category,principal)
//     const {pName} = req.query
   

//     try {
//         let Posts = await PostModel.find({category,principal}).populate("category").populate("industry").populate("principal")

//         console.log("principal", Posts )
//         // Step 2: If no posts found in the sent category, check its child categories
//     if (!Posts.length) {
//         // Find child categories of the sent category
//         const childCategories = await CategoryModel.find({ parent: category });
  
//         // Extract child category IDs
//         const childCategoryIds = childCategories.map((child) => child._id);
  
        
//         Posts = await PostModel.find({ category: { $in: childCategoryIds }, principal })
//           .populate("category")
//           .populate("industry")
//           .populate("principal");
//       }
  
//       // Step 3: Respond with posts or an appropriate message
//       if (Posts.length) {
//         res.status(200).json({ msg: "post", data: Posts });
//       } else {
//         res.status(404).json({ msg: "No posts found for the given category or its children" });
//       }
    
//     } catch (error) {
//         console.log(error)
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// }



const postByCategoryAndPrincipal = async (req, res) => {
    const { category:categoryUrl, principal:principalUrl } = req.params;
  
    try {

      const category = await CategoryModel.findOne({ url: categoryUrl });
      const principal = await PrincipalModel.findOne({ url: principalUrl });
      // Step 1: Find posts belonging to the sent category
      let Posts = await PostModel.find({category:category._id,principal:principal._id}).populate("category").populate("industry").populate("principal")

       
        if (!Posts.length) {
            // Find child categories of the sent category
            const childCategories = await CategoryModel.find({ parent: category._id });
        
            // Extract child category IDs
            const childCategoryIds = childCategories.map((child) => child._id);
        
            
            Posts = await PostModel.find({ category: { $in: childCategoryIds }, principal:principal._id })
                .populate("category")
                .populate("industry")
                .populate("principal");
         }


      // Step 2: If posts are found, check for child categories
      if (Posts.length > 0) {
        // Find child categories of the given category
        const childCategories = await CategoryModel.find({ parent: category });
        console.log("childCategories",childCategories)
  
        // If child categories exist, return them
        if (childCategories.length > 0) {
            
          return res.status(200).json({ msg: "category", data: childCategories });
        }
  
        // If no child categories exist, return the posts
        return res.status(200).json({ msg: "post", data: Posts });
      }
  
      // Step 3: If no posts are found, return an appropriate message
      return res.status(404).json({ msg: "No posts found for the given category or its children" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
// const postByCategoryAndIndustry = async( req,res)=>{
//     const {category,industry} = req.params;

//     const {iName} = req.query

//     // console.log(category,principal)
//     try {
//         let Posts = await PostModel.find({category,industry}).populate("category").populate("industry").populate("principal")
//       if(Posts){
//         // const categoryData = await CategoryModel.find({parent:category})
//         const categoryIds = Array.from(new Set(Posts.flatMap(product => product.category)));
//             const categories = await CategoryModel.find({_id:{$in:categoryIds},parent:category})
//         if(!categories.length>0){
//             res.status(200).json({msg:"post",data:Posts})
//         }else{
//             res.status(200).json({msg:"category",data:categories})
//         }
//     }
  
//     } catch (error) {
//         console.log(error)
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

const postByCategoryAndIndustry = async( req,res)=>{
    const {category:categoryUrl,industry:industryUrl} = req.params;

    
    const {iName} = req.query
    
    try {
        
        const category = await CategoryModel.findOne({ url: categoryUrl });
        const industry = await IndustryModel.findOne({ url: industryUrl });
        
        let Posts = await PostModel.find({category: category._id,industry: industry._id }).populate("category").populate("industry").populate("principal")
        
        if (!Posts.length) {
            // Find child categories of the sent category
            const childCategories = await CategoryModel.find({ parent: category._id });
        
            // Extract child category IDs
            const childCategoryIds = childCategories.map((child) => child._id);
        
            
            Posts = await PostModel.find({ category: { $in: childCategoryIds }, industry:industry._id })
                .populate("category")
                .populate("industry")
                .populate("principal");
         }

       if (Posts.length > 0) {
        const childCategories = await CategoryModel.find({ parent: category._id });

        console.log("childCategories",childCategories)

        if (childCategories.length > 0) {
            // Extract category IDs from posts that match the desired industry
            const filteredPostCategories = new Set(
                Posts.flatMap(post => post.category)
            );
    
            // Filter child categories that exist in the post categories
            const relevantCategories = childCategories.filter(cat => 
                filteredPostCategories.has(cat._id.toString())
            );
    
            if (relevantCategories.length > 0) {
                return res.status(200).json({ msg: "category", data: relevantCategories });
            }
        }
  
        // if (childCategories.length > 0) {
            
        //   return res.status(200).json({ msg: "category", data: childCategories });
        // }
  
        return res.status(200).json({ msg: "post", data: Posts });
      }
      return res.status(404).json({ msg: "No posts found for the given category or its children" });
    
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
        const response = await PostModel.find({status:true,isFeatured:true}).populate("category").populate("industry").populate("principal").limit(limit)
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
        const categoryUrl= req.params["category"]

        const category = await CategoryModel.findOne({ url: categoryUrl });


        const response = await PostModel.find({category:category._id}).populate("category").populate("industry").populate("principal")
        // console.log("cat data there",response)
        if(response){
            const categoryData = await CategoryModel.find({parent:category._id})
            if(!categoryData.length>0){
                res.status(200).json({msg:"post",data:response})
            }else{
                res.status(200).json({msg:"category",data:categoryData})
            }
        }
        else{
            res.status(404).json({msg:"Category data not found"})
        }
    }catch(err){
        console.log("View Post issue",err)
        res.status(500).json({msg:'Got error to find Post by Category'})
    }

}
const ViewPostByIndustry = async(req,res)=>{
    
    try{
        const industryUrl= req.params["category"]

        // const industry = await IndustryModel.findOne({ url: industryUrl });

        // console.log("industry",industry)

        const response = await PostModel.find({industry:industryUrl}).populate("category").populate("industry").populate("principal").lean()

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
        const principalUrl= req.params["category"]

        const principal = await PrincipalModel.findOne({ url: principalUrl });

        const response = await PostModel.find({principal:principal._id}).populate("category").populate("industry").populate("principal")

        if(response.length>0)
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
