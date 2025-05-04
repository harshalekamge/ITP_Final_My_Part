const express = require("express");
const router = express.Router();
const Card = require("../Model/CardModel");                        //insert model
const CardController = require("../Controllers/CardControllers");  //insertcontroller

router.get("/", CardController.getAllCards);
router.post("/", CardController.addCards);
router.get("/:id", CardController.getById);         //same name in card = await Card.findById(id);
router.put("/:id", CardController.updateCard);         //same name in card = await Card.findById(id);
router.delete("/:id", CardController.deleteCard);         //same name in card = await Card.findById(id);

module.exports = router;