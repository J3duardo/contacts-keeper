const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Contact = require("../models/Contact");

//Tomar data de todos los contactos
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    res.json({contacts})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({msg: "Internal server error"})
  }
});

//Agregar contacto
router.post("/", [auth, [
  check("name", "Name is required").not().isEmpty(),
  check("phone", "Enter a valid phone number").not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {name, email, phone, type} = req.body;

  try {
    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      type
    });

    const contact = await newContact.save();

    res.json({contact});

  } catch (error) {
    console.log(error.message);
    res.status(500).json({msg: "Internal server error"})
  }
});

//Editar un contacto
router.put("/:contactId", (req, res) => {
  res.send("Update contact")
});

//Borrar un contacto
router.delete("/:contactId", (req, res) => {
  res.send("Delete contact")
});

module.exports = router;