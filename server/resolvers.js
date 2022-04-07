const {Product} = require('./models/Product')
const {Category} = require('./models/Category');


const resolvers = {
    Query:{
        products: async () => {
            return await Product.find()
        },
        product: async (_,{id},__) =>{
            return await Product.findById(id)
        },
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
        addProduct:async(_,{Input})=>{
            try{
                const product = await Product.create(Input)
                return {
                    code: 200,
                    success: true,
                    message: "Product Successfully created",
                    product,
                }
            }catch(err){
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    product: null,
                }
            }
        },
        updateProduct : async (_,{Input}) =>{
            try{
                const product = await Product.findByIdAndUpdate(Input.id,{...Input})
                return {
                    code: 200,
                    success: true,
                    message: "Product Successfully updated",
                    product,
                }
            }catch(err){
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    product: null,
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
        deleteProduct : async (_,{id}) => {
            try{
                const product = await Product.findByIdAndDelete(id)
                return {
                    code: 200,
                    success: true,
                    message: "Product Successfully deleted",
                    product,
                }
            }catch(err){
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    product: null,
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
    },
    Product: {
        category :async ({categoryId})=> {
            return await Category.findById(categoryId);
        }
    }
};

module.exports = resolvers;