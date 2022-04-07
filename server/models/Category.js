const { Schema, model } = require("mongoose")


const categorySchema = new Schema(
    {
        name: String,
        description: String,
        products: [String]
    },
    { timestamps: true }
)

const Category = model("Categorie", categorySchema);

module.exports = {
    Category
}