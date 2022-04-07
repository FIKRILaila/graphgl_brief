const mongoose = require('mongoose')
require("dotenv").config()

const DB = process.env.DB_HOST.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


const dbConnection = async () => mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection Successfully!");
}).catch((err)=>{
    console.log(err);
})

module.exports = dbConnection;