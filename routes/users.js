const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Registrar usuarios
router.post("/", [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Add a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  
  const {name, email, password} = req.body;

  try {
    let user = await User.findOne({email: email});

    //Chequear si el usuario ya existe
    if(user) {
      return res.status(400).json({
        msg: "Ya existe un usuario asociado al email ingresado"
      })
    }

    //Crear el usuario
    user = new User({
      name,
      email,
      password
    });

    //Encriptar la contraseña del usuaro
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Guardar el usuario en la base de datos
    await user.save();

    //Crear el token de autorización y enviarlo al cliente
    const tokenPayload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
      if(err) {
        throw err
      }
      res.json({token})
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error interno del servidor")
  }
});

module.exports = router;