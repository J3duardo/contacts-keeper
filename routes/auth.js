const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const User = require("../models/User");

//Iniciar sesión de usuarios
router.post("/", [
  check("email", "Invalid email").isEmail(),
  check("password", "Password is required").exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const {email, password} = req.body;
  
  try {
    let user = await User.findOne({email});

    if(!user) {
      return res.status(400).json({msg: "Invalid email or password"})
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if(!passwordCheck) {
      return res.status(400).json({msg: "Invalid email or password"})
    }

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

// //Inicio de sesión de usuarios
// router.post("/", (req, res) => {
//   res.send("Inicio de sesión de usuarios")
// });

module.exports = router;