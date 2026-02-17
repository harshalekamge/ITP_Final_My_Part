const express = require("express");
const router = express.Router();

const RecycleCenterController = require("../Controllers/RecycleCenterControllers");
const { requireAuth, requireAdmin } = require("../Middleware/authMiddleware");

router.get("/", RecycleCenterController.getAllCenters);
router.post("/", requireAuth, requireAdmin, RecycleCenterController.addCenter);
router.get("/:id", RecycleCenterController.getCenterById);
router.put("/:id", requireAuth, requireAdmin, RecycleCenterController.updateCenter);
router.delete("/:id", requireAuth, requireAdmin, RecycleCenterController.deleteCenter);

module.exports = router;
