const Card = require("../Model/CardModel"); // ✅ Ensure correct path

// GET: Fetch all cards
const getAllCards = async (req, res, next) => {
    let Cards;
    try {
        Cards = await Card.find();  
    } catch (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
    }
    
    if (!Cards || Cards.length === 0) {
        return res.status(404).json({ message: "There are no cards in the database." });
    }

    return res.status(200).json({ Cards });
};

// POST: Add a new card
const addCards = async (req, res, next) => {
    const { title, imageLink, shortDescription, longDescription } = req.body;

    if (!title || !imageLink || !shortDescription || !longDescription) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let newCard;
    try {
        newCard = new Card({ title, imageLink, shortDescription, longDescription }); // ✅ Correct model usage
        await newCard.save();  // ✅ Save in the database
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }

    if (!newCard) {
        return res.status(400).json({ message: "Insertion failed" });
    }

    return res.status(201).json({ message: "Card added successfully", card: newCard });
};

//view data by id
const getById = async (req, res, next) => {
    const id =req.params.id;
    let card;
    try{
        card = await Card.findById(id);
    } catch(err) {
        console.log(err);
    }
    // not avb users
    if (!card) {
        return res.status(400).json({ message: "User not available" });
    }
    return res.status(201).json({ card });
}

//update function
const updateCard = async(req,res,next) =>{
    const id =req.params.id;
    const { title, imageLink, shortDescription, longDescription } = req.body;
    let cardUpd;
    try{
        cardUpd = await Card.findByIdAndUpdate(id,
            {title, imageLink, shortDescription, longDescription});
            cardUpd = awaits.cardUpd.save();
    }catch(err){
        console.log(err);
    }
    if (!cardUpd) {
        return res.status(400).json({ message: "Cant update the card" });
    }
    return res.status(201).json({ cardUpd });
}

//delete
const deleteCard = async(req,res,next)=>{
    const id =req.params.id;
    let card;
    try{
        card = await Card.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if (!card) {
        return res.status(400).json({ message: "Cant delete the card" });
    }
    return res.status(201).json({ card });
}

exports.getAllCards = getAllCards;
exports.addCards = addCards;
exports.getById = getById;
exports.updateCard = updateCard;
exports.deleteCard = deleteCard;

// 🔹 Can let Variables Have the Same Name?
//✅ Yes, if they are in different functions (because they have separate scopes).