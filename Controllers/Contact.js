const ContactModel = require('../models/contact')


const ViewContact = async(req,res)=>{
    
    try{
        const response = await  ContactModel.find()
        if(response)
        res.status(200).json({msg:"Data Send",data:response})
        else
        res.status(404).json({msg:"data not found"})
    }catch(err){
        console.log("View Contact issue",err)
        res.status(400).json({msg:'Got error to find Contact'})
    }
}

const AddNewContact = async(req,res)=>{
    try{
        const {name,email,phone,message} = req.body;

        const response = new ContactModel({
            name,
            email,
            message
        })

        await response.save();
        res.status(201).json({msg:"Contact Form Submitted"})

    }catch(err){
        console.log("View Contact issue",err)
        res.status(400).json({msg:"Error to upload"})
    }

}

const DeleteContact=async(req,res)=>{
try{
    
    const {id}=req.body 
    await ContactModel.findOneAndDelete({_id:id})
    res.status(201).json({msg:"Contact deleted"})
}catch(err){
    console.log("error in deleting Contact",err)

    res.status(400).json({msg:"Error in Contact deletion"})
    
}
}

// const UpdateContact= async(req,res)=>{
//     try{

//         const imageFile = req.file.filename;
//         const {name,color} = req.body;
//         const id = req.params['id'];
        
//         const response = await ContactModel.findOneAndUpdate({_id:id},{$set:{name,color,image:imageFile}});
//         res.status(201).json({msg:"Contact Updated"})

//     }catch(err){
//         console.log("error in upate Contact",err)
//         res.status(400).json({msg:"Error in Updation"})
//     }   
// }


module.exports = {ViewContact,AddNewContact,DeleteContact}