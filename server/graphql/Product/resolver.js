const {Category} = require('../../models/Category');
const {Product} = require('../../models/Product');


const resolvers = {
    Query:{
        products: async () => {
            return await Product.find()
        },
        product: async (_,{id},__) =>{
            return await Product.findById(id)
        }
    },
    Mutation:{
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
        }
    },
    Product: {
        category :async ({categoryId})=> {
            return await Category.findById(categoryId);
        }
    }
};

module.exports = resolvers