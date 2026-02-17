require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../Model/UserModel");

const run = async () => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/itp_final";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "System Admin";

  if (!email || !password) {
    console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "admin",
      status: "active",
    });

    console.log("Admin created successfully:", email.toLowerCase());
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

run();
