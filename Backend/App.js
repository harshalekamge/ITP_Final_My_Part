// Backend/App.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cardRouter = require("./Routes/CardRoutes");
const productRouter = require("./Routes/ProductRoutes"); // Import new route

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/cards", cardRouter);
app.use("/products", productRouter);

// MongoDB Connection
mongoose
    .connect("mongodb+srv://User01:User01pass@cluster0.lzfcl.mongodb.net/")
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(5001, () => console.log("🚀 Server running on port 5001"));
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
