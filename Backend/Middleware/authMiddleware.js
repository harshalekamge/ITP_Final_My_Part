const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

const AUTH_COOKIE_NAME = "gc_auth";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token." });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is disabled." });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
};

module.exports = {
  AUTH_COOKIE_NAME,
  requireAuth,
  requireAdmin,
};
