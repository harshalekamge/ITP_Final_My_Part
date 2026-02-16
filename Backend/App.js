// Backend/App.js
require('dotenv').config();  // Add this at the top
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cardRouter = require("./Routes/CardRoutes");
const productRouter = require("./Routes/ProductRoutes"); // Import new route
const recycleCenterRouter = require("./Routes/RecycleCenterRoutes");

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/itp_final";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/cards", cardRouter);
app.use("/products", productRouter);
app.use("/recycle-centers", recycleCenterRouter);

// MongoDB Connection
mongoose

    .connect(MONGO_URI)

    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(5001, () => console.log("🚀 Server running on port 5001"));
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));


