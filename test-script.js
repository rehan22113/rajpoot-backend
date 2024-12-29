const PostModel = require('./models/post');
const Db=require("./Database/Connection")


Db();

const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  // Assuming `Product` is your Mongoose model
  const updateProductUrls = async () => {
    try {
      // Fetch all products to get their names
      const products = await PostModel.find();
  
      const bulkUpdateOps = products.map((product) => {
        const urlSlug = createSlug(product.title);
        return {
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { url: urlSlug } },
          },
        };
      });
  
      // Perform the bulk update
      const result = await PostModel.bulkWrite(bulkUpdateOps);
      console.log('Bulk update result:', result);
    } catch (error) {
      console.error('Error updating products:', error);
    }
  };
  
  // Call the function to update the URLs
  updateProductUrls();
  