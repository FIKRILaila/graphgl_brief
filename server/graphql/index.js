const { join } = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const {  mergeResolvers } = require("@graphql-tools/merge");
const { mergeTypeDefs } = require("@graphql-tools/merge");

// Load all resolvers
const resolversPath = join(__dirname, './**/resolver.*');

const resolversArray = loadFilesSync(resolversPath);
// const resolversArray = loadFilesSync(resolversPath);
const resolvers = mergeResolvers(resolversArray);

//Load all typeDefs
const typeDefsPath = join(__dirname, './**/schema.*');
const typeDefsArray = loadFilesSync(typeDefsPath);
const typeDefs =  mergeTypeDefs(typeDefsArray);

module.exports = {resolvers, typeDefs};