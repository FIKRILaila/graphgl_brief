const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs,resolvers } = require("./graphql");
const express =require("express");
const dbConnection  = require("./database/connection");

require("dotenv").config()

 const app = express();
 
 async function startServer() {
   const apolloServer = new ApolloServer({
     schema: makeExecutableSchema({ typeDefs, resolvers })
   });
   await apolloServer.start();
   await dbConnection();
   apolloServer.applyMiddleware({ app, path: "/graphql" });
 }
 startServer();
 
  app.listen(process.env.PORT || 4000, () => {
     console.log(`Server Running here 👉 https://localhost:${process.env.PORT || 4000}`);    
  });