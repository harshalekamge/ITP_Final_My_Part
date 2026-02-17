const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const { AUTH_COOKIE_NAME } = require("../Middleware/authMiddleware");

const isProd = process.env.NODE_ENV === "production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProd,
  maxAge: 24 * 60 * 60 * 1000,
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const adminCount = await User.countDocuments({ role: "admin" });
    const normalizedRole = role === "admin" && adminCount === 0 ? "admin" : "user";
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: normalizedRole,
      status: "active",
    });

    const token = signToken(user);
    res.cookie(AUTH_COOKIE_NAME, token, cookieOptions);

    return res.status(201).json({
      message: "Registered successfully.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed.", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is disabled." });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(user);
    res.cookie(AUTH_COOKIE_NAME, token, cookieOptions);

    return res.status(200).json({
      message: "Logged in successfully.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed.", error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  return res.status(200).json({ message: "Logged out successfully." });
};

const me = async (req, res) => {
  return res.status(200).json({ user: sanitizeUser(req.user) });
};

module.exports = {
  register,
  login,
  logout,
  me,
};
