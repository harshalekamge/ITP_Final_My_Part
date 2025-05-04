// Backend/Controllers/ProductControllers.js
const Product = require("../Model/ProductModel");

// GET all products
const getAllProducts = async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found." });
    }

    return res.status(200).json({ products });
};

// POST a new product
const addProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: "Name and Price are required" });
    }

    const newProduct = new Product({ name, price, description, imageUrl });

    try {
        await newProduct.save();
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    return res.status(201).json({ message: "Product added successfully", product: newProduct });
};

// GET product by ID
const getProductById = async (req, res) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findById(id);
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
};

// PUT update product
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, price, description, imageUrl } = req.body;

    let updatedProduct;
    try {
        updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description, imageUrl },
            { new: true, runValidators: true }
        );
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Updated successfully", product: updatedProduct });
};

// DELETE product
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    let deletedProduct;
    try {
        deletedProduct = await Product.findByIdAndDelete(id);
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
};

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;