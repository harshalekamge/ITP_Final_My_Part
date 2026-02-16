// Backend/App.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cardRouter = require("./Routes/CardRoutes");
const productRouter = require("./Routes/ProductRoutes"); // Import new route

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/itp_final";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/cards", cardRouter);
app.use("/products", productRouter);

// MongoDB Connection
mongoose
 may15-branch
    .connect(MONGO_URI)

main
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(5001, () => console.log("🚀 Server running on port 5001"));
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));


