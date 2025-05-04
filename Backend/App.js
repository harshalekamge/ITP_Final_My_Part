const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/CardRoutes");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

app.use("/cards", router);

mongoose
    .connect("mongodb+srv://User01:User01pass@cluster0.lzfcl.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5001, () => console.log("Server running on port 5001"));
    })
    .catch((err) => console.log(err));