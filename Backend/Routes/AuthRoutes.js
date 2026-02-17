const express = require("express");
const rateLimit = require("express-rate-limit");
const AuthController = require("../Controllers/AuthControllers");
const { requireAuth } = require("../Middleware/authMiddleware");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many auth attempts. Try again later." },
});

router.post("/register", authLimiter, AuthController.register);
router.post("/login", authLimiter, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", requireAuth, AuthController.me);

module.exports = router;
