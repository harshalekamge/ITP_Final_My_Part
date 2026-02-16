const express = require("express");
const router = express.Router();

const RecycleCenterController = require("../Controllers/RecycleCenterControllers");

router.get("/", RecycleCenterController.getAllCenters);
router.post("/", RecycleCenterController.addCenter);
router.get("/:id", RecycleCenterController.getCenterById);
router.put("/:id", RecycleCenterController.updateCenter);
router.delete("/:id", RecycleCenterController.deleteCenter);

module.exports = router;
