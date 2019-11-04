const express = require("express");
const router = express.Router();

//Registrar usuarios
router.post("/", (req, res) => {
  res.send("Registro de usuarios")
});

module.exports = router;