const express = require("express");
const router = express.Router();

//Tomar data del usuario logueado
router.get("/", (req, res) => {
  res.send("Data del usuario logueado")
});

//Inicio de sesión de usuarios
router.post("/", (req, res) => {
  res.send("Inicio de sesión de usuarios")
});

module.exports = router;