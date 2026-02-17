// Backend/Routes/ProductRoutes.js
const express = require("express");
const router = express.Router();

const ProductController = require("../Controllers/ProductControllers");
const { requireAuth, requireAdmin } = require("../Middleware/authMiddleware");

router.get("/", ProductController.getAllProducts);
router.post("/", requireAuth, requireAdmin, ProductController.addProduct);
router.get("/:id", ProductController.getProductById);
router.put("/:id", requireAuth, requireAdmin, ProductController.updateProduct);
router.delete("/:id", requireAuth, requireAdmin, ProductController.deleteProduct);

module.exports = router;
