const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        products:[Product!]!
        product(id:ID!):Product!
        category(id:ID!):Category!
        categories:[Category!]!
    },
    type Mutation {
        addCategory(Input:addCategoryInput) : categoryResponse
        addProduct(Input:addProductInput) : productResponse
        deleteProduct(id : ID!) : productResponse
        deleteCategory(id : ID!) :categoryResponse
        updateProduct(Input:updateProductInput): productResponse
        updateCategory(Input:updateCategoryInput): categoryResponse
    }
    input addProductInput{
        name : String!
        description : String!
        quantity :Int!
        price : Float!
        onSale : Boolean!
        categoryId : ID!
    }
    input addCategoryInput{
        name : String!
        description : String!
    }
    input updateProductInput{
        id : ID!
        name : String
        description : String
        quantity :Int
        price : Float
        onSale : Boolean
        categoryId : ID
    }
    input updateCategoryInput{
        id : ID!
        name : String
        description : String
    }
    type categoryResponse{
        code: Int!
        success: Boolean!
        message: String!
        category: Category
    }
    type productResponse{
        code: Int!
        success: Boolean!
        message: String!
        product: Product
    }
    type Product{
        id : ID!
        name : String!
        description : String!
        quantity :Int!
        price : Float!
        onSale : Boolean!
        category : Category
    }

    type Category{
        id : ID!
        name : String!
        description : String!
        products : [Product!]
    }
`
module.exports = typeDefs;