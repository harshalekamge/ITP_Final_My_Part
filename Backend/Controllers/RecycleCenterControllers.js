const RecycleCenter = require("../Model/RecycleCenterModel");

const getAllCenters = async (req, res) => {
  const { district } = req.query;
  const query = {};

  if (district && district !== "All Districts") {
    query.district = district;
  }

  try {
    const centers = await RecycleCenter.find(query).sort({ district: 1, name: 1 });
    return res.status(200).json({ centers });
  } catch (err) {
    return res.status(500).json({ message: "Database error", error: err.message });
  }
};

const getCenterById = async (req, res) => {
  try {
    const center = await RecycleCenter.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }
    return res.status(200).json({ center });
  } catch (err) {
    return res.status(500).json({ message: "Database error", error: err.message });
  }
};

const addCenter = async (req, res) => {
  const {
    name,
    district,
    address,
    lat,
    lng,
    phone = "",
    accepted = "",
    status = "",
    rating = "",
    website = "",
    plusCode = "",
  } = req.body;

  if (!name || !district || !address || lat === undefined || lng === undefined) {
    return res.status(400).json({ message: "name, district, address, lat and lng are required" });
  }

  try {
    const center = new RecycleCenter({
      name,
      district,
      address,
      lat,
      lng,
      phone,
      accepted,
      status,
      rating,
      website,
      plusCode,
    });
    await center.save();
    return res.status(201).json({ message: "Recycle center added successfully", center });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateCenter = async (req, res) => {
  try {
    const center = await RecycleCenter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }
    return res.status(200).json({ message: "Recycle center updated successfully", center });
  } catch (err) {
    return res.status(500).json({ message: "Database error", error: err.message });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const center = await RecycleCenter.findByIdAndDelete(req.params.id);
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }
    return res.status(200).json({ message: "Recycle center deleted successfully", center });
  } catch (err) {
    return res.status(500).json({ message: "Database error", error: err.message });
  }
};

exports.getAllCenters = getAllCenters;
exports.getCenterById = getCenterById;
exports.addCenter = addCenter;
exports.updateCenter = updateCenter;
exports.deleteCenter = deleteCenter;
