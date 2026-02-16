// Backend/Model/ProductModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model("Product", productSchema, "products");
