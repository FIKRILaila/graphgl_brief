const {Category} = require('../../models/Category');
const {Product} = require('../../models/Product');

const resolvers = {
    Query:{
        category: async (_,{id},__) =>{
            return await Category.findById(id)
        },
        categories:async () => {
            return await Category.find();
        }
    },
    Mutation:{
        addCategory: async (_ , {Input})=>{
             try{
                const category = await Category.create(Input)
                return {
                    code: 200,
                    success: true,
                    message: "Category Successfully created",
                    category,
                }
            }catch(err){
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    category: null,
                }
            }
        },
        updateCategory : async (_,{Input}) =>{
            try{
                const category = await Category.findByIdAndUpdate(Input.id,{...Input})
                return {
                    code: 200,
                    success: true,
                    message: "Category Successfully updated",
                    category,
                }
            }catch(err){
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    category: null,
                }
            }
        },
        deleteCategory : async (_,{id}) => {
            try{
                const category = await Category.findByIdAndDelete(id)
                return {
                    code: 200,
                    success: true,
                    message: "Category Successfully deleted",
                    category,
                }
            }catch(err){
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    category: null,
                }
            }
        }
    },
    Category: {
        products : async ({id}) => {
            return await Product.find({categoryId:id})
        }
    }
};

module.exports = resolvers;