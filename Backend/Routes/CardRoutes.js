const express = require("express");
const router = express.Router();
const Card = require("../Model/CardModel");                        //insert model
const CardController = require("../Controllers/CardControllers");  //insertcontroller
const { requireAuth, requireAdmin } = require("../Middleware/authMiddleware");

router.get("/", CardController.getAllCards);
router.post("/", requireAuth, requireAdmin, CardController.addCards);
router.get("/:id", CardController.getById);         //same name in card = await Card.findById(id);
router.put("/:id", requireAuth, requireAdmin, CardController.updateCard);         //same name in card = await Card.findById(id);
router.delete("/:id", requireAuth, requireAdmin, CardController.deleteCard);         //same name in card = await Card.findById(id);

module.exports = router;
