const { ApolloServer } = require('apollo-server');
const mongoose = require("mongoose")
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require("dotenv").config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const DB = process.env.DB_HOST.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected");
})
server.listen().then(({url,port}) =>{
   console.log(`
       🚀  Server is running
       🔉  Listening on port ${port}
       📭  Query at ${url}
     `);
 })

