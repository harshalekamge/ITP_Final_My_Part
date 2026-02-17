const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recycleCenterSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true, index: true },
    address: { type: String, required: true, trim: true },
    lat: { type: Number, required: true, min: -90, max: 90 },
    lng: { type: Number, required: true, min: -180, max: 180 },
    phone: { type: String, trim: true, default: "" },
    accepted: { type: String, trim: true, default: "" },
    status: { type: String, trim: true, default: "" },
    rating: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },
    plusCode: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecycleCenter", recycleCenterSchema, "recycle_centers");
