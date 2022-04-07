const { Schema, model } = require("mongoose")


const productSchema = new Schema(
    {
        name: String,
        description: String,
        onSale: Boolean,
        quantity: Number,
        price : Number,
        categoryId : {
            type : Schema.Types.ObjectId,
            ref : "Category"
        }
    },
    { timestamps: true }
)

const Product = model("Product", productSchema);

module.exports = {
    Product
}