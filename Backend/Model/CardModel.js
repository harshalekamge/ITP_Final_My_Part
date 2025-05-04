const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: { type: String, required: true },
    imageLink: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true }
});

module.exports = mongoose.model("CardModel", cardSchema); // model export